// Character strengths and weaknesses for comparison analysis
export interface CharacterTraits {
  entryId: string;
  pros: string[];
  cons: string[];
}

export const characterTraits: CharacterTraits[] = [
  {
    entryId: "caesar-bloxwright",
    pros: [
      "Exceptional offensive potential using the Electrogravitic Flow.",
      "Hard-light armor constructs grant Caesar a near-impenetrable defense.",
      "Battlefields can be reshaped using the Electrogravitic Flow giving him an upper hand in most terrain.",
      "Caesar has natural strength and vitality due to his larger body."
    ],
    cons: [
      "The Flow has some, but little utilitarian potential.",
      "Caesar's energy is rapidly drained whilst using The Flow.",
      "Caesar is significantly slower than standard combatants.",
      "Low combat accuracy.",
      "Low combative intelligence.",
      "Caesar is mentally vulnerable, and is prone to manipulation or bluffing."
    ]
  },
  {
    entryId: "nauli-parter",
    pros: [
      "Highly agile and flexible, capable of maneuvering in the roughest of environments.",
      "Effective at mental manipulation, capable of bluffing against most targets.",
      "Can reduce the morale and effectiveness of almost any target with a conscience, through Pathokinesis.",
      "Difficult to predict due to her unconventional combative style and high speeds."
    ],
    cons: [
      "Fragile and weak to almost all forms of damage.",
      "Nauli's combat knife is minimally effective against stronger or more durable targets.",
      "Pathokinesis is purely defensive/supportive, making it useless in most one-on-one situations."
    ]
  },
  {
    entryId: "vortex-a-steele",
    pros: [
      "Trained heavily to be both agile and flexible.",
      "Armed with a variety of tools at his disposal, allowing him to adapt to most opponents.",
      "Chronipulation is a deadly force to be reckoned with, allowing Vortex to achieve speeds near-invisible to the naked eye.",
      "The Magnetivolver allows him to strike most targets from afar, using high-caliber shots that penetrate most materials and armors.",
      "The Amplification Gauntlet greatly enhances Vortex's strength, allowing him to punch through tougher materials such as rock or flimsy metal."
    ],
    cons: [
      "Vortex's durability is present, but minimal.",
      "Chronipulation is seriously draining of Vortex's energy, and can completely incapacitate him when abused.",
      "Both the Magnetivolver and the Amplification Gauntlet rely on Chronipulation to function at their highest potential, further draining Vortex's stamina.",
      "Vortex's temper and stubbornness can quickly get the best of him, causing him to act irrationally or without care."
    ]
  },
  {
    entryId: "rice-farmer",
    pros: [
      "Emotionally stable and reasonable.",
      "Unlikely to be targeted by threats, due to his lowly status as a civilian.",
      "Rice is known to be incredibly resourceful and careful, even in pressing situations.",
      "Almost always carries a metal rake, which can serve as a makeshift weapon in a pinch.",
      "Mild bonuses to agility due to his exercise from working at the farm."
    ],
    cons: [
      "Rice is incredibly weak and struggles to hurt anyone, even other civillians.",
      "Rice is incredibly fragile, with no means of defending himself.",
      "Lacks any training or combative experience, he is intelligent in life and not in fighting.",
      "Lacks any special powers or abilities whatsoever."
    ]
  },
  {
    entryId: "the-reckoner",
    pros: [
      "Omnipotent-level reality manipulation abilities.",
      "Exceptional stats across all categories.",
      "Can alter fundamental laws of reality.",
      "Near-unlimited potential for destruction.",
      "Overwhelming presence and intimidation factor."
    ],
    cons: [
      "May hold back due to moral constraints.",
      "Potential for collateral damage limits options.",
      "Could be overconfident against weaker opponents.",
      "Reality manipulation might have unknown limits."
    ]
  },
  {
    entryId: "builderman",
    pros: [
      "Infinite construction and creation abilities.",
      "Can adapt battlefield to his advantage.",
      "Creative problem-solving capabilities.",
      "Ability to build defenses instantly.",
      "Controls fundamental creation forces."
    ],
    cons: [
      "More focused on creation than destruction.",
      "May prefer non-violent solutions.",
      "Construction abilities require time and focus.",
      "Could be overwhelmed by pure destructive force."
    ]
  },
  {
    entryId: "spawnboy",
    pros: [
      "Functionally immortal, capable of freely rendering his body intangible.",
      "Complete control over the functions of life and death, capable of putting a Bloxian's soul into an eternal rest.",
      "Incredibly high destructive potential.",
      "Outstanding agility capable of crossing entire continents in the blink of an eye.",
      "Capable of reading the body and vocal languages of most opponents, as though they were a book."
    ],
    cons: [
      "Despite Spawnboy's immense power and strengths, their presence and influence are both exclusively bound to the Edge. This means that-- for the most part-- Spawnboy can only engage in combat with targets that have already died."
    ]
  },
  {
    entryId: "the-breadwinner",
    pros: [
      "Extensive combat experience and wisdom.",
      "Well-rounded physical capabilities.",
      "Strategic thinking from years of battle.",
      "Adaptable to various combat situations.",
      "Mental fortitude from hardships."
    ],
    cons: [
      "No supernatural abilities or powers.",
      "Aging may affect physical performance.",
      "Relies purely on skill without enhancement.",
      "Limited against reality-bending opponents.",
      "Equipment may be outdated."
    ]
  },
  {
    entryId: "ren-bytera",
    pros: [
      "Ren Bytera is incredibly intelligent and is an effective manipulator.",
      "Ren's Biograft Blade can efficiently cut through most materials like butter, giving her an edge in close-quarters combat.",
      "Ren's Ion Shielding augment is effective at defending her from most blunt-force and energy-based attacks.",
      "Ren has more precision than a standard civilian, due to the steady hands required during her work as a scientist."
    ],
    cons: [
      "Despite the Biograft Blade's high potential for damage, Ren is inexperienced with combat and struggles to use it effectively.",
      "Ren's Ion Shielding directly leeches from her body's own energy reserves to function, causing her to grow weaker and dizzy as she uses it more and repairs any damage it sustains.",
      "Beyond her augments, Ren has little physical potential in combat. She fairs almost equally to a standard citizen."
    ]
  },
  {
    entryId: "bryck-manning",
    pros: [
      "Proficient with the Gravity Coil due to long-time experience and a large amount of training.",
      "Exercise has lead to above-average strength and durability."
    ],
    cons: [
      "Heavily susceptible to mental manipulation due to his unstable psyche.",
      "Beyond his Gravity Coil, Bryck has no latent abilities or powers.",
      "Though he has above-average strength and durability, he is only above citizen-level naturally."
    ]
  }
];

export function getCharacterTraits(entryId: string): CharacterTraits | null {
  return characterTraits.find(trait => trait.entryId === entryId) || null;
}