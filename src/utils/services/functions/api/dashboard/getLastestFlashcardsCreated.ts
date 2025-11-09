export const getLatestFlashcardsCreated = async () => {

    try {
        const response = await fetch('/api/dashboard/latest-flashcards-created');

        if (!response.ok) {
            throw new Error("Error al recibir datos");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}