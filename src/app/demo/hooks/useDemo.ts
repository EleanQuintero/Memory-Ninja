"use client";
import { useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function useDemoAutoLogin() {
    const { signIn } = useSignIn();
    const router = useRouter();

    useEffect(() => {
        async function autoLogin() {
            if (!signIn) return;

            try {
                // Obtener el ticket de inicio de sesión desde la API
                const response = await fetch('/api/demo-login', {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error('Failed to get demo login ticket');
                }

                const { ticket } = await response.json();

                // Iniciar sesión con el ticket (Core 3 SignInFuture API)
                const { error: ticketError } = await signIn.ticket({ ticket });
                if (ticketError) {
                    throw ticketError;
                }

                if (signIn.status === "complete") {
                    // Convertir el sign-in completado en la sesión activa
                    const { error: finalizeError } = await signIn.finalize();
                    if (finalizeError) {
                        throw finalizeError;
                    }
                    // Forzar navegación con replace en lugar de push
                    window.location.href = "/dashboard";
                }
            } catch (err) {
                console.error("Error en el autologin:", err);
                router.push("/");
            }
        }

        autoLogin();
    }, [signIn, router])

}
