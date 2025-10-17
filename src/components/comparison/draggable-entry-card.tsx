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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "border-0 hover:border-primary/50",
        !isDisabled && "cursor-grab active:cursor-grabbing hover:shadow-xl hover:shadow-primary/10",
        isDisabled && "opacity-40 cursor-not-allowed grayscale border-muted",
        isDragging && "opacity-50 rotate-3 scale-105 shadow-2xl",
        isOverlay && "z-50 rotate-6 scale-110 shadow-2xl",
        isSelected && "ring-2 ring-primary ring-offset-2 bg-primary/5",
        "hover:scale-105 hover:-translate-y-1"
      )}
    >
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300",
        isSelected ? "bg-primary" : "bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5"
      )} />
      
      <CardContent className="relative p-4">
        <div className="space-y-3">
          {/* Image container with enhanced styling */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 group-hover:border-primary/30 transition-colors">
            <OptimizedImage
              src={getCharacterDisplayImage(entry)}
              alt={entry.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Selection indicator */}
            {slotNumber && isSelected && (
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg border-2 border-background">
                {slotNumber}
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
         
          {/* Content section */}
          <div className="space-y-2">
            <h3 className="font-bold text-base leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {entry.title}
            </h3>
            
            <div className="flex flex-wrap gap-1.5">
              <Badge 
                variant="secondary" 
                className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {entry.category}
              </Badge>
              {entry.subcategory && (
                <Badge 
                  variant="outline" 
                  className="text-xs font-medium px-2 py-1 border-primary/30 text-foreground/80 hover:border-primary/50 hover:text-foreground transition-colors"
                >
                  {getSubcategoryLabel(entry.category, entry.subcategory)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}