import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Sword, Shield, Zap, Target, Brain, X, Quote, BarChart3 } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Import from the unified stats system
import {
  GradeLabel,
  GRADE_LABELS,
  GRADE_COLORS,
  GRADE_NAMES,
  PHYSICAL_CATEGORIES,
  PHYSICAL_STAT_DESCRIPTIONS,
  getPhysicalStatDescription
} from "@/lib/stats";

// =============================================================================
// GRADE DISPLAY DATA
// =============================================================================

// Extended descriptions for grade overview (these are generic grade explanations)
const GRADE_OVERVIEW_DESCRIPTIONS: Record<GradeLabel, string> = {
  "Ø": "Unfathomable levels of power that transcend known limits, often existing beyond logistical reasoning and comprehension. Godlike and effectively unstoppable.",
  "S": "Mastery and peak performance, rivaled by little to none. A quality displayed by the best of the best, serving as a force not to be messed with or taken lightly.",
  "A": "High-ranking proficiency that outclasses a majority of others, even those with lots of experience.",
  "B": "Capabilities and excellence that goes far beyond the standard and intermediate expectations.",
  "C": "Skills or capabilities that are well-versed and generally solid in most circumstances.",
  "D": "Notably proficient and powerful, though nothing too exceptional.",
  "E": "Skillsets or potential above the average civilian, but nothing more.",
  "F": "A civilian-standard grade, when skills or capabilities do not go beyond the norm of society."
};

// Extended grade display names (using more descriptive names for the statistics page)
const GRADE_DISPLAY_NAMES: Record<GradeLabel, string> = {
  "Ø": "Godlike",
  "S": "Supreme",
  "A": "Exceptional",
  "B": "Remarkable",
  "C": "Proficient",
  "D": "Notable",
  "E": "Above Average",
  "F": "Civilian"
};

// Background colors for grade cards (darker/muted versions for card backgrounds)
const GRADE_BG_COLORS: Record<GradeLabel, string> = {
  "Ø": "bg-purple-900/40",
  "S": "bg-blue-900/40",
  "A": "bg-green-900/40",
  "B": "bg-yellow-900/40",
  "C": "bg-orange-900/40",
  "D": "bg-orange-950/40",
  "E": "bg-red-900/40",
  "F": "bg-gray-800/40"
};

interface Grade {
  grade: GradeLabel;
  name: string;
  description: string;
  color: string;
  border: string;
  text: string;
  bg: string;
}

// Build grade display data from the unified stats system
function buildGradeDisplayData(): Grade[] {
  return GRADE_LABELS.slice().reverse().map((grade) => {
    const colors = GRADE_COLORS[grade];
    return {
      grade,
      name: GRADE_DISPLAY_NAMES[grade],
      description: GRADE_OVERVIEW_DESCRIPTIONS[grade],
      color: colors.bg,
      border: colors.border,
      text: colors.text,
      bg: GRADE_BG_COLORS[grade]
    };
  });
}

// =============================================================================
// CATEGORY ICON & COLOR MAPPINGS
// =============================================================================

// Icon mapping for physical stat categories
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  strength: Sword,
  durability: Shield,
  agility: Zap,
  precision: Target,
  intelligence: Brain
};

// Icon color gradients for categories
const CATEGORY_ICON_COLORS: Record<string, string> = {
  strength: "from-red-500 to-orange-500",
  durability: "from-blue-500 to-cyan-500",
  agility: "from-yellow-500 to-amber-500",
  precision: "from-green-500 to-emerald-500",
  intelligence: "from-purple-500 to-pink-500"
};

// =============================================================================
// COMPONENT
// =============================================================================

