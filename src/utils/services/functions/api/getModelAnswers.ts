interface AnswerData {
    answer: string[];
}

interface ErrorResponse {
    error: string;
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
            // Intentar leer el mensaje de error específico del body
            let errorMessage = `Error ${response.status}: ${response.statusText}`;
            
            try {
                const errorData: ErrorResponse = await response.json()
                if (errorData.error) {
                    errorMessage = errorData.error;
                }
            } catch {
                // Si no se puede parsear el JSON, intentar leer como texto
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        errorMessage = errorText;
                    }
                } catch (textError) {
                    // Si todo falla, usar el mensaje por defecto
                    console.error('No se pudo leer el mensaje de error:', textError);
                }
            }
            
            throw new Error(errorMessage);
        }

        const datos: AnswerData = await response.json()
        return datos.answer
        
    } catch (error) {
        console.error('Error al llamar al API:', error)
        throw error
    }
}