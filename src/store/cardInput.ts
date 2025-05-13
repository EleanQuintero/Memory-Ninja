import { create } from 'zustand'
import { type cardInputInfo, mocksData } from '@/utils/types/types'

interface State extends cardInputInfo {
    getQuestions: (limit: number) => Promise<void>
}

export const useCardInputStore = create<State>((set) => {
    return {
        username: '',
        theme: '',
        question: '',

        getQuestions: async (limit: number) => {
            const response = await fetch('http://localhost:3000/mocks/data.json')
            const datos: mocksData = await response.json()
            const { data, theme } = datos
            const preguntas = data.map((pregunta) => pregunta.pregunta)
            set({ question: preguntas, theme: theme, username: "Eleqful" })

        }
    }
}
)