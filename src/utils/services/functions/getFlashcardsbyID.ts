export const  getFlashCardsByID = async (user_id: string): Promise<void> => {
    try {
        const response = fetch(`/api/getFlashcards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': user_id
            }
        })

        if(!(await response).ok){
            throw new Error(`Error: ${(await response).status}`)
        }
    
        const responseData = await response
        const flashcards = await responseData.json()
        return flashcards
    } catch (error) {
        console.error('Error fetching flashcards:', error)
        throw error
    }
}