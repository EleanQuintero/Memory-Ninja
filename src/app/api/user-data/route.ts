import { WebhookEvent } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {

        // Verificar autenticidad del webhook
        const evt = (await verifyWebhook(req, {
            signingSecret: process.env.CLERK_WEBHOOK_CREATE_USER_SIGNING_SECRET!,
        })) as WebhookEvent;

        // Early return: ignorar eventos no relevantes
        if (evt.type !== "user.created") {
            console.log(`Webhook event type ${evt.type} ignored`);
            return NextResponse.json({ received: true }, { status: 200 });
        }

        // Validar datos del evento
        const newUser = {
            id: evt.data.id,
            name: evt.data.first_name,
            lastName: evt.data.last_name,
            email: evt.data.email_addresses?.[0]?.email_address,
            role: 1
        }

        if (newUser.id === undefined || newUser.email === undefined) {
            console.error("Missing Data")
            return NextResponse.json({ error: "missing user information" }, { status: 400 })
        }

        console.log(`Processing user creation for user ID: ${newUser.id}`);

        console.log("Guardando usuario:", newUser);

        const res = await fetch("http://localhost:4444/api/user/create/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })

        if (!res.ok) {

            const errorData = await res.text();
            console.error('Error al guardar el usuario:', errorData);
            return NextResponse.json({ error: 'Error al guardar el usuario' }, { status: 500 })
        }

        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}
