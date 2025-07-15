import { useUIState } from "@/store/uiState/uiState";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";
import { useEffect } from "react";
import { useErrorMessage } from "../../../../hooks/useErrorMessage";

export const useLoad = (user_id: string) => {
  const { setLoading } = useUIState();
  const { setError } = useErrorMessage();

  const loadFlashcards = async () => {
    try {
      await flashcardUnitOfWork.loadUserFlashCards(user_id);
    } catch (error) {
      setError("Error al cargar las flashcards");
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar flashcards
  useEffect(() => {
    setLoading(true);
    if (!user_id) return;
    setTimeout(() => {
      loadFlashcards();
    }, 600);
  }, [user_id]);
};
