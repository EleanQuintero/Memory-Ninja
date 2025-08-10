import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export const createTheme = async (req: NextRequest) => {

    const API_ENDPOINT = process.env.SERVER_CREATE_THEME

    const token = await getUserToken()

    const themeName = req.headers.get("theme-name");

    const response = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ theme_name: themeName }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData.message }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: data.message }, { status: 201 });
}

export const POST = rateLimitter({ fn: createTheme, options: RATE_LIMIT_CONFIGS.WRITE });