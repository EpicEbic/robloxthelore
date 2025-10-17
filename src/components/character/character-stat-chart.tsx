import React from "react";
import { cn } from "@/lib/utils";

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
}

export type { CharacterStats, CombatStats };

interface CharacterStatChartProps {
  stats: CharacterStats;
  characterId?: string;
  abilityName?: string;
  className?: string;
}

interface CombatStatChartProps {
  stats: CombatStats;
  characterId?: string;
  className?: string;
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

const STAT_LABELS = {
  offense: "Offense",
  defense: "Defense", 
  utility: "Utility",
  potential: "Potential"
} as const;

const COMBAT_STAT_LABELS = {
  strength: "Strength",
  durability: "Durability",
  agility: "Agility",
  precision: "Precision",
  intelligence: "Intelligence"
} as const;

export function CharacterStatChart({ stats, characterId, abilityName, className }: CharacterStatChartProps) {
  // Use character-specific stat bar colors
  const getChartColorClass = () => {
    if (characterId === "vortex-a-steele") {
      return "stat-chart-vortex";
    }
    if (characterId === "caesar-bloxwright") {
      return "stat-chart-caesar";
    }
    return "stat-chart-default";
  };

  const renderStatBar = (statKey: keyof CharacterStats) => {
    const stat = stats[statKey];
    const statValue = GRADE_VALUES[stat.label];
    
    return (
      <div key={statKey} className="flex items-center gap-2 sm:gap-3">
        <div className="text-xs sm:text-sm font-medium w-12 sm:w-16 text-right">
          {STAT_LABELS[statKey]}
        </div>
        
        <div className="flex-1 flex items-center gap-1 sm:gap-2">
          {/* Stat bars */}
          <div className="flex gap-0.5 sm:gap-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-2 sm:w-4 sm:h-3 rounded-sm border transition-all duration-500 ease-out",
                  index <= statValue
                    ? "stat-bar-filled opacity-100 animate-scale-in"
                    : "stat-bar-empty opacity-30"
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              />
            ))}
          </div>
          
          {/* Grade label */}
          <div className="text-base sm:text-lg font-bold stat-grade-text min-w-[20px] sm:min-w-[24px] text-center animate-fade-in">
            {stat.label}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("stat-chart flex justify-center", getChartColorClass(), className)}>
      <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border stat-chart-container w-full max-w-md">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center stat-chart-title">
          {abilityName ? `${abilityName} Statistics` : "Ability Statistics"}
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          {(Object.keys(STAT_LABELS) as Array<keyof CharacterStats>).map((statKey) =>
            renderStatBar(statKey)
          )}
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 border-t border-border/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 text-xs text-muted-foreground text-center">
            <span className="text-xs sm:text-xs">Ø = Omnipotent</span>
            <span className="text-xs sm:text-xs">S = Supreme</span>
            <span className="text-xs sm:text-xs">A = Amazing</span>
            <span className="text-xs sm:text-xs">B = Better</span>
            <span className="text-xs sm:text-xs">C = Competent</span>
            <span className="text-xs sm:text-xs">D = Deficient</span>
            <span className="text-xs sm:text-xs">E = Egregious</span>
            <span className="text-xs sm:text-xs">F = Failing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CombatStatChart({ stats, characterId, className }: CombatStatChartProps) {
  // Use default chart color scheme for all characters
  const getChartColorClass = () => {
    return "stat-chart-default";
  };

  const renderStatBar = (statKey: keyof CombatStats) => {
    const stat = stats[statKey];
    const statValue = GRADE_VALUES[stat.label];
    
    return (
      <div key={statKey} className="flex items-center gap-2 sm:gap-3">
        <div className="text-xs sm:text-sm font-medium w-12 sm:w-16 text-right">
          {COMBAT_STAT_LABELS[statKey]}
        </div>
        
        <div className="flex-1 flex items-center gap-1 sm:gap-2">
          {/* Stat bars */}
          <div className="flex gap-0.5 sm:gap-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-2 sm:w-4 sm:h-3 rounded-sm border transition-all duration-500 ease-out",
                  index <= statValue
                    ? "stat-bar-filled opacity-100 animate-scale-in"
                    : "stat-bar-empty opacity-30"
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              />
            ))}
          </div>
          
          {/* Grade label */}
          <div className="text-base sm:text-lg font-bold stat-grade-text min-w-[20px] sm:min-w-[24px] text-center animate-fade-in">
            {stat.label}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("stat-chart flex justify-center", getChartColorClass(), className)}>
      <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border stat-chart-container w-full max-w-md">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center stat-chart-title">
          Physical Statistics
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          {(Object.keys(COMBAT_STAT_LABELS) as Array<keyof CombatStats>).map((statKey) =>
            renderStatBar(statKey)
          )}
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 border-t border-border/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 text-xs text-muted-foreground text-center">
            <span className="text-xs sm:text-xs">Ø = Omnipotent</span>
            <span className="text-xs sm:text-xs">S = Supreme</span>
            <span className="text-xs sm:text-xs">A = Amazing</span>
            <span className="text-xs sm:text-xs">B = Better</span>
            <span className="text-xs sm:text-xs">C = Competent</span>
            <span className="text-xs sm:text-xs">D = Deficient</span>
            <span className="text-xs sm:text-xs">E = Egregious</span>
            <span className="text-xs sm:text-xs">F = Failing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to create stats object easily
export function createCharacterStats(
  offense: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F",
  defense: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F", 
  utility: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F",
  potential: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"
): CharacterStats {
  return {
    offense: { label: offense, value: GRADE_VALUES[offense] },
    defense: { label: defense, value: GRADE_VALUES[defense] },
    utility: { label: utility, value: GRADE_VALUES[utility] },
    potential: { label: potential, value: GRADE_VALUES[potential] }
  };
}

// Helper function to create combat stats object easily
export function createCombatStats(
  strength: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F",
  durability: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F",
  agility: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F",
  precision: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F",
  intelligence: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"
): CombatStats {
  return {
    strength: { label: strength, value: GRADE_VALUES[strength] },
    durability: { label: durability, value: GRADE_VALUES[durability] },
    agility: { label: agility, value: GRADE_VALUES[agility] },
    precision: { label: precision, value: GRADE_VALUES[precision] },
    intelligence: { label: intelligence, value: GRADE_VALUES[intelligence] }
  };
}