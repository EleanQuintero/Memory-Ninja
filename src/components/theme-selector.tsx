"use client";

import type React from "react";
import { useState } from "react";
import { Plus, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/interestThemes";

interface ThemeSelectorProps {
  onThemeChange?: (theme: string | null) => void;
  minChars?: number;
  maxThemes?: number;
}

export function ThemeSelector({
  onThemeChange,
  minChars = 3,
  maxThemes = 8,
}: ThemeSelectorProps) {
  const { availableThemes, selectedTheme, addTheme, removeTheme: removeThemeFromStore, setSelectedTheme } = useThemeStore();
  const [newTheme, setNewTheme] = useState("");
  const [error, setError] = useState<string | null>(null);

  const selectTheme = (theme: string) => {
    const newSelectedTheme = selectedTheme === theme ? null : theme;
    setSelectedTheme(newSelectedTheme);
    onThemeChange?.(newSelectedTheme);
  };

  const addNewTheme = () => {
    if (newTheme.trim() === "") return;

    const formattedTheme = newTheme.trim();

    // Check minimum characters
    if (formattedTheme.length < minChars) {
      setError(`El tema debe tener al menos ${minChars} caracteres`);
      return;
    }

    // Check for duplicates
    if (
      availableThemes.some(
        (theme) => theme.toLowerCase() === formattedTheme.toLowerCase()
      )
    ) {
      setError("Este tema ya existe");
      return;
    }

    // Check maximum themes
    if (availableThemes.length >= maxThemes) {
      setError(`Puedes añadir un máximo de ${maxThemes} temas`);
      return;
    }

    addTheme(formattedTheme);
    setNewTheme("");
    setError(null);
  };

  const removeTheme = (theme: string) => {
    removeThemeFromStore(theme);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTheme();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personaliza tus temas</CardTitle>
        <CardDescription>
          Selecciona un tema que te interese o añade nuevos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={`Añade un nuevo tema (min. ${minChars} caracteres)...`}
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              onClick={addNewTheme}
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

          {availableThemes.length >= maxThemes && (
            <Alert className="py-2 bg-muted">
              <AlertDescription>
                Has alcanzado el número máximo de {maxThemes} temas
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            Tus temas de interés ({availableThemes.length}/{maxThemes})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableThemes.map((theme) => {
              const isSelected = selectedTheme === theme;

              return (
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-md border transition-colors",
                    isSelected
                      ? "bg-primary/10 border-primary/30"
                      : "bg-background hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center w-5 h-5 rounded-full border cursor-pointer",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-muted-foreground/30"
                      )}
                      onClick={() => selectTheme(theme)}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="text-sm">{theme}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeTheme(theme)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Eliminar {theme}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            {selectedTheme ? "1 tema seleccionado" : "Ningún tema seleccionado"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
