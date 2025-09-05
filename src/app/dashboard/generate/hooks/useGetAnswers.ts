import { getAnswersProps } from "@/domain/flashcards";
import { useUIState } from "@/store/uiState/uiState";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";




export const useGetAnswers = () => {
  const { setLoading } = useUIState();
  const { getAnswer } = useFlashCardsQuery();

  const getAnswers = async ({ theme, questions, model }: getAnswersProps) => {
    setLoading(true);
    try {
      const modelAnswers = getAnswer({ theme, questions, model });
      setLoading(false);
      return modelAnswers;
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error desconocido al obtener respuestas");
    }
  };

  return { getAnswers };
};
