"use client";
import React from "react";
import { BookOpen, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RecentCardsSkeleton } from "@/components/fallbacks/RecentCardSkeleton";

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
  if (loading) {
    return (
      <div className="p-3">
        <RecentCardsSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cards?.map((card, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="bg-blue-900/30 p-2 rounded-lg">
            <BookOpen size={16} className="text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">
              {card.question}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <Tag size={12} />
                {card.theme}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {card.createdAt}
              </span>
            </div>
          </div>
        </div>
      ))}
      <Button variant="link" asChild className="w-full py-2 text-sm">
        <Link href={"/dashboard/flashcards"}>Ver todas las tarjetas</Link>
      </Button>
    </div>
  );
};
