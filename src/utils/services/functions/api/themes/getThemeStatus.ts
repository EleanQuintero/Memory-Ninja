
export const getThemeStatus = async () => {

    const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_GET_THEME_STATUS

    try {

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error("Error al obtener el estado del tema ")
        }

        const data = await response.json()

        return data.theme_status

    } catch (error) {
        console.error("Error al obtener el estado del tema, intente de nuevo")
    }

}

