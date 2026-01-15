import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Ruler, X, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWiki } from "@/contexts/wiki-context";
import { WikiEntry } from "@/types/wiki-types";

// Character icon mapping - circular character icons (same as archetype system)
const characterIcons: Record<string, string> = {
  "caesar-bloxwright": "/images/character-icons/caesar-bloxwright-icon.png",
  "nauli-parter": "/images/character-icons/nauli-parter-icon.png",
  "vortex-a-steele": "/images/character-icons/vortex-a-steele-icon.png",
  "rice-farmer": "/images/character-icons/rice-farmer-icon.png",
  "ren-bytera": "/images/character-icons/ren-bytera-icon.png",
  "bryck-manning": "/images/character-icons/bryck-manning-icon.png",
  "spawnboy": "/images/character-icons/spawnboy-icon.png",
  "builderman": "/images/character-icons/builderman-icon.png",
  "bloxxanne-whelder": "/images/character-icons/bloxxanne-whelder-icon.png",
  "charles-studson": "/images/character-icons/charles-studson-icon.png",
  "the-reckoner": "/images/character-icons/the-reckoner-icon.png",
  "the-breadwinner": "/images/character-icons/the-breadwinner-icon.png",
  "the-bounceman": "/images/character-icons/bounceman-icon.png",
};

const getCharacterIcon = (characterId: string): string | null => {
  return characterIcons[characterId] || null;
};

// Height data for characters (in studs - Roblox measurement unit)
const CHARACTER_HEIGHTS: Record<string, number> = {
  "caesar-bloxwright": 8, // Towering giant
  "nauli-parter": 6, // Average height
  "vortex-a-steele": 5, // Average height
  "ren-bytera": 4.5, // Short
  "rice-farmer": 5, // Slightly above average
  "bryck-manning": 6.25, // Tall
  "the-breadwinner": 5, // Very short (spongy body)
  "the-reckoner": 4, // Very tall
  "the-bounceman": 1.75, // Average
  "bloxxanne-whelder": 5.5, // Average
  "charles-studson": 5.5, // Slightly above average
  "spawnboy": 5, // Average
  "builderman": 5, // Average height (Noob)
};

// Conversion constants
const STUD_TO_CM = 28; // 1 stud = 28cm
const CM_TO_INCH = 0.393701; // 1cm = 0.393701 inches

const formatHeight = (studs: number) => {
  const cm = studs * STUD_TO_CM;
  const inches = cm * CM_TO_INCH;
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round((inches % 12) * 10) / 10;

  return {
    studs: Math.round(studs * 10) / 10,
    cm: Math.round(cm * 10) / 10,
    feetInches: `${feet}'${remainingInches}"`
  };
};

const MAX_HEIGHT = 16; // Maximum height on the grid (in studs)
const GRID_HEIGHT = 400; // Height of the measurement grid in pixels

