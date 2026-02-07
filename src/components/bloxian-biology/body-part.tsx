import { BodyPart } from "@/data/bloxian-biology/body-parts";
import { cn } from "@/lib/utils";

interface BodyPartComponentProps {
  part: BodyPart;
  isHovered?: boolean;
  isSelected?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  className?: string;
}

export function BodyPartComponent({
  part,
  isHovered = false,
  isSelected = false,
  onHover,
  onLeave,
  onClick,
  className
}: BodyPartComponentProps) {
  const { position, id } = part;
  const isHead = id === 'head';
  const borderRadius = isHead ? Math.min(position.width, position.height) * 0.25 : 1.5;

  return (
    <g
      className={cn("cursor-pointer", className)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <rect
        x={position.x}
        y={position.y}
        width={position.width}
        height={position.height}
        fill={
          isSelected
            ? "hsl(var(--primary) / 0.15)"
            : isHovered
            ? "hsl(var(--primary) / 0.08)"
            : "transparent"
        }
        stroke={
          isSelected
            ? "hsl(var(--primary))"
            : isHovered
            ? "hsl(var(--primary) / 0.7)"
            : "hsl(var(--foreground) / 0.6)"
        }
        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
        rx={borderRadius}
        ry={borderRadius}
        style={{ transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s' }}
      />
    </g>
  );
}
