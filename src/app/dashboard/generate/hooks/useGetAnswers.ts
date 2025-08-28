import { getAnswersProps } from "@/domain/flashcards";
import { useUIState } from "@/store/uiState/uiState";
import { retryFetchData } from "@/utils/services/functions/process/retryFetchData";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";




export const useGetAnswers = () => {
  const { setLoading } = useUIState();

  const getAnswers = async ({ theme, questions }: getAnswersProps) => {
    setLoading(true);
    try {
      const modelAnswers = await retryFetchData(() =>
        flashcardUnitOfWork.getAnswers({ theme, questions })
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
