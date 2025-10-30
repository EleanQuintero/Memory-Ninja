"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";
import {
  heroContainerVariants,
  heroItemVariants,
  heroFloatingCardVariants,
  heroFloatingCardLeftVariants,
  heroBlobPulse,
  heroBlobFloat,
  heroBlobRotate,
  accessibleHeroContainerVariants,
  accessibleHeroItemVariants,
} from "@/animations/utils";
import Link from "next/link";

/**
 * Hero principal de la landing page.
 * - Título grande, subtítulo optimizado para waitlist.
 * - Imagen principal optimizada con etiqueta img nativa.
 * - Fondos animados y decoraciones con Tailwind.
 * - Botón único enfocado en la waitlist.
 * - Animaciones completas con orchestación y stagger
 */
export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Adaptar variants según preferencia de accesibilidad
  const currentContainerVariants = shouldReduceMotion
    ? accessibleHeroContainerVariants
    : heroContainerVariants;

  const currentItemVariants = shouldReduceMotion
    ? accessibleHeroItemVariants
    : heroItemVariants;

  return (
    <section className="relative overflow-hidden" id="hero">
      {/* Fondos decorativos animados */}
      <motion.div
        animate={shouldReduceMotion ? {} : heroBlobPulse}
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : heroBlobFloat}
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }
        }
        className="absolute top-40 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : heroBlobRotate}
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }
        }
        className="absolute -bottom-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 pt-16 pb-24 md:pt-32 md:pb-48 relative ">
        <motion.div
          variants={currentContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center p-6 sm:p-8 md:p-10 gap-8 md:gap-12"
        >
          {/* Columna izquierda: texto y botones */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 relative text-center md:text-left">
            <motion.h1
              variants={currentItemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Aprende cualquier cosa más rápido con{" "}
              <span className="text-blue-400">Inteligencia Artificial</span>
            </motion.h1>
            <motion.p
              variants={currentItemVariants}
              className="text-base sm:text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
            >
              La herramienta que todo autodidacta necesita para convertir
              información en conocimiento duradero. Crea tarjetas de estudio
              personalizadas con IA y optimiza tu aprendizaje.
            </motion.p>
            <motion.div
              variants={currentItemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              {/* Botón primario con hover animation - Enfocado en waitlist */}
              <Button
                className="rounded-full text-base font-medium shadow-lg hover:shadow-blue-400/30 z-50 w-full sm:w-auto"
                aria-label="Probar antes que nadie"
                size="lg"
                asChild
              >
                <motion.a
                  href="#waitlist"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Probar antes que nadie
                </motion.a>
              </Button>
            </motion.div>
          </div>
          {/* Columna derecha: imagen principal y tarjetas flotantes */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-6 md:mt-0">
            <div className="relative">
              {/* Decoraciones flotantes */}
              <div
                className="absolute -top-10 -left-16 w-32 h-32 bg-blue-600/20 rounded-xl blur-md transform rotate-12 animate-pulse pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-500/20 rounded-full blur-lg pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
              {/* Imagen principal optimizada */}
              <div className="relative p-1 rounded-2xl shadow-xl">
                <img
                  src="https://res.cloudinary.com/dygwnv56x/image/upload/v1755253305/memory-ninja-icon-2_peisgm.webp"
                  alt="MemoryNinja App"
                  width={400}
                  height={400}
                  className="w-full max-w-[220px] sm:max-w-sm md:max-w-md rounded-xl z-10 relative"
                  sizes="(min-width: 768px) 400px, 220px"
                  decoding="async"
                  loading="eager"
                />
              </div>
              {/* Tarjeta flotante superior derecha con animación */}
              <motion.div
                variants={
                  shouldReduceMotion
                    ? accessibleHeroItemVariants
                    : heroFloatingCardVariants
                }
                initial="hidden"
                animate="visible"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: 12,
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 },
                      }
                }
                className="absolute -top-2 -right-12 bg-[#0a3060]/90 p-3 rounded-lg shadow-lg transform rotate-6 backdrop-blur-sm border border-blue-400/20 z-50 hidden sm:block"
                aria-hidden="true"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    {/* Icono de rayo (svg inline) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-gray-300">Progreso diario</p>
                    <p className="text-sm font-bold text-white">+28% hoy</p>
                  </div>
                </div>
              </motion.div>
              {/* Tarjeta flotante inferior izquierda con animación */}
              <motion.div
                variants={
                  shouldReduceMotion
                    ? accessibleHeroItemVariants
                    : heroFloatingCardLeftVariants
                }
                initial="hidden"
                animate="visible"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: -12,
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 },
                      }
                }
                className="absolute -bottom-10 -left-16 bg-[#0a3060]/90 p-3 rounded-lg shadow-lg transform -rotate-6 backdrop-blur-sm border border-blue-400/20 z-50 hidden sm:block"
                aria-hidden="true"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    {/* Icono de tarjetas (svg inline) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-gray-300">Flashcards creadas</p>
                    <p className="text-sm font-bold text-white">256 tarjetas</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#19324a"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};
