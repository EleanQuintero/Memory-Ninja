import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { processToArray } from "@/utils/services/functions/process/processToArray";
import { validatePregunta } from "@/utils/schemes/formValidation";
import ThemeSelectorComponent from "./ThemeSelector";
import { useThemeStore } from "@/store/interestThemes";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useUser } from "@clerk/nextjs"
import { useFlashcardSync } from "@/hooks/useFlashcardSync";
import { SyncIndicator } from "../ui/sync-indicator";
import debounce from "debounce"

export const Generator = () => {
  const [pregunta, setPregunta] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user, isLoaded } = useUser() 
  const selectedTheme = useThemeStore((state) => state.selectedTheme)
  const addNewFlashcards = useFlashCardsStore((state) => state.addNewFlashcards)
  const user_id = user?.id


  const debouncedSetError = useRef(
    debounce((errorMessage: string | null) => {
      setError(errorMessage);
    }, 500)
  ).current;

  // Iniciar sincronización
  useFlashcardSync(user_id as string);

  const handlePreguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPregunta(value);

    const errorMessage = validatePregunta(value)
    debouncedSetError(errorMessage)

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




  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Procesamos las preguntas como array
    const questions = processToArray(data);

    //Validamos cada pregunta
    for (const question of questions){
      const errorMessage = validatePregunta(question)
      if (errorMessage) {
        setError(errorMessage);
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
    }


    try {

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
      setTimeout(()=> {
        setIsLoading(false)
      }, 5000)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al procesar la solicitud"
      );
    }
  };

  // Mostrar mensaje de carga si el usuario aún no está listo
  if (!isLoaded || !user || !user.id) {
    return (
      <section className="flex flex-row items-center justify-center rounded-lg p-5 mt-auto text-xl">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-blue-500 text-lg">Cargando datos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-row items-center justify-center rounded-lg p-5 mt-auto text-xl">
      <form
        className="flex flex-col items-center justify-center gap-3"
        onSubmit={handleSubmit}
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
          placeholder="¿Que es una flashcard?"
        />
        <Button
          className="cursor-pointer hover:bg-blue-600"
          type="submit"
          disabled={!user || !user.id || !!error || isLoading}
        >Generar Flashcard</Button>
        {error && <p className="text-red-500" aria-live="assertive">{error}</p>}
      </form>
      <SyncIndicator />
    </section>
  );
};
