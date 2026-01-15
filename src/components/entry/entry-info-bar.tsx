import { useState } from "react";
import { 
  Info, 
  Calendar, 
  Scale, 
  Ruler, 
  Package, 
  Sparkles, 
  MapPin, 
  Layers, 
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getArchetypeByAlignment, getArchetypeById } from "@/data/character-archetypes";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ExpandedArchetypeCard, getArchetypeColors } from "@/components/ui/expanded-archetype-card";
import { EntryType } from "./entry-header";

// Alignment badge colors
const ALIGNMENT_BADGE_COLORS: Record<string, string> = {
  lawful: "bg-gradient-to-r from-cyan-700/60 to-cyan-800/60 border-cyan-400/50",
  social: "bg-gradient-to-r from-lime-700/60 to-lime-800/60 border-lime-400/50",
  neutral: "bg-gradient-to-r from-gray-600/60 to-gray-700/60 border-gray-300/50",
  rebel: "bg-gradient-to-r from-orange-700/60 to-orange-800/60 border-orange-400/50",
  chaotic: "bg-gradient-to-r from-red-700/60 to-red-800/60 border-red-400/50",
  good: "bg-gradient-to-r from-green-700/60 to-green-800/60 border-green-400/50",
  moral: "bg-gradient-to-r from-teal-700/60 to-teal-800/60 border-teal-400/50",
  impure: "bg-gradient-to-r from-orange-700/60 to-orange-800/60 border-orange-400/50",
  evil: "bg-gradient-to-r from-red-800/60 to-red-900/60 border-red-500/50",
};

function getAlignmentBadgeColor(align: string): string {
  const normalizedAlign = align.trim().toLowerCase();
  return ALIGNMENT_BADGE_COLORS[normalizedAlign] || ALIGNMENT_BADGE_COLORS.neutral;
}

// Info item component for consistent styling
interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  iconClassName?: string;
}

function InfoItem({ icon: Icon, label, value, iconClassName }: InfoItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 md:p-5 flex-1">
      <div className={cn(
        "flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl flex-shrink-0 shadow-lg",
        "glass-panel glow-border-subtle",
        iconClassName
      )}>
        <Icon className="h-5 w-5 glow-icon-subtle" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="text-base font-semibold text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}

export interface EntryInfoBarProps {
  entryType: EntryType;
  
  // Character fields
  species?: string;
  age?: string | number;
  height?: string;
  status?: string;
  alignment?: string;
  archetypeId?: string;
  
  // Equipment fields
  equipmentSubcategory?: string;
  
  // Location fields
  locationType?: string;
  locationSize?: string;
  locationRegion?: string;
  
  className?: string;
}

/**
 * EntryInfoBar - Unified metadata display for all entry types
 * 
 * Displays type-specific fields in a glass-styled container with
 * consistent layout and optional archetype expansion for characters.
 */
export function EntryInfoBar({
  entryType,
  species,
  age,
  height,
  status,
  alignment,
  archetypeId,
  equipmentSubcategory,
  locationType,
  locationSize,
  locationRegion,
  className,
}: EntryInfoBarProps) {
  const [showArchetypeCard, setShowArchetypeCard] = useState(false);

  // Character-specific: Get archetype data
  let archetype;
  let column: string = "neutral";
  let row: string = "neutral";

  if (entryType === 'character' && alignment) {
    if (archetypeId) {
      archetype = getArchetypeById(archetypeId);
      if (archetype) {
        column = archetype.column;
        row = archetype.row;
      } else {
        const alignmentParts = alignment.split("/").map(s => s.trim().toLowerCase());
        column = alignmentParts[0] || "neutral";
        row = alignmentParts[1] || "neutral";
        archetype = getArchetypeByAlignment(column, row);
      }
    } else {
      const alignmentParts = alignment.split("/").map(s => s.trim().toLowerCase());
      column = alignmentParts[0] || "neutral";
      row = alignmentParts[1] || "neutral";
      archetype = getArchetypeByAlignment(column, row);
    }
  }

  // Get archetype colors for the button styling
  const archetypeColors = archetype ? getArchetypeColors(archetype) : null;

  // Equipment: Get subcategory info
  const getEquipmentLabel = () => {
    if (equipmentSubcategory === "artifacts") return "Artifact";
    if (equipmentSubcategory === "standard") return "Standard";
    if (equipmentSubcategory === "materials") return "Material";
    return "Standard";
  };

  return (
    <GlassPanel
      variant="default"
      glow
      glowIntensity="subtle"
      rounded="xl"
      padding="none"
      className={cn("mt-4 mb-4 mx-4 md:mx-6 overflow-hidden", className)}
    >
      {/* Character Info Bar */}
      {entryType === 'character' && !showArchetypeCard && (
        <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-border/30">
          {species && <InfoItem icon={Info} label="Species" value={species} />}
          {age && <InfoItem icon={Calendar} label="Age" value={age} />}
          {height && <InfoItem icon={Ruler} label="Height" value={height} />}
          {status && <InfoItem icon={Info} label="Status" value={status} />}
          
          {/* Alignment with archetype */}
          <div className="flex items-center gap-4 p-4 md:p-5 flex-1">
            <div className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl flex-shrink-0 shadow-lg glass-panel glow-border-subtle">
              <Scale className="h-5 w-5 glow-icon-subtle" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Alignment
              </div>
              <div className="flex flex-col gap-2">
                {archetype && archetypeColors && (
                  <button
                    onClick={() => setShowArchetypeCard(true)}
                    className="archetype-button px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 self-start hover:scale-105 hover:shadow-lg cursor-pointer border-2 glow-interactive"
                    style={{
                      background: archetypeColors.bgGradient,
                      borderColor: archetypeColors.borderColor,
                      color: "#ffffff",
                    }}
                  >
                    {archetype.name}
                  </button>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  {(archetype ? [archetype.columnLabel, archetype.rowLabel] : alignment?.split("/") || []).map((align, index) => (
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
        </div>
      )}

      {/* Character Archetype Expanded Card - uses shared component with inline styles */}
      {entryType === 'character' && showArchetypeCard && archetype && (
        <ExpandedArchetypeCard
          archetype={archetype}
          onClose={() => setShowArchetypeCard(false)}
          className="animate-in fade-in zoom-in-95 duration-200"
        />
      )}

      {/* Equipment Info Bar */}
      {entryType === 'equipment' && (
        <div className="flex flex-col md:flex-row items-stretch p-4 md:p-5">
          <InfoItem
            icon={equipmentSubcategory === "artifacts" ? Sparkles : Package}
            label="Type"
            value={getEquipmentLabel()}
          />
        </div>
      )}

      {/* Location Info Bar */}
      {entryType === 'location' && (
        <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-border/30">
          <InfoItem icon={MapPin} label="Type" value={locationType || "Unknown"} />
          <InfoItem icon={Layers} label="Size" value={locationSize || "Unknown"} />
          <InfoItem icon={Globe} label="Region" value={locationRegion || "Unknown"} />
        </div>
      )}
    </GlassPanel>
  );
}

