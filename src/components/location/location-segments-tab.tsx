
import { Card, CardContent } from "@/components/ui/card";
import { LocationSegmentsSwitcher } from "./location-segments-switcher";

interface LocationSegmentsTabProps {
  segments: string[];
  currentSegment: string;
  onSegmentChange: (segment: string) => void;
}

export function LocationSegmentsTab({ 
  segments, 
  currentSegment, 
  onSegmentChange 
}: LocationSegmentsTabProps) {
  // Parse segments into structured data for display
  const segmentOptions = segments.map((segment, index) => {
    const titleMatch = segment.match(/^\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1] : `Segment ${index + 1}`;
    
    return {
      id: `segment-${index}`,
      title,
      description: segment
    };
  });

  const currentSegmentData = segmentOptions.find(seg => seg.id === currentSegment) || segmentOptions[0];

  // Check if current segment is The Null Zone for applying static effect
  const isNullZone = currentSegmentData?.title === "The Null Zone";

  // Format segment content into paragraphs
  const formatSegmentContent = (content: string, title: string) => {
    // Remove the title prefix
    const cleanContent = content.replace(/^\*\*(.+?)\*\* - /, '');
    
    // Split by explicit paragraph breaks (\n\n)
    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim());
    
    // If no paragraphs were created, return the whole content as one paragraph
    if (paragraphs.length === 0) {
      return [cleanContent];
    }
    
    return paragraphs;
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl p-6 border min-w-0">
        {currentSegmentData && (
          <div className="leading-relaxed space-y-4">
            {/* Header with title and dropdown switcher */}
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
              <h2 className="text-2xl font-semibold text-primary force-text-wrap">
                {currentSegmentData.title}
              </h2>
              <LocationSegmentsSwitcher
                segments={segments}
                currentSegment={currentSegment}
                onSegmentChange={onSegmentChange}
              />
            </div>
            
            {/* Display the formatted content paragraphs - constant static effect for The Null Zone */}
            {formatSegmentContent(currentSegmentData.description, currentSegmentData.title).map((paragraph, index) => (
              <p key={index} className={`mb-4 leading-relaxed text-base force-text-wrap ${isNullZone ? 'tv-static-text text-red-300' : 'text-foreground/90'}`}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
