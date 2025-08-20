export const getUserThemes = async () => {

    const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_GET_USER_THEMES

    try {

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error("Error al obtener los temas ")
        }

        const data = await response.json()

        return data

    } catch (error) {
        console.error("Error al obtener los temas de usuario, intente de nuevo")
    }

}