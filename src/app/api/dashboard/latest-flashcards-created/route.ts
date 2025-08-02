import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function getLastestFlashcardsCreated() {
    try {
        const user = await currentUser();
        const userId = user?.id;

        const response = await fetch(`http://localhost:4444/api/dashboard/latestFlashcards/${userId}`);
        if (!response.ok) {
            throw new Error("Error al realizar la peticion");
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

export const GET = rateLimitter({ fn: getLastestFlashcardsCreated, options: RATE_LIMIT_CONFIGS.DASHBOARD });   