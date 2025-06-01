import { useEffect, useState } from "react";
import { useFlashCardsStore } from "@/store/flashCardsStore";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";


const SYNC_INTERVAL = 3000

export const useFlashcardSync = () => {
    const [shouldSync, setShouldSync] = useState(false);
    const buffer = useFlashCardsStore((state) => state.getBuffer())

    useEffect(() => {
        if (!shouldSync) return;

        const interval = setInterval(()=> {
            flashcardUnitOfWork.commit()
        }, SYNC_INTERVAL)

        const handleBeforeUnload = () => {
            if (buffer.question.length > 0 ){
                navigator.sendBeacon('/api/saveFlashcards', JSON.stringify({
                  buffer
                }))
              }
              
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            clearInterval(interval)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [buffer, shouldSync])

    return { startSync: () => setShouldSync(true) };
}
