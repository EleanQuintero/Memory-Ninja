"use client";
import { ChooseTheme } from "@/components/flashcards/ChooseTheme";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useFlashcardSync } from "@/hooks/useFlashcardSync";

export default function FlashCardsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Obtener datos del store
  const allFlashCardData = useFlashCardsStore((state) => state.allFlashCards);
  const questions = allFlashCardData.questions;
  const theme = allFlashCardData.theme;
  const answers = allFlashCardData.answer;
  
  // Obtener datos del usuario
  const userName = useCardInputStore((state) => state.userName);
  const user = useUser();
  const user_id = user.user?.id;

  // Cargar flashcards
  useEffect(() => {
    const loadFlashcards = async () => {
      if (!user_id) return;

      try {
        setIsLoading(true);
        setError(null);
        await flashcardUnitOfWork.loadUserFlashCards(user_id);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error loading flashcards'));
      } finally {
        setIsLoading(false);
      }
    };

    loadFlashcards();
  }, [user_id]);

  // Iniciar sincronización
  useFlashcardSync(user_id as string);

  // Preparar datos para las flashcards
  const flashcardData = {
    theme: theme,
    questionsData: questions.map((question, index) => ({
      question,
      answer: answers[index],
    })),
  };

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Hola {userName}, aquí tienes tus flashcards listas para estudiar
      </h1>
      
      <div className="mb-6">
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
          Tema:
        </label>
        <ChooseTheme theme={theme} />
      </div>

      <div>
        {questions.length < 1 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No hay preguntas disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcardData.questionsData.map((data, i) => (
              <Flashcard
                key={i}
                question={data.question}
                answer={data.answer}
                theme={flashcardData.theme[i]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
