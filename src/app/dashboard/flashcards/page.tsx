"use client";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useFlashCardStore } from "@/store/flashCardData";
import { setFlashcardData } from "@/utils/services/functions/states/updateFlashcardData";
import { useUser } from "@clerk/nextjs";

export default function FlashCardsPage() {
  const questions = useFlashCardStore((state) => state.questions)
  const theme = useFlashCardStore((state) => state.theme)
  const userName = useCardInputStore((state) => state.userName);
  const answers = useFlashCardStore((state) => state.answer)
  const { user } = useUser()

  const user_id = user?.id

  async function handleClick(){
    if (user_id) {
      const data = await getFlashCardsByID(user_id);
      setFlashcardData(data)
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
      <label htmlFor="theme">Tema:</label>
      <select name="theme" id="theme"> 
        {theme.map((theme, index) => (
          <option key={index} value={theme}>{theme}</option>
        ))}
      </select>
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
                theme={flashcardData.theme[i]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
