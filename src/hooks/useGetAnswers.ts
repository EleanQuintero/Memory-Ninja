import { useUIState } from "@/store/uiState/uiState";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";


interface getAnswersProps {
  theme: string;
  userLevel: string;
  questions: string[];
}

export const useGetAnswers = () => {
  const  { setLoading } = useUIState()
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const getAnswers = async ({ theme, userLevel, questions}: getAnswersProps) => {
    setLoading(true);
    let retries = 2;
    while (retries > 0) {
      try {
        const modelAnswers = await getModelAnswer(theme, questions, userLevel);
        setLoading(false);
        if (modelAnswers.length > 0) {
          return modelAnswers;
        }
      } catch (error) {
        retries -= 1;
        if (retries > 0) {
          await delay(5000);
        } else {
          setLoading(false);
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("Error desconocido");
          }
        }
      }
    }
    setLoading(false);
    return [];
  };

  return { getAnswers };
};
