
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats } from "@/components/character/character-stat-chart";

export const builderman: WikiEntry = {
  id: "builderman",
  title: "Builderman",
  description: "The cheery and energetic leader of the Buildermen faction, bestowed with divine creation powers by Roblox themselves.",
  preview: "The cheery and energetic leader of the Buildermen faction, bestowed with divine creation powers by Roblox themselves.",
  content: "Builderman is the head and founder of the Buildermen, a faction dedicated to the production and distribution of homes and material goods for Bloxians in need. He is somewhat of a celebrity, recognized for his cheery disposition and incredible generosity. His powers only further his potential for good deed, which he is quick to take advantage of.",
  category: "character",
  subcategory: "neutral",
  imageUrl: "/lovable-uploads/7538154d-b20f-425d-96c3-734e192cf42c.png",
  lastUpdated: "2025-01-26",
  
  quote: {
    text: "A mansion? A rocket? A city? The only limit is my imagination!",
    context: "Builderman, claiming to a civilian that his limit really is his imagination."
  },
  species: "Noob",
  age: "N/A (Divine Youth)",
  alignment: "Lawful/Good",
  
  carouselImages: [
    {
      url: "/lovable-uploads/7538154d-b20f-425d-96c3-734e192cf42c.png",
      caption: "Builderman, sitting atop the Banhammer bestowed to him by Roblox."
    },
    {
      url: "/lovable-uploads/e1a7d960-5bb1-483a-a8ca-4155146dc74d.png",
      caption: "Builderman is chatting with Bloxxanne. He looks awfully nervous, I wonder why? He isn't even making eye contact!"
    },
    {
      url: "/lovable-uploads/0e413cd2-c329-4001-89b1-4512be339f17.png",
      caption: "Yo, Builderman. Are you feeling okay...?"
    }
  ],
  
  sections: {
    appearance: "Builderman is an average-built Noob. He wears a hoodie embroidered with the Roblox 'R' sigil, as well as the full word across his left arm. He often keeps his hood up, concealing a construction worker's hard hat underneath. Both of his wrists have been wrapped in cloth, though he insists that they're just for the aesthetic and that he isn't injured. Typically, Builderman will carry the Banhammer with him, wherever he may go.",
    
    personality: [
      "Builderman is cheery, energetic, and an incredibly pleasant individual to be around. He values each and every Bloxian equally, holding highly respectable morals and a noble heart. He does tend to be a bit of a showoff at times, though it's all well-intentioned and never done purely to flex. These qualities have placed him as the leader of the Buildermen, an engineering faction dedicated to providing homes and resources to Noobs and Robloxians alike.",
      
      "Builderman tries to remain positive, even in the toughest of situations, though sometimes things just tend to dig at him a little bit. Pushing his buttons or saying the wrong things can cause him to snap, often leading to him getting incredibly angry or upset. He has teared up on multiple occasions, thanks to mean individuals saying hurtful things. Despite these feelings, he never abuses his powers or his hammer on anybody else unless they threaten him. He may be kind, but he won't hesitate to put you in your place if you get out of line."
    ],
    
    lifestyle: [
      "Builderman is the head and founder of the Buildermen, a faction dedicated to the production and distribution of homes and material goods for Bloxians in need. He is somewhat of a celebrity, recognized for his cheery disposition and incredible generosity. His powers only further his potential for good deed, which he is quick to take advantage of.",
      
      "Builderman was one of the firstly-created Noobs to exist, and was soon chosen by Roblox to be bestowed incredible gifts. He is the first (and only) Noob to be bestowed with the power to create Worlds (an ability otherwise exclusive to Robloxians) and was given a powerful tool known as the Banhammer to manage and keep other Noobs in line, should they revolt or become unruly as the Guests had before them. Builderman demonstrated incredible restraint and fairness within his duties, earning Roblox's trust and appreciation. Builderman upkept his duties, even beyond Roblox's disappearance after the creation of the Robloxians. He longs for Roblox to return, but understands that Roblox's grand plan is likely far beyond Builderman's own comprehension.",
      
      "Builderman has also taken it upon himself to protect the Bloxiverse from the R-Orb, a powerful artifact housing an impossible evil with the potential to destroy the Bloxiverse. He keeps it locked away in a secret bunker, far away from any Bloxians. All it would take is one touch to ruin it all. Builderman considers this a duty above even the duties sworn to him by Roblox. He will do anything within his power to prevent any and all from reaching the R-Orb.",
      
      "Nowadays, Builderman continues his duties sworn to him by Roblox, while acting as a generous public figure for Bloxians in need. Every moment he's awake, he hopes to see Roblox again someday."
    ],
    
    relationships: [
      "Bloxxanne Whelder - Friend | Builderman has placed Bloxxanne as one of the managers for the Buildermen, as Bloxxanne shows promising potential and high intelligence within her field of engineering. (He's also got a bit of a crush.)",
      
      "Roblox - Family | While Roblox may not be biological/direct family to Builderman, the two have spent countless eons together and Builderman has long-since considered Roblox his family."
    ],
    
    combat: [
      "In most situations, Builderman easily outclasses any opponent. His Banhammer is a divine, unstoppable weapon capable of obliterating any and all that are struck by it. The hammer is weightless when being lifted by those with Roblox's blessing, and otherwise has an impossible weight that even the strongest of Bloxians could only dream of lifting, let alone swinging. Builderman himself is also rather durable, his head protected by his hard-hat. In hand-to-hand combat, he shows only average potential. He hasn't found training necessary, seeing as most fights are one-and-done thanks to his hammer."
    ],
    
    abilityDetails: [
      "Builderman has been bestowed the gift of creation by Roblox themselves, a divine gift to help make the Bloxiverse a better place. This ability enables Builderman to fathom in material objects and structures in mere seconds, producing anything from raw materials, to finished complex products such as a house (with utilities) or a phone. Builderman's only drawback is having to comprehend and understand what he is building, before he builds it. He cannot produce structures or objects that are unfathomable, infinite in size, non-existent, etc.",
      "Despite being a Noob, Builderman is also capable of producing Worlds, a quality normally exclusive to the Robloxian race. This is a byproduct of Roblox's creative blessing, enabling Builderman even more creative freedom than he already has."
    ],
    offensiveCapabilities: [
      "FILLER"
    ],
    defensiveCapabilities: [
      "FILLER"
    ],
    utilitarianCapabilities: [
      "FILLER"
    ],
    drawbacks: [
      "FILLER"
    ],
    
    trivia: [
      "Builderman has an addiction to herbal tea.",
      "Builderman is based off of a real Roblox user of the same name."
    ]
  },
  
  abilityName: "Creation",
  stats: createCharacterStats("S", "A", "Ø", "A")
};
