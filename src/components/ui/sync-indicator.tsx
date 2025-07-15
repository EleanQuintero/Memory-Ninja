import { useFlashCardsStore } from "@/app/dashboard/flashcards/store/flashCardsStore";
import { cn } from "@/utils/services/functions/helpers/cnFunction";
import React from "react";

const SyncIndicator = () => {
  const isDirty = useFlashCardsStore((state) => state.isDirty);

  return (
    <div className={cn(
      "fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-300",
      isDirty 
        ? "bg-yellow-100 text-yellow-800" 
        : "bg-green-100 text-green-800"
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full animate-pulse",
        isDirty ? "bg-yellow-500" : "bg-green-500"
      )} />
      <span>
        {isDirty ? "Sincronizando..." : "Sincronizado"}
      </span>
    </div>
  );
}; 

export default React.memo(SyncIndicator);