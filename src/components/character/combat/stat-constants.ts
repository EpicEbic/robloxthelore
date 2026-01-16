/**
 * @deprecated This file is deprecated. Import from @/lib/stats instead.
 * 
 * All stat constants, types, and helpers have been moved to the unified stats system:
 * 
 * import { 
 *   GRADE_VALUES,
 *   GRADE_COLORS,
 *   PHYSICAL_CATEGORIES,
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
  
  // Helper functions
  createPhysicalStats,
  createCombatStats,
  getStatDescription,
  getStatDefinition,
  getStatFullInfo
} from "@/lib/stats";

// Legacy alias - maps old name to new export
import { PHYSICAL_STAT_DESCRIPTIONS } from "@/lib/stats";

/**
 * @deprecated Use PHYSICAL_STAT_DESCRIPTIONS instead.
 * This is provided only for backward compatibility.
 */
export const STAT_GRADE_DESCRIPTIONS = {
  ...PHYSICAL_STAT_DESCRIPTIONS
};
