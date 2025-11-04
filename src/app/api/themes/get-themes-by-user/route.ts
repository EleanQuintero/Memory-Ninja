import { getUserToken } from "@/utils/services/auth/getToken"
import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";

export const runtime = 'edge';

const getThemesByUser = async () => {
    const API_ENDPOINT = process.env.SERVER_GET_USER_THEMES;

    if (!API_ENDPOINT) {
        return NextResponse.json(
            { error: "API endpoint no está definido" },
            { status: 500 }
        );
    }

    try {

        const token = await getUserToken()

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            signal: AbortSignal.timeout(5000)
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error fetching themes for user");
        }

        const themes = await response.json();
        return NextResponse.json(themes.data);


    } catch (error) {
        console.error({ error: error });
        return NextResponse.json({ error: "error al obtener los temas del usuario" }, { status: 500 });
    }

}

export const GET = rateLimitter({
    fn: getThemesByUser,
    options: { ...RATE_LIMIT_CONFIGS.READ, identifier: 'getThemesByUser' }
});