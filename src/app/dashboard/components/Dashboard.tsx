"use client";
import { RecentCards } from "@/app/dashboard/components/dashboard/RecentCards";
import { TopicDistributionChart } from "@/app/dashboard/components/dashboard/TopicDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserSync } from "../hooks/user-sync/useUserSync";
import { useDashboardStats } from "../hooks/dashboard-stats/useDashboardStats";
import { Stats } from "./dashboard/Stats";
import WithoutData from "./dashboard/WithoutData";

const Dashboard: React.FC = () => {
  const { dashboardStats } = useDashboardStats();
  const { countedFlashcardsData, latestFlashcardsData, isLoading } =
    dashboardStats;

  useUserSync();

  if (dashboardStats.maxFlashcardsByUserData === 0) {
    return <WithoutData />;
  }

  return (
    <section className="flex flex-col w-full md:justify-center items-center p-10">
      {/* Encabezado */}
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-2xl text-center font-bold text-white">
          Bienvenido a tu Espacio de MemoryNinja 🥷🏻
        </h1>
      </div>
      {/* Estadísticas */}
      <Stats isLoading={isLoading} />
      {/* Gráficos y tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-full overflow-x-hidden md:max-w-7xl">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tarjetas por Tema</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <TopicDistributionChart
              data={countedFlashcardsData}
              loading={isLoading}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Últimas Tarjetas Creadas</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentCards cards={latestFlashcardsData} loading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
