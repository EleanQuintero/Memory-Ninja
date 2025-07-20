import { useErrorMessage } from "@/hooks/useErrorMessage";
import { useUIState } from "@/store/uiState/uiState";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";
import { useFlashCardsStore } from "../store/flashCardsStore";

export const useDelete = () => {

    const { setLoading } = useUIState();
    const { setError } = useErrorMessage();
    const { consolidatedFlashCards } = useFlashCardsStore()
    


    const deleteFlashcard = async (user_id: string, id: string) => {
        try {
            setLoading(true);
            await flashcardUnitOfWork.deleteFlashcard(user_id, id);
            const updatedFlashcards = consolidatedFlashCards.filter(flashcard => flashcard.flashcard_id !== id);
            useFlashCardsStore.setState({ consolidatedFlashCards: updatedFlashcards });
        } catch (error) {
            setError("Error al eliminar la flashcard");
            if (error instanceof Error) throw new Error(error.message);
        } finally {
            setLoading(false);
        }
            
    }

    return { deleteFlashcard }

}