import { FormEvent, useRef, useState } from "react";
import { processToArray } from "@/utils/services/functions/process/processToArray";
import { validatePregunta } from "@/utils/schemes/formValidation";
import { useThemeStore } from "@/store/interestThemes";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useUser } from "@clerk/nextjs";
import { useFlashcardSync } from "@/hooks/useFlashcardSync";
import SyncIndicator  from "../ui/sync-indicator";
import debounce from "debounce";
import { useGetAnswers } from "@/hooks/useGetAnswers";
import { usePing } from "@/hooks/usePing";
import LoadingModal from "../fallbacks/LoadingModal";
import { FlashCardGenerator } from "./FlashCardGenerator";

export const Generator = () => {
  const [pregunta, setPregunta] = useState("");
  const [error, setError] = useState<null | string>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user, isLoaded } = useUser();
  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const addNewFlashcards = useFlashCardsStore(
    (state) => state.addNewFlashcards
  );
  const user_id = user?.id;
  const { getAnswers, loadingAnswers } = useGetAnswers();

  usePing();

  const debouncedSetError = useRef(
    debounce((errorMessage: string | null) => {
      setError(errorMessage);
    }, 500)
  ).current;

  // Iniciar sincronización
  useFlashcardSync(user_id as string);

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

    // Procesamos las preguntas como array
    const questions = processToArray(data);

    //Validamos cada pregunta
    for (const question of questions) {
      const errorMessage = validatePregunta(question);
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
      const answers = await getAnswers({ theme, questions, userLevel });

      if (!answers) {
        throw new Error("No se recibieron respuestas de la API");
      }

      //Enviamos los datos al store para mostrar de forma local
      addNewFlashcards(theme, questions, answers);

      resetForm();
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
      {loadingAnswers ? (
        <LoadingModal
          isLoading={loadingAnswers}
          message="Processing your request..."
          theme={{
            container: "bg-gradient-to-br from-blue-950 via-slate-900 to-black",
            spinner: "border-slate-700/40 border-t-blue-500",
            message: "from-blue-300 via-cyan-200 to-blue-300",
          }}
          size="md"
          spinnerType="ring"
          showClose={true}
          blur={true}
        />
      ) : (
        <FlashCardGenerator
          user={user}
          error={error}
          pregunta={pregunta}
          textareaRef={textareaRef}
          loadingAnswers={loadingAnswers}
          handleSubmit={handleSubmit}
          handlePreguntaChange={handlePreguntaChange}
        />
      )}
      <SyncIndicator />
    </section>
  );
};
