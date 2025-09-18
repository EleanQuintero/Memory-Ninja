import { useDashboardStats } from "../../hooks/dashboard-stats/useDashboardStats";
import { StatCard } from "./StatCard";
import { SkeletonCard } from "@/components/fallbacks/SkeletonCard";
import { BookOpen, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { statsContainerVariants, statsCardVariants } from "@/animations/utils";

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
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-full overflow-x-hidden md:max-w-7xl"
        >
          {[1, 2].map((index) => (
            <motion.div
              key={`skeleton-${index}`}
              variants={statsCardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <SkeletonCard />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="loaded"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-full overflow-x-hidden md:max-w-7xl "
          variants={statsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.title}-${index}`}
              variants={statsCardVariants}
              whileHover="hover"
              custom={index}
            >
              <StatCard key={index} {...stat} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
