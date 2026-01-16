/**
 * Stats System - Ability Stats
 * 
 * Defines all ability stat categories, subcategories, and their grade descriptions.
 * Ability stats measure the power and versatility of a character's abilities.
 */

import type { CategoryDefinition, GradeDescriptions, StatDescriptionMap } from "./types";

// =============================================================================
// ABILITY STAT CATEGORIES
// =============================================================================

export const ABILITY_CATEGORIES: CategoryDefinition[] = [
  {
    key: "offense",
    label: "Offense",
    description: "An ability's potential for injury and destruction.",
    subcategories: [
      { 
        key: "power", 
        label: "Power", 
        shortLabel: "Power",
        description: "The raw strength and destructive potential of an ability." 
      },
      { 
        key: "penetration", 
        label: "Penetration", 
        shortLabel: "Pen",
        description: "How easily an ability can bypass defenses." 
      },
      { 
        key: "potency", 
        label: "Potency", 
        shortLabel: "Pot",
        description: "How long the damaging effects linger and how deadly they are." 
      }
    ]
  },
  {
    key: "defense",
    label: "Defense",
    description: "An ability's potential to defend the user or others.",
    subcategories: [
      { 
        key: "guard", 
        label: "Guard", 
        shortLabel: "Guard",
        description: "How well an ability can directly defend against damage." 
      },
      { 
        key: "evasion", 
        label: "Evasion", 
        shortLabel: "Evade",
        description: "How well a Bloxian can evade danger through mobility or phasing." 
      },
      { 
        key: "mitigation", 
        label: "Mitigation", 
        shortLabel: "Mitig",
        description: "How well an ability can mitigate harm after it has occurred." 
      }
    ]
  },
  {
    key: "utility",
    label: "Utility",
    description: "An ability's potential as an accessory or tool.",
    subcategories: [
      { 
        key: "versatility", 
        label: "Versatility", 
        shortLabel: "Versa",
        description: "How practical of a tool this ability is in general." 
      },
      { 
        key: "support", 
        label: "Support", 
        shortLabel: "Supp",
        description: "How well an ability can benefit the user or allies." 
      },
      { 
        key: "manipulation", 
        label: "Manipulation", 
        shortLabel: "Manip",
        description: "How well an ability can interact with environment or beings." 
      }
    ]
  },
  {
    key: "potential",
    label: "Potential",
    description: "An ability's potential for growth and development.",
    subcategories: [] // Potential has no subcategories
  }
];

// =============================================================================
// ABILITY STAT GRADE DESCRIPTIONS
// =============================================================================

/**
 * Grade descriptions for all ability stats.
 * Each stat has descriptions for all 8 grade levels (F through Ø).
 * 
 * Note: For stats that share names with physical stats (power, penetration),
 * these are ability-specific descriptions that differ from physical versions.
 */
