import { create } from "zustand"

interface FlashcardsBatch {
  user_id: string
  theme: string
  question: string[]
  answer: string[]
}

interface FlashcardState {
  buffer: FlashcardsBatch
  addToBuffer: (
    user_id: string,
    theme: string,
    question: string[],  // Ahora array de preguntas
    answer: string[]     // Ahora array de respuestas
  ) => void
  clearBuffer: () => void
  getBuffer: () => FlashcardsBatch
}

export const useFlashCardsStore = create<FlashcardState>((set, get) => ({
  buffer: {
    user_id: "",
    theme: "",
    question: [],
    answer: []
  },
  addToBuffer: ( user_id, theme, question, answer) =>
    set((state) => ({
      buffer: {
        user_id: user_id,
        theme: state.buffer.theme || theme,
        question: [...state.buffer.question, ...question],  // concatena arrays
        answer: [...state.buffer.answer, ...answer]         // concatena arrays
      }
    })),
  clearBuffer: () =>
    set({
      buffer: {
        user_id:"",
        theme: "",
        question: [],
        answer: []
      }
    }),
  getBuffer: () => get().buffer
}))