import { rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const getMaxFlashcardsByUser = async () => {
    const API_ENDPOINT = process.env.SERVER_GET_MAX_FLASHCARDS_BY_USER;

    try {
        const user = await currentUser();
        const userId = user?.id;

        const response = await fetch(`${API_ENDPOINT}${userId}`);
        if (!response.ok) {
            throw new Error("Error al realizar la petición");
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

export const GET = rateLimitter({ fn: getMaxFlashcardsByUser });
