import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = 'edge';

/**
 * Endpoint para marcar el onboarding como completado
 * 
 * Flujo:
 * 1. Actualiza publicMetadata.onboarding = true en Clerk
 * 2. Clerk automáticamente dispara el webhook user.updated
 * 3. El frontend usa useUser() para detectar el cambio y redirigir
 * 
 * Documentación: https://clerk.com/docs/users/metadata
 */
export async function POST() {
    const clerk = await clerkClient();

    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
        }

        // Verificar si ya está completado (idempotencia)
        if (user.publicMetadata?.onboarding === true) {
            console.log(`User ${user.id} - Onboarding already completed`);
            return NextResponse.json({
                success: true,
                message: "Onboarding already completed",
                alreadyCompleted: true
            });
        }

        // Actualizar metadata en Clerk
        // Esto dispara automáticamente el webhook user.updated
        await clerk.users.updateUserMetadata(user.id, {
            publicMetadata: {
                onboarding: true,
                onboardingCompletedAt: new Date().toISOString()
            }
        });

        console.log(`✅ User ${user.id} - Onboarding completed successfully`);

        return NextResponse.json({
            success: true,
            message: "Onboarding completed",
            userId: user.id
        });

    } catch (error) {
        console.error("❌ Error updating onboarding status:", error);

        return NextResponse.json({
            error: "Error al actualizar el estado",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}