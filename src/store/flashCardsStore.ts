import { FlashcardData } from "@/domain/flashcards"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FlashcardsBatch {
  user_id: string
  theme: string
  question: string[]
  answer: string[]
}

interface FlashcardState {
  buffer: FlashcardsBatch
  allFlashCards: FlashcardData
  addToBuffer: (
    user_id: string,
    theme: string,
    question: string[],
    answer: string[]
  ) => void
  clearBuffer: () => void
  getBuffer: () => FlashcardsBatch
  setAllFlashcards: (flashCardData: FlashcardData) => void
}

export const useFlashCardsStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      buffer: {
        user_id: "",
        theme: "",
        question: [],
        answer: []
      },
      allFlashCards: {
        theme: [],
        questions: [],
        answer: []
      },
      addToBuffer: (user_id, theme, question, answer) =>
        set((state) => ({
          buffer: {
            user_id: user_id,
            theme: theme,
            question: [...state.buffer.question, ...question],
            answer: [...state.buffer.answer, ...answer]
          }
        })),
      clearBuffer: () =>
        set({
          buffer: {
            user_id: "",
            theme: "",
            question: [],
            answer: []
          }
        }),
      getBuffer: () => get().buffer,
      setAllFlashcards: (flashCardData) => set({ allFlashCards: flashCardData })
    }), 
    {
      name: "flashcard-buffer",
      partialize: (state) => ({ buffer: state.buffer })
    }
  )
)