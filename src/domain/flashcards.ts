// src/domain/models/flashcard.ts
export interface FlashcardBatch {
  user_id: string;
  theme: string;
  question: string[];
  answer: string[];
}

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