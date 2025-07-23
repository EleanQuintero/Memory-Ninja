"use client";
import LoadingModal from "@/components/fallbacks/LoadingModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useUIState } from "@/store/uiState/uiState";
import { useOnBoarding } from "../hooks/useOnboarding";

export const Finish = () => {
  const { loading } = useUIState();
  const { updateOnboarding } = useOnBoarding();

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
          <CardContent>
            <LoadingModal
              isLoading={loading}
              blur={true}
              showClose={false}
              message="Cargando tu espacio de MemoryNinja...🥷🏻"
            ></LoadingModal>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Crea tu cuenta</CardTitle>
          <CardDescription className="text-center">
            Únete a la comunidad de ninjas del estudio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold mb-4">¡Felicidades!</h1>
          <p className="text-lg mb-6">
            Has completado el proceso de onboarding.
          </p>
          <p className="text-gray-500 mb-8">
            Ahora puedes empezar a crear tus tarjetas y explorar la aplicación.
          </p>
        </CardContent>
        <Button
          onClick={updateOnboarding}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
        >
          Comenzar
        </Button>
      </Card>
    </section>
  );
};
