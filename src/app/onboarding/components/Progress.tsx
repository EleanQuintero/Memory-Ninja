import React from "react";
import { Progress as ProgressUI } from "@/components/ui/progress";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full px-6 py-3">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-purple-400">
          Paso {currentStep + 1} de {totalSteps}
        </span>
      </div>
      <ProgressUI
        value={progress}
        className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-600"
      />
    </div>
  );
}
