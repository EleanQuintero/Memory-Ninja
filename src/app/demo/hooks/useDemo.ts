"use client";
import { useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DemoAutoLogin() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();





    useEffect(() => {
        async function autoLogin() {

            const user = process.env.NEXT_PUBLIC_DEMO_USER
            const password = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD

            if (!isLoaded || !signIn) return;

            try {

                if (!user || !password) {
                    throw new Error("Demo user credentials are not set in environment variables.");
                }

                // Iniciamos sesión con la cuenta de invitado predefinida
                const result = await signIn.create({
                    identifier: user, // Cuenta real creada en Clerk
                    password: password,
                });

                if (result.status === "complete") {
                    await setActive({ session: result.createdSessionId });
                    router.push("/dashboard"); // Redirigir al área privada
                }
            } catch (err) {
                console.error("Error en el autologin:", err);
                router.push("/login"); // Si falla, que vaya al login normal
            }
        }

        autoLogin();
    }, [isLoaded, signIn, setActive, router])

}