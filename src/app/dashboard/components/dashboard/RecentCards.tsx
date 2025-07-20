"use client"
import React from "react"
import { BookOpen, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

export const RecentCards: React.FC = () => {
  // Mock de datos
  const cards = [
    {
      question: "¿Qué es una función en matemáticas?",
      topic: "Matemáticas",
      createdAt: "Hoy, 14:30",
      icon: (
        <div className="bg-blue-900/30 p-2 rounded-lg">
          <BookOpen size={16} className="text-blue-400" />
        </div>
      ),
    },
    {
      question: 'What is the past tense of "run"?',
      topic: "Inglés",
      createdAt: "Hoy, 12:15",
      icon: (
        <div className="bg-blue-900/30 p-2 rounded-lg">
          <BookOpen size={16} className="text-blue-400" />
        </div>
      ),
    },
    {
      question: "¿Qué es un componente en React?",
      topic: "React",
      createdAt: "Ayer, 18:45",
      icon: (
        <div className="bg-blue-900/30 p-2 rounded-lg">
          <BookOpen size={16} className="text-blue-400" />
        </div>
      ),
    },
    {
      question: "¿Cuándo ocurrió la Revolución Francesa?",
      topic: "Historia",
      createdAt: "Hace 2 días",
      icon: (
        <div className="bg-blue-900/30 p-2 rounded-lg">
          <BookOpen size={16} className="text-blue-400" />
        </div>
      ),
    },
  ]
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {card.icon}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">
              {card.question}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <Tag size={12} />
                {card.topic}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {card.createdAt}
              </span>
            </div>
          </div>
        </div>
      ))}
      <Button variant="link" className="w-full py-2 text-sm">
        Ver todas las tarjetas
      </Button>
    </div>
  )
} 