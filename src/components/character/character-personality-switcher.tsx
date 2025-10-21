import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PersonalityOption } from "@/types/wiki-types";

interface CharacterPersonalitySwitcherProps {
  personalities: PersonalityOption[];
  currentPersonality: string;
  onPersonalityChange: (personalityId: string) => void;
}

export function CharacterPersonalitySwitcher({
  personalities,
  currentPersonality,
  onPersonalityChange
}: CharacterPersonalitySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentPersonalityData = personalities.find(p => p.id === currentPersonality) || personalities[0];
  
  // Don't render if there's only one personality
  if (personalities.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-auto min-h-[32px] py-2 text-xs w-auto justify-between px-3 bg-background border border-border rounded-lg flex items-center gap-2 hover:bg-accent/50 transition-all duration-300 hover:scale-102 hover:shadow-md"
      >
        <span className="font-medium">{currentPersonalityData.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-full sm:w-auto sm:min-w-[200px] bg-background border border-border rounded-lg shadow-lg z-50">
          {personalities.map((personality) => (
            <button
              key={personality.id}
              onClick={() => {
                onPersonalityChange(personality.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-accent/50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                personality.id === currentPersonality ? "bg-accent/30" : ""
              }`}
            >
              <span className="font-medium">{personality.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}