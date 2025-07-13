import { getAnswersProps} from "@/domain/flashcards";
import {z} from "zod"

const getAnswersSchema = z.object({
    userLevel: z.string().min(1, "El nivel del usuario es obligatorio"),
    questions: z.array(z.string()).min(1, "Debe tener al menos una pregunta"),
    theme: z.string().min(1, "El tema es obligatorio"),
  });

  export const validateGetAnswers = (value: getAnswersProps) => {
    const result = getAnswersSchema.safeParse(value)
    if (!result.success) {return result.error.errors[0].message}
    return null
  }