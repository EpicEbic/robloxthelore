import { useDroppable } from "@dnd-kit/core";
import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getCharacterDisplayImage } from "@/utils/image-source-utils";
import { X, Upload, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FusionSlotProps {
  id: string;
  title: string;
  entry: WikiEntry | null;
  onClear: () => void;
  hideClearButton?: boolean;
}

export function FusionSlot({
  id,
  title,
  entry,
  onClear,
  hideClearButton = false
}: FusionSlotProps) {
  const {
    isOver,
    setNodeRef
  } = useDroppable({
    id
  });
  
  return (
    <Card ref={setNodeRef} className={cn("min-h-[300px] h-full flex flex-col transition-all border-0 rounded-2xl overflow-visible bg-card", isOver && "ring-2 ring-primary bg-primary/5", !entry && "border-dashed border-2")}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {entry && !hideClearButton && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1">
        {entry ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="aspect-square w-full max-w-[200px] mx-auto rounded-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-primary/20 shadow-sm">
              <OptimizedImage 
                src={`/lovable-uploads/character-icons/${entry.id}-icon.png`} 
                alt={entry.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="text-center space-y-3 flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-xl">{entry.title}</h3>
              
              {entry.subcategory && (
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="rounded-full capitalize">
                    {entry.subcategory}
                  </Badge>
                </div>
              )}
              
              {entry.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {entry.description}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground/50" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-muted-foreground">Click on an entry or drop it here.</p>
              <p className="text-sm text-muted-foreground">Select a character to fuse!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}