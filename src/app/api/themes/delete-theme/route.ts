import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";
import { getUserToken } from "@/utils/services/auth/getToken";


export const deleteTheme = async (req: NextRequest) => {

    const API_ENDPOINT = process.env.SERVER_DELETE_THEME;
    const token = await getUserToken();

    const themeID = await req.json()
    console.log("Received theme ID to delete:", themeID.themeID);

    const response = await fetch(`${API_ENDPOINT}${themeID.themeID}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Error al realizar la petición");
    }

    const data = await response.json();
    console.log("Theme deleted successfully:", data.message);
    return NextResponse.json({ message: data.message });

}

export const DELETE = rateLimitter({ fn: deleteTheme, options: RATE_LIMIT_CONFIGS.WRITE });