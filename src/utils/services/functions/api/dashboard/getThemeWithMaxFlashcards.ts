export const getThemeWithMaxFlashcards = async () => {
    try {
        const response = await fetch('/api/dashboard/theme-with-most-flashcards');

        if (!response.ok) {
            throw new Error("Error al recibir datos");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}