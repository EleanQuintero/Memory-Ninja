import { create } from 'zustand'
import { type cardInputInfo } from '@/utils/types/types'
import { getMockData } from '@/utils/services/getMockData'

interface State extends cardInputInfo {
    getQuestions: () => Promise<void>
    setQuestions: (questionsToSet: string[]) => void
    setTheme: (themeToSet: string) => void
}

export const useCardInputStore = create<State>((set) => ({
    questions: [],
    theme: "",
    userName: "",

    getQuestions: async () => {
        const datos = await getMockData()
        const { data, theme } = datos
        const preguntas = data.map((pregunta) => pregunta.pregunta)
        set({ questions: preguntas, theme: theme, userName: "Eleqful" })
    },

    setQuestions(questionsToSet: string[]) {
        set({ questions: questionsToSet })
    },

    setTheme(themeToSet: string) {
        set({ theme: themeToSet })
    }

}))