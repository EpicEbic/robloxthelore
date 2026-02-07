import { useState, useEffect } from "react";
import { R15_BODY_TYPE, R6_BODY_TYPE, BodyPart, CoreData } from "@/data/bloxian-biology/body-parts";
import { BodyPartComponent } from "./body-part";
import { CoreVisualization } from "./core-visualization";
import { BodyPartInfoPanel } from "./body-part-info-panel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InteractiveBloxianDiagramProps {
  bodyType: 'r15' | 'r6';
  showLabels: boolean;
  onBodyPartClick?: (part: BodyPart | CoreData, isCore: boolean) => void;
  className?: string;
}

export function InteractiveBloxianDiagram({
  bodyType,
  showLabels,
  onBodyPartClick,
  className
}: InteractiveBloxianDiagramProps) {
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<BodyPart | CoreData | null>(null);
  const [isCoreSelected, setIsCoreSelected] = useState(false);

  // Clear selection when body type changes
  useEffect(() => {
    setSelectedPart(null);
    setIsCoreSelected(false);
    setHoveredPartId(null);
  }, [bodyType]);

  const bodyTypeData = bodyType === 'r15' ? R15_BODY_TYPE : R6_BODY_TYPE;
  const { parts, core } = bodyTypeData;

  const handlePartHover = (partId: string) => {
    setHoveredPartId(partId);
  };

  const handlePartClick = (part: BodyPart | CoreData, isCore: boolean) => {
    setSelectedPart(part);
    setIsCoreSelected(isCore);
    onBodyPartClick?.(part, isCore);
  };

  const handleClosePanel = () => {
    setSelectedPart(null);
    setIsCoreSelected(false);
  };

  // SVG viewBox dimensions - matches the coordinate system
  const viewBoxWidth = 100;
  const viewBoxHeight = 85;

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      <Card className="rounded-2xl shadow-xl border-2 overflow-hidden bg-background">
        <CardContent className="p-6">
          <div className="relative w-full bg-muted/20 rounded-lg" style={{ aspectRatio: `${viewBoxWidth}/${viewBoxHeight}`, minHeight: '300px' }}>
            <svg
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ background: 'transparent' }}
            >
              {/* Body parts */}
              {parts.map((part) => (
                <BodyPartComponent
                  key={part.id}
                  part={part}
                  isHovered={hoveredPartId === part.id}
                  isSelected={selectedPart?.id === part.id}
                  showLabel={showLabels}
                  onHover={() => handlePartHover(part.id)}
                  onClick={() => handlePartClick(part, false)}
                />
              ))}

              {/* Core visualization */}
              <CoreVisualization
                core={core}
                isSelected={isCoreSelected && selectedPart?.id === 'core'}
                isHovered={hoveredPartId === 'core'}
                onHover={() => handlePartHover('core')}
                onClick={() => handlePartClick(core, true)}
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      {selectedPart && (
        <div className="mt-6">
          <BodyPartInfoPanel
            part={selectedPart}
            isCore={isCoreSelected}
            onClose={handleClosePanel}
          />
        </div>
      )}
    </div>
  );
}

