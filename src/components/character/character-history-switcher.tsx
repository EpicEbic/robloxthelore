import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { HistoryOption } from "@/types/wiki-types";

interface CharacterHistorySwitcherProps {
  histories: HistoryOption[];
  currentHistory: string;
  onHistoryChange: (historyId: string) => void;
}

export function CharacterHistorySwitcher({
  histories,
  currentHistory,
  onHistoryChange
}: CharacterHistorySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentHistoryData = histories.find(h => h.id === currentHistory) || histories[0];
  
  // Don't render if there's only one history
  if (histories.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-auto min-h-[32px] py-2 text-xs w-auto justify-between px-3 bg-background border border-border rounded-md flex items-center gap-2 hover:bg-accent/50 transition-colors"
      >
        <span className="font-medium">{currentHistoryData.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-full sm:w-auto sm:min-w-[200px] bg-background border border-border rounded-md shadow-lg z-50">
          {histories.map((history) => (
            <button
              key={history.id}
              onClick={() => {
                onHistoryChange(history.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-accent/50 transition-colors first:rounded-t-md last:rounded-b-md ${
                history.id === currentHistory ? "bg-accent/30" : ""
              }`}
            >
              <span className="font-medium">{history.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}