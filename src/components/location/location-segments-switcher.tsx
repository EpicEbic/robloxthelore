
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SegmentOption {
  id: string;
  title: string;
  description: string;
}

interface LocationSegmentsSwitcherProps {
  segments: string[];
  currentSegment: string;
  onSegmentChange: (segmentId: string) => void;
}

export function LocationSegmentsSwitcher({
  segments,
  currentSegment,
  onSegmentChange
}: LocationSegmentsSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse segments into structured data
  const segmentOptions: SegmentOption[] = segments.map((segment, index) => {
    // Extract title from the segment text (everything before the first " - ")
    const titleMatch = segment.match(/^\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1] : `Segment ${index + 1}`;
    
    return {
      id: `segment-${index}`,
      title,
      description: segment
    };
  });

  // Don't render if there's only one segment or no segments
  if (segmentOptions.length <= 1) {
    return null;
  }

  const currentSegmentData = segmentOptions.find(seg => seg.id === currentSegment) || segmentOptions[0];
  
  return (
    <div className="relative w-full sm:w-auto flex justify-end">
      <div className="relative w-full sm:w-auto">
        <div className="bg-slate-800/50 border border-purple-400/30 rounded-md backdrop-blur-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(!isOpen)} 
            className="h-auto min-h-[32px] py-2 text-xs w-full sm:w-auto justify-between px-3 text-slate-200 hover:bg-slate-700/50 hover:text-purple-300 rounded-md"
          >
            <span className="truncate">{currentSegmentData.title}</span>
            <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
          </Button>
        </div>
        
        {isOpen && (
          <>
            <div className="absolute top-full left-0 right-0 mt-2 border border-purple-400/30 bg-slate-800 backdrop-blur-sm rounded-md shadow-xl z-50 min-w-full">
              {segmentOptions.map(segment => (
                <button 
                  key={segment.id} 
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-purple-600/30 hover:text-purple-200 transition-colors text-slate-200 first:rounded-t-md last:rounded-b-md ${segment.id === currentSegment ? 'bg-purple-600/40 text-purple-200' : ''}`} 
                  onClick={() => {
                    onSegmentChange(segment.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="font-medium break-words">{segment.title}</div>
                </button>
              ))}
            </div>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}
