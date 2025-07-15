"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/utils/services/functions/helpers/cnFunction"

interface InterestSelectorProps {
  initialInterests: string[]
  onInterestsChange?: (interests: string[]) => void
}

export function InterestSelector({ initialInterests, onInterestsChange }: InterestSelectorProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests)
  const [customInterest, setCustomInterest] = useState("")
  const [availableInterests, setAvailableInterests] = useState<string[]>(initialInterests)

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const newInterests = prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]

      // Notificar cambios para sincronizar con Zustand
      onInterestsChange?.(newInterests)
      return newInterests
    })
  }

  const addCustomInterest = () => {
    if (customInterest.trim() === "") return

    const formattedInterest = customInterest.trim()

    // Evitar duplicados
    if (!availableInterests.includes(formattedInterest)) {
      setAvailableInterests((prev) => [...prev, formattedInterest])

      // Seleccionar automáticamente el interés recién agregado
      setSelectedInterests((prev) => {
        const newInterests = [...prev, formattedInterest]
        onInterestsChange?.(newInterests)
        return newInterests
      })
    }

    setCustomInterest("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addCustomInterest()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Temas de interés</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecciona los temas que te interesan o agrega los tuyos propios
        </p>

        <div className="flex flex-wrap gap-2">
          {availableInterests.map((interest) => (
            <Badge
              key={interest}
              variant={selectedInterests.includes(interest) ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-sm py-1 px-3 hover:bg-primary/90 transition-colors",
                selectedInterests.includes(interest)
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:text-primary-foreground",
              )}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Agregar otro tema de interés..."
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button
          onClick={addCustomInterest}
          size="icon"
          disabled={customInterest.trim() === ""}
          aria-label="Agregar tema de interés"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {selectedInterests.length > 0 && (
        <div className="pt-2">
          <p className="text-sm text-muted-foreground mb-2">
            {selectedInterests.length} {selectedInterests.length === 1 ? "tema seleccionado" : "temas seleccionados"}
          </p>
        </div>
      )}
    </div>
  )
}
