"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, BarChart2, Check } from "lucide-react";

/**
 * Sección "¿Cómo Funciona MemoryNinja?"
 * - Cards explicativas con iconos, título, descripción y features.
 * - Stats al final.
 * - Todo con Tailwind y accesibilidad.
 */
export const HowItWorks = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 md:py-28 bg-[#19324a] relative overflow-hidden"
      id="features"
      viewport={{ amount: 0.5, margin: "30px" }}
    >
      {/* Fondos decorativos */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: false,
            amount: 0.3,
            margin: "-100px",
          }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Cómo Funciona MemoryNinja?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nuestra plataforma utiliza algoritmos avanzados de IA para optimizar
            tu experiencia de aprendizaje y ayudarte a retener información por
            más tiempo.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-[#0a3060] to-[#19324a] rounded-xl p-6 shadow-lg border border-blue-400/20 hover:shadow-blue-500/10 hover:border-blue-400/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/30 transition-colors">
              <BookOpen
                className="h-8 w-8 text-blue-400"
                aria-hidden="true"
                focusable="false"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-white">
              Crea tus Flashcards
            </h3>
            <p className="text-gray-300 text-center">
              Crea flashcards rápidamente o deja que nuestra IA genere tarjetas
              de estudio personalizadas basadas en tu material de aprendizaje.
            </p>
            <div className="mt-6 bg-[#05264f]/50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-300">
                <Check
                  className="h-5 w-5 text-blue-400 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                Generación automática de preguntas
              </div>
              <div className="flex items-center text-sm text-gray-300 mt-2">
                <Check
                  className="h-5 w-5 text-blue-400 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                Importación desde documentos
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-gradient-to-br from-[#0a3060] to-[#19324a] rounded-xl p-6 shadow-lg border border-purple-400/20 hover:shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-500/30 transition-colors">
              <Brain
                className="h-8 w-8 text-purple-400"
                aria-hidden="true"
                focusable="false"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-white">
              Aprende con IA
            </h3>
            <p className="text-gray-300 text-center">
              Nuestra IA analiza tu progreso y adapta las sesiones de estudio
              para maximizar tu retención y eficiencia en el aprendizaje.
            </p>
            <div className="mt-6 bg-[#05264f]/50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-300">
                <Check
                  className="h-5 w-5 text-purple-400 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                Algoritmos de repetición espaciada
              </div>
              <div className="flex items-center text-sm text-gray-300 mt-2">
                <Check
                  className="h-5 w-5 text-purple-400 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                Personalización automática
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-gradient-to-br from-[#0a3060] to-[#19324a] rounded-xl p-6 shadow-lg border border-blue-400/20 hover:shadow-blue-500/10 hover:border-blue-400/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/30 transition-colors">
              <BarChart2
                className="h-8 w-8 text-blue-400"
                aria-hidden="true"
                focusable="false"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-white">
              Monitorea tu Progreso
            </h3>
            <p className="text-gray-300 text-center">
              Visualiza tu progreso con estadísticas detalladas y recibe
              recomendaciones personalizadas para mejorar tu aprendizaje.
            </p>
            <div className="mt-6 bg-[#05264f]/50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-300">
                <Check
                  className="h-5 w-5 text-blue-400 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                Estadísticas detalladas
              </div>
              <div className="flex items-center text-sm text-gray-300 mt-2">
                <Check
                  className="h-5 w-5 text-blue-400 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                Sugerencias personalizadas
              </div>
            </div>
          </div>
        </div>
        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#0a3060]/50 rounded-lg p-6 border border-blue-500/20">
            <p className="text-3xl font-bold text-white">500+</p>
            <p className="text-gray-400 text-sm">Estudiantes activos</p>
          </div>
          <div className="bg-[#0a3060]/50 rounded-lg p-6 border border-blue-500/20">
            <p className="text-3xl font-bold text-white">10k+</p>
            <p className="text-gray-400 text-sm">Flashcards creadas</p>
          </div>
          <div className="bg-[#0a3060]/50 rounded-lg p-6 border border-blue-500/20">
            <p className="text-3xl font-bold text-white">95%</p>
            <p className="text-gray-400 text-sm">Tasa de retención</p>
          </div>
          <div className="bg-[#0a3060]/50 rounded-lg p-6 border border-blue-500/20">
            <p className="text-3xl font-bold text-white">4.9</p>
            <p className="text-gray-400 text-sm">Calificación promedio</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
