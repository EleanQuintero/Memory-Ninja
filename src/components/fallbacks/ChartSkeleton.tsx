import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-slate-900 border-slate-700">
      <CardHeader className="pb-4">
        <Skeleton className="h-7 w-48 bg-slate-700" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Chart Area */}
        <div className="relative h-80 flex items-end justify-between gap-2 px-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm">
            <Skeleton className="h-4 w-6 bg-slate-700" />
            <Skeleton className="h-4 w-6 bg-slate-700" />
            <Skeleton className="h-4 w-6 bg-slate-700" />
            <Skeleton className="h-4 w-6 bg-slate-700" />
            <Skeleton className="h-4 w-6 bg-slate-700" />
          </div>

          {/* Chart bars */}
          <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 md:gap-3 ml-8">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-64 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-72 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-48 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-56 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-32 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-28 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-16 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-16 bg-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 sm:w-12 md:w-16 h-12 bg-slate-600" />
              <Skeleton className="h-4 w-12 sm:w-20 bg-slate-700" />
            </div>
          </div>

          {/* Tooltip skeleton */}
          <div className="absolute top-16 right-8 bg-slate-800 border border-slate-600 rounded-lg p-3 space-y-2">
            <Skeleton className="h-4 w-24 bg-slate-600" />
            <Skeleton className="h-4 w-32 bg-slate-600" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <Skeleton className="h-3 w-3 bg-blue-500" />
          <Skeleton className="h-4 w-32 bg-slate-700" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton simplificado para TopicDistributionChart
 * Sin Card wrapper, solo el contenido del chart
 * Compatible con SSR/CSR y animaciones Framer Motion
 */
export function TopicDistributionSkeleton() {
  // Alturas predefinidas para evitar Math.random() y problemas de SSR
  const barHeights = [
    "h-24", // 60%
    "h-32", // 80%
    "h-20", // 50%
    "h-28", // 70%
    "h-22", // 55%
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4">
      {/* Área del gráfico */}
      <div className="flex-1 flex items-end justify-between gap-2 mb-4">
        {barHeights.map((height, i) => (
          <div
            key={`chart-bar-${i}`}
            className="w-full flex flex-col items-center"
          >
            {/* Barra del gráfico */}
            <Skeleton
              className={`w-full ${height} rounded-t-md mb-2 bg-blue-500/20`}
            />
            {/* Label del eje X */}
            <Skeleton className="w-8 h-3 bg-gray-600/40" />
          </div>
        ))}
      </div>

      {/* Legend skeleton */}
      <div className="flex justify-center items-center pt-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-sm bg-blue-500/40" />
          <Skeleton className="w-32 h-4 bg-gray-600/40" />
        </div>
      </div>
    </div>
  );
}
