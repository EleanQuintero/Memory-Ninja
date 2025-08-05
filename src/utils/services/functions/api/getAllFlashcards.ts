import { flashcard } from "@/domain/flashcards"

export async function getAllFlashcards(): Promise<flashcard[]> {
    try {
        const response = await fetch(`/api/getFlashcards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener las flashcards");
        }

        const flashcards: flashcard[] = await response.json();
        return flashcards;
    } catch (error) {
        console.error('Error fetching flashcards:', error)
        throw error
    }
}