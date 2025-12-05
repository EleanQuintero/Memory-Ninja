import { useUIState } from "@/store/uiState/uiState"
import { updateOnboardingStatus } from "@/utils/services/functions/api/updateOnboarding"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

/**
 * Hook para manejar el proceso de completar el onboarding
 * 
 * Flujo:
 * 1. Usuario completa onboarding → llama updateOnboarding()
 * 2. Se actualiza metadata en Clerk
 * 3. Clerk dispara webhook user.updated (en background)
 * 4. useUser() de Clerk detecta el cambio automáticamente
 * 5. useEffect redirecciona cuando detecta onboarding: true
 * 
 * ✅ Sin recargas de página
 * ✅ Sin bucles infinitos
 * ✅ Experiencia fluida
 */
export const useOnBoarding = () => {
    const { setLoading } = useUIState()
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const attemptsRef = useRef(0)
    const MAX_ATTEMPTS = 15 // 15 segundos máximo de espera

    const isOnboardingComplete = user?.publicMetadata?.onboarding

    // Effect para redirigir cuando el onboarding se complete
    useEffect(() => {
        if (isLoaded && isOnboardingComplete) {
            // Limpiar cualquier polling activo
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
                pollingIntervalRef.current = null
            }

            // Mostrar mensaje de éxito
            toast.success('¡Onboarding completado! Redirigiendo... 🚀')

            // Pequeño delay para que el usuario vea el mensaje
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000)
        }
    }, [isOnboardingComplete, isLoaded, router])

    const updateOnboarding = async () => {
        try {
            setLoading(true)
            attemptsRef.current = 0

            // 1. Actualizar metadata en Clerk
            await updateOnboardingStatus()

            // 2. Iniciar polling para verificar que Clerk propagó el cambio
            // Esto es un fallback por si el webhook tarda o falla
            pollingIntervalRef.current = setInterval(async () => {
                attemptsRef.current++

                try {
                    // Recargar datos del usuario desde Clerk
                    await user?.reload()

                    // Si ya se completó, el useEffect de arriba se encargará de redirigir
                    if (user?.publicMetadata?.onboarding) {
                        if (pollingIntervalRef.current) {
                            clearInterval(pollingIntervalRef.current)
                            pollingIntervalRef.current = null
                        }
                        return
                    }

                    // Si llegamos al máximo de intentos, mostrar error
                    if (attemptsRef.current >= MAX_ATTEMPTS) {
                        if (pollingIntervalRef.current) {
                            clearInterval(pollingIntervalRef.current)
                            pollingIntervalRef.current = null
                        }

                        setLoading(false)
                        toast.error(
                            'El proceso está tomando más tiempo de lo esperado. Por favor, intenta recargar la página.',
                            { duration: 6000 }
                        )

                        // Dar opción al usuario de recargar manualmente
                        setTimeout(() => {
                            toast.info('Recarga la página para continuar', {
                                duration: 10000,
                                action: {
                                    label: 'Recargar',
                                    onClick: () => window.location.reload()
                                }
                            })
                        }, 1000)
                    }
                } catch (error) {
                    console.error('Error en polling de onboarding:', error)
                }
            }, 1000) // Verificar cada segundo

        } catch (error) {
            console.error('Error al completar el onboarding:', error)
            setLoading(false)

            // Limpiar polling si hay error
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
                pollingIntervalRef.current = null
            }

            toast.error('Error al completar el onboarding. Por favor, intenta nuevamente.')
        }
    }

    // Cleanup al desmontar
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
            }
        }
    }, [])

    return {
        updateOnboarding,
        isOnboardingComplete
    }
}