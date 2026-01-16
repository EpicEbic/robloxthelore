/**
 * Stats System - Grade Constants
 * 
 * Single source of truth for grade values, colors, and labels.
 */

import type { GradeLabel, GradeColors } from "./types";

// =============================================================================
// GRADE VALUES
// =============================================================================

/** Numeric values for each grade (F=0 to Ø=7) */
export const GRADE_VALUES: Record<GradeLabel, number> = {
  "F": 0,
  "E": 1,
  "D": 2,
  "C": 3,
  "B": 4,
  "A": 5,
  "S": 6,
  "Ø": 7
} as const;

/** All grade labels in order from lowest to highest */
export const GRADE_LABELS: readonly GradeLabel[] = ["F", "E", "D", "C", "B", "A", "S", "Ø"] as const;

// =============================================================================
// GRADE COLORS
// =============================================================================

/** Color configuration for each grade */
export const GRADE_COLORS: Record<GradeLabel, GradeColors> = {
  "F": { 
    bg: "bg-gradient-to-r from-gray-600 to-gray-700", 
    border: "border-gray-400", 
    text: "text-gray-300", 
    hex: "#6b7280" 
  },
  "E": { 
    bg: "bg-gradient-to-r from-red-500 to-rose-600", 
    border: "border-red-400", 
    text: "text-red-300", 
    hex: "#ef4444" 
  },
  "D": { 
    bg: "bg-gradient-to-r from-orange-700 to-red-700", 
    border: "border-orange-500", 
    text: "text-orange-400", 
    hex: "#c2410c" 
  },
  "C": { 
    bg: "bg-gradient-to-r from-orange-400 to-amber-500", 
    border: "border-orange-400", 
    text: "text-orange-300", 
    hex: "#fb923c" 
  },
  "B": { 
    bg: "bg-gradient-to-r from-yellow-400 to-yellow-500", 
    border: "border-yellow-400", 
    text: "text-yellow-300", 
    hex: "#facc15" 
  },
  "A": { 
    bg: "bg-gradient-to-r from-green-500 to-emerald-500", 
    border: "border-green-400", 
    text: "text-green-300", 
    hex: "#22c55e" 
  },
  "S": { 
    bg: "bg-gradient-to-r from-blue-500 to-cyan-500", 
    border: "border-blue-400", 
    text: "text-blue-300", 
    hex: "#3b82f6" 
  },
  "Ø": { 
    bg: "bg-gradient-to-r from-purple-500 to-pink-500", 
    border: "border-purple-400", 
    text: "text-purple-300", 
    hex: "#a855f7" 
  }
} as const;

// =============================================================================
// GRADE NAME LABELS
// =============================================================================

/** Human-readable names for each grade */
export const GRADE_NAMES: Record<GradeLabel, string> = {
  "F": "Failing",
  "E": "Egregious",
  "D": "Deficient",
  "C": "Competent",
  "B": "Better",
  "A": "Amazing",
  "S": "Supreme",
  "Ø": "Omnipotent"
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the numeric value for a grade label
 */
export function getGradeValue(grade: GradeLabel): number {
  return GRADE_VALUES[grade];
}

/**
 * Get the color configuration for a grade
 */
export function getGradeColors(grade: GradeLabel): GradeColors {
  return GRADE_COLORS[grade];
}

/**
 * Get the human-readable name for a grade
 */
export function getGradeName(grade: GradeLabel): string {
  return GRADE_NAMES[grade];
}

/**
 * Check if a string is a valid grade label
 */
export function isValidGrade(value: string): value is GradeLabel {
  return GRADE_LABELS.includes(value as GradeLabel);
}

/**
 * Calculate a percentage (0-100) for a grade value
 */
export function getGradePercentage(grade: GradeLabel): number {
  return Math.round((GRADE_VALUES[grade] / 7) * 100);
}

