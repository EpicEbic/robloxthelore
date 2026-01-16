/**
 * Stats System - Physical (Combat) Stats
 * 
 * Defines all physical stat categories, subcategories, and their grade descriptions.
 * Physical stats measure a character's raw physical capabilities.
 */

import type { CategoryDefinition, GradeDescriptions, StatDescriptionMap } from "./types";

// =============================================================================
// PHYSICAL STAT CATEGORIES
// =============================================================================

export const PHYSICAL_CATEGORIES: CategoryDefinition[] = [
  {
    key: "strength",
    label: "Strength",
    description: "Measures offensive capabilities through physical power and combat effectiveness.",
    subcategories: [
      { 
        key: "power", 
        label: "Power", 
        shortLabel: "Power",
        description: "How physically powerful a Bloxian's body is, including their destructive potential." 
      },
      { 
        key: "lift", 
        label: "Lift", 
        shortLabel: "Lift",
        description: "How much weight a Bloxian can comfortably (or uncomfortably) tolerate at one time." 
      },
      { 
        key: "penetration", 
        label: "Penetration", 
        shortLabel: "Pen",
        description: "How easily a Bloxian can bypass or pierce through defensive layers." 
      },
      { 
        key: "intensity", 
        label: "Intensity", 
        shortLabel: "Int",
        description: "How much consistent pressure a Bloxian can apply against their opponent." 
      }
    ]
  },
  {
    key: "durability",
    label: "Durability",
    description: "Represents defensive capabilities and resistance to damage.",
    subcategories: [
      { 
        key: "toughness", 
        label: "Toughness", 
        shortLabel: "Tough",
        description: "How many injuries a Bloxian can sustain before becoming incapacitated." 
      },
      { 
        key: "vitality", 
        label: "Vitality", 
        shortLabel: "Vital",
        description: "How healthy a Bloxian is generally, including tolerance to disease and poisons." 
      },
      { 
        key: "thermostability", 
        label: "Thermo", 
        shortLabel: "Thermo",
        description: "How well a Bloxian can withstand extreme heat or frost." 
      },
      { 
        key: "esotolerance", 
        label: "Esoto", 
        shortLabel: "Esoto",
        description: "How well a Bloxian can tolerate rarer hazards like electricity or radiation." 
      }
    ]
  },
  {
    key: "agility",
    label: "Agility",
    description: "Speed, reflexes, and nimbleness in movement and reaction.",
    subcategories: [
      { 
        key: "swiftness", 
        label: "Swiftness", 
        shortLabel: "Swift",
        description: "How quickly a Bloxian can move from one point to another." 
      },
      { 
        key: "acceleration", 
        label: "Accel", 
        shortLabel: "Accel",
        description: "How quickly a Bloxian can reach their top speeds." 
      },
      { 
        key: "flexibility", 
        label: "Flex", 
        shortLabel: "Flex",
        description: "How easily a Bloxian can maneuver through complicated environments." 
      },
      { 
        key: "endurance", 
        label: "Endurance", 
        shortLabel: "End",
        description: "How much stamina a Bloxian has, and how quickly they burn through it." 
      }
    ]
  },
  {
    key: "precision",
    label: "Precision",
    description: "Accuracy and fine motor control for precise movements.",
    subcategories: [
      { 
        key: "accuracy", 
        label: "Accuracy", 
        shortLabel: "Acc",
        description: "How consistently a Bloxian will land hits on their target." 
      },
      { 
        key: "range", 
        label: "Range", 
        shortLabel: "Range",
        description: "How far a Bloxian can comfortably and consistently fight from." 
      },
      { 
        key: "dexterity", 
        label: "Dexterity", 
        shortLabel: "Dex",
        description: "How fine a Bloxian's motor control is under pressure." 
      },
      { 
        key: "reactivity", 
        label: "Reactivity", 
        shortLabel: "React",
        description: "How quickly a Bloxian can react to sources of danger." 
      }
    ]
  },
  {
    key: "intelligence",
    label: "Intelligence",
    description: "Mental acuity, strategic thinking, and problem-solving.",
    subcategories: [
      { 
        key: "tactility", 
        label: "Tactility", 
        shortLabel: "Tact",
        description: "How clever a Bloxian acts in combat, making smart choices." 
      },
      { 
        key: "wisdom", 
        label: "Wisdom", 
        shortLabel: "Wis",
        description: "How smart a Bloxian is in everyday life." 
      },
      { 
        key: "foresight", 
        label: "Foresight", 
        shortLabel: "Fore",
        description: "How far a Bloxian can plan ahead." 
      },
      { 
        key: "sanity", 
        label: "Sanity", 
        shortLabel: "San",
        description: "How mentally-stable a Bloxian is." 
      }
    ]
  }
];

