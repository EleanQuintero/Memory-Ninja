import { useThemeStore } from "@/app/dashboard/generate/components/theme-selector/store/interestThemes";
import { processQuestions } from "@/utils/services/functions/process/processQuestion";
import { FormEvent, useRef, useState } from "react";
import { useErrorMessage } from "../../../../hooks/useErrorMessage";
import { useGetAnswers } from "./useGetAnswers";
import { validatePregunta } from "@/utils/schemes/form-question-validation/formValidation";
import { flashcardToSync } from "@/domain/flashcards";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";

export const useForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pregunta, setPregunta] = useState("");
  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const { showError, debouncedSetError } = useErrorMessage();
  const { getAnswers } = useGetAnswers();
  const { saveFlashcards } = useFlashCardsQuery();

  const resetForm = () => {
    setPregunta("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = processQuestions({ data });
      const questions = result.questions;
      console.log(questions);

      // Obtenemos el tema
      const theme = selectedTheme;

      // La respuesta ya es el array de respuestas directamente
      const answers = await getAnswers({ theme, questions });

      if (!answers) {
        throw new Error("No se recibieron respuestas de la API");
      }

      //Enviamos los datos al store para mostrar de forma local
      const flashcardData: flashcardToSync = {
        flashcard: questions.map((question, index) => ({
          question,
          answer: answers[index],
          theme,
        })),
      }

      saveFlashcards(flashcardData);





      resetForm();
    } catch (error) {
      if (error instanceof Error)
        showError("Error al obtener la respuesta", 2000);
    }
  };

  const handlePreguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPregunta(value);

    const errorMessage = validatePregunta(value);
    debouncedSetError(errorMessage);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reinicia el alto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Ajusta al contenido
    }
  };

  return { handleSubmit, handlePreguntaChange, pregunta, textareaRef };
};
