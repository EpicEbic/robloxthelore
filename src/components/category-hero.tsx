import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/use-parallax";
import { getDefaultSubcategory } from "@/data/categories";
import { usePart } from "@/contexts/part-context";

interface CategoryHeroProps {
  categoryType: string;
  categoryLabel: string;
  subcategoryLabel: string;
}

// Description mapping for each subcategory
const getSubcategoryDescription = (categoryType: string, subcategoryLabel: string, partName: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    character: {
      "All Characters": `Browse every available character featured in The Lore, specifically in ${partName}.`,
      "Protagonist": `Browse the main characters featured in The Lore, specifically in ${partName}.`,
      "Protagonists": `Browse the main characters featured in The Lore, specifically in ${partName}.`,
      "Deuteragonist": `Browse the supporting characters featured in The Lore, specifically in ${partName}.`,
      "Deuteragonists": `Browse the supporting characters featured in The Lore, specifically in ${partName}.`,
      "Neutralist": `Browse the neutral figures featured in The Lore, specifically in ${partName}.`,
      "Neutralists": `Browse the neutral figures featured in The Lore, specifically in ${partName}.`,
      "Minor Antagonist": `Browse the minor villains featured in The Lore, specifically in ${partName}.`,
      "Minor Antagonists": `Browse the minor villains featured in The Lore, specifically in ${partName}.`,
      "Major Antagonist": `Browse the major villains featured in The Lore, specifically in ${partName}.`,
      "Major Antagonists": `Browse the major villains featured in The Lore, specifically in ${partName}.`,
      "Non-Canon": `Browse extra characters featured in The Lore, not a part of / true to the official story.`,
    },
    equipment: {
      "Artifacts": `Browse the legendary (and often one-of-a-kind) artifacts found in The Lore, specifically in ${partName}.`,
      "Standard": `Browse the typical goods and resources found in The Lore, specifically in ${partName}.`,
      "Materials": `Browse the unique resources found in The Lore, specifically in ${partName}.`,
    },
    location: {
      "All Locations": `Browse every location found in The Lore, specifically in ${partName}.`,
      "Primary Locations": `Browse each major-featured location in The Lore, specifically in ${partName}.`,
      "Secondary Locations": `Browse the smaller and less-significant locations in The Lore, specifically in ${partName}.`,
    },
    faction: {
      "All Factions": `Browse every available any factions and organizations in The Lore, specifically in ${partName}.`,
      "Friendly": `Browse every positively-aligned faction and organization in The Lore, specifically in ${partName}.`,
      "Neutral": `Browse every neutrally-aligned faction and organization in The Lore, specifically in ${partName}.`,
      "Hostile": `Browse every hostile/evil-aligned faction and organization in The Lore, specifically in ${partName}.`,
    },
  };

  return descriptions[categoryType]?.[subcategoryLabel] || "";
};

export function CategoryHero({ categoryType, categoryLabel, subcategoryLabel }: CategoryHeroProps) {
  const parallaxOffset = useParallax(0.2);
  const { currentPart } = usePart();
  const description = getSubcategoryDescription(categoryType, subcategoryLabel, currentPart);
  
  return (
    <div className="flex justify-center mb-8">
      <div
        className={cn(
          "px-6 py-2 rounded-2xl text-center text-primary-foreground relative overflow-hidden shadow-xl border-2 border-primary/20 w-fit",
          `bg-wiki-${categoryType}`
        )}
      >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      
      <div className="relative z-10" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight animate-fade-in">{subcategoryLabel}</h1>
        {description && (
          <p className="text-sm lg:text-base mt-2 opacity-90 animate-fade-in anim-delay-100">{description}</p>
        )}
      </div>
      </div>
    </div>
  );
}
