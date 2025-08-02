import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";

async function getFlashcards(req: NextRequest) {
    try {

        const user_id = req.headers.get('x-user-id');

        if (!user_id) {
            return NextResponse.json({ message: "Se requiere un user_id en los headers" }, { status: 400 });
        }

        const response = await fetch(`http://localhost:4444/api/user/flashcard/getByID/${user_id}`, {
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