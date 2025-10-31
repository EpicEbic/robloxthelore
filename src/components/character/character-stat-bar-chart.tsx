import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CharacterCombatStyleSwitcher } from "./character-combat-style-switcher";
import { CombatStyleOption } from "@/types/wiki-types";

interface StatGrade {
  label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
  value: number; // 0-7 for easier programming
}

interface CharacterStats {
  offense: StatGrade;
  defense: StatGrade;
  utility: StatGrade;
  potential: StatGrade;
}

interface CombatStats {
  strength: StatGrade;
  durability: StatGrade;
  agility: StatGrade;
  precision: StatGrade;
  intelligence: StatGrade;
  subcategories?: {
    penetration?: StatGrade;
    strength?: StatGrade;
    intensity?: StatGrade;
    swiftness?: StatGrade;
    endurance?: StatGrade;
    flexibility?: StatGrade;
    accuracy?: StatGrade;
    reactivity?: StatGrade;
    dexterity?: StatGrade;
    tactility?: StatGrade;
    wisdom?: StatGrade;
    stability?: StatGrade;
    vitality?: StatGrade;
    toughness?: StatGrade;
    resistance?: StatGrade;
  };
}

interface CharacterStatBarChartProps {
  stats: CharacterStats | CombatStats;
  characterId?: string;
  abilityName?: string;
  className?: string;
  isPhysicalStats?: boolean;
  currentCombatStyle?: string;
  combatStyles?: CombatStyleOption[];
  onCombatStyleChange?: (styleId: string) => void;
}

const GRADE_VALUES = {
  "F": 0,
  "E": 1,
  "D": 2,
  "C": 3,
  "B": 4,
  "A": 5,
  "S": 6,
  "Ø": 7
} as const;

// Check if stats is CombatStats (5 stats) or CharacterStats (4 stats)
function isCombatStats(stats: CharacterStats | CombatStats): stats is CombatStats {
  return 'strength' in stats;
}

const PHYSICAL_SUBCATEGORIES = [
  // Strength subcategories
  { key: 'penetration', label: 'Penetration', category: 'Strength', stat: 'strength' },
  { key: 'strength', label: 'Strength', category: 'Strength', stat: 'strength' },
  { key: 'intensity', label: 'Intensity', category: 'Strength', stat: 'strength' },
  // Agility subcategories
  { key: 'swiftness', label: 'Swiftness', category: 'Agility', stat: 'agility' },
  { key: 'endurance', label: 'Endurance', category: 'Agility', stat: 'agility' },
  { key: 'flexibility', label: 'Flexibility', category: 'Agility', stat: 'agility' },
  // Precision subcategories
  { key: 'accuracy', label: 'Accuracy', category: 'Precision', stat: 'precision' },
  { key: 'reactivity', label: 'Reactivity', category: 'Precision', stat: 'precision' },
  { key: 'dexterity', label: 'Dexterity', category: 'Precision', stat: 'precision' },
  // Intelligence subcategories
  { key: 'tactility', label: 'Tactility', category: 'Intelligence', stat: 'intelligence' },
  { key: 'wisdom', label: 'Wisdom', category: 'Intelligence', stat: 'intelligence' },
  { key: 'stability', label: 'Stability', category: 'Intelligence', stat: 'intelligence' },
  // Durability subcategories
  { key: 'vitality', label: 'Vitality', category: 'Durability', stat: 'durability' },
  { key: 'toughness', label: 'Toughness', category: 'Durability', stat: 'durability' },
  { key: 'resistance', label: 'Resistance', category: 'Durability', stat: 'durability' }
];

