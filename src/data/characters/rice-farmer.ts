
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const riceFarmer: WikiEntry = {
  id: "rice-farmer",
  title: "Rice Farmer",
  description: "A gentle and hardworking farmer who tends to the rice crops in the Farmer Sanctuary. Known for his simple lifestyle, positive outlook, and unwavering dedication to his craft.",
  preview: "A gentle and honorable civilian who lives a humble, pure lifestyle. Rice brings joy to those around him.",
  content: "",
  category: "character",
  subcategory: "neutral",
  imageUrl: "/images/rice-1.png",
  lastUpdated: "2025-01-26",
  relatedEntries: ["caesar-bloxwright", "nauli-parter"],
  
  quote: {
    text: "What a beautiful day.",
    context: "Rice Farmer, admiring the world around him as the sun rises in the Farmer Sanctuary."
  },
  species: "Noob",
  age: "55",
  alignment: "Neutral/Moral",
  role: "Altruist",
  
  carouselImages: [
    {
      url: "/images/rice-1.png",
      caption: "Rice, watching the sun rise on a brand new day of work."
    },
    {
      url: "/images/rice-2.png",
      caption: "Rice, working the fields as rice seeds are planted in the soil."
    },
    {
      url: "/images/rice-3.png",
      caption: "Rice, playfully teased by his brothers for his bald head. (Even though they're all bald.)"
    }
  ],
  
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Rice is an untrained and weak fighter with essentially no means to defend himself. He has essentially zero battle intelligence, nor does he particularly excel in any field beyond the fields he plows. He is an easy mark for just about any opponent who wishes to inflict pain.",
        "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this."
      ],
      combatStats: createCombatStats(
        "F", // Strength
        "F", // Durability
        "F", // Agility
        "F", // Precision
        "E", // Intelligence
        {
          // Strength subcategories
          power: "F",
          lift: "F",
          penetration: "F",
          intensity: "F",
          // Durability subcategories
          toughness: "F",
          vitality: "D",
          thermostability: "C",
          esotolerance: "F",
          // Agility subcategories
          swiftness: "F",
          acceleration: "F",
          flexibility: "E",
          endurance: "D",
          // Precision subcategories
          accuracy: "F",
          range: "F",
          dexterity: "E",
          reactivity: "F",
          // Intelligence subcategories
          tactility: "F",
          wisdom: "C",
          foresight: "E",
          sanity: "B"
        }
      )
    },
    {
      id: "rake",
      label: "Rake",
      description: [
        "In a pinch, Rice can opt to use his farming rake as a weapon against his enemies. He struggles to wield it properly, but a weapon of any form is better than using his fists alone.",
        "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this.",
        "Rice's rake is almost always dirty, as well as rusted from years of exposure to moist soil and mud. This essentially gives a guarantee that whoever is scraped or jabbed by it is bound to get an infection of some kind. Of course, disease normally takes hours, days, or weeks to be effective... so this won't do much to save Rice in the heat of combat.",
        "Rice struggles to swing the rake accurately or consistently, so he'll often stick it outwards, aiming towards enemies to keep them at bay. Even so, Rice is slow to turn when extending the rake far out, mainly due to the significant weight of the large tool."
      ],
      combatStats: createCombatStats(
        "E", // Strength
        "F", // Durability
        "F", // Agility
        "F", // Precision
        "E", // Intelligence
        {
          // Strength subcategories
          power: "E",
          lift: "F",
          penetration: "E",
          intensity: "F",
          // Durability subcategories
          toughness: "F",
          vitality: "D",
          thermostability: "C",
          esotolerance: "F",
          // Agility subcategories
          swiftness: "F",
          acceleration: "F",
          flexibility: "E",
          endurance: "D",
          // Precision subcategories
          accuracy: "F",
          range: "F",
          dexterity: "E",
          reactivity: "F",
          // Intelligence subcategories
          tactility: "F",
          wisdom: "C",
          foresight: "E",
          sanity: "B"
        }
      ),
      combatStyleData: {
        overview: {
          text: [
            "In a pinch, Rice can opt to use his farming rake as a weapon against his enemies. He struggles to wield it properly, but a weapon of any form is better than using his fists alone."
          ]
        },
        passives: {
          techniques: [
            {
              id: "resourceful",
              title: "Resourceful",
              description: [
                "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this."
              ]
            },
            {
              id: "infecting",
              title: "Infecting",
              description: [
                "Rice's rake is almost always dirty, as well as rusted from years of exposure to moist soil and mud. This essentially gives a guarantee that whoever is scraped or jabbed by it is bound to get an infection of some kind.",
                "Of course, disease normally takes hours, days, or weeks to be effective... so this won't do much to save Rice in the heat of combat."
              ]
            }
          ]
        },
        offensive: {
          techniques: [
            {
              id: "rakespear",
              title: "Rakespear",
              description: [
                "Rice struggles to swing the rake accurately or consistently, so he'll often stick it outwards, aiming towards enemies to keep them at bay. Even so, Rice is slow to turn when extending the rake far out, mainly due to the significant weight of the large tool."
              ]
            }
          ]
        }
      },
      images: [
        {
          url: "/images/rice-rake-1.png",
          caption: "Rice, holding his rake forward akin to a spear."
        }
      ]
    }
  ],
  
  sections: {
    appearance: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Rice Farmer is a standard-height Noob. He has pale, peachy skin (especially so for a Noob) and clothing which hides his blue torso and green legs, often causing others to confuse him as a Robloxian. He is often seen in a blue variant of the uniform worn by most who reside within the Farmer Sanctuary, a shirt which has been strapped down by brown overalls and a belt. He wears a straw-knit cone hat, obscuring his bare head and forehead from view. A brown pouch is hoisted onto the strap of his overall, providing him space to hold seeds and other small goods.",
          "Rice almost always carries a large rake around while working on the farm. It is nearly double his own height, and he clearly struggles to wield it at times."
        ]
      }
    ],
    personality: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Rice is a gentle, simplistic soul who loves nothing more than his honest work as a farmer, aspiring to feed the hungry and provide for his farming family. He treats any that he meets with respect and compassion, even if they do not treat him the same. Rice is often remembered by most for his kindness and genuinity, considered to be a friendly face almost unanimously.",
          "Rice has a strong distaste for violence and anything criminalistic, actively avoiding conflict whenever possible. He and his family are relatively defenseless, making Rice an easy target for just about any threats that wish to bring harm upon them. Rice believes it is better to submit, comply, or flee when faced with antagonism out of fear for the potential consequences if he tries to resist."
        ]
      }
    ],
    lifestyle: [
      {
        id: "hard-at-work",
        label: "Hard At Work",
        description: [
          "Rice is among one of the many farmers who reside within the Farmer Sanctuary, a Robloxian world dedicated to agriculture and peaceful livings. Rice, naturally, is assigned to cater to the rice plot within the farm and process it at the end of each cycle. He is a dedicated man of his craft, always giving his plants the utmost attention and care.",
          "Rice is well-known among the Farmer Sanctuary's workers, praised by many for the effort he puts into his work. He always aspires to give his job 110% of his energy and skills, placing him into high regards by most. When the time comes to chart up the amount of produce brought in by each individual farmer, Rice is, more often than not, near or at the top."
        ]
      },
      {
        id: "out-of-work",
        label: "Out Of Work",
        description: [
          "Rice will often exhaust the work cut out for him earlier on in the day, leading him to bumble around the farm in search of his family members to help. He doesn't like to slack off if there's any work to be done, even if that work isn't his own. Whether the task is big or small, Rice is happy to help out his beloved family. He'll continue on and seek out as many farmers as he can to help, even if they are handling a crop that he isn't entirely familiar with. To him, it is a learning opportunity to be taken.",
          "Once Rice has officially run dry of any remaining work for the day, only then can he finally rest comfortably. He'll kick back and relax, leisurely reading whilst he basks in the sunlight. He has amassed a remarkably large library of books, kept within his room in the rice barn. He's gone through each book countless times, speed-reading until the sun's light is gone and it is too dark to see. Lying on his hammock, he wastes no time dozing off into the quiet of the night. After all, a whole new day of work awaits him! What kind of man would he be to keep it waiting?"
        ]
      }
    ],
    history: [
      {
        id: "grown-with-care",
        label: "Grown With Care",
        description: [
          "Many, many years ago, there was a farmer known as Ahlias. He was born into the Farmer Sanctuary by a loving mother and father, alongside two brothers known as Jeremiah and Bolos. From a young age, he and his siblings were trained in the ways of agriculture, raised with a deep connection for the plants they would inherit and cater towards as adults. They all exceeded the expectations of their parents, especially Ahlias; He was known to work particularly hard without tiring or showing signs of stress.",
          "Eventually, the brothers matured, and the time came for them to inherit their own plots of land within the sanctuary. A ceremony was held in celebration, a night that all three brothers remember fondly. Ahlias was quieter and shy, but even he enjoyed being the center of attention. Though eventually, the party came to an end and Ahlias, Jeremiah, and Bolos were officially positioned within their own plots. This marked a turning point in their lives, officially entering adulthood.",
          "As time went on, Ahlias became the caretaker for the farm's rice supplies, while Jeremiah did so with wheat, and Bolos did so with the peach orchard. It took time for the trio to become used to their new positions, often looking back fondly on the memories they had when they were younger. They missed working together every day, living a happy and carefree lifestyle. It was melancholic to reminisce on the memories, but the brothers felt fulfilled by the new duties given to them. They were happy, and all was well."
        ]
      },
      {
        id: "ruin",
        label: "Ruin",
        description: [
          "One fateful morning, Ahlias awoke to the smell of smoke and the sounds of shouting from outside his barn. He peered through the window, his heart sinking as he quickly realized what was happening. A group of bandits were tearing apart the sanctuary and ransacking their supplies. Embers swirled through the air as nearby buildings blazed, many farmers laying motionless on the dirt. Their bodies were either beaten, burned, flayed, or twisted into impossible positions. Ahlias watched in horror, unsure of what to do.",
          "He hesitated, countless thoughts flooding his mind. Where were his brothers, or his parents? What did the intruders want, why were they here? Ahlias quickly snatched his rake from the wall and held it tightly to his chest, his body frozen from a mix of indecisiveness and fear. Ahlias knew that the bandits would inevitably kill him if he were to try and confront them, but could he really leave his family to die? Before he had a chance to resolve his decision, a molotov crashed through his window and lit his room ablaze, forcing Ahlias to flee his room as well as the barn. He was quickly cast into the fray outside.",
          "Ahlias ran from his home as quickly as he could, diving into a thick shrub where he crashed into Jeremiah, who was also hiding inside. Ahlias tried to question the situation, but Jeremiah explained that as far as he knew, the attack had just begun. They waited patiently from within the bush, stifling their cries and holding each other close, ignoring the crashing and screaming as best they could. They feared that when the bandits finally leave the sanctuary, they would be the only two left. They tried to suppress the thoughts, remaining still and horrified until the yelling of many became fewer.",
          "Ahlias nor Jeremiah could bear the unknown, especially after all had fallen silent around them-- save for the crackling of barns and plants still smouldering from the fires. They came to an agreement to peek out and see the damages, and eventually did so despite the hesitation. Peering out into their surroundings, they were circled by countless mutilated bodies, collapsed ruins, and dying flames. Ahlias couldn't help but scream from the sights, which would prove to be a grave mistake. A few of the invaders were still nearby and heard Ahlias' cries, quickly swarming the pair and cornering them.",
          "Just as the bandits lunged towards the duo to slaughter them, Bolos emerged from around the corner and charged down the group. Bolos wasted no time and took advantage of his surprise attack, smashing down the intruders and beating them senselessly until they no longer moved. Some of them tried to resist, but Bolos held overwhelming strength and resolve, eventually bending and breaking them one by one. The other bandits had watched Bolos annihilate multiple of their men at once, and decided to retreat early on with the supplies they had already claimed. Bolos tried to chase them down as they fled the world, but Jeremiah convinced him to stop and help the survivors instead.",
          "With the brothers properly reunited amidst the chaos, they began to search and rescue any survivors of the attack, though most were fatally wounded or had already passed on from their injuries. It wasn't long before they stumbled upon their mother and father, quickly rushing to their aid. Their father was already dead from his wounds, cut and drained of his blood. Their mother laid on the ground, partially crushed under the rubble of a building that had collapsed from the fire. Bolos quickly freed and carried their mother and father away, leaving Ahlias and Jeremiah to continue their search and put out the remaining fires. Some time later, their mother eventually fell into a coma and passed away soon after in her sleep.",
          "In the span of a morning, everything they had achieved in life was ripped away from them. The population of the sanctuary was cut by almost 85%, leaving the brothers and a handful of survivors to rebuild from the ashes."
        ]
      },
      {
        id: "reconstruction",
        label: "Reconstruction",
        description: [
          "It took many years for the remaining survivors to properly recover, both physically and emotionally. Many of them were left permanently disabled or critically wounded, while others dealt with trauma far beyond the point of recovery. Jeremiah fell into a depressive spiral, while Bolos was left with a spinal injury from the conflict. Ahlias battled with his own emotional struggles, but he put them aside to keep a smile on his face and assist his brothers in their recovery, doing what he could to make sure they stayed happy and motivated.",
          "Eventually, the Farmer Sanctuary recovered from the attack, though the size of the village had been significantly reduced, mainly due to the loss of their people. Decades passed, but the sanctuary eventually returned to their golden age once again. With age came acceptance for the brothers, who regularly held a ceremony in honor of the fallen, just as the fallen had once held a ceremony for them. During one of these ceremonies, Ahlias announced that he'd be changing his name to honor their parents, planning to adopt his mother's nickname 'Ricey'.",
          "Ahlias went on to become Rice, and eventually his brothers also decided to participate in the honoring. Jeremiah changed his name to Whyeet to honor the crop their father had assigned him to, while Bolos became Peaches to honor the orchard his mother gifted him. Rice decided to take and wear the wicker cone his father once wore, while Whyeet took their mother's and Peaches took their late grandmother's. From then on, their new identities were set in stone, and their life continued on the path to produce. It was a moment of growth for the trio, although bittersweet."
        ]
      }
    ],
    relationshipsData: {
      "whyeet": {
        status: "Brother",
        history: [
          "Rice and Whyeet are closely-knit brothers alongside their other brother, Peaches. They have been through all of life together, and dealt with their trauma alongside one another. Rice and Whyeet have an unbreakable brotherly bond."
        ]
      },
      "peaches": {
        status: "Brother",
        history: [
          "Rice and Peaches are closely-knit brothers alongside their other brother, Whyeet. They have experienced all of their life together, supporting each other whenever necessary. Rice and Peaches have an unbreakable brotherly bond."
        ]
      },
      "caesar-bloxwright": {
        status: "Close Friend",
        history: [
          "Rice met Caesar during Bryck Manning's attack on the sanctuary, where Caesar came to their aid and apprehended Bryck. The two met and quickly clicked with one another, eventually deciding to spend time together and becoming good friends. Rice enjoys Caesar's companionship and protection, while Caesar admires Rice's wisdom and genuinity. Rice has also begun to assist Caesar in his gardening, teaching him methods and techniques, while sharing the secrets to healthy plant growth."
        ]
      },
      "nauli-parter": {
        status: "Friend",
        history: [
          "Rice met Nauli through her affiliation to Caesar, particularly when she assisted Caesar in the apprehension of Bryck Manning when he was attacking the sanctuary. Rice has never grown particularly close to Nauli, but is extremely appreciative of her protection and assistance on the day of the attack. When visiting Caesar's Isle, he'll often help Nauli cook or clean up when he can to show his appreciation."
        ]
      }
    },
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Rice is an untrained and weak fighter with essentially no means to defend himself. He has essentially zero battle intelligence, nor does he particularly excel in any field beyond the fields he plows. He is an easy mark for just about any opponent who wishes to inflict pain.",
          "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this."
        ],
        combatStats: createCombatStats(
          "F", // Strength
          "F", // Durability
          "F", // Agility
          "F", // Precision
          "E", // Intelligence
          {
            // Strength subcategories
            power: "F",
            lift: "F",
            penetration: "F",
            intensity: "F",
            // Durability subcategories
            toughness: "F",
            vitality: "D",
            thermostability: "C",
            esotolerance: "F",
            // Agility subcategories
            swiftness: "F",
            acceleration: "F",
            flexibility: "E",
            endurance: "D",
            // Precision subcategories
            accuracy: "F",
            range: "F",
            dexterity: "E",
            reactivity: "F",
            // Intelligence subcategories
            tactility: "F",
            wisdom: "C",
            foresight: "E",
            sanity: "B"
          }
        ),
      combatStyleData: {
        overview: {
          text: [
            "Rice is an untrained and weak fighter with essentially no means to defend himself. He has essentially zero battle intelligence, nor does he particularly excel in any field beyond the fields he plows. He is an easy mark for just about any opponent who wishes to inflict pain."
          ]
        },
        passives: {
          techniques: [
            {
              id: "resourceful",
              title: "Resourceful",
              description: [
                "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this."
              ]
            }
          ]
        }
      },
      images: [
        {
          url: "/images/rice-fists-1.png",
          caption: "Rice, raising his fists to participate in a fight he definitely isn't going to win."
        }
      ]
    },
    {
      id: "rake",
        label: "Rake",
        description: [
          "In a pinch, Rice can opt to use his farming rake as a weapon against his enemies. He struggles to wield it properly, but a weapon of any form is better than using his fists alone.",
          "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this.",
          "Rice's rake is almost always dirty, as well as rusted from years of exposure to moist soil and mud. This essentially gives a guarantee that whoever is scraped or jabbed by it is bound to get an infection of some kind. Of course, disease normally takes hours, days, or weeks to be effective... so this won't do much to save Rice in the heat of combat.",
          "Rice struggles to swing the rake accurately or consistently, so he'll often stick it outwards, aiming towards enemies to keep them at bay. Even so, Rice is slow to turn when extending the rake far out, mainly due to the significant weight of the large tool."
        ],
        combatStats: createCombatStats(
          "E", // Strength
          "F", // Durability
          "F", // Agility
          "F", // Precision
          "E", // Intelligence
          {
            // Strength subcategories
            power: "E",
            lift: "F",
            penetration: "E",
            intensity: "F",
            // Durability subcategories
            toughness: "F",
            vitality: "D",
            thermostability: "C",
            esotolerance: "F",
            // Agility subcategories
            swiftness: "F",
            acceleration: "F",
            flexibility: "E",
            endurance: "D",
            // Precision subcategories
            accuracy: "F",
            range: "F",
            dexterity: "E",
            reactivity: "F",
            // Intelligence subcategories
            tactility: "F",
            wisdom: "C",
            foresight: "E",
            sanity: "B"
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "In a pinch, Rice can opt to use his farming rake as a weapon against his enemies. He struggles to wield it properly, but a weapon of any form is better than using his fists alone."
            ]
          },
          passives: {
            techniques: [
              {
                id: "resourceful",
                title: "Resourceful",
                description: [
                  "Rice is known by many for his resourcefulness and the awareness of his surroundings. When fleeing from conflict, he'll often take advantage of the environment in any way he can. Throwing rocks, crawling through tight spaces, or swinging whatever he can get his hands on are just a few examples of this."
                ]
              },
              {
                id: "infecting",
                title: "Infecting",
                description: [
                  "Rice's rake is almost always dirty, as well as rusted from years of exposure to moist soil and mud. This essentially gives a guarantee that whoever is scraped or jabbed by it is bound to get an infection of some kind.",
                  "Of course, disease normally takes hours, days, or weeks to be effective... so this won't do much to save Rice in the heat of combat."
                ]
              }
            ]
          },
          offensive: {
            techniques: [
              {
                id: "rakespear",
                title: "Rakespear",
                description: [
                  "Rice struggles to swing the rake accurately or consistently, so he'll often stick it outwards, aiming towards enemies to keep them at bay. Even so, Rice is slow to turn when extending the rake far out, mainly due to the significant weight of the large tool."
                ]
              }
            ]
          }
        },
        images: [
          {
            url: "/images/rice-rake-1.png",
            caption: "Rice, holding his rake forward akin to a spear."
          }
        ]
      }
    ],
    trivia: [
      "Caesar gifted Rice a flower he had grown from his garden, a charm that Rice often carries on his person as a good luck charm.",
      "Rice is a vegetarian, aside from his love for chicken.",
      "Rice is inspired by an old Roblox outfit I (EpicEbic) made back in 2016! He has gone through a handful of redesigns to fit The Lore, and was eventually inserted as an OC! This technically makes Rice the first Lore character, chronologically speaking."
    ]
  },
  
  stats: createCharacterStats("F", "F", "F", "F")
};
