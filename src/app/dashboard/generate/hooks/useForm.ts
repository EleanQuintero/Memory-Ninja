import { processQuestions } from "@/utils/services/functions/process/processQuestion";
import { FormEvent, useRef, useState } from "react";
import { useErrorMessage } from "../../../../hooks/useErrorMessage";
import { useGetAnswers } from "./useGetAnswers";
import { validatePregunta } from "@/utils/schemes/form-question-validation/formValidation";
import { flashcardToSync } from "@/domain/flashcards";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";
import { useThemeQuerys } from "../../hooks/themes-query/useThemeQuerys";
import { useSourceStore } from "../store/sourceStore";

export const useForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pregunta, setPregunta] = useState("");
  const { showError, debouncedSetError } = useErrorMessage();
  const { getAnswers } = useGetAnswers();
  const { saveFlashcards } = useFlashCardsQuery();
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

      console.log(answers);



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
