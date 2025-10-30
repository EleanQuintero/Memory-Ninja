"use client";
import { ThemeSelector } from "@/app/dashboard/flashcards/components/ThemeSelector";
import Flashcard from "@/app/dashboard/flashcards/components/flashcard";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import LoadingModal from "@/components/fallbacks/LoadingModal";
import { useUIState } from "@/store/uiState/uiState";
import { useFilterFlashcards } from "@/app/dashboard/flashcards/hooks/useFilterFlashcards";
import { useFlashCardsQuery } from "../hooks/flashcards-query/useFlashCardsQuery";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle, ArrowRight } from "lucide-react";

export default function FlashCardsPage() {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState<string>("");

  const { filteredCards } = useFilterFlashcards({
    themeToFilter: selectedTheme,
  });

  // Obtener datos del usuario
  const userName = user?.username;

  const { error } = useUIState();
  const { flashcardLoading } = useFlashCardsQuery();

  // Manejar estados de carga y error
  if (flashcardLoading) {
    return (
      <LoadingModal
        message="Cargando tus flashcards..."
        isLoading={flashcardLoading}
      />
    );
  }

  if (filteredCards.length === 0 && !error) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10 border border-white/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-linear(white,transparent_70%)]" />

            <div className="relative flex flex-col items-center justify-center text-center gap-8 p-8 sm:p-12 lg:p-16">
              <div className="flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 shadow-2xl animate-pulse">
                <img
                  src="https://res.cloudinary.com/dygwnv56x/image/upload/v1761783292/404_hyy98o.png"
                  alt="No flashcards available"
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain animate-swing"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ¡Oops! No hay flashcards aún
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-md mx-auto">
                  Parece que no tienes flashcards disponibles. ¡Es hora de crear
                  tu primera tarjeta y comenzar a aprender!
                </p>
              </div>

              <Link href="/dashboard/generate" className="group">
                <Button
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Crear mi primera flashcard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <p className="text-sm text-gray-400 mt-4">
                Genera flashcards con IA en segundos
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 backdrop-blur-sm p-8 sm:p-12">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-red-400">
                  Error al cargar las flashcards
                </h2>
                <p className="text-gray-300 text-lg">
                  No pudimos cargar tus flashcards en este momento. Por favor,
                  intenta de nuevo más tarde.
                </p>
              </div>

              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-4 border-red-500/30 hover:bg-red-500/10 text-red-400"
              >
                Intentar de nuevo
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Hola {userName} 👋
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Aquí tienes tus flashcards listas para estudiar
          </p>
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="inline-block p-6 rounded-2xl bg-linear-to-br from-blue-500/5 to-cyan-500/5 border border-white/10 backdrop-blur-sm">
            <label
              htmlFor="theme"
              className="block text-sm font-medium text-gray-300 mb-3"
            >
              {selectedTheme === ""
                ? "🎯 Filtra por tema"
                : `📚 Tema: ${selectedTheme}`}
            </label>
            <ThemeSelector
              onThemeChange={setSelectedTheme}
              selectedTheme={selectedTheme}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 animate-in fade-in duration-500">
          {filteredCards.map((data, index) => (
            <div
              key={data.flashcard_id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Flashcard
                flashcardID={data.flashcard_id}
                question={data.question}
                answer={data.answer}
                theme={data.theme}
              />
            </div>
          ))}
        </div>

        {filteredCards.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              {filteredCards.length}{" "}
              {filteredCards.length === 1 ? "flashcard" : "flashcards"}{" "}
              {selectedTheme ? `de ${selectedTheme}` : "en total"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
