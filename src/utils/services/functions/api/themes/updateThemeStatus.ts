export const updateThemeStatus = async () => {

    try {
        const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_UPDATE_THEME_STATUS

        const response = await fetch(`${API_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al realizar la petición");
        }

        const data = await response.json();
        return data.message;

    } catch (error) {

        console.error("Error updating theme status:");
        throw new Error("Error updating theme status");
    }

}

