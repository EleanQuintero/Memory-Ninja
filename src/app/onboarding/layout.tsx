"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted text-foreground relative overflow-x-hidden">
      {/* Blobs decorativos de fondo - escalados para pantallas grandes */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="fixed top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.08, 0.05],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="fixed bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.05, 0.07, 0.05],
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.05, 0.09, 0.05],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Gradient overlay que cubre toda la pantalla */}
      <div className="fixed inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none -z-10" />

      <div className="min-h-screen flex flex-col relative z-10">
        <header className="flex justify-center p-6 shrink-0">
          <motion.div
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: shouldReduceMotion ? "tween" : "spring",
              stiffness: 100,
              damping: 20,
              duration: shouldReduceMotion ? 0.01 : 0.5,
            }}
          >
            MemoryNinja
          </motion.div>
        </header>

        <section className="flex-1 flex items-center justify-center px-4 py-8 w-full">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">{children}</div>
        </section>
      </div>
    </main>
  );
}
