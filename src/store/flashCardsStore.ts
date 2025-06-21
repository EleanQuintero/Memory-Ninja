import { FlashcardResponse, FlashcardBatch } from "@/domain/flashcards"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FlashcardState {

  // Estado consolidado (API + nuevas flashcards)
  consolidatedFlashCards: FlashcardResponse

  // Tracking de la sincronizacion
  lastSyncIndex: number
  lastSyncTimestamp: number
  isInitialized: boolean
  isDirty: boolean


  //Acciones del estado
  setConsolidatedFlashcards: (data: FlashcardResponse) => void
  addNewFlashcards: (theme: string, question: string[], answers: string[]) => void
  getNewFlashcardsForSync: (user_id: string) => FlashcardBatch
  markAsSynced: () => void
  resetSyncState: () => void
}



export const useFlashCardsStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      // Estado inical
      consolidatedFlashCards: {
        theme: [],
        questions: [],
        answer: []
      },
      lastSyncIndex: 0,
      lastSyncTimestamp:0,
      isInitialized: false,
      isDirty: false,

      // Acciones del estado
      
      setConsolidatedFlashcards: (data: FlashcardResponse) =>  {
        set({
          consolidatedFlashCards: data,
          lastSyncIndex: data.questions.length,
          lastSyncTimestamp: Date.now(), // Puede cambiar API en el futuro
          isInitialized: true,
          isDirty: false
        })
      }, 

      addNewFlashcards(theme: string, questions: string[], answers: string[]) {
          set((state) => ({
            consolidatedFlashCards: {
              theme: [...state.consolidatedFlashCards.theme, ...Array(questions.length).fill(theme)],
              questions: [...state.consolidatedFlashCards.questions, ...questions],
              answer: [...state.consolidatedFlashCards.answer, ...answers]
            },
            isDirty: true
          }))
      },

      getNewFlashcardsForSync(user_id: string): FlashcardBatch {
        const state = get()
        const { consolidatedFlashCards, lastSyncIndex } = state

        // Extraer solo las flashcards nuevas
        const newThemes = consolidatedFlashCards.theme.slice(lastSyncIndex)
        const newQuestions = consolidatedFlashCards.questions.slice(lastSyncIndex)
        const newAnswers = consolidatedFlashCards.answer.slice(lastSyncIndex)

        return {
          user_id,
          theme: newThemes[0] || "", // Se asume que todas las nuevas son del mismo tema (si)
          question: newQuestions,
          answer: newAnswers
        }
          
      },
      
      markAsSynced: () => {
        const state = get()
        set({
          lastSyncIndex: state.consolidatedFlashCards.questions.length,
          isDirty: false,
          lastSyncTimestamp: Date.now()
        })
      }, 

      resetSyncState: () => {
          set({
            lastSyncIndex: 0,
            lastSyncTimestamp: 0,
            isDirty: false
          })
      }
    }), 
    {
      name: "flashcard-consolidated",
      partialize: (state) => ({ 
        consolidatedFlashCards: state.consolidatedFlashCards,
        lastSyncIndex: state.lastSyncIndex,
        lastSyncTimestamp: state.lastSyncTimestamp
      })
    }
  )
)