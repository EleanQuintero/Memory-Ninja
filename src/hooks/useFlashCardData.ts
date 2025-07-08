import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useState, useEffect } from "react";

interface Props {
  themeToFilter?: string | null;
}

interface flashCardDataProps {
    theme: string | string[]
    questionsData: {
        question: string[]
        answer: string[]
    }
}

export const useFlashCardData = ({ themeToFilter }: Props) => {
    const initialValue: flashCardDataProps = {
      theme: "",
      questionsData: {
          question: [], 
          answer: []
      }
    }
    
    const { questions, answer, theme } = useFlashCardsStore((state) => state.consolidatedFlashCards);
    const [flashCardData, setFlashCardData] = useState(initialValue);

    useEffect(() => {
        if (themeToFilter !== null && themeToFilter) {
            const filteredIndexes = theme
                .map((themeValue, idx) => (themeValue === themeToFilter ? idx : -1))
                .filter(idx => idx !== -1);
                
            const preguntasFiltradas = filteredIndexes.map(idx => questions[idx]); 
            const respuestasFiltradas = filteredIndexes.map(idx => answer[idx]); 
            const themeFiltered = filteredIndexes.map(idx => theme[idx]);
            
            const flashcardData = {
                theme: themeFiltered,
                questionsData: { 
                    question: preguntasFiltradas,
                    answer: respuestasFiltradas,
                },
            };
            setFlashCardData(flashcardData);
        } else {
            // Si no hay filtro, mostrar todos los datos
            setFlashCardData({
                theme: theme,
                questionsData: {
                    question: questions,
                    answer: answer,
                },
            });
        }
    }, [themeToFilter, questions, answer, theme]);

    return { flashCardData };
}
