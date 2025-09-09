export interface flashcard {
  flashcard_id?: string;
  question: string;
  answer: string;
  theme: string;
}

export interface flashcardToSync {
  flashcard: flashcard[]
}

export interface getAnswersProps {
  theme: string;
  questions: string[];
  model: string
}

export interface AnswerData {
  answer: string[];
}