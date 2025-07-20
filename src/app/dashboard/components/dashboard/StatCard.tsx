"use client"
import React from "react"
import { Line, LineChart, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  change: string
  chartData: number[]
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  chartData,
}) => {
  const data = chartData.map((value) => ({ value }))
  const isPositive = change.includes("+")
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg">{icon}</div>
        </div>
        <div className="h-10">
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
        </div>
        <p
          className={`text-xs mt-2 ${isPositive ? "text-green-400" : "text-red-400"}`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  )
} 