export const ABILITY_STAT_DESCRIPTIONS: StatDescriptionMap = {
  // ===== OFFENSE SUBCATEGORIES =====
  power: {
    "Ø": "This ability's raw strength and destructive potential transcends all known limits.",
    "S": "This ability bears world-shattering destructive power.",
    "A": "This ability can, with some effort, level entire portions of larger cities.",
    "B": "This ability has little difficulty levelling large buildings.",
    "C": "This ability enables the destruction of smaller-scale structures.",
    "D": "This ability grants notable increases in destructive potential.",
    "E": "This ability grants a slightly notable boost in power.",
    "F": "This ability does not grant any boosts in destructive potential."
  },
  penetration: {
    "Ø": "This ability's capability to bypass defenses transcends all forms of protection.",
    "S": "This ability has no difficulty obliterating all known lines of defense.",
    "A": "This ability can tear through the strongest of defenses with ease.",
    "B": "This ability can easily penetrate specialized equipment and abilities.",
    "C": "This ability can bypass most standard materials and medium-class armors.",
    "D": "This ability can bypass most low-end abilities and medium-class armor.",
    "E": "This ability has above-average penetrating power.",
    "F": "This ability has no capabilities to penetrate defenses."
  },
  potency: {
    "Ø": "This ability's damaging effects are permanent and unending.",
    "S": "This ability's effects linger for extremely long periods.",
    "A": "This ability's effects can persist for extended periods.",
    "B": "This ability's effects can linger for moderate periods.",
    "C": "This ability's effects can persist for short periods.",
    "D": "This ability's effects may linger briefly.",
    "E": "This ability's effects linger for only very short periods.",
    "F": "This ability's effects do not linger at all."
  },
  
  // ===== DEFENSE SUBCATEGORIES =====
  guard: {
    "Ø": "This ability grants an absolute defense, preventing any form of harm.",
    "S": "This ability grants the user a means to defend against many forms of harm.",
    "A": "This ability enables a user to defend against a majority of stronger trauma.",
    "B": "This ability allows the user to protect against standard trauma.",
    "C": "This ability grants the user a decent means to defend themselves.",
    "D": "This ability grants a notable defense against weaker damage.",
    "E": "This ability grants a slight enhancement to a user's defense.",
    "F": "This ability offers no defensive applications whatsoever."
  },
  evasion: {
    "Ø": "This ability enables evasion that transcends physical limitations.",
    "S": "This ability enables evasion with near-perfect efficiency.",
    "A": "This ability enables evasion with remarkable effectiveness.",
    "B": "This ability enables evasion with good effectiveness.",
    "C": "This ability enables evasion with moderate effectiveness.",
    "D": "This ability enables evasion with limited effectiveness.",
    "E": "This ability enables evasion with minimal effectiveness.",
    "F": "This ability offers no means to evade danger."
  },
  mitigation: {
    "Ø": "This ability can completely mitigate any harm after it has occurred.",
    "S": "This ability can mitigate severe harm with exceptional efficiency.",
    "A": "This ability can mitigate significant harm effectively.",
    "B": "This ability can mitigate moderate harm reliably.",
    "C": "This ability can mitigate minor harm with decent effectiveness.",
    "D": "This ability can mitigate very minor harm with limited effectiveness.",
    "E": "This ability can mitigate harm with minimal effectiveness.",
    "F": "This ability offers no means to mitigate harm."
  },
  
  // ===== UTILITY SUBCATEGORIES =====
  versatility: {
    "Ø": "This ability has near-limitless potential for applications.",
    "S": "This ability has countless practical uses in application.",
    "A": "This ability has remarkable utilitarian potential.",
    "B": "This ability has smaller-scaled utilitarian applications.",
    "C": "This ability has some offensive-oriented utilitarian applications.",
    "D": "This ability has notable potential as a utility.",
    "E": "This ability has slight enhancements to a user's potential.",
    "F": "This ability offers no utilitarian potential."
  },
  support: {
    "Ø": "This ability can provide transcendent support benefits.",
    "S": "This ability can provide exceptional support benefits.",
    "A": "This ability can provide remarkable support benefits.",
    "B": "This ability can provide good support benefits.",
    "C": "This ability can provide moderate support benefits.",
    "D": "This ability can provide limited support benefits.",
    "E": "This ability can provide minimal support benefits.",
    "F": "This ability offers no support benefits whatsoever."
  },
  manipulation: {
    "Ø": "This ability can interact with and manipulate with transcendent power.",
    "S": "This ability can manipulate with exceptional power.",
    "A": "This ability can manipulate with remarkable effectiveness.",
    "B": "This ability can manipulate with good effectiveness.",
    "C": "This ability can manipulate with moderate effectiveness.",
    "D": "This ability can manipulate with limited effectiveness.",
    "E": "This ability can manipulate with minimal effectiveness.",
    "F": "This ability offers no means to manipulate."
  },
  
  // ===== POTENTIAL (main category, no subcategories) =====
  potential: {
    "Ø": "An ability offering an infinite capacity for growth.",
    "S": "An ability with near-boundless potential yet to be tapped into.",
    "A": "An ability with a large reserve of potential.",
    "B": "An ability that still has plenty of room to grow.",
    "C": "An ability that has decent room for growth.",
    "D": "An ability that likely cannot be improved, but can be mastered.",
    "E": "An ability that cannot be physically strengthened.",
    "F": "An ability that has no further room for growth."
  }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the category definition for an ability stat category key
 */
export function getAbilityCategory(categoryKey: string): CategoryDefinition | undefined {
  return ABILITY_CATEGORIES.find(cat => cat.key === categoryKey);
}

/**
 * Get the subcategory definition for an ability stat subcategory key
 */
export function getAbilitySubcategory(subcategoryKey: string): { category: CategoryDefinition; subcategory: CategoryDefinition["subcategories"][0] } | undefined {
  for (const category of ABILITY_CATEGORIES) {
    const subcategory = category.subcategories.find(sub => sub.key === subcategoryKey);
    if (subcategory) {
      return { category, subcategory };
    }
  }
  return undefined;
}

/**
 * Get the grade description for an ability stat
 */
export function getAbilityStatDescription(statKey: string, grade: string): string {
  const descriptions = ABILITY_STAT_DESCRIPTIONS[statKey];
  if (!descriptions) {
    return `Grade ${grade} in ${statKey}`;
  }
  return descriptions[grade as keyof GradeDescriptions] || `Grade ${grade} in ${statKey}`;
}

/**
 * Get the stat definition (what the stat measures) for an ability stat
 */
export function getAbilityStatDefinition(statKey: string): string {
  // Check if it's a category
  const category = getAbilityCategory(statKey);
  if (category) {
    return category.description;
  }
  
  // Check if it's a subcategory
  const subcatResult = getAbilitySubcategory(statKey);
  if (subcatResult) {
    return subcatResult.subcategory.description;
  }
  
  return "";
}

