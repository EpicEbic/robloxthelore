/**
 * @deprecated This file is deprecated. Import from @/lib/stats instead.
 * 
 * All stat constants, types, and helpers have been moved to the unified stats system:
 * 
 * import { 
 *   GRADE_VALUES,
 *   GRADE_COLORS,
 *   PHYSICAL_CATEGORIES,
 *   ABILITY_CATEGORIES,
 *   // ...etc
 * } from "@/lib/stats";
 * 
 * This file re-exports from the new location for backward compatibility.
 */

// Re-export everything from the unified stats system for backward compatibility
export {
  // Grade constants
  GRADE_VALUES,
  GRADE_LABELS,
  GRADE_COLORS,
  GRADE_NAMES,
  
  // Grade type
  type GradeLabel,
  type StatGrade,
  
  // Physical stats
  PHYSICAL_CATEGORIES,
  PHYSICAL_STAT_DESCRIPTIONS,
  type PhysicalStats,
  type PhysicalCategoryKey,
  type PhysicalSubcategoryKey,
  
  // Ability stats  
  ABILITY_CATEGORIES,
  ABILITY_STAT_DESCRIPTIONS,
  type AbilityStats,
  type AbilityCategoryKey,
  type AbilitySubcategoryKey,
  
  // Helper functions
  createPhysicalStats,
  createCombatStats,
  createAbilityStats,
  createCharacterStats,
  getStatDescription,
  getStatDefinition,
  getStatFullInfo
} from "@/lib/stats";

// Legacy alias - maps old name to new export
// The old STAT_GRADE_DESCRIPTIONS combined physical and ability descriptions
// Now you should use PHYSICAL_STAT_DESCRIPTIONS or ABILITY_STAT_DESCRIPTIONS
import { PHYSICAL_STAT_DESCRIPTIONS, ABILITY_STAT_DESCRIPTIONS } from "@/lib/stats";

/**
 * @deprecated Use PHYSICAL_STAT_DESCRIPTIONS or ABILITY_STAT_DESCRIPTIONS instead.
 * This merged object is provided only for backward compatibility.
 */
export const STAT_GRADE_DESCRIPTIONS = {
  ...PHYSICAL_STAT_DESCRIPTIONS,
  // For ability stats, provide both prefixed and non-prefixed versions for compatibility
  ...ABILITY_STAT_DESCRIPTIONS,
  "ability-power": ABILITY_STAT_DESCRIPTIONS.power,
  "ability-penetration": ABILITY_STAT_DESCRIPTIONS.penetration,
};
