
import { FlashcardData } from "@/domain/flashcards";


interface FlashcardsBatch {
    user_id: string
    theme: string
    question: string[]
    answer: string[]
  }

export class FlashcardRepository {

    
    
async saveBatch(flashcardsData: FlashcardsBatch): Promise<void>{

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

async getAll(user_id: string): Promise<FlashcardData[]>{
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

}
