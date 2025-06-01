import { useFlashCardStore } from "@/store/flashCardData";
import { FlashcardData } from "@/utils/types/types";

export const setFlashcardData = (data: FlashcardData) => {
    const store = useFlashCardStore.getState();
    store.setFlashCardsState(data);
}