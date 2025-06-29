import { useState } from "react";
import { ThemeSelector } from "@/components/theme-selector";
import { ThemeSetupModal } from "@/components/theme-setup-modal";
import { useThemeStore } from "@/store/interestThemes";

export default function ThemeSelectorComponent() {
  const { selectedTheme, isSetupComplete, setAvailableThemes, setSelectedTheme, setSetupComplete } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(!isSetupComplete);

  const handleSetupComplete = (themes: string[]) => {
    setAvailableThemes(themes);
    setSetupComplete(true);
    setIsModalOpen(false);
    // Set the first theme as selected by default
    if (themes.length > 0) {
      setSelectedTheme(themes[0]);
    }
  };

  return (
    <main className="container max-w-2xl mx-auto py-10 px-4">
      <ThemeSetupModal
        isOpen={isModalOpen}
        onComplete={handleSetupComplete}
        minThemes={3}
        maxThemes={8}
        minChars={3}
      />

      {isSetupComplete && (
        <ThemeSelector
          onThemeChange={setSelectedTheme}
          minChars={3}
          maxThemes={8}
        />
      )}

      {isSetupComplete && selectedTheme && (
        <div className="mt-6 p-4 border rounded-md bg-muted/30">
          <p className="font-medium">Tema seleccionado actualmente:</p>
          <p className="text-xl font-bold text-primary">{selectedTheme}</p>
        </div>
      )}
    </main>
  );
}