export default function HeightComparisonPage() {
  const { getAllEntries } = useWiki();
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  // Get character entries with height data (from all parts)
  const availableCharacters = useMemo(() => {
    // Define part priority order (Part 1 before TEMP)
    const partOrder = {
      "Part 1": 1,
      "TEMP": 2
    };

    // Define subcategory priority order
    const subcategoryOrder = {
      "protagonist": 1,
      "neutral": 2, // deuteragonists
      "evil": 3, // neutralists
      "minor-antagonist": 4,
      "major-antagonist": 5,
      "noncanon": 6
    };

    return getAllEntries()
      .filter(entry =>
        entry.category === "character" &&
        CHARACTER_HEIGHTS[entry.id]
      )
      .map(entry => ({
        ...entry,
        height: CHARACTER_HEIGHTS[entry.id]
      }))
      .sort((a, b) => {
        // First sort by subcategory/role
        const aSubOrder = subcategoryOrder[a.subcategory as keyof typeof subcategoryOrder] || 99;
        const bSubOrder = subcategoryOrder[b.subcategory as keyof typeof subcategoryOrder] || 99;

        if (aSubOrder !== bSubOrder) {
          return aSubOrder - bSubOrder; // Lower number = higher priority
        }

        // Then sort by part within each role (Part 1 before TEMP)
        const aPart = a.part || "TEMP";
        const bPart = b.part || "TEMP";
        const aPartOrder = partOrder[aPart as keyof typeof partOrder] || 99;
        const bPartOrder = partOrder[bPart as keyof typeof partOrder] || 99;

        if (aPartOrder !== bPartOrder) {
          return aPartOrder - bPartOrder; // Lower number = higher priority
        }

        // Finally sort by height descending within the same role and part
        return b.height - a.height;
      });
  }, [getAllEntries]);

  const addCharacter = (characterId: string) => {
    if (selectedCharacters.length < 4 && !selectedCharacters.includes(characterId)) {
      setSelectedCharacters([...selectedCharacters, characterId]);
    }
  };

  const removeCharacter = (characterId: string) => {
    setSelectedCharacters(selectedCharacters.filter(id => id !== characterId));
  };

  const clearAll = () => {
    setSelectedCharacters([]);
  };

  const getCharacterById = (id: string) => {
    return availableCharacters.find(char => char.id === id);
  };

  const getHeightPercentage = (height: number) => {
    return (height / MAX_HEIGHT) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Ruler className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Height Comparison
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Compare the heights of up to 4 characters using a stud-based measurement grid. All measurements are in Roblox studs.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Character Selection */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow-xl border-2 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Select Characters</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose up to 4 characters to compare heights. Click on character icons to add them to the comparison.
              </p>
            </CardHeader>
            <CardContent>
              {/* Selected Characters */}
              {selectedCharacters.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm">Selected ({selectedCharacters.length}/4)</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAll}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCharacters.map((charId) => {
                      const character = getCharacterById(charId);
                      if (!character) return null;

                      const iconUrl = getCharacterIcon(charId);
                      const heightInfo = formatHeight(character.height);

                      return (
                        <div
                          key={charId}
                          className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border"
                        >
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={character.title}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Users className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium leading-tight break-words line-clamp-2 hyphens-auto">{character.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{heightInfo.studs} studs</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCharacter(charId)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <Separator className="mb-4" />

              {/* Available Characters */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                <h4 className="font-semibold text-sm mb-3">Available Characters</h4>
                <div className="grid grid-cols-3 gap-3">
                  {availableCharacters.map((character) => {
                    const isSelected = selectedCharacters.includes(character.id);
                    const isDisabled = selectedCharacters.length >= 4 && !isSelected;
                    const iconUrl = getCharacterIcon(character.id);
                    const heightInfo = formatHeight(character.height);

                    return (
                      <button
                        key={character.id}
                        onClick={() => addCharacter(character.id)}
                        disabled={isDisabled || isSelected}
                        className={cn(
                          "group relative p-4 rounded-xl border transition-all duration-200 min-h-[140px]",
                          "hover:bg-accent/50 disabled:opacity-50 disabled:cursor-not-allowed",
                          isSelected ? "bg-primary/20 border-primary" : "bg-muted/20"
                        )}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={character.title}
                              className="w-14 h-14 rounded-full object-cover border-2 border-background"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                              <Users className="w-7 h-7 text-muted-foreground" />
                            </div>
                          )}
                          <div className="text-center w-full px-1">
                            <p className="text-[12px] font-medium leading-tight break-words line-clamp-2 hyphens-auto min-h-[2.5rem] flex items-center justify-center">{character.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{heightInfo.studs} studs</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Badge variant="secondary" className="text-xs">
                              Selected
                            </Badge>
                          </div>
                        )}

                        {isDisabled && !isSelected && (
                          <div className="absolute inset-0 bg-muted/80 rounded-xl flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Max 4</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Height Comparison Grid */}
        <div className="lg:col-span-3">
          <Card className="rounded-2xl shadow-xl border-2 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Height Comparison Grid</CardTitle>
              <p className="text-sm text-muted-foreground">
                Characters are displayed on a stud-based measurement grid. Each unit represents 1 stud (Roblox's measurement system).
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Individual Character Height Comparisons */}
                {selectedCharacters.length === 0 ? (
                  <div className="text-center py-12">
                    <Ruler className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-lg text-muted-foreground">
                      Select characters to see their heights compared
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {selectedCharacters.map((charId) => {
                      const character = getCharacterById(charId);
                      if (!character) return null;

                      const iconUrl = getCharacterIcon(charId);
                      const heightInfo = formatHeight(character.height);

                      // Calculate the image height based on stud measurements
                      // Assuming a base height of 6 studs (average) = 200px for visibility
                      const baseHeight = 6;
                      const basePixelHeight = 200;
                      const scaleFactor = character.height / baseHeight;
                      const imageHeight = Math.max(120, Math.min(300, basePixelHeight * scaleFactor));

                      return (
                        <div key={charId} className="flex flex-col items-center space-y-4">
                          {/* Character Image with Measuring Line */}
                          <div className="relative flex flex-col items-center">
                            {/* Top measurement line */}
                            <div className="flex items-center w-full mb-2">
                              <div className="flex-1 h-px bg-border" />
                              <span className="px-2 text-xs text-muted-foreground font-mono">
                                {heightInfo.feetInches}
                              </span>
                              <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* Character Image */}
                            <div className="relative">
                              {iconUrl ? (
                                <img
                                  src={iconUrl}
                                  alt={character.title}
                                  className="rounded-full border-4 border-background shadow-lg"
                                  style={{
                                    width: `${imageHeight * 0.6}px`,
                                    height: `${imageHeight}px`,
                                    objectFit: 'cover'
                                  }}
                                />
                              ) : (
                                <div
                                  className="rounded-full bg-muted border-4 border-background shadow-lg flex items-center justify-center"
                                  style={{
                                    width: `${imageHeight * 0.6}px`,
                                    height: `${imageHeight}px`,
                                  }}
                                >
                                  <Users className="w-8 h-8 text-muted-foreground" />
                                </div>
                              )}

                              {/* Side measuring line */}
                              <div className="absolute -right-8 top-0 flex flex-col items-center">
                                <div
                                  className="w-px bg-primary"
                                  style={{ height: `${imageHeight}px` }}
                                />
                                <div className="mt-1 text-xs text-primary font-mono">
                                  {heightInfo.studs}"
                                </div>
                              </div>
                            </div>

                            {/* Bottom measurement line */}
                            <div className="flex items-center w-full mt-2">
                              <div className="flex-1 h-px bg-border" />
                              <span className="px-2 text-xs text-muted-foreground font-mono">
                                {heightInfo.cm}cm
                              </span>
                              <div className="flex-1 h-px bg-border" />
                            </div>
                          </div>

                          {/* Character Info */}
                          <div className="text-center">
                            <h4 className="font-semibold text-sm">{character.title}</h4>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>{heightInfo.studs} studs</div>
                              <div>{heightInfo.cm} cm</div>
                              <div>{heightInfo.feetInches}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Legend */}
                {selectedCharacters.length > 0 && (
                  <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Measurement Guide</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• 1 stud = 28 centimeters</div>
                      <div>• Images are scaled to show relative heights</div>
                      <div>• Measurements shown in studs, centimeters, and feet/inches</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
