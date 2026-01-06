import { useState } from "react";
import { Info, Calendar, Scale, X, Quote, Compass } from "lucide-react";
import { getArchetypeByAlignment, getArchetypeById } from "@/data/character-archetypes";
import { cn } from "@/lib/utils";

// Convert grid colors (row-first) to button-friendly gradients (column-first)
// Grid uses: good.lawful, good.social, etc.
// Buttons need: lawful.good, lawful.moral, etc.
// Direct mapping based on grid colors to matching button gradients
const CELL_COLORS: Record<string, Record<string, { bg: string; border: string; text: string }>> = {
  lawful: {
    good: { bg: "bg-gradient-to-br from-cyan-600/80 to-cyan-800/80", border: "border-cyan-400", text: "text-white" },
    moral: { bg: "bg-gradient-to-br from-teal-600/80 to-teal-800/80", border: "border-teal-400", text: "text-white" },
    neutral: { bg: "bg-gradient-to-br from-slate-600/80 to-slate-800/80", border: "border-slate-400", text: "text-white" },
    impure: { bg: "bg-gradient-to-br from-violet-600/80 to-violet-800/80", border: "border-violet-400", text: "text-white" },
    evil: { bg: "bg-gradient-to-br from-fuchsia-600/80 to-fuchsia-800/80", border: "border-fuchsia-500", text: "text-white" }
  },
  social: {
    good: { bg: "bg-gradient-to-br from-lime-600/80 to-lime-800/80", border: "border-lime-400", text: "text-white" },
    moral: { bg: "bg-gradient-to-br from-emerald-600/80 to-emerald-800/80", border: "border-emerald-400", text: "text-white" },
    neutral: { bg: "bg-gradient-to-br from-gray-600/80 to-gray-800/80", border: "border-gray-400", text: "text-white" },
    impure: { bg: "bg-gradient-to-br from-amber-600/80 to-amber-800/80", border: "border-amber-500", text: "text-white" },
    evil: { bg: "bg-gradient-to-br from-rose-600/80 to-rose-800/80", border: "border-rose-500", text: "text-white" }
  },
  neutral: {
    good: { bg: "bg-gradient-to-br from-green-600/80 to-green-800/80", border: "border-green-400", text: "text-white" },
    moral: { bg: "bg-gradient-to-br from-green-600/80 to-green-800/80", border: "border-green-500", text: "text-white" },
    neutral: { bg: "bg-gradient-to-br from-zinc-600/80 to-zinc-800/80", border: "border-zinc-300", text: "text-white" },
    impure: { bg: "bg-gradient-to-br from-orange-600/80 to-orange-800/80", border: "border-orange-500", text: "text-white" },
    evil: { bg: "bg-gradient-to-br from-red-600/80 to-red-800/80", border: "border-red-500", text: "text-white" }
  },
  rebel: {
    good: { bg: "bg-gradient-to-br from-yellow-600/80 to-yellow-800/80", border: "border-yellow-400", text: "text-white" },
    moral: { bg: "bg-gradient-to-br from-lime-600/80 to-lime-800/80", border: "border-lime-500", text: "text-white" },
    neutral: { bg: "bg-gradient-to-br from-stone-600/80 to-stone-800/80", border: "border-stone-400", text: "text-white" },
    impure: { bg: "bg-gradient-to-br from-orange-600/80 to-orange-800/80", border: "border-orange-400", text: "text-white" },
    evil: { bg: "bg-gradient-to-br from-red-600/80 to-red-800/80", border: "border-red-400", text: "text-white" }
  },
  chaotic: {
    good: { bg: "bg-gradient-to-br from-orange-600/80 to-orange-800/80", border: "border-orange-400", text: "text-white" },
    moral: { bg: "bg-gradient-to-br from-yellow-600/80 to-yellow-800/80", border: "border-yellow-500", text: "text-white" },
    neutral: { bg: "bg-gradient-to-br from-neutral-600/80 to-neutral-800/80", border: "border-neutral-400", text: "text-white" },
    impure: { bg: "bg-gradient-to-br from-red-600/80 to-red-800/80", border: "border-red-400", text: "text-white" },
    evil: { bg: "bg-gradient-to-br from-red-700/80 to-red-950/80", border: "border-red-600", text: "text-white" }
  }
};

// Alignment badge colors (matching grid column/row label colors)
const ALIGNMENT_BADGE_COLORS: Record<string, string> = {
  // Column alignments (matching COLUMN_LABEL_COLORS from grid)
  lawful: "bg-gradient-to-r from-cyan-700/60 to-cyan-800/60 border-cyan-400/50",
  social: "bg-gradient-to-r from-lime-700/60 to-lime-800/60 border-lime-400/50",
  neutral: "bg-gradient-to-r from-gray-600/60 to-gray-700/60 border-gray-300/50",
  rebel: "bg-gradient-to-r from-orange-700/60 to-orange-800/60 border-orange-400/50",
  chaotic: "bg-gradient-to-r from-red-700/60 to-red-800/60 border-red-400/50",
  // Row alignments (matching ROW_LABEL_COLORS from grid)
  good: "bg-gradient-to-r from-green-700/60 to-green-800/60 border-green-400/50",
  moral: "bg-gradient-to-r from-teal-700/60 to-teal-800/60 border-teal-400/50",
  impure: "bg-gradient-to-r from-orange-700/60 to-orange-800/60 border-orange-400/50",
  evil: "bg-gradient-to-r from-red-800/60 to-red-900/60 border-red-500/50",
};

