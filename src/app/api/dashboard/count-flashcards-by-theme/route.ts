import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserToken } from "@/utils/services/auth/getToken";


async function getCountFlashcardsByTheme() {

    const token = await getUserToken()
    try {
        const user = await currentUser()
        const userId = user?.id

        const response = await fetch(`http://localhost:4444/api/dashboard/countByTheme/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            throw new Error("Error al realizar la peticion")
        }

        const countSectionData = await response.json()

        return NextResponse.json(countSectionData.data)

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al solicitar las estadisticas" },
            { status: 500 }
        );
    }

}

export const GET = rateLimitter({ fn: getCountFlashcardsByTheme, options: RATE_LIMIT_CONFIGS.DASHBOARD });