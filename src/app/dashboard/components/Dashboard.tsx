"use client";
import React from "react";
import { BookOpen, Trophy } from "lucide-react";
import { RecentCards } from "@/app/dashboard/components/dashboard/RecentCards";
import { TopicDistributionChart } from "@/app/dashboard/components/dashboard/TopicDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserSync } from "../hooks/user-sync/useUserSync";
import { useDashboardStats } from "../hooks/dashboard-stats/useDashboardStats";
import { Stats } from "./dashboard/Stats";

const Dashboard: React.FC = () => {
  const { dashboardStats } = useDashboardStats();
  const { countedFlashcardsData, latestFlashcardsData, isLoading } =
    dashboardStats;

  useUserSync();

  // Mock de datos
  const stats = [
    {
      title: "Tarjetas Creadas",
      value: "248",
      icon: <BookOpen className="text-blue-400" />,
      change: "+12% vs semana anterior",
      chartData: [120, 145, 165, 190, 210, 235, 248],
    },
    {
      title: "Tema con Más Tarjetas",
      value: countedFlashcardsData?.[0]?.theme ?? "Sin datos",
      icon: <Trophy className="text-blue-400" />,
      change: countedFlashcardsData?.[0]?.count
        ? `+${countedFlashcardsData[0].count} tarjetas`
        : "Sin datos",
      chartData: [30, 35, 42, 48, 52, 58, 65],
    },
  ];
  return (
    <section className="flex flex-col w-full md:justify-center items-center p-10">
      {/* Encabezado */}
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-2xl text-center font-bold text-white">
          Bienvenido a tu Espacio de MemoryNinja 🥷🏻
        </h1>
      </div>
      {/* Estadísticas */}
      <Stats stats={stats} isLoading={isLoading} />
      {/* Gráficos y tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-full overflow-x-hidden md:max-w-7xl">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tarjetas por Tema</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <TopicDistributionChart />
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
