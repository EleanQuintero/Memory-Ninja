"use client";

import { motion, AnimatePresence } from "motion/react";
import { Progress as ProgressUI } from "@/components/ui/progress";
import {
  progressContainerVariants,
  progressBadgeVariants,
  progressMilestoneVariants,
} from "@/animations/onboardingVariants";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const shouldReduceMotion = useReducedMotion();

  // Determinar el mensaje de milestone basado en el progreso
  const getMilestone = () => {
    if (progress >= 100)
      return { text: "¡Completado!", emoji: "🎉", color: "text-yellow-400" };
    if (progress >= 75)
      return { text: "¡Casi listo!", emoji: "🎯", color: "text-green-400" };
    if (progress >= 50)
      return {
        text: "¡A mitad de camino!",
        emoji: "💪",
        color: "text-purple-400",
      };
    if (progress >= 25)
      return { text: "¡Buen comienzo!", emoji: "🚀", color: "text-blue-400" };
    return null;
  };

  const milestone = getMilestone();

  return (
    <motion.div
      className="w-full px-6 py-3"
      variants={progressContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-2">
        <motion.span
          className="text-sm font-medium text-purple-400"
          key={`step-${currentStep}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.3,
            type: shouldReduceMotion ? "tween" : "spring",
            stiffness: 200,
          }}
        >
          Paso {currentStep + 1} de {totalSteps}
        </motion.span>

        {/* Badge de progreso con animación */}
        <motion.span
          className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-semibold border border-purple-500/30"
          key={`progress-${progress}`}
          variants={progressBadgeVariants}
          initial="hidden"
          animate="visible"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      {/* Progress bar con animación de llenado */}
      <div className="relative">
        <ProgressUI
          value={progress}
          className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-600 [&>div]:transition-all [&>div]:duration-500"
        />

        {/* Glow effect en la barra de progreso */}
        {!shouldReduceMotion && progress > 0 && (
          <motion.div
            className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-500/50 blur-sm pointer-events-none"
            style={{ width: `${progress}%` }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Mensajes de milestone con animación */}
      <AnimatePresence mode="wait">
        {milestone && (
          <motion.div
            key={milestone.text}
            className={`text-xs text-center mt-3 font-medium ${milestone.color} flex items-center justify-center gap-1.5`}
            variants={progressMilestoneVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.span
              animate={
                !shouldReduceMotion
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              {milestone.emoji}
            </motion.span>
            <span>{milestone.text}</span>
            {!shouldReduceMotion && (
              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✨
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index <= currentStep
                ? "bg-gradient-to-r from-blue-500 to-purple-600 w-8"
                : "bg-muted w-1.5"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            whileHover={
              !shouldReduceMotion
                ? {
                    scale: 1.2,
                    y: -2,
                  }
                : {}
            }
          />
        ))}
      </div>
    </motion.div>
  );
}
