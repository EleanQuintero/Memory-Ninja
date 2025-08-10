import { getUserToken } from "@/utils/services/auth/getToken"
import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";

export const getThemesByUser = async () => {

    const token = await getUserToken()
    const API_ENDPOINT = process.env.SERVER_GET_USER_THEMES;

    const response = await fetch(`${API_ENDPOINT}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error("Error al realizar la petición")
    }

    const themes = await response.json();
    console.log("Themes fetched successfully:", themes);
    return NextResponse.json(themes.data);
}

export const GET = rateLimitter({ fn: getThemesByUser, options: RATE_LIMIT_CONFIGS.READ });