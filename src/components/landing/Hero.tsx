"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Hero principal de la landing page.
 * - Título grande, subtítulo, botones, avatares y stats.
 * - Imagen principal optimizada con etiqueta img nativa.
 * - Fondos y decoraciones con Tailwind.
 * - Botones accesibles y consistentes (shadcn).
 */
export const Hero = () => {
  return (
    <section className="relative overflow-hidden" id="hero">
      {/* Fondos decorativos */}
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 pt-16 pb-24 md:pt-32 md:pb-48 relative ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center p-6 sm:p-8 md:p-10 gap-8 md:gap-12"
        >
          {/* Columna izquierda: texto y botones */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 relative text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Aprende cualquier cosa más rápido con{" "}
              <span className="text-blue-400">Inteligencia Artificial</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              La herramienta que todo autodidacta necesita para convertir
              información en conocimiento duradero. Crea tarjetas de estudio
              personalizadas con IA y optimiza tu aprendizaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Botón primario (shadcn) */}
              <Button
                className="rounded-full text-base font-medium shadow-lg hover:scale-105 hover:shadow-blue-400/30 transition-transform z-50 w-full sm:w-auto"
                aria-label="Comenzar ahora"
                size="lg"
                asChild
              >
                <Link href="#waitlist">Probar antes que nadie</Link>
              </Button>
            </div>
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
                  src="/memory-ninja-icon-2.webp"
                  alt="MemoryNinja App"
                  width={400}
                  height={400}
                  className="w-full max-w-[220px] sm:max-w-sm md:max-w-md rounded-xl z-10 relative"
                  sizes="(min-width: 768px) 400px, 220px"
                  decoding="async"
                  loading="eager"
                />
              </div>
              {/* Tarjeta flotante superior derecha */}
              <div
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
              </div>
              {/* Tarjeta flotante inferior izquierda */}
              <div
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
              </div>
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
