import { rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

async function getCountFlashcardsByTheme() {
    try {
        const user = await currentUser()
        const userId = user?.id
        console.log(userId)

        const response = await fetch(`http://localhost:4444/api/dashboard/countByTheme/${userId}`)
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

export const GET = rateLimitter({ fn: getCountFlashcardsByTheme });