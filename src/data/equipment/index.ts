
import { WikiEntry } from "@/types/wiki-types";
import { coilsOfPower } from "./coils-of-power";
import { bloxyCola } from "./bloxy-cola";
import { witchesBrew } from "./witches-brew";
import { theBanhammer } from "./the-banhammer";

// Export all equipment entries
export const allEquipment: WikiEntry[] = [
  coilsOfPower,
  bloxyCola,
  witchesBrew,
  theBanhammer
];

// Export individual equipment for easy access
export {
  coilsOfPower,
  bloxyCola,
  witchesBrew,
  theBanhammer
};
