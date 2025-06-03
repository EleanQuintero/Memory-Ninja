import { FlashcardRepository } from "@/infrastructure/flashcardRepository";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { NativeCacheService } from "../cache/nativeCacheService";
import { FlashcardResponse } from "@/domain/flashcards";

const repository = new FlashcardRepository()
const cacheService = NativeCacheService.getInstance()


export const flashcardUnitOfWork = {
    async commit(): Promise<void>{
        const state = useFlashCardsStore.getState()
        const { allFlashCards, buffer } = state

        if(buffer.question.length > 0) {
            // Primero guardamos el buffer
            await repository.saveBatch(buffer)
            
            // Actualizamos el estado local combinando buffer con allFlashCards
            const updatedFlashCards = {
                theme: [...allFlashCards.theme, buffer.theme],
                questions: [...allFlashCards.questions, ...buffer.question],
                answer: [...allFlashCards.answer, ...buffer.answer]
            };
            
            // Actualizamos el estado
            useFlashCardsStore.setState({
                allFlashCards: updatedFlashCards,
                isDirty: false,
                lastSyncTimestamp: Date.now()
            });
            
            // Limpiamos el buffer
            useFlashCardsStore.getState().clearBuffer()
        }
    },

    async loadUserFlashCards(user_id: string): Promise<FlashcardResponse>  {
            //Intentamos cargar desde cache
            const cached = await cacheService.getCache(user_id)
            if(cached) {
                useFlashCardsStore.getState().setAllFlashcards(cached)
                return cached
            }

            // Si no hay cache, cargar desde la API
            const flashcards = await repository.getAll(user_id)
            await cacheService.setCache(user_id, flashcards)
            useFlashCardsStore.getState().setAllFlashcards(flashcards)
            return flashcards
    }
}