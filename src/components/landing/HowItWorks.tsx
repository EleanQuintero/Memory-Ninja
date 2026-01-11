"use client";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { BookOpen, Brain, BarChart2, Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";

/**
 * Sección "¿Cómo Funciona MemoryNinja?"
 * - Cards explicativas con iconos, título, descripción y features.
 * - Stats al final.
 * - Todo con Tailwind y accesibilidad.
 */
export const HowItWorks = () => {
  const prefersReduced = useReducedMotion();

  // Variants para contenedor e items (stagger) con soporte de reduced motion.
  const containerVariants: Variants = prefersReduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      };

  const itemVariants: Variants = prefersReduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: "easeOut" },
        },
      };
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="how-it-works"
        initial={prefersReduced ? false : { opacity: 0 }}
        whileInView={prefersReduced ? {} : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="py-20 md:py-28 bg-[#19324a] relative overflow-hidden"
        id="features"
        viewport={{ amount: 0.3, margin: "0px", once: true }}
      >
        {/* Fondos decorativos */}
        <div className="hidden sm:block absolute top-40 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: -16 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.25,
              margin: "0px",
            }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Cómo Funciona MemoryNinja?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Nuestra plataforma utiliza algoritmos avanzados de IA para
              optimizar tu experiencia de aprendizaje y ayudarte a retener
              información por más tiempo.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.25, margin: "0px", once: true }}
          >
            {/* Card 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={prefersReduced ? {} : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="bg-gradient-to-br from-[#0a3060] to-[#19324a] rounded-xl p-6 shadow-lg border border-blue-400/20 hover:shadow-blue-500/10 hover:border-blue-400/30 transition-all duration-300 group"
            >
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
                Crea tus <span>flashcards</span> rapidamente: selecciona un tema
                que te apasione, envía tu pregunta y deja que la <span>IA</span>{" "}
                haga la magia.
              </p>
              <div className="mt-6 bg-[#05264f]/50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-300">
                  <Check
                    className="h-5 w-5 text-blue-400 mr-2"
                    aria-hidden="true"
                    focusable="false"
                  />
                  Genera respuestas precisas y útiles
                </div>
                <div className="flex items-center text-sm text-gray-300 mt-2">
                  <Check
                    className="h-5 w-5 text-blue-400 mr-2"
                    aria-hidden="true"
                    focusable="false"
                  />
                  Aprende de manera efectiva
                </div>
              </div>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={prefersReduced ? {} : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="bg-gradient-to-br from-[#0a3060] to-[#19324a] rounded-xl p-6 shadow-lg border border-purple-400/20 hover:shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-300 group"
            >
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
                Utiliza inteligencia artificial para estudiar de manera más
                inteligente. La IA adaptara la respuesta por ti y podras
                enfocarte en lo que realmente importa: tu aprendizaje.
              </p>
              <div className="mt-6 bg-[#05264f]/50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-300">
                  <Check
                    className="h-5 w-5 text-purple-400 mr-2"
                    aria-hidden="true"
                    focusable="false"
                  />
                  Aprendizaje preciso con IA
                </div>
                <div className="flex items-center text-sm text-gray-300 mt-2">
                  <Check
                    className="h-5 w-5 text-purple-400 mr-2"
                    aria-hidden="true"
                    focusable="false"
                  />
                  Acceso a información actualizada
                </div>
              </div>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={prefersReduced ? {} : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="bg-gradient-to-br from-[#0a3060] to-[#19324a] rounded-xl p-6 shadow-lg border border-blue-400/20 hover:shadow-blue-500/10 hover:border-blue-400/30 transition-all duration-300 group"
            >
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
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.25,
            margin: "0px",
          }}
          className="text-center mb-20 flex flex-col gap-8 max-w-3xl mx-auto md:gap-12   "
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-20 mb-4">
            Mira MemoryNinja en Acción
          </h2>
          <p className="text-gray-300 text-center">
            Descubre cómo MemoryNinja puede transformar tu forma de aprender con
            este breve video demostrativo.
          </p>

          <Card className="bg-surface-200 border-0 shadow-lg">
            <CardContent>
              <iframe
                className="w-full aspect-video rounded-lg"
                src="https://www.youtube.com/embed/1PFCJDUbvUU?si=ci7snW22CswmFRmS"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};
