import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { getUserToken } from "@/utils/services/auth/getToken";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

async function getFlashcards() {
    try {

        const token = await getUserToken()
        const user = await currentUser();
        const user_id = user?.id

        if (!user_id) {
            return NextResponse.json({ message: "ID del usuario es requerido" }, { status: 400 });
        }

        const response = await fetch(`http://localhost:4444/api/user/flashcard/getByID/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            signal: AbortSignal.timeout(4000)
        }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error(errorData);
            return NextResponse.json({ message: "Error al obtener las flashcards" }, { status: 404 })
        }

        const flashCardData = await response.json()
        return NextResponse.json(flashCardData)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
    }
}

export const GET = rateLimitter({ fn: getFlashcards, options: RATE_LIMIT_CONFIGS.READ })