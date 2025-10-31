import LoadingModal from "../../../../../components/fallbacks/LoadingModal";
import { FlashCardGenerator } from "./FlashCardGenerator";
import { useUIState } from "@/store/uiState/uiState";

export const Generator = () => {
  const { loading } = useUIState();

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

  return (
    <section className="flex flex-row items-center justify-center rounded-lg w-full mt-auto text-xl">
      <FlashCardGenerator loadingAnswers={loading} />
    </section>
  );
};
