import { create } from 'zustand'
import { type cardProcessInfo, mocksData } from '@/utils/types/types'

interface State extends cardProcessInfo {
    getAnswer: (limit: number) => Promise<void>
}

export const useCardAnswerStore = create<State>((set) => {
    return {
        getAnswer: async (limit: number) => {
            const response = await fetch('http://localhost:3000/mocks/data.json')
            const datos: mocksData = await response.json()
            const { data } = datos
            const answers = data.map((answer) => answer.respuesta)
            set({ answer: answers })

        }
    }
}
)