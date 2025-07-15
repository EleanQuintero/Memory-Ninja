import { useFlashCardsStore } from "@/app/dashboard/flashcards/store/flashCardsStore";

interface Props {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSelector = ({ selectedTheme, onThemeChange }: Props) => {
    const allFlashCards = useFlashCardsStore((state) => state.consolidatedFlashCards);

    // Eliminamos duplicados usando Set
    const uniqueThemes = [...new Set(allFlashCards.map(flashcard => flashcard.theme))];
    
    return (
        <select 
            onChange={(e) => onThemeChange(e.target.value)} 
            name="theme" 
            id="theme"
            value={selectedTheme}
            className=" px-3 py-2 border border-slate-700/98 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option className="bg-black" value="">Todos los temas</option>
            {uniqueThemes.map((theme, index) => (
                <option className="bg-black" key={index} value={theme}>
                    {theme}
                </option>
            ))}
        </select>
    )
}