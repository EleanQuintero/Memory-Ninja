"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Brain } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  description: string;
}

interface AIModelIconProps {
  model: AIModel[];
}

export function SourceModelIcon({ model }: AIModelIconProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 border">
          <Brain className="w-4 h-4" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-3" side="top">
        {model.map((m) => (
          <div key={m.id} className="space-y-2 mb-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{m.name}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{m.description}</p>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
