import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const evt = (await verifyWebhook(req)) as WebhookEvent;

        if (evt.type === "waitlistEntry.created") {
            const email = evt.data.email_address;
            console.log("Nuevo email en la waitlist:", email);

            try {
                const response = await fetch("https://smtp.maileroo.com/api/v2/emails/template", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.MAILEROO_SENDING_KEY}`,
                    },
                    body: JSON.stringify({
                        "from": {
                            "address": "staff@memoryninja.es",
                            "display_name": "Memory Ninja Team"
                        },
                        "to": [
                            {
                                "address": email,
                            },
                        ],
                        "subject": "Welcome to Memory Ninja Waitlist!",
                        "template_id": 2825
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(`Error enviando email: ${response.status} ${errorData ? JSON.stringify(errorData) : ''}`);
                }

                console.log("Email enviado correctamente a:", email);

            } catch (error) {
                console.error("Error al enviar el email:", error);

            }


        }
        console.log("Webhook processed successfully");

        return NextResponse.json({ status: "ok" });
    } catch (err) {
        console.error("❌ Error webhook:", err);
        return new NextResponse("Webhook inválido", { status: 400 });
    }
}
