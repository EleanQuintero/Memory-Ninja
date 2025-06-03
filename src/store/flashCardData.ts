import { FlashcardResponse } from '@/domain/flashcards';
import { create } from 'zustand'

interface State extends FlashcardResponse {
    setFlashCardsState: (data: FlashcardResponse) => void
}

export const useFlashCardStore = create<State>((set) => ({
    theme: [], 
    questions: [],
    answer: [], 

    setFlashCardsState(data) {
        set({ theme: data.theme, questions: data.questions, answer: data.answer })
    }
}))