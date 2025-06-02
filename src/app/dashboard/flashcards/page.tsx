"use client";
import { ChooseTheme } from "@/components/flashcards/ChooseTheme";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function FlashCardsPage() {
  const allFlashCardData = useFlashCardsStore((state) => state.allFlashCards)
  const questions = allFlashCardData.questions
  const theme = allFlashCardData.theme
  const userName = useCardInputStore((state) => state.userName);
  const answers = allFlashCardData.answer
  const user = useUser()
  const user_id = user.user?.id

  useEffect(() => {
    flashcardUnitOfWork.loadUserFlashCards(user_id as string)
  }, [user_id])


  const flashcardData = {
    theme: theme,
    questionsData: questions.map((question, index) => ({
      question,
      answer: answers[index],
    })),
  };

  return (
    <div>
      <h1>Hola {userName} aquí tienes tus flashcards listas para estudiar</h1>
      <label htmlFor="theme">Tema:</label>
      <ChooseTheme theme={theme} />
      <div>
        {questions.length < 1 ? (
          <p>No hay preguntas disponibles</p>
        ) : (
          <div className="flex flex-row gap-4 justify-center items-center">
            {flashcardData.questionsData.map((data, i) => (
              <Flashcard
                key={i}
                question={data.question}
                answer={data.answer}
                theme={flashcardData.theme[i]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
