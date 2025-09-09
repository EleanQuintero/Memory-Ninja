import { create } from "zustand"


interface sourceState {
    source: string;
    setSource: (source: string) => void;
}



export const useSourceStore = create<sourceState>((set) => ({
    source: "all",
    setSource: (source) => set({ source }),
}))



