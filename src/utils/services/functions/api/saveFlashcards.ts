import { flashcardToSync } from "@/domain/flashcards";

export async function saveFlashcards(flashcardsData: flashcardToSync): Promise<void>{
    try {
        const response = await fetch("/api/saveFlashcards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flashcardsData),
        });

        if(!response.ok){
            throw new Error("Failed to save flashcards");
        }
    } catch (error) {
        console.error('Error saving flashcards:', error);
        throw error;
    }
}