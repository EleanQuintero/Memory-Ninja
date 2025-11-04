import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST() {

    const clerk = await clerkClient();

    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
        }

        // Utilizamos directamente users desde clerkClient
        clerk.users.updateUserMetadata(user.id, {
            publicMetadata: {
                onboarding: true
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Error al actualizar el estado" }, { status: 500 });
    }
}