// store/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
    availableThemes: string[]
    selectedTheme: string
    isSetupComplete: boolean
    setAvailableThemes: (themes: string[]) => void
    setSelectedTheme: (theme: string) => void
    setSetupComplete: (isComplete: boolean) => void
    addTheme: (theme: string) => void
    removeTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            availableThemes: [],
            selectedTheme: "",
            isSetupComplete: false,

            setAvailableThemes: (themes) => set({
                availableThemes: themes,
                // Seleccionar el primer tema por defecto, o "" si no hay temas
                selectedTheme: themes.length > 0 ? themes[0] : ""
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
                const { availableThemes } = get()
                const newAvailableThemes = availableThemes.filter(t => t !== theme)
                set({
                    availableThemes: newAvailableThemes,
                    // Seleccionar el primer tema disponible o "" si no hay ninguno
                    selectedTheme: newAvailableThemes.length > 0 ? newAvailableThemes[0] : ""
                })
            }
        }),
        {
            name: 'theme-preferences',
        }
    )
)