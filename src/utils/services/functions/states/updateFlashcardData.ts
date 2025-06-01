import { useFlashCardStore } from "@/store/flashCardData";
import { FlashcardData } from "@/domain/flashcards";

export const setFlashcardData = (data: FlashcardData) => {
    const store = useFlashCardStore.getState();
    store.setFlashCardsState(data);
}