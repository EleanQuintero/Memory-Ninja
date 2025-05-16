import { create } from 'zustand'
import { type cardInputInfo } from '@/utils/types/types'
import { getMockData } from '@/utils/services/getMockData'

interface State extends cardInputInfo {
    getQuestions: (limit: number) => Promise<void>
}

export const useCardInputStore = create<State>((set) => {
    return {
        username: '',
        theme: '',
        question: '',

        getQuestions: async (limit: number) => {

            const datos = await getMockData()
            const { data, theme } = datos
            const preguntas = data.map((pregunta) => pregunta.pregunta)
            set({ question: preguntas, theme: theme, username: "Eleqful" })

        }
    }
}
)