"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export interface LoadingModalTheme {
  backdrop?: string;
  container?: string;
  spinner?: string;
  spinnerAccent?: string;
  message?: string;
  dots?: string;
  glow?: string;
}

export interface LoadingModalProps {
  isLoading: boolean;
  message?: string;
  theme?: LoadingModalTheme;
  size?: "sm" | "md" | "lg";
  spinnerType?: "ring" | "default";
  showClose?: boolean;
  blur?: boolean;
  onClose?: () => void;
}

const defaultTheme: LoadingModalTheme = {
  backdrop: "bg-black/50 backdrop-blur-md",
  container:
    "bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800 border-slate-700/50",
  spinner: "border-slate-600/30 border-t-blue-400 border-r-slate-400",
  spinnerAccent: "from-blue-500/20 to-slate-400/20",
  message: "from-blue-200 via-slate-200 to-blue-200",
  dots: "from-blue-400 to-slate-400",
  glow: "from-transparent via-blue-400/10 to-transparent",
};

const sizeClasses = {
  sm: "p-6 w-64",
  md: "p-8 w-80",
  lg: "p-10 w-96",
};

const LoadingSpinner = ({
  type,
  theme,
  size,
}: {
  type: "ring" | "default";
  theme: LoadingModalTheme;
  size: "sm" | "md" | "lg";
}) => {
  const spinnerSize =
    size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16";

  if (type === "default" || type === "ring") {
    return (
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className={`${spinnerSize} rounded-full border-4 ${theme.spinner}`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={`absolute inset-2 rounded-full bg-gradient-to-r ${theme.spinnerAccent}`}
        />
      </div>
    );
  }

  return null;
};

export default function LoadingModal({
  isLoading,
  message = "Loading...",
  theme = {},
  size = "md",
  spinnerType = "default",
  showClose = false,
  blur = true,
  onClose,
}: LoadingModalProps) {
  const [mounted, setMounted] = useState(false);

  const mergedTheme: LoadingModalTheme = {
    ...defaultTheme,
    ...theme,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            ${blur ? mergedTheme.backdrop : "bg-black/50"}
          `}
          onClick={showClose && onClose ? onClose : undefined}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.1,
            }}
            className={`
              relative ${sizeClasses[size]} rounded-2xl shadow-2xl
              ${mergedTheme.container}
              border backdrop-blur-xl
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Metallic glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${mergedTheme.glow} animate-pulse`}
            />

            {/* Close button */}
            {showClose && onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close loading modal"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            )}

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center space-y-6 h-full">
              {/* Loading spinner */}
              <LoadingSpinner
                type={spinnerType}
                theme={mergedTheme}
                size={size}
              />

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className={`
                  font-medium text-center
                  bg-gradient-to-r ${mergedTheme.message}
                  bg-clip-text text-transparent
                  ${
                    size === "sm"
                      ? "text-sm"
                      : size === "lg"
                      ? "text-xl"
                      : "text-lg"
                  }
                `}
              >
                {message}
              </motion.p>

              {/* Animated dots indicator */}
              <div className="flex space-x-1">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${mergedTheme.dots}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
