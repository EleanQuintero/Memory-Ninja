import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentCardsSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-6">
          <Skeleton className="h-6 w-48 sm:w-56 bg-slate-600" />
        </CardHeader>

        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-colors ${
                index === 1 ? "bg-slate-700/50" : "bg-slate-800/30"
              }`}
            >
              <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 bg-slate-600 flex-shrink-0 mt-0.5 sm:mt-0" />

              <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                <Skeleton
                  className={`h-4 sm:h-5 bg-slate-600 ${
                    index === 0
                      ? "w-full max-w-xs sm:max-w-sm"
                      : index === 1
                      ? "w-24 sm:w-32"
                      : index === 2
                      ? "w-36 sm:w-48"
                      : "w-32 sm:w-40"
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  {/* Etiqueta de categoría */}
                  <Skeleton
                    className={`h-3 bg-slate-600 ${
                      index === 0
                        ? "w-16 sm:w-20"
                        : index === 1
                        ? "w-20 sm:w-24"
                        : index === 2
                        ? "w-18 sm:w-22"
                        : "w-14 sm:w-16"
                    }`}
                  />

                  {/* Fecha */}
                  <Skeleton className="h-3 w-32 sm:w-44 bg-slate-600" />
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6 text-center">
            <Skeleton className="h-9 sm:h-10 w-36 sm:w-40 bg-slate-600 mx-auto rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
