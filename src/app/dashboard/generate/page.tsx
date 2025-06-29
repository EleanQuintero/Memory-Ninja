"use client";

import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Generator } from "@/components/generator/GeneratorFlashCard";
import { Protect } from "@clerk/nextjs";

export default function GeneratorPage() {
  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
    <main className="flex flex-col gap-27 items-center justify-center min-h-screen p-4">
      <section className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Generador de FlashCards</h1>
        <p className="mt-4 text-2xl">
          Descubre la forma más inteligente y rápida de crear tus tarjetas de estudio personalizadas con la ayuda de IA.
        </p>
        <p className="mt-4 text-2xl">
          Elige entre una amplia variedad de temas, organiza tus tarjetas y estudia donde y cuando quieras, optimizando tu aprendizaje al máximo.
        </p>
        <Generator />
      </section>
    </main>
    </Protect>
  );
}
