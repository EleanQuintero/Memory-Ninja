import { AnswerData } from "@/domain/flashcards";
import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { validateGetAnswers } from "@/utils/schemes/get-answers-validation/getAnswersValidation";
import { NextRequest, NextResponse } from "next/server";

async function generateAnswer(req: NextRequest) {
  try {
    const rawData = await req.json();
    console.log("Endpoint llamado:", "/api/generate-answer");
    console.log("Datos recibidos:", {
      userLevel: rawData.userLevel,
      theme: rawData.theme,
      questionsCount: rawData.questions?.length,
    });

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

    const { userLevel, questions, theme } = rawData;

    const response = await fetch("http://localhost:4444/api/questions/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(7000),
      body: JSON.stringify({ userLevel, questions, tema: theme }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Backend API error:", {
        status: response.status,
        endpoint: "/api/generate-answer",
        error: errorData,
      });

      return NextResponse.json(
        { error: "Error al generar la respuesta" },
        { status: 400 }
      );
    }

    const data: AnswerData = await response.json();
    console.log("Respuesta de la API:", data);

    const answers = Array.isArray(data.answer) ? data.answer : [data.answer];
    return NextResponse.json({ answer: answers }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error in generateAnswers:", {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      });
      return NextResponse.json(
        { error: "Error inesperado al generar respuesta" },
        { status: 500 }
      );
    } else {
      // Manejar errores que no son instancias de Error
      console.error("Error interno desconocido:", error);
      return NextResponse.json(
        { error: "Error interno desconocido" },
        { status: 500 }
      );
    }
  }
}

export const POST = rateLimitter({ fn: generateAnswer, options: RATE_LIMIT_CONFIGS.WRITE });
