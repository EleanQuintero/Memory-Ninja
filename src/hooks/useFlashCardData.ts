import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useState, useEffect } from "react";
import { flashcard } from "@/domain/flashcards";


interface Props {
  themeToFilter?: string | null;
}

export const useFlashCardData = ({ themeToFilter }: Props) => {
 
    const allFlashCards = useFlashCardsStore((state) => state.consolidatedFlashCards);
    const [filteredFlashcards, setFilteredFlashcards] = useState<flashcard[]>([]);

    useEffect(() => {
        if (themeToFilter) {
            setFilteredFlashcards(allFlashCards.filter(card => card.theme === themeToFilter));
          } 
         else {
            // Si no hay filtro, mostrar todas
      setFilteredFlashcards(allFlashCards);
        }
    }, [themeToFilter, allFlashCards]);

    return { filteredFlashcards };
}
