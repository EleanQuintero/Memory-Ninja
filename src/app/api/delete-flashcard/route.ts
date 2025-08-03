import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { getUserToken } from "@/utils/services/auth/getToken";
import { NextRequest, NextResponse } from "next/server";

async function deleteFlashcard(req: NextRequest) {
  const userID = req.headers.get("x-user-id");
  const id = req.headers.get("x-flashcard-id");

  if (!id) {
    return NextResponse.json(
      { error: "Error al obtener el id de la flashcard" },
      { status: 400 }
    );
  }

  if (typeof id !== "string") {
    return NextResponse.json(
      { error: "El id debe ser un string" },
      { status: 400 }
    );
  }

  try {

    const token = await getUserToken()

    const response = await fetch(
      `http://localhost:4444/api/user/flashcard/delete/${userID}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
          , Authorization: `Bearer ${token}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la flashcard");
    }

    const data = response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar la flashcard" },
      { status: 500 }
    );
  }
}

export const DELETE = rateLimitter({ fn: deleteFlashcard, options: RATE_LIMIT_CONFIGS.WRITE });
