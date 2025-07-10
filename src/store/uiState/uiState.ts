import { create } from "zustand" 


interface UIState {
    error: string | null
    loading: boolean 
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void

}

export const useUIState = create<UIState>((set) => ({
    error: null,
    loading: false,
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
}))