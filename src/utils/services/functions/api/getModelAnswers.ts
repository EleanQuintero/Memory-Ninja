interface AnswerData {
    answer: string[];
}


export const getModelAnswer = async (tema: string, questions: string[], userLevel: string ): Promise<string[]> => {
      
    try {
        const response = await fetch('/api/generate-answer',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tema, questions, userLevel })
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const datos: AnswerData = await response.json()
        return datos.answer
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Ocurrió un error desconocido');
        }
    }
}