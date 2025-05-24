import { create } from 'zustand'
import { type cardProcessInfo } from '@/utils/types/types'

interface State extends cardProcessInfo {
    answers: string[];
    setAnswers: (answersToSet: string[]) => Promise<void>;
}

export const useCardAnswerStore = create<State>((set) => ({
    answers: [],

    async setAnswers(answersToSet: string[]) {
        set({ answers: answersToSet })
    }
}))