export function PhysicalStatsGrid() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedStat, setSelectedStat] = useState<{ 
    categoryKey: string; 
    subcatKey: string; 
    grade: GradeLabel 
  } | null>(null);

  // Build grade display data from unified stats system
  const GRADES = useMemo(() => buildGradeDisplayData(), []);

  const getGradeInfo = (gradeKey: GradeLabel) => GRADES.find(g => g.grade === gradeKey);

  // Get the grade description for a specific stat at a specific grade
  const getStatGradeDescription = (subcatKey: string, grade: GradeLabel): string => {
    return getPhysicalStatDescription(subcatKey, grade);
  };

  return (
    <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-900" />
          </div>
          <CardTitle className="text-3xl">Physical Statistics</CardTitle>
        </div>
        <p className="text-base text-muted-foreground">
          These stats measure a character's physical capabilities and combat prowess. Click on any grade to learn more.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Grade Legend Section */}
        <div className={cn(
          "relative transition-all duration-200",
          selectedGrade ? "min-h-[280px] overflow-hidden" : "overflow-visible"
        )}>
          {/* Expanded Grade View */}
          {selectedGrade && (
            <div 
              className={cn(
                "absolute inset-0 z-10 rounded-xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                selectedGrade.bg,
                selectedGrade.border
              )}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={cn(
                  "absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10",
                  selectedGrade.border.replace("border-", "bg-")
                )} />
                <div className={cn(
                  "absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-10",
                  selectedGrade.border.replace("border-", "bg-")
                )} />
              </div>

              <button
                onClick={() => setSelectedGrade(null)}
                className={cn(
                  "absolute top-4 right-4 p-2 rounded-full z-20 transition-all duration-200",
                  "hover:bg-white/10 hover:scale-110",
                  selectedGrade.border
                )}
              >
                <X className={cn("w-5 h-5", selectedGrade.text)} />
              </button>

              <div className="relative h-full flex flex-col p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center shrink-0",
                    selectedGrade.color,
                    "shadow-lg"
                  )}>
                    <span className="text-3xl font-black text-white">{selectedGrade.grade}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("text-3xl font-bold tracking-tight mb-2", selectedGrade.text)}>
                      Grade {selectedGrade.grade}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-sm font-medium px-3 py-1",
                        selectedGrade.border,
                        selectedGrade.text
                      )}
                    >
                      {selectedGrade.name}
                    </Badge>
                  </div>
                </div>

                <div className={cn(
                  "h-px w-full mb-6",
                  selectedGrade.border.replace("border-", "bg-"),
                  "opacity-40"
                )} />

                <div className="flex-1 flex items-start gap-4">
                  <Quote className={cn("w-8 h-8 shrink-0 opacity-40 mt-1", selectedGrade.text)} />
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed font-light text-foreground/90">
                      {selectedGrade.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground text-center">
                    Press the X button to return to the grid
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Grade Grid */}
          <div className={cn(
            "transition-opacity duration-200",
            selectedGrade ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">Grade Scale</h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
              {GRADES.map((grade) => (
                <button
                  key={grade.grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={cn(
                    "relative p-2 sm:p-3 rounded-lg sm:rounded-xl border sm:border-2 transition-all duration-200",
                    "cursor-pointer flex flex-col items-center justify-center gap-0.5 sm:gap-1",
                    "hover:brightness-110 active:scale-95",
                    "focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-offset-1 sm:focus:ring-offset-2 focus:ring-offset-background",
                    grade.bg,
                    grade.border
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded sm:rounded-lg flex items-center justify-center",
                    grade.color,
                    "shadow-md"
                  )}>
                    <span className="text-base sm:text-xl font-black text-white">{grade.grade}</span>
                  </div>
                  <span className={cn("text-[8px] sm:text-[10px] font-medium text-center leading-tight", grade.text)}>
                    {grade.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-6" />

        {/* Stat Categories - Now using data from unified stats system */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Stat Categories</h4>
          
          {PHYSICAL_CATEGORIES.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.key] || Sword;
            const iconColor = CATEGORY_ICON_COLORS[category.key] || "from-gray-500 to-gray-600";
            
            return (
              <div key={category.key} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    iconColor
                  )}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-foreground">{category.label}</h5>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                {/* Subcategory Grids */}
                <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {category.subcategories.map((subcat) => {
                    const isExpanded = selectedStat?.categoryKey === category.key && selectedStat?.subcatKey === subcat.key;
                    const expandedGrade = isExpanded ? getGradeInfo(selectedStat.grade) : null;
                    
                    return (
                      <div 
                        key={subcat.key}
                        className={cn(
                          "relative rounded-lg sm:rounded-xl border p-2 sm:p-3 md:p-4 transition-all duration-200 min-h-[160px] sm:min-h-[180px]",
                          isExpanded ? "overflow-hidden" : "bg-muted/20 overflow-visible"
                        )}
                      >
                        {/* Expanded View - fills entire card */}
                        {isExpanded && expandedGrade && (
                          <div 
                            className={cn(
                              "absolute inset-0 z-10 rounded-xl border-2 p-4 animate-in fade-in zoom-in-95 duration-200",
                              expandedGrade.bg,
                              expandedGrade.border
                            )}
                          >
                            {/* Close button */}
                            <button
                              onClick={() => setSelectedStat(null)}
                              className={cn(
                                "absolute top-2 right-2 p-1.5 rounded-full z-20 transition-all duration-200",
                                "hover:bg-white/10 hover:scale-110",
                                expandedGrade.border
                              )}
                            >
                              <X className={cn("w-4 h-4", expandedGrade.text)} />
                            </button>

                            {/* Content */}
                            <div className="h-full flex flex-col">
                              {/* Header */}
                              <div className="flex items-center gap-3 mb-3">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                  expandedGrade.color,
                                  "shadow-md"
                                )}>
                                  <span className="text-lg font-black text-white">{selectedStat.grade}</span>
                                </div>
                                <div>
                                  <h6 className={cn("font-bold text-sm", expandedGrade.text)}>{subcat.label}</h6>
                                  <span className="text-xs text-muted-foreground">{expandedGrade.name}</span>
                                </div>
                              </div>

                              {/* Divider */}
                              <div className={cn(
                                "h-px w-full mb-3",
                                expandedGrade.border.replace("border-", "bg-"),
                                "opacity-40"
                              )} />

                              {/* Description - pulled from unified stats system */}
                              <div className="flex-1 overflow-y-auto">
                                <p className="text-xs leading-relaxed text-foreground/90">
                                  {getStatGradeDescription(subcat.key, selectedStat.grade)}
                                </p>
                              </div>

                              {/* Footer hint */}
                              <div className="mt-3 pt-2 border-t border-white/10">
                                <p className="text-[10px] text-muted-foreground text-center">
                                  Press X to close
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Normal View */}
                        <div className={cn(
                          "transition-opacity duration-200 h-full flex flex-col",
                          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                        )}>
                          <div className="min-h-[60px] sm:min-h-[72px]">
                            <h6 className="font-semibold text-foreground">{subcat.label}</h6>
                            <p className="text-xs text-muted-foreground">{subcat.description}</p>
                          </div>
                          
                          {/* Divider */}
                          <div className="h-px w-full bg-border/50 my-2 sm:my-3" />
                          
                          {/* Grade buttons for this substat */}
                          <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mt-auto">
                            {GRADES.map((grade) => (
                              <button
                                key={grade.grade}
                                onClick={() => setSelectedStat({ 
                                  categoryKey: category.key, 
                                  subcatKey: subcat.key, 
                                  grade: grade.grade 
                                })}
                                className={cn(
                                  "p-1 sm:p-1.5 rounded-lg sm:rounded-xl border sm:border-2 transition-all duration-200",
                                  "cursor-pointer flex flex-col items-center justify-center",
                                  "hover:brightness-110 active:scale-95",
                                  "focus:outline-none focus:ring-1 focus:ring-offset-1",
                                  grade.bg,
                                  grade.border
                                )}
                              >
                                <div className={cn(
                                  "w-full aspect-square rounded sm:rounded-lg flex items-center justify-center",
                                  grade.color,
                                  "shadow-sm"
                                )}>
                                  <span className="text-[10px] sm:text-xs font-bold text-white">{grade.grade}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
