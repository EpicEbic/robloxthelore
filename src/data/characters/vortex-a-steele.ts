
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const vortexASteele: WikiEntry = {
  id: "vortex-a-steele",
  title: "Vortex A. Steele",
  description: "Sharp, quick-witted, and stubborn, Vortex is a high-ranking Bounty Hunter for the Hunter Association who carries a small temper but has a good heart.",
  preview: "A stubborn, yet sharp and quick-witted bounty hunter with an unyielding dedication to his craft.",
  content: "",
  category: "character",
  subcategory: "protagonist",
  imageUrl: "/lovable-uploads/1eb00c46-6380-421c-85e0-473d69b1d989.png",
  lastUpdated: "2025-05-26",
  quote: {
    text: "The clock is ticking, man. If you value your life, you'd best get on with yappin' already.",
    context: "Vortex, threatening a target during his interrogation after capturing them."
  },
  species: "Noob",
  age: "21",
  alignment: "Lawful/Neutral",
  carouselImages: [
    {
      url: "/lovable-uploads/1eb00c46-6380-421c-85e0-473d69b1d989.png",
      caption: "Vortex in his signature black gear, ready for action."
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Vortex primarily relies on his heightened agility, quick thinking, and incredible precision in combat. He is a master of body language, and can often predict the movements of his targets and react before they even begin to attack. Though he lacks natural strength or integrity, his ability to effortlessly avoid the attacks of combatants easily makes up for this."
      ],
      combatStats: createCombatStats(
        "D", // Strength: Main category average
        "D", // Durability: Main category average
        "B", // Agility: Main category average
        "B", // Precision: Main category average
        "A", // Intelligence: Main category average
        {
          // Strength subcategories
          penetration: "E",
          power: "D",
          intensity: "B",
          // Agility subcategories
          swiftness: "D",
          endurance: "B",
          flexibility: "C",
          // Precision subcategories
          accuracy: "B",
          reactivity: "C",
          dexterity: "B",
          // Intelligence subcategories
          tactility: "A",
          wisdom: "D",
          stability: "C",
          // Durability subcategories
          vitality: "C",
          toughness: "D",
          resistance: "E"
        }
      ),
      images: [
        {
          url: "/lovable-uploads/f387ffd7-944e-4544-9123-4a4656cfc89c.png",
          caption: "Vortex's agility and speed allows him to easily outpace slower targets like Caesar, giving him an edge."
        }
      ]
    },
    {
      id: "mag-num",
      label: "Mag-num",
      description: [
        "Vortex is armed with a high-caliber magnetic railgun created by Ren Bytera, which has been compacted down into the size and shape of a large handheld revolver. Through the use of electromagnets, the Mag-num can fire almost anything made of magnetized metal at extremely high velocities, so long as it can fit inside of the barrel-- though it does come with specialized ammunition designed for use with the gun."
      ],
      combatStats: createCombatStats(
        "D", // Strength: Main category average
        "D", // Durability: Main category average
        "D", // Agility: Main category average
        "A", // Precision: Main category average
        "A", // Intelligence: Main category average
        {
          // Strength subcategories
          penetration: "C",
          power: "D",
          intensity: "A",
          // Agility subcategories
          swiftness: "D",
          endurance: "B",
          flexibility: "C",
          // Precision subcategories
          accuracy: "A",
          reactivity: "C",
          dexterity: "B",
          // Intelligence subcategories
          tactility: "A",
          wisdom: "D",
          stability: "C",
          // Durability subcategories
          vitality: "C",
          toughness: "D",
          resistance: "E"
        }
      ),
      images: [
        {
          url: "/lovable-uploads/9289b6a9-41e2-4023-9996-72493748bd7e.png",
          caption: "Vortex, taking aim with his Mag-num."
        },
        {
          url: "/lovable-uploads/bd5cf524-061d-4cab-8e20-4b7010aac45a.png",
          caption: "A close-up of Vortex's Mag-num."
        }
      ]
    },
    {
      id: "chronipulation-mag-num",
      label: "Chronipulation Mag-num",
      description: [
        "Vortex can channel the raw energy produced by Chronipulation and imbue it into his Mag-num. This temporarily overclocks his weapon, transforming it into a devastating hand-cannon with new (and enhanced) effects that give it an extra edge in dire combat situations that deem it necessary."
      ],
      combatStats: createCombatStats(
        "C", // Strength: Main category average
        "D", // Durability: Main category average
        "D", // Agility: Main category average
        "S", // Precision: Main category average
        "A", // Intelligence: Main category average
        {
          // Strength subcategories
          penetration: "A",
          power: "D",
          intensity: "S",
          // Agility subcategories
          swiftness: "D",
          endurance: "B",
          flexibility: "C",
          // Precision subcategories
          accuracy: "A",
          reactivity: "C",
          dexterity: "B",
          // Intelligence subcategories
          tactility: "A",
          wisdom: "D",
          stability: "C",
          // Durability subcategories
          vitality: "C",
          toughness: "D",
          resistance: "E"
        }
      ),
      images: [
        {
          url: "/lovable-uploads/c8949ba7-0df2-4911-bf84-9f38cdf51816.png",
          caption: "Vortex, overclocking his Mag-num through Chronipulation."
        },
        {
          url: "/lovable-uploads/ecc55a94-b059-4587-8989-39cac284c31a.png",
          caption: "A close-up of Vortex's Mag-num, when charged with his chrono-energy."
        }
      ]
    },
    {
      id: "amplification-gauntlet",
      label: "Amplification Gauntlet",
      description: [
        "The Amplification Gauntlet (informally known as the Amp Gauntlet) is a large, right-handed gauntlet which provides a significant boost to Vortex's physical strength, allowing him to achieve feats he couldn't achieve without it. With it, he can destroy most armor and reinforced structures through effort and dedication.",
        "It is an effective tool for tougher opponents or materials that require raw strength to bypass, though it is extremely heavy and greatly inhibits Vortex's speed while worn."
      ],
      combatStats: createCombatStats(
        "C", // Strength: Main category average
        "C", // Durability: Main category average
        "D", // Agility: Main category average
        "D", // Precision: Main category average
        "A", // Intelligence: Main category average
        {
          // Strength subcategories
          penetration: "C",
          power: "B",
          intensity: "D",
          // Agility subcategories
          swiftness: "D",
          endurance: "B",
          flexibility: "E",
          // Precision subcategories
          accuracy: "E",
          reactivity: "E",
          dexterity: "D",
          // Intelligence subcategories
          tactility: "A",
          wisdom: "D",
          stability: "C",
          // Durability subcategories
          vitality: "C",
          toughness: "C",
          resistance: "E"
        }
      ),
      images: [
        {
          url: "/lovable-uploads/a5823d3b-ab54-46b3-8840-30841d9a26a1.png",
          caption: "Vortex, having donned the Amplification Gauntlet. The heavy weight of the gauntlet has him tilting over a bit."
        },
        {
          url: "/lovable-uploads/4dabb92d-56c7-4bcd-8c0c-a4d961d400b7.png",
          caption: "A close up of the Amplification Gauntlet."
        }
      ]
    },
    {
      id: "chronipulation-amplification-gauntlet",
      label: "Chronipulation Amplification Gauntlet",
      description: [
        "By pouring vast quantities of the energy produced by Chronipulation into the Amp Gauntlet, Vortex can imbue the gauntlet with his energy, drastically improving the strength and speed behind it, alongside unlocking new techniques."
      ],
      combatStats: createCombatStats(
        "B", // Strength: Main category average
        "C", // Durability: Main category average
        "C", // Agility: Main category average
        "D", // Precision: Main category average
        "A", // Intelligence: Main category average
        {
          // Strength subcategories
          penetration: "B",
          power: "A",
          intensity: "C",
          // Agility subcategories
          swiftness: "C",
          endurance: "B",
          flexibility: "D",
          // Precision subcategories
          accuracy: "D",
          reactivity: "D",
          dexterity: "C",
          // Intelligence subcategories
          tactility: "A",
          wisdom: "D",
          stability: "C",
          // Durability subcategories
          vitality: "C",
          toughness: "C",
          resistance: "E"
        }
      ),
      images: [
        {
          url: "/lovable-uploads/8fe6a2a9-d1d8-4851-8279-6fffdb700310.png",
          caption: "Vortex, cycling his energy into the Amplification Gauntlet. The effort it takes to keep the Gauntlet attuned is exhausting."
        },
        {
          url: "/lovable-uploads/bba97565-da04-4abf-a43f-7651050e7c93.png",
          caption: "A close-up of the Amplification Gauntlet, when attuned to Vortex's Chronipulation."
        }
      ]
    }
  ],
  abilityCarouselImages: [
    {
      url: "/lovable-uploads/7016adac-ef98-4496-b501-31fb7f135fa6.png",
      caption: "As Vortex's body siphons time to accelerate his body, chronological fabrics appear as netting along his limbs."
    }
  ],
  sections: {
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Vortex primarily relies on his heightened agility, quick thinking, and incredible precision in combat. He is a master of body language, and can often predict the movements of his targets and react before they even begin to attack. Though he lacks natural strength or integrity, his ability to effortlessly avoid the attacks of combatants easily makes up for this."
        ],
        combatStats: createCombatStats(
          "D", // Strength: Main category average
          "D", // Durability: Main category average
          "B", // Agility: Main category average
          "B", // Precision: Main category average
          "A", // Intelligence: Main category average
          {
            // Strength subcategories
            penetration: "E",  // Very low penetration
            power: "D",        // Weak physical strength
            intensity: "B",    // Can maintain good pressure in combat
            // Agility subcategories
            swiftness: "D",    // Moderate speed
            endurance: "B",    // Good stamina
            flexibility: "C",  // Moderate flexibility
            // Precision subcategories
            accuracy: "B",    // Good accuracy
            reactivity: "C",  // Moderate reflexes
            dexterity: "B",   // Good motor control
            // Intelligence subcategories
            tactility: "A",   // Excellent tactical thinking
            wisdom: "D",      // Below average general intelligence
            stability: "C",  // Moderate mental stability
            // Durability subcategories
            vitality: "C",    // Moderate health
            toughness: "D",   // Below average toughness
            resistance: "E"   // Low environmental resistance
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "Vortex primarily relies on his heightened agility, quick thinking, and incredible precision in combat. He is a master of body language, and can often predict the movements of his targets and react before they even begin to attack. Though he lacks natural strength or integrity, his ability to effortlessly avoid the attacks of combatants easily makes up for this."
            ]
          }
        },
        images: [
          {
            url: "/lovable-uploads/f387ffd7-944e-4544-9123-4a4656cfc89c.png",
            caption: "Vortex's agility and speed allows him to easily outpace slower targets like Caesar, giving him an edge."
          }
        ]
      },
      {
        id: "mag-num",
        label: "Mag-num",
        description: [
          "Vortex is armed with a high-caliber magnetic railgun created by Ren Bytera, which has been compacted down into the size and shape of a large handheld revolver. Through the use of electromagnets, the Mag-num can fire almost anything made of magnetized metal at extremely high velocities, so long as it can fit inside of the barrel-- though it does come with specialized ammunition designed for use with the gun."
        ],
        combatStats: createCombatStats(
          "D", // Strength: Main category average
          "D", // Durability: Main category average
          "D", // Agility: Main category average
          "A", // Precision: Main category average
          "A", // Intelligence: Main category average
          {
            // Strength subcategories
            penetration: "C",  // Moderate penetration with weapon
            power: "D",        // Weak physical strength
            intensity: "A",    // High pressure in combat
            // Agility subcategories
            swiftness: "D",    // Moderate speed
            endurance: "B",    // Good stamina
            flexibility: "C",  // Moderate flexibility
            // Precision subcategories
            accuracy: "A",    // Excellent accuracy with weapon
            reactivity: "C",  // Moderate reflexes
            dexterity: "B",   // Good motor control
            // Intelligence subcategories
            tactility: "A",   // Excellent tactical thinking
            wisdom: "D",      // Below average general intelligence
            stability: "C",  // Moderate mental stability
            // Durability subcategories
            vitality: "C",    // Moderate health
            toughness: "D",   // Below average toughness
            resistance: "E"   // Low environmental resistance
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "Vortex is armed with a high-caliber magnetic railgun created by Ren Bytera, which has been compacted down into the size and shape of a large handheld revolver. Through the use of electromagnets, the Mag-num can fire almost anything made of magnetized metal at extremely high velocities, so long as it can fit inside of the barrel-- though it does come with specialized ammunition designed for use with the gun."
            ]
          },
          passives: {
            techniques: [
            {
              id: "target-lock",
              title: "Target Lock",
              description: [
                "The Mag-num has built-in auto-aim functionality, allowing it to strike targets with extreme accuracy and reliability. The specialized ammo designed for the Mag-num remains magnetically linked to the gun, even after it has left the barrel. So long as it retains a charge, Vortex can redirect the trajectory of bullets, allowing him to strike targets behind walls or other forms of cover.",
                "Even without the Target Lock functionality, Vortex has proven himself to be an adept marksman."
              ]
            },
            {
              id: "kinetic-battery",
              title: "Kinetic Battery",
              description: [
                "The Mag-num doesn't rely on conventional energy seen in most electric weaponry, and instead relies on recharging through physical motion provided by an internal gyroscope. As Vortex moves around (especially when using Chronipulation), the gun naturally feeds from the momentum to generate power."
              ]
            }
          ]
        },
        offensive: {
          techniques: [
            {
              id: "magnetic-shot",
              title: "Magnetic Shot",
              description: [
                "The Mag-num can charge up and fire specialized ammo by placing them into the chamber. These bullets can be fired at high velocities, capable of tearing through weaker materials and deeply penetrating others.",
                "When any charged projectiles run out of momentum (typically once they've embedded themselves in a target or structure), any remaining energy erupts in a small spark, harming anything it may have stuck itself inside."
              ]
            },
            {
              id: "railshot",
              title: "Railshot",
              description: [
                "By holding the trigger, Vortex can delay the firing process of his Mag-num. This can drastically overcharge and amplify the power behind the shot, allowing the bullet to reach insane velocities and liquify most materials it first comes into contact with. Bullets travelling these speeds can still be redirected by the Mag-num's Target Lock, though with significantly reduced turning speeds.",
                "As with the Mag-num's other projectiles, Railshot projectiles erupt into a spark once they've lost their momentum, releasing any remaining energy stored within. Railshot bullets often produce larger, volatile sparks that shock and burn whatever they may have embedded themselves within."
              ]
            },
            {
              id: "buckshot",
              title: "Buckshot",
              description: [
                "Using smaller magnetic shrapnel, Vortex can stuff multiple projectiles into a singular chamber, before firing them all at once. In a pinch, it can make for remarkably efficient crowd control, or a deadly blast for a singular, close-up target.",
                "Due to the sheer quantity of bullets, the Mag-num struggles to use Target Lock when firing such a large quantity at once. Unlike standard bullets, Buckshot shrapnel shards do not erupt into sparks or electricity when its momentum runs out, as they lack the makings of Vortex's specialized ammunition."
              ]
            }
          ]
        },
        defensive: {
          techniques: [
            {
              id: "mag-net",
              title: "Mag-net",
              description: [
                "By channeling the electromagnetic field used to charge and fire projectiles, Vortex can sacrifice his ability to fire the weapon in exchange for a barrier which catches and cancels the momentum of bullets fired towards him. In addition, the Mag-num consumes the kinetic energy provided by the bullets it stops, which in turn charge its battery.",
                "The Mag-num partially defends Vortex against electricity as well, though it can become overloaded very quickly. The Mag-net is also unable to fully halt the momentum of projectiles fired from high-caliber rifles or other, stronger weaponry."
              ]
            }
          ]
        },
        drawbacks: {
          techniques: [
            {
              id: "limited-capacity",
              title: "Limited Capacity",
              description: [
                "The bullets used by the Mag-num are bulky and take up a large amount of space, meaning Vortex can only carry a limited capacity. In longer, drawn-out fights, Vortex often needs to resort to metal scraps or other small magnetized debris he can get his hands on."
              ]
            },
            {
              id: "out-of-battery",
              title: "Out Of Battery",
              description: [
                "While the Mag-num is remarkably battery-efficient for a revolver of its caliber, it is still susceptible to running out of battery if Vortex over-uses it. It is important for Vortex to not overuse the Mag-num, lest it runs out of juice mid-combat."
              ]
            }
          ]
        }
      },
      images: [
        {
          url: "/lovable-uploads/9289b6a9-41e2-4023-9996-72493748bd7e.png",
          caption: "Vortex, taking aim with his Mag-num."
        },
        {
          url: "/lovable-uploads/bd5cf524-061d-4cab-8e20-4b7010aac45a.png",
          caption: "A close-up of Vortex's Mag-num."
        }
      ]
    },
    {
      id: "chronipulation-mag-num",
      label: "Chronipulation Mag-num",
      description: [
        "Vortex can channel the raw energy produced by Chronipulation and imbue it into his Mag-num. This temporarily overclocks his weapon, transforming it into a devastating hand-cannon with new (and enhanced) effects that give it an extra edge in dire combat situations that deem it necessary."
      ],
        combatStats: createCombatStats(
          "C", // Strength: Main category average
          "D", // Durability: Main category average
          "D", // Agility: Main category average
          "S", // Precision: Main category average
          "A", // Intelligence: Main category average
          {
            // Strength subcategories
            penetration: "A",  // High penetration with enhanced weapon
            power: "D",        // Weak physical strength
            intensity: "S",    // Supreme pressure in combat
            // Agility subcategories
            swiftness: "D",    // Moderate speed
            endurance: "B",    // Good stamina
            flexibility: "C",  // Moderate flexibility
            // Precision subcategories
            accuracy: "A",    // Excellent accuracy with enhanced weapon
            reactivity: "C",  // Moderate reflexes
            dexterity: "B",   // Good motor control
            // Intelligence subcategories
            tactility: "A",   // Excellent tactical thinking
            wisdom: "D",      // Below average general intelligence
            stability: "C",  // Moderate mental stability
            // Durability subcategories
            vitality: "C",    // Moderate health
            toughness: "D",   // Below average toughness
            resistance: "E"   // Low environmental resistance
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "Vortex can channel the raw energy produced by Chronipulation and imbue it into his Mag-num. This temporarily overclocks his weapon, transforming it into a devastating hand-cannon with new (and enhanced) effects that give it an extra edge in dire combat situations that deem it necessary."
            ]
          },
          passives: {
            techniques: [
              {
                id: "target-lock-plus",
              title: "Target Lock +",
              description: [
                "The Target Lock system can leech off of Chronipulation to further boost Vortex's accuracy when handling the weapon. On top of redirecting already-fired bullets, Chronipulation allows the gun to quickly amplify or decrease the speed at which a fired projectile is travelling. This allows it to take sharper corners or reach breakneck speeds that render most projectiles invisible, or at least a blur."
              ]
            },
            {
              id: "kinetic-battery-plus",
              title: "Kinetic Battery +",
              description: [
                "Alongside an internal gyroscope, the kinetic battery can usurp portions of Vortex's Chronipulation to retain a stronger and longer-lasting charge. This process is also necessary, as Chronipulation-charged attacks consume significantly larger amounts of energy."
              ]
            }
          ]
        },
        offensive: {
          techniques: [
            {
              id: "magnetic-shot-plus",
              title: "Magnetic Shot +",
              description: [
                "The Mag-num's firing speeds and charge times are drastically improved through Chronipulation, allowing Vortex to quickly fire all of his chambers rapidly if need be. Bullets charged by Chronipulation are naturally faster (unless Target Lock specifically forces them to slow down).",
                "As with their Chronipulation-less variants, they explode into small sparks once they've embedded themselves in a target or otherwise run out of momentum. However, any object caught in the small blast is temporarily slowed down by the trace amounts of Chronipulation lingering in the bullets."
              ]
            },
            {
              id: "railshot-plus",
              title: "Railshot +",
              description: [
                "Chronipulation can significantly speed up the charging process of Railshot projectiles, allowing him to fire them quicker and at even higher velocities than before. The insane speeds reached make Chronipulation Railshots impossible to redirect using Target Lock, though they pack a lethal punch that can entirely liquify most materials and targets.",
                "Due to the sheer velocity of Chronipulation Railshot projectiles, they do not embed themselves and instead explode violently on contact with the first surface they touch. They unleash a mix of Chronipulation and raw electricity provided by the Mag-num, shocking and temporarily halting the flow of time for the struck target."
              ]
            },
            {
              id: "buckshot-plus",
              title: "Buckshot +",
              description: [
                "Through the power of Chronipulation, Vortex can now somewhat aim the shrapnel fired in a Buckshot, though with minimal accuracy and efficiency. In most cases, this allows Vortex to fire barrages of shrapnel towards a distant target, sending storms of metallic shards that reconcile before hailing down on them.",
                "As metal scrap is still being used in place of the specialized ammunition, the shrapnel does not explode or retain any of its energy once its momentum runs dry. It becomes plain scrap once again."
              ]
            }
          ]
        },
        defensive: {
          techniques: [
            {
              id: "mag-net-plus",
              title: "Mag-net +",
              description: [
                "The defensive barrier can refire gathered projectiles in large bursts through Chronipulation, allowing Vortex to unleash a maelstrom of bullets back towards enemies with nearly-matched (if not a higher) velocity. The Mag-net can also tolerate stronger firearms while it is charged with Chronipulation, though extremely powerful guns may still penetrate it."
              ]
            }
          ]
        },
        drawbacks: {
          techniques: [
            {
              id: "limited-capacity-chron",
              title: "Limited Capacity",
              description: [
                "The bullets used by the Mag-num are bulky and take up a large amount of space, meaning Vortex can only carry a limited capacity. In longer, drawn-out fights, Vortex often needs to resort to metal scraps or other small magnetized debris he can get his hands on."
              ]
            },
            {
              id: "extreme-energy-consumption",
              title: "Extreme Energy Consumption",
              description: [
                "Despite the kinetic battery's extremely optimized efficiency, the Mag-num consumes extremely high quantities of Vortex's stamina to channel Chronipulation from his body, along with its own battery. Without proper stamina and energy management, Vortex can't sustain more than a few shots before exhausting himself completely. In most cases, it is better to only charge his gun in situations that call for it, and to never go overkill."
              ]
            }
          ]
        }
      },
      images: [
          {
            url: "/lovable-uploads/c8949ba7-0df2-4911-bf84-9f38cdf51816.png",
          caption: "Vortex, overclocking his Mag-num through Chronipulation."
          },
          {
            url: "/lovable-uploads/ecc55a94-b059-4587-8989-39cac284c31a.png",
          caption: "A close-up of Vortex's Mag-num, when charged with his chrono-energy."
          }
        ]
      },
      {
        id: "amplification-gauntlet",
        label: "Amplification Gauntlet",
        description: [
        "The Amplification Gauntlet (informally known as the Amp Gauntlet) is a large, right-handed gauntlet which provides a significant boost to Vortex's physical strength, allowing him to achieve feats he couldn't achieve without it. With it, he can destroy most armor and reinforced structures through effort and dedication.",
        "It is an effective tool for tougher opponents or materials that require raw strength to bypass, though it is extremely heavy and greatly inhibits Vortex's speed while worn."
      ],
        combatStats: createCombatStats(
          "C", // Strength: Main category average
          "C", // Durability: Main category average
          "D", // Agility: Main category average
          "D", // Precision: Main category average
          "A", // Intelligence: Main category average
          {
            // Strength subcategories
            penetration: "C",  // Moderate penetration with gauntlet
            power: "B",        // Enhanced physical strength with gauntlet
            intensity: "D",    // Low pressure due to weight
            // Agility subcategories
            swiftness: "D",    // Slow due to heavy gauntlet
            endurance: "B",    // Good stamina
            flexibility: "E",  // Poor flexibility due to heavy gauntlet
            // Precision subcategories
            accuracy: "E",    // Poor accuracy due to weight
            reactivity: "E",  // Poor reflexes due to weight
            dexterity: "D",   // Poor motor control due to weight
            // Intelligence subcategories
            tactility: "A",   // Excellent tactical thinking
            wisdom: "D",      // Below average general intelligence
            stability: "C",  // Moderate mental stability
            // Durability subcategories
            vitality: "C",    // Moderate health
            toughness: "C",   // Moderate toughness with gauntlet protection
            resistance: "E"   // Low environmental resistance
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "The Amplification Gauntlet (informally known as the Amp Gauntlet) is a large, right-handed gauntlet which provides a significant boost to Vortex's physical strength, allowing him to achieve feats he couldn't achieve without it. With it, he can destroy most armor and reinforced structures through effort and dedication.",
              "It is an effective tool for tougher opponents or materials that require raw strength to bypass, though it is extremely heavy and greatly inhibits Vortex's speed while worn."
            ]
          },
          passives: {
            techniques: [
              {
                id: "bloxite-plating",
              title: "Bloxite Plating",
              description: [
                "The Amp Gauntlet is partially forged of Bloxite, making it near-indestructible and resistant to most forms of blunt-force damage, along with a majority of environmental hazards."
              ]
            }
          ]
        },
        offensive: {
          techniques: [
            {
              id: "heavy-impact",
              title: "Heavy Impact",
              description: [
                "The Amp Gauntlet allows Vortex to amplify the raw kinetic strength behind his swings through electromagnets, allowing him to tear through a majority of tough materials, including reinforced concrete and rebar."
              ]
            },
            {
              id: "thumper",
              title: "Thumper",
              description: [
                "By pressing his fist to the ground and smashing down repeatedly, he can create shockwaves that repel targets and produce a concussive blast that stuns and discombobulates anyone nearby."
              ]
            }
          ]
        },
        drawbacks: {
          techniques: [
            {
              id: "heavyweight",
              title: "Heavyweight",
              description: [
                "The Amp Gauntlet is extremely heavy, comparable to Vortex's own body weight and then some. On top of drastically reducing Vortex's mobility, proper control requires extreme care and concentration.",
                "It can be easy for him to tip over and lose his balance from the sheer weight if he isn't focused or lacks the necessary stamina."
              ]
            }
          ]
        }
      },
      images: [
          {
            url: "/lovable-uploads/a5823d3b-ab54-46b3-8840-30841d9a26a1.png",
            caption: "Vortex, having donned the Amplification Gauntlet. The heavy weight of the gauntlet has him tilting over a bit."
          },
          {
            url: "/lovable-uploads/4dabb92d-56c7-4bcd-8c0c-a4d961d400b7.png",
            caption: "A close up of the Amplification Gauntlet."
        }
      ]
    },
    {
      id: "chronipulation-amplification-gauntlet",
      label: "Chronipulation Amplification Gauntlet",
      description: [
        "By pouring vast quantities of the energy produced by Chronipulation into the Amp Gauntlet, Vortex can imbue the gauntlet with his energy, drastically improving the strength and speed behind it, alongside unlocking new techniques."
      ],
        combatStats: createCombatStats(
          "B", // Strength: Main category average
          "C", // Durability: Main category average
          "C", // Agility: Main category average
          "D", // Precision: Main category average
          "A", // Intelligence: Main category average
          {
            // Strength subcategories
            penetration: "B",  // Good penetration with enhanced gauntlet
            power: "A",        // High physical strength with enhanced gauntlet
            intensity: "C",    // Moderate pressure
            // Agility subcategories
            swiftness: "C",    // Moderate speed (improved from base gauntlet)
            endurance: "B",    // Good stamina
            flexibility: "D",  // Below average flexibility
            // Precision subcategories
            accuracy: "D",    // Below average accuracy
            reactivity: "D",  // Below average reflexes
            dexterity: "C",   // Moderate motor control (improved from base)
            // Intelligence subcategories
            tactility: "A",   // Excellent tactical thinking
            wisdom: "D",      // Below average general intelligence
            stability: "C",  // Moderate mental stability
            // Durability subcategories
            vitality: "C",    // Moderate health
            toughness: "C",   // Moderate toughness with gauntlet protection
            resistance: "E"   // Low environmental resistance
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "By pouring vast quantities of the energy produced by Chronipulation into the Amp Gauntlet, Vortex can imbue the gauntlet with his energy, drastically improving the strength and speed behind it, alongside unlocking new techniques."
            ]
          },
          passives: {
            techniques: [
              {
                id: "bloxite-plating-chron",
              title: "Bloxite Plating",
              description: [
                "The Amp Gauntlet is partially forged of Bloxite, making it near-indestructible and resistant to most forms of blunt-force damage, along with a majority of environmental hazards."
              ]
            },
            {
              id: "delayed-demise",
              title: "Delayed Demise",
              description: [
                "Through Chronipulation, Vortex can delay the effects of the Amp Gauntlet's attacks for multiple minutes or hours if he so chooses, allowing him to \"store\" the kinetic energy for use later. By striking the same target multiple times, Vortex can release the delay for all of his attacks at once, instantaneously applying the force behind each one to the struck target(s) at once."
              ]
            },
            {
              id: "timeflow-acceleration",
              title: "Timeflow Acceleration",
              description: [
                "Thanks to Chronipulation, Vortex can heavily improve his ability to wield the gauntlet with speed and precision previously unmanageable. It's still slower than using no gauntlet at all, but an improvement is an improvement."
              ]
            }
          ]
        },
        offensive: {
          techniques: [
            {
              id: "heavy-impact-plus",
              title: "Heavy Impact +",
              description: [
                "On top of the strong impacts the Amp Gauntlet can deal out, Chronipulation allows struck targets to have their position rewound to be struck again. While rewinding the physical position of targets other than himself is extremely draining, chaining multiple hits on a target can quickly incapacitate them and make for a quick end to a fight."
              ]
            },
            {
              id: "thumper-plus",
              title: "Thumper +",
              description: [
                "When using the Thumper technique, a web of Chronipulation spreads out across the shockwaved area, automatically triggering if a target steps into range. Making contact with this web drastically reduces the rate at which time flows across their body, making them more susceptible and weak to the shockwaves produced by thumping the ground. Retracting his fist from the ground immediately dissipates the web."
              ]
            }
          ]
        },
        drawbacks: {
          techniques: [
            {
              id: "heavyweight-chron",
              title: "Heavyweight -",
              description: [
                "Though chrono-energy helps to alleviate the slowdown issues caused by the weight of the Amp Gauntlet and make it more viable in combat, it can't completely remedy the difficulty that comes with the significant weight and bulk of the device."
              ]
            },
            {
              id: "relentless-energy-consumption",
              title: "Relentless Energy Consumption",
              description: [
                "The amount of energy siphoned by the device to enable functionality at higher speeds is unimaginably large, capable of exhausting Vortex in a few mere swings. In most cases, Vortex can only overclock the Amp Gauntlet in desperate situations, or sparingly throughout a battle."
              ]
            }
          ]
        }
      },
      images: [
          {
            url: "/lovable-uploads/8fe6a2a9-d1d8-4851-8279-6fffdb700310.png",
            caption: "Vortex, cycling his energy into the Amplification Gauntlet. The effort it takes to keep the Gauntlet attuned is exhausting."
          },
          {
            url: "/lovable-uploads/bba97565-da04-4abf-a43f-7651050e7c93.png",
            caption: "A close-up of the Amplification Gauntlet, when attuned to Vortex's Chronipulation."
          }
        ]
      }
    ],
    appearance: [
      {
        id: "tactical",
        label: "Tactical",
        description: [
          "Vortex A. Steele is an average-built Noob wrapped with a variety of belts and straps which cover a black t-shirt and pants. His brown, spiked hair is covered mostly by a black cap, while tinted shades typically hide his eyes from view."
        ],
        images: [
          {
            url: "/lovable-uploads/43f5afa2-8401-4100-9cb6-d4bd47bc5ae1.png",
            caption: "Vortex, clearly annoyed by someone offscreen."
          }
        ]
      },
      {
        id: "tactical-geared-up",
        label: "Tactical (Geared Up)",
        description: [
          "Vortex A. Steele is an average-built Noob wrapped with a variety of belts and straps which cover a black t-shirt and pants. His brown, spiked hair is covered mostly by a black cap while square, tinted-lens shades typically hide his eyes from view.",
          "When going into combat or performing reconnaissance, Vortex will arm himself with the Mag-num, a powerful revolver-sized railgun which he'll keep on his belt. In certain tougher missions, Vortex may also don the Amplification Gauntlet, a tool he'll use to breach tough structures and penetrate stronger lines of defense."
        ],
        images: [
          {
            url: "/lovable-uploads/670fa9e8-fb9d-4af9-a2f3-ff8f99c37005.png",
            caption: "Vortex, having brandished his Mag-num."
          },
          {
            url: "/lovable-uploads/df19aa82-aab3-4e5c-bbc4-2b986916208d.png",
            caption: "Vortex, striking a pose with his Amplification Gauntlet."
          }
        ]
      }
    ],
    personality: [
      "Vortex is cold, callous, and highly calculative. Aside from the few friends he has, Vortex's mind remains focused on his own well-being and his job as an operative for the Hunter Association. He is an overachiever by nature, tending to be stubborn and a natural perfectionist. He is sharp, quick-thinking, and won't take disrespect lightly.",
      "Vortex is notoriously difficult to work with, as he is the type to beat to his own drum and be his own boss, which can lead him to be a difficult ally to work with. Even when asked politely, Vortex often won't listen to the advice or reasoning of others unless he agrees with their viewpoint, often creating unnecessary tension and complications between him and his allies."
    ],
    lifestyle: [
      {
        id: "hunter-association",
        label: "Hunter Association",
        description: [
          "Vortex is a dedicated and hot-blooded worker belonging to the Hunter Association. He has established himself as an elite within their rankings, responsible for thousands of successful contracts. He is regularly catered to for his service, given ample amounts of nearly any resources he demands in exchange for his unyielding loyalty and servitude.",
          "This means that, for most of Vortex's day, he is out and about as he is scheduled and positioned across many different points. His work hours range anywhere from a few days, to mere minutes depending on the complexity of the contract and the strength of the enemy. In most cases, his issued contracts are completed swiftly, and with little or no difficulty."
        ]
      },
      {
        id: "penthouse",
        label: "Penthouse",
        description: [
          "Due to Vortex's status among the highest of elites within the association, Vortex has been provided with a penthouse suite within their headquarters, complete with all the amenities he could ever desire. Buffets on demand, live entertainment, drinks, and more. Aside from his dirty work as a hunter, Vortex truly lives a fulfilling and lavish lifestyle."
        ]
      }
    ],
    history: [
      {
        id: "creation",
        label: "Creation",
        description: [
          "Vortex (at the time known as Volkan) was born into a poor, but loving family between two Noobs a few years prior to the disappearance of Roblox. He and his family spent their life on the run, as the constant emergence of new Robloxians meant chaos and disorder while society itself was adjusting.",
          "Though his life was minimalistic and no members of his family were special, he loved them dearly and was content with the life he lived. He always loved to go above and beyond for his parents, catering to their every need and always checking in to make sure they were alright.",
          "Life was small, but life was good, and Volkan was happy."
        ]
      },
      {
        id: "times-of-change",
        label: "Times of Change",
        description: [
          "Whether it be time or another force, all good things must come to an end.",
          "Volkan's parents were already quite old when Vortex was born, and over the years they had slowed down significantly. His father was first to pass, going peacefully in his sleep. His heartbroken mother followed soon after, leaving Volkan with nobody but himself. For a time, he felt lost and confused. His family was his entire world, and now he was the only part of that world remaining.",
          "Volkan fell into a deep depression, alone and purposeless. He was talented, but what point was there in using that talent if his beloved parents weren't around to see it? He couldn't bring himself to do much of anything for the longest time, lazing around and contemplating life. He was beaten up by his thoughts, telling him that he didn't spend enough time with them.",
          "Fortunately, Volkan was a tough cookie and eventually came to his own understanding that rotting away doing nothing is not what his mother and father would've wanted. They were always encouraging throughout his life, and this would have been no different. So, he gathered his resolve and pressed onwards to achieve something in life."
        ]
      },
      {
        id: "the-association",
        label: "The Association",
        description: [
          "Volkan got to work on self-improvement, looking to get back into shape and recover after letting himself go as he did. Over a few years, he'd focus on his body and train to bring himself back to a healthy status. But, Volkan ended up becoming addicted to the results. Even after getting back to the way he was, he pressed onwards in an effort to maximize his potential.",
          "His track running and stretching paid off significantly, as Volkan became quite an agile and flexible individual. Though he continued to train, he eventually hit the ceiling of physical potential he had, and only then was Vortex satisfied. But, in doing so he had gathered the attention of another.",
          "An old, elderly man approached Vortex one day, complimenting him on his prowess and determination. He went on to mention how Volkan had the skills and physique, yet no work to apply them to. The two chatted and eventually became friendly with one another, before Volkan was referred to the Hunter Association for a line of work the man believed he would specialize in.",
          "Volkan spent a long time debating whether he'd want to partake in that kind of dirtier work, but he eventually pushed himself to do it, and visited their headquarters. The old man was there to greet him, eventually revealing himself to be Jhustice, one of the councilmen for the Hunter Association. He praised Volkan for taking the offer, and walked him through his initiation and the inner workings of the faction.",
          "After he had signed his contract, Volkan underwent a rigorous process to prepare himself to become a hunter. His identity was scrubbed away from any public records as he underwent intense psychological evaluations, determining his mental fortitude and his resolve. Volkan passed the tests with flying colors, and was eventually accepted to become a low-rank initiative for the Hunter Association.",
          "It was at this point where Volkan would surrender his identity fully to the association, becoming Vortex and leaving his past life behind. Despite this, he always made sure to keep his beloved parents in the back of his mind, as motivation and as a reminder of what he's working for."
        ]
      },
      {
        id: "an-awakening",
        label: "An Awakening",
        description: [
          "Vortex ended up being perfect for the position, exactly as Jhustice predicted. He was quick, quiet, and excelled in gathering intel for future bounties. Even without any powers, Vortex was effective in hand-to-hand combat against weaker enemies, thanks to his sharper reflexes. He was a reliable asset to the association, and they saw more potential within him.",
          "It wasn't long before the Hunter Association began to push Vortex even further, placing him in charge of tougher contracts. Though he struggled to keep up with the pacing, he was able to succeed even when constantly pressed by tougher missions and opponents. This, however, would only serve to make the association want more out of him.",
          "Eventually, Vortex was promoted to a stage-one mercenary, marking a turning point where hunters would start being assigned bounties that target Bloxians with special abilities. Vortex thought little of it, believing in himself as he always had. No matter the target, he'd be sure to take them down, or so his mindset led him to believe.",
          "One day, Vortex was issued a large-scale contract, grouped together with a large handful of other hunters. They had received word of a Robloxian World that had its population massacred, before it was destroyed by a villain identified as the Scarlet Flame. The association made sure to press the details, ensuring that the assigned group was aware that he was not to be taken lightly.",
          "The squadron was mobilized, with Vortex leading reconnaissance. They were given basic information on the Scarlet Flame's whereabouts, and eventually managed to locate him. They had the tactical initiative and struck first, but it quickly became apparent that they were significantly unprepared-- and underpowered.",
          "The Scarlet Flame quickly began to massacre the squadron, taking out multiple at a time. Members were incinerated alive, leaving nothing but floating dust and death. For the first time, Vortex felt genuine fear and realized that he could not combat someone as strong as the Scarlet Flame, and began to flee as the other members held the villain off for as long as they could.",
          "It wasn't long before the Scarlet Flame had ended the lives of every squad member, aside from Vortex who was attempting to retreat. His heart was pounding, and adrenaline coursed through his veins. He sensed the Scarlet Flame's presence growing closer, and knew he wouldn't be able to outrun him. He needed to go faster. He NEEDED to go faster. HE NEEDED TO GO FASTER!",
          "Vortex's entire body was driven by fear and the deep desire to flee the Scarlet Flame, causing him to awaken his latent abilities that had been present all along. His body lurched forward as his speed multiplied ten-fold, enabling Vortex to soar forwards and quickly escape from the conflict. With his adrenaline pumping and his thoughts racing, he had no time to question what was happening, fully committed to getting away.",
          "Barely holding control of the blitzing speeds he was travelling, Vortex successfully managed to reach the headquarters of the Hunter Association, crashing into their lawn at full speed before passing out from the impact."
        ]
      },
      {
        id: "becoming-an-elite",
        label: "Becoming an Elite",
        description: [
          "Vortex was initially reprimanded for fleeing the scene of combat, but their tone quickly changed when Vortex explained what had happened. The entire squad was massacred, and Vortex remained unsure as to how he had even escaped the conflict. The Association sent him to the medical bay to recover, and to later run tests on his body to understand what had happened.",
          "The examinations went on to show that Vortex was not an ordinary Noob, and had awakened an ability during his conflict with the Scarlet Flame, likely due to the stress and fear created by the encounter and witnessing the death of his squadron. They encouraged Vortex to practice, believing that he could learn to control this ability and hone it to become a greater hunter than he had already proven himself to be.",
          "The scientists were correct in their assumptions, and through practice and mental control, Vortex learned to channel his ability, dubbed 'Chronipulation' by the team who did research on him. Through it, he could amplify his body and senses further, turning him into a purple blur that almost nobody could keep up with. It took practice and precise control to properly manage, but Vortex learned to use it as an extension of his being, turning it into a powerful weapon and tool.",
          "Though rematching the Scarlet Flame was out of the question (as the whereabouts of the villain had long-since become unknown), Vortex went on to continue as an operative and climbed the ranks. Over the next few years, he'd maximize his ranking and eventually go on to become an Elite, the highest rank within their hierarchy. He was praised for his dedication and hard work, and Jhustice held a celebration. It had been a long time since the last hunter had reached an Elite status.",
          "From then on, he was provided with a penthouse suite and all of the amenities he could dream of. Vortex had finally earned a life for himself that his parents would've been proud of, and in that he found happiness and satisfaction."
        ]
      }
    ],
    relationshipsData: {
      "caesar-bloxwright": {
        status: "Former Contract / Enemy, Close Friend & Ally",
        history: [
          "Vortex was originally contracted by the Hunter Association to eliminate Caesar, which had been issued by a petty Bryck Manning after his fall and imprisonment during the conflict at the Farmer Sanctuary.",
          "What followed was a long, drawn-out game of cat-and-mouse. Vortex pursued Caesar relentlessly, using his skills in reconnaissance to track Caesar down and corner him. Eventually, he managed to ambush Caesar in a remote warehouse where the two engaged in combat. Though as the fight went on, it was clear to see that Caesar wasn't possible for Vortex to eliminate, nor could Caesar eliminate Vortex. Their abilities cancelled out the effects of one another, and it ended up causing the two to exhaust one another of their energy and stamina.",
          "In the end, Vortex stopped trying and spoke with Caesar. Through their conversation, they grew to understand each of their motivations, and Vortex understood that whoever had issued the contract was the one truly in the wrong. Torn between failing a contract or killing an innocent man, he ultimately made the difficult decision to forfeit the contract.",
          "From then on, Vortex kept in contact with Caesar as the two grew to become genuine friends and allies, often teaming up to tackle tougher contracts that they couldn't complete alone."
        ]
      },
      "nauli-parter": {
        status: "Close Friend & Ally",
        history: [
          "Vortex was introduced to Nauli through his connection to Caesar, with the pair becoming friends after Nauli finally lowered her guard and began to trust him. Though it was rocky at first, Vortex and Nauli have grown to work together in tandem, often alongside Caesar as the three tackle missions together."
        ]
      },
      "ren-bytera": {
        status: "Acquaintance",
        history: [
          "Though Vortex has never been close with Ren in any respects, she is responsible for the creation of his Mag-num as well as his Amplification Gauntlet. They're effective and durable, and have served Vortex very well. They've only spoken on occasion, but Vortex has made it very clear that he admires her craft, even if her lack of morals is something he finds unsavory."
        ]
      },
      "charles-studson": {
        status: "Rival",
        history: [
          "Both Vortex and Charles have been competing for recognition within the Hunter Association. Charles is relatively new to the faction in comparison to Vortex, though his Chanipulation abilities have allowed him to climb the ranks almost as quickly as Vortex once did. They naturally share a competitive nature, which has led to a fierce rivalry between the two.",
          "Despite Charles' reputation rapidly increasing, he always seems to remain a step behind Vortex no matter what he seems to do. Perhaps it requires more than chains to defeat a time manipulator? What a thought."
        ]
      },
      "bryck-manning": {
        status: "Enemy",
        history: [
          "Vortex was originally assigned the contract against Caesar that Bryck had placed, and Bryck was infuriated to know that not only had his hunter failed-- but he had gone on to become friends with Caesar. This has left him incredibly bitter and hateful of Vortex, unbeknownst to Vortex himself who is entirely unaware of who Bryck is."
        ]
      }
    },
    abilityData: {
      overview: {
        text: [
          "Vortex was born with an innate ability enabling him to sense and contort temporal flows around himself and other targets, freely accelerating and decelerating time at will. Beyond this, Vortex can slightly alter time in other ways, such as rewinding back to recent moments, etc.",
          "His ability is powerful, versatile, and provides Vortex with a means of defeating even the most experienced fighters."
        ]
      },
      passives: {
        techniques: [
          {
            id: "tempo-control",
            title: "Tempo Control",
            description: [
              "At any given time, Vortex can amplify the rate at which time flows for him, allowing him to double, triple, or even quadruple his movements and velocities. This allows Vortex to strike quickly and unpredictably, whilst reacting almost instantaneously to incoming attacks.",
              "The faster Vortex accelerates, the quicker his stamina depletes. Careful and strategic management of his powers allow his true potential to shine."
            ]
          },
          {
            id: "tickrate-immunity",
            title: "Tickrate Immunity",
            description: [
              "Chronipulation naturally nullifies the effects of temporal anomalies or other powers which manipulate time in any way, preventing Vortex from being affected by them."
            ]
          },
          {
            id: "echoes-of-memories",
            title: "Echoes of Memories",
            description: [
              "On the rare occasions where Vortex's body is rewound to a previous point in time, his memories are transported separately from his physical form before being remembered when the rewind is complete.",
              "This allows Vortex to retain clarity and a sense of continuity, even in situations where it shouldn't physically be possible."
            ]
          },
          {
            id: "count-the-seconds",
            title: "Count The Seconds",
            description: [
              "Vortex can automatically and accurately count up to (or down from) any amount of time with little to no error, as though his mind has an internal clock embedded within."
            ]
          }
        ]
      },
      offensive: {
        techniques: [
          {
            id: "breakneck-assault",
            title: "Breakneck Assault",
            description: [
              "By accelerating his body, Vortex can ambush and overwhelm targets with flurries of punches that blur as they travel. Though Vortex isn't particularly strong by default, even stronger lines of defense can be overwhelmed with thousands of punches issued in mere seconds."
            ]
          },
          {
            id: "repetition-impact",
            title: "Repetition Impact",
            description: [
              "After issuing an attack such as a tackle or kick, Vortex can quickly rewind to just a fraction before his hit initially landed, allowing him to perform the same attack back-to-back.",
              "Attacks could theoretically be chained infinitely through this method, so long as Vortex has the stamina necessary to perform the (quite exhausting) rewinds."
            ]
          },
          {
            id: "back-for-more",
            title: "Back For More?",
            description: [
              "Vortex can recall a target's position and move them back to it, allowing him to chain multiple attacks similar to rewinding himself. This works best in tandem with a strong ally, especially those who struggle to keep opponents within their range of attack."
            ]
          },
          {
            id: "acceleration-hemorrhage",
            title: "Acceleration Hemorrhage",
            description: [
              "Accelerating an opponent's speed can sometimes be detrimental, especially if they're bleeding or suffering from other conditions that worsen over time. Though this technically gives an enemy momentary advantages, effects from conditions such as blood loss and poison will take hold significantly faster. Though conditions to use a technique such as this are very conditional, it can be a highly effective method of dispatching an enemy."
            ]
          }
        ]
      },
      defensive: {
        techniques: [
          {
            id: "temporal-afterimage",
            title: "Temporal Afterimage",
            description: [
              "By pushing his acceleration and rapidly shifting between positions, Vortex can create up to 4 indistinguishable afterimages that follow his movements. They serve to confuse and disorient his targets, who often struggle to deduce where to strike in order to properly hit Vortex. Most attacks won't work on afterimages without significant luck or reflexes, but they are extremely vulnerable to large AOE (Area of Effect) attacks such as explosions.",
              "Vortex's afterimages cannot space out more than 15 studs each, without it becoming impossible to maintain the illusion due to the increased distance it would require to cover. Additionally, maintaining afterimages for long periods of time is incredibly difficult, as Vortex must constantly work his Chronipulation at high speeds-- while constantly moving between each position."
            ]
          },
          {
            id: "one-more-chance",
            title: "One More Chance",
            description: [
              "When suffering from a particularly deadly wound or other condition that would normally kill Vortex, he can pour his energy into a full rewind of his surroundings, sending him back in time by up to a few minutes before he suffered from the attack. In doing so, Vortex completely exhausts his stamina reserves and momentarily cannot use Chronipulation. This lasts until both he and Chronipulation can recover from the stress of rewinding large portions of time.",
              "Vortex cannot use this technique effectively if even smaller portions of his energy have already been used up. While rewinding time remains possible even with minimal energy and stamina, the time he can rewind is drastically reduced, down to mere seconds in severe cases."
            ]
          }
        ]
      },
      utilitarian: {
        techniques: [
          {
            id: "chronological-anchor",
            title: "Chronological Anchor",
            description: [
              "Vortex can sacrifice portions of his energy, leaving them in the past as marks that he can return to later. These anchors last for an hour before the connection grows too weak to maintain, and can be activated anytime before the deadline. They activate almost instantly when fired, transporting Vortex and his memories back into the past.",
              "The anchors themselves require a lengthy setup process, which prevents them from being used effectively in combat unless preparation was made in advance. This setup process also takes time, meaning while Vortex can often retry a lot, he can't retry forever. Enough failures in a row will eventually leave him with no time to set up another anchor."
            ]
          },
          {
            id: "net-of-time",
            title: "Net of Time",
            description: [
              "Vortex can lay semi-transparent nets into his surroundings, often acting as traps that slow unsuspecting targets who make contact with them. These web-like nets stick to targets and can be incredibly difficult to remove mid-combat, especially due to the slowness they inflict.",
              "Time Nets double as ordinary nets if Vortex needs them to, without slowing anything that makes contact with them. This enables him to project nets for a variety of different tasks, such as to catch falling objects or Bloxians. They're also great for holding things in place."
            ]
          },
          {
            id: "temporal-deceleration",
            title: "Temporal Deceleration",
            description: [
              "Vortex can significantly slow himself down, consuming basically no energy to do so. Though it has no practical use in combat, slowing down his own body allows him to perceive time moving faster, making it a great way to skip time and wait less for things that matter to him."
            ]
          }
        ]
      },
      drawbacks: {
        techniques: [
          {
            id: "unfathomable-energy-consumption",
            title: "Unfathomable Energy Consumption",
            description: [
              "Chronipulation as a whole consumes massive quantities of Vortex's stamina to maintain, especially at higher rates of acceleration. Maintaining high speeds requires Vortex to get plenty of rest, eat large amounts of calories, and keep a sharp mind to remain focused while accelerated. Overuse of his powers is incredibly easy, and can make Vortex ill and weak from the exhaustion."
            ]
          },
          {
            id: "temporal-dissociation",
            title: "Temporal Dissociation",
            description: [
              "Constantly tampering with time has proven to have adverse effects on Vortex's psyche, as he'll often dissociate or become derealized by the present. It can take time for him to collect his bearings or come to his senses, especially after rewinding time or slowing himself down. Though these effects are often minimal and can be ignored, constant use of his power has shown to cause performance issues in combat."
            ]
          }
        ]
      }
    },
    trivia: [
      "Vortex's favorite drink is the Witches Brew.",
      "Ironically, despite being yellow himself, Vortex hates the color yellow.",
      "Vortex is an entry made after (and inspired by) my friend and their Roblox avatar."
    ]
  },
  
  abilityName: "Chronipulation",
  stats: createCharacterStats("D", "E", "A", "B")
};
