"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import PricingCard from "./PricingCard";

export default function Pricing() {
  const prefersReduced = useReducedMotion();

  // Variants para animar el contenedor y las cards con stagger (solo si no se reduce motion)
  const containerVariants: Variants = prefersReduced
    ? {
        // No-op variants para cumplir el tipo y evitar animaciones
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    : {
        hidden: { opacity: 1 }, // mantenemos visible el contenedor; animamos los hijos
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      };

  const itemVariants: Variants = prefersReduced
    ? {
        // No-op variants para respetar reduced motion
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: "easeOut" },
        },
      };

  // Datos de configuración para las tarjetas (sin botones para waitlist)
  const pricingPlans = [
    {
      title: "Ninja Pro",
      description: "Desbloquea todo el potencial ninja",
      price: "$9.99",
      priceSubtext: "/mes",
      features: [
        { text: "Flashcards ilimitadas" },
        { text: "Multiples ninjas de IA" },
        { text: "Organización por temas" },
        { text: "Guardar progreso en espacio personal" },
        { text: "Acceso a todas las funcionalidades" },
        { text: "14 días de prueba gratuita" },
      ],
      isHighlighted: true,
      highlightText: "Prueba gratis 14 días",
    },
  ];
  return (
    <motion.section
      initial={prefersReduced ? false : { opacity: 0 }}
      whileInView={prefersReduced ? {} : { opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ amount: 0.3, margin: "0px", once: true }}
      id="pricing"
      className="relative min-h-screen bg-gradient-to-br from-[#19324a] via-[#1a365d] to-[#2d3748] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      {/* Blobs pesados: ocultar en mobile para ahorrar GPU */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col w-full justify-center items-center px-6 py-20 md:py-28">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Elige tu plan de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Memory Ninja
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Potencia tu aprendizaje con flashcards generadas por IA
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Soporte Frecuente
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div
          className="w-full max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.25, margin: "0px", once: true }}
        >
          <div className="mt-16 flex justify-center">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ willChange: "transform, opacity" }}
                className="w-full max-w-md"
              >
                <PricingCard
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  priceSubtext={plan.priceSubtext}
                  features={plan.features}
                  isHighlighted={plan.isHighlighted}
                  highlightText={plan.highlightText}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom trust badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>✓ Datos seguros</span>
            <span>✓ Sin configuración compleja</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
