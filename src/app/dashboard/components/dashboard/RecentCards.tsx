"use client";
import { BookOpen, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RecentCardsSkeleton } from "@/components/fallbacks/RecentCardSkeleton";
import { motion, AnimatePresence } from "motion/react";
import {
  fadeVariants,
  containerVariants,
  fadeInUpVariants,
  statsIconVariants,
} from "@/animations/utils";

interface Card {
  question: string;
  theme: string;
  createdAt: string;
}

interface RecentCardsProps {
  cards?: Card[];
  loading?: boolean;
}

export const RecentCards: React.FC<RecentCardsProps> = ({ cards, loading }) => {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="recent-cards-loading"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="p-3"
        >
          <RecentCardsSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="recent-cards-loaded"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 overflow-hidden"
        >
          {cards?.map((card, index) => (
            <motion.div
              key={`${card.question}-${index}`}
              variants={fadeInUpVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
                backgroundColor: "rgba(55, 65, 81, 0.8)",
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <motion.div
                className="bg-blue-900/30 p-2 rounded-lg"
                variants={statsIconVariants}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                }}
              >
                <BookOpen size={16} className="text-blue-400" />
              </motion.div>

              <motion.div
                className="flex-1 min-w-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <motion.h4
                  className="text-sm font-medium text-white truncate"
                  whileHover={{ color: "#60a5fa" }}
                  transition={{ duration: 0.2 }}
                >
                  {card.question}
                </motion.h4>
                <motion.div
                  className="flex items-center gap-2 text-xs text-gray-400 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + 0.1 * index, duration: 0.3 }}
                >
                  <motion.span
                    className="flex items-center gap-1"
                    whileHover={{ color: "#60a5fa" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Tag size={12} />
                    {card.theme}
                  </motion.span>
                  <motion.span
                    className="flex items-center gap-1"
                    whileHover={{ color: "#60a5fa" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Clock size={12} />
                    {card.createdAt}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="link" asChild className="w-full py-2 text-sm">
              <Link href={"/dashboard/flashcards"}>
                <motion.span
                  whileHover={{
                    textDecoration: "underline",
                    color: "#60a5fa",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Ver todas las tarjetas
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
