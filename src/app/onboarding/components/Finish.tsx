"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import LoadingModal from "@/components/fallbacks/LoadingModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { useUIState } from "@/store/uiState/uiState";
import { useOnBoarding } from "../hooks/useOnboarding";
import {
  finishContainerVariants,
  finishSuccessIconVariants,
  onboardingContentVariants,
} from "@/animations/onboardingVariants";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

export const Finish = () => {
  const { loading } = useUIState();
  const { updateOnboarding } = useOnBoarding();
  const shouldReduceMotion = useReducedMotion();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Set window size on mount (client-side only)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
          <CardContent>
            <LoadingModal
              isLoading={loading}
              blur={true}
              showClose={false}
              message="Cargando tu espacio de MemoryNinja...🥷🏻"
            ></LoadingModal>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <>
      {/* React Confetti - fixed position para cubrir toda la pantalla */}
      {!shouldReduceMotion && showConfetti && windowSize.width > 0 && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={false}
            colors={[
              "#3b82f6",
              "#8b5cf6",
              "#ec4899",
              "#eab308",
              "#22c55e",
              "#ef4444",
            ]}
            gravity={0.3}
            initialVelocityY={20}
          />
        </div>
      )}

      <div className="relative w-full">
        {/* Animated background blobs */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 lg:w-80 lg:h-80 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 lg:w-80 lg:h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.6, 0.3, 0.6],
                x: [0, -50, 0],
                y: [0, -30, 0],
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

        <motion.div
          variants={finishContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-2xl w-full">
            <CardHeader className="space-y-4 text-center relative">
              {/* Success icon with animations */}
              <motion.div
                variants={finishSuccessIconVariants}
                className="flex justify-center mb-2"
              >
                <div className="relative">
                  <motion.div
                    animate={
                      !shouldReduceMotion
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-green-500/30 rounded-full blur-xl"
                  />
                  <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
                  {!shouldReduceMotion && (
                    <>
                      <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-2 -left-2"
                        animate={{
                          rotate: [0, -360],
                          scale: [1.2, 1, 1.2],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Star className="w-6 h-6 text-purple-400" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div variants={onboardingContentVariants}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    ¡Felicidades, Ninja! 🥷
                  </CardTitle>
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
              </motion.div>

              <motion.div variants={onboardingContentVariants}>
                <CardDescription className="text-base">
                  Has completado el proceso de onboarding con éxito
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                variants={onboardingContentVariants}
                className="space-y-4"
              >
                {/* Achievement badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: CheckCircle, label: "Registrado", color: "green" },
                    { icon: Zap, label: "Verificado", color: "yellow" },
                    { icon: Star, label: "Listo", color: "purple" },
                  ].map((badge, index) => (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6 + index * 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg bg-${badge.color}-500/10 border border-${badge.color}-500/30`}
                    >
                      <badge.icon
                        className={`w-6 h-6 text-${badge.color}-500`}
                      />
                      <span className="text-xs font-medium text-muted-foreground">
                        {badge.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="p-4 bg-muted/50 rounded-lg border border-border relative overflow-hidden"
                  variants={onboardingContentVariants}
                >
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
                    />
                  )}
                  <p className="text-sm text-center text-muted-foreground relative z-10">
                    Ahora puedes empezar a{" "}
                    <span className="font-semibold text-foreground">
                      crear tus flashcards
                    </span>{" "}
                    y explorar todas las funcionalidades de{" "}
                    <span className="font-semibold text-purple-500">
                      MemoryNinja
                    </span>{" "}
                    ⚡
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={onboardingContentVariants}>
                <motion.div
                  whileHover={
                    !shouldReduceMotion
                      ? {
                          scale: 1.03,
                          y: -2,
                        }
                      : {}
                  }
                  whileTap={
                    !shouldReduceMotion
                      ? {
                          scale: 0.98,
                        }
                      : {}
                  }
                >
                  <Button
                    onClick={updateOnboarding}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium text-lg py-6 relative group overflow-hidden shadow-lg shadow-purple-500/50"
                  >
                    {!shouldReduceMotion && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 0.5,
                          }}
                        />
                        <motion.span
                          className="absolute right-4"
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                    <span className="relative z-10">
                      Comenzar mi viaje ninja 🚀
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Floating emoji decorations */}
        {!shouldReduceMotion && (
          <>
            {[
              { emoji: "🎉", x: "10%", delay: 0 },
              { emoji: "✨", x: "25%", delay: 0.3 },
              { emoji: "🎊", x: "40%", delay: 0.6 },
              { emoji: "⭐", x: "60%", delay: 0.9 },
              { emoji: "💫", x: "75%", delay: 1.2 },
              { emoji: "🌟", x: "90%", delay: 1.5 },
            ].map(({ emoji, x, delay }) => (
              <motion.div
                key={emoji}
                className="absolute text-4xl pointer-events-none"
                style={{ left: x }}
                initial={{
                  y: "120%",
                  opacity: 0,
                }}
                animate={{
                  y: "-20%",
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5,
                  delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeOut",
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
