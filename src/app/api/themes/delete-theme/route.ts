import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";

export const runtime = 'edge';

const deleteTheme = async (req: NextRequest) => {
    const API_ENDPOINT = process.env.SERVER_DELETE_THEME;

    if (!API_ENDPOINT) {
        return NextResponse.json(
            { error: "API endpoint no está definido" },
            { status: 500 }
        );
    }

    try {
        const token = await getUserToken();
        const themeID = await req.json()
        const response = await fetch(`${API_ENDPOINT}${themeID.themeID}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                signal: AbortSignal.timeout(5000)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Error al eliminar el tema");
        }

        const data = await response.json();
        return NextResponse.json({ message: data.message });


    } catch (error) {
        console.error({ error: error });
        return NextResponse.json({ error: "error al eliminar el tema" }, { status: 500 });
    }
}

export const DELETE = rateLimitter({
    fn: deleteTheme,
    options: { ...RATE_LIMIT_CONFIGS.WRITE, identifier: 'deleteTheme' }
});