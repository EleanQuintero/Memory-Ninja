import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export const runtime = 'edge';

async function getLastestFlashcardsCreated() {

    const API_ENDPOINT = process.env.SERVER_LATEST_FLASHCARDS_CREATED;
    if (!API_ENDPOINT) {
        throw new Error("API endpoint no está definido");
    }

    try {
        const token = await getUserToken()
        const user = await currentUser();
        const userId = user?.id;

        const response = await fetch(`${API_ENDPOINT}${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                signal: AbortSignal.timeout(5000)
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error al obtener las últimas tarjetas creadas");
        }

        const latestFlashcards = await response.json();
        return NextResponse.json(latestFlashcards.data);


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al solicitar las últimas tarjetas creadas" },
            { status: 500 }
        );
    }
}

export const GET = rateLimitter({
    fn: getLastestFlashcardsCreated,
    options: { ...RATE_LIMIT_CONFIGS.DASHBOARD, identifier: 'latestFlashcards' }
});   