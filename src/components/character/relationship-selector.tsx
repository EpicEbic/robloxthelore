import { useState } from "react";
import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { X, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Character icon mapping - circular character icons
const characterIcons: Record<string, string> = {
  "caesar-bloxwright": "/lovable-uploads/character-icons/caesar-bloxwright-icon.png",
  "nauli-parter": "/lovable-uploads/character-icons/nauli-parter-icon.png",
  "vortex-a-steele": "/lovable-uploads/character-icons/vortex-a-steele-icon.png",
  "rice-farmer": "/lovable-uploads/character-icons/rice-farmer-icon.png",
  "ren-bytera": "/lovable-uploads/character-icons/ren-bytera-icon.png",
  "bryck-manning": "/lovable-uploads/character-icons/bryck-manning-icon.png",
  "spawnboy": "/lovable-uploads/character-icons/spawnboy-icon.png",
  "builderman": "/lovable-uploads/character-icons/builderman-icon.png",
  "bloxxanne-whelder": "/lovable-uploads/character-icons/bloxxanne-whelder-icon.png",
  "charles-studson": "/lovable-uploads/character-icons/charles-studson-icon.png",
  "the-reckoner": "/lovable-uploads/character-icons/the-reckoner-icon.png",
  "the-breadwinner": "/lovable-uploads/character-icons/the-breadwinner-icon.png",
};

const getCharacterIcon = (characterId: string): string => {
  return characterIcons[characterId] || "/placeholder.svg";
};

interface RelationshipSelectorProps {
  currentCharacter: WikiEntry;
  availableCharacterIds: string[];
  onSelectCharacter: (character: WikiEntry | null) => void;
  selectedCharacter: WikiEntry | null;
  allCharacters: WikiEntry[];
}

export function RelationshipSelector({
  currentCharacter,
  availableCharacterIds,
  onSelectCharacter,
  selectedCharacter,
  allCharacters
}: RelationshipSelectorProps) {
  const [isSelectingCharacter, setIsSelectingCharacter] = useState(false);

  // Filter to only show characters that have relationship data
  const availableCharacters = allCharacters.filter(c => 
    availableCharacterIds.includes(c.id) && c.id !== currentCharacter.id
  );

  const handleCharacterClick = (character: WikiEntry) => {
    onSelectCharacter(character);
    setIsSelectingCharacter(false);
  };

  const handleClear = () => {
    onSelectCharacter(null);
    setIsSelectingCharacter(false);
  };

  return (
    <div className="space-y-4">
      {/* Character Selection Area */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-4">
          {/* Current Character */}
          <Card className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
            <CardContent className="p-0 h-full">
              <OptimizedImage 
                src={getCharacterIcon(currentCharacter.id)} 
                alt={currentCharacter.title}
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>

          {/* VS Indicator */}
          <div className="flex items-center justify-center">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Selected Character or Empty Slot */}
          <div className="relative">
            <button
              onClick={() => setIsSelectingCharacter(true)}
              className={cn(
                "w-32 h-32 rounded-full overflow-hidden border-2 transition-all hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selectedCharacter ? "border-primary" : "border-dashed border-muted-foreground/50"
              )}
            >
              {selectedCharacter ? (
                <OptimizedImage 
                  src={getCharacterIcon(selectedCharacter.id)} 
                  alt={selectedCharacter.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-2">
                  <Users className="h-8 w-8 text-muted-foreground/50 mb-1" />
                  <p className="text-xs text-muted-foreground">Select Character</p>
                </div>
              )}
            </button>
            {selectedCharacter && (
              <button
                className="relationship-clear-button absolute -top-3 -right-3 h-8 w-8 rounded-full z-20 shadow-lg bg-red-600 hover:bg-red-700 flex items-center justify-center"
                style={{ backgroundColor: '#dc2626' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ stroke: '#ffffff !important', color: '#ffffff !important' }}
                >
                  <path d="M18 6 6 18" style={{ stroke: '#ffffff' }} />
                  <path d="m6 6 12 12" style={{ stroke: '#ffffff' }} />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Character Selection Grid */}
      {isSelectingCharacter && (
        <Card className="p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Select a Character</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSelectingCharacter(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {availableCharacters.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableCharacters.map(character => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterClick(character)}
                  className="group relative aspect-square rounded-full overflow-hidden border-2 border-muted hover:border-primary transition-all hover:scale-105"
                  title={character.title}
                >
                  <OptimizedImage 
                    src={getCharacterIcon(character.id)} 
                    alt={character.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                    <p className="text-xs text-white font-medium truncate w-full text-center">
                      {character.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No relationship data available for this character.</p>
              <p className="text-sm mt-2">Add relationshipsData to see character relationships.</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
