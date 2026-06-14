import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";
import { isUserPro } from "@/utils/services/auth/checkUserPlan";
import { FREE_LIMITS } from "@/utils/consts/planLimits";

export const runtime = 'nodejs';

const createTheme = async (req: NextRequest) => {
    const API_ENDPOINT = process.env.SERVER_CREATE_THEME

    if (!API_ENDPOINT) {
        return NextResponse.json(
            { error: "API endpoint no está definido" },
            { status: 500 }
        );
    }

    try {
        const token = await getUserToken()

        // Server-side plan enforcement: check theme limit for free users
        const isPro = await isUserPro();
        if (!isPro) {
            const themesEndpoint = process.env.SERVER_GET_USER_THEMES;
            if (themesEndpoint) {
                try {
                    const themesResponse = await fetch(themesEndpoint, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        signal: AbortSignal.timeout(5000),
                    });
                    if (themesResponse.ok) {
                        const themesData = await themesResponse.json();
                        const currentThemes = Array.isArray(themesData?.data) ? themesData.data.length : 0;
                        if (currentThemes >= FREE_LIMITS.maxThemes) {
                            return NextResponse.json(
                                { error: `Limite alcanzado: maximo ${FREE_LIMITS.maxThemes} temas en el plan gratuito. Mejora a Pro para crear mas.` },
                                { status: 403 }
                            );
                        }
                    }
                } catch {
                    // If theme count check fails, allow creation to proceed
                }
            }
        }

        const themeName = req.headers.get("theme-name");
        const response = await fetch(`${API_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ theme_name: themeName }),
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error al crear el tema");
        }

        const data = await response.json();

        return NextResponse.json({ message: data.message }, { status: 201 });
    } catch (error) {
        console.error({ error: error })
        return NextResponse.json({ error: "Error al crear el tema" }, { status: 500 });
    }
}

export const POST = rateLimitter({
    fn: createTheme,
    options: { ...RATE_LIMIT_CONFIGS.WRITE, identifier: 'createTheme' }
});
