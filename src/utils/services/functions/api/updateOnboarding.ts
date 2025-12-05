/**
 * Actualiza el estado de onboarding del usuario en Clerk
 * 
 * Esta función llama al endpoint que actualiza la metadata en Clerk.
 * Clerk automáticamente disparará un webhook user.updated cuando se complete.
 * 
 * @throws {Error} Si falla la actualización
 */
export const updateOnboardingStatus = async (): Promise<void> => {
    try {
        const response = await fetch('/api/onboarding-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(10000), // 10 segundos de timeout
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error ||
                `Error al actualizar el estado de onboarding: ${response.status}`
            );
        }

        const data = await response.json();

        // Log para debugging
        if (data.alreadyCompleted) {
            console.log('✓ Onboarding ya estaba completado');
        } else {
            console.log('✓ Onboarding actualizado exitosamente');
        }

        return data;

    } catch (error) {
        console.error('Error al completar el onboarding:', error);

        // Re-throw con mensaje más descriptivo
        if (error instanceof Error) {
            throw new Error(`Error al actualizar onboarding: ${error.message}`);
        }

        throw new Error('Error desconocido al actualizar onboarding');
    }
}