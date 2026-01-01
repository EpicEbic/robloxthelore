
import { WikiEntry } from "@/types/wiki-types";
import { bloxyCola } from "./bloxy-cola";
import { witchesBrew } from "./witches-brew";
import { theBanhammer } from "./the-banhammer";
import { coilsOfPower } from "./coils-of-power";

// Export all equipment entries
export const allEquipment: WikiEntry[] = [
  bloxyCola,
  witchesBrew,
  theBanhammer,
  coilsOfPower
];

// Export individual equipment for easy access
export {
  bloxyCola,
  witchesBrew,
  theBanhammer,
  coilsOfPower
};
