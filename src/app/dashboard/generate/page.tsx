"use client";

import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Generator } from "@/components/generator/GeneratorFlashCard";
import { Button } from "@/components/ui/button";
import { syncUser } from "@/utils/services/functions/postUserData";
import { Protect } from "@clerk/nextjs";

export default function GeneratorPage() {
  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
    <main className="flex flex-col gap-27 items-center justify-center min-h-screen p-4">
      <section className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Generador de FlashCards</h1>
        <p className="mt-4 text-2xl">
          Aquí podrás generar tus tarjetas de estudio con IA.
        </p>
        <p className="mt-4 text-2xl">
          Puedes elegir entre diferentes temas y organizar tus tarjetas para
          estudiar de forma cómoda y sencilla en cualquier lugar.
        </p>
      </section>
      <Button onClick={syncUser}>Cargar usuario</Button>
      <section>
        <Generator />
      </section>
    </main>
    </Protect>
  );
}
