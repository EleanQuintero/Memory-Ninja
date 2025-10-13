"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, Variants } from "motion/react";
import {
  Lock,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3,
    },
  },
};

const PREMIUM_FEATURES = [
  "Generación ilimitada de flashcards",
  "Acceso a modelo ninja IA premium",
  "Estadísticas avanzadas de aprendizaje",
  "Soporte prioritario",
];

export default function SubscriptionFallback() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Lock Icon with animated background */}
          <motion.div variants={iconVariants} className="relative mb-8">
            <div className="flex justify-center">
              <div className="relative">
                {/* Animated gradient blobs */}
                {!shouldReduceMotion && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                    />
                  </>
                )}

                {/* Icon container */}
                <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 rounded-full p-6 shadow-2xl shadow-purple-500/50">
                  <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={
                      !shouldReduceMotion
                        ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              {!shouldReduceMotion && (
                <>
                  <motion.div
                    className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
                    animate={{
                      x: [0, 20, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 20, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4,
                    }}
                  />
                </>
              )}

              <CardHeader className="text-center space-y-4 relative z-10">
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Contenido Premium
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-base md:text-lg">
                    Esta función está disponible exclusivamente para usuarios
                    Pro. Actualiza tu plan para desbloquear todo el potencial de
                    Memory Ninja
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-8 relative z-10">
                {/* Features Grid */}
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PREMIUM_FEATURES.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300 group"
                  >
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Ver planes Pro
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 border-border hover:bg-muted/50"
                  >
                    <Link
                      href="/"
                      className="flex items-center justify-center gap-2"
                    >
                      Volver a inicio
                    </Link>
                  </Button>
                </motion.div>

                {/* Additional info */}
                <motion.div
                  variants={itemVariants}
                  className="text-center pt-4 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Acceso instantáneo tras la suscripción
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              ¿Tienes preguntas?{" "}
              <a
                href="mailto:support@memoryninja.es"
                className="text-purple-500 hover:text-purple-600 underline underline-offset-2 font-medium"
              >
                Contáctanos
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
