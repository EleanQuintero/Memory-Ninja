import { flashcardToSync } from "@/domain/flashcards";
import {z} from "zod"

const flashcardSchema = z.object({
    user_id: z.string().min(1, "El user_id es obligatorio"),
    flashcard: z.array(
      z.object({
        flashcard_id: z.string().min(1, "El flashcard_id es obligatorio"),
        question: z.string().min(1, "La pregunta es obligatoria").max(500, "La pregunta es muy larga"),
        answer: z.string().min(1, "La respuesta es obligatoria").max(290, "La respuesta es muy larga"),
        theme: z.string()
      })
    ).min(1, "Debe tener al menos una flashcard").max(5, "Demasiadas flashcards"),
  });

  export const validateFlashcards = (value: flashcardToSync) => {
    const result = flashcardSchema.safeParse(value)
    if (!result.success) {return result.error.errors[0].message}
    return null
  }