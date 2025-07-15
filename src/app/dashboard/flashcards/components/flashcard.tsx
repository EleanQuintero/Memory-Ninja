"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react"

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
      <div className="relative perspective-[1200px] w-[290px] h-[400px]">
        <div
          className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front side - Question */}
          <Card className="absolute w-full h-full backface-hidden bg-gradient-to-br from-slate-900/95 via-slate-700/98 to-black backdrop-blur-xl border-4  border-[#000000] hover:border-[#35495e] transition-colors duration-300 ease-out text-white p-6">
            <div className="flex flex-row">
              <Button
                variant="custom"
                className="absolute top-2 right-2 group"
                onClick={() => {alert("delee")}}
              >
                <X className="size-5 text-gray-500 group-hover:text-red-700 transition-colors duration-200" />
              </Button>
              <span className="text-sm font-bold text-electric-blue-400">
                {theme}
              </span>
            </div>
            <div className="flex flex-col justify-between h-full pt-10">
              <div>
                <h3 className="text-xl font-extrabold mt-2">{question}</h3>
              </div>
              <Button
                onClick={handleFlip}
                variant={"seeAnswer"}
              >
                Ver respuesta
              </Button>
            </div>
          </Card>

          {/* Back side - Answer */}
          <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900/95 via-slate-700/98 to-black backdrop-blur-xl border-4  border-[#000000] hover:border-[#35495e] text-white p-6 transition-colors duration-300 ease-out ">
            <span className="text-sm font-bold text-electric-blue-400">
              {theme}
            </span>
            <div className="flex flex-col justify-between h-full pt-10">
              <div>
                <p className="mt-4 text-lg">{answer}</p>
              </div>
              <Button
                onClick={handleFlip}
                variant={"seeAnswer"}
                className=""
              >
                Ver pregunta
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
