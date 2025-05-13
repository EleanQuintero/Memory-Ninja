"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FlashcardProps {
  question: string;
  answer: string;
  theme: string;
}

export default function Flashcard({ question, answer, theme }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative perspective-[1000px] w-full h-[300px]">
        <div
          className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front side - Question */}
          <Card className="absolute w-full h-full backface-hidden bg-gray-900 border-electric-blue-600 text-white p-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-medium text-electric-blue-400">
                {theme}
              </span>
              <h3 className="text-xl font-bold mt-2">{question}</h3>
            </div>
            <Button
              onClick={handleFlip}
              className="bg-electric-blue-600 hover:bg-electric-blue-700 text-white self-end"
            >
              Ver respuesta
            </Button>
          </Card>

          {/* Back side - Answer */}
          <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900 border-electric-blue-600 text-white p-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-medium text-electric-blue-400">
                {theme}
              </span>
              <p className="mt-4 text-lg">{answer}</p>
            </div>
            <Button
              onClick={handleFlip}
              className="bg-electric-blue-600 hover:bg-electric-blue-700 text-white self-end"
            >
              Ver pregunta
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
