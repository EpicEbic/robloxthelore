import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface CombatStyleTechniqueProps {
  title: string;
  description: string[];
  currentEntryId?: string;
}

export function CombatStyleTechnique({ title, description, currentEntryId }: CombatStyleTechniqueProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-left">{title}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 py-3 bg-card/50 border-t border-border/50">
          <div className="text-foreground/90 space-y-3">
            {description.map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-relaxed">
                <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
