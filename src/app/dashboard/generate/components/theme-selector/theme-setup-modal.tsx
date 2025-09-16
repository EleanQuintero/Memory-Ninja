"use client";
import { useState, useEffect } from "react";
import { Plus, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeQuerys } from "@/app/dashboard/hooks/themes-query/useThemeQuerys";

interface ThemeSetupModalProps {
  isOpen: boolean;
  onComplete: (themes: string[]) => void;
  minThemes?: number;
  maxThemes?: number;
  minChars?: number;
}

export function ThemeSetupModal({
  isOpen,
  onComplete,
  minThemes = 3,
  maxThemes = 8,
  minChars = 3,
}: ThemeSetupModalProps) {
  const [newTheme, setNewTheme] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const { themes, createTheme, deleteTheme } = useThemeQuerys();
  const availableThemes = themes || [];

  // Reset closing state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleAddTheme = () => {
    if (newTheme.trim() === "") return;

    const formattedTheme = newTheme.trim();

    // Check minimum characters
    if (formattedTheme.length < minChars) {
      setError(`El tema debe tener al menos ${minChars} caracteres de largo`);
      return;
    }

    // Check for duplicates
    if (
      availableThemes?.some(
        (theme) =>
          theme.themeName.toLowerCase() === formattedTheme.toLowerCase()
      )
    ) {
      setError("Este tema ya ha sido añadido");
      return;
    }

    // Check maximum themes
    if (availableThemes?.length >= maxThemes) {
      setError(`Puedes añadir un máximo de ${maxThemes} temas`);
      return;
    }

    createTheme(formattedTheme);
    setNewTheme("");
    setError(null);
  };

  const handleRemoveTheme = (themeId: number) => {
    deleteTheme(themeId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTheme();
    }
  };

  const handleSubmit = () => {
    if (availableThemes.length < minThemes) {
      setError(`Por favor añade al menos ${minThemes} temas para continuar`);
      return;
    }

    // Start closing animation
    setIsClosing(true);

    // Delay completion to allow animation to finish
    setTimeout(() => {
      onComplete([...availableThemes.map((t) => t.themeName)]);
    }, 300); // Match this with the animation duration
  };

  // Calculate progress percentage
  const progressPercentage = Math.min(
    100,
    (availableThemes.length / minThemes) * 100
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && availableThemes.length >= minThemes) {
          handleSubmit();
        }
      }}
    >
      <AnimatePresence>
        {isOpen && !isClosing && (
          <DialogContent className="sm:max-w-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DialogHeader>
                <DialogTitle>Configura tus temas</DialogTitle>
                <DialogDescription>
                  Por favor añade al menos {minThemes} temas que te interesen
                  antes de continuar. Puedes añadir hasta {maxThemes} temas.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={`Introduce un tema (min. ${minChars} caracteres)...`}
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddTheme}
                    size="icon"
                    disabled={
                      newTheme.trim().length < minChars ||
                      availableThemes.length >= maxThemes
                    }
                    aria-label="Add theme"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-wrap gap-2 min-h-24 p-3 border rounded-md bg-muted/30">
                  {availableThemes.map((theme) => (
                    <Badge
                      key={theme.themeName}
                      variant="secondary"
                      className="flex items-center gap-1 py-1.5 pl-3 pr-2 text-sm"
                    >
                      {theme.themeName}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 hover:bg-secondary-foreground/20 rounded-full"
                        onClick={() => handleRemoveTheme(theme.themeId)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">
                          Remove {theme.themeName}
                        </span>
                      </Button>
                    </Badge>
                  ))}

                  {availableThemes.length === 0 && (
                    <p className="text-sm text-muted-foreground italic w-full text-center py-6">
                      Añade temas que te interesen para continuar
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>
                      {availableThemes.length} de {minThemes} temas requeridos
                      <span className="text-muted-foreground">
                        {" "}
                        (máx. {maxThemes})
                      </span>
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={availableThemes.length < minThemes}
                  className="w-full sm:w-auto"
                >
                  Continuar
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
