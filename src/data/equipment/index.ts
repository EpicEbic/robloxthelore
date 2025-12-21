
import { WikiEntry } from "@/types/wiki-types";
import { bloxyCola } from "./bloxy-cola";
import { witchesBrew } from "./witches-brew";
import { theBanhammer } from "./the-banhammer";

// Export all equipment entries
export const allEquipment: WikiEntry[] = [
  bloxyCola,
  witchesBrew,
  theBanhammer
];

// Export individual equipment for easy access
export {
  bloxyCola,
  witchesBrew,
  theBanhammer
};
