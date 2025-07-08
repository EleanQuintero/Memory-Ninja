"use client";
import { ChooseTheme } from "@/components/flashcards/ChooseTheme";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useFlashcardSync } from "@/hooks/useFlashcardSync";
import { useFlashCardData } from "@/hooks/useFlashCardData";
import LoadingModal from "@/components/fallbacks/LoadingModal";
import { useLoad } from "@/hooks/useLoad";

export default function FlashCardsPage() {
  const user = useUser();
  const user_id = user.user?.id;
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const { filteredFlashcards } = useFlashCardData({ themeToFilter: selectedTheme });
  
  // iniciamos carga de datos
  const { isLoading, error} = useLoad(user_id as string)
   
  // Obtener datos del usuario
  const userName = useCardInputStore((state) => state.userName);

  // Iniciar sincronización
  useFlashcardSync(user_id as string);

  // Manejar estados de carga y error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-red-500 text-xl mb-4">Error al cargar las flashcards</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <LoadingModal message="Cargando tus flashcards..." isLoading={isLoading} />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Hola {userName}, aquí tienes tus flashcards listas para estudiar
      </h1>
      
      <div className="mb-6">
        <label htmlFor="theme" className="block text-md font-bold text-white mb-2">
          Tema seleccionado:
        </label>
        <ChooseTheme onThemeChange={setSelectedTheme} selectedTheme={selectedTheme} />
      </div>

      <div>
        {filteredFlashcards.length < 1 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No hay preguntas disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlashcards.map((data) => (
              <Flashcard
                key={data.flashcard_id}
                question={data.question}
                answer={data.answer}
                theme={data.theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
