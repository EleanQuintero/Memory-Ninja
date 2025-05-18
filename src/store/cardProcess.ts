import { create } from 'zustand'
import { type cardProcessInfo } from '@/utils/types/types'
import { getMockData } from '@/utils/services/getMockData'

interface State extends cardProcessInfo {
    getAnswer: () => Promise<void>
}

export const useCardAnswerStore = create<State>((set) => ({

    answers: [],

    getAnswer: async () => {
        const datos = await getMockData()
        const { data } = datos
        const answers = data.map((answer) => answer.respuesta)
        set({ answers: answers })

    }

}))