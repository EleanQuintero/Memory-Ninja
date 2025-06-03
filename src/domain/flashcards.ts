// src/domain/models/flashcard.ts
export interface FlashcardBatch {
  user_id: string;
  theme: string;
  question: string[];
  answer: string[];
}

export interface FlashcardResponse {
  theme: string[];
  questions: string[];
  answer: string[];
}