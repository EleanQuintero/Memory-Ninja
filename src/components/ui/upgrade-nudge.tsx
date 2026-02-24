"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function UpgradeNudge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-7xl mb-6 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
        <p className="text-sm text-gray-200">
          Estas usando el plan <span className="font-semibold text-white">Ninja Novato</span>. Desbloquea flashcards ilimitadas, todos los modelos de IA y mas.
        </p>
      </div>
      <Button
        asChild
        size="sm"
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shrink-0"
      >
        <Link href="/#pricing">Ver planes Pro</Link>
      </Button>
    </motion.div>
  );
}
