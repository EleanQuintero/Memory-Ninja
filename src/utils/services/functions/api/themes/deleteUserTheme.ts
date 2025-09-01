export const deleteUserThemes = async (themeID: number) => {

    const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_DELETE_THEME

    try {

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ themeID })
        })

        if (!response.ok) {
            throw new Error("Error al eliminar el tema")
        }

        const data = await response.json()

        return data

    } catch (error) {
        console.error("Error al Eliminar el tema, intente de nuevo")
    }

}