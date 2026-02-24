import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { validateFlashcards } from "@/utils/schemes/flashcards-validation/flashcardsValidation";
import { getUserToken } from "@/utils/services/auth/getToken";
import { isUserPro } from "@/utils/services/auth/checkUserPlan";
import { FREE_LIMITS } from "@/utils/consts/planLimits";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

export const runtime = 'nodejs';

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

    // Server-side plan enforcement: check flashcard limit for free users
    const isPro = await isUserPro();
    if (!isPro) {
      const countEndpoint = process.env.SERVER_GET_FLASHCARDS_BY_USER;
      if (countEndpoint && userId) {
        try {
          const countResponse = await fetch(`${countEndpoint}${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            signal: AbortSignal.timeout(5000),
          });
          if (countResponse.ok) {
            const existingCards = await countResponse.json();
            const currentCount = Array.isArray(existingCards) ? existingCards.length : 0;
            const newCards = Array.isArray(rawData.flashcard) ? rawData.flashcard.length : 1;
            if (currentCount + newCards > FREE_LIMITS.maxFlashcards) {
              return NextResponse.json(
                { error: `Limite alcanzado: maximo ${FREE_LIMITS.maxFlashcards} flashcards en el plan gratuito. Mejora a Pro para crear mas.` },
                { status: 403 }
              );
            }
          }
        } catch {
          // If count check fails, allow the save to proceed
        }
      }
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