// =============================================================================
// PHYSICAL STAT GRADE DESCRIPTIONS
// =============================================================================

/**
 * Grade descriptions for all physical stats.
 * Each stat has descriptions for all 8 grade levels (F through Ø).
 */
export const PHYSICAL_STAT_DESCRIPTIONS: StatDescriptionMap = {
  // ===== STRENGTH SUBCATEGORIES =====
  power: {
    "Ø": "This Bloxian's destructive potential is so immeasurably high that obliterating entire Worlds is child's play.",
    "S": "This Bloxian can reshape entire landscapes with minimal effort, annihilating large-scale cities with a single strike.",
    "A": "This Bloxian can level outposts or smaller cities in just a punch or two.",
    "B": "This Bloxian's power enables them to destroy entire buildings through their fists alone.",
    "C": "This Bloxian can bring harm to most natural materials including wood, stone, and weaker metals.",
    "D": "This Bloxian has strength allowing them to damage weaker materials such as wood and stone.",
    "E": "This Bloxian has slightly above-average strength, giving them a small edge in hand-to-hand combat.",
    "F": "This Bloxian has no notable strength beyond a standard civilian."
  },
  lift: {
    "Ø": "This Bloxian can manipulate objects of any mass as though they were weightless.",
    "S": "This Bloxian can manipulate entire islands of weight at a time as though they were toys.",
    "A": "This Bloxian can take on the entire weight of tall buildings, lifting and throwing them.",
    "B": "This Bloxian can perform remarkable feats, benchpressing vehicles with one hand.",
    "C": "This Bloxian can manhandle larger objects such as motorcycles and small boulders.",
    "D": "This Bloxian can handle larger and bulkier objects with relative ease.",
    "E": "This Bloxian is capable of lifting a decent amount of weight with noticeable strain.",
    "F": "This Bloxian has a limited lifting capacity consistent with an average civilian."
  },
  penetration: {
    "Ø": "This Bloxian's ability to injure others transcends all forms of defense, allowing attacks to connect with absolute power.",
    "S": "This Bloxian has no difficulty obliterating all known lines of defense, regardless of abilities or materials.",
    "A": "This Bloxian can tear through the strongest of defenses with ease, even multi-layered equipment and abilities.",
    "B": "This Bloxian can easily penetrate specialized equipment and abilities, shattering through lines of defense.",
    "C": "This Bloxian can bypass most standard materials, as well as medium-class armors formed of stronger metals.",
    "D": "This Bloxian can bypass most low-end abilities as well as medium-class armor.",
    "E": "This Bloxian has above-average penetrating power, enabling them to bypass the weakest of barriers.",
    "F": "This Bloxian has no capabilities to penetrate the defenses of others by any means."
  },
  intensity: {
    "Ø": "This Bloxian is impossibly efficient at applying unyielding pressure, capable of attacking continuously without reprieve.",
    "S": "This Bloxian can maintain constant and aggressive pressure with little to no openings for retaliation.",
    "A": "This Bloxian can maintain strong, consistent pressure throughout entire combat situations.",
    "B": "This Bloxian can apply significant pressure while engaged in combat, often cornering opponents.",
    "C": "This Bloxian is moderately skilled at keeping pressure on their targets.",
    "D": "This Bloxian is capable of applying some pressure in combat, though inconsistent.",
    "E": "This Bloxian has limited skills necessary to maintain offensive pressure on a target.",
    "F": "This Bloxian fails to apply any pressure in combat."
  },
  
  // ===== DURABILITY SUBCATEGORIES =====
  toughness: {
    "Ø": "This Bloxian is completely and wholly invulnerable to any and all physical forms of injury.",
    "S": "This Bloxian shrugs off cataclysmic explosions that could shatter mountains.",
    "A": "This Bloxian can tolerate ground-trembling impacts, sustaining only minor injuries.",
    "B": "This Bloxian can remain composed when faced with attacks capable of destroying smaller buildings.",
    "C": "This Bloxian can withstand being tossed through weaker structures.",
    "D": "This Bloxian is tough enough to withstand blunt force for longer periods.",
    "E": "This Bloxian's body can tolerate injury better than most.",
    "F": "This Bloxian is just as susceptible to injury as any other civilian."
  },
  vitality: {
    "Ø": "This Bloxian's body is completely immune to all forms of physical degradation, illness, or aging.",
    "S": "This Bloxian can regenerate from most injuries in record times and ignore almost all illnesses.",
    "A": "This Bloxian has exceptional vitality, recovering quickly from fatal injuries.",
    "B": "This Bloxian's body is incredibly healthy, capable of withstanding serious conditions.",
    "C": "This Bloxian is remarkably healthy across the board, shrugging off most illnesses.",
    "D": "This Bloxian has notably high vitality, often tolerating minor ailments better.",
    "E": "This Bloxian's health is in good condition above the average civilian.",
    "F": "This Bloxian is no healthier than a typical citizen."
  },
  thermostability: {
    "Ø": "This Bloxian is completely immune to all temperature extremes.",
    "S": "This Bloxian can withstand temperatures that would vaporize or freeze ordinary matter.",
    "A": "This Bloxian handles extreme temperatures with ease.",
    "B": "This Bloxian withstands most temperature extremes with minimal effort.",
    "C": "This Bloxian has strong tolerance toward temperature extremes.",
    "D": "This Bloxian can tolerate most standard environments.",
    "E": "This Bloxian may tolerate extreme temperatures for longer periods, but not indefinitely.",
    "F": "This Bloxian cannot tolerate temperature extremes without special protection."
  },
  esotolerance: {
    "Ø": "This Bloxian is completely immune to all esoteric hazards.",
    "S": "This Bloxian can tolerate exceptionally lethal hazards such as black holes.",
    "A": "This Bloxian withstands most esoteric hazards like radiation and electricity with ease.",
    "B": "This Bloxian can tolerate advanced hazards in large quantities.",
    "C": "This Bloxian may handle advanced hazards including electricity and radiation.",
    "D": "This Bloxian may be resistant to esoteric hazards.",
    "E": "This Bloxian may tolerate minor exposure to esoteric hazards.",
    "F": "This Bloxian has no special tolerance for esoteric hazards."
  },
  
  // ===== AGILITY SUBCATEGORIES =====
  swiftness: {
    "Ø": "This Bloxian moves at speeds comparable to teleportation.",
    "S": "This Bloxian travels at excessive speeds that shatter the sound barrier.",
    "A": "This Bloxian rapidly matches the speeds of sports cars.",
    "B": "This Bloxian can outrun most motorized vehicles when at maximum speed.",
    "C": "This Bloxian quickly reaches and maintains a fast pace.",
    "D": "This Bloxian achieves speeds comparable to trained athletes.",
    "E": "This Bloxian can sprint faster than civilians.",
    "F": "This Bloxian isn't capable of reaching speeds beyond an average citizen."
  },
  acceleration: {
    "Ø": "This Bloxian achieves maximum velocity instantaneously.",
    "S": "This Bloxian accelerates to their top speed in fractions of a second.",
    "A": "This Bloxian reaches maximum speed almost instantly.",
    "B": "This Bloxian accelerates remarkably fast.",
    "C": "This Bloxian builds speed quickly.",
    "D": "This Bloxian accelerates faster than average.",
    "E": "This Bloxian accelerates at a slightly above-average rate.",
    "F": "This Bloxian accelerates slowly."
  },
  flexibility: {
    "Ø": "This Bloxian can freely contort and warp their body to improbable extents.",
    "S": "This Bloxian is a master contortionist who can quickly manipulate their body.",
    "A": "This Bloxian can comfortably handle and avoid the attacks of multiple enemies.",
    "B": "This Bloxian can tolerate multiple close-quarters opponents at once.",
    "C": "This Bloxian can tolerate multiple fighters at once.",
    "D": "This Bloxian can efficiently weave against skilled fighters.",
    "E": "This Bloxian can bend and manipulate themselves to avoid simple attacks.",
    "F": "This Bloxian lacks any flexibility beyond the average civilian."
  },
  endurance: {
    "Ø": "This Bloxian has boundless stamina that physically cannot run dry.",
    "S": "This Bloxian essentially never runs dry of stamina.",
    "A": "This Bloxian's endurance is strong enough to tolerate running without impact.",
    "B": "This Bloxian can handle cross-country journeys without much sleep.",
    "C": "This Bloxian can tolerate sprinting throughout entire marathons.",
    "D": "This Bloxian has notable endurance allowing them to tolerate large-distance treks.",
    "E": "This Bloxian can tolerate decent-length sprints before eventually tiring.",
    "F": "This Bloxian has limited stamina, exhausting them from basic exercise."
  },
  
  // ===== PRECISION SUBCATEGORIES =====
  accuracy: {
    "Ø": "This Bloxian's accuracy is absolute. Every strike lands exactly where intended.",
    "S": "This Bloxian strikes with near-perfect precision.",
    "A": "This Bloxian attacks with incredible accuracy.",
    "B": "This Bloxian has remarkable accuracy, remaining precise even in unfortunate conditions.",
    "C": "This Bloxian consistently strikes their targets with notable precision.",
    "D": "This Bloxian maintains decent accuracy in combat.",
    "E": "This Bloxian handles combat with slight accuracy above untrained combatants.",
    "F": "This Bloxian is extremely inaccurate."
  },
  range: {
    "Ø": "This Bloxian can engage targets at any distance with perfect effectiveness.",
    "S": "This Bloxian operates effectively at extreme distances.",
    "A": "This Bloxian excels at very long ranges.",
    "B": "This Bloxian operates effectively at long range.",
    "C": "This Bloxian handles moderate ranges well.",
    "D": "This Bloxian is comfortable at shorter ranges.",
    "E": "This Bloxian struggles at range.",
    "F": "This Bloxian can only fight effectively at point-blank range."
  },
  dexterity: {
    "Ø": "This Bloxian's ability to control their body is absolutely unmatched.",
    "S": "This Bloxian's dexterity is world-class.",
    "A": "This Bloxian can handle advanced tools and weapons with extreme precision.",
    "B": "This Bloxian has remarkable handling of most advanced tools and weaponry.",
    "C": "This Bloxian has good handling of most tools and weapons.",
    "D": "This Bloxian has decent motor control and handling.",
    "E": "This Bloxian can handle simpler tools and weapons with notable accuracy.",
    "F": "This Bloxian has minimal dexterity and motor control."
  },
  reactivity: {
    "Ø": "This Bloxian's reflexes transcend time, allowing them to initiate countermeasures instantly.",
    "S": "This Bloxian can react at improbable speeds.",
    "A": "This Bloxian can effortlessly react thanks to extremely strong senses.",
    "B": "This Bloxian's reflexes are excellent.",
    "C": "This Bloxian has strong senses, allowing them to respond quickly.",
    "D": "This Bloxian has above-average reflexes.",
    "E": "This Bloxian has improved senses and reflexes.",
    "F": "This Bloxian lacks any enhanced reflexes."
  },
  
  // ===== INTELLIGENCE SUBCATEGORIES =====
  tactility: {
    "Ø": "This Bloxian has omniscient awareness of those they fight.",
    "S": "This Bloxian can solve combative problems that would overwhelm advanced fighters.",
    "A": "This Bloxian has renowned combat intelligence.",
    "B": "This Bloxian's combat intelligence is very high.",
    "C": "This Bloxian has intelligence which enables quick and tactful thinking.",
    "D": "This Bloxian's tactical capacity grants them decent intelligence in combat.",
    "E": "This Bloxian has a slight understanding of combat.",
    "F": "This Bloxian has no combat experience whatsoever."
  },
  wisdom: {
    "Ø": "This Bloxian is omniscient and all-knowing.",
    "S": "This Bloxian's intellect far surpasses almost all others.",
    "A": "This Bloxian is nearly a genius in terms of their intelligence.",
    "B": "This Bloxian has lots of wisdom and intellect to spare.",
    "C": "This Bloxian is decently intelligent.",
    "D": "This Bloxian has notably high intelligence compared to most.",
    "E": "This Bloxian displays notable intelligence.",
    "F": "This Bloxian shows intelligence consistent with the average civilian."
  },
  foresight: {
    "Ø": "This Bloxian perceives all possible futures with perfect clarity.",
    "S": "This Bloxian plans many steps ahead with near-perfect accuracy.",
    "A": "This Bloxian excels at long-term planning.",
    "B": "This Bloxian plans several steps ahead effectively.",
    "C": "This Bloxian has good foresight, planning ahead for likely outcomes.",
    "D": "This Bloxian thinks ahead in general terms.",
    "E": "This Bloxian has limited foresight.",
    "F": "This Bloxian rarely thinks beyond the immediate moment."
  },
  sanity: {
    "Ø": "This Bloxian's mind exists beyond sanity and insanity.",
    "S": "This Bloxian possesses extraordinary mental stability.",
    "A": "This Bloxian has exceptional mental fortitude.",
    "B": "This Bloxian maintains strong mental stability.",
    "C": "This Bloxian has good mental stability.",
    "D": "This Bloxian maintains decent stability normally.",
    "E": "This Bloxian has fragile stability.",
    "F": "This Bloxian is severely unstable or easily manipulated."
  }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the category definition for a physical stat category key
 */
export function getPhysicalCategory(categoryKey: string): CategoryDefinition | undefined {
  return PHYSICAL_CATEGORIES.find(cat => cat.key === categoryKey);
}

/**
 * Get the subcategory definition for a physical stat subcategory key
 */
export function getPhysicalSubcategory(subcategoryKey: string): { category: CategoryDefinition; subcategory: CategoryDefinition["subcategories"][0] } | undefined {
  for (const category of PHYSICAL_CATEGORIES) {
    const subcategory = category.subcategories.find(sub => sub.key === subcategoryKey);
    if (subcategory) {
      return { category, subcategory };
    }
  }
  return undefined;
}

/**
 * Get the grade description for a physical stat
 */
export function getPhysicalStatDescription(statKey: string, grade: string): string {
  const descriptions = PHYSICAL_STAT_DESCRIPTIONS[statKey];
  if (!descriptions) {
    return `Grade ${grade} in ${statKey}`;
  }
  return descriptions[grade as keyof GradeDescriptions] || `Grade ${grade} in ${statKey}`;
}

/**
 * Get the stat definition (what the stat measures) for a physical stat
 */
export function getPhysicalStatDefinition(statKey: string): string {
  // Check if it's a category
  const category = getPhysicalCategory(statKey);
  if (category) {
    return category.description;
  }
  
  // Check if it's a subcategory
  const subcatResult = getPhysicalSubcategory(statKey);
  if (subcatResult) {
    return subcatResult.subcategory.description;
  }
  
  return "";
}

