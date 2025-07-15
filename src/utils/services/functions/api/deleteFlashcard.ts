
export async function deleteFlashcard(user_id: string, id: string): Promise<void>{
    try {
        const response = await fetch(`/api/delete-flashcard`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': user_id,
                'x-flashcard-id': id,
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