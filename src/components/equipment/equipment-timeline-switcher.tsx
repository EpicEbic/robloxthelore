import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EquipmentTimelineOption } from "@/types/wiki-types";

interface EquipmentTimelineSwitcherProps {
  timelines: EquipmentTimelineOption[];
  currentTimeline: string;
  onTimelineChange: (timelineId: string) => void;
}

export function EquipmentTimelineSwitcher({
  timelines,
  currentTimeline,
  onTimelineChange
}: EquipmentTimelineSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if there's only one timeline
  if (timelines.length <= 1) {
    return null;
  }

  const currentLabel = timelines.find(t => t.id === currentTimeline)?.label || timelines[0].label;
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-auto min-h-[32px] py-2 text-xs w-auto justify-between px-3 bg-background border border-border rounded-md flex items-center gap-2 hover:bg-accent/50 transition-colors"
      >
        <span className="font-medium">{currentLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-full sm:w-auto sm:min-w-[200px] bg-background border border-border rounded-md shadow-lg z-50">
          {timelines.map((timeline) => (
            <button
              key={timeline.id}
              onClick={() => {
                onTimelineChange(timeline.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-accent/50 transition-colors first:rounded-t-md last:rounded-b-md ${
                timeline.id === currentTimeline ? "bg-accent/30" : ""
              }`}
            >
              <span className="font-medium">{timeline.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
