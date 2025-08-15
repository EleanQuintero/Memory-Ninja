import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const evt = (await verifyWebhook(req)) as WebhookEvent;

        if (evt.type === "waitlistEntry.created") {
            const email = evt.data.email_address;
            console.log("Nuevo email en la waitlist:", email);

            // Aquí mandas tu correo con Resend, SendGrid, etc.
        }

        return NextResponse.json({ status: "ok" });
    } catch (err) {
        console.error("❌ Error webhook:", err);
        return new NextResponse("Webhook inválido", { status: 400 });
    }
}
