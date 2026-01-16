/**
 * Stats System - Type Definitions
 * 
 * This file contains all type definitions for the unified stats system.
 * Physical (combat) stats use these shared types.
 */

// =============================================================================
// GRADE TYPES
// =============================================================================

/** Valid grade labels from lowest (F) to highest (Ø) */
export type GradeLabel = "F" | "E" | "D" | "C" | "B" | "A" | "S" | "Ø";

/** A stat with its grade label and numeric value (0-7) */
export interface StatGrade {
  label: GradeLabel;
  value: number;
}

/** Grade color configuration for UI display */
export interface GradeColors {
  bg: string;        // Tailwind gradient background class
  border: string;    // Tailwind border color class
  text: string;      // Tailwind text color class
  hex: string;       // Hex color value for programmatic use
}

// =============================================================================
// STAT CATEGORY TYPES
// =============================================================================

/** Definition of a stat subcategory */
export interface SubcategoryDefinition {
  key: string;
  label: string;
  shortLabel?: string;  // Abbreviated label for compact display
  description: string;  // What this stat measures
}

/** Definition of a main stat category with its subcategories */
export interface CategoryDefinition {
  key: string;
  label: string;
  description: string;
  subcategories: SubcategoryDefinition[];
}

// =============================================================================
// PHYSICAL (COMBAT) STAT TYPES
// =============================================================================

/** Physical stat main category keys */
export type PhysicalCategoryKey = 
  | "strength" 
  | "durability" 
  | "agility" 
  | "precision" 
  | "intelligence";

/** All physical stat subcategory keys */
export type PhysicalSubcategoryKey =
  // Strength subcategories
  | "power"
  | "lift"
  | "penetration"
  | "intensity"
  // Durability subcategories
  | "toughness"
  | "vitality"
  | "thermostability"
  | "esotolerance"
  // Agility subcategories
  | "swiftness"
  | "acceleration"
  | "flexibility"
  | "endurance"
  // Precision subcategories
  | "accuracy"
  | "range"
  | "dexterity"
  | "reactivity"
  // Intelligence subcategories
  | "tactility"
  | "wisdom"
  | "foresight"
  | "sanity";

/** Physical stats structure with main categories */
export interface PhysicalStats {
  strength: StatGrade;
  durability: StatGrade;
  agility: StatGrade;
  precision: StatGrade;
  intelligence: StatGrade;
  subcategories?: Partial<Record<PhysicalSubcategoryKey, StatGrade>>;
}

// =============================================================================
// DESCRIPTION LOOKUP TYPES
// =============================================================================

/** Grade descriptions for a single stat (all 8 grade levels) */
export type GradeDescriptions = Record<GradeLabel, string>;

/** Complete description map for all stats in a domain */
export type StatDescriptionMap = Record<string, GradeDescriptions>;
