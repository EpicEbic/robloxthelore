import { useState, useEffect } from "react";
import { R15_BODY_TYPE, R6_BODY_TYPE, BodyPart, CoreData } from "@/data/bloxian-biology/body-parts";
import { BodyPartComponent } from "./body-part";
import { CoreVisualization } from "./core-visualization";

interface InteractiveBloxianDiagramProps {
  bodyType: 'r15' | 'r6';
  onPartSelect?: (part: BodyPart | CoreData, isCore: boolean) => void;
  className?: string;
}

export function InteractiveBloxianDiagram({
  bodyType,
  onPartSelect,
  className
}: InteractiveBloxianDiagramProps) {
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPartId(null);
    setHoveredPartId(null);
  }, [bodyType]);

  const bodyTypeData = bodyType === 'r15' ? R15_BODY_TYPE : R6_BODY_TYPE;
  const { parts, core } = bodyTypeData;

  // R15 uses taller viewBox (legs have more segments), R6 is shorter
  const viewBox = bodyType === 'r15' ? "0 0 120 108" : "0 0 120 102";

  const handlePartClick = (part: BodyPart | CoreData, isCore: boolean) => {
    setSelectedPartId(part.id);
    onPartSelect?.(part, isCore);
  };

  return (
    <div className={className}>
      <svg
        viewBox={viewBox}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Body parts */}
        {parts.map((part) => (
          <BodyPartComponent
            key={part.id}
            part={part}
            isHovered={hoveredPartId === part.id}
            isSelected={selectedPartId === part.id}
            onHover={() => setHoveredPartId(part.id)}
            onLeave={() => setHoveredPartId(null)}
            onClick={() => handlePartClick(part, false)}
          />
        ))}

        {/* Core */}
        <CoreVisualization
          core={core}
          isSelected={selectedPartId === 'core'}
          isHovered={hoveredPartId === 'core'}
          onHover={() => setHoveredPartId('core')}
          onLeave={() => setHoveredPartId(null)}
          onClick={() => handlePartClick(core, true)}
        />
      </svg>
    </div>
  );
}
