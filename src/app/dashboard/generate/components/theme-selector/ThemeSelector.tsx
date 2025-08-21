import { useState } from "react";
import { useThemeStore } from "@/app/dashboard/generate/components/theme-selector/store/interestThemes";
import { ThemeSelector } from "./theme-selector";
import { ThemeSetupModal } from "./theme-setup-modal";

export default function ThemeSelectorComponent() {
  const {
    isSetupComplete,
    setAvailableThemes,
    setSelectedTheme,
    setSetupComplete,
  } = useThemeStore();
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
    <section className="container mx-auto py-2">
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
          maxThemes={10}
        />
      )}
    </section>
  );
}
