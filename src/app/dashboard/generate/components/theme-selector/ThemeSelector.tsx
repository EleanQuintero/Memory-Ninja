"use client";
import { useState, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { ThemeSetupModal } from "./theme-setup-modal";
import { useThemeQuerys } from "@/app/dashboard/hooks/themes-query/useThemeQuerys";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ThemeSelectorModal } from "./theme-selector-modal";

export default function ThemeSelectorComponent() {
  const {
    createTheme,
    theme_status,
    updateStatus,
    isLoadingStatus,
    setSelectedTheme,
    selectedTheme,
  } = useThemeQuerys();
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState(false);

  // Actualizamos el estado del modal de configuración inicial
  useEffect(() => {
    if (theme_status !== undefined) {
      setIsSetupModalOpen(!theme_status);
    }
  }, [theme_status]);

  const handleSetupComplete = (themes: string[]) => {
    const firstThemes = themes;
    firstThemes.forEach((theme) => {
      createTheme(theme);
    });

    updateStatus();
    setIsSetupModalOpen(false);
    // Set the first theme as selected by default
    if (themes.length > 0) {
      setSelectedTheme(themes[0]);
    }
  };

  const handleOpenSelectorModal = () => {
    setIsSelectorModalOpen(true);
  };

  // Si estamos cargando, mostramos un skeleton compacto
  if (isLoadingStatus) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    );
  }

  return (
    <>
      {/* Modal de configuración inicial (primera vez) */}
      <ThemeSetupModal
        isOpen={isSetupModalOpen}
        onComplete={handleSetupComplete}
        minThemes={3}
        maxThemes={8}
        minChars={3}
      />

      {/* Modal de selección de temas (después de configuración inicial) */}
      {theme_status && (
        <>
          <ThemeSelectorModal
            isOpen={isSelectorModalOpen}
            onClose={() => setIsSelectorModalOpen(false)}
            minChars={5}
            maxThemes={10}
          />

          {/* Botón compacto que muestra el tema seleccionado */}
          <Button
            variant="ghost"
            onClick={handleOpenSelectorModal}
            className="flex items-center gap-2 px-3 py-2 h-auto bg-[#24272b]/40"
            aria-label="Seleccionar tema"
          >
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{selectedTheme || "Cualquiera"}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </>
      )}
    </>
  );
}
