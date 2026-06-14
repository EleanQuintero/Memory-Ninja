import { AnswerData } from "@/domain/flashcards";
import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { validateGetAnswers } from "@/utils/schemes/get-answers-validation/getAnswersValidation";
import { getUserToken } from "@/utils/services/auth/getToken";
import { getUserPlanInfo } from "@/utils/services/auth/checkUserPlan";
import { FREE_LIMITS } from "@/utils/consts/planLimits";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

async function generateAnswer(req: NextRequest) {

  const API_ENDPOINT = process.env.SERVER_GENERATE_ANSWER;
  if (!API_ENDPOINT) {
    throw new Error("API endpoint no está definido");
  }

  try {
    const token = await getUserToken()
    const rawData = await req.json();
    const validationError = validateGetAnswers(rawData);

    if (validationError) {
      return NextResponse.json(
        {
          error: "Invalid Data",
          details: validationError,
        },
        { status: 400 }
      );
    }

    let { questions, theme, model } = rawData;

    // Server-side plan enforcement
    const { isPro, userId } = await getUserPlanInfo();
    if (!isPro) {
      // Force free-tier model
      const allowedModels = FREE_LIMITS.allowedModels as readonly string[];
      if (!allowedModels.includes(model)) {
        model = FREE_LIMITS.allowedModels[0];
      }

      // Daily generation limit via Redis counter
      if (userId) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const dailyKey = `dailyGen:${userId}:${today}`;
        const count = await redis.incr(dailyKey);

        // Set TTL on first increment so the key auto-expires
        if (count === 1) {
          await redis.expire(dailyKey, 86400); // 24h TTL
        }

        if (count > FREE_LIMITS.maxDailyGenerations) {
          return NextResponse.json(
            {
              error: `Has alcanzado el límite de ${FREE_LIMITS.maxDailyGenerations} generaciones diarias en el plan gratuito. Vuelve mañana o mejora a Pro para generaciones ilimitadas.`,
              code: "DAILY_LIMIT_REACHED",
              limit: FREE_LIMITS.maxDailyGenerations,
              resetDate: today,
            },
            { status: 403 }
          );
        }
      }
    }

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        , Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ questions, tema: theme, model }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al generar la respuesta");
    }

    const data: AnswerData = await response.json();

    const answers = Array.isArray(data.answer) ? data.answer : [data.answer];
    return NextResponse.json({ answer: answers }, { status: 200 });

  } catch (error) {
    console.error("Backend API error:", {
      endpoint: "/api/generate-answer",
      error: error,
    });

    return NextResponse.json(
      { error: "Error al generar la respuesta" },
      { status: 400 }
    );
  }
}

export const POST = rateLimitter({
  fn: generateAnswer,
  options: { ...RATE_LIMIT_CONFIGS.WRITE, identifier: 'generateAnswer' }
});
