import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { useState } from "react";

interface getAnswersProps {
  theme: string;
  userLevel: string;
  questions: string[];
}

export const useGetAnswers = () => {
  const [loadingAnswers, setLoadingAnswers] = useState(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const getAnswers = async ({ theme, userLevel, questions}: getAnswersProps) => {
    setLoadingAnswers(true);
    let retries = 2;
    while (retries > 0) {
      try {
        const modelAnswers = await getModelAnswer(theme, questions, userLevel);
        setLoadingAnswers(false);
        if (modelAnswers.length > 0) {
          return modelAnswers;
        }
      } catch (error) {
        retries -= 1;
        if (retries > 0) {
          await delay(5000);
        } else {
          setLoadingAnswers(false);
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("Error desconocido");
          }
        }
      }
    }
    setLoadingAnswers(false);
    return [];
  };

  return { getAnswers, loadingAnswers };
};
