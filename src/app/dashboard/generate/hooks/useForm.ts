import { processQuestions } from "@/utils/services/functions/process/processQuestion";
import { FormEvent, useRef, useState } from "react";
import { useErrorMessage } from "../../../../hooks/useErrorMessage";
import { useGetAnswers } from "./useGetAnswers";
import { validatePregunta } from "@/utils/schemes/form-question-validation/formValidation";
import { flashcardToSync } from "@/domain/flashcards";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";
import { useThemeQuerys } from "../../hooks/themes-query/useThemeQuerys";
import { useSourceStore } from "../store/sourceStore";
import { toast } from "sonner";

export const useForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pregunta, setPregunta] = useState("");
  const { showError, debouncedSetError } = useErrorMessage();
  const { getAnswers } = useGetAnswers();
  const { saveFlashcardsAsync, isSavingFlashcards, isErrorSaving, savingError } = useFlashCardsQuery();
  const { selectedTheme } = useThemeQuerys()
  const { source } = useSourceStore();

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
      const model = source
      const theme = selectedTheme;
      const answers = await getAnswers({ theme, questions, model });

      if (!answers) {
        throw new Error("No se recibieron respuestas de la API");
      }

      const flashcardData: flashcardToSync = {
        flashcard: questions.map((question, index) => ({
          question,
          answer: answers[index],
          theme,
        })),
      }


      try {
        await saveFlashcardsAsync(flashcardData);
        resetForm();
        toast.success("¡Flashcard creada con éxito!", {
          description: "Tu flashcard se ha guardado correctamente",
          duration: 4000,
          icon: "✨",
        });
      } catch (saveError) {
        const errorMessage = saveError instanceof Error ? saveError.message : "Error desconocido";
        toast.error("Error al guardar la flashcard", {
          description: errorMessage,
          duration: 5000,
          action: {
            label: "Reintentar",
            onClick: () => window.location.reload(),
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al generar flashcard", {
          description: error.message,
          duration: 5000,
        });
        showError(error.message, 3000);
      }
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

  return {
    handleSubmit,
    handlePreguntaChange,
    pregunta,
    textareaRef,
    isSavingFlashcards,
    isErrorSaving,
    savingError
  };
};
