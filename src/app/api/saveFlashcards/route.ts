import { rateLimitter } from "@/middleware/rate-limit";
import { validateFlashcards } from "@/utils/schemes/flashcards-validation/flashcardsValidation";
import { NextResponse, NextRequest } from "next/server";

async function saveFlashcards(req: NextRequest) {
  try {
    const rawData = await req.json();
    console.log("datos en server:", rawData);

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
    const response = await fetch(
      "http://localhost:4444/api/user/flashcard/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(5000),
        body: JSON.stringify(rawData),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();

      console.error("Backend API error:", {
        status: response.status,
        endpoint: "/api/user/flashcard/new",
        error: errorData,
      });

      return NextResponse.json(
        { error: "Error al guardar las flashcards" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Flashcards guardadas correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in saveFlashcards:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "Error al guardar las flashcards" },
      { status: 500 }
    );
  }
}

export const POST = rateLimitter({ fn: saveFlashcards });
