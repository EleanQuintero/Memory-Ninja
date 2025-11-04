import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { getUserToken } from "@/utils/services/auth/getToken";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export const runtime = 'edge';

async function deleteFlashcard(req: NextRequest) {

  const API_ENDPOINT = process.env.SERVER_DELETE_FLASHCARD;
  if (!API_ENDPOINT) {
    return NextResponse.json(
      { error: "API endpoint no está definido" },
      { status: 500 }
    );
  }

  const user = await currentUser();
  const userID = user?.id;
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
      `${API_ENDPOINT}${userID}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
          , Authorization: `Bearer ${token}`
        },
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || "Error al eliminar la flashcard");
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

export const DELETE = rateLimitter({
  fn: deleteFlashcard,
  options: { ...RATE_LIMIT_CONFIGS.WRITE, identifier: 'deleteFlashcard' }
});
