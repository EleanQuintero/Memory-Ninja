import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export const runtime = 'edge';

const getMaxFlashcardsByUser = async () => {
    const API_ENDPOINT = process.env.SERVER_GET_MAX_FLASHCARDS_BY_USER;

    if (!API_ENDPOINT) {
        return NextResponse.json(
            { error: "API endpoint no está definido" },
            { status: 500 }
        );
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
                    Authorization: `Bearer ${token}`,
                },
                signal: AbortSignal.timeout(5000)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error al obtener el máximo de flashcards por usuario");
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al solicitar el máximo de flashcards por usuario" },
            { status: 500 }
        );
    }
}

export const GET = rateLimitter({
    fn: getMaxFlashcardsByUser,
    options: { ...RATE_LIMIT_CONFIGS.DASHBOARD, identifier: 'maxFlashcards' }
});
