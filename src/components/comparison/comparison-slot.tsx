import { useDroppable } from "@dnd-kit/core";
import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { X, Upload, Sword } from "lucide-react";
import { cn } from "@/lib/utils";
import { CharacterCombatStyleSwitcher } from "@/components/character/character-combat-style-switcher";

interface ComparisonSlotProps {
  id: string;
  title: string;
  entry: WikiEntry | null;
  selectedCombatStyle: string | null;
  onClear: () => void;
  onCombatStyleChange: (styleId: string) => void;
}

export function ComparisonSlot({
  id,
  title,
  entry,
  selectedCombatStyle,
  onClear,
  onCombatStyleChange
}: ComparisonSlotProps) {
  const {
    isOver,
    setNodeRef
  } = useDroppable({
    id
  });
  
  return (
    <Card ref={setNodeRef} className={cn("min-h-[300px] h-full flex flex-col transition-all border-0 rounded-2xl", isOver && "ring-2 ring-primary bg-primary/5", !entry && "border-dashed border-2")}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {entry && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1">
        {entry ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="aspect-square w-full max-w-[200px] mx-auto rounded-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-primary/20">
              <OptimizedImage 
                src={`/lovable-uploads/character-icons/${entry.id}-icon.png`} 
                alt={entry.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="text-center space-y-3 flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-xl">{entry.title}</h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {entry.category}
                </Badge>
                {entry.subcategory && (
                  <Badge variant="outline" className="rounded-full">
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
            
            {/* Combat Style Selector */}
            {entry.category === "character" && entry.combatStyles && entry.combatStyles.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Sword className="h-4 w-4" />
                  Combat Style
                </div>
                <div className="flex justify-start">
                  <CharacterCombatStyleSwitcher
                    combatStyles={entry.sections?.combatStyles || []}
                    currentStyle={selectedCombatStyle || entry.sections?.combatStyles?.[0]?.id || 'standard'}
                    onStyleChange={onCombatStyleChange}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground/50" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-muted-foreground">Click on an entry or drop it here.</p>
              <p className="text-sm text-muted-foreground">You can drag an entry here to select it, or just click it!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}