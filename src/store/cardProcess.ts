import { create } from 'zustand'
import { type cardProcessInfo } from '@/utils/types/types'

interface State extends cardProcessInfo {
    isLoading: boolean;
    error: string | null;
    setAnswers: (answersToSet: string[]) => Promise<void>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useCardAnswerStore = create<State>((set) => ({
    answers: [],
    isLoading: false,
    error: null,

    setLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: string | null) => set({ error }),

    async setAnswers(answersToSet: string[]) {
        try {
            set({ isLoading: true, error: null });
            // Aseguramos que los datos estén disponibles antes de actualizar
            if (!answersToSet || answersToSet.length === 0) {
                throw new Error('No hay respuestas disponibles');
            }
            set({ answers: answersToSet });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Error al cargar las respuestas' });
        } finally {
            set({ isLoading: false });
        }
    },
}))