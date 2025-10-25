import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { WikiEntry } from "@/types/wiki-types";
import { sampleWikiEntries } from "@/data/sample-wiki-entries";
import { fusionEntries } from "@/data/fusion-entries";
import { DraggableEntryCard } from "@/components/comparison/draggable-entry-card";
import { FusionSlot } from "@/components/fusion/fusion-slot";
import { FusionResults } from "@/components/fusion/fusion-results";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSubcategoryLabel } from "@/data/categories";
import { ArrowLeft, Sword, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import { useFusionImagePreloader } from "@/hooks/use-fusion-image-preloader";

export function FusionPage() {
  // Preload all images for smooth animations
  useFusionImagePreloader();
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<{
    slot1: WikiEntry | null;
    slot2: WikiEntry | null;
  }>({
    slot1: null,
    slot2: null
  });

  // Filter for only characters and group by subcategory
  // Characters temporarily disabled from fusion
  const disabledCharacters = ['builderman', 'bloxxanne-whelder', 'charles-studson', 'bryck-manning', 'the-reckoner', 'the-breadwinner'];
  
  const fusableEntries = sampleWikiEntries.filter(entry => entry.category === "character");
  
  // Group characters by subcategory
  const groupedEntries = fusableEntries.reduce((groups, entry) => {
    const subcategory = entry.subcategory || 'other';
    if (!groups[subcategory]) {
      groups[subcategory] = [];
    }
    groups[subcategory].push(entry);
    return groups;
  }, {} as Record<string, typeof fusableEntries>);

  // Sort groups by a logical order (protagonists first, then deuteragonists, etc.)
  const subcategoryOrder = ['protagonist', 'neutral', 'evil', 'minor-antagonist', 'major-antagonist', 'noncanon', 'other'];
  const sortedGroups = Object.entries(groupedEntries).sort(([a], [b]) => {
    const indexA = subcategoryOrder.indexOf(a);
    const indexB = subcategoryOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
  
  const activeEntry = activeId ? fusableEntries.find(entry => entry.id === activeId) : null;
  
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

    const draggedEntry = fusableEntries.find(entry => entry.id === active.id);
    if (!draggedEntry || disabledCharacters.includes(draggedEntry.id) || isEntryIncompatible(draggedEntry.id)) {
      setActiveId(null);
      return;
    }

    // Handle dropping on fusion slots
    if (over.id === "slot1" || over.id === "slot2") {
      const targetSlot = over.id as "slot1" | "slot2";
      const otherSlot = targetSlot === "slot1" ? "slot2" : "slot1";

      // Don't allow same entry in both slots
      if (selectedEntries[otherSlot]?.id === draggedEntry.id) {
        setActiveId(null);
        return;
      }

      setSelectedEntries(prev => ({
        ...prev,
        [targetSlot]: draggedEntry
      }));
    }
    
    setActiveId(null);
  };

  const clearSlot = (slot: "slot1" | "slot2") => {
    setSelectedEntries(prev => ({
      ...prev,
      [slot]: null
    }));
  };

  const handleEntryClick = (entry: WikiEntry) => {
    // Don't allow interaction with disabled or incompatible characters
    if (disabledCharacters.includes(entry.id) || isEntryIncompatible(entry.id)) {
      return;
    }
    
    // Check if entry is already in a slot
    const isInSlot1 = selectedEntries.slot1?.id === entry.id;
    const isInSlot2 = selectedEntries.slot2?.id === entry.id;
    
    if (isInSlot1) {
      // Remove from slot1
      clearSlot("slot1");
    } else if (isInSlot2) {
      // Remove from slot2
      clearSlot("slot2");
    } else {
      // Add to first available slot
      if (!selectedEntries.slot1) {
        setSelectedEntries(prev => ({ ...prev, slot1: entry }));
      } else if (!selectedEntries.slot2) {
        setSelectedEntries(prev => ({ ...prev, slot2: entry }));
      }
      // If both slots are full, do nothing
    }
  };

  const isEntrySelected = (entryId: string) => {
    return selectedEntries.slot1?.id === entryId || selectedEntries.slot2?.id === entryId;
  };

  // Check if an entry is incompatible 
  const isEntryIncompatible = (entryId: string) => {
    // If this entry is already selected, it's not incompatible
    if (isEntrySelected(entryId)) {
      return false;
    }
    
    // If no slots are filled, check if this character has any fusion combinations
    if (!selectedEntries.slot1 && !selectedEntries.slot2) {
      // Only allow characters that have fusion combinations
      const hasValidFusions = fusionEntries.some(f => 
        f.entries.includes(entryId as any)
      );
      return !hasValidFusions;
    }
    
    // If one slot is filled, check if this character can fuse with the selected one
    const selectedId = selectedEntries.slot1?.id || selectedEntries.slot2?.id;
    if (selectedId) {
      const canFuse = fusionEntries.some(f => 
        (f.entries[0] === entryId && f.entries[1] === selectedId) ||
        (f.entries[0] === selectedId && f.entries[1] === entryId)
      );
      return !canFuse;
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
              <Link to="/comparison" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Comparison
              </Link>
            </Button>
          </div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <GitCompare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Character Fusion
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select two characters and learn about a (non-canon) fusion between the two! 
            Fusion creates entirely new beings, born with personalities and traits of the two candidates you choose!
          </p>
        </div>

        <DndContext 
          sensors={sensors}
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd}
        >
          {/* Available Entries - Hide when both slots are filled */}
          {(!selectedEntries.slot1 || !selectedEntries.slot2) && (
            <Card className="border-2 border-primary/20 shadow-xl bg-card/95 backdrop-blur-sm animate-slide-up">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  Available Characters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {sortedGroups.map(([subcategory, entries], groupIndex) => (
                    <div key={subcategory} className="animate-fade-in" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                      {/* Enhanced category divider */}
                      <div className="relative mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <h3 className="text-lg font-bold text-primary">
                              {getSubcategoryLabel("character", subcategory)}
                            </h3>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                        </div>
                        
                        {/* Category count badge */}
                        <div className="flex justify-center mb-4">
                          <div className="px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-sm text-muted-foreground">
                            {entries.length} {entries.length === 1 ? 'character' : 'characters'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {entries.map((entry, index) => (
                          <div 
                            key={entry.id} 
                            className="animate-slide-up" 
                            style={{ animationDelay: `${(groupIndex * 100) + (index * 50)}ms` }}
                          >
                            <DraggableEntryCard 
                              entry={entry} 
                              isDragging={activeId === entry.id}
                              isSelected={isEntrySelected(entry.id)}
                              isDisabled={disabledCharacters.includes(entry.id) || isEntryIncompatible(entry.id)}
                              onEntryClick={handleEntryClick}
                              slotNumber={
                                selectedEntries.slot1?.id === entry.id ? 1 :
                                selectedEntries.slot2?.id === entry.id ? 2 :
                                null
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fusion Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <FusionSlot 
                id="slot1" 
                title="Fusion Candidate 1" 
                entry={selectedEntries.slot1} 
                onClear={() => clearSlot("slot1")}
                hideClearButton={!!(selectedEntries.slot1 && selectedEntries.slot2)}
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <FusionSlot 
                id="slot2" 
                title="Fusion Candidate 2" 
                entry={selectedEntries.slot2} 
                onClear={() => clearSlot("slot2")}
                hideClearButton={!!(selectedEntries.slot1 && selectedEntries.slot2)}
              />
            </div>
          </div>

          {/* Try Another Fusion Button */}
          {selectedEntries.slot1 && selectedEntries.slot2 && (
            <div className="flex justify-center animate-fade-in">
              <Button 
                onClick={() => {
                  setSelectedEntries({
                    slot1: null,
                    slot2: null
                  });
                }}
                variant="outline" 
                size="lg" 
                className="gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
              >
                <GitCompare className="h-5 w-5" />
                Try Another Fusion
              </Button>
            </div>
          )}

          {/* Fusion Divider */}
          {selectedEntries.slot1 && selectedEntries.slot2 && (
            <div className="flex items-center justify-center animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-32"></div>
                <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                  <GitCompare className="h-6 w-6 text-primary" />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-32"></div>
              </div>
            </div>
          )}

          {/* Fusion Results */}
          {selectedEntries.slot1 && selectedEntries.slot2 && (
            <div className="animate-slide-up">
              <FusionResults 
                entry1={selectedEntries.slot1} 
                entry2={selectedEntries.slot2} 
              />
            </div>
          )}

          {/* Comparison System Link */}
          <div className="text-center py-8 animate-fade-in">
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-2">
                    <Sword className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Want to compare characters instead?</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Compare two characters' stats and abilities to see who would win in a battle!
                  </p>
                  <Button asChild size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 shadow-lg">
                    <Link to="/comparison">
                      <Sword className="h-5 w-5" />
                      Try Character Comparison
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeEntry && (
              <div className="transform rotate-3 scale-105 shadow-2xl">
                <DraggableEntryCard entry={activeEntry} isDragging={true} isOverlay={true} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}