import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primera tarjeta skeleton - Tarjetas Creadas */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-slate-600" />
                <Skeleton className="h-8 w-16 bg-slate-600" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg bg-slate-600" />
            </div>

            {/* Línea de progreso */}
            <div className="mb-4">
              <Skeleton className="h-1 w-full bg-slate-600" />
            </div>

            {/* Texto de cambio porcentual */}
            <Skeleton className="h-4 w-40 bg-slate-600" />
          </CardContent>
        </Card>

        {/* Segunda tarjeta skeleton - Tema con Más Tarjetas */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-44 bg-slate-600" />
                <Skeleton className="h-8 w-20 bg-slate-600" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg bg-slate-600" />
            </div>

            {/* Línea de progreso */}
            <div className="mb-4">
              <Skeleton className="h-1 w-full bg-slate-600" />
            </div>

            {/* Texto de cambio */}
            <Skeleton className="h-4 w-24 bg-slate-600" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
