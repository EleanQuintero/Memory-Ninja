export const updateThemeStatus = async () => {

    try {
        const response = await fetch('/api/themes/update-status', {
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

