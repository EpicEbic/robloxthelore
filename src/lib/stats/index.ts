/**
 * Stats System - Main Entry Point
 * 
 * This module provides a unified, consistent stats system for the wiki.
 * 
 * ## Architecture
 * 
 * The stats system is divided into two domains:
 * 1. **Physical Stats** - Measure a character's raw physical capabilities
 *    - Categories: Strength, Durability, Agility, Precision, Intelligence
 *    - Each category has 4 subcategories (20 total subcategories)
 * 
 * 2. **Ability Stats** - Measure the power and versatility of abilities
 *    - Categories: Offense, Defense, Utility, Potential
 *    - Offense, Defense, and Utility have 3 subcategories each (9 total)
 *    - Potential has no subcategories
 * 
 * ## Grades
 * 
 * All stats use the same grading system:
 * - F (0) = Failing
 * - E (1) = Egregious  
 * - D (2) = Deficient
 * - C (3) = Competent
 * - B (4) = Better
 * - A (5) = Amazing
 * - S (6) = Supreme
 * - Ø (7) = Omnipotent
 * 
 * ## Usage
 * 
 * ```typescript
 * import { 
 *   createPhysicalStats, 
 *   createAbilityStats,
 *   getStatDescription,
 *   GRADE_COLORS 
 * } from "@/lib/stats";
 * 
 * // Create stats for a character
 * const combatStats = createPhysicalStats("B", "B", "E", "D", "E", {
 *   power: "B",
 *   lift: "B",
 *   penetration: "C"
 * });
 * 
 * // Get description for a grade
 * const desc = getStatDescription("power", "B", "physical");
 * // => "This Bloxian's power enables them to destroy entire buildings through their fists alone."
 * ```
 */

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
  GradeLabel,
  StatGrade,
  GradeColors,
  SubcategoryDefinition,
  CategoryDefinition,
  PhysicalCategoryKey,
  PhysicalSubcategoryKey,
  PhysicalStats,
  AbilityCategoryKey,
  AbilitySubcategoryKey,
  AbilityStats,
  StatDomain,
  AnyStatKey,
  GradeDescriptions,
  StatDescriptionMap
} from "./types";

// =============================================================================
// GRADE EXPORTS
// =============================================================================

export {
  GRADE_VALUES,
  GRADE_LABELS,
  GRADE_COLORS,
  GRADE_NAMES,
  getGradeValue,
  getGradeColors,
  getGradeName,
  isValidGrade,
  getGradePercentage
} from "./grades";

// =============================================================================
// PHYSICAL STAT EXPORTS
// =============================================================================

export {
  PHYSICAL_CATEGORIES,
  PHYSICAL_STAT_DESCRIPTIONS,
  getPhysicalCategory,
  getPhysicalSubcategory,
  getPhysicalStatDescription,
  getPhysicalStatDefinition
} from "./physical-stats";

// =============================================================================
// ABILITY STAT EXPORTS
// =============================================================================

export {
  ABILITY_CATEGORIES,
  ABILITY_STAT_DESCRIPTIONS,
  getAbilityCategory,
  getAbilitySubcategory,
  getAbilityStatDescription,
  getAbilityStatDefinition
} from "./ability-stats";

// =============================================================================
// HELPER EXPORTS
// =============================================================================

export {
  createStatGrade,
  createPhysicalStats,
  createCombatStats,      // Alias for createPhysicalStats
  createAbilityStats,
  createCharacterStats,   // Alias for createAbilityStats
  getStatDescription,
  getStatDefinition,
  getStatFullInfo,
  getSubcategoryGrade,
  isPhysicalSubcategory,
  isAbilitySubcategory,
  getParentCategoryKey
} from "./helpers";

