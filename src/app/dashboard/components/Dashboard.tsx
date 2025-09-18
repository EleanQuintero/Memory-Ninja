"use client";
import { RecentCards } from "@/app/dashboard/components/dashboard/RecentCards";
import { TopicDistributionChart } from "@/app/dashboard/components/dashboard/TopicDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserSync } from "../hooks/user-sync/useUserSync";
import { useDashboardStats } from "../hooks/dashboard-stats/useDashboardStats";
import { Stats } from "./dashboard/Stats";
import WithoutData from "./dashboard/WithoutData";
import { motion } from "framer-motion";
import {
  containerVariants,
  fadeInUpVariants,
  dashboardCardVariants,
} from "@/animations/utils";

const Dashboard: React.FC = () => {
  const { dashboardStats } = useDashboardStats();
  const { countedFlashcardsData, latestFlashcardsData, isLoading } =
    dashboardStats;

  useUserSync();

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
      </motion.div>
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
        </motion.div>
        <motion.div variants={dashboardCardVariants} whileHover="hover">
          <Card>
            <CardHeader>
              <CardTitle>Últimas Tarjetas Creadas</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentCards cards={latestFlashcardsData} loading={isLoading} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Dashboard;
