export interface flashcard {
  flashcard_id: string;
  question: string;
  answer: string;
  theme: string;
}

type flashcardInput = Omit<flashcard, "flashcard_id">;

export interface flashcardToSync {
  flashcard: flashcardInput[]
}

export interface getAnswersProps {
  theme: string;
  questions: string[];
  model: string
}

export interface AnswerData {
  answer: string[];
}