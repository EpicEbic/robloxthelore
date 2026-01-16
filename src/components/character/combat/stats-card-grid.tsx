import * as React from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { StatCard, PotentialCard } from "./stat-card";
import { EntryDropdown } from "@/components/ui/entry-dropdown";
import { CombatStyleOption } from "@/types/wiki-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import from the new unified stats system
import { 
  GradeLabel,
  StatGrade,
  PhysicalStats,
  AbilityStats,
  PHYSICAL_CATEGORIES,
  ABILITY_CATEGORIES
} from "@/lib/stats";

interface StatsCardGridProps {
  stats: PhysicalStats | AbilityStats;
  isPhysical: boolean;
  title?: string;
  className?: string;
  // Combat style props (only for physical stats)
  combatStyles?: CombatStyleOption[];
  currentCombatStyle?: string;
  onCombatStyleChange?: (styleId: string) => void;
}

export function StatsCardGrid({
  stats,
  isPhysical,
  title,
  className,
  combatStyles,
  currentCombatStyle,
  onCombatStyleChange
}: StatsCardGridProps) {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  
  // Use the appropriate categories from the unified stats system
  const categories = isPhysical ? PHYSICAL_CATEGORIES : ABILITY_CATEGORIES;
  const displayTitle = title || (isPhysical ? "Physical Statistics" : "Ability Statistics");

  // Get main category stat grade
  const getMainGrade = (categoryKey: string): GradeLabel => {
    const statData = stats[categoryKey as keyof typeof stats] as StatGrade | undefined;
    return statData?.label || "F";
  };

  // Get subcategory stats for a category
  const getSubstats = (category: typeof categories[0]) => {
    return category.subcategories.map((subcat) => {
      // First check if there's a specific subcategory stat
      const subcatStat = stats.subcategories?.[subcat.key as keyof NonNullable<typeof stats.subcategories>];
      // Fall back to main category stat
      const mainStat = stats[category.key as keyof typeof stats] as StatGrade | undefined;
      const grade = subcatStat?.label || mainStat?.label || "F";
      
      return {
        key: subcat.key,
        label: subcat.label,
        grade: grade as GradeLabel,
        description: subcat.description  // This is now properly typed from the unified system
      };
    });
  };

  // Combat style dropdown options
  const combatStyleOptions = React.useMemo(() => {
    if (!combatStyles) return [];
    return combatStyles.map(style => ({
      id: style.id,
      label: style.label
    }));
  }, [combatStyles]);

  return (
    <div
      className={cn(
        "rounded-2xl",
        "bg-card/80 backdrop-blur-sm",
        "border border-border/50",
        "p-4 sm:p-6",
        className
      )}
    >
      {/* Header with Title and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {displayTitle}
          </h3>
          
          {/* Help tooltip */}
          <TooltipProvider>
            <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3" side="bottom">
                <p className="text-sm">
                  {isPhysical 
                    ? "Physical statistics measure raw physical capabilities without ability enhancement. Click any grade badge to see detailed descriptions."
                    : "Ability statistics measure the effectiveness of a character's special powers. Click any grade badge for details."
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Combat Style Dropdown (only for physical stats) */}
        {isPhysical && combatStyles && combatStyles.length > 1 && onCombatStyleChange && (
          <EntryDropdown
            options={combatStyleOptions}
            value={currentCombatStyle || combatStyles[0].id}
            onChange={onCombatStyleChange}
            placeholder="Select Style"
            className="w-full sm:w-auto"
          />
        )}
      </div>

      {/* Stats Card Grid - Stacked vertically for better readability */}
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <StatCard
            key={category.key}
            categoryKey={category.key}
            categoryLabel={category.label}
            categoryDescription={category.description}
            mainGrade={getMainGrade(category.key)}
            substats={getSubstats(category)}
            isAbility={!isPhysical}
          />
        ))}
        
        {/* Potential card for ability stats */}
        {!isPhysical && (
          <PotentialCard 
            grade={(stats as AbilityStats).potential?.label || "F"} 
          />
        )}
      </div>
    </div>
  );
}
