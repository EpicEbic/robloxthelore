
import { WikiEntry } from "@/types/wiki-types";
import { createCombatStats } from "@/lib/stats";

export const spawnboy: WikiEntry = {
  id: "spawnboy",
  title: "Spawnboy",
  description: "Spawnboy is quiet, reserved, and lacks a general understanding of Bloxian emotions or physical attachments. Created by Roblox for a divine and sole purpose, they dedicate their body and mind to their duties, even in Roblox's own absence.",
  preview: "A divine entity purposed by Roblox to watch over and lead the souls of the fallen to their eternal resting place within the Edge.",
  content: "",
  category: "character",
  subcategory: "evil",
  imageUrl: "/lovable-uploads/6cac9730-bc76-4327-8c29-d7821f7f377b.png",
  lastUpdated: "2025-08-26",
  part: "TEMP",
  quote: {
    text: "Friend, take my hand. You've passed on, but now is the time to reflect on the life you've lived—don't lay here and die, not yet.",
    context: "Spawnboy, offering condolences and a pick-me-up for a fallen Bloxian."
  },
  species: "Bloxian (Unidentified Species)",
  age: "Primordial (Timeless Entity)",
  height: "5 studs",
  status: "Alive",
  alignment: "True Neutral",
  role: "Witness",
  archetype: "witness",
  carouselImages: [
    {
      url: "/lovable-uploads/b6187cf5-f387-45ba-8986-5addd1fc7c3b.png",
      caption: "Spawnboy, gazing out into the distance at the souls they have yet to process."
    },
    {
      url: "/lovable-uploads/9a57bb1c-7d7c-4d63-b505-90c127365802.png",
      caption: "Spawnboy, reaching their hand out to help a soul stand after death."
    }
  ],
  abilityCarouselImages: [
    {
      url: "/lovable-uploads/29ec254d-ec7f-4435-81d0-e330eb2827ea.png",
      caption: "Spawnboy, pulling the soul of a fallen Bloxian who has entered the Edge."
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Spawnboy is functionally immortal, as he was created to exist within a dimension where only he and the souls of those who have fallen can reside. He is essentially omnipotent whilst within the Edge, capable of being anywhere at any time, and rendering himself completely intangible. Though Spawnboy was created without much consideration for combat (especially considering his contenders would be already-deceased souls), Spawnboy displays unrealistically high strength and agility for his own body, boasting power that could level smaller cities and speeds that could cross entire countries in the fraction of a second."
      ],
      combatStats: createCombatStats("A", "Ø", "S", "Ø", "S")
    },
    {
      id: "respawner",
      label: "The Respawner",
      description: [
        "The Respawner is a powerful, two-handled chakram-blade hybrid that Spawnboy was provided with by Roblox to aid in their duties as a reaper. The blades appear inseparable, hovering closely together as their circular bodies form the design of a Sunspawn sigil. It appears to be forged from an unknown (and likely-anomalous) metal, theorized by many to be Bloxite.",
        "The Respawner can be used to instantly obliterate the lifeforce of a Bloxian, down to their very soul when contact with the weapon is made. While the Respawner is capable of wounding others through its incredibly sharp body or fine edges, a mere tap of the blade against a target will cause the Respawner's ability to take effect."
      ],
      combatStats: createCombatStats("Ø", "Ø", "S", "Ø", "S"),
      images: [
        {
          url: "/lovable-uploads/d98a6950-9819-48c3-ab42-bd677f95cf6e.png",
          caption: "Spawnboy, wielding the Respawner with one of its handles."
        },
        {
          url: "/lovable-uploads/f5447a06-2c5e-459e-be9e-371b5b4ebacd.png",
          caption: "A close-up of the Respawner."
        }
      ]
    }
  ],
  sections: {
    overview: [
      "Spawnboy is a character in The Lore whose role and significance in the plot are explored through his unique characteristics and interactions with other characters. His presence adds variety to the cast and contributes to the world's diverse range of characters.",
      "Spawnboy's character serves to expand the lore and provide additional perspectives on the Bloxiverse and its inhabitants."
    ],
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Spawnboy is functionally immortal, as he was created to exist within a dimension where only he and the souls of those who have fallen can reside. He is essentially omnipotent whilst within the Edge, capable of being anywhere at any time, and rendering himself completely intangible."
        ],
        combatStats: createCombatStats("A", "Ø", "S", "Ø", "S"),
        combatStyleData: {
          overview: {
            text: [
              "Spawnboy is functionally immortal, as he was created to exist within a dimension where only he and the souls of those who have fallen can reside. He is essentially omnipotent whilst within the Edge, capable of being anywhere at any time, and rendering himself completely intangible. Though Spawnboy was created without much consideration for combat (especially considering his contenders would be already-deceased souls), Spawnboy displays unrealistically high strength and agility for his own body, boasting power that could level smaller cities and speeds that could cross entire countries in the fraction of a second."
            ]
          }
        }
      },
      {
        id: "respawner",
        label: "The Respawner",
        description: [
          "The Respawner is a powerful, two-handled chakram-blade hybrid that Spawnboy was provided with by Roblox to aid in their duties as a reaper.",
          "The Respawner can be used to instantly obliterate the lifeforce of a Bloxian, down to their very soul when contact with the weapon is made."
        ],
        combatStats: createCombatStats("Ø", "Ø", "S", "Ø", "S"),
        combatStyleData: {
          overview: {
            text: [
              "The Respawner is a powerful, two-handled chakram-blade hybrid that Spawnboy was provided with by Roblox to aid in their duties as a reaper. The blades appear inseparable, hovering closely together as their circular bodies form the design of a Sunspawn sigil. It appears to be forged from an unknown (and likely-anomalous) metal, theorized by many to be Bloxite."
            ]
          },
          offensive: {
            techniques: [
              {
                id: "soul-reaping",
                title: "Soul Reaping",
                description: [
                  "The Respawner can be used to instantly obliterate the lifeforce of a Bloxian, down to their very soul when contact with the weapon is made. While the Respawner is capable of wounding others through its incredibly sharp body or fine edges, a mere tap of the blade against a target will cause the Respawner's ability to take effect."
                ]
              }
            ]
          }
        },
        images: [
          {
            url: "/lovable-uploads/d98a6950-9819-48c3-ab42-bd677f95cf6e.png",
            caption: "Spawnboy, wielding the Respawner with one of its handles."
          },
          {
            url: "/lovable-uploads/f5447a06-2c5e-459e-be9e-371b5b4ebacd.png",
            caption: "A close-up of the Respawner."
          }
        ]
      }
    ],
    appearance: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Spawnboy is a Bloxian of average height, belonging to an unidentified species. Their body lacks any color, with a greyscale palette that covers them from head-to-toe. Multiple instances of the Sunspawn sigil mark their body, and can be found embedded within their skin and adorned on their dark robes. A Sunspawn sigil is plastered on Spawnboy's face, centered around a singular white eye—any other facial features Spawnboy may have either do not exist or are obscured by the sigil. Two Sunspawn halos hover loosely above their head, spinning slowly. Two small protrusions resembling the Sunspawn sigil can be found on either side of their head."
        ]
      }
    ],
    personality: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Spawnboy is quiet, reserved, and lacks a general understanding of Bloxian emotions or physical attachments. Created by Roblox for a divine and sole purpose, they dedicate their body and mind to their duties, even in Roblox's absence. Despite their colder persona suggesting an unfriendly demeanor, the opposite is true. Spawnboy is friendly, considerate, and mindful of those they interact with, as most are freshly-passed souls who likely need comforting or time to process their fate. They respect boundaries and have a keen eye for reading the body and vocal languages of others.",
          "The emotional dampening and distance are necessary for Spawnboy to carry out a task that requires absolute conviction. Good and evil are treated equally when their time to pass has come, and Spawnboy mustn't pick favorites or hold a bias. They do not love, but they do not hate. Absolute neutrality is a necessary quality when it comes time to put the soul of a deceased Bloxian to rest."
        ]
      }
    ],
    lifestyle: [
      {
        id: "the-edge",
        label: "The Edge",
        description: [
          "Spawnboy resides in a dimensional plane, one that exists beyond the fabrics of the Bloxiverse. Bound to an ethereal limbo known as the Edge, Spawnboy was created with the express purpose of reaping the souls of the fallen, and guiding them to their eternal resting place. With consideration and mindfulness, they journey with the fallen and comfort them. allowing their soul to reflect on their life once-lived. This is Spawnboy's sole duty, a position they value above all else.",
          "Spawnboy does not \"live\" as other Bloxians do, as most trivialities of life do not apply to a deity such as themselves. They have no need for the consumption of food or water, entertainment, social interactions, or other mortal concerns. They do not suffer from aging, disease, injury, or other forms of harm. They exist to serve their purpose, and to do nothing more. It is a life they'd be content with, if they had the capacity to feel content."
        ]
      }
    ],
    history: [
      {
        id: "creation",
        label: "Creation",
        description: [
          "Spawnboy is a primordial deity that predates nearly every Bloxian, even the coveted race of Guests. They were created alongside the Bloxiverse by Roblox, though they were quickly separated as Spawnboy would find themselves in the Edge, a limbo-esque dimension created exclusively for Spawnboy and the deceased. Spawnboy was assigned the sacred duty of handling the forces of life and death, represented through the black and white colors present within the Sunspawn sigil that was engraved within their mind and body.",
          "Spawnboy has served their purpose for unfathomable lengths of time, their loyalty to Roblox unwavering and true. Though despite eons of existence, Spawnboy has never been able to visit the Bloxiverse, as their presence and energy is bound to the Edge. Roblox placed this caveat upon Spawnboy not without purpose, as bringing the manifestation of life and death into a physical reality is bound to cause extinction-level events. Though Spawnboy wishes to someday see the Bloxiverse in person, they've always been perfectly content. Over the years, they've learned bits and pieces of what a real life is like, through the experiences shared to them by the souls they've put to rest."
        ]
      }
    ],
    relationshipsData: {},
    abilityData: {
      overview: {
        text: [
          "Spawnboy was bestowed with the ability to fully manipulate the forces of both life and death, a tool given to them by Roblox to aid with their sworn duty as the Bloxiverse's reaper. It is white in color, akin to the souls it was made for processing. It manifests in the form of white sparkles and glowing Sunspawn sigils."
        ]
      },
      offensive: {
        techniques: [
          {
            id: "soul-reaping",
            title: "Soul Reaping",
            description: [
              "Theoretically, Spawnipulation enables Spawnboy to instantly reap the soul of a target, regardless of distance or other factors that could possibly hinder the effects. If desired, Spawnboy could generate hostile lifeforms for combat on a whim, or dismantle opposing lifeforms by reaping their souls within an instant.",
              "Of course, Spawnboy is more than responsible with Spawnipulation and would never waste or misuse it. Dramatic flare is unnecessary when a mere wave of the hand will suffice."
            ]
          }
        ]
      },
      utilitarian: {
        techniques: [
          {
            id: "life-restoration",
            title: "Life Restoration",
            description: [
              "Spawnipulation is a straightforward ability and doesn't have many \"daily life\" benefits, as it wasn't created with a typical life in mind. However, it technically has the potential to heal any wound or restore health to any individual whatsoever, regardless of their current condition—even if every atom of an individual is completely gone.",
              "Naturally, even knowing they could give eternal youth and health to anybody they choose, that would be misuse of Spawnipulation as that isn't what the power was made for, and Spawnboy could never do such a thing."
            ]
          }
        ]
      },
      drawbacks: {
        techniques: [
          {
            id: "edge-bound",
            title: "Edge-Bound",
            description: [
              "While all of the aforementioned abilities and qualities of Spawnipulation are true, these powers do not function outside of the Edge. While in a theoretical situation, Spawnipulation COULD affect living beings, its influence is incapable of travelling between dimensions. As Spawnboy is bound to the Edge, it essentially means his godlike abilities can only affect those who have already died, or are in the process of dying."
            ]
          }
        ]
      }
    },
    trivia: [
      "While Spawnboy's home is entirely monochromatic, he has always been fond of the color yellow.",
      "Despite being named Spawn'boy' and having a masculine voice, Spawnboy has they/them pronouns.",
      "Spawnboy technically doesn't have a real name, as the name 'Spawnboy' was a nickname created by those who had near-death experiences and caught glimpses of them, or had short interactions with them.",
      "Spawnboy's design is solely inspired by the Sunspawn sigil commonly found on spawnpoints in various Roblox games. Other popular characters such as Broken Spawn or Two-Time also share the same markings and themes, though they played no part in Spawnboy's own design."
    ]
  },
  
  abilityName: "Spawnipulation"
};
