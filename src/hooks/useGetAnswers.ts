import { getAnswersProps } from "@/domain/flashcards";
import { useUIState } from "@/store/uiState/uiState";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { retryFetchData } from "@/utils/services/functions/process/retryFetchData";




export const useGetAnswers = () => {
  const { setLoading } = useUIState();

  const getAnswers = async ({ theme, userLevel, questions }: getAnswersProps) => {
    setLoading(true);
    try {
      const modelAnswers = await retryFetchData(() =>
        getModelAnswer( { theme, userLevel, questions} )
      );
      setLoading(false);
      return Array.isArray(modelAnswers) ? modelAnswers : [];
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
