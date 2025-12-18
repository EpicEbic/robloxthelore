import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PreviewBracketProps {
  selectedCharacters: WikiEntry[];
  onCharacterRemove: (characterId: string) => void;
}

type RoundDefinition = {
  name: string;
  matchCount: number;
};

function Slot({
  character,
  slotIndex,
  isOver,
  onRemove,
}: {
  character: WikiEntry | null;
  slotIndex: number;
  isOver: boolean;
  onRemove: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 text-xs rounded-md border transition-all bg-card",
        isOver && "border-primary ring-2 ring-primary/20 bg-primary/5",
        character ? "border-primary/30" : "border-dashed border-muted/40"
      )}
    >
      {character ? (
        <>
          <div className="w-7 h-7 rounded-full overflow-hidden border border-border/50 flex-shrink-0">
            <OptimizedImage
              src={`/images/character-icons/${character.id}-icon.png`}
              alt={character.title}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="truncate flex-1 font-medium text-xs">{character.title}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 opacity-60 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </>
      ) : (
        <span className="text-muted-foreground">Slot {slotIndex + 1}</span>
      )}
    </div>
  );
}

function PreviewMatch({
  character1,
  character2,
  slotIndex1,
  slotIndex2,
  onRemove,
}: {
  character1: WikiEntry | null;
  character2: WikiEntry | null;
  slotIndex1: number;
  slotIndex2: number;
  onRemove: (id: string) => void;
}) {
  const { setNodeRef: setRef1, isOver: isOver1 } = useDroppable({ id: `bracket-slot-${slotIndex1}` });
  const { setNodeRef: setRef2, isOver: isOver2 } = useDroppable({ id: `bracket-slot-${slotIndex2}` });

  return (
    <div className="w-[200px] border-2 border-muted/40 rounded-lg overflow-hidden bg-card/80 shadow-sm">
      <div className="flex flex-col">
        <div ref={setRef1} className="border-b border-border/30">
          <Slot
            character={character1}
            slotIndex={slotIndex1}
            isOver={isOver1}
            onRemove={() => character1 && onRemove(character1.id)}
          />
        </div>
        <div ref={setRef2}>
          <Slot
            character={character2}
            slotIndex={slotIndex2}
            isOver={isOver2}
            onRemove={() => character2 && onRemove(character2.id)}
          />
        </div>
      </div>
    </div>
  );
}

