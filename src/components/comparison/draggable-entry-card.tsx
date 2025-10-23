import { useDraggable } from "@dnd-kit/core";
import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import { getCharacterDisplayImage } from "@/utils/image-source-utils";
import { getSubcategoryLabel } from "@/data/categories";

interface DraggableEntryCardProps {
  entry: WikiEntry;
  isDragging?: boolean;
  isOverlay?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onEntryClick?: (entry: WikiEntry) => void;
  slotNumber?: number | null;
}

export function DraggableEntryCard({ entry, isDragging = false, isOverlay = false, isSelected = false, isDisabled = false, onEntryClick, slotNumber }: DraggableEntryCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: entry.id,
    disabled: isOverlay || isDisabled,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when dragging or disabled
    if (isDragging || isDisabled) return;
    
    e.stopPropagation();
    onEntryClick?.(entry);
  };

  const characterIconPath = `/lovable-uploads/character-icons/${entry.id}-icon.png`;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "border-0 rounded-2xl",
        !isDisabled && "cursor-grab active:cursor-grabbing",
        isDisabled && "opacity-40 cursor-not-allowed grayscale border-muted",
        isDragging && "opacity-50 rotate-3 scale-105 shadow-2xl",
        isOverlay && "z-50 rotate-6 scale-110 shadow-2xl",
        isSelected && "ring-2 ring-primary ring-offset-2 bg-primary/5",
      )}
    >
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300",
        isSelected ? "bg-primary" : "bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5"
      )} />
      
      <CardContent className="relative p-3">
        <div className="space-y-2">
          {/* Image container - more rounded */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 transition-colors">
            <OptimizedImage
              src={getCharacterDisplayImage(entry)}
              alt={entry.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            
            {/* Selection indicator */}
            {slotNumber && isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg border-2 border-background">
                {slotNumber}
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
         
          {/* Content section - with character icon */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-primary/20">
                <OptimizedImage
                  src={characterIconPath}
                  alt={`${entry.title} icon`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm leading-tight line-clamp-1 text-foreground group-hover:text-primary transition-colors">
                {entry.title}
              </h3>
            </div>
            
            {entry.subcategory && (
              <Badge 
                variant="outline" 
                className="text-[10px] font-medium px-1.5 py-0.5 border-primary/30 text-foreground/80 hover:border-primary/50 hover:text-foreground transition-colors w-full justify-center rounded-full"
              >
                {getSubcategoryLabel(entry.category, entry.subcategory)}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}