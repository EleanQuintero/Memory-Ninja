"use client";

import { Generator } from "@/components/generator/GeneratorFlashCard";
import { Button } from "@/components/ui/button";
import { useCardInputStore } from "@/store/cardInput";
import { useCardAnswerStore } from "@/store/cardProcess";

export default function GeneratorPage() {
  // Obtenemos información del store global
  const getQuestions = useCardInputStore((state) => state.getQuestions);
  const getAnswers = useCardAnswerStore((state) => state.getAnswer);

  const handleClick = () => {
    getQuestions(1);
    getAnswers(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold">Generador de FlashCards</h1>
      <Button onClick={handleClick}>Generar Flashcard</Button>
      <p className="mt-4 text-lg">
        Aquí podrás generar tus tarjetas de estudio con IA.
      </p>
      <p>
        Ademas podrás organizarlas y en el <span>futuro</span> podrás exportar
        toda la información a pdf
      </p>
      <Generator />
    </div>
  );
}
