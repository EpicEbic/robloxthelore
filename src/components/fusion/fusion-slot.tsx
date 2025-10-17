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
}

export function FusionSlot({
  id,
  title,
  entry,
  onClear
}: FusionSlotProps) {
  const {
    isOver,
    setNodeRef
  } = useDroppable({
    id
  });
  
  return (
    <Card ref={setNodeRef} className={cn("min-h-[300px] transition-all", isOver && "ring-2 ring-primary bg-primary/5", !entry && "border-dashed border-2")}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {entry && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        {entry ? (
          <div className="space-y-4">
            <div className="aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden bg-muted">
              <OptimizedImage src={getCharacterDisplayImage(entry)} alt={entry.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-xl">{entry.title}</h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">
                  {entry.category}
                </Badge>
                {entry.subcategory && (
                  <Badge variant="outline">
                    {entry.subcategory}
                  </Badge>
                )}
              </div>
              
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