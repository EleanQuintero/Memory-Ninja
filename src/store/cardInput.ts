import { create } from 'zustand'


interface State {
    questions: string[];
    theme: string;
    userName: string;

    setQuestions: (questionsToSet: string[]) => void
    setTheme: (themeToSet: string) => void
}

export const useCardInputStore = create<State>((set) => ({
    questions: [],
    theme: "",
    userName: "", 
    
    setQuestions(questionsToSet: string[]) {
        set({ questions: questionsToSet })
    },

    setTheme(themeToSet: string) {
        set({ theme: themeToSet })
    }

}))