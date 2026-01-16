import { useState } from "react";
import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Shuffle } from "lucide-react";
import { validateTournamentSize, initializeBracket, TournamentBracket as TournamentBracketType } from "@/utils/tournament-utils";
import { cn } from "@/lib/utils";
import { getSubcategoryLabel } from "@/data/categories";
import { DraggableEntryCard } from "@/components/comparison/draggable-entry-card";
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { PreviewBracket } from "./preview-bracket";
import { isEntryDisabled } from "@/utils/disabled-entries";
import { useEasterEgg } from "@/contexts/easter-egg-context";

interface CharacterSelectorProps {
  availableCharacters: WikiEntry[];
  selectedCharacters: WikiEntry[];
  onSelectionChange: (characters: WikiEntry[]) => void;
  onStartTournament: () => void;
}

const VALID_SIZES = [4, 8, 16] as const;

export function CharacterSelector({
  availableCharacters,
  selectedCharacters,
  onSelectionChange,
  onStartTournament,
}: CharacterSelectorProps) {
  const { enabledEntries } = useEasterEgg();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const draggedEntry = availableCharacters.find(entry => entry.id === active.id);
    if (!draggedEntry) {
      setActiveId(null);
      return;
    }

    // Handle dropping on bracket slots
    if (typeof over.id === 'string' && over.id.startsWith('bracket-slot-')) {
      const slotIndex = parseInt(over.id.replace('bracket-slot-', ''));
      if (!isNaN(slotIndex) && slotIndex < selectedCharacters.length) {
        // Replace character at this slot
        const newSelection = [...selectedCharacters];
        // Remove if already selected elsewhere
        const existingIndex = newSelection.findIndex(c => c.id === draggedEntry.id);
        if (existingIndex >= 0) {
          newSelection[existingIndex] = draggedEntry;
        } else {
          newSelection[slotIndex] = draggedEntry;
        }
        onSelectionChange(newSelection);
      }
    }
    
    setActiveId(null);
  };

  const handleCharacterSelect = (character: WikiEntry) => {
    // Check if already selected
    if (selectedCharacters.some((c) => c.id === character.id)) {
      // Remove if clicked again
      onSelectionChange(selectedCharacters.filter((c) => c.id !== character.id));
      return;
    }

    // Check if we've reached max
    if (selectedCharacters.length >= 16) {
      return;
    }

    onSelectionChange([...selectedCharacters, character]);
  };

  const handleCharacterRemove = (characterId: string) => {
    onSelectionChange(selectedCharacters.filter((c) => c.id !== characterId));
  };

  const handleFillRandomly = () => {
    const currentCount = selectedCharacters.length;
    
    // Find next valid size
    let targetSize = VALID_SIZES.find(size => size > currentCount) || VALID_SIZES[VALID_SIZES.length - 1];
    
    // If already at a valid size, fill to next one
    if (validateTournamentSize(currentCount)) {
      const currentIndex = VALID_SIZES.indexOf(currentCount as typeof VALID_SIZES[number]);
      if (currentIndex < VALID_SIZES.length - 1) {
        targetSize = VALID_SIZES[currentIndex + 1];
      } else {
        // Already at max, just shuffle
        const shuffled = [...availableCharacters].sort(() => Math.random() - 0.5);
        onSelectionChange(shuffled.slice(0, 16));
        return;
      }
    }

    // Get available characters (not already selected)
    const available = availableCharacters.filter(
      (c) => !selectedCharacters.some((sc) => sc.id === c.id)
    );

    // Calculate how many more we need
    const needed = targetSize - selectedCharacters.length;
    
    if (needed <= 0) {
      return;
    }

    // Shuffle and take needed amount
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    const toAdd = shuffled.slice(0, needed);
    
    onSelectionChange([...selectedCharacters, ...toAdd]);
  };

  const handleDeselectAll = () => {
    onSelectionChange([]);
  };

  const isValidSize = validateTournamentSize(selectedCharacters.length);
  const canStart = isValidSize && selectedCharacters.length > 0;

  // Group characters by subcategory
  const groupedEntries = availableCharacters.reduce((groups, entry) => {
    const subcategory = entry.subcategory || 'other';
    if (!groups[subcategory]) {
      groups[subcategory] = [];
    }
    groups[subcategory].push(entry);
    return groups;
  }, {} as Record<string, typeof availableCharacters>);

  // Sort groups by a logical order
  const subcategoryOrder = ['protagonist', 'neutral', 'evil', 'minor-antagonist', 'major-antagonist', 'noncanon', 'other'];
  const sortedGroups = Object.entries(groupedEntries).sort(([a], [b]) => {
    const indexA = subcategoryOrder.indexOf(a);
    const indexB = subcategoryOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  const activeEntry = activeId ? availableCharacters.find(entry => entry.id === activeId) : null;
  const isEntrySelected = (entryId: string) => selectedCharacters.some(c => c.id === entryId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {/* Preview Bracket */}
        {selectedCharacters.length > 0 && (
          <PreviewBracket selectedCharacters={selectedCharacters} onCharacterRemove={handleCharacterRemove} />
        )}

        <Card className="w-full">
          <CardHeader className="text-center space-y-4 pb-6">
            <CardTitle className="text-3xl font-bold">Select Characters</CardTitle>
            <div className="flex flex-col items-center gap-3">
              <Badge variant={isValidSize ? "default" : "secondary"} className="text-lg px-4 py-2">
                {selectedCharacters.length} / {VALID_SIZES.join(", ")} Characters
              </Badge>
              
              {/* Control Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={onStartTournament}
                  disabled={!canStart}
                  variant={canStart ? "default" : "secondary"}
                  size="lg"
                  className="min-w-[140px] font-semibold"
                >
                  Start Tournament
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleFillRandomly}
                  className="gap-2 min-w-[130px]"
                >
                  <Shuffle className="h-4 w-4" />
                  Fill Randomly
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDeselectAll}
                  disabled={selectedCharacters.length === 0}
                  className="min-w-[120px]"
                >
                  Deselect All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Validation Message */}
            {selectedCharacters.length > 0 && !isValidSize && (
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-600 dark:text-yellow-400">
                Please select {VALID_SIZES.find(size => size >= selectedCharacters.length) || VALID_SIZES[0]} characters to start a tournament.
              </div>
            )}

            {/* Available Characters - Grouped by Subcategory */}
            {sortedGroups.map(([subcategory, entries]) => (
              <div key={subcategory} className="space-y-3">
                <h3 className="text-center text-lg font-bold text-foreground uppercase tracking-wide border-b border-border/50 pb-2">
                  {getSubcategoryLabel("character", subcategory as any)}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2">
                  {entries.map((character) => {
                    const isSelected = isEntrySelected(character.id);
                    const selectedIndex = selectedCharacters.findIndex(c => c.id === character.id);
                    const disabled = isEntryDisabled(character.id, enabledEntries);
                    
                    return (
                      <DraggableEntryCard
                        key={character.id}
                        entry={character}
                        isSelected={isSelected}
                        isDragging={activeId === character.id}
                        isDisabled={disabled}
                        onEntryClick={handleCharacterSelect}
                        slotNumber={isSelected ? selectedIndex + 1 : null}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

          </CardContent>
        </Card>
      </div>

      <DragOverlay>
        {activeEntry ? (
          <div className="opacity-50 rotate-6 scale-110">
            <DraggableEntryCard entry={activeEntry} isOverlay isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