export function PreviewBracket({ selectedCharacters, onCharacterRemove }: PreviewBracketProps) {
  const getRounds = (): RoundDefinition[] => {
    const count = selectedCharacters.length;
    if (count >= 16) return [{ name: "Round of 16", matchCount: 8 }, { name: "Quarterfinals", matchCount: 4 }];
    if (count >= 8) return [{ name: "Quarterfinals", matchCount: 4 }, { name: "Semifinals", matchCount: 2 }];
    if (count >= 4) return [{ name: "Semifinals", matchCount: 2 }, { name: "Finals", matchCount: 1 }];
    return [{ name: "Preview", matchCount: Math.max(1, Math.ceil(count / 2)) }];
  };

  const rounds = getRounds();

  const MATCH_WIDTH = 200;
  const MATCH_HEIGHT = 64 * 2 + 2; // two slots + border
  const MATCH_SPACING = 20;
  const CONNECTOR = 40;
  const ROUND_GAP = 80;

  // Pre-compute total height based on first round
  const firstRoundMatches = rounds[0].matchCount;
  const totalHeight = firstRoundMatches * MATCH_HEIGHT + (firstRoundMatches - 1) * MATCH_SPACING;
  const totalWidth = rounds.length * MATCH_WIDTH + (rounds.length - 1) * (CONNECTOR + ROUND_GAP);

  // Build match data for first round from selected characters
  const matches: { c1: WikiEntry | null; c2: WikiEntry | null }[] = [];
  for (let i = 0; i < rounds[0].matchCount; i++) {
    const idx = i * 2;
    matches.push({
      c1: selectedCharacters[idx] || null,
      c2: selectedCharacters[idx + 1] || null,
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="w-full border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold">Tournament Preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Shows the initial matchups as they will appear in the bracket.
          </p>
          <Badge variant="outline" className="mt-2 px-3 py-1">
            {selectedCharacters.length} selected
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-x-auto">
            <div
              className="relative mx-auto"
              style={{
                width: totalWidth,
                height: totalHeight + 80,
                minWidth: "100%",
              }}
            >
              {/* Rounds and matches */}
              {rounds.map((round, roundIndex) => {
                const x = roundIndex * (MATCH_WIDTH + CONNECTOR + ROUND_GAP);
                const roundMatchCount = roundIndex === 0 ? matches.length : Math.max(1, Math.ceil(matches.length / Math.pow(2, roundIndex)));
                const roundHeight = roundMatchCount * MATCH_HEIGHT + (roundMatchCount - 1) * MATCH_SPACING;
                const roundTop = (totalHeight - roundHeight) / 2 + 40;

                return (
                  <div key={round.name}>
                    <div
                      className="absolute flex justify-center"
                      style={{
                        left: x,
                        top: 0,
                        width: MATCH_WIDTH,
                      }}
                    >
                      <Badge variant="outline" className="text-sm px-4 py-1.5">
                        {round.name}
                      </Badge>
                    </div>

                    {/* Match boxes */}
                    {(roundIndex === 0 ? matches : Array.from({ length: roundMatchCount }).map(() => ({ c1: null, c2: null }))).map(
                      (m, idx) => (
                        <div
                          key={`${round.name}-${idx}`}
                          className="absolute"
                          style={{
                            left: x,
                            top: roundTop + idx * (MATCH_HEIGHT + MATCH_SPACING),
                            width: MATCH_WIDTH,
                            height: MATCH_HEIGHT,
                          }}
                        >
                          {roundIndex === 0 ? (
                            <PreviewMatch
                              character1={m.c1}
                              character2={m.c2}
                              slotIndex1={idx * 2}
                              slotIndex2={idx * 2 + 1}
                              onRemove={onCharacterRemove}
                            />
                          ) : (
                            <div className="w-[200px] h-full border-2 border-dashed border-muted/40 rounded-lg bg-card/60 flex items-center justify-center text-xs text-muted-foreground">
                              TBD
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                );
              })}

              {/* Connectors from first to next round */}
              {rounds.length > 1 && (
                <svg className="absolute top-0 left-0 pointer-events-none opacity-40" width={totalWidth} height={totalHeight + 80}>
                  {matches.map((_, idx) => {
                    const roundTop = (totalHeight - (matches.length * MATCH_HEIGHT + (matches.length - 1) * MATCH_SPACING)) / 2 + 40;
                    const currentY = roundTop + idx * (MATCH_HEIGHT + MATCH_SPACING) + MATCH_HEIGHT / 2;
                    const nextY = roundTop + Math.floor(idx / 2) * (MATCH_HEIGHT + MATCH_SPACING) + MATCH_HEIGHT / 2;

                    const startX = MATCH_WIDTH;
                    const connectorX = startX + CONNECTOR / 2;
                    const endX = startX + CONNECTOR + ROUND_GAP;

                    if (idx % 2 === 1) return null; // Only draw from first in pair

                    return (
                      <g key={`connector-${idx}`}>
                        <line x1={startX} y1={currentY} x2={connectorX} y2={currentY} stroke="#9CA3AF" strokeWidth={1.5} />
                        <line x1={startX} y1={currentY + MATCH_HEIGHT + MATCH_SPACING} x2={connectorX} y2={currentY + MATCH_HEIGHT + MATCH_SPACING} stroke="#9CA3AF" strokeWidth={1.5} />
                        <line
                          x1={connectorX}
                          y1={currentY}
                          x2={connectorX}
                          y2={currentY + MATCH_HEIGHT + MATCH_SPACING}
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                        />
                        <line
                          x1={connectorX}
                          y1={(currentY + currentY + MATCH_HEIGHT + MATCH_SPACING) / 2}
                          x2={endX}
                          y2={(currentY + currentY + MATCH_HEIGHT + MATCH_SPACING) / 2}
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                        />
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}