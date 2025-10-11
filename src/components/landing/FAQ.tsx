"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";
import type { Variants } from "motion/react";

// Definición del tipo para cada pregunta del FAQ
type FAQItem = {
  question: string;
  answer: string;
};

/**
 * Variants para animación de entrada de cada item del FAQ
 * Con detección de reduced motion
 */
const faqItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.5,
    },
  },
};

/**
 * Variants para el contenido expandible del acordeón
 */
const accordionContentVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/**
 * Variants para el icono del acordeón (rotación)
 */
const iconRotateVariants: Variants = {
  collapsed: {
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  expanded: {
    rotate: 180,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/**
 * Componente para cada ítem de FAQ con animaciones
 */
const FAQAccordionItem = ({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Adaptar variants según preferencia de movimiento reducido
  const currentItemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : faqItemVariants;

  const currentIconVariants = shouldReduceMotion
    ? {}
    : iconRotateVariants;

  return (
    <motion.div
      className="border border-blue-400/20 rounded-xl bg-[#0a3060]/60 backdrop-blur-sm overflow-hidden mb-5 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-shadow duration-300"
      variants={currentItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-opacity-50 focus:ring-offset-1 focus:ring-offset-[#0a3060]"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg font-semibold text-white pr-4">
          {item.question}
        </h3>
        <motion.div
          className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400 text-blue-400 flex-shrink-0"
          variants={currentIconVariants}
          animate={isOpen ? "expanded" : "collapsed"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            variants={shouldReduceMotion ? {} : accordionContentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-300">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Componente principal de FAQ
 * Sección de preguntas frecuentes con acordeones animados
 */
export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Preguntas y respuestas del FAQ
  const faqItems: FAQItem[] = [
    {
      question: "¿Funciona con cualquier tipo de contenido?",
      answer:
        "Sí. Artículos de Medium, transcripciones de YouTube, notas de cursos online, documentación técnica... cualquier texto se convierte en flashcards.",
    },
    {
      question: "¿Necesito subir archivos?",
      answer:
        "No. Simplemente copia y pega el texto que quieras estudiar. Perfecto para contenido de la web, notas rápidas o fragmentos de cursos.",
    },
    {
      question: "¿Es realmente para autodidactas?",
      answer:
        "100%. Está diseñada para personas que aprenden por su cuenta, sin estructura académica tradicional. Tu ritmo, tus fuentes, tu método.",
    },
  ];

  // Función para alternar la apertura/cierre de un ítem
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Variants para el título de la sección
  const titleVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, type: "spring" as const, stiffness: 100 },
        },
      };

  return (
    <section
      className="relative bg-[#1a365d] py-20 sm:py-28 pb-32 overflow-hidden"
      id="faq"
      aria-labelledby="faq-heading"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Encabezado de la sección */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
            >
              Preguntas <span className="text-blue-400">Frecuentes</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Todo lo que necesitas saber para empezar a optimizar tu
              aprendizaje con Memory Ninja.
            </p>
          </motion.div>

          {/* Lista de preguntas y respuestas */}
          <div className="space-y-4 relative">
            {faqItems.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggleItem(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          aria-hidden="true"
        >
          <path
            fill="#0f172a"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,266.7C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default FAQ;
