"use client";

import { Generator } from "@/components/generator/GeneratorFlashCard";

export default function GeneratorPage() {
  return (
    <main className="grid grid-rows-1 items-center justify-center min-h-screen p-4">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Generador de FlashCards</h1>
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
