
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { WikiEntry } from "@/contexts/wiki-context";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { motion } from "framer-motion";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { getArchetypeByAlignment, getArchetypeById } from "@/data/character-archetypes";

// Cell colors for archetypes (matching the statistics page grid)
// Converted from grid colors to button-friendly gradients
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

interface WikiEntryCardProps {
  entry: WikiEntry;
  imageDelay?: number;
}

export const WikiEntryCard = memo(function WikiEntryCard({ entry, imageDelay = 0 }: WikiEntryCardProps) {
  const { isEntryUnlocked } = useEasterEgg();
  const isLocked = !isEntryUnlocked(entry.id);

  // Get the appropriate image for character entries
  const getImageUrl = () => {
    if (entry.category === "character") {
      // Use the first carousel image if available, otherwise fall back to imageUrl
      if (entry.carouselImages && entry.carouselImages.length > 0) {
        return entry.carouselImages[0].url;
      }
    }
    return entry.imageUrl;
  };

  // Get the appropriate preview text - use preview field if available, otherwise fall back to description
  const getPreviewText = () => {
    if (entry.preview) {
      return entry.preview;
    }
    
    if (entry.category === "character" && entry.sections?.personality && entry.sections.personality.length > 0) {
      // Handle both old string[] format and new PersonalityOption[] format
      const firstPersonality = entry.sections.personality[0];
      if (typeof firstPersonality === 'string') {
        return firstPersonality;
      } else if (firstPersonality && typeof firstPersonality === 'object' && 'description' in firstPersonality) {
        // For PersonalityOption, use the first description paragraph
        return firstPersonality.description[0];
      }
    }
    return entry.description;
  };

  // Parse alignment and get archetype
  const getArchetypeData = () => {
    if (!entry.alignment && !entry.archetype) return null;
    
    let archetype;
    let column: string;
    let row: string;
    
    if (entry.archetype) {
      // Use the character's defined archetype
      archetype = getArchetypeById(entry.archetype);
      if (archetype) {
        column = archetype.column;
        row = archetype.row;
      } else {
        // Fallback to alignment if archetype ID not found
        if (!entry.alignment) return null;
        const alignmentParts = entry.alignment.split("/").map(s => s.trim().toLowerCase());
        column = alignmentParts[0] || "neutral";
        row = alignmentParts[1] || "neutral";
        archetype = getArchetypeByAlignment(column, row);
      }
    } else {
      // Parse alignment string (e.g., "Chaotic/Good" -> column: "chaotic", row: "good")
      const alignmentParts = entry.alignment!.split("/").map(s => s.trim().toLowerCase());
      column = alignmentParts[0] || "neutral";
      row = alignmentParts[1] || "neutral";
      
      archetype = getArchetypeByAlignment(column, row);
    }
    
    const cellColor = CELL_COLORS[column]?.[row] || CELL_COLORS.neutral.neutral;
    const alignmentParts = [column, row];
    
    return { archetype, cellColor, alignmentParts };
  };

  // Alignment tokens styled like entry pages with archetype
  const renderAlignment = () => {
    if (!entry.alignment && !entry.archetype) return null;
    
    const data = getArchetypeData();
    if (!data) return null;
    
    const { archetype, cellColor } = data;
    
    return (
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Archetype badge (main) */}
        {archetype && (
          <span
            className={cn(
              "px-3 py-1.5 text-white text-sm font-bold rounded-full shadow-md border-2",
              cellColor.bg,
              cellColor.border
            )}
          >
            {archetype.name}
          </span>
        )}
        {/* Alignment badges (secondary) */}
        {(data.archetype ? [data.archetype.columnLabel, data.archetype.rowLabel] : entry.alignment!.split("/")).map((align, index) => (
          <span
            key={index}
            className={cn(
              "px-2 py-1 text-white text-xs font-medium rounded-full border",
              getAlignmentBadgeColor(align)
            )}
          >
            {align.trim()}
          </span>
        ))}
      </div>
    );
  };

  const imageUrl = getImageUrl();
  const previewText = getPreviewText();
  // Unified layout for all entries
  const cardContent = (
    <motion.div layoutId={`entry-${entry.id}-card`} className="h-full">
      <Card className={cn(
        "overflow-hidden h-full group border-l-4 rounded-xl flex flex-col",
        isLocked ? "opacity-50 grayscale cursor-not-allowed" : "card-hover-character"
      )} 
        style={{ borderLeftColor: `var(--wiki-${entry.category})` }}>
          {imageUrl && (
            <div className="w-full overflow-hidden relative">
              <AspectRatio ratio={1} className="bg-muted/20">
                <OptimizedImage
                  src={imageUrl}
                  alt={entry.title}
                  className="w-full h-full opacity-0 animate-image-fade-in transition-transform duration-500 object-cover"
                  style={{ animationDelay: `${imageDelay}s` }}
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          )}
          <CardContent className="p-4 text-center flex flex-col flex-1 min-h-0">
            <div className="space-y-3">
              <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                {entry.title}
              </h3>
              {previewText && (
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {previewText}
                </p>
              )}
            </div>
            {entry.category === "character" && previewText && (
              <div className="h-px w-full bg-border/50 my-3" />
            )}
            {entry.category === "character" && (
              <div className="mt-auto">
                {renderAlignment()}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
  );

  if (isLocked) {
    return cardContent;
  }

  return (
    <Link to={`/entry/${entry.id}`}>
      {cardContent}
    </Link>
  );
});
