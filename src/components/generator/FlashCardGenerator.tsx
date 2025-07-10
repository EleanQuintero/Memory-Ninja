
import { FormEvent } from "react"
import ThemeSelectorComponent from "./ThemeSelector";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import type { UserResource } from "@clerk/types";
import { SourceSelector } from "./SourceSelector";
import { InfoCards } from "../cards/info-cards";
import { useThemeStore } from "@/store/interestThemes";
import { processQuestions } from "@/utils/services/functions/process/processQuestion";
import { useGetAnswers } from "@/hooks/useGetAnswers";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useErrorMessage } from "@/hooks/useErrorMessage";

interface Props {
  error: string | null;
  pregunta: string;
  loadingAnswers: boolean;
  handlePreguntaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  user: UserResource | null | undefined
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}



export const FlashCardGenerator: React.FC<Props> = ({
  error,
  pregunta,
  loadingAnswers,
  handlePreguntaChange,
  user,
  textAreaRef
}) => {
  const addNewFlashcards = useFlashCardsStore((state) => state.addNewFlashcards);
  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const {  getAnswers } = useGetAnswers() 
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = processQuestions({data})

    if(result.error) {
      
      return;
    }
      const questions = result.questions as string[];

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

      //resetForm();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al procesar la solicitud"
      );
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  p-4 md:p-8">
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        {/* Títulos principales */}
        <div className="w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
            Crear Flashcards
          </h1>
          <p className="text-sm md:text-base text-[#84aed5] mb-2 text-center">
            POTENCIADO POR IA PARA MEJORAR TU APRENDIZAJE
          </p>
        </div>        
            <ThemeSelectorComponent />
        <form
          onSubmit={handleSubmit}
          className="w-full bg-opacity-[0.03] border border-[#4a525a]/20 rounded-xl shadow-lg"
        >
          <section className="p-4 md:p-6 flex flex-col gap-4">
            <Textarea
              ref={textAreaRef}
              id="pregunta"
              name="pregunta"
              className="w-full min-h-[120px] bg-transparent text-white placeholder-[#8d97a1]/70 outline-none resize-none text-base md:text-lg"
              minLength={10}
              maxLength={200}
              value={pregunta}
              onChange={handlePreguntaChange}
              rows={4}
              placeholder="Introduce un tema o concepto para tus flashcards..."
              aria-label="Introduce un tema o concepto para tus flashcards"
              required
            />
          </section>
          <section className="border-t border-[#4a525a]/20 p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <SourceSelector />
            <Button
              type="submit"
              disabled={!user || !user.id || !!error || loadingAnswers}
              className="flex items-center gap-2"
              aria-label="Generar Flashcards"
              variant={"primary"}
            >
              <Send className="w-4 h-4 mr-2" />
              Generar Flashcards
            </Button>
          </section>
        </form>
        {error && (
            <p className="text-red-500 text-center px-4 pb-2" aria-live="assertive">
              {error}
            </p>
          )}
       <InfoCards />
      </div>
    </div>
  );
}; 