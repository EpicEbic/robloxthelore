import { CoreData } from "@/data/bloxian-biology/body-parts";
import { cn } from "@/lib/utils";

interface CoreVisualizationProps {
  core: CoreData;
  isSelected?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  className?: string;
}

export function CoreVisualization({
  core,
  isSelected = false,
  isHovered = false,
  onHover,
  onLeave,
  onClick,
  className
}: CoreVisualizationProps) {
  const { position } = core;

  return (
    <g
      className={cn("cursor-pointer", className)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Glow effect */}
      {(isSelected || isHovered) && (
        <circle
          cx={position.x}
          cy={position.y}
          r={position.radius + 3}
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth={1}
          className="animate-pulse"
        />
      )}
      <circle
        cx={position.x}
        cy={position.y}
        r={position.radius}
        fill={isSelected ? "hsl(var(--primary) / 0.4)" : isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(var(--muted-foreground) / 0.3)"}
        stroke={isSelected ? "hsl(var(--primary))" : isHovered ? "hsl(var(--primary) / 0.6)" : "hsl(var(--foreground) / 0.5)"}
        strokeWidth={isSelected ? 2 : 1.5}
        style={{ transition: 'fill 0.2s, stroke 0.2s' }}
      />
    </g>
  );
}
