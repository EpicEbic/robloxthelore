import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CombatStyleOption } from "@/types/wiki-types";

interface CharacterCombatStyleSwitcherProps {
  combatStyles: CombatStyleOption[];
  currentStyle: string;
  onStyleChange: (styleId: string) => void;
}

export function CharacterCombatStyleSwitcher({
  combatStyles,
  currentStyle,
  onStyleChange
}: CharacterCombatStyleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if there's only one style or none
  if (combatStyles.length <= 1) {
    return null;
  }

  const currentLabel = combatStyles.find(style => style.id === currentStyle)?.label || combatStyles[0].label;
  
  return (
    <div className="relative w-full sm:w-auto flex justify-end">
      <div className="relative w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)} 
          className="h-auto min-h-[32px] py-2 text-xs w-full sm:w-auto justify-between px-3 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md"
        >
          <span className="truncate">{currentLabel}</span>
          <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
        </Button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-[9999] w-full sm:min-w-[200px] sm:max-w-[300px] sm:w-auto max-h-60 overflow-y-auto">
            {combatStyles.map(style => (
              <button 
                key={style.id} 
                className={`w-full text-left px-3 py-2 text-xs bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground first:rounded-t-lg last:rounded-b-lg transition-colors ${style.id === currentStyle ? 'bg-accent text-accent-foreground' : ''}`} 
                onClick={() => {
                  onStyleChange(style.id);
                  setIsOpen(false);
                }}
              >
                <div className="font-medium break-words">{style.label}</div>
              </button>
            ))}
          </div>
        )}
        
        {isOpen && <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />}
      </div>
    </div>
  );
}