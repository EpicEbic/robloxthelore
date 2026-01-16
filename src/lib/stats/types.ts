/**
 * Stats System - Type Definitions
 * 
 * This file contains all type definitions for the unified stats system.
 * Both physical (combat) stats and ability stats use these shared types.
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
// ABILITY STAT TYPES
// =============================================================================

/** Ability stat main category keys */
export type AbilityCategoryKey = 
  | "offense" 
  | "defense" 
  | "utility" 
  | "potential";

/** All ability stat subcategory keys */
export type AbilitySubcategoryKey =
  // Offense subcategories
  | "power"
  | "penetration"
  | "potency"
  // Defense subcategories
  | "guard"
  | "evasion"
  | "mitigation"
  // Utility subcategories
  | "versatility"
  | "support"
  | "manipulation";

/** Ability stats structure with main categories */
export interface AbilityStats {
  offense: StatGrade;
  defense: StatGrade;
  utility: StatGrade;
  potential: StatGrade;
  subcategories?: Partial<Record<AbilitySubcategoryKey, StatGrade>>;
}

// =============================================================================
// STAT DOMAIN TYPE
// =============================================================================

/** Identifies which stat domain a stat belongs to */
export type StatDomain = "physical" | "ability";

/** Union of all possible stat keys */
export type AnyStatKey = 
  | PhysicalCategoryKey 
  | PhysicalSubcategoryKey 
  | AbilityCategoryKey 
  | AbilitySubcategoryKey;

// =============================================================================
// DESCRIPTION LOOKUP TYPES
// =============================================================================

/** Grade descriptions for a single stat (all 8 grade levels) */
export type GradeDescriptions = Record<GradeLabel, string>;

/** Complete description map for all stats in a domain */
export type StatDescriptionMap = Record<string, GradeDescriptions>;

