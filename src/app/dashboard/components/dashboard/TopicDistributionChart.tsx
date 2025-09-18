"use client";
import { RecentCardsSkeleton } from "@/components/fallbacks/RecentCardSkeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeVariants,
  scaleVariants,
  fadeInUpVariants,
} from "@/animations/utils";

interface chartData {
  theme: string;
  count: number;
}

interface TopicDistributionChartProps {
  data: chartData[];
  loading?: boolean;
}

// custom tick renderer for XAxis to rotate labels

type TickProps = {
  x: number;
  y: number;
  payload: { value: string };
};

function RenderCustomizedAxisTick(props: TickProps) {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#9ca3af"
        transform="rotate(-35)"
        style={{ fontSize: 12 }}
      >
        {payload.value}
      </text>
    </g>
  );
}

export const TopicDistributionChart = ({
  data,
  loading,
}: TopicDistributionChartProps) => {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="chart-loading"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="h-[300px] min-w-0 w-full"
        >
          <RecentCardsSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="chart-loaded"
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          className="h-[300px] min-w-0 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              // increase bottom margin to make room for X labels and legend
              margin={{ top: 8, right: 10, left: 8, bottom: 70 }}
              // control category gap so bars don't become too thin when many items
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              {/* custom tick renderer to allow rotation without TypeScript errors */}
              <XAxis
                dataKey="theme"
                stroke="#9ca3af"
                interval={0} // show all labels
                tickMargin={12}
                tick={RenderCustomizedAxisTick}
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.375rem",
                  color: "#f3f4f6",
                }}
              />
              <Bar
                dataKey="count"
                name="Número de Tarjetas"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                maxBarSize={56}
                barSize={40}
                className=""
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Custom legend placed outside the Recharts canvas to avoid overlap with X axis labels */}
          <motion.div
            className="flex justify-center items-center pt-3"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center text-sm text-sky-400"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="inline-block w-3 h-3 mr-2 rounded-sm"
                style={{ backgroundColor: "#3b82f6" }}
                aria-hidden="true"
                initial={{ rotate: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />
              <span className="select-none">Número de Tarjetas</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      ;
    </AnimatePresence>
  );
};
