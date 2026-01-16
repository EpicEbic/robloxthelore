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
  PhysicalSubcategoryKey
} from "./types";
import { GRADE_VALUES } from "./grades";
import { 
  getPhysicalStatDescription, 
  getPhysicalStatDefinition,
  getPhysicalSubcategory 
} from "./physical-stats";

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

// =============================================================================
// DESCRIPTION LOOKUP HELPERS
// =============================================================================

/**
 * Get the grade description for a stat
 * 
 * This is the main function to use for looking up what a grade means for a specific stat.
 * 
 * @param statKey - The stat key (e.g., "power", "toughness")
 * @param grade - The grade label (e.g., "B", "A", "S")
 */
export function getStatDescription(
  statKey: string, 
  grade: GradeLabel
): string {
  return getPhysicalStatDescription(statKey, grade);
}

/**
 * Get the stat definition (what the stat measures)
 * 
 * @param statKey - The stat key (e.g., "power", "toughness")
 */
export function getStatDefinition(statKey: string): string {
  return getPhysicalStatDefinition(statKey);
}

/**
 * Get both the stat definition and grade description together
 * 
 * Useful for displaying expanded stat information.
 * 
 * @param statKey - The stat key (e.g., "power", "toughness")
 * @param grade - The grade label (e.g., "B", "A", "S")
 */
export function getStatFullInfo(
  statKey: string, 
  grade: GradeLabel
): { definition: string; gradeDescription: string } {
  return {
    definition: getStatDefinition(statKey),
    gradeDescription: getStatDescription(statKey, grade)
  };
}

// =============================================================================
// STAT LOOKUP HELPERS
// =============================================================================

/**
 * Get a subcategory's stat grade, falling back to the main category if not defined
 */
export function getSubcategoryGrade(
  stats: PhysicalStats,
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
 * Get the parent category key for a subcategory
 */
export function getParentCategoryKey(statKey: string): string | undefined {
  const result = getPhysicalSubcategory(statKey);
  return result?.category.key;
}
