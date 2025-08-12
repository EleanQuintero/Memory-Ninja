"use client";
import { ThemeSelector } from "@/app/dashboard/flashcards/components/ThemeSelector";
import Flashcard from "@/app/dashboard/flashcards/components/flashcard";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import LoadingModal from "@/components/fallbacks/LoadingModal";
import { useUIState } from "@/store/uiState/uiState";
import { useFilterFlashcards } from "@/app/dashboard/flashcards/hooks/useFilterFlashcards";
import { useFlashCardsQuery } from "../hooks/flashcards-query/useFlashCardsQuery";

export default function FlashCardsPage() {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const { filteredFlashcards } = useFilterFlashcards({
    themeToFilter: selectedTheme,
  });

  // Obtener datos del usuario
  const userName = user?.username;

  const { error } = useUIState();
  const { flashcardLoading } = useFlashCardsQuery();

  // Manejar estados de carga y error
  if (flashcardLoading) {
    return (
      <LoadingModal
        message="Cargando tus flashcards..."
        isLoading={flashcardLoading}
      />
    );
  }

  if (filteredFlashcards.length < 1 && !error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No hay preguntas disponibles</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-red-500 text-2xl mb-4">
          Error al cargar las flashcards
        </h2>
        <p className="text-red-700">Intente de nuevo mas tarde</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Hola {userName}, aquí tienes tus flashcards listas para estudiar
      </h1>

      <div className="mb-6">
        <label
          htmlFor="theme"
          className="block text-md font-bold text-white mb-2"
        >
          Tema seleccionado:
        </label>
        <ThemeSelector
          onThemeChange={setSelectedTheme}
          selectedTheme={selectedTheme}
        />
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlashcards.map((data) => (
            <Flashcard
              flashcardID={data.flashcard_id as string}
              key={data.flashcard_id}
              question={data.question}
              answer={data.answer}
              theme={data.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
