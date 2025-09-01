import { useThemeQuerys } from "../../hooks/themes-query/useThemeQuerys";

interface Props {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSelector = ({ selectedTheme, onThemeChange }: Props) => {
  const { themes } = useThemeQuerys();

  if (!themes || themes.length === 0) {
    return <p className="text-gray-500">Cargando temas...</p>;
  }

  return (
    <select
      onChange={(e) => onThemeChange(e.target.value)}
      name="theme"
      id="theme"
      value={selectedTheme}
      className=" px-3 py-2 border border-slate-700/98 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option className="bg-black" value="">
        Todos los temas
      </option>
      {themes.map((theme, index) => (
        <option className="bg-black" key={index} value={theme.themeName}>
          {theme.themeName}
        </option>
      ))}
    </select>
  );
};
