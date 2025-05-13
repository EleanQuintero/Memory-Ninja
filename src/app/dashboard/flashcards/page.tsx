"use client";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useCardAnswerStore } from "@/store/cardProcess";

export default function FlashCardsPage() {
  const questions = useCardInputStore((state) => state.question);
  const theme = useCardInputStore((state) => state.theme);
  const user = useCardInputStore((state) => state.username);
  const answers = useCardAnswerStore((state) => state.answer);
  console.log(answers);

  const flashcardData = {
    theme: theme,
    questionsData: [
      {
        question: questions,
        answer: answers,
      },
    ],
  };

  return (
    <div>
      <h1>Hola {user} aqui tienes tus flashcards listas para estudiar</h1>
      <p>Tema: {theme}</p>
      <div>
        {questions.length < 1 ? (
          <p>No hay preguntas disponibles</p>
        ) : (
          <div className="flex flex-row gap 4 justify-center items-center">
            {flashcardData.questionsData[0].question.map((q, i) => (
              <Flashcard
                key={i}
                question={q}
                answer={flashcardData.questionsData[0].answer[i]}
                theme={flashcardData.theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
