"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

// Componente para los problemas con iconos
const ProblemItem = ({
  icon,
  text,
  index,
}: {
  icon: string;
  text: string;
  index: number;
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="flex items-start space-x-3 mb-4"
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="text-2xl min-w-[30px] mt-1">{icon}</div>
      <p className="text-gray-300">{text}</p>
    </motion.div>
  );
};

// Componente para los beneficios con iconos
const SolutionItem = ({
  icon,
  title,
  text,
  index,
}: {
  icon: string;
  title: string;
  text: string;
  index: number;
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="mb-6 relative z-10"
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center mb-2">
        <div className="text-2xl mr-3">{icon}</div>
        <h3 className="text-lg font-semibold text-blue-400">{title}</h3>
      </div>
      <p className="text-gray-300 pl-10">{text}</p>
    </motion.div>
  );
};

export default function Value() {
  const prefersReduced = useReducedMotion();
  return (
    <section
      className="relative bg-[#19324a] py-20 sm:py-28 pb-32 overflow-hidden"
      id="value"
    >
      {/* Fondos decorativos */}
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none hidden sm:block"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Encabezado de la sección */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              La forma <span className="text-blue-400">inteligente</span> de
              crear flashcards
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Sección de Problema y Agitación */}
            <div className="bg-[#0a3060]/60 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-xl shadow-blue-500/10 p-6 sm:p-8 relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Problema */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-5">
                    Si eres autodidacta, esto te resulta familiar...
                  </h3>

                  <ProblemItem
                    icon="📝"
                    text="Copias texto de blogs, videos, cursos y creas flashcards manualmente"
                    index={1}
                  />
                  <ProblemItem
                    icon="⏰"
                    text="Pierdes más tiempo creando tarjetas que estudiando el contenido"
                    index={2}
                  />
                  <ProblemItem
                    icon="🎯"
                    text="No sabes si estás haciendo las preguntas correctas para retener información"
                    index={3}
                  />
                  <ProblemItem
                    icon="😤"
                    text="Las flashcards que creas son demasiado obvias o demasiado complicadas"
                    index={4}
                  />
                </div>

                {/* Agitación */}
                <div className="relative z-10 mb-12">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">
                    Cada minuto creando flashcards es tiempo que no estás
                    aprendiendo
                  </h3>

                  <ul className="space-y-3 relative z-10">
                    <motion.li
                      className="text-gray-300 pl-4 border-l-2 border-red-400/30 relative z-10"
                      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      Mientras creas tarjetas, podrías estar avanzando al
                      siguiente tema
                    </motion.li>
                    <motion.li
                      className="text-gray-300 pl-4 border-l-2 border-red-400/30 relative z-10"
                      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      Tus flashcards caseras no optimizan tu curva de
                      aprendizaje
                    </motion.li>
                    <motion.li
                      className="text-gray-300 pl-4 border-l-2 border-red-400/30 relative z-10"
                      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      Te frustras porque sabes que hay formas más inteligentes
                      de estudiar
                    </motion.li>
                    <motion.li
                      className="text-gray-300 pl-4 border-l-2 border-red-400/30 relative z-10"
                      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      Al final estudias menos porque el proceso de preparación
                      es tedioso
                    </motion.li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Sección de Solución */}
            <div className="bg-[#0a3060]/60 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-xl shadow-blue-500/10 p-6 sm:p-8 relative z-10">
              {/* Decoración */}
              <div className="absolute -top-4 right-6 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                La solución
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                  Memory Ninja hace el trabajo pesado por ti
                </h3>

                <div className="space-y-4 relative z-10 mb-4">
                  <SolutionItem
                    icon="🤖"
                    title="IA especializada en aprendizaje"
                    text="Genera respuestas con excelente precisión"
                    index={1}
                  />
                  <SolutionItem
                    icon="⚡"
                    title="Velocidad de procesamiento"
                    text="De párrafos a flashcards listas en segundos"
                    index={2}
                  />
                  <SolutionItem
                    icon="🎯"
                    title="Optimización inteligente"
                    text="Identifica los puntos clave sin que tengas que pensarlo"
                    index={3}
                  />
                  <SolutionItem
                    icon="🧠"
                    title="Para autodidactas reales"
                    text="Diseñada para personas que aprenden por su cuenta"
                    index={4}
                  />
                </div>

                <motion.div
                  className="mt-8 flex justify-center relative z-10 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button
                    className="rounded-full text-base font-medium shadow-lg hover:scale-105 hover:shadow-blue-400/30 transition-transform z-50 w-full sm:w-auto"
                    aria-label="Comenzar ahora"
                    size="lg"
                    asChild
                  >
                    <Link href="#waitlist">Probar antes que nadie</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#1a365d"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
