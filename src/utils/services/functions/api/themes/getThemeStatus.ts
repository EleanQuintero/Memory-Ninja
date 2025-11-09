
export const getThemeStatus = async () => {

    try {

        const response = await fetch('/api/themes/get-theme-status/', {
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

