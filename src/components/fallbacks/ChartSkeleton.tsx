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
