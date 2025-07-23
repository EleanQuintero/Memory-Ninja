import { useUIState } from "@/store/uiState/uiState"
import { updateOnboardingStatus } from "@/utils/services/functions/api/updateOnboarding"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export const useOnBoarding = () => {
    const { setLoading } = useUIState()
    const { user } = useUser()
    const [isWaitingUpdate, setIsWaitingUpdate] = useState(false)
    const isOnboardingComplete = user?.publicMetadata?.onboarding;

    useEffect(() => {
        // Verificamos si estábamos en proceso de actualización
        const wasUpdating = localStorage.getItem('onboardingUpdating')
        if (wasUpdating) {
            // Si el onboarding ya está completado, redirigimos
            if (isOnboardingComplete) {
                localStorage.removeItem('onboardingUpdating')
                window.location.href = '/dashboard'
            } else {
                // Si aún no está completado, intentamos actualizar
                updateOnboarding()
            }
        }
    }, [isOnboardingComplete, user])

    const updateOnboarding = async () => {
        try {
            setLoading(true)
            setIsWaitingUpdate(true)
            localStorage.setItem('onboardingUpdating', 'true')

            await updateOnboardingStatus()
            window.location.reload()

        } catch (error) {
            console.error('Error al completar el onboarding:', error)
            setLoading(false)
            setIsWaitingUpdate(false)
            localStorage.removeItem('onboardingUpdating')
        }
    }

    return {
        updateOnboarding
    }
}