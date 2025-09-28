"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useFlashCardsQuery } from "../../hooks/flashcards-query/useFlashCardsQuery";
import {
  flashcardButtonVariants,
  flashcardContainerVariants,
  flashcardContentVariants,
  flashcardFlipVariants,
  deleteButtonVariants,
  flashcardTextVariants,
  flashcardThemeVariants,
} from "@/animations/utils";

interface FlashcardProps {
  flashcardID: string;
  question: string;
  answer: string;
  theme: string;
}

export default function Flashcard({
  question,
  answer,
  theme,
  flashcardID,
}: FlashcardProps) {
  const { deleteFlashcard } = useFlashCardsQuery();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFlip = () => {
    if (isAnimating || isDeleting) return;
    setIsAnimating(true);
    setIsFlipped((prevState) => !prevState);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      deleteFlashcard(flashcardID);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      setIsDeleting(false);
    }
  };

  const handleStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleFlipClick = (event: React.MouseEvent) => {
    handleStopPropagation(event);
    handleFlip();
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    handleStopPropagation(event);
    handleDelete();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleFlip();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isDeleting && (
        <motion.div
          key={flashcardID}
          className="w-full max-w-md mx-auto p-4"
          variants={flashcardContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="relative w-[290px] h-[400px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            variants={flashcardFlipVariants}
            animate={isFlipped ? "back" : "front"}
            onClick={handleFlip}
            onKeyDown={handleKeyDown}
            whileHover="hover"
            tabIndex={0}
            role="button"
            aria-label={`Flashcard: ${question}`}
            aria-pressed={isFlipped}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          >
            {/* Front side */}
            <motion.div
              className="absolute w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Card className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-700/98 to-black backdrop-blur-xl border-4 border-[#000000] text-white p-6">
                <motion.div
                  variants={flashcardContentVariants}
                  initial="hidden"
                  animate={!isFlipped ? "visible" : "hidden"}
                  className="h-full flex flex-col"
                >
                  <div className="flex flex-row justify-between items-start mb-4">
                    <motion.span
                      className="text-sm font-bold text-electric-blue-400"
                      variants={flashcardThemeVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {theme}
                    </motion.span>

                    <motion.div
                      variants={deleteButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      animate={isDeleting ? "deleting" : "idle"}
                    >
                      <Button
                        variant="transparent"
                        className="group"
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                        aria-label="Delete flashcard"
                      >
                        <X
                          className="size-5 text-gray-500 group-hover:text-red-700 transition-colors duration-200"
                          aria-hidden="true"
                        />
                      </Button>
                    </motion.div>
                  </div>

                  <div className="flex flex-col justify-between h-full">
                    <motion.div
                      variants={flashcardTextVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex-1 flex items-center"
                    >
                      <h3 className="text-xl font-extrabold text-center w-full leading-relaxed">
                        {question}
                      </h3>
                    </motion.div>

                    <motion.div
                      variants={flashcardButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      className="mt-auto"
                    >
                      <Button
                        variant="memoryNinja"
                        disabled={isAnimating}
                        onClick={handleFlipClick}
                        aria-label="Reveal answer"
                      >
                        {isAnimating ? "Girando..." : "Ver respuesta"}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Back side */}
            <motion.div
              className="absolute w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <Card className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-700/98 to-black backdrop-blur-xl border-4 border-[#000000] text-white p-6">
                <motion.div
                  variants={flashcardContentVariants}
                  initial="hidden"
                  animate={isFlipped ? "visible" : "hidden"}
                  className="h-full flex flex-col"
                >
                  <motion.span
                    className="text-sm font-bold text-electric-blue-400 mb-4"
                    variants={flashcardThemeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {theme}
                  </motion.span>

                  <div className="flex flex-col justify-between h-full">
                    <motion.div
                      variants={flashcardTextVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex-1 flex items-center"
                    >
                      <p className="text-lg text-center w-full leading-relaxed">
                        {answer}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={flashcardButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      className="mt-auto"
                    >
                      <Button
                        variant="memoryNinja"
                        disabled={isAnimating}
                        onClick={handleFlipClick}
                        aria-label="Show question again"
                      >
                        {isAnimating ? "Girando..." : "Ver pregunta"}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
