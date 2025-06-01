"use client";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useCardAnswerStore } from "@/store/cardProcess";
import { getFlashCardsByID } from "@/utils/services/functions/getFlashcardsbyID";
import { useUser } from "@clerk/nextjs";

export default function FlashCardsPage() {
  const questions = useCardInputStore((state) => state.questions);
  const theme = useCardInputStore((state) => state.theme);
  const userName = useCardInputStore((state) => state.userName);
  const answers = useCardAnswerStore((state) => state.answers);

  const {  user } = useUser()


  const user_id  = user?.id

  async function handleClick(){
    if (user_id) {
      const data = await getFlashCardsByID(user_id);
    }
  }
  
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
      <p>Tema: {theme}</p>
      <button
        onClick={() => {
          console.log("Questions:", questions);
          console.log("Answers:", answers);
          console.log("FlashcardData:", flashcardData);
        }}
      >
        debug
      </button>
      <button 
        onClick={handleClick}
      >
        Cargar Flashcards
      </button>
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
                theme={flashcardData.theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
