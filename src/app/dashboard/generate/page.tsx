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
    getQuestions();
    getAnswers(1);
  };

  return (
    <main className="grid grid-rows-1 items-center justify-center min-h-screen p-4">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Generador de FlashCards</h1>
        <Button onClick={handleClick}>Generar Flashcard</Button>
        <p className="mt-4 text-2xl">
          Aquí podrás generar tus tarjetas de estudio con IA.
        </p>
        <p className="mt-4 text-2xl">
          Puedes elegir entre diferentes temas y organizar tus tarjetas para
          estudiar de forma cómoda y sencilla en cualquier lugar.
        </p>
      </section>
      <section>
        <Generator />
      </section>
    </main>
  );
}
