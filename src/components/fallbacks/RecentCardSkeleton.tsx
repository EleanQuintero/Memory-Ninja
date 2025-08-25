import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentCardsSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-48 bg-slate-600" />
        </CardHeader>

        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                index === 1 ? "bg-slate-700/50" : "bg-slate-800/30"
              }`}
            >
              {/* Ícono */}
              <Skeleton className="h-6 w-6 bg-slate-600 flex-shrink-0" />

              <div className="flex-1 space-y-2">
                {/* Título de la tarjeta */}
                <Skeleton
                  className={`h-4 bg-slate-600 ${
                    index === 0
                      ? "w-64"
                      : index === 1
                      ? "w-32"
                      : index === 2
                      ? "w-48"
                      : "w-40"
                  }`}
                />

                <div className="flex items-center gap-4">
                  {/* Etiqueta de categoría */}
                  <Skeleton
                    className={`h-3 bg-slate-600 ${
                      index === 0
                        ? "w-16"
                        : index === 1
                        ? "w-24"
                        : index === 2
                        ? "w-20"
                        : "w-14"
                    }`}
                  />

                  {/* Fecha */}
                  <Skeleton className="h-3 w-44 bg-slate-600" />
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 text-center">
            <Skeleton className="h-10 w-40 bg-slate-600 mx-auto rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
