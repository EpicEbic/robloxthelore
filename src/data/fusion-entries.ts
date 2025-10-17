import { FusionResult } from "@/types/fusion-types";

export const fusionEntries: FusionResult[] = [
  {
    entries: ["caesar-bloxwright", "spawnboy"],
    fusion: {
      id: "caesar-spawnboy-fusion",
      name: "Spawnsar Bloxwright",
      description: "A divine warrior, combining Caesar's overwhelming physique and Spawnboy's divine control over life and death. An unmatched guardian of the Bloxiverse, thwarting villainy before it can rise, whilst guiding honest souls to their final resting place.",
      species: "Divine Bloxian",
      age: "Eternal",
      alignment: "Chaotic Good",
      abilityName: "Divine Electrogravitic Dominion",
      images: ["/lovable-uploads/f177316f-29dc-4834-99b3-30d8ebcf9bcd.png"],
      appearance: [
        "Retains Caesar's imposing muscular build but with an ethereal, divine glow emanating from within",
        "The Electrogravitic Flow now pulses with cosmic energy, creating reality-bending distortions around them",
        "Eyes burn with both Caesar's fierce determination and Spawnboy's infinite wisdom",
        "Divine armor manifests as hardened light that shifts between Caesar's blue energy and Spawnboy's pure radiance"
      ],
      personality: [
        "Maintains Caesar's direct, aggressive approach but tempered with divine compassion",
        "Uses overwhelming power responsibly, understanding the weight of godlike abilities",
        "Fiercely protective of the innocent while being merciless toward true evil",
        "Struggles with the balance between mortal emotions and divine detachment"
      ],
      lifestyle: [
        "Roams the Bloxiverse as a divine guardian, appearing wherever great threats emerge",
        "Spends time in both intense physical training and cosmic meditation",
        "Lives among mortals when possible, trying to maintain connection to their humanity"
      ],
      history: [
        "Born from the fusion of mortal determination and divine omnipotence",
        "Learned to channel infinite power through disciplined combat techniques",
        "Became known as the deity who fights on the front lines rather than from afar"
      ],
      relationships: [
        "Revered by those Caesar once protected, now seeing him as their divine guardian",
        "Maintains complex relationships with other deities who question their hands-on approach",
        "Beloved by warriors who see them as the perfect fusion of strength and righteousness"
      ],
      combat: [
        "Combines Caesar's brutal Electrogravitic Flow with Spawnboy's reality-altering abilities",
        "Can respawn instantly from any defeat, learning from each death to become stronger",
        "Uses divine power to amplify physical techniques to universe-shaking levels"
      ],
      abilityDetails: [
        "Divine Electrogravitic Flow can reshape matter and energy on a cosmic scale",
        "Omnipotent Respawn allows for learning from infinite deaths and resurrections",
        "Reality Dominion enables rewriting the fundamental laws of physics during combat"
      ],
      offensiveCapabilities: [
        "Cosmic Devastation: Electrogravitic attacks that can shatter dimensions",
        "Divine Wrath: Channels pure creative force into devastating energy beams",
        "Eternal Assault: Can attack continuously through infinite respawns"
      ],
      defensiveCapabilities: [
        "Divine Hardlight Armor: Protection that exists across multiple dimensions",
        "Respawn Immunity: Cannot be permanently destroyed or incapacitated",
        "Reality Anchor: Can resist reality-altering attacks through divine stability"
      ],
      utilitarianCapabilities: [
        "Cosmic Reconstruction: Can rebuild destroyed worlds and civilizations",
        "Divine Guidance: Provides wisdom and strength to allies across the Bloxiverse",
        "Dimensional Travel: Can appear anywhere in any reality instantaneously"
      ],
      drawbacks: [
        "Divine power sometimes overwhelms mortal tactical thinking",
        "Infinite respawns can lead to reckless behavior in combat",
        "Struggles with the responsibility of godlike power and mortal emotions"
      ],
      trivia: [
        "The fusion created the first documented case of a mortal successfully wielding divine omnipotence",
        "Their Electrogravitic Flow now glows with the same light that creates new stars",
        "They're the only being capable of both dying in combat and learning from the experience"
      ],
      abilities: [
        "Divine Electrogravitic Flow that can reshape reality through physical force",
        "Omnipotent Respawn with perfect memory retention across deaths",
        "Cosmic awareness combined with mortal combat instincts"
      ],
      combatStats: {
        strength: { label: "Ø", value: 100 },
        durability: { label: "Ø", value: 100 },
        agility: { label: "A", value: 80 },
        precision: { label: "S", value: 90 },
        intelligence: { label: "A", value: 85 }
      },
      stats: {
        offense: { label: "Ø", value: 100 },
        defense: { label: "Ø", value: 100 },
        utility: { label: "Ø", value: 100 },
        potential: { label: "Ø", value: 100 }
      },
      fusedFrom: ["caesar-bloxwright", "spawnboy"],
      quote: {
        text: "I have died a thousand deaths to master this power. Now witness what divine strength truly means.",
        context: "Preparing for a universe-threatening battle"
      }
    }
  }
];

export function getFusionEntry(entryId1: string, entryId2: string): FusionResult | null {
  const fusion = fusionEntries.find(f => 
    (f.entries[0] === entryId1 && f.entries[1] === entryId2) ||
    (f.entries[0] === entryId2 && f.entries[1] === entryId1)
  );
  
  return fusion || null;
}