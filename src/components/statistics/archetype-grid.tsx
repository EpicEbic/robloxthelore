import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ARCHETYPES, ARCHETYPE_COLUMNS, ARCHETYPE_ROWS, Archetype } from "@/data/character-archetypes";
import { Users, X, Quote, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { allCharacters } from "@/data/characters";
import { usePart } from "@/contexts/part-context";

// Character icon mapping - circular character icons
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

// 2D Color mapping based on both column and row (matching the reference image)
// Each cell has a unique color blending column (Lawful→Chaotic) and row (Good→Evil)
export const CELL_COLORS: Record<string, Record<string, { bg: string; border: string; text: string }>> = {
  // Good row - bright, vibrant colors
  good: {
    lawful: { bg: "bg-cyan-900/40", border: "border-cyan-400", text: "text-cyan-400" },
    social: { bg: "bg-lime-900/40", border: "border-lime-400", text: "text-lime-400" },
    neutral: { bg: "bg-green-900/40", border: "border-green-400", text: "text-green-400" },
    rebel: { bg: "bg-yellow-900/40", border: "border-yellow-400", text: "text-yellow-400" },
    chaotic: { bg: "bg-orange-900/40", border: "border-orange-400", text: "text-orange-400" },
  },
  // Moral row - slightly cooler tones
  moral: {
    lawful: { bg: "bg-teal-900/40", border: "border-teal-400", text: "text-teal-400" },
    social: { bg: "bg-emerald-900/40", border: "border-emerald-400", text: "text-emerald-400" },
    neutral: { bg: "bg-green-900/40", border: "border-green-500", text: "text-green-500" },
    rebel: { bg: "bg-lime-900/40", border: "border-lime-500", text: "text-lime-500" },
    chaotic: { bg: "bg-yellow-900/40", border: "border-yellow-500", text: "text-yellow-500" },
  },
  // Neutral row - gray/muted tones
  neutral: {
    lawful: { bg: "bg-slate-800/40", border: "border-slate-400", text: "text-slate-400" },
    social: { bg: "bg-gray-800/40", border: "border-gray-400", text: "text-gray-400" },
    neutral: { bg: "bg-zinc-800/40", border: "border-zinc-300", text: "text-zinc-300" },
    rebel: { bg: "bg-stone-800/40", border: "border-stone-400", text: "text-stone-400" },
    chaotic: { bg: "bg-neutral-800/40", border: "border-neutral-400", text: "text-neutral-400" },
  },
  // Impure row - warmer, orange-tinted
  impure: {
    lawful: { bg: "bg-violet-900/40", border: "border-violet-400", text: "text-violet-400" },
    social: { bg: "bg-amber-900/40", border: "border-amber-500", text: "text-amber-500" },
    neutral: { bg: "bg-orange-900/40", border: "border-orange-500", text: "text-orange-500" },
    rebel: { bg: "bg-orange-900/40", border: "border-orange-400", text: "text-orange-400" },
    chaotic: { bg: "bg-red-900/40", border: "border-red-400", text: "text-red-400" },
  },
  // Evil row - dark, red-tinted
  evil: {
    lawful: { bg: "bg-fuchsia-900/40", border: "border-fuchsia-500", text: "text-fuchsia-500" },
    social: { bg: "bg-rose-900/40", border: "border-rose-500", text: "text-rose-500" },
    neutral: { bg: "bg-red-900/40", border: "border-red-500", text: "text-red-500" },
    rebel: { bg: "bg-red-900/40", border: "border-red-400", text: "text-red-400" },
    chaotic: { bg: "bg-red-950/40", border: "border-red-600", text: "text-red-600" },
  },
};

// Row label colors (left side labels)
const ROW_LABEL_COLORS: Record<string, string> = {
  good: "text-green-400",
  moral: "text-teal-400",
  neutral: "text-gray-400",
  impure: "text-orange-400",
  evil: "text-red-500",
};

// Column header colors
const COLUMN_LABEL_COLORS: Record<string, string> = {
  lawful: "text-cyan-400",
  social: "text-lime-400",
  neutral: "text-gray-300",
  rebel: "text-orange-400",
  chaotic: "text-red-400",
};

export function ArchetypeGrid() {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const { currentPart } = usePart();

  const cellColor = selectedArchetype 
    ? CELL_COLORS[selectedArchetype.row]?.[selectedArchetype.column] 
    : null;

  // Get characters belonging to the selected archetype, filtered by current part
  const archetypeCharacters = useMemo(() => {
    if (!selectedArchetype) return [];
    
    return allCharacters.filter(
      (character) => {
        const characterPart = character.part || "TEMP";
        
        // Filter by part: only show characters from the current part
        if (currentPart === "TEMP" && characterPart === "Part 1") {
          return false; // Explicitly exclude Part 1 entries from TEMP view
        }
        if (characterPart !== currentPart) {
          return false; // Only show characters that match the current part
        }
        
        return (
          character.category === "character" &&
          character.archetype === selectedArchetype.id
        );
      }
    );
  }, [selectedArchetype, currentPart]);

  return (
    <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-3xl">Character Archetypes</CardTitle>
        </div>
        <p className="text-base text-muted-foreground">
          A classification system for character moral and ethical alignments. Click on any archetype to learn more.
        </p>
      </CardHeader>
      <CardContent>
        {/* Grid Container with relative positioning for expanded view */}
        <div className={cn(
          "relative",
          selectedArchetype ? "overflow-hidden" : "overflow-visible"
        )}>
          {/* Expanded Archetype View - takes over the entire grid space */}
          {selectedArchetype && (
            <div 
              className={cn(
                "absolute inset-0 z-10 rounded-xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                cellColor?.bg,
                cellColor?.border
              )}
            >
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={cn(
                  "absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10",
                  cellColor?.border.replace("border-", "bg-")
                )} />
                <div className={cn(
                  "absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-10",
                  cellColor?.border.replace("border-", "bg-")
                )} />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedArchetype(null)}
                className={cn(
                  "absolute top-4 right-4 p-2 rounded-full z-20 transition-all duration-200",
                  "hover:bg-white/10 hover:scale-110",
                  cellColor?.border
                )}
              >
                <X className={cn("w-5 h-5", cellColor?.text)} />
              </button>

              {/* Content */}
              <div className="relative h-full flex flex-col p-3 sm:p-4 md:p-6 overflow-y-auto">
                {/* Header Section */}
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0",
                    "border-2",
                    cellColor?.border,
                    cellColor?.bg
                  )}>
                    <Compass className={cn("w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7", cellColor?.text)} />
                  </div>
                  
                  {/* Title and Badges */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("text-lg sm:text-xl md:text-3xl font-bold tracking-tight mb-1 sm:mb-2", cellColor?.text)}>
                      {selectedArchetype.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1",
                          cellColor?.border,
                          cellColor?.text
                        )}
                      >
                        {selectedArchetype.columnLabel}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1",
                          cellColor?.border,
                          cellColor?.text
                        )}
                      >
                        {selectedArchetype.rowLabel}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className={cn(
                  "h-px w-full mb-3 sm:mb-4 md:mb-6",
                  cellColor?.border.replace("border-", "bg-"),
                  "opacity-40"
                )} />

                {/* Description Section */}
                <div className="flex-1 flex items-start gap-2 sm:gap-3 md:gap-4">
                  <Quote className={cn("w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 opacity-40 mt-0.5 sm:mt-1", cellColor?.text)} />
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm sm:text-base md:text-lg leading-relaxed font-light",
                      "text-foreground/90"
                    )}>
                      {selectedArchetype.description || (
                        <span className="italic text-muted-foreground">No description available yet.</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Characters Section */}
                {archetypeCharacters.length > 0 && (
                  <div className="mt-3 sm:mt-4 md:mt-6 pt-2 sm:pt-3 md:pt-4 border-t border-white/10">
                    <h4 className={cn(
                      "text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4",
                      cellColor?.text
                    )}>
                      Characters belonging to this Archetype:
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                      {archetypeCharacters.map((character) => {
                        const iconUrl = getCharacterIcon(character.id);
                        return (
                          <div key={character.id} className="flex flex-col items-center gap-1 sm:gap-2">
                            <Link
                              to={`/entry/${character.id}`}
                              className={cn(
                                "relative group rounded-full overflow-hidden border-2 transition-all duration-200",
                                "hover:scale-110 hover:shadow-lg",
                                "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
                                cellColor?.border
                              )}
                            >
                              {iconUrl ? (
                                <img
                                  src={iconUrl}
                                  alt={character.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className={cn(
                                  "w-full h-full flex items-center justify-center",
                                  cellColor?.bg
                                )}>
                                  <Users className={cn("w-5 h-5 sm:w-6 sm:h-6", cellColor?.text)} />
                                </div>
                              )}
                            </Link>
                            {/* Character name below icon */}
                            <span className={cn(
                              "text-[10px] sm:text-xs text-center font-medium max-w-[60px] sm:max-w-[80px] md:max-w-[100px]",
                              "line-clamp-2 leading-tight",
                              cellColor?.text || "text-foreground"
                            )}>
                              {character.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footer hint */}
                <div className="mt-3 sm:mt-4 md:mt-6 pt-2 sm:pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                    Press the X button to return to the grid
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Normal Grid View */}
          <div className={cn(
            "w-full transition-opacity duration-200 p-1",
            selectedArchetype ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            {/* Column Headers - Hidden on mobile, shown on larger screens */}
            <div className="hidden md:grid md:grid-cols-[60px_repeat(5,1fr)] lg:grid-cols-[80px_repeat(5,1fr)] gap-1 md:gap-2 mb-2">
              <div /> {/* Empty corner cell */}
              {ARCHETYPE_COLUMNS.map((col) => (
                <div
                  key={col.id}
                  className={cn(
                    "text-center text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wider py-1 md:py-2",
                    COLUMN_LABEL_COLORS[col.id]
                  )}
                >
                  {col.label}
                </div>
              ))}
            </div>

            {/* Mobile: Simple 5-column grid without row labels */}
            <div className="md:hidden space-y-1">
              {ARCHETYPE_ROWS.map((row) => (
                <div key={row.id}>
                  {/* Row Label on mobile - spans full width */}
                  <div className={cn(
                    "text-center text-[10px] font-semibold uppercase tracking-wider py-1 mb-1",
                    ROW_LABEL_COLORS[row.id]
                  )}>
                    {row.label}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {ARCHETYPE_COLUMNS.map((col) => {
                      const archetype = ARCHETYPES.find(
                        (a) => a.column === col.id && a.row === row.id
                      );
                      
                      if (!archetype) return <div key={col.id} />;
                      
                      const tileCellColor = CELL_COLORS[row.id]?.[col.id];
                      
                      return (
                        <button
                          key={archetype.id}
                          onClick={() => setSelectedArchetype(archetype)}
                          className={cn(
                            "relative p-1.5 sm:p-2 rounded-lg border transition-all duration-200",
                            "cursor-pointer",
                            "hover:brightness-125 active:scale-95",
                            "focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-background",
                            tileCellColor?.bg,
                            tileCellColor?.border
                          )}
                        >
                          <div className="text-center">
                            <div className={cn(
                              "font-bold text-[8px] sm:text-[10px] leading-tight",
                              tileCellColor?.text || "text-foreground"
                            )}>
                              {archetype.name}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Full grid with row labels */}
            <div className="hidden md:block">
              {ARCHETYPE_ROWS.map((row) => (
                <div key={row.id} className="grid grid-cols-[60px_repeat(5,1fr)] lg:grid-cols-[80px_repeat(5,1fr)] gap-1 md:gap-2 mb-1 md:mb-2">
                  {/* Row Label */}
                  <div className={cn(
                    "flex items-center justify-center text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wider",
                    ROW_LABEL_COLORS[row.id]
                  )}>
                    {row.label}
                  </div>
                  
                  {/* Archetype Tiles */}
                  {ARCHETYPE_COLUMNS.map((col) => {
                    const archetype = ARCHETYPES.find(
                      (a) => a.column === col.id && a.row === row.id
                    );
                    
                    if (!archetype) return <div key={col.id} />;
                    
                    const tileCellColor = CELL_COLORS[row.id]?.[col.id];
                    
                    return (
                      <button
                        key={archetype.id}
                        onClick={() => setSelectedArchetype(archetype)}
                        className={cn(
                          "relative p-2 lg:p-3 rounded-xl border-2 transition-all duration-200",
                          "cursor-pointer",
                          "hover:scale-[1.03] hover:shadow-lg hover:brightness-125",
                          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
                          tileCellColor?.bg,
                          tileCellColor?.border
                        )}
                      >
                        <div className="text-center">
                          <div className={cn(
                            "font-bold text-[10px] md:text-xs lg:text-sm mb-0.5 lg:mb-1",
                            tileCellColor?.text || "text-foreground"
                          )}>
                            {archetype.name}
                          </div>
                          <div className="hidden lg:block text-[10px] text-muted-foreground">
                            {archetype.columnLabel} / {archetype.rowLabel}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
