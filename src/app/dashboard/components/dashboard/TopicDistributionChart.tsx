"use client";
import { RecentCardsSkeleton } from "@/components/fallbacks/RecentCardSkeleton";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  if (loading) {
    return <RecentCardsSkeleton />;
  }

  return (
    <div className="h-[300px] min-w-0 w-full">
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
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 8 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
