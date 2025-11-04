import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { validateFlashcards } from "@/utils/schemes/flashcards-validation/flashcardsValidation";
import { getUserToken } from "@/utils/services/auth/getToken";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

export const runtime = 'edge';

async function saveFlashcards(req: NextRequest) {

  const API_ENDPOINT = process.env.SERVER_SAVE_FLASHCARDS;

  if (!API_ENDPOINT) {
    throw new Error("API endpoint no está definido");
  }

  const user = await currentUser();
  const userId = user?.id;

  try {
    const token = await getUserToken()
    const flashcardData = await req.json();
    const rawData = {
      user_id: userId,
      ...flashcardData
    }

    const validationError = validateFlashcards(rawData);

    if (validationError) {
      return NextResponse.json(
        {
          error: "Invalid Data",
          details: validationError,
        },
        { status: 400 }
      );
    }
    const response = await fetch(API_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        signal: AbortSignal.timeout(5000),
        body: JSON.stringify(rawData),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al guardar las flashcards");
    }

    return NextResponse.json(
      { message: "Flashcards guardadas correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Backend API error:", {
      endpoint: "/api/user/flashcard/new",
      error: error,
    });

    return NextResponse.json(
      { error: "Error al guardar las flashcards" },
      { status: 500 }
    );
  }
}

export const POST = rateLimitter({
  fn: saveFlashcards,
  options: { ...RATE_LIMIT_CONFIGS.WRITE, identifier: 'saveFlashcards' }
});
