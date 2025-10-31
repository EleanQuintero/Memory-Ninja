"use client";
import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/services/functions/helpers/cnFunction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "motion/react";
import { useThemeQuerys } from "@/app/dashboard/hooks/themes-query/useThemeQuerys";
import LoadingModal from "@/components/fallbacks/LoadingModal";

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  minChars?: number;
  maxThemes?: number;
}

export function ThemeSelectorModal({
  isOpen,
  onClose,
  minChars = 3,
  maxThemes = 8,
}: ThemeSelectorModalProps) {
  const {
    themes,
    deleteTheme,
    createTheme,
    isCreatingTheme,
    isDeleting,
    selectedTheme,
    setSelectedTheme,
  } = useThemeQuerys();
  const [newTheme, setNewTheme] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!themes || themes.length === 0) {
    return null;
  }

  const handleSelectTheme = (theme: string) => {
    const newSelectedTheme = selectedTheme === theme ? "" : theme;
    setSelectedTheme(newSelectedTheme);
  };

  const handleAddNewTheme = () => {
    if (themes.length >= maxThemes) {
      setError(`Puedes añadir un máximo de ${maxThemes} temas`);
      return;
    }

    createTheme(newTheme);
    setNewTheme("");
    setError(null);
  };

  const handleRemoveTheme = (themeId: number) => {
    deleteTheme(themeId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.value;

    // Siempre actualizar el estado para permitir escribir y borrar
    setNewTheme(theme);

    const formattedTheme = theme.trim();

    // Si está vacío, limpiar el error
    if (formattedTheme === "") {
      setError(null);
      return;
    }

    // Validar longitud mínima solo si hay texto
    if (formattedTheme.length < minChars) {
      setTimeout(() => {
        setError(`El tema debe tener al menos ${minChars} caracteres`);
      }, 500);
    } else {
      setError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewTheme();
    }
  };

  return (
    <>
      <LoadingModal
        isLoading={isCreatingTheme || isDeleting}
        message={isCreatingTheme ? "Creando tema..." : "Eliminando tema..."}
        size="md"
        spinnerType="ring"
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Personaliza tus temas</DialogTitle>
            <DialogDescription>
              Selecciona un tema que te interese o añade nuevos
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Input para añadir nuevo tema */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={`Añade un nuevo tema (min. ${minChars} caracteres)...`}
                  value={newTheme}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddNewTheme}
                  size="icon"
                  disabled={
                    newTheme.trim().length < minChars ||
                    themes.length >= maxThemes
                  }
                  aria-label="Añadir tema"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {themes.length >= maxThemes && (
                <Alert className="py-2 bg-muted">
                  <AlertDescription>
                    Has alcanzado el número máximo de {maxThemes} temas
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="py-2 bg-destructive/10">
                  <AlertDescription className="text-destructive">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Lista de temas */}
            <div>
              <h3 className="text-sm font-medium mb-3">
                Tus temas de interés ({themes.length}/{maxThemes})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {themes.map((theme) => {
                  const isSelected = selectedTheme === theme.themeName;

                  return (
                    <motion.div
                      key={theme.themeId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "group flex items-center justify-between p-3 rounded-md border transition-colors",
                        isSelected
                          ? "bg-primary/10 border-primary/30"
                          : "bg-[#19324a] hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={cn(
                            "flex items-center justify-center w-5 h-5 rounded-full border cursor-pointer",
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-[#05264f] border-muted-foreground/30"
                          )}
                          onClick={() => handleSelectTheme(theme.themeName)}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-sm">{theme.themeName}</span>
                      </div>

                      <Button
                        variant="default"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveTheme(theme.themeId)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">
                          Eliminar {theme.themeName}
                        </span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Información del tema seleccionado */}
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                {selectedTheme
                  ? `Tema seleccionado: ${selectedTheme}`
                  : "Ningún tema seleccionado"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
