"use client";
import Flashcard from "@/components/flashcards/flashcard";
import { useCardInputStore } from "@/store/cardInput";
import { useCardAnswerStore } from "@/store/cardProcess";

export default function FlashCardsPage() {
  const questions = useCardInputStore((state) => state.questions);
  const theme = useCardInputStore((state) => state.theme);
  const user = useCardInputStore((state) => state.userName);
  const answers = useCardAnswerStore((state) => state.answers);
  
  console.log('Questions:', questions);
  console.log('Answers:', answers);

  const flashcardData = {
    theme: theme,
    questionsData: questions.map((question, index) => ({
      question,
      answer: typeof answers[index] === 'object' ? JSON.stringify(answers[index]) : (answers[index] || 'No hay respuesta disponible')
    })),
  };

  return (
    <div>
      <h1>Hola {user} aqui tienes tus flashcards listas para estudiar</h1>
      <p>Tema: {theme}</p>
       <button onClick={() => {
        console.log('Questions:', questions);
        console.log('Answers:', answers);
        console.log('FlashcardData:', flashcardData);
       }}>debug</button>
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
