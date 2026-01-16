/**
 * Stats System - Main Entry Point
 * 
 * This module provides a unified, consistent stats system for the wiki.
 * 
 * ## Architecture
 * 
 * The stats system measures a character's raw physical capabilities:
 * - Categories: Strength, Durability, Agility, Precision, Intelligence
 * - Each category has 4 subcategories (20 total subcategories)
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
 * const desc = getStatDescription("power", "B");
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
// HELPER EXPORTS
// =============================================================================

export {
  createStatGrade,
  createPhysicalStats,
  createCombatStats,      // Alias for createPhysicalStats
  getStatDescription,
  getStatDefinition,
  getStatFullInfo,
  getSubcategoryGrade,
  isPhysicalSubcategory,
  getParentCategoryKey
} from "./helpers";
