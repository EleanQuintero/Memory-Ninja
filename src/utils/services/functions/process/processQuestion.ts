import { validatePregunta } from "@/utils/schemes/formValidation";
import { processToArray } from "./processToArray";

interface props {
    data: Record<string, FormDataEntryValue>
}


export function processQuestions({ data }: props) {
  // Procesamos las preguntas como array
  const questions = processToArray(data);

  // Validamos cada pregunta
  for (const question of questions) {
    const errorMessage = validatePregunta(question);
    if (errorMessage) {
      return { error: errorMessage };
    }
  }

  // Si todas las preguntas son válidas
  return { questions };
}