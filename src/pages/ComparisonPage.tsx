import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { WikiEntry } from "@/types/wiki-types";
import { sampleWikiEntries } from "@/data/sample-wiki-entries";
import { DraggableEntryCard } from "@/components/comparison/draggable-entry-card";
import { ComparisonSlot } from "@/components/comparison/comparison-slot";
import { ComparisonResults } from "@/components/comparison/comparison-results";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSubcategoryLabel } from "@/data/categories";
import { Link } from "react-router-dom";
import { GitCompare } from "lucide-react";
import { DualThemeProvider, useDualTheme } from "@/contexts/dual-theme-context";
import { DualCharacterParticles } from "@/components/effects/dual-character-particles-v2";
import { getCharacterTheme } from "@/data/character-themes";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { isEntryDisabled } from "@/utils/disabled-entries";
function ComparisonPageContent() {
  const { applyDualTheme, resetDualTheme } = useDualTheme();
  const { isEntryUnlocked, enabledEntries } = useEasterEgg();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<{
    slot1: WikiEntry | null;
    slot2: WikiEntry | null;
  }>({
    slot1: null,
    slot2: null
  });
  const [selectedCombatStyles, setSelectedCombatStyles] = useState<{
    slot1: string | null;
    slot2: string | null;
  }>({
    slot1: null,
    slot2: null
  });

  // Filter for only characters and group by subcategory
  const comparableEntries = sampleWikiEntries.filter(entry => entry.category === "character");

  // Group characters by subcategory
  const groupedEntries = comparableEntries.reduce((groups, entry) => {
    const subcategory = entry.subcategory || 'other';
    if (!groups[subcategory]) {
      groups[subcategory] = [];
    }
    groups[subcategory].push(entry);
    return groups;
  }, {} as Record<string, typeof comparableEntries>);

  // Sort groups by a logical order (protagonists first, then deuteragonists, etc.)
  const subcategoryOrder = ['protagonist', 'neutral', 'evil', 'minor-antagonist', 'major-antagonist', 'noncanon', 'other'];
  const sortedGroups = Object.entries(groupedEntries).sort(([a], [b]) => {
    const indexA = subcategoryOrder.indexOf(a);
    const indexB = subcategoryOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
  const activeEntry = activeId ? comparableEntries.find(entry => entry.id === activeId) : null;
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      delay: 500,
      tolerance: 5
    }
  }));
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const {
      active,
      over
    } = event;
    if (!over) {
      setActiveId(null);
      return;
    }
    const draggedEntry = comparableEntries.find(entry => entry.id === active.id);
    if (!draggedEntry || !isEntryUnlocked(draggedEntry.id)) {
      setActiveId(null);
      return;
    }

    // Handle dropping on comparison slots
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

      // Set default combat style for the new entry
      if (draggedEntry.category === "character" && draggedEntry.combatStyles && draggedEntry.combatStyles.length > 0) {
        setSelectedCombatStyles(prev => ({
          ...prev,
          [targetSlot]: draggedEntry.combatStyles[0].id
        }));
      }
    }
    setActiveId(null);
  };
  const clearSlot = (slot: "slot1" | "slot2") => {
    setSelectedEntries(prev => ({
      ...prev,
      [slot]: null
    }));
    setSelectedCombatStyles(prev => ({
      ...prev,
      [slot]: null
    }));
  };
  const handleEntryClick = (entry: WikiEntry) => {
    // Don't allow interaction with locked characters
    if (!isEntryUnlocked(entry.id)) {
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
        setSelectedEntries(prev => ({
          ...prev,
          slot1: entry
        }));
        // Set default combat style
        if (entry.category === "character" && entry.combatStyles && entry.combatStyles.length > 0) {
          setSelectedCombatStyles(prev => ({
            ...prev,
            slot1: entry.combatStyles[0].id
          }));
        }
      } else if (!selectedEntries.slot2) {
        setSelectedEntries(prev => ({
          ...prev,
          slot2: entry
        }));
        // Set default combat style
        if (entry.category === "character" && entry.combatStyles && entry.combatStyles.length > 0) {
          setSelectedCombatStyles(prev => ({
            ...prev,
            slot2: entry.combatStyles[0].id
          }));
        }
      }
      // If both slots are full, do nothing
    }
  };
  const isEntrySelected = (entryId: string) => {
    return selectedEntries.slot1?.id === entryId || selectedEntries.slot2?.id === entryId;
  };
  const handleCombatStyleChange = (slot: "slot1" | "slot2", styleId: string) => {
    setSelectedCombatStyles(prev => ({
      ...prev,
      [slot]: styleId
    }));
  };

  const handleTryAnotherMatchup = () => {
    setSelectedEntries({
      slot1: null,
      slot2: null
    });
    setSelectedCombatStyles({
      slot1: null,
      slot2: null
    });
  };

  // Apply dual theme when both characters are selected
  useEffect(() => {
    if (selectedEntries.slot1 && selectedEntries.slot2) {
      const leftTheme = getCharacterTheme(selectedEntries.slot1.id);
      const rightTheme = getCharacterTheme(selectedEntries.slot2.id);
      applyDualTheme(leftTheme, rightTheme);
    } else if (selectedEntries.slot1) {
      const leftTheme = getCharacterTheme(selectedEntries.slot1.id);
      applyDualTheme(leftTheme, null);
    } else if (selectedEntries.slot2) {
      const rightTheme = getCharacterTheme(selectedEntries.slot2.id);
      applyDualTheme(null, rightTheme);
    } else {
      resetDualTheme();
    }
  }, [selectedEntries, applyDualTheme, resetDualTheme]);
  return (
    <div className="min-h-screen relative">
      {/* Dual Character Particles */}
      {selectedEntries.slot1 && selectedEntries.slot2 && (
        <DualCharacterParticles 
          leftTheme={getCharacterTheme(selectedEntries.slot1.id)} 
          rightTheme={getCharacterTheme(selectedEntries.slot2.id)} 
        />
      )}
      
      <div className="container mx-auto p-6 space-y-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <GitCompare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Entry Comparison
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Place any two characters in the slots below, and have their stats and abilities compared automatically! 
            It'll also give you a rundown on who's most likely to win.
          </p>
        </div>

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* Available Entries - Only show when both characters are not selected */}
          {!(selectedEntries.slot1 && selectedEntries.slot2) && (
            <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                Available Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sortedGroups.map(([subcategory, entries], groupIndex) => (
                  <div key={subcategory} className="animate-fade-in" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                    {/* Compact category divider */}
                    <div className="relative mb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                          <h3 className="text-sm font-bold text-primary">
                            {getSubcategoryLabel("character", subcategory)}
                          </h3>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-0">
                            {entries.length}
                          </Badge>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
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
                            isDisabled={!isEntryUnlocked(entry.id) || isEntryDisabled(entry.id, enabledEntries)} 
                            onEntryClick={handleEntryClick} 
                            slotNumber={selectedEntries.slot1?.id === entry.id ? 1 : selectedEntries.slot2?.id === entry.id ? 2 : null} 
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

          {/* Comparison Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div 
              className={`animate-slide-up dual-theme-left ${
                selectedEntries.slot1 ? `character-theme-${selectedEntries.slot1.id}-left` : ''
              }`} 
              style={{ animationDelay: '200ms' }}
            >
              <ComparisonSlot 
                id="slot1" 
                title="Contender 1" 
                entry={selectedEntries.slot1} 
                selectedCombatStyle={selectedCombatStyles.slot1} 
                onClear={() => clearSlot("slot1")} 
                onCombatStyleChange={styleId => handleCombatStyleChange("slot1", styleId)} 
                hideClearButton={!!(selectedEntries.slot1 && selectedEntries.slot2)}
                slotSide="left"
              />
            </div>
            <div 
              className={`animate-slide-up dual-theme-right ${
                selectedEntries.slot2 ? `character-theme-${selectedEntries.slot2.id}-right` : ''
              }`} 
              style={{ animationDelay: '300ms' }}
            >
              <ComparisonSlot 
                id="slot2" 
                title="Contender 2" 
                entry={selectedEntries.slot2} 
                selectedCombatStyle={selectedCombatStyles.slot2} 
                onClear={() => clearSlot("slot2")} 
                onCombatStyleChange={styleId => handleCombatStyleChange("slot2", styleId)} 
                hideClearButton={!!(selectedEntries.slot1 && selectedEntries.slot2)}
                slotSide="right"
              />
            </div>
          </div>

          {/* Try Another Matchup Button */}
          {selectedEntries.slot1 && selectedEntries.slot2 && (
            <div className="flex justify-center animate-fade-in">
              <Button 
                onClick={handleTryAnotherMatchup}
                variant="outline" 
                size="lg" 
                className="gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
              >
                <GitCompare className="h-5 w-5" />
                Try Another Matchup
              </Button>
            </div>
          )}

          {/* VS Divider */}
          {selectedEntries.slot1 && selectedEntries.slot2 && (
            <div className="flex items-center justify-center animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-32"></div>
                <div className="w-16 h-16 rounded-full vs-divider flex items-center justify-center">
                  <span className="text-2xl font-bold text-white" style={{ textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000' }}>VS</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-32"></div>
              </div>
            </div>
          )}

          {/* Comparison Results */}
          {selectedEntries.slot1 && selectedEntries.slot2 && (
            <div className="animate-slide-up comparison-results">
              <ComparisonResults 
                entry1={selectedEntries.slot1} 
                entry2={selectedEntries.slot2} 
                combatStyle1={selectedCombatStyles.slot1} 
                combatStyle2={selectedCombatStyles.slot2} 
              />
            </div>
          )}


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

export function ComparisonPage() {
  return (
    <DualThemeProvider>
      <ComparisonPageContent />
    </DualThemeProvider>
  );
}
