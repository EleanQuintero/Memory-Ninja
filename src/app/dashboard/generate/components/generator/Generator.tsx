import LoadingModal from "../../../../../components/fallbacks/LoadingModal";
import { FlashCardGenerator } from "./FlashCardGenerator";
import { useUIState } from "@/store/uiState/uiState";
import { useFlashCardsQuery } from "@/app/dashboard/hooks/flashcards-query/useFlashCardsQuery";

export const Generator = () => {
  const { loading } = useUIState();
  const { isSavingFlashcards, isErrorSaving, savingError } =
    useFlashCardsQuery();

  // Mostrar mensaje de carga al generar respuestas con IA
  if (loading) {
    return (
      <LoadingModal
        isLoading={loading}
        message="Generando tus flashcards con IA..."
        theme={{
          container: "bg-gradient-to-br from-blue-950 via-slate-900 to-black",
          spinner: "border-slate-700/40 border-t-blue-500",
          message: "from-blue-300 via-cyan-200 to-blue-300",
        }}
        size="md"
        spinnerType="ring"
        showClose={true}
        blur={true}
      />
    );
  }

  // Mostrar mensaje de carga al guardar flashcards
  if (isSavingFlashcards) {
    return (
      <LoadingModal
        isLoading={isSavingFlashcards}
        message="Guardando tus flashcards..."
        theme={{
          container: "bg-gradient-to-br from-green-950 via-slate-900 to-black",
          spinner: "border-slate-700/40 border-t-green-500",
          message: "from-green-300 via-emerald-200 to-green-300",
        }}
        size="md"
        spinnerType="ring"
        showClose={false}
        blur={true}
      />
    );
  }

  // Mostrar modal de error si falla el guardado
  if (isErrorSaving && savingError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
        <div className="bg-red-950/30 border border-red-500/50 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-3">
            Error al guardar
          </h2>
          <p className="text-red-300 mb-4">{savingError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-row items-center justify-center rounded-lg w-full mt-auto text-xl">
      <FlashCardGenerator loadingAnswers={loading} />
    </section>
  );
};
