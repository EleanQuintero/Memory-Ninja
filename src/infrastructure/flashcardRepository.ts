import {  AnswerData, flashcard, flashcardToSync, getAnswersProps } from "@/domain/flashcards";
import { getAllFlashcards } from "@/utils/services/functions/api/getAllFlashcards";
import { getModelAnswer } from "@/utils/services/functions/api/getModelAnswers";
import { saveFlashcards } from "@/utils/services/functions/api/saveFlashcards";


interface Irepository {
    saveFlashcards(flashcardsData: flashcardToSync): Promise<void>;
    getAllFlashcards(user_id: string): Promise<flashcard[]>;
    getModelAnswer({ userLevel, theme, questions }: getAnswersProps): Promise<AnswerData>

}


export class FlashcardRepository implements Irepository {
   
    saveFlashcards(flashcardsData: flashcardToSync): Promise<void> {
        return saveFlashcards(flashcardsData)
    }

    getAllFlashcards(user_id: string): Promise<flashcard[]> {
        return getAllFlashcards(user_id)
    }

    getModelAnswer({ userLevel, theme, questions }: getAnswersProps): Promise<AnswerData> {
        return getModelAnswer({ userLevel, theme, questions })
    }

    
}
