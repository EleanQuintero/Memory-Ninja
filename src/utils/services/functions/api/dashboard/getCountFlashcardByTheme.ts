export const getCountFlashcardsByTheme = async () => {


    const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_GET_COUNT_FLASHCARDS_BY_THEME;

    if (!API_ENDPOINT) {
        throw new Error("GET_COUNT_FLASHCARDS_BY_THEME no está configurado");
    }


    try {
        const response = await fetch(API_ENDPOINT)

        if (!response.ok) {
            throw new Error("Error al recibir datos")
        }

        const data = await response.json()

        return data

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }

}