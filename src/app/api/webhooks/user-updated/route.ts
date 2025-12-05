import { WebhookEvent } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

/**
 * Webhook de Clerk para detectar cuando se actualiza la metadata de un usuario
 * Se dispara automáticamente cuando cambia publicMetadata o privateMetadata
 * 
 * Documentación: https://clerk.com/docs/integrations/webhooks/overview
 */
export async function POST(req: NextRequest) {
    try {
        // Verificar autenticidad del webhook usando la firma de Clerk
        const evt = (await verifyWebhook(req, {
            signingSecret: process.env.CLERK_WEBHOOK_UPDATE_USER_SIGNING_SECRET!,
        })) as WebhookEvent;

        // Solo procesar eventos de tipo user.updated
        if (evt.type !== "user.updated") {
            console.log(`Webhook event type ${evt.type} ignored`);
            return NextResponse.json({ received: true }, { status: 200 });
        }

        const userId = evt.data.id;
        const publicMetadata = evt.data.public_metadata;
        const onboardingComplete = publicMetadata?.onboarding === true;

        console.log(`User ${userId} updated. Onboarding: ${onboardingComplete}`);

        // Si el onboarding se completó, aquí puedes hacer acciones adicionales
        if (onboardingComplete) {
            console.log(`✅ User ${userId} completed onboarding successfully`);

            // Aquí puedes:
            // 1. Actualizar tu base de datos
            // 2. Enviar email de bienvenida
            // 3. Activar trial period
            // 4. Registrar analytics

            // Ejemplo: actualizar en tu backend
            // await fetch(`${process.env.SERVER_UPDATE_USER_ONBOARDING}/${userId}`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ onboardingComplete: true })
            // });
        }

        // Siempre responder 200 para que Clerk sepa que recibiste el webhook
        return NextResponse.json({
            success: true,
            userId,
            onboardingComplete
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Error processing user.updated webhook:", error);

        // Importante: devolver 200 incluso con error para que Clerk no reintente
        // Si devuelves error, Clerk reintentará múltiples veces
        return NextResponse.json({
            error: "Error processing webhook",
            received: true
        }, { status: 200 });
    }
}
