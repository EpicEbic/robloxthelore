import * as React from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { StatCard } from "./stat-card";
import { EntryDropdown } from "@/components/ui/entry-dropdown";
import { CombatStyleOption } from "@/types/wiki-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import from the unified stats system
import { 
  GradeLabel,
  StatGrade,
  PhysicalStats,
  PHYSICAL_CATEGORIES,
  GRADE_VALUES
} from "@/lib/stats";

interface StatsCardGridProps {
  stats: PhysicalStats;
  isPhysical?: boolean; // Kept for backwards compatibility, but always true now
  title?: string;
  className?: string;
  // Combat style props
  combatStyles?: CombatStyleOption[];
  currentCombatStyle?: string;
  onCombatStyleChange?: (styleId: string) => void;
}

// Type for grade differences
export interface GradeDifference {
  diff: number; // positive = improvement, negative = decrease
}

export function StatsCardGrid({
  stats,
  isPhysical = true,
  title,
  className,
  combatStyles,
  currentCombatStyle,
  onCombatStyleChange
}: StatsCardGridProps) {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  
  const categories = PHYSICAL_CATEGORIES;
  
  // Get the current combat style label for the title
  const currentStyleLabel = React.useMemo(() => {
    if (!combatStyles || !currentCombatStyle) return null;
    return combatStyles.find(s => s.id === currentCombatStyle)?.label;
  }, [combatStyles, currentCombatStyle]);
  
  // Title: Use combat style name + "Statistics" if available
  const displayTitle = title || (currentStyleLabel ? `${currentStyleLabel} Statistics` : "Physical Statistics");
  
  // Get the base (default/standard) combat style stats for comparison
  const baseStats = React.useMemo(() => {
    if (!combatStyles || combatStyles.length === 0) return null;
    // Default to "standard" style, or fallback to first style
    const defaultStyle = combatStyles.find(s => s.id === "standard") || combatStyles[0];
    return defaultStyle.combatStats;
  }, [combatStyles]);
  
  // Calculate grade difference between current and base
  const getGradeDiff = React.useCallback((currentGrade: GradeLabel, baseGrade: GradeLabel | undefined): GradeDifference | null => {
    if (!baseGrade) return null;
    const currentValue = GRADE_VALUES[currentGrade];
    const baseValue = GRADE_VALUES[baseGrade];
    const diff = currentValue - baseValue;
    if (diff === 0) return null;
    return { diff };
  }, []);
  
  // Check if we should show differences (only when not viewing base style)
  const showDifferences = React.useMemo(() => {
    if (!combatStyles || combatStyles.length <= 1 || !currentCombatStyle) return false;
    const defaultStyleId = combatStyles.find(s => s.id === "standard")?.id || combatStyles[0].id;
    return currentCombatStyle !== defaultStyleId;
  }, [combatStyles, currentCombatStyle]);

  // Get main category stat grade and difference
  const getMainGradeInfo = (categoryKey: string): { grade: GradeLabel; diff: GradeDifference | null } => {
    const statData = stats[categoryKey as keyof typeof stats] as StatGrade | undefined;
    const grade = statData?.label || "F";
    
    // Calculate diff from base stats
    let diff: GradeDifference | null = null;
    if (showDifferences && baseStats) {
      const baseStatData = baseStats[categoryKey as keyof typeof baseStats] as StatGrade | undefined;
      diff = getGradeDiff(grade, baseStatData?.label);
    }
    
    return { grade, diff };
  };

  // Get subcategory stats for a category with differences
  const getSubstats = (category: typeof categories[0]) => {
    return category.subcategories.map((subcat) => {
      // First check if there's a specific subcategory stat
      const subcatStat = stats.subcategories?.[subcat.key as keyof NonNullable<typeof stats.subcategories>];
      // Fall back to main category stat
      const mainStat = stats[category.key as keyof typeof stats] as StatGrade | undefined;
      const grade = (subcatStat?.label || mainStat?.label || "F") as GradeLabel;
      
      // Calculate diff from base stats
      let diff: GradeDifference | null = null;
      if (showDifferences && baseStats) {
        const baseSubcatStat = baseStats.subcategories?.[subcat.key as keyof NonNullable<typeof baseStats.subcategories>];
        const baseMainStat = baseStats[category.key as keyof typeof baseStats] as StatGrade | undefined;
        const baseGrade = baseSubcatStat?.label || baseMainStat?.label;
        diff = getGradeDiff(grade, baseGrade);
      }
      
      return {
        key: subcat.key,
        label: subcat.label,
        grade,
        description: subcat.description,
        diff
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
                  Physical statistics measure raw physical capabilities without ability enhancement. Click any grade badge to see detailed descriptions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Combat Style Dropdown */}
        {combatStyles && combatStyles.length > 1 && onCombatStyleChange && (
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
        {categories.map((category) => {
          const mainInfo = getMainGradeInfo(category.key);
          return (
            <StatCard
              key={category.key}
              categoryKey={category.key}
              categoryLabel={category.label}
              categoryDescription={category.description}
              mainGrade={mainInfo.grade}
              substats={getSubstats(category)}
            />
          );
        })}
      </div>
    </div>
  );
}
