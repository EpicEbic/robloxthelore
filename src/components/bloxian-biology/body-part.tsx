import { BodyPart } from "@/data/bloxian-biology/body-parts";
import { cn } from "@/lib/utils";

interface BodyPartComponentProps {
  part: BodyPart;
  isHovered?: boolean;
  isSelected?: boolean;
  showLabel?: boolean;
  onHover?: () => void;
  onClick?: () => void;
  className?: string;
}

export function BodyPartComponent({
  part,
  isHovered = false,
  isSelected = false,
  showLabel = false,
  onHover,
  onClick,
  className
}: BodyPartComponentProps) {
  const { position, name, id } = part;
  const isHead = id === 'head';
  const borderRadius = isHead ? Math.min(position.width, position.height) / 2 : 1.5; // Rounded for head, small radius for others

  return (
    <g
      className={cn("cursor-pointer transition-all duration-200", className)}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {/* Body part rectangle (rounded for head) */}
      <rect
        x={position.x}
        y={position.y}
        width={position.width}
        height={position.height}
        fill="transparent"
        stroke={cn(
          isSelected
            ? "hsl(var(--primary))"
            : isHovered
            ? "hsl(var(--primary) / 0.7)"
            : "hsl(var(--foreground) / 0.9)"
        )}
        strokeWidth={isSelected ? "2.5" : isHovered ? "2" : "2"}
        rx={borderRadius}
        ry={borderRadius}
        className="transition-all duration-200"
      />
      
      {/* Label - positioned above the part with better visibility */}
      {showLabel && (
        <g>
          {/* Background for text readability */}
          <rect
            x={position.x + position.width / 2 - (name.length * 3)}
            y={position.y - 8}
            width={name.length * 6}
            height={8}
            fill="hsl(var(--background))"
            fillOpacity="0.9"
            rx="2"
          />
          <text
            x={position.x + position.width / 2}
            y={position.y - 2}
            className="fill-foreground pointer-events-none"
            textAnchor="middle"
            dominantBaseline="auto"
            style={{ 
              fontSize: '9px',
              fontWeight: '600',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {name}
          </text>
        </g>
      )}
    </g>
  );
}

