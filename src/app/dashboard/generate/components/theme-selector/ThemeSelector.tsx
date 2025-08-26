import { useState, useEffect } from "react";
import { ThemeSelector } from "./theme-selector";
import { ThemeSetupModal } from "./theme-setup-modal";
import { useThemeQuerys } from "@/app/dashboard/hooks/themes-query/useThemeQuerys";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ThemeSelectorComponent() {
  const {
    createTheme,
    theme_status,
    updateStatus,
    isLoadingStatus,
    setSelectedTheme,
  } = useThemeQuerys();
  const [isModalOpen, setIsModalOpen] = useState(false); // Inicialmente no mostramos nada

  // Actualizamos el estado solo cuando theme_status ya está definido
  useEffect(() => {
    if (theme_status !== undefined) {
      setIsModalOpen(!theme_status);
    }
  }, [theme_status]);

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
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
          <div>
            <Skeleton className="h-5 w-1/4 mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Skeleton className="h-12 rounded-md" />
              <Skeleton className="h-12 rounded-md" />
              <Skeleton className="h-12 rounded-md" />
              <Skeleton className="h-12 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
