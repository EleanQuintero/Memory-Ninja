import { getAnswersProps } from "@/domain/flashcards";
import { z } from "zod"

const getAnswersSchema = z.object({
  questions: z.array(z.string()).min(1, "Debe tener al menos una pregunta"),
  theme: z.string().min(1, "El tema es obligatorio"),
  model: z.string().min(1, "Debes seleccionar un modelo"),
});

export const validateGetAnswers = (value: getAnswersProps) => {
  const result = getAnswersSchema.safeParse(value)
  if (!result.success) { return result.error.errors[0].message }
  return null
}