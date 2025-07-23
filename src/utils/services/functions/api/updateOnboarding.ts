export const updateOnboardingStatus = async () => {
    try {
        const response = await fetch('/api/onboarding-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado de onboarding');
        }
    } catch (error) {
        console.error('Error al completar el onboarding:', error);
    }
}