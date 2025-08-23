import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";



export const updateThemeStatus = async (req: NextRequest) => {

    try {
        const API_ENDPOINT = process.env.SERVER_UPDATE_THEME_STATUS
        const token = await getUserToken()

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al realizar la petición");
        }

        const data = await response.json();
        return NextResponse.json({ message: data.message }, { status: 200 });


    } catch (error) {
        console.error("Error fetching theme status:", error);
        return NextResponse.json({ error: "Error fetching theme status" }, { status: 500 });
    }
}


export const POST = rateLimitter({ fn: updateThemeStatus, options: RATE_LIMIT_CONFIGS.READ });