export const getLatestFlashcardsCreated = async () => {

    const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_GET_LATEST_FLASHCARDS;

    if (!API_ENDPOINT) {
        throw new Error("CLIENT_GET_LATEST_FLASHCARDS no está configurado");
    }

    try {
        const response = await fetch(API_ENDPOINT);

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