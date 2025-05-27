"use client";

import { Generator } from "@/components/generator/GeneratorFlashCard";

export default function GeneratorPage() {

  const syncUser = async () => {
    const res = await fetch("/api/user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Puedes enviar datos adicionales si quieres
      body: JSON.stringify({}),
    });
  
    if (!res.ok) {
      console.error("❌ Error al sincronizar usuario");
    } else {
      console.log("✅ Usuario sincronizado con éxito");
    }
  };


  return (
    <main className="flex flex-col gap-27 items-center justify-center min-h-screen p-4">
      <section className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Generador de FlashCards</h1>
        <p className="mt-4 text-2xl">
          Aquí podrás generar tus tarjetas de estudio con IA.
        </p>
        <p className="mt-4 text-2xl">
          Puedes elegir entre diferentes temas y organizar tus tarjetas para
          estudiar de forma cómoda y sencilla en cualquier lugar.
          <button onClick={() => {
          syncUser()
        }}>enviar datos</button>
        </p>
      </section>
      <section>
        <Generator />
      </section>
    </main>
  );
}
