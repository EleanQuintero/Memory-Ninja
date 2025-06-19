import { FlashcardResponse, FlashcardBatch } from "@/domain/flashcards"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { NativeCacheService } from "@/utils/services/cache/nativeCacheService"

interface FlashcardState {
  buffer: FlashcardBatch
  allFlashCards: FlashcardResponse
  lastSyncTimestamp: number
  isInitialized: boolean
  isDirty: boolean


  //Acciones del estado
  
  setAllFlashcards: (flashCardData: FlashcardResponse) => void
  addToBuffer: (user_id: string, theme: string, question: string[], answer: string[]) => void
  clearBuffer: () => void
  getBuffer: () => FlashcardBatch 
  markAsDirty: () => void
  markAsSynced: () => void
  setLocalFlashcards: (flashCardData: FlashcardResponse) => void
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

      lastSyncTimestamp:0,
      isInitialized: false,
      isDirty: false,
      
      setAllFlashcards: async (flashCardData) =>  {
        const cacheService = NativeCacheService.getInstance()
        await cacheService.setCache(get().buffer.user_id, flashCardData)

        set({
          allFlashCards: flashCardData,
          lastSyncTimestamp: Date.now(), // Puede cambiar API en el futuro
          isInitialized: true,
          isDirty: false
        })
      }, 

      setLocalFlashcards: (flashCardData: FlashcardResponse) => 
          set((state) => ({
            allFlashCards: {
                theme: [...state.allFlashCards.theme, ...flashCardData.theme],
                questions: [...state.allFlashCards.questions, ...flashCardData.questions],
                answer: [...state.allFlashCards.answer, ...flashCardData.answer]
            }
          }))
      ,


      addToBuffer: (user_id, theme, question, answer) =>
        set((state) => ({
          buffer: {
            user_id: user_id,
            theme: theme,
            question: [...state.buffer.question, ...question],
            answer: [...state.buffer.answer, ...answer]
          },
          isDirty: true
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
      markAsDirty: () => set({ isDirty: true }),
      markAsSynced: () => set({
        isDirty: false,
        lastSyncTimestamp: Date.now()
      })
    }), 
    {
      name: "flashcard-buffer",
      partialize: (state) => ({ 
        buffer: state.buffer, 
        lastSyncTimestamp: state.lastSyncTimestamp
      })
    }
  )
)