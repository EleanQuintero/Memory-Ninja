export interface flashcard{
  flashcard_id?: string;
  question: string;
  answer: string;
  theme: string;
}

export interface flashcardToSync {
  user_id: string 
  flashcard: flashcard[]
}