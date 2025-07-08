import { useFlashCardsStore } from "@/store/flashCardsStore";

interface Props {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ChooseTheme = ({ selectedTheme, onThemeChange }: Props) => {
    const { theme } = useFlashCardsStore((state) => state.consolidatedFlashCards);

    // Eliminamos duplicados usando Set
    const uniqueThemes = [...new Set(theme)];
    
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