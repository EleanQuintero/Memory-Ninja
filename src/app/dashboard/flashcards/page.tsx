"use client";
import { ThemeSelector } from "@/app/dashboard/flashcards/components/ThemeSelector";
import Flashcard from "@/app/dashboard/flashcards/components/flashcard";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useFlashcardSync } from "@/hooks/useFlashcardSync";
import LoadingModal from "@/components/fallbacks/LoadingModal";
import { useUIState } from "@/store/uiState/uiState";
import { useFilterFlashcards } from "@/app/dashboard/flashcards/hooks/useFilterFlashcards";
import { useFlashCardsQuery } from "../hooks/flashcards-query/useFlashCardsQuery";

export default function FlashCardsPage() {
  const { user } = useUser();
  const user_id = user?.id;

  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const { filteredFlashcards } = useFilterFlashcards({
    themeToFilter: selectedTheme,
    userID: user_id as string,
  });

  // Obtener datos del usuario
  const userName =
    user?.firstName?.slice(0, 5) + " " + user?.lastName?.slice(0, 8);

  const { error } = useUIState();
  const { isLoading } = useFlashCardsQuery(user_id as string);

  // Iniciar sincronización
  useFlashcardSync(user_id as string);

  // Manejar estados de carga y error
  if (isLoading) {
    return (
      <LoadingModal
        message="Cargando tus flashcards..."
        isLoading={isLoading}
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
              flashcard_id={data.flashcard_id as string}
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
