export const getUserThemes = async () => {

    try {

        const response = await fetch('/api/themes/get-themes-by-user', {
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