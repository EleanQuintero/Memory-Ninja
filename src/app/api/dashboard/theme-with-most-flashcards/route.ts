import { rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const getThemeWithMaxFlashcards = async () => {

    const API_ENDPOINT = process.env.SERVER_GET_THEME_WITH_MAX_FLASHCARDS;

    try {
        const user = await currentUser();
        const userId = user?.id;

        const response = await fetch(`${API_ENDPOINT}${userId}`);
        if (!response.ok) {
            throw new Error("Error al realizar la peticion");
        }
        const themeData = await response.json();
        return NextResponse.json(themeData.data);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al solicitar el tema con más tarjetas" },
            { status: 500 }
        );
    }
}

export const GET = rateLimitter({ fn: getThemeWithMaxFlashcards });