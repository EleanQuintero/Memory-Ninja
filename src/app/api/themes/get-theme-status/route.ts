import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export const runtime = 'edge';

const getThemeStatus = async () => {

    const API_ENDPOINT = process.env.SERVER_GET_THEME_STATUS
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
                Authorization: `Bearer ${token}`,
            },
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error fetching theme status");
        }

        const data = await response.json();
        return NextResponse.json({ theme_status: data.status.theme_status }, { status: 200 });


    } catch (error) {
        console.error({ error: error });
        return NextResponse.json({ error: "error al obtener el estado del tema" }, { status: 500 });
    }
}

export const GET = rateLimitter({
    fn: getThemeStatus,
    options: { ...RATE_LIMIT_CONFIGS.READ, identifier: 'getThemeStatus' }
});