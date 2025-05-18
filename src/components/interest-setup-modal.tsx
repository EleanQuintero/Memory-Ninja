"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface InterestSetupModalProps {
  isOpen: boolean
  onClose: (interests: string[]) => void
  minInterests?: number
}

export function InterestSetupModal({ isOpen, onClose, minInterests = 3 }: InterestSetupModalProps) {
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addInterest = () => {
    if (newInterest.trim() === "") return

    const formattedInterest = newInterest.trim()

    // Evitar duplicados
    if (interests.includes(formattedInterest)) {
      setError("Este tema ya ha sido agregado")
      return
    }

    setInterests((prev) => [...prev, formattedInterest])
    setNewInterest("")
    setError(null)
  }

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addInterest()
    }
  }

  const handleSubmit = () => {
    if (interests.length < minInterests) {
      setError(`Por favor, agrega al menos ${minInterests} temas de interés`)
      return
    }

    onClose(interests)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleSubmit()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configura tus temas de interés</DialogTitle>
          <DialogDescription>
            Antes de continuar, por favor agrega al menos {minInterests} temas de interés que te gustaría seguir.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="Escribe un tema de interés..."
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              onClick={addInterest}
              size="icon"
              disabled={newInterest.trim() === ""}
              aria-label="Agregar tema de interés"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex flex-wrap gap-2 min-h-20">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="flex items-center gap-1 py-1.5 pl-3 pr-2">
                {interest}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 hover:bg-secondary-foreground/20 rounded-full"
                  onClick={() => removeInterest(interest)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar {interest}</span>
                </Button>
              </Badge>
            ))}

            {interests.length === 0 && (
              <p className="text-sm text-muted-foreground italic w-full text-center py-6">
                Agrega tus temas de interés para continuar
              </p>
            )}
          </div>

          <p className="text-sm">
            {interests.length} de {minInterests} temas mínimos requeridos
          </p>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={interests.length < minInterests}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
