import { AnswerData, getAnswersProps } from "@/domain/flashcards";

export const getModelAnswer = async ({ questions, theme, }: getAnswersProps): Promise<AnswerData> => {

    try {
        const response = await fetch('/api/generate-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme, questions })
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const datos = await response.json()
        return datos.answer

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Ocurrió un error desconocido');
        }
    }
}