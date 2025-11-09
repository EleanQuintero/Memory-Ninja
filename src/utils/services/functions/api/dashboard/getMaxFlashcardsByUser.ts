export const getMaxFlashcardsByUser = async () => {
    try {
        const response = await fetch('/api/dashboard/max-flashcards-by-user');

        if (!response.ok) {
            throw new Error("Error al recibir datos");
        }

        const data = await response.json();
        return data.count;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}