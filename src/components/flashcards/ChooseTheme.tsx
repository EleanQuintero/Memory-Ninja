interface props {
    theme: string[]
}

export const ChooseTheme = ({ theme }: props) => {
    // Eliminamos duplicados usando Set
    const uniqueThemes = [...new Set(theme)];

    return (
        <select name="theme" id="theme">
            {uniqueThemes.map((theme, index) => (
                <option key={index} value={theme}>{theme}</option>
            ))}
        </select>
    )
}