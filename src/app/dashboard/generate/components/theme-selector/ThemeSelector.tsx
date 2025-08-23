import { useState, useEffect } from "react";
import { useThemeStore } from "@/app/dashboard/generate/components/theme-selector/store/interestThemes";
import { ThemeSelector } from "./theme-selector";
import { ThemeSetupModal } from "./theme-setup-modal";
import { useThemeQuerys } from "@/app/dashboard/hooks/themes-query/useThemeQuerys";

export default function ThemeSelectorComponent() {
  const { setSelectedTheme } = useThemeStore();
  const { createTheme, theme_status, updateStatus, isLoadingStatus } =
    useThemeQuerys();
  const [isModalOpen, setIsModalOpen] = useState(false); // Inicialmente no mostramos nada

  // Actualizamos el estado solo cuando theme_status ya está definido
  useEffect(() => {
    if (theme_status !== undefined) {
      setIsModalOpen(!theme_status);
    }
  }, [theme_status]);

  console.log(theme_status);

  const handleSetupComplete = (themes: string[]) => {
    const firstThemes = themes;
    firstThemes.forEach((theme) => {
      createTheme(theme);
    });

    updateStatus();
    setIsModalOpen(false);
    // Set the first theme as selected by default
    if (themes.length > 0) {
      setSelectedTheme(themes[0]);
    }
  };

  // Si estamos cargando, no mostramos nada (o puedes mostrar un indicador de carga)
  if (isLoadingStatus) {
    return null; // O return <div>Cargando...</div> si prefieres mostrar algo
  }

  return (
    <section className="container mx-auto py-2">
      <ThemeSetupModal
        isOpen={isModalOpen}
        onComplete={handleSetupComplete}
        minThemes={3}
        maxThemes={8}
        minChars={3}
      />

      {theme_status && (
        <ThemeSelector
          onThemeChange={setSelectedTheme}
          minChars={3}
          maxThemes={10}
        />
      )}
    </section>
  );
}
