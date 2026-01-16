/**
 * Stats System - Helper Functions
 * 
 * Unified helper functions for creating stats objects and looking up descriptions.
 * These replace the scattered helper functions across the codebase.
 */

import type { 
  GradeLabel, 
  StatGrade, 
  PhysicalStats, 
  PhysicalSubcategoryKey,
  AbilityStats,
  AbilitySubcategoryKey,
  StatDomain
} from "./types";
import { GRADE_VALUES } from "./grades";
import { 
  getPhysicalStatDescription, 
  getPhysicalStatDefinition,
  getPhysicalSubcategory 
} from "./physical-stats";
import { 
  getAbilityStatDescription, 
  getAbilityStatDefinition,
  getAbilitySubcategory 
} from "./ability-stats";

// =============================================================================
// STAT CREATION HELPERS
// =============================================================================

/**
 * Create a StatGrade object from a grade label
 */
export function createStatGrade(grade: GradeLabel): StatGrade {
  return {
    label: grade,
    value: GRADE_VALUES[grade]
  };
}

/**
 * Create physical (combat) stats from grade labels
 * 
 * @param strength - Main strength grade
 * @param durability - Main durability grade
 * @param agility - Main agility grade
 * @param precision - Main precision grade
 * @param intelligence - Main intelligence grade
 * @param subcategories - Optional object with subcategory-specific grades
 */
export function createPhysicalStats(
  strength: GradeLabel,
  durability: GradeLabel,
  agility: GradeLabel,
  precision: GradeLabel,
  intelligence: GradeLabel,
  subcategories?: Partial<Record<PhysicalSubcategoryKey, GradeLabel>>
): PhysicalStats {
  const stats: PhysicalStats = {
    strength: createStatGrade(strength),
    durability: createStatGrade(durability),
    agility: createStatGrade(agility),
    precision: createStatGrade(precision),
    intelligence: createStatGrade(intelligence)
  };
  
  if (subcategories) {
    const subcategoryStats: Partial<Record<PhysicalSubcategoryKey, StatGrade>> = {};
    for (const [key, grade] of Object.entries(subcategories)) {
      if (grade) {
        subcategoryStats[key as PhysicalSubcategoryKey] = createStatGrade(grade);
      }
    }
    stats.subcategories = subcategoryStats;
  }
  
  return stats;
}

/**
 * Alias for createPhysicalStats for backward compatibility
 */
export const createCombatStats = createPhysicalStats;

/**
 * Create ability stats from grade labels
 * 
 * @param offense - Main offense grade
 * @param defense - Main defense grade
 * @param utility - Main utility grade
 * @param potential - Main potential grade
 * @param subcategories - Optional object with subcategory-specific grades
 */
export function createAbilityStats(
  offense: GradeLabel,
  defense: GradeLabel,
  utility: GradeLabel,
  potential: GradeLabel,
  subcategories?: Partial<Record<AbilitySubcategoryKey, GradeLabel>>
): AbilityStats {
  const stats: AbilityStats = {
    offense: createStatGrade(offense),
    defense: createStatGrade(defense),
    utility: createStatGrade(utility),
    potential: createStatGrade(potential)
  };
  
  if (subcategories) {
    const subcategoryStats: Partial<Record<AbilitySubcategoryKey, StatGrade>> = {};
    for (const [key, grade] of Object.entries(subcategories)) {
      if (grade) {
        subcategoryStats[key as AbilitySubcategoryKey] = createStatGrade(grade);
      }
    }
    stats.subcategories = subcategoryStats;
  }
  
  return stats;
}

/**
 * Alias for createAbilityStats for backward compatibility
 */
export const createCharacterStats = createAbilityStats;

// =============================================================================
// DESCRIPTION LOOKUP HELPERS
// =============================================================================

/**
 * Get the grade description for a stat
 * 
 * This is the main function to use for looking up what a grade means for a specific stat.
 * It automatically handles the distinction between physical and ability stats.
 * 
 * @param statKey - The stat key (e.g., "power", "toughness", "guard")
 * @param grade - The grade label (e.g., "B", "A", "S")
 * @param domain - Which stat domain: "physical" or "ability"
 */
export function getStatDescription(
  statKey: string, 
  grade: GradeLabel, 
  domain: StatDomain
): string {
  if (domain === "physical") {
    return getPhysicalStatDescription(statKey, grade);
  } else {
    return getAbilityStatDescription(statKey, grade);
  }
}

/**
 * Get the stat definition (what the stat measures)
 * 
 * @param statKey - The stat key (e.g., "power", "toughness", "guard")
 * @param domain - Which stat domain: "physical" or "ability"
 */
export function getStatDefinition(
  statKey: string, 
  domain: StatDomain
): string {
  if (domain === "physical") {
    return getPhysicalStatDefinition(statKey);
  } else {
    return getAbilityStatDefinition(statKey);
  }
}

/**
 * Get both the stat definition and grade description together
 * 
 * Useful for displaying expanded stat information.
 * 
 * @param statKey - The stat key (e.g., "power", "toughness", "guard")
 * @param grade - The grade label (e.g., "B", "A", "S")
 * @param domain - Which stat domain: "physical" or "ability"
 */
export function getStatFullInfo(
  statKey: string, 
  grade: GradeLabel, 
  domain: StatDomain
): { definition: string; gradeDescription: string } {
  return {
    definition: getStatDefinition(statKey, domain),
    gradeDescription: getStatDescription(statKey, grade, domain)
  };
}

// =============================================================================
// STAT LOOKUP HELPERS
// =============================================================================

/**
 * Get a subcategory's stat grade, falling back to the main category if not defined
 */
export function getSubcategoryGrade(
  stats: PhysicalStats | AbilityStats,
  subcategoryKey: string,
  mainCategoryKey: string
): StatGrade {
  // Try to get the subcategory-specific grade
  const subcatGrade = stats.subcategories?.[subcategoryKey as keyof typeof stats.subcategories];
  if (subcatGrade) {
    return subcatGrade;
  }
  
  // Fall back to the main category grade
  const mainGrade = (stats as any)[mainCategoryKey] as StatGrade | undefined;
  if (mainGrade) {
    return mainGrade;
  }
  
  // Default to F if nothing found
  return createStatGrade("F");
}

/**
 * Check if a stat key is a physical stat subcategory
 */
export function isPhysicalSubcategory(statKey: string): boolean {
  return getPhysicalSubcategory(statKey) !== undefined;
}

/**
 * Check if a stat key is an ability stat subcategory
 */
export function isAbilitySubcategory(statKey: string): boolean {
  return getAbilitySubcategory(statKey) !== undefined;
}

/**
 * Get the parent category key for a subcategory
 */
export function getParentCategoryKey(
  statKey: string, 
  domain: StatDomain
): string | undefined {
  if (domain === "physical") {
    const result = getPhysicalSubcategory(statKey);
    return result?.category.key;
  } else {
    const result = getAbilitySubcategory(statKey);
    return result?.category.key;
  }
}

