export const createUserTheme = async (themeName: string) => {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT_CREATE_THEME

    try {
        const response = await fetch(`${API_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'theme-name': themeName,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to create theme');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error creating theme:`, error);
        throw error;
    }
}