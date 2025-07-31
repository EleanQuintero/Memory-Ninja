"use client";
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
}

export const TopicDistributionChart = ({
  data,
}: TopicDistributionChartProps) => {
  // Mock de datos
  return (
    <div className="h-[300px] min-w-0 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="theme" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
              color: "#f3f4f6",
            }}
          />
          <Legend />
          <Bar
            dataKey="count"
            name="Número de Tarjetas"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
