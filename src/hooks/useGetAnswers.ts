import { useUIState } from "@/store/uiState/uiState";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { retryFetchData } from "@/utils/services/functions/process/retryFetchData";


interface getAnswersProps {
  theme: string;
  userLevel: string;
  questions: string[];
}

export const useGetAnswers = () => {
  const { setLoading } = useUIState();

  const getAnswers = async ({ theme, userLevel, questions }: getAnswersProps) => {
    setLoading(true);
    try {
      const modelAnswers = await retryFetchData(() =>
        getModelAnswer( theme, questions, userLevel )
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
