export const getCountFlashcardsByTheme = async () => {

    try {
        const response = await fetch('/api/dashboard/count-flashcards-by-theme')

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