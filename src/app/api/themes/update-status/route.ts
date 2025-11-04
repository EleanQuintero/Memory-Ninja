import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export const runtime = 'edge';

export const updateThemeStatus = async () => {

    const API_ENDPOINT = process.env.SERVER_UPDATE_THEME_STATUS
    if (!API_ENDPOINT) {
        return NextResponse.json(
            { error: "API endpoint no está definido" },
            { status: 500 }
        );
    }

    try {
        const token = await getUserToken()

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error updating theme status");
        }

        const data = await response.json();
        return NextResponse.json({ message: data.message }, { status: 200 });


    } catch (error) {
        console.error({ error: error });
        return NextResponse.json({ error: "error al actualizar los temas" }, { status: 500 });
    }
}


export const POST = rateLimitter({
    fn: updateThemeStatus,
    options: { ...RATE_LIMIT_CONFIGS.WRITE, identifier: 'updateThemeStatus' }
});