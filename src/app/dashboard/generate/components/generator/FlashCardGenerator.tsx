import ThemeSelectorComponent from "../theme-selector/ThemeSelector";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { Send } from "lucide-react";
import type { UserResource } from "@clerk/types";
import { SourceSelector } from "./SourceSelector";
import { useForm } from "@/app/dashboard/generate/hooks/useForm";
import { useUIState } from "@/store/uiState/uiState";
import { InfoCards } from "./info-cards";

interface Props {
  loadingAnswers: boolean;
  user: UserResource | null | undefined;
}

export const FlashCardGenerator: React.FC<Props> = ({
  loadingAnswers,
  user,
}) => {
  const { handleSubmit, pregunta, handlePreguntaChange, textareaRef } =
    useForm();
  const { error } = useUIState();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  p-4 md:p-8">
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
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
              ref={textareaRef}
              id="pregunta"
              name="pregunta"
              className="w-full min-h-[120px] bg-transparent text-white placeholder-[#8d97a1]/70 outline-none resize-none text-base md:text-lg"
              minLength={10}
              maxLength={200}
              value={pregunta}
              onChange={handlePreguntaChange}
              rows={4}
              placeholder="¿Que flashcard crearemos hoy?"
              aria-label="Introduce una pregunta para tu flashcard"
              required
            />
          </section>
          <section className="border-t border-[#4a525a]/20 p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <SourceSelector />
            <Button
              type="submit"
              disabled={!user || !user.id || !!error || loadingAnswers}
              className="flex items-center gap-2 hover:cursor-pointer"
              aria-label="Generar Flashcards"
              variant={"ghost"}
            >
              <Send className="w-4 h-4 mr-2" />
              Generar Flashcards
            </Button>
          </section>
        </form>
        {error && (
          <p
            className="text-red-500 text-center px-4 pb-2"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
        <InfoCards />
      </div>
    </div>
  );
};
