import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";



export const getThemeStatus = async (req: NextRequest) => {

    try {
        const API_ENDPOINT = process.env.SERVER_GET_THEME_STATUS
        const token = await getUserToken()

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al realizar la petición");
        }

        const data = await response.json();
        console.log("Fetched theme status:", data);
        return NextResponse.json({ theme_status: data.status.theme_status }, { status: 200 });


    } catch (error) {
        console.error("Error fetching theme status:", error);
        return NextResponse.json({ error: "Error fetching theme status" }, { status: 500 });
    }
}

export const GET = rateLimitter({ fn: getThemeStatus, options: RATE_LIMIT_CONFIGS.READ });