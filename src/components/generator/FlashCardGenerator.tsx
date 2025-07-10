
import ThemeSelectorComponent from "./ThemeSelector";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import type { UserResource } from "@clerk/types";
import { SourceSelector } from "./SourceSelector";
import { InfoCards } from "../cards/info-cards";
import { useState } from "react";

interface Props {
  error: string | null;
  pregunta: string;
  loadingAnswers: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePreguntaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  user: UserResource | null | undefined
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}



export const FlashCardGenerator: React.FC<Props> = ({
  error,
  pregunta,
  loadingAnswers,
  handleSubmit,
  handlePreguntaChange,
  user,
  textAreaRef
}) => {
  const [selectedSource, setSelectedSource] = useState("all");

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
        {/* Selector de tema separado visualmente */}
        <div className="w-full flex justify-center">
            <ThemeSelectorComponent />
        </div>
        {/* Formulario principal */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-opacity-[0.03] border border-[#4a525a]/20 rounded-xl shadow-lg"
        >
          {/* Textarea separado visualmente */}
          <div className="p-4 md:p-6 flex flex-col gap-4">
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
          </div>
          <div className="border-t border-[#4a525a]/20 p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <SourceSelector selected={selectedSource} onSelect={setSelectedSource} />
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
          </div>
          {error && (
            <p className="text-red-500 text-center px-4 pb-2" aria-live="assertive">
              {error}
            </p>
          )}
        </form>
        {/* Tarjetas informativas */}
       <InfoCards />
      </div>
    </div>
  );
}; 