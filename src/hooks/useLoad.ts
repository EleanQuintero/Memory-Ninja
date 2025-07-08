import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";
import { useEffect, useState } from "react";

export const useLoad = (user_id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const loadFlashcards = async () => {
    try {
      await flashcardUnitOfWork.loadUserFlashCards(user_id);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Error loading flashcards")
      );
    } finally {
      setIsLoading(false);
    }
  };
  

   // Cargar flashcards
   useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (!user_id) return;
    
    
    setTimeout(() => {loadFlashcards();}, 600)
    
  }, [user_id]);

  return { isLoading, error }
};
