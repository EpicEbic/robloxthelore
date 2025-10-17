
import { WikiEntry } from "@/types/wiki-types";
import { allCharacters } from "./characters";
import { allEquipment } from "./equipment";
import { allLocations } from "./locations";

// Sample data - now organized modularly
export const sampleWikiEntries: WikiEntry[] = [
  ...allCharacters,
  ...allEquipment,
  ...allLocations
  // Add other entry types here (powers, factions)
];
