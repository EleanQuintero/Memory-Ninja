"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { pageVariants, accessiblePageVariants } from "@/animations/utils";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Componente para transiciones suaves entre páginas
 * Envuelve el contenido de las páginas con animaciones de entrada/salida
 *
 * Características:
 * - Animaciones basadas en pathname para detectar cambios de ruta
 * - Soporte para prefer-reduced-motion
 * - Transiciones coordinadas con AnimatePresence mode="wait"
 * - Optimizado con LazyMotion (usado en el layout padre)
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Adaptar animaciones según accesibilidad
  const adaptedPageVariants = shouldReduceMotion
    ? accessiblePageVariants
    : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname} // Key crítico: cambia con la ruta para forzar remount
        variants={adaptedPageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
