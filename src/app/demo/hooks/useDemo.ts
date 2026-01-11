"use client";
import { useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function useDemoAutoLogin() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    useEffect(() => {
        async function autoLogin() {
            if (!isLoaded || !signIn) return;

            try {
                // Obtener el ticket de inicio de sesión desde la API
                const response = await fetch('/api/demo-login', {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error('Failed to get demo login ticket');
                }

                const { ticket } = await response.json();

                // Iniciar sesión con el ticket
                const result = await signIn.create({
                    strategy: 'ticket',
                    ticket: ticket,
                });

                if (result.status === "complete") {
                    await setActive({ session: result.createdSessionId });
                    router.push("/dashboard");
                }
            } catch (err) {
                console.error("Error en el autologin:", err);
                router.push("/");
            }
        }

        autoLogin();
    }, [isLoaded, signIn, setActive, router])

}