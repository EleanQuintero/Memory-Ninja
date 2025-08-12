import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export async function getLastestFlashcardsCreated(req: NextRequest) {
    try {
        const token = await getUserToken()
        const user = await currentUser();
        const userId = user?.id;

        const response = await fetch(`http://localhost:4444/api/dashboard/latestFlashcards/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
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

export const GET = rateLimitter({ fn: (req: NextRequest) => getLastestFlashcardsCreated(req), options: RATE_LIMIT_CONFIGS.DASHBOARD });   