function getAlignmentBadgeColor(align: string): string {
  const normalizedAlign = align.trim().toLowerCase();
  return ALIGNMENT_BADGE_COLORS[normalizedAlign] || ALIGNMENT_BADGE_COLORS.neutral;
}

interface CharacterBasicInfoProps {
  species: string;
  age: number | string;
  alignment: string;
  archetypeId?: string;
}

export function CharacterBasicInfo({ species, age, alignment, archetypeId }: CharacterBasicInfoProps) {
  const [showArchetypeCard, setShowArchetypeCard] = useState(false);
  
  // Get archetype: use archetypeId if provided, otherwise derive from alignment
  let archetype;
  let column: string;
  let row: string;
  
  if (archetypeId) {
    // Use the character's defined archetype
    archetype = getArchetypeById(archetypeId);
    if (archetype) {
      column = archetype.column;
      row = archetype.row;
    } else {
      // Fallback to alignment if archetype ID not found
      const alignmentParts = alignment.split("/").map(s => s.trim().toLowerCase());
      column = alignmentParts[0] || "neutral";
      row = alignmentParts[1] || "neutral";
      archetype = getArchetypeByAlignment(column, row);
    }
  } else {
    // Parse alignment string (e.g., "Chaotic/Good" -> column: "chaotic", row: "good")
    const alignmentParts = alignment.split("/").map(s => s.trim().toLowerCase());
    column = alignmentParts[0] || "neutral";
    row = alignmentParts[1] || "neutral";
    
    // Get the archetype for this alignment
    archetype = getArchetypeByAlignment(column, row);
  }
  
  const cellColor = CELL_COLORS[column]?.[row] || CELL_COLORS.neutral.neutral;
  
  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden mt-6 mb-6 mx-4 md:mx-6 relative">
      {/* Collapsed View - Info Bar */}
      {!showArchetypeCard && (
        <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-border/30">
          {/* Species */}
          <div className="flex items-center gap-4 p-5 flex-1">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 flex-shrink-0 shadow-lg">
              <Info className="h-5 w-5 icon-force-black" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Species</div>
              <div className="text-base font-semibold text-foreground">
                {species}
              </div>
            </div>
          </div>
          
          {/* Age */}
          <div className="flex items-center gap-4 p-5 flex-1">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 flex-shrink-0 shadow-lg">
              <Calendar className="h-5 w-5 icon-force-black" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Age</div>
              <div className="text-base font-semibold text-foreground">
                {age}
              </div>
            </div>
          </div>
          
          {/* Alignment & Archetype */}
          <div className="flex items-center gap-4 p-5 flex-1">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 flex-shrink-0 shadow-lg">
              <Scale className="h-5 w-5 icon-force-black" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Alignment</div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Archetype button */}
                {archetype && (
                  <button
                    onClick={() => setShowArchetypeCard(true)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 text-force-white",
                      "hover:scale-105 hover:shadow-lg cursor-pointer",
                      "border-2",
                      cellColor.bg,
                      cellColor.border
                    )}
                  >
                    {archetype.name}
                  </button>
                )}
                {/* Alignment badges - use archetype subtypes if available, otherwise use alignment */}
                {(archetype ? [archetype.columnLabel, archetype.rowLabel] : alignment.split("/")).map((align, index) => (
                  <span 
                    key={index} 
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full border text-force-white",
                      getAlignmentBadgeColor(align)
                    )}
                  >
                    {align.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded View - Archetype Card (fills the entire info bar space) */}
      {showArchetypeCard && archetype && (
        <div 
          className={cn(
            "relative p-6 min-h-[120px] text-force-white",
            cellColor.bg,
            cellColor.border,
            "border-2 rounded-2xl"
          )}
        >
          {/* Close button */}
          <button
            onClick={() => setShowArchetypeCard(false)}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full z-20 transition-all duration-200",
              "hover:bg-white/20 hover:scale-110 bg-white/10",
              cellColor.border
            )}
          >
            <X className="w-5 h-5 icon-force-white" />
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Icon and Name */}
            <div className="flex items-start gap-4 shrink-0">
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
                "bg-white/10 border",
                cellColor.border
              )}>
                <Compass className="w-7 h-7 icon-force-white" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-white drop-shadow-md">
                  {archetype.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-md",
                    "bg-white/10 border text-white/80",
                    cellColor.border
                  )}>
                    {archetype.columnLabel}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-md",
                    "bg-white/10 border text-white/80",
                    cellColor.border
                  )}>
                    {archetype.rowLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Description */}
            <div className="flex-1 flex items-start gap-3">
              <div className={cn(
                "hidden md:block h-full w-px shrink-0",
                cellColor.border.replace("border-", "bg-"),
                "opacity-40"
              )} />
              <div className="flex gap-3">
                <Quote className="w-5 h-5 shrink-0 mt-1 opacity-60 icon-force-white" />
                <p className="text-sm leading-relaxed text-white/90">
                  {archetype.description}
                </p>
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="mt-4 text-center">
            <span className="text-xs text-white/50">
              Press the X button to return to the info bar
            </span>
          </div>

          {/* Decorative circles */}
          <div className={cn(
            "absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 pointer-events-none",
            cellColor.bg.replace("/80", "")
          )} />
          <div className={cn(
            "absolute -top-8 -left-8 w-24 h-24 rounded-full opacity-5 pointer-events-none",
            cellColor.bg.replace("/80", "")
          )} />
        </div>
      )}
    </div>
  );
}
