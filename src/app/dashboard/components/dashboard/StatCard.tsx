"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { statsIconVariants, statsNumberVariants } from "@/animations/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  chartData: number[];
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  chartData,
}) => {
  const data = chartData.map((value) => ({ value }));
  const isPositive = change.includes("+");
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title}
            </motion.p>
            <motion.h3
              className="text-2xl font-bold text-white mt-1"
              variants={statsNumberVariants}
              initial="hidden"
              animate="visible"
            >
              {value}
            </motion.h3>
          </div>

          <motion.div
            className="p-2 ml-2 bg-gray-700 rounded-lg"
            variants={statsIconVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              transition: { duration: 0.2 },
            }}
          >
            {icon}
          </motion.div>
        </div>

        <motion.div
          className="h-10"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.p
          className={`text-xs mt-2 ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {change}
        </motion.p>
      </CardContent>
    </Card>
  );
};
