// store/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
    availableThemes: string[]
    selectedTheme: string | null
    isSetupComplete: boolean
    setAvailableThemes: (themes: string[]) => void
    setSelectedTheme: (theme: string | null) => void
    setSetupComplete: (isComplete: boolean) => void
    addTheme: (theme: string) => void
    removeTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            availableThemes: [],
            selectedTheme: null,
            isSetupComplete: false,

            setAvailableThemes: (themes) => set({
                availableThemes: themes,
                // Seleccionar el primer tema por defecto
                selectedTheme: themes.length > 0 ? themes[0] : null
            }),

            setSelectedTheme: (theme) => set({
                selectedTheme: theme
            }),

            setSetupComplete: (isComplete) => set({
                isSetupComplete: isComplete
            }),

            addTheme: (theme) => {
                const { availableThemes } = get()
                if (!availableThemes.includes(theme) && availableThemes.length < 8) {
                    set({
                        availableThemes: [...availableThemes, theme],
                        selectedTheme: theme // Seleccionar automáticamente el nuevo tema
                    })
                }
            },

            removeTheme: (theme) => {
                const { availableThemes, selectedTheme } = get()
                const newAvailableThemes = availableThemes.filter(t => t !== theme)
                set({
                    availableThemes: newAvailableThemes,
                    // Si se elimina el tema seleccionado, seleccionar el primero disponible o null
                    selectedTheme: selectedTheme === theme
                        ? (newAvailableThemes.length > 0 ? newAvailableThemes[0] : null)
                        : selectedTheme
                })
            }
        }),
        {
            name: 'theme-preferences',
        }
    )
)