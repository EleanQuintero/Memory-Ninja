import { useDashboardStats } from "../../hooks/dashboard-stats/useDashboardStats";
import { StatCard } from "./StatCard";
import { SkeletonCard } from "@/components/fallbacks/SkeletonCard";
import { BookOpen, Trophy } from "lucide-react";

interface Stats {
  title: string;
  value: string;
  icon: React.JSX.Element;
  change: string;
  chartData: number[];
}

interface StatsProps {
  isLoading?: boolean;
}

export const Stats = ({ isLoading }: StatsProps) => {
  const { dashboardStats } = useDashboardStats();

  const { themeWithMaxFlashcardsData, maxFlashcardsByUserData } =
    dashboardStats;
  const stats = [
    {
      title: "Tarjetas Creadas",
      value: maxFlashcardsByUserData ?? "0",
      icon: <BookOpen className="text-blue-400" />,
      change: "+12% vs semana anterior",
      chartData: [120, 145, 165, 190, 210, 235, 248],
    },
    {
      title: "Tema con Más Tarjetas",
      value: themeWithMaxFlashcardsData?.theme ?? "Sin datos",
      icon: <Trophy className="text-blue-400" />,
      change: themeWithMaxFlashcardsData?.count
        ? `+${themeWithMaxFlashcardsData.count} tarjetas`
        : "Sin datos",
      chartData: [30, 35, 42, 48, 52, 58, 65],
    },
  ];

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-full overflow-x-hidden md:max-w-7xl ">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
