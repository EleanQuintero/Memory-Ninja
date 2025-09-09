import {
  AnswerData,
  flashcard,
  flashcardToSync,
  getAnswersProps,
} from "@/domain/flashcards";
import { deleteFlashcard } from "@/utils/services/functions/api/deleteFlashcard";
import { getAllFlashcards } from "@/utils/services/functions/api/getAllFlashcards";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { saveFlashcards } from "@/utils/services/functions/api/saveFlashcards";

interface Irepository {
  saveFlashcards(flashcardsData: flashcardToSync): Promise<void>;
  getAllFlashcards(user_id: string): Promise<flashcard[]>;
  getModelAnswer({
    theme,
    questions,
  }: getAnswersProps): Promise<AnswerData>;
  deleteFlashcard(user_id: string, id: string): Promise<void>;
}

export class FlashcardRepository implements Irepository {
  saveFlashcards(flashcardsData: flashcardToSync): Promise<void> {
    return saveFlashcards(flashcardsData);
  }

  getAllFlashcards(): Promise<flashcard[]> {
    return getAllFlashcards();
  }

  getModelAnswer({
    theme,
    questions,
    model
  }: getAnswersProps): Promise<AnswerData> {
    return getModelAnswer({ theme, questions, model });
  }

  deleteFlashcard(flashcardID: string): Promise<void> {
    return deleteFlashcard(flashcardID);
  }
}
