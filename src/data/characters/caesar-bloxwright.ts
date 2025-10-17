
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const caesarBloxwright: WikiEntry = {
  id: "caesar-bloxwright",
  title: "Caesar Bloxwright",
  description: "Caesar is kindhearted, caring, and highly respectful by nature. He deeply values his family and friends, adopting a protective nature toward those he has grown close to.",
  preview: "A towering giant, with an equally big heart. A vigilante on a quest to rid the Bloxiverse of evil.",
  content: "",
  category: "character",
  subcategory: "protagonist",
  imageUrl: "/lovable-uploads/eddd95a1-b4e5-4b4a-8f64-6fbd33ab1d03.png",
  lastUpdated: "2025-05-20",
  relatedEntries: ["nauli-parter"],
  quote: {
    text: "I don't fight for peace because I have to, I fight for peace because I want to.",
    context: "Caesar, proclaiming to his enemy as to why he fights for the sake of peace."
  },
  species: "Robloxian",
  age: "24",
  alignment: "Chaotic/Good",
  carouselImages: [
    {
      url: "/lovable-uploads/178545b6-1a7e-4ec0-ba7c-b7c3472a7b06.png",
      caption: "Caesar is always ready to go at a moment's notice. He loves to help out whenever he can."
    },
    {
      url: "/lovable-uploads/7ff2f464-a3ca-40d1-b786-5d530f4aa9b8.png",
      caption: "Caesar, resting on a recliner inside his home. Aside from his duties as protector, he loves nothing more than to kick back with a Bloxy Cola and relax for a while."
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Caesar's overwhelming size and bulwark build grant him incredible physical strength and durability, qualities which are only enhanced further by his ability. Caesar relies on slow, yet sturdy and incredibly lethal blows to quickly dispatch enemies that get caught in his path. Caesar is a juggernaut, backed by power that is not to be taken lightly.",
        "Though Caesar has incredible physical potential, he lacks immensely in speed and reflexes. Opponents with proper agility and dexterity will have almost no issues avoiding Caesar and his slow-moving attacks, unless he is able to accurately predict or trick a target into attacking to counter them."
      ],
      combatStats: createCombatStats("B", "A", "E", "D", "D")
    }
  ],
  abilityCarouselImages: [
    {
      url: "/lovable-uploads/d331d668-d72d-4905-8868-e63dc63c5bde.png",
      caption: "Caesar, channeling The Flow as it begins to spread and radiate across his body and clothing."
    },
  ],
  sections: {
    history: [
      "Caesar, as with all other Robloxians, came into existence and was thrown into an already-crumbling society. Amidst the chaos of Roblox's abandonment, Caesar fled to the outer reaches of the Bloxiverse in hopes of escaping the conflict. Eventually, he settled down in the Interim of the Bloxiverse, establishing his World and settling down on what would soon be known as Caesar's Isle.",
      "Caesar initially wasn't aware of his abilities and considered himself to be a normal civilian for the longest time. He was physically capable and strong, sure, but he didn't believe himself to be anything out of the norm. He knew it to be wrong, but he couldn't help looking at other Bloxians with abilities and feeling a sense of envy. He found it even more distasteful that these Bloxians mostly used their abilities for evil; it hurt him to know that evil outweighs good in the Bloxiverse.",
      "Eventually, that all changed when Caesar's Isle was invaded by a group of exploiters who wished to capture Caesar and use his World as an outpost for their nefarious operations. He fought valiantly, but without powers of his own, he stood no chance. All he did was anger the exploiters, who began to relentlessly beat Caesar as they tore apart the infrastructure and life he had made for himself.",
      "The abuse, the anger, the rage—it consumed Caesar, leading to the awakening of his latent powers he'd had all along. The memories and exact details of what happened next remain fuzzy to him, but he's certain that the exploiters did not survive. Since that incident, Caesar has vowed to use his abilities responsibly, serving due justice to those who deserve it and protecting those who cannot defend themselves."
    ],
    appearance: "Caesar Bloxwright is a toweringly-large, widely-built Robloxian. He has jet-black hair, which has been messily parted and has a small portion sticking up at the back. His eyes are obscured by his bangs and circular glasses, shading his upper face. He often wears a tough, carbon-colored overcoat with layered sleeves that end in half-glove slits. He usually wears a black shirt with a white collar and clipped bowtie underneath, as well as black jeans which have been belted in place by a large buckle.",
    personality: [
      "Empathetic, caring, and mindful—Caesar is an embodiment of all three qualities. He holds a deep-rooted sense of loyalty toward those who are close to him, often adopting a protective role with his friends. He's charismatic and quick-witted, known for cracking jokes even in the most intense situations. His immense physical strength, when paired with his uniquely versatile and powerful ability, trivializes most issues he may face in his day-to-day life.",
      "Beneath the facade of confidence and charm lies emotional vulnerability within Caesar. He can be quick to act irrationally when pressured, especially when those he values are threatened. Becoming dangerously reactive, his emotions can cloud his judgment, leaving him susceptible to manipulation, bluffs, and coercion. These risks and pressures may also lead Caesar to abuse his ability, which can further destabilize his psyche as he loses himself to raw power."
    ],
    lifestyle: [
      "Caesar lives alone on a small island, surrounded by an expansive sea that isolates him from heavily populated regions of the Bloxiverse. The island, often referred to simply as Caesar's Isle, is named after its sole inhabitant—Caesar. Nestled deep within the island's dense vegetation lies Caesar's log cabin, built in a small and quiet clearing. Scattered across the island's perimeter are several small encampments, which Caesar visits when he craves a change of scenery; otherwise, he lends them to friends or allies in need of a place to stay.",
      "While Caesar is lazy by nature, he still has a few hobbies and habits which he carries out on his island to fill his days. He loves tending to his garden or walking the island's winding paths to take in the fresh air and scenery. He loves to practice piano and cooking, though he remains relatively lacking in both areas.",
      "Caesar has taken on the role of a self-appointed vigilante, having dedicated himself to protecting the innocent and stopping trouble before it can escalate. While he is more than capable as an individual, he's often joined by his closest allies and friends, Nauli and Vortex—who share his goals and sense of justice."
    ],
    relationships: [
      "Nauli Parter - Close Friend | Caesar met Nauli multiple years ago, and they've been close friends ever since. He originally met her while visiting a fast food restaurant to purchase a Chezburger, finding her rummaging through the trash can for scraps of food. Disheartened by the sight, he bought her a meal and the two clicked immediately. Nowadays, Nauli is one of Caesar's most trusted allies, and someone Caesar would easily entrust his life to.",
      "Vortex A. Steele - Close Friend | Vortex was originally contracted to eliminate Caesar by the Hunter Association. While this game of cat-and-mouse went on for quite some time, Caesar and Vortex grew to respect one another, and Vortex eventually dropped the contract after failing multiple times to kill him, recognizing that Caesar is a good person and that they share similar values and ideals. While trust between them was slow to build, Vortex has grown to become a strong ally and close friend to Caesar.",
      "Rice Farmer - Close Friend | Rice Farmer was originally a civilian stranger whom Caesar had rescued during Bryck's rampage in the Farmer's Sanctuary, and nothing more. However, the two eventually began chatting, and Caesar grew fond of Rice's simplistic and noble way of living. Rice has since taught Caesar the ways of agriculture, which eventually led to Caesar starting and caring for a garden of his own back on his island."
    ],
    combat: [
      "Caesar's overwhelming size and bulwark build grant him incredible physical strength and durability, qualities which are only enhanced further by his ability. Caesar relies on slow, yet sturdy and incredibly lethal blows to quickly dispatch enemies that get caught in his path. Caesar is a juggernaut, backed by power that is not to be taken lightly.",
      "Though Caesar has incredible physical potential, he lacks immensely in speed and reflexes. Opponents with proper agility and dexterity will have almost no issues avoiding Caesar and his slow-moving attacks, unless he is able to accurately predict or trick a target into attacking to counter them. The physical 'weight' added by his ability only draws back the speed of his movement further, as he exchanges mobility for lethality."
    ],
    abilityDetails: [
      "Caesar's body acts as a perfect conduit for an anomalous source of power. He is capable of generating and discharging powerful, electrified plasma with qualities that enable it to manipulate local magnetic and gravitational forces. This energy (often referred to as \"The Flow\" for simplification) manifests with a deep blue hue, darkening in color as Caesar uses The Flow further and further.",
      "Caesar has masterful control over The Flow, allowing him to use his versatile ability in a variety of different ways."
    ],
    offensiveCapabilities: [
      "Offensively, The Flow can be used to create blasts, beams, bombs, and hard-light weapon constructs which Caesar can use to harm targets. By disrupting space around himself, he can mimic the effects of telekinesis and freely control gravity and magnetic forces, bending them to disorient and hinder his opponents, or to benefit himself or his allies."
    ],
    defensiveCapabilities: [
      "Defensively, The Flow can be used to create hard-light armor constructs, such as plating or shields that heavily increase his defense. He can also use this ability to protect others, creating protective domes or artificial armor to coat and keep them safe in combat. By compressing enough energy around himself, he can entirely sacrifice his ability to move in exchange for near-impenetrable defense—so long as he has enough energy to constantly maintain the barrier."
    ],
    utilitarianCapabilities: [
      "As a utility, The Flow serves as a very practical tool, both in and out of combat. As Caesar can alter the environment of nearly any battlefield, he can manipulate gravity to enhance his mobility or to pull/push things around him. The Flow has practical uses even in daily life, allowing Caesar to fetch things from the kitchen while he's sitting down, or to hold heavy objects while spending less energy than he would if he were using his raw physical strength."
    ],
    drawbacks: [
      "The Flow is not without drawbacks, however. Without proper focus and control, it can become incredibly dangerous as it grows increasingly volatile. Caesar can start losing himself as he pushes his body—and The Flow—further and further. The physical energy itself carries a form of 'weight', causing Caesar to physically slow down as he increases The Flow's output.",
      "With enough overuse, The Flow can begin to seep into his mind, causing him to act erratically and carelessly. Eventually, this often leads to Caesar losing himself completely as he goes entirely berserk, completely dropping his charismatic persona as he enters a blood-fueled rage."
    ],
    trivia: [
      "Caesar is ambidextrous—he can comfortably use both hands for just about any task.",
      "Caesar's favorite drink is Bloxy Cola, with creamy milk being a close second.",
      "Caesar has an irrational fear of spiders, and bugs in general.",
      "Caesar was the first character made for The Lore, and has gone through several redesigns and total reworks. His creation date goes as far back as 2020!"
    ]
  },
  
  abilityName: "The Electrogravitic Flow",
  stats: createCharacterStats("B", "A", "C", "A")
};
