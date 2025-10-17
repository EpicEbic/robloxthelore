export interface FusionEntry {
  id: string;
  name: string;
  description: string;
  images?: string[];
  appearance: string[];
  personality: string[];
  abilities: string[];
  lifestyle?: string[];
  history: string[];
  relationships?: string[];
  combat: string[];
  abilityDetails?: string[];
  offensiveCapabilities?: string[];
  defensiveCapabilities?: string[];
  utilitarianCapabilities?: string[];
  drawbacks?: string[];
  trivia?: string[];
  combatStats: {
    strength: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    durability: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    agility: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    precision: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    intelligence: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
  };
  stats?: {
    offense: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    defense: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    utility: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
    potential: { label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F"; value: number };
  };
  fusedFrom: [string, string]; // IDs of the original characters
  imageUrl?: string;
  species?: string;
  age?: string;
  alignment?: string;
  abilityName?: string;
  quote?: {
    text: string;
    context: string;
  };
}

export interface FusionResult {
  entries: [string, string];
  fusion: FusionEntry;
}