"use client";

import { motion } from "motion/react";
import { Brain } from "lucide-react";

function DemoEntryPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Spinner Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring with gradient */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-24 w-24 rounded-full border-4 border-transparent border-t-primary border-r-primary/60 sm:h-32 sm:w-32"
          />

          {/* Middle pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-20 w-20 rounded-full border-2 border-muted-foreground/20 sm:h-28 sm:w-28"
          />

          {/* Inner rotating ring - opposite direction */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-16 w-16 rounded-full border-4 border-transparent border-b-accent border-l-accent/60 sm:h-24 sm:w-24"
          />

          {/* Center icon with pulse */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm sm:h-16 sm:w-16"
          >
            <Brain className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
          </motion.div>

          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-32 w-32 rounded-full bg-primary/20 blur-2xl sm:h-40 sm:w-40"
          />
        </div>

        {/* Loading text with animated dots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="text-center text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
            Cargando Demo de{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Memory Ninja
            </span>
          </h2>

          {/* Animated dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="h-2 w-2 rounded-full bg-primary/60"
              />
            ))}
          </div>
        </motion.div>

        {/* Progress hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          Preparando tu experiencia de aprendizaje...
        </motion.p>
      </motion.div>
    </div>
  );
}

export default DemoEntryPage;
