import { useRef, useState } from "react";
import { validatePregunta } from "@/utils/schemes/formValidation";
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


  const user_id = user?.id;
  const { loadingAnswers } = useGetAnswers();

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

   /* if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reinicia el alto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Ajusta al contenido
    } */
  };

  /*const resetForm = () => {
    setPregunta("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };*/

 

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
    <section className="flex flex-row items-center justify-center rounded-lg w-full mt-auto text-xl">
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
          textAreaRef={textareaRef}
          loadingAnswers={loadingAnswers}
          handlePreguntaChange={handlePreguntaChange}
        />
        )}
      <SyncIndicator />
    </section>
  );
};
