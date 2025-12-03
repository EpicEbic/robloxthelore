
// Define our wiki category types
export type CategoryType = 
  | "character" 
  | "location" 
  | "equipment" 
  | "faction";

// Define subcategories for each category
export type CharacterSubcategory = "all" | "protagonist" | "neutral" | "evil" | "minor-antagonist" | "major-antagonist" | "noncanon";
export type LocationSubcategory = "all" | "bloxiverse" | "primarylocations" | "secondarylocations";
export type EquipmentSubcategory = "all" | "artifacts" | "standard";
export type FactionSubcategory = "all" | "friendly" | "neutral" | "hostile";

export type Subcategory = 
  | CharacterSubcategory 
  | LocationSubcategory 
  | EquipmentSubcategory 
  | FactionSubcategory;

// Define appearance option interface
export interface AppearanceOption {
  id: string;
  label: string;
  description: string | string[];
  images?: {
    url: string;
    caption: string;
  }[];
}

// Define personality option interface
export interface PersonalityOption {
  id: string;
  label: string;
  description: string[];
}

export interface HistoryOption {
  id: string;
  label: string;
  description: string[];
  images?: {
    url: string;
    caption: string;
  }[];
}

export interface LifestyleOption {
  id: string;
  label: string;
  description: string[];
  images?: {
    url: string;
    caption: string;
  }[];
}

export interface RelationshipData {
  characterId: string;
  status: string;
  history: string[];
  images?: {
    url: string;
    caption: string;
  }[];
}

// New ability technique structure
export interface AbilityTechnique {
  id: string;
  title: string;
  description: string[];
}

export interface AbilityCategory {
  // Can be either an array of techniques OR a text description (for categories with no techniques)
  techniques?: AbilityTechnique[];
  text?: string[];
}

export interface AbilityData {
  overview?: AbilityCategory;
  passives?: AbilityCategory;
  offensive?: AbilityCategory;
  defensive?: AbilityCategory;
  utilitarian?: AbilityCategory;
  drawbacks?: AbilityCategory;
}

export interface CombatStats {
  strength: {
    label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
    value: number;
  };
  durability: {
    label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
    value: number;
  };
  agility: {
    label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
    value: number;
  };
  precision: {
    label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
    value: number;
  };
  intelligence: {
    label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
    value: number;
  };
}

export interface CombatStyleTechnique {
  id: string;
  title: string;
  description: string[];
}

export interface CombatStyleCategory {
  // Can be either an array of techniques OR a text description (for categories with no techniques)
  techniques?: CombatStyleTechnique[];
  text?: string[];
}

export interface CombatStyleData {
  overview?: CombatStyleCategory;
  passives?: CombatStyleCategory;
  offensive?: CombatStyleCategory;
  defensive?: CombatStyleCategory;
  utilitarian?: CombatStyleCategory;
  drawbacks?: CombatStyleCategory;
}

export interface CombatStyleOption {
  id: string;
  label: string;
  combatStats: CombatStats;
  description: string[];
  combatStyleData?: CombatStyleData;
  images?: {
    url: string;
    caption: string;
  }[];
}

// Define combat style interface
export interface CombatStyle {
  id: string;
  label: string;
  description: string[];
  combatStats: {
    strength: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    durability: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    agility: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    precision: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    intelligence: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
  };
  images?: {
    url: string;
    caption: string;
  }[];
}

// Define multi-item interface for equipment sets
export interface MultiItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  abilities: string[];
  lore: string;
  carouselImages?: {
    url: string;
    caption: string;
  }[];
  sections?: {
    overview?: string[];
    ability?: string[];
    history?: string[];
    trivia?: string[];
  };
}

// Wiki entry interface
export interface WikiEntry {
  id: string;
  title: string;
  description: string;
  preview?: string;
  content: string;
  category: CategoryType;
  subcategory: Subcategory;
  imageUrl?: string;
  relatedEntries?: string[];
  lastUpdated: string;
  
  // Additional fields for character entries
  quote?: {
    text: string;
    context: string;
  };
  species?: string;
  age?: string;
  alignment?: string;
  carouselImages?: {
    url: string;
    caption: string;
  }[];
  abilityCarouselImages?: {
    url: string;
    caption: string;
  }[];
  
  // Location-specific fields
  locationType?: string;
  locationSize?: string;
  locationRegion?: string;
  
  sections?: {
    // Character sections - flexible to support both old string format and new option types
    appearance?: string | AppearanceOption[];
    personality?: string[] | PersonalityOption[];
    history?: string[] | HistoryOption[];
    combatStyles?: CombatStyleOption[];
    lifestyle?: string[] | LifestyleOption[];
    relationships?: string[];
    relationshipsData?: { [key: string]: { status: string; history: string[] } };
    combat?: string[];
    abilities?: string[];
    abilityData?: AbilityData; // New structured ability data
    abilityDetails?: string[]; // Legacy field
    offensiveCapabilities?: string[]; // Legacy field
    defensiveCapabilities?: string[]; // Legacy field
    utilitarianCapabilities?: string[]; // Legacy field
    drawbacks?: string[]; // Legacy field
    trivia?: string[];
    
    // Equipment sections
    overview?: string[];
    ability?: string[];
    
    // Location sections
    segments?: string[];
  };
  
  // Combat styles for characters
  combatStyles?: CombatStyle[];
  
  // New field for multi-item equipment entries
  multiItems?: MultiItem[];
  
  // Stats for character analysis
  stats?: {
    offense: { label: string; value: number };
    defense: { label: string; value: number };
    utility: { label: string; value: number };
    potential: { label: string; value: number };
    subcategories?: {
      power?: { label: string; value: number };
      penetration?: { label: string; value: number };
      potency?: { label: string; value: number };
      guard?: { label: string; value: number };
      evasion?: { label: string; value: number };
      mitigation?: { label: string; value: number };
      versatility?: { label: string; value: number };
      support?: { label: string; value: number };
      manipulation?: { label: string; value: number };
    };
  };
  
  // Ability name for character entries
  abilityName?: string;
}

// Structure for our categories with their subcategories
export interface CategoryStructure {
  type: CategoryType;
  label: string;
  subcategories: { value: Subcategory; label: string }[];
}
