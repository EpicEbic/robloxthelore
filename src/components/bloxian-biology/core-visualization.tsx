import { CoreData } from "@/data/bloxian-biology/body-parts";
import { cn } from "@/lib/utils";

interface CoreVisualizationProps {
  core: CoreData;
  isSelected?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onClick?: () => void;
  className?: string;
}

export function CoreVisualization({
  core,
  isSelected = false,
  isHovered = false,
  onHover,
  onClick,
  className
}: CoreVisualizationProps) {
  const { position } = core;
  const clickableRadius = position.radius + 4; // Larger clickable area

  return (
    <g
      className={cn("cursor-pointer", className)}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {/* Clickable outline area (invisible but clickable) */}
      <circle
        cx={position.x}
        cy={position.y}
        r={clickableRadius}
        fill="transparent"
        stroke="none"
        className="pointer-events-auto"
      />
      
      {/* Core circle - grey base that pulses white */}
      <circle
        cx={position.x}
        cy={position.y}
        r={position.radius}
        className="core-pulse-white"
        fill="rgb(156, 163, 175)"
        stroke={cn(
          isSelected
            ? "hsl(var(--primary))"
            : isHovered
            ? "hsl(var(--primary) / 0.6)"
            : "hsl(var(--foreground) / 0.5)"
        )}
        strokeWidth={isSelected ? "2" : "1.5"}
      />
    </g>
  );
}

