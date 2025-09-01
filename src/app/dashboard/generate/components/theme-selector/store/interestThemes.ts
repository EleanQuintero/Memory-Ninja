// store/useThemeStore.ts
import { create } from 'zustand'

interface ThemeState {
    selectedTheme: string
    setSelectedTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>()(
    (set) => ({
        selectedTheme: "",

        setSelectedTheme: (theme) => set({
            selectedTheme: theme
        }),
    }),
)

