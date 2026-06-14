"use client";
import { RecentCards } from "@/app/dashboard/components/dashboard/RecentCards";
import { TopicDistributionChart } from "@/app/dashboard/components/dashboard/TopicDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserSync } from "../hooks/user-sync/useUserSync";
import { useDashboardStats } from "../hooks/dashboard-stats/useDashboardStats";
import { Stats } from "./dashboard/Stats";
import WithoutData from "./dashboard/WithoutData";
import { motion } from "motion/react";
import {
  containerVariants,
  fadeInUpVariants,
  dashboardCardVariants,
} from "@/animations/utils";
import { useUser } from "@clerk/nextjs";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { UpgradeNudge } from "@/components/ui/upgrade-nudge";
import { UsageBar } from "@/components/ui/usage-bar";
import { ProFeatureBadge } from "@/components/ui/pro-badge";
import { Lock } from "lucide-react";

const Dashboard: React.FC = () => {
  const { dashboardStats } = useDashboardStats();
  const { countedFlashcardsData, latestFlashcardsData, isLoading } =
    dashboardStats;

  const { user } = useUser();
  const { isPro, limits } = usePlanLimits();

  const isDemo: boolean = user?.publicMetadata?.demoUser ?? false;

  useUserSync();

  const totalFlashcards = dashboardStats.maxFlashcardsByUserData ?? 0;
  const recentCardsToShow =
    !isPro && latestFlashcardsData
      ? latestFlashcardsData.slice(0, limits.maxVisibleRecentCards)
      : latestFlashcardsData;

  if (dashboardStats.maxFlashcardsByUserData === 0) {
    return <WithoutData />;
  }

  return (
    <motion.section
      className="flex flex-col w-full md:justify-center items-center p-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Encabezado */}
      <motion.div
        className="flex flex-col justify-center items-center mb-8"
        variants={fadeInUpVariants}
      >
        <motion.h1
          className="text-2xl text-center font-bold text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 150,
            damping: 20,
          }}
        >
          Bienvenido a tu Espacio de MemoryNinja 🥷🏻
        </motion.h1>
        {isDemo && (
          <motion.h2
            className="text-xl text-center font-bold text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          >
            Esto es una Demo Abierta para reclutadores. Su duración es de 5
            minutos. ¡Disfruta explorando! 🚀
          </motion.h2>
        )}
      </motion.div>
      {!isPro && (
        <UpgradeNudge />
      )}

      {!isPro && !isLoading && (
        <motion.div
          variants={fadeInUpVariants}
          className="w-full max-w-full overflow-x-hidden md:max-w-7xl mb-4"
        >
          <UsageBar
            current={totalFlashcards}
            max={limits.maxFlashcards}
            label="Flashcards usadas"
          />
        </motion.div>
      )}

      <motion.div
        variants={fadeInUpVariants}
        className="w-full max-w-full overflow-x-hidden md:max-w-7xl"
      >
        {/* Estadísticas */}
        <Stats isLoading={isLoading} />
      </motion.div>

      {/* Gráficos y tabla */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-full overflow-x-hidden md:max-w-7xl"
        variants={containerVariants}
      >
        <motion.div
          variants={dashboardCardVariants}
          whileHover="hover"
          className="lg:col-span-2"
        >
          {isPro ? (
            <Card>
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
          ) : (
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Tarjetas por Tema <ProFeatureBadge />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
                <Lock className="w-10 h-10 text-gray-500 mb-3" />
                <p className="text-gray-400 text-sm">
                  Mejora a Pro para ver los graficos de distribucion por tema
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
        <motion.div variants={dashboardCardVariants} whileHover="hover">
          <Card>
            <CardHeader>
              <CardTitle>Ultimas Tarjetas Creadas</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentCards cards={recentCardsToShow} loading={isLoading} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Dashboard;
