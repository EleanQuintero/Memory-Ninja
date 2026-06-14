"use client";

import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProFeatureBadge() {
  return (
    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 gap-1">
      <Lock className="w-3 h-3" />
      PRO
    </Badge>
  );
}
