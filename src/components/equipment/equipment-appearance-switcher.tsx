import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EquipmentOverviewOption } from "@/types/wiki-types";

interface EquipmentAppearanceSwitcherProps {
  appearances: EquipmentOverviewOption[];
  currentAppearance: string;
  onAppearanceChange: (appearanceId: string) => void;
}

export function EquipmentAppearanceSwitcher({
  appearances,
  currentAppearance,
  onAppearanceChange
}: EquipmentAppearanceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if there's only one appearance
  if (appearances.length <= 1) {
    return null;
  }

  const currentLabel = appearances.find(app => app.id === currentAppearance)?.label || appearances[0].label;
  
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
          <div className="absolute top-full right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 w-full sm:min-w-[200px] sm:max-w-[300px] sm:w-auto max-h-60 overflow-y-auto">
            {appearances.map(appearance => (
              <button 
                key={appearance.id} 
                className={`w-full text-left px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground first:rounded-t-lg last:rounded-b-lg transition-colors ${appearance.id === currentAppearance ? 'bg-accent text-accent-foreground' : ''}`} 
                onClick={() => {
                  onAppearanceChange(appearance.id);
                  setIsOpen(false);
                }}
              >
                <div className="font-medium break-words">{appearance.label}</div>
              </button>
            ))}
          </div>
        )}
        
        {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
      </div>
    </div>
  );
}
