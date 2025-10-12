"use client";

import { motion } from "motion/react";
import { Brain, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  onboardingContainerVariants,
  onboardingItemVariants,
  onboardingBadgeVariants,
  onboardingTitleVariants,
} from "@/animations/onboardingVariants";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

export default function Start() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center text-center space-y-8 p-6 relative"
      variants={onboardingContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Blobs decorativos adicionales - específicos para Start */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute -top-10 left-1/4 w-32 h-32 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Sparkles className="w-full h-full text-yellow-400/30" />
          </motion.div>

          <motion.div
            className="absolute -bottom-10 right-1/4 w-24 h-24 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Sparkles className="w-full h-full text-blue-400/30" />
          </motion.div>
        </>
      )}

      {/* Badge del Brain con animación bounce */}
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative z-10 shadow-lg shadow-blue-500/50"
        variants={onboardingBadgeVariants}
      >
        <motion.div
          animate={
            !shouldReduceMotion
              ? {
                  rotate: [0, -5, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <Brain className="h-12 w-12 text-white drop-shadow-lg" />
        </motion.div>

        {/* Glow effect ring */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Título y descripción con stagger */}
      <motion.div
        className="space-y-4 relative z-10"
        variants={onboardingItemVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          variants={onboardingTitleVariants}
        >
          Estudia de forma{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 relative inline-block">
            ninja
            {!shouldReduceMotion && (
              <motion.span
                className="absolute -right-6 -top-2"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              >
                ⚡
              </motion.span>
            )}
          </span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto"
          variants={onboardingItemVariants}
        >
          Domina cualquier tema con flashcards inteligentes y técnicas de
          memorización avanzadas
        </motion.p>
      </motion.div>

      {/* Botones con animaciones diferenciadas */}
      <motion.div
        className="w-full space-y-4 pt-4 relative z-10"
        variants={onboardingItemVariants}
      >
        <motion.div
          whileHover={
            !shouldReduceMotion
              ? {
                  scale: 1.02,
                  y: -2,
                }
              : {}
          }
          whileTap={
            !shouldReduceMotion
              ? {
                  scale: 0.98,
                  y: 0,
                }
              : {}
          }
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <Button
            asChild
            className="w-full text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-shadow duration-300"
            size="lg"
          >
            <Link href="/onboarding/register">
              <motion.div
                className="flex items-center justify-center"
                animate={
                  !shouldReduceMotion
                    ? {
                        x: [0, 2, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Zap className="mr-2 h-5 w-5" />
                Comenzar ahora
              </motion.div>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="text-sm text-muted-foreground"
          variants={onboardingItemVariants}
        >
          <span>¿Ya tienes cuenta? </span>
          <motion.div
            className="inline-block"
            whileHover={
              !shouldReduceMotion
                ? {
                    scale: 1.05,
                    x: 2,
                  }
                : {}
            }
            whileTap={
              !shouldReduceMotion
                ? {
                    scale: 0.95,
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="ml-1 border-border hover:bg-accent hover:text-accent-foreground hover:border-blue-400/50 transition-colors duration-200"
            >
              <Link href="/onboarding/sign-in">Inicia sesión</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating indicators - Stats visualization */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs text-muted-foreground/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-1"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>100% Gratis</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>IA Integrada</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Sin límites</span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
