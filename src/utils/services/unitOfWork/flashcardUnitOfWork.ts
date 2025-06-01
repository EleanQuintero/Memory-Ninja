import { FlashcardRepository } from "@/infrastructure/flashcardRepository";
import { useFlashCardsStore } from "@/store/flashCardsStore";

const repository = new FlashcardRepository()

export const flashcardUnitOfWork = {
    async commit(): Promise<void>{
        const buffer = useFlashCardsStore.getState().getBuffer()
        if(buffer.question.length === 0) return 

        await repository.saveBatch(buffer)
        useFlashCardsStore.getState().clearBuffer()
    }
}