export const createUserTheme = async (themeName: string) => {
    try {
        const response = await fetch('/api/themes/create-theme', {
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