import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { getUserToken } from "@/utils/services/auth/getToken";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

export const runtime = 'edge';

async function getFlashcards() {

    const API_ENDPOINT = process.env.SERVER_GET_FLASHCARDS_BY_USER;

    if (!API_ENDPOINT) {
        throw new Error("API endpoint no está definido");
    }

    try {

        const token = await getUserToken()
        const user = await currentUser();
        const user_id = user?.id

        if (!user_id) {
            return NextResponse.json({ message: "ID del usuario es requerido" }, { status: 400 });
        }

        const response = await fetch(`${API_ENDPOINT}${user_id}`, {
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
            throw new Error(errorData || "Error al obtener las flashcards");
        }

        const flashCardData = await response.json()
        return NextResponse.json(flashCardData)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
    }
}

export const GET = rateLimitter({
    fn: getFlashcards,
    options: { ...RATE_LIMIT_CONFIGS.READ, identifier: 'getFlashcards' }
})