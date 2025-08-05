import { useMemo } from "react";
import { flashcard } from "@/domain/flashcards";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";


interface Props {
  themeToFilter?: string | null
}

export const useFilterFlashcards = ({ themeToFilter }: Props) => {

  const { flashcards } = useFlashCardsQuery()
  const allFlashCards = flashcards || [];

  const result = useMemo(() => {
    const filteredCards = themeToFilter
      ? allFlashCards.filter((card: flashcard) => card.theme === themeToFilter)
      : allFlashCards;

    return { filteredFlashcards: filteredCards };
  }, [themeToFilter, allFlashCards])

  return result;
}