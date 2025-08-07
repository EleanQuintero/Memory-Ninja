import { cn } from "@/utils/services/functions/helpers/cnFunction";
import React from "react";

interface props {
  isPending: boolean;
}

const SyncIndicator = ({ isPending }: props) => {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-300",
        isPending
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800"
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          isPending ? "bg-yellow-500" : "bg-green-500"
        )}
      />
      <span>{isPending ? "Sincronizando..." : "Sincronizado"}</span>
    </div>
  );
};

export default React.memo(SyncIndicator);
