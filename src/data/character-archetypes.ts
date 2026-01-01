// Character Archetypes Data
// A 5x5 grid of moral/ethical alignment archetypes

export interface Archetype {
  id: string;
  name: string;
  column: "lawful" | "social" | "neutral" | "rebel" | "chaotic";
  row: "good" | "moral" | "neutral" | "impure" | "evil";
  columnLabel: string;
  rowLabel: string;
  description: string;
}

// Column definitions (horizontal axis)
export const ARCHETYPE_COLUMNS = [
  { id: "lawful", label: "Lawful" },
  { id: "social", label: "Social" },
  { id: "neutral", label: "Neutral" },
  { id: "rebel", label: "Rebel" },
  { id: "chaotic", label: "Chaotic" },
] as const;

// Row definitions (vertical axis)
export const ARCHETYPE_ROWS = [
  { id: "good", label: "Good" },
  { id: "moral", label: "Moral" },
  { id: "neutral", label: "Neutral" },
  { id: "impure", label: "Impure" },
  { id: "evil", label: "Evil" },
] as const;

// All 25 archetypes
export const ARCHETYPES: Archetype[] = [
  // Row 1: Good
  {
    id: "paladin",
    name: "Paladin",
    column: "lawful",
    row: "good",
    columnLabel: "Lawful",
    rowLabel: "Good",
    description: "Actors of honor and discipline, valuing order and good intentions above all else. They protect those with righteous hearts, preserving stability. They believe that chaos threatens justice itself.",
  },
  {
    id: "custodian",
    name: "Custodian",
    column: "social",
    row: "good",
    columnLabel: "Social",
    rowLabel: "Good",
    description: "Values law as a guiding light, more than an absolute truth. They willingly bend the law when compassion demands it. Their loyalty is tied closer to individuals than it is to the systems they belong to.",
  },
  {
    id: "benefactor",
    name: "Benefactor",
    column: "neutral",
    row: "good",
    columnLabel: "Neutral",
    rowLabel: "Good",
    description: "Acts solely for the benefit of others, guided by their conscience rather than societal demands. They care little for rules or rebellion, only focused on outcomes. Good is not debated, it is done without question.",
  },
  {
    id: "avenger",
    name: "Avenger",
    column: "rebel",
    row: "good",
    columnLabel: "Rebel",
    rowLabel: "Good",
    description: "A pursuer of justice through disruption, believing that broken systems and codes must be challenged to protect the innocent. They willingly allow themselves to be seen as 'dangerous' by most, if that is what it takes to create a real change in the world. Order is expendable when it only fails the people.",
  },
  {
    id: "chaperone",
    name: "Chaperone",
    column: "chaotic",
    row: "good",
    columnLabel: "Chaotic",
    rowLabel: "Good",
    description: "They follow a deeply personal sense of what is right and wrong, regardless of laws or expectations. They act on their own instincts and emotions, doing what they can to help others in often-unconventional ways. Their heart leads the path ahead, even when the path ahead is unclear.",
  },

  // Row 2: Moral
  {
    id: "guardian",
    name: "Guardian",
    column: "lawful",
    row: "moral",
    columnLabel: "Lawful",
    rowLabel: "Moral",
    description: "They believe that morality thrives best when order is held not as control, but as a passage towards well-being. Others are protected through a maintained well-being, and order is maintained through gentle-- but firm-- guidance.",
  },
  {
    id: "knight",
    name: "Knight",
    column: "social",
    row: "moral",
    columnLabel: "Social",
    rowLabel: "Moral",
    description: "Lives by honor, tradition, and personal integrity. They will respect authority, but have no issues questioning it when their own conscience wavers. Their loyalty may be strong, but it is never blind.",
  },
  {
    id: "altruist",
    name: "Altruist",
    column: "neutral",
    row: "moral",
    columnLabel: "Neutral",
    rowLabel: "Moral",
    description: "Guided by empathy and ethics rather than systems or rebellion. They seek to understand a situation before they act on it, often struggling with moral nuance. Doing good is a choice they'll often make repeatedly.",
  },
  {
    id: "protestor",
    name: "Protestor",
    column: "rebel",
    row: "moral",
    columnLabel: "Rebel",
    rowLabel: "Moral",
    description: "They refuse to accept injustice, even when resistance against it brings risk. They believe that morally-correct progress requires something to kickstart the process. Comfort is less important than conscience.",
  },
  {
    id: "vagrant",
    name: "Vagrant",
    column: "chaotic",
    row: "moral",
    columnLabel: "Chaotic",
    rowLabel: "Moral",
    description: "They live freely, guided by a personal moral compass. They are unbothered and unconcerned with order or tradition, their values are deeply felt yet difficult to predict. Freedom shapes their sense of right and wrong.",
  },

  // Row 3: Neutral
  {
    id: "judge",
    name: "Judge",
    column: "lawful",
    row: "neutral",
    columnLabel: "Lawful",
    rowLabel: "Neutral",
    description: "Upholders of law and tradition above personal sentiments and emotions. Stability outweighs compassion, a functioning system matters more than the suffering of individuals.",
  },
  {
    id: "abettor",
    name: "Abettor",
    column: "social",
    row: "neutral",
    columnLabel: "Social",
    rowLabel: "Neutral",
    description: "Order is maintained without a strong sense of loyalty or conviction. They begrudgingly comply with orders when necessary, but often disengage if it benefits them personally. Stability is useful, but it isn't sacred.",
  },
  {
    id: "witness",
    name: "Witness",
    column: "neutral",
    row: "neutral",
    columnLabel: "Neutral",
    rowLabel: "Neutral",
    description: "Balance and survival guide their decisions, unbound by any moral code or law of order. They see potential and fault within all paths and avoid strong alignments, acting independently and often only when necessary.",
  },
  {
    id: "nomad",
    name: "Nomad",
    column: "rebel",
    row: "neutral",
    columnLabel: "Rebel",
    rowLabel: "Neutral",
    description: "Structures of society are rejected to forge their own path, adapting to circumstances rather than ideals. Personal freedom matters more than the consistency or security of others, society is irrelevant.",
  },
  {
    id: "outlaw",
    name: "Outlaw",
    column: "chaotic",
    row: "neutral",
    columnLabel: "Chaotic",
    rowLabel: "Neutral",
    description: "Impulse and self-determination is their way of life. Authority is rejected and acted against without regard for consequence. Freedom is both a motive and a reward.",
  },

  // Row 4: Impure
  {
    id: "enforcer",
    name: "Enforcer",
    column: "lawful",
    row: "impure",
    columnLabel: "Lawful",
    rowLabel: "Impure",
    description: "Follows a flawed, morally-gray code of honor without question. They believe obedience is required, even through harm or misfortune. Sometimes, the preservation of order simply demands cruelty.",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    column: "social",
    row: "impure",
    columnLabel: "Social",
    rowLabel: "Impure",
    description: "Personal ambition is achieved through the manipulation of systems and individuals. Morality is easy to bend when their power is at stake, control matters more than justice.",
  },
  {
    id: "hedonist",
    name: "Hedonist",
    column: "neutral",
    row: "impure",
    columnLabel: "Neutral",
    rowLabel: "Impure",
    description: "Driven by self-indulgence and personal desires. Law and chaos mean nothing beyond their convenience, other individuals matter only when they are useful.",
  },
  {
    id: "marauder",
    name: "Marauder",
    column: "rebel",
    row: "impure",
    columnLabel: "Rebel",
    rowLabel: "Impure",
    description: "Easily disregards loyalty, honor, and empathy in pursuit of survival or dominance. They thrive in disorder and personal gain. The destruction of others is often collateral, rather than concern.",
  },
  {
    id: "convict",
    name: "Convict",
    column: "chaotic",
    row: "impure",
    columnLabel: "Chaotic",
    rowLabel: "Impure",
    description: "Openly embrace violence, cruelty, and disorder without restraint. Morality, law, and empathy are rejected entirely. Chaos is not just a means, it is the ultimate goal.",
  },

  // Row 5: Evil
  {
    id: "tyrant",
    name: "Tyrant",
    column: "lawful",
    row: "evil",
    columnLabel: "Lawful",
    rowLabel: "Evil",
    description: "Maintains law and order through the oppression of others, often through violent or malicious means. Maintaining power through any means necessary is valued above the well-being of others, and stability exists only to serve them.",
  },
  {
    id: "despot",
    name: "Despot",
    column: "social",
    row: "evil",
    columnLabel: "Social",
    rowLabel: "Evil",
    description: "Happily exploits systems and individuals for personal gain. Authority exists to be weaponized and profited off of, rules will be bent or broken for their own benefit.",
  },
  {
    id: "malefactor",
    name: "Malefactor",
    column: "neutral",
    row: "evil",
    columnLabel: "Neutral",
    rowLabel: "Evil",
    description: "Selfish goals are pursued with little regard for either law or chaos. Morality is irrelevant, an outcome matters only if it benefits themselves. Harm is acceptable, especially when it is useful.",
  },
  {
    id: "wretch",
    name: "Wretch",
    column: "rebel",
    row: "evil",
    columnLabel: "Rebel",
    rowLabel: "Evil",
    description: "Cruel actors with minds absent of compassion or honor. They break rules purely to exploit or destroy, often out of malice, unhappiness, and/or boredom.",
  },
  {
    id: "ravager",
    name: "Ravager",
    column: "chaotic",
    row: "evil",
    columnLabel: "Chaotic",
    rowLabel: "Evil",
    description: "Destruction, suffering, and disorder is sought with an unwavering resolve. Morality, law, and harmony are constructs meant to be destroyed. Total collapse and chaos is both a purpose and a pleasure.",
  },
];

// Helper function to get archetype by position
export function getArchetypeByPosition(
  column: Archetype["column"],
  row: Archetype["row"]
): Archetype | undefined {
  return ARCHETYPES.find((a) => a.column === column && a.row === row);
}

// Helper function to get archetypes organized in grid format
export function getArchetypesGrid(): Archetype[][] {
  const grid: Archetype[][] = [];
  
  for (const row of ARCHETYPE_ROWS) {
    const rowArchetypes: Archetype[] = [];
    for (const col of ARCHETYPE_COLUMNS) {
      const archetype = getArchetypeByPosition(col.id, row.id);
      if (archetype) {
        rowArchetypes.push(archetype);
      }
    }
    grid.push(rowArchetypes);
  }
  
  return grid;
}

// Helper function to get archetype by alignment strings (e.g., "chaotic", "good")
export function getArchetypeByAlignment(
  column: string,
  row: string
): Archetype | undefined {
  const normalizedColumn = column.toLowerCase().trim() as Archetype["column"];
  const normalizedRow = row.toLowerCase().trim() as Archetype["row"];
  
  return ARCHETYPES.find(
    (a) => a.column === normalizedColumn && a.row === normalizedRow
  );
}
