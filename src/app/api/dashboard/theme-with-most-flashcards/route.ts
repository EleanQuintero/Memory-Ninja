import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserToken } from "@/utils/services/auth/getToken";

const getThemeWithMaxFlashcards = async (req: NextRequest) => {

    const API_ENDPOINT = process.env.SERVER_GET_THEME_WITH_MAX_FLASHCARDS;

    try {
        const token = await getUserToken()
        const user = await currentUser();
        const userId = user?.id;


        const response = await fetch(`${API_ENDPOINT}${userId}`
            , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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

export const GET = rateLimitter({ fn: (req: NextRequest) => getThemeWithMaxFlashcards(req), options: RATE_LIMIT_CONFIGS.DASHBOARD });