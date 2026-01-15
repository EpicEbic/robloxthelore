
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const theBreadwinner: WikiEntry = {
  id: "the-breadwinner",
  title: "The Breadwinner",
  description: "The Breadwinner is short-tempered, but genuine and pure in heart. He loves nothing more than to fill the stomachs of Bloxians in need, generously donating entire portions of his body to feed the starving.",
  preview: "A sentient loaf of bread with a big and doughy heart, aspiring to feed the hungry and defend them from the cruelties of the Bloxiverse.",
  content: "",
  category: "character",
  subcategory: "noncanon",
  imageUrl: "/lovable-uploads/1e7da8d1-d02a-42ea-a374-4267cd912e99.png",
  lastUpdated: "2025-06-16",
  part: "TEMP",
  relatedEntries: [],
  quote: {
    text: "You want a piece of me? Huh, pal!? ...no, really. Do you?",
    context: "The Breadwinner, offering a nutritiously delicious portion of himself to a hungry Bloxian."
  },
  species: "Unknown (Sentient Bread)",
  age: "Unknown",
  height: "5 studs",
  status: "Alive",
  alignment: "Chaotic/Good",
  role: "Chaperone",
  archetype: "chaperone",
  carouselImages: [
    {
      url: "/lovable-uploads/1e7da8d1-d02a-42ea-a374-4267cd912e99.png",
      caption: "The Breadwinner, striking a valiant pose with his Baguette Baton."
    },
    {
      url: "/lovable-uploads/81cde0d1-0efe-4218-a029-fee21d0b7168.png",
      caption: "The Breadwinner is... riding a toaster oven? Okay."
    },
    {
      url: "/lovable-uploads/e25c58eb-1c42-411b-8494-461e90240a5d.png",
      caption: "Don't get too close! The Breadwinner has set himself and his Baguette Baton ablaze!"
    }
  ],
  abilityCarouselImages: [],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "The Breadwinner isn't any stronger than your usual Bloxian, though his spongy body works great for absorbing physical impacts and sharp stabs. He has no internal organs or vital points where an attack would prove fatal, making him effectively immortal.",
        "His main method of combat involve suffocation, meshing his body around the mouths and nostrils of any Bloxians who aren't strong enough to pry him off. He also has a Baguette Baton which is surprisingly solid, making it an awesome choice for dishing out blunt-force trauma."
      ],
      combatStats: createCombatStats("F", "S", "E", "F", "D")
    },
    {
      id: "blazing",
      label: "Blazing",
      description: [
        "If all else fails, the Breadwinner has been known to set himself (and his Baguette Baton) ablaze and charge towards the opponent. While being on fire is nothing short of excruciating, the Breadwinner will inevitably recover from the charring, while any targets he sets ablaze are far more likely to suffer greater burns."
      ],
      combatStats: createCombatStats("C", "B", "E", "F", "D")
    }
  ],
  sections: {
    overview: [
      "The Breadwinner is a character in The Lore whose role and significance in the plot contribute to the overall narrative. His presence adds to the diverse cast of characters that populate the Bloxiverse.",
      "The Breadwinner's character helps expand the lore and provides additional context for the various individuals and groups that exist within the series' universe."
    ],
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "The Breadwinner isn't any stronger than your usual Bloxian, though his spongy body works great for absorbing physical impacts and sharp stabs. He has no internal organs or vital points where an attack would prove fatal, making him effectively immortal."
        ],
        combatStats: createCombatStats("F", "S", "E", "F", "D"),
        combatStyleData: {
          overview: {
            text: [
              "The Breadwinner isn't any stronger than your usual Bloxian, though his spongy body works great for absorbing physical impacts and sharp stabs. He has no internal organs or vital points where an attack would prove fatal, making him effectively immortal."
            ]
          },
          offensive: {
            techniques: [
              {
                id: "suffocation",
                title: "Suffocation",
                description: [
                  "His main method of combat involve suffocation, meshing his body around the mouths and nostrils of any Bloxians who aren't strong enough to pry him off."
                ]
              },
              {
                id: "baguette-baton",
                title: "Baguette Baton",
                description: [
                  "He also has a Baguette Baton which is surprisingly solid, making it an awesome choice for dishing out blunt-force trauma."
                ]
              }
            ]
          }
        }
      },
      {
        id: "blazing",
        label: "Blazing",
        description: [
          "If all else fails, the Breadwinner has been known to set himself (and his Baguette Baton) ablaze and charge towards the opponent."
        ],
        combatStats: createCombatStats("C", "B", "E", "F", "D"),
        combatStyleData: {
          overview: {
            text: [
              "If all else fails, the Breadwinner has been known to set himself (and his Baguette Baton) ablaze and charge towards the opponent. While being on fire is nothing short of excruciating, the Breadwinner will inevitably recover from the charring, while any targets he sets ablaze are far more likely to suffer greater burns."
            ]
          }
        }
      }
    ],
    appearance: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "The Breadwinner is a short, spongy Bloxian belonging to an unknown race. His body is entirely composed of cooked dough, effectively making him sentient bread. He has no discernable facial features (or any bodily features at all beyond the bread), yet is perfectly capable of communication, breathing, and other bodily functions that would otherwise require organs."
        ]
      }
    ],
    personality: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "The Breadwinner is short-tempered but genuine and pure in heart. He loves nothing more than to fill the stomachs of Bloxians in need, generously donating entire portions of his body to feed the starving. His generosity and purity have established him as a much-welcomed figure within many communities of the Bloxiverse.",
          "Despite his squishy exterior, the Breadwinner is far from a softie. He has very little patience for those who treat him poorly (or those he perceives as treating him poorly) and can be quick to anger. He is surprisingly competent for a sentient loaf of bread, often proving himself more than capable of holding his own in intellectual debates or arguments."
        ]
      }
    ],
    lifestyle: [
      {
        id: "wanderer",
        label: "Wanderer",
        description: [
          "The Breadwinner travels all across the Bloxiverse, in search of mouths to feed and famine to destroy. He is driven by his life's motivation and purpose, wishing for nothing more. He happily sacrifices portions of himself to Bloxians of all kinds, eager to please and happy to oblige. Besides, his body will end up regrowing once he drinks more water, so why not use his 'powers' for good?"
        ]
      },
      {
        id: "bakery-work",
        label: "Bakery Work",
        description: [
          "The Breadwinner will occasionally work within bakeries in the Bloxiverse, with many chefs and bakers valuing him for his bready body. In exchange for his services, bakeries will often provide him with a place to sleep (why does bread even need to sleep?) and water."
        ]
      }
    ],
    relationshipsData: {},
    abilityData: {
      overview: {
        text: [
          "The Breadwinner's body constantly regenerates more dough, eventually cooking and shaping into bread through the Breadwinner's natural body heat. So long as the Breadwinner is supplied with adequate water, his body will autonomously produce dough as necessary."
        ]
      },
      passives: {
        techniques: [
          {
            id: "regeneration",
            title: "Regeneration",
            description: [
              "The Breadwinner's body constantly regenerates more dough, eventually cooking and shaping into bread through the Breadwinner's natural body heat. So long as the Breadwinner is supplied with adequate water, his body will autonomously produce dough as necessary."
            ]
          },
          {
            id: "immortality",
            title: "Effective Immortality",
            description: [
              "The Breadwinner has no internal organs or vital points where an attack would prove fatal, making him effectively immortal."
            ]
          }
        ]
      }
    },
    trivia: [
      "The Breadwinner's design was originally much more complicated, featuring toaster-based armor. It was eventually scrapped, as the simplicity of the Breadwinner's design is far more charming. (His toaster-riding carousel image is a direct reference to his scrapped armor concept, as the oven he sits on was used as the breastplate.)",
      "The Breadwinner is a custom, non-canon character created as a tribute to a friend."
    ]
  },
  
  abilityName: "Breadipulation",
  stats: createCharacterStats("F", "S", "E", "D")
};