const MAIN_CATEGORIES = [
  { 
    name: 'Strength', 
    description: "Measures a character's offensive capabilities through physical power and combat effectiveness.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Strength').map(subcat => ({
      ...subcat,
      description: {
        penetration: "The amount of armor or other lines of defense that a Bloxian can penetrate with their attacks.",
        strength: "The raw physical potential of a Bloxian, as well as their lifting capacity.",
        intensity: "How relentless and pressuring a Bloxian is when in combat."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Agility', 
    description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Agility').map(subcat => ({
      ...subcat,
      description: {
        swiftness: "How quickly a Bloxian can move, as well as how quickly they can reach that speed.",
        endurance: "The amount of general stamina a Bloxian has, as well as how quickly they burn through it.",
        flexibility: "How easily and gracefully a Bloxian can weave, bend, and maneuver themselves through fast or complicated attacks."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Precision', 
    description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Precision').map(subcat => ({
      ...subcat,
      description: {
        accuracy: "How good a Bloxian is at connecting their attacks, especially when attacking from a distance.",
        reactivity: "How sharp a Bloxian's reflexes are, and how good they are at counteracting with their reflexes.",
        dexterity: "A Bloxian's motor control, primarily how steady and quick their hands are, especially under stress."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Intelligence', 
    description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Intelligence').map(subcat => ({
      ...subcat,
      description: {
        tactility: "How intelligent a Bloxian is in combat situations, including their ability to think quickly, plan ahead, and remain cool under pressure.",
        wisdom: "The general intelligence and clarity of Bloxians, specifically outside of combat situations.",
        stability: "How mentally sane or stable a Bloxian is, including how resistant they are to mental manipulation."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Durability', 
    description: "Represents a character's defensive capabilities and resistance to damage.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Durability').map(subcat => ({
      ...subcat,
      description: {
        vitality: "The overall physical health of a Bloxian, accounting for their fitness and any conditions they may have.",
        toughness: "The amount and intensity of physical injuries a Bloxian can sustain before becoming incapacitated.",
        resistance: "How well a Bloxian can tolerate environmental hazards and status conditions, such as heat, electricity, and poison."
      }[subcat.key] || ""
    }))
  }
];

export function CharacterStatBarChart({ 
  stats, 
  characterId, 
  abilityName, 
  className,
  isPhysicalStats = false,
  currentCombatStyle,
  combatStyles,
  onCombatStyleChange
}: CharacterStatBarChartProps) {
  const isCombat = isCombatStats(stats);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Check if current combat style should pulse between white and purple
  const shouldPulse = isPhysicalStats && 
    (currentCombatStyle === "chronipulation-mag-num" || 
     currentCombatStyle === "chronipulation-amplification-gauntlet");

  // Get color class
  const getChartColorClass = () => {
    if (isPhysicalStats) {
      return shouldPulse 
        ? "stat-chart-physical-white stat-chart-pulse-purple" 
        : "stat-chart-physical-white";
    }
    if (characterId === "vortex-a-steele") {
      return "stat-chart-vortex";
    }
    if (characterId === "caesar-bloxwright") {
      return "stat-chart-caesar";
    }
    return "stat-chart-default";
  };

  // Get stat value for a subcategory
  const getSubcategoryStat = (subcatKey: string, mainCategoryStat: StatGrade): StatGrade => {
    if (!isCombat) return mainCategoryStat;
    const subcategoryStats = (stats as CombatStats).subcategories;
    const subcategoryStat = subcategoryStats?.[subcatKey as keyof typeof subcategoryStats];
    return subcategoryStat || mainCategoryStat;
  };

  // Render a single stat bar
  const renderStatBar = (label: string, stat: StatGrade, description?: string, isSubcategory: boolean = false) => {
    const statValue = GRADE_VALUES[stat.label];
    const barWidth = `${(statValue / 7) * 100}%`;
    
    return (
      <div className={cn("flex flex-col gap-0.5", isSubcategory && "ml-4")}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col gap-0">
            <span 
              className={cn(
                "font-medium",
                isSubcategory ? "text-xs" : "font-semibold text-xs"
              )}
              style={{
                color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
              }}
            >
              {label}
            </span>
            {description && (
              <span 
                className="text-[10px] leading-tight opacity-70"
                style={{
                  color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                  textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)' : undefined
                }}
              >
                {description}
              </span>
            )}
          </div>
          <span 
            className="font-bold text-sm"
            style={{
              color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
              textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
            }}
          >
            {stat.label}
          </span>
        </div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              shouldPulse ? "bg-current" : (isPhysicalStats ? "bg-white" : "bg-primary")
            )}
            style={{
              width: barWidth,
              opacity: shouldPulse ? undefined : (isPhysicalStats ? 0.9 : undefined)
            }}
          />
        </div>
      </div>
    );
  };

  if (!isCombat) {
    // For non-combat stats (ability stats), render simple bar chart
    return (
      <div className={cn("flex justify-center items-center p-4", className)}>
        <div className={cn(
          "bg-card/80 backdrop-blur-sm rounded-2xl p-6 border stat-chart-container w-full max-w-md",
          getChartColorClass()
        )}>
          <h3 className="text-xl font-bold mb-6 text-center stat-chart-title">
            {abilityName ? `${abilityName} Statistics` : "Ability Statistics"}
          </h3>
          <div className="space-y-4">
            {Object.entries(stats).map(([key, stat]) => (
              <div key={key}>
                {renderStatBar(key.charAt(0).toUpperCase() + key.slice(1), stat)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center items-center p-4", className)}>
      <div 
        className={cn(
          "bg-card/80 backdrop-blur-sm rounded-2xl p-6 border stat-chart-container w-full max-w-4xl",
          getChartColorClass()
        )}
      >
        {/* Title with help icon and combat style switcher */}
        <div className={`flex flex-col gap-4 mb-6 ${shouldPulse ? 'pulse-container' : ''}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2 flex-1">
              <h3 
                className={`text-xl font-bold text-center stat-chart-title ${isPhysicalStats ? 'physical-stats-title' : ''}`}
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  letterSpacing: '0.025em',
                  ...(shouldPulse ? {
                    color: 'currentColor'
                  } : (isPhysicalStats ? { 
                    color: '#ffffff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                  } : {}))
                }}
              >
                Physical Statistics
              </h3>
              {isPhysicalStats && (
                <TooltipProvider>
                  <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="flex-shrink-0"
                        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                      >
                        <HelpCircle 
                          className="h-5 w-5 no-pulse"
                          style={{
                          color: '#ffffff',
                          stroke: '#ffffff',
                          fill: 'none',
                          filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))',
                          animation: 'none'
                        }}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <p className="text-sm leading-relaxed">
                        By default, physical statistics do <strong>NOT</strong> account for the ability of a character if they have one. This is only their raw physical potential!
                        
                        <br /><br />
                        
                        Certain scenarios or combat styles that incorporate a character's ability may make this incorrect, please be aware!
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {isPhysicalStats && combatStyles && combatStyles.length > 1 && (
              <div className="flex-shrink-0 min-w-0 flex-1 max-w-xs relative">
                <CharacterCombatStyleSwitcher
                  combatStyles={combatStyles}
                  currentStyle={currentCombatStyle || combatStyles[0].id}
                  onStyleChange={onCombatStyleChange || (() => {})}
                  align="right"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Bar Chart */}
        <div className="flex flex-col gap-4">
          {MAIN_CATEGORIES.map((category) => {
            const mainCategoryStat = stats[category.name.toLowerCase() as keyof CombatStats] as StatGrade;
            
            return (
              <div key={category.name} className="space-y-2">
                        {/* Main Category Label */}
                        <div className="flex flex-col gap-0.5 pb-1.5 border-b border-border/50">
                          <div className="flex items-center gap-2">
                            <h4 
                              className="text-sm font-extrabold"
                              style={{
                                color: shouldPulse ? 'currentColor' : (isPhysicalStats ? '#ffffff' : undefined),
                                textShadow: isPhysicalStats ? '1px 1px 2px rgba(0, 0, 0, 0.6)' : undefined
                              }}
                            >
                              {category.name}
                            </h4>
                          </div>
                  {category.description && (
                    <p 
                      className="text-[10px] leading-tight opacity-70"
                      style={{
                        color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                        textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)' : undefined
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>
                
                {/* Subcategory Bars */}
                <div className="space-y-2 pl-2">
                  {category.subcategories.map((subcat) => {
                    const subcategoryStat = getSubcategoryStat(subcat.key, mainCategoryStat);
                    const subcatDescription = (subcat as any).description;
                    return (
                      <div key={subcat.key}>
                        {renderStatBar(subcat.label, subcategoryStat, subcatDescription, true)}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Information Segment */}
        <div className="flex flex-col items-center gap-4 w-full px-4 py-4 mt-6">
          <p 
            className="text-center text-sm"
            style={{
              color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '#a855f7' : undefined)),
              textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
            }}
          >
            Curious about the meaning of a specific grade or statistic? Click the button to visit the Statistics page to learn more!
          </p>
          <Link to="/statistics">
            <Button 
              variant="outline"
              className="font-medium"
              style={{
                color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                borderColor: shouldPulse ? undefined : (isPhysicalStats ? 'rgba(255, 255, 255, 0.3)' : undefined),
              }}
            >
              Visit Statistics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

