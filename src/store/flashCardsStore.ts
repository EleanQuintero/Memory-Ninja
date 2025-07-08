import { flashcard, flashcardToSync } from "@/domain/flashcards"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FlashcardState {

  // Estado consolidado (API + nuevas flashcards)
  consolidatedFlashCards: flashcard[]

  // Tracking de la sincronizacion
  lastSyncIndex: number
  lastSyncTimestamp: number
  isInitialized: boolean
  isDirty: boolean


  //Acciones del estado
  setConsolidatedFlashcards: (data: flashcard[]) => void
  addNewFlashcards: (theme: string, question: string[], answers: string[]) => void
  getNewFlashcardsForSync: (user_id: string) => flashcardToSync
  markAsSynced: () => void
  resetSyncState: () => void
  clearAllData: () => void
}



export const useFlashCardsStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      // Estado inical
      consolidatedFlashCards: [],
      lastSyncIndex: 0,
      lastSyncTimestamp:0,
      isInitialized: false,
      isDirty: false,

      // Acciones del estado
      
      setConsolidatedFlashcards: (data) =>  {
        set({
          consolidatedFlashCards: data,
          lastSyncIndex: data.length,
          lastSyncTimestamp: Date.now(), // Puede cambiar API en el futuro
          isInitialized: true,
          isDirty: false
        })
      }, 

      addNewFlashcards(theme: string, questions: string[], answers: string[]) {

        const newFlashcards: flashcard[] = questions.map((question, index) => ({
          flashcard_id: Date.now().toString(),
          theme,
          question,
          answer: answers[index]
        }));

        set(state => ({
          consolidatedFlashCards: [...state.consolidatedFlashCards, ...newFlashcards],
          isDirty: true,
        }));
      },

      getNewFlashcardsForSync(user_id: string) {
        const state = get()
        const { consolidatedFlashCards, lastSyncIndex } = state

        // Extraer solo las flashcards nuevas
        const newFlashcards = consolidatedFlashCards.slice(lastSyncIndex);

        return {
          user_id,
          flashcard: newFlashcards
        }
          
      },
      
      markAsSynced: () => {
        const state = get()
        set({
          lastSyncIndex: state.consolidatedFlashCards.length,
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
      },
      
      clearAllData: () => {
        set({
          consolidatedFlashCards: [],
          lastSyncIndex: 0,
          lastSyncTimestamp: 0,
          isDirty: false,
          isInitialized: false
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