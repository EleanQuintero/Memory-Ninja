import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const API_ENDPOINT = process.env.SERVER_DELETE_USER_DATA;

// Validación temprana de configuración
if (!API_ENDPOINT) {
    throw new Error("SERVER_DELETE_USER_DATA environment variable is not set");
}

export async function POST(req: NextRequest) {
    try {
        // Verificar autenticidad del webhook
        const evt = (await verifyWebhook(req)) as WebhookEvent;

        // Early return: ignorar eventos no relevantes
        if (evt.type !== "user.deleted") {
            console.log(`Webhook event type ${evt.type} ignored`);
            return NextResponse.json({ received: true }, { status: 200 });
        }

        // Validar datos del evento
        const userId = evt.data.id;
        if (!userId) {
            console.error("User ID is missing from webhook event", { event: evt });
            return NextResponse.json(
                { error: "Invalid webhook data: missing user ID" },
                { status: 400 }
            );
        }

        console.log(`Processing user deletion for user ID: ${userId}`);

        // Llamar al servidor para eliminar datos
        const deleteUrl = `${API_ENDPOINT}${userId}`;
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(4000),
        });

        // Manejo explícito de respuestas del servidor
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to delete user data", {
                userId,
                status: response.status,
                statusText: response.statusText,
                error: errorText,
            });

            // Retornar error para que Clerk reintente
            return NextResponse.json(
                { error: "Failed to delete user data" },
                { status: 500 }
            );
        }

        console.log(`User data for user ID ${userId} deleted successfully`);
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        // Manejo robusto de errores
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        const errorStack = error instanceof Error ? error.stack : undefined;

        console.error("Error processing webhook", {
            error: errorMessage,
            stack: errorStack,
            requestUrl: req.url,
        });

        // Diferenciar entre errores de verificación y otros errores
        if (errorMessage.includes("webhook verification")) {
            return NextResponse.json(
                { error: "Webhook verification failed" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}