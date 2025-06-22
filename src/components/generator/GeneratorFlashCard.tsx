import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { processToArray } from "@/utils/services/functions/process/processToArray";
import { formSchema } from "@/utils/schemes/formValidation";
import ThemeSelectorComponent from "./ThemeSelector";
import { useThemeStore } from "@/store/interestThemes";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useUser } from "@clerk/nextjs"
import { useFlashcardSync } from "@/hooks/useFlashcardSync";
import { SyncIndicator } from "../ui/sync-indicator";

export const Generator = () => {
  const [pregunta, setPregunta] = useState("");
  const [error, setError] = useState<null | string>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser() 
  const selectedTheme = useThemeStore((state) => state.selectedTheme)
  const addNewFlashcards = useFlashCardsStore((state) => state.addNewFlashcards)
  const user_id = user?.id

  // Iniciar sincronización
  useFlashcardSync(user_id as string);

  const handlePreguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPregunta(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reinicia el alto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Ajusta al contenido
    }
  };

  const resetForm = () => {
    setPregunta("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    //Validamos los datos introducidos al formulario
    const result = formSchema.safeParse(data);

    if (!result.success) {
      setError(result.error.errors[0].message);
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    try {
      // Procesamos las preguntas como array
      const questions = processToArray(data);

      // Obtenemos el tema
      const theme = selectedTheme;

      //Enviamos los datos a la API
      const userLevel = "basic";

      // La respuesta ya es el array de respuestas directamente
      const answers = await getModelAnswer(
        theme as string,
        questions,
        userLevel
      );

      if (!answers) {
        throw new Error("No se recibieron respuestas de la API");
      }

    
      //Enviamos los datos al store para mostrar de forma local
      addNewFlashcards(theme as string, questions, answers)
    
      resetForm();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al procesar la solicitud"
      );
    }
  };

  return (
    <section className="flex flex-row items-center justify-center rounded-lg p-5 mt-auto text-xl">
      <form
        className="flex flex-col items-center justify-center gap-3"
        onSubmit={handleSumbit}
      >
        <ThemeSelectorComponent />
        <label htmlFor="pregunta">Introduce aquí tu pregunta</label>
        <Textarea
          id="pregunta"
          name="pregunta"
          className="resize-none w-80 text-lg md:w-[45em] md:text-xl overflow-hidden"
          minLength={10}
          maxLength={200}
          value={pregunta}
          onChange={handlePreguntaChange}
          ref={textareaRef}
          rows={1}
          placeholder="Escribe aquí tu pregunta..."
        />
        <Button
          className="cursor-pointer hover:bg-blue-600"
          type="submit"
        >Generar Flashcard</Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <SyncIndicator />
    </section>
  );
};
