import { useMemo } from "react";
import { flashcard } from "@/domain/flashcards";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";


interface Props {
  themeToFilter?: string | null
  userID: string;
}

export const useFilterFlashcards = ({ themeToFilter, userID }: Props) => {

  const { flashcards } = useFlashCardsQuery(userID)
  const allFlashCards = flashcards || [];

  const result = useMemo(() => {
    const filteredCards = themeToFilter
      ? allFlashCards.filter((card: flashcard) => card.theme === themeToFilter)
      : allFlashCards;

    return { filteredFlashcards: filteredCards };
  }, [themeToFilter, allFlashCards])

  return result;
}