import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { AbilityTechnique } from "./ability-technique";
import { AbilityCategory as AbilityCategoryType } from "@/types/wiki-types";
import { LucideIcon } from "lucide-react";

interface AbilityCategoryProps {
  title: string;
  icon: LucideIcon;
  category?: AbilityCategoryType;
  currentEntryId?: string;
}

export function AbilityCategory({ 
  title, 
  icon: Icon, 
  category, 
  currentEntryId 
}: AbilityCategoryProps) {
  if (!category) return null;

  const hasTechniques = category.techniques && category.techniques.length > 0;
  const hasText = category.text && category.text.length > 0;

  if (!hasTechniques && !hasText) return null;

  const isVortex = currentEntryId === "vortex-a-steele";
  
  return (
    <div className="bg-card rounded-xl p-4 border min-w-0" data-ability-section={isVortex ? "true" : undefined}>
      <h3 
        className="text-lg font-semibold mb-3 flex items-center gap-2"
        style={isVortex ? { color: '#a855f7' } : {}}
      >
        <Icon 
          className="h-5 w-5 text-primary flex-shrink-0" 
          style={isVortex ? { color: '#a855f7', stroke: '#a855f7', fill: 'none' } : {}}
        />
        <span style={isVortex ? { color: '#a855f7' } : {}}>{title}</span>
      </h3>
      
      {hasTechniques && (
        <div className="space-y-2">
          {category.techniques!.map((technique) => (
            <AbilityTechnique
              key={technique.id}
              title={technique.title}
              description={technique.description}
              currentEntryId={currentEntryId}
            />
          ))}
        </div>
      )}

      {!hasTechniques && hasText && (
        <div className="text-foreground/90">
          {category.text!.map((paragraph, idx) => (
            <p key={idx} className="mb-3 last:mb-0">
              <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

