import { getUserToken } from "@/utils/services/auth/getToken"
import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";

export const getThemesByUser = async () => {

    try {

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
        return NextResponse.json(themes.data);


    } catch (error) {
        console.error("Error fetching themes:", error);
        return NextResponse.json({ error: "Error fetching themes" }, { status: 500 });
    }



}

export const GET = rateLimitter({ fn: getThemesByUser, options: RATE_LIMIT_CONFIGS.READ });