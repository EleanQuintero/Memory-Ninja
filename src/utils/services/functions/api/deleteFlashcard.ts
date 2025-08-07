
export async function deleteFlashcard(flashcardID: string): Promise<void> {
    try {
        const response = await fetch(`/api/delete-flashcard`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-flashcard-id': flashcardID,
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la flashcard");
        }


        return
    } catch (error) {
        console.error('Error fetching flashcards:', error)
        throw error
    }
}