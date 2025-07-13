import { rateLimitter } from "@/middleware/rate-limit";
import { NextResponse, NextRequest } from "next/server";

async function saveFlashcards(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("datos en server:", data);

    const response = await fetch(
      "http://localhost:4444/api/user/flashcard/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error(errorData);
      return new NextResponse("Error al guardar las flashcards", {
        status: 400,
      });
    }

    return new NextResponse("Flashcards guardadas correctamente", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error al guardar las flashcards", { status: 500 });
  }
}

export const POST = rateLimitter({ fn: saveFlashcards });
