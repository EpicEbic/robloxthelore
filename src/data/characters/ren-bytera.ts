
import { WikiEntry } from "@/types/wiki-types";
import { createCombatStats } from "@/lib/stats";

export const renBytera: WikiEntry = {
  id: "ren-bytera",
  title: "Ren Bytera",
  description: "Ren is jittery, overenergetic, and can be incredibly pushy-- especially when it comes down to her line of work as a scientist. Driven by an innate curiosity and fascination for the Bloxiverse and the life within, her insatiable appetite for knowledge often has her constantly seeking an understanding to reality.",
  preview: "A brilliant, yet morally questionable scientist whose experiments serve to assist her allies.",
  content: "",
  category: "character",
  subcategory: "neutral",
  imageUrl: "/lovable-uploads/3965c781-d5ba-46fa-9e9c-254fae05c32e.png",
  lastUpdated: "2025-08-12",
  part: "Part 1",
  relatedEntries: ["nauli-parter", "vortex-a-steele", "bloxxanne-whelder"],
  quote: {
    text: "Psst, wanna make some quick Robux, stranger? I'd just need you for a few... experiments. Don't worry—it'd only hurt a little!",
    context: "Ren's poor attempt at coercing someone into running her trials and experiments as her lab rat."
  },
  species: "Noob",
  age: "33",
  height: "4.5 studs",
  status: "Alive",
  alignment: "Chaotic / Neutral",
  role: "Outlaw",
  archetype: "outlaw",
  carouselImages: [
    {
      url: "/lovable-uploads/f8086831-5c52-4973-828e-892d4a1dea75.png",
      caption: "Ren in her lab coat, holding her research tablet with a confident smirk."
    },
    {
      url: "/lovable-uploads/e5e3b412-391d-47c7-9847-5d767f2b6386.png",
      caption: "Ren, handling a vial of biohazardous waste with her bare hands. Bravery, or foolishness?"
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: ["Ren has very little combat experience, and has little physical potential. She mainly relies on her high intellect and her inventions, outsmarting targets and making calculated moves to escape conflict, or subdue the enemy if possible."],
      combatStats: createCombatStats("F", "E", "E", "D", "S"),
      images: [
        {
          url: "/lovable-uploads/dd3af321-d11f-472d-9947-f62d4e383c6a.png",
          caption: "Ren, nervously raising her fists for a fight she knows she won't win."
        }
      ]
    },
    {
      id: "biograft-blade",
      label: "Biograft Blade",
      description: [
        "Ren has a self-made augment, which she has implanted in her right wrist. Operating on the same biofuel her facility does, the augment allows Ren to project a green-tinted blade formed of pure plasma. This blade can effortlessly cut through some of the densest materials, vaporizing mostly anything it may come into contact with.",
        "Despite the power behind the Biograft Blade, Ren is far too inexperienced in combat to make use of it, limiting its potential. On top of this, Ren can very easily injure herself with an improper swing or body movement, so she'll often leave the weapon as an emergency resort. It also consumes large quantities of energy to remain active, quickly running out if Ren were to constantly keep it powered."
      ],
      combatStats: createCombatStats("C", "E", "E", "C", "S"),
      images: [
        {
          url: "/lovable-uploads/ece6f146-459c-4361-b412-fa1a884ca5f1.png",
          caption: "Ren, projecting the Biograph Blade from the augment in her wrist."
        },
        {
          url: "/lovable-uploads/9727b977-dc51-451b-9be8-3f9d51f96fdf.png",
          caption: "A close-up of Ren's Biograft Blade."
        }
      ]
    },
    {
      id: "ion-shielding",
      label: "Ion Shielding",
      description: [
        "Ren's chest is implanted with a chip enabling her to produce a 360° energy barrier at whatever angle she may need, protecting her from a majority of blunt-force or energy-based attacks. Ren can also project this shielding on other targets, though the shielding weakens in strength as Ren projects it on targets further away. The chip's battery can be depleted if the projected shield sustains enough damage, though it recharges naturally by seeping from Ren's body's energy.",
        "Ren must remain alert and aware of the charge remaining in her shield. Overuse can cause it to run out, leaving her defenceless. It also seeps away at her energy, which can quickly cause exhaustion as her body is drained of resources to power the augment. In severe cases, Ren may black out."
      ],
      combatStats: createCombatStats("F", "B", "E", "D", "S"),
      images: [
        {
          url: "/lovable-uploads/fd453264-30e2-473c-a0b1-56740d9a12d6.png",
          caption: "Ren, projecting a majority of the Ion Shielding's energy to the front of her body."
        }
      ]
    }
  ],
  abilityCarouselImages: [],
  sections: {
    overview: [
      "Ren Bytera is a skilled inventor and engineer who plays a significant supporting role in The Lore. His expertise in creating advanced technology and weapons makes him a valuable asset to the protagonists, particularly through his work on various combat equipment.",
      "Ren's inventions, such as the Mag-num for Vortex, demonstrate his technical prowess and contribute to the team's combat effectiveness throughout the series."
    ],
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: ["Ren has very little combat experience, and has little physical potential. She mainly relies on her high intellect and her inventions, outsmarting targets and making calculated moves to escape conflict, or subdue the enemy if possible."],
        combatStats: createCombatStats("F", "E", "E", "D", "S"),
        combatStyleData: {
          overview: {
            text: [
              "Ren has very little combat experience, and has little physical potential. She mainly relies on her high intellect and her inventions, outsmarting targets and making calculated moves to escape conflict, or subdue the enemy if possible."
            ]
          }
        },
        images: [
          {
            url: "/lovable-uploads/dd3af321-d11f-472d-9947-f62d4e383c6a.png",
            caption: "Ren, nervously raising her fists for a fight she knows she won't win."
          }
        ]
      },
      {
        id: "biograft-blade",
        label: "Biograft Blade",
        description: [
          "Ren has a self-made augment, which she has implanted in her right wrist. Operating on the same biofuel her facility does, the augment allows Ren to project a green-tinted blade formed of pure plasma. This blade can effortlessly cut through some of the densest materials, vaporizing mostly anything it may come into contact with.",
          "Despite the power behind the Biograft Blade, Ren is far too inexperienced in combat to make use of it, limiting its potential. On top of this, Ren can very easily injure herself with an improper swing or body movement, so she'll often leave the weapon as an emergency resort. It also consumes large quantities of energy to remain active, quickly running out if Ren were to constantly keep it powered."
        ],
        combatStats: createCombatStats("C", "E", "E", "C", "S"),
        combatStyleData: {
          overview: {
            text: [
              "Ren has a self-made augment, which she has implanted in her right wrist. Operating on the same biofuel her facility does, the augment allows Ren to project a green-tinted blade formed of pure plasma. This blade can effortlessly cut through some of the densest materials, vaporizing mostly anything it may come into contact with."
            ]
          },
          offensive: {
            techniques: [
              {
                id: "plasma-slash",
                title: "Plasma Slash",
                description: [
                  "Ren can swing her Biograft Blade to cut through most materials with ease. The plasma blade vaporizes anything it touches, making it effective against armored targets."
                ]
              }
            ]
          },
          drawbacks: {
            techniques: [
              {
                id: "inexperience",
                title: "Inexperience",
                description: [
                  "Despite the power behind the Biograft Blade, Ren is far too inexperienced in combat to make use of it, limiting its potential. On top of this, Ren can very easily injure herself with an improper swing or body movement, so she'll often leave the weapon as an emergency resort."
                ]
              },
              {
                id: "energy-consumption",
                title: "Energy Consumption",
                description: [
                  "The Biograft Blade consumes large quantities of energy to remain active, quickly running out if Ren were to constantly keep it powered."
                ]
              }
            ]
          }
        },
        images: [
          {
            url: "/lovable-uploads/ece6f146-459c-4361-b412-fa1a884ca5f1.png",
            caption: "Ren, projecting the Biograph Blade from the augment in her wrist."
          },
          {
            url: "/lovable-uploads/9727b977-dc51-451b-9be8-3f9d51f96fdf.png",
            caption: "A close-up of Ren's Biograft Blade."
          }
        ]
      },
      {
        id: "ion-shielding",
        label: "Ion Shielding",
        description: [
          "Ren's chest is implanted with a chip enabling her to produce a 360° energy barrier at whatever angle she may need, protecting her from a majority of blunt-force or energy-based attacks. Ren can also project this shielding on other targets, though the shielding weakens in strength as Ren projects it on targets further away. The chip's battery can be depleted if the projected shield sustains enough damage, though it recharges naturally by seeping from Ren's body's energy.",
          "Ren must remain alert and aware of the charge remaining in her shield. Overuse can cause it to run out, leaving her defenceless. It also seeps away at her energy, which can quickly cause exhaustion as her body is drained of resources to power the augment. In severe cases, Ren may black out."
        ],
        combatStats: createCombatStats("F", "B", "E", "D", "S"),
        combatStyleData: {
          overview: {
            text: [
              "Ren's chest is implanted with a chip enabling her to produce a 360° energy barrier at whatever angle she may need, protecting her from a majority of blunt-force or energy-based attacks."
            ]
          },
          defensive: {
            techniques: [
              {
                id: "energy-barrier",
                title: "Energy Barrier",
                description: [
                  "Ren can project this shielding on other targets, though the shielding weakens in strength as Ren projects it on targets further away. The chip's battery can be depleted if the projected shield sustains enough damage, though it recharges naturally by seeping from Ren's body's energy."
                ]
              }
            ]
          },
          drawbacks: {
            techniques: [
              {
                id: "charge-management",
                title: "Charge Management",
                description: [
                  "Ren must remain alert and aware of the charge remaining in her shield. Overuse can cause it to run out, leaving her defenceless. It also seeps away at her energy, which can quickly cause exhaustion as her body is drained of resources to power the augment. In severe cases, Ren may black out."
                ]
              }
            ]
          }
        },
        images: [
          {
            url: "/lovable-uploads/fd453264-30e2-473c-a0b1-56740d9a12d6.png",
            caption: "Ren, projecting a majority of the Ion Shielding's energy to the front of her body."
          }
        ]
      }
    ],
    appearance: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Ren Bytera is a short and simple Noob, with black hair that has been messily bundled into pigtails. She wears a standard uniform for Bloxy Co-Operations' science division, along with multi-lens goggles that rest atop her head."
        ]
      }
    ],
    personality: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Ren is jittery, overenergetic, and can be incredibly pushy—especially when it comes down to her line of work as a scientist. Driven by an innate curiosity and fascination for the Bloxiverse and the life within, her insatiable appetite for knowledge often has her constantly seeking an understanding of reality. She values nothing more than the idea of explaining the unexplainable and won't hesitate to push boundaries and partake in unethical experiments to get the information she desires.",
          "This innate (and albeit dangerous) curiosity to learn can quickly cause Ren to push her morals far aside. She holds no respect for the life she experiments on and has no issues carrying out dangerous, unethical, or outright cruel and sadistic experiments on herself or willing participants. Her obsessions with science border on psychopathic behavior, as she'll often do just about anything to convince (or force) other Bloxians to be a subject in her trials."
        ]
      }
    ],
    lifestyle: [
      {
        id: "abandoned-laboratory",
        label: "Abandoned Laboratory",
        description: [
          "Ren burns her time away in a ruined laboratory, a Bloxy Co-Operatives research facility that has since gone defunct. Though the laboratory has long-since been abandoned, Ren's ingenuity and intelligence has allowed her to covert the remains of the facility into a remarkable base of operations and shelter for herself. The structure's abandoned status also allows her to lay low, keeping authoritarian figures and troublemakers unaware of her presence within the facility.",
          "As the days pass, Ren has had the time and resources to live a outstandingly luxurious life, especially for a Noob who is essentially squatting in a ruined lab. Growing her own veggies in a repurposed cafeteria, Ren keeps herself fed and healthy whilst old or extra supplies are processed with bio-processors, machines that generate electricity for the facility and its utilities. The once-packed sleeping quarters of the facility have been heavily remodeled by Ren, converting a space originally intended for up to 100 people into a grand bedroom exclusively for her.",
          "Ren is incredibly resourceful, and has put the abandoned machinery and technology left behind to good use. Curious at heart, Ren has constructed a wide array of inventions and tools through these abandoned resources, allowing her to participate in her \"constructive\" experiments. Ren has also developed an internal defense system, protecting her from threats who may breach into the facility, as well as any threats she may accidentally create during any of her unethical experiments."
        ]
      }
    ],
    history: [
      {
        id: "bloxy-co-operatives",
        label: "Bloxy Co-Operatives",
        description: [
          "Ren was originally a high-ranking researcher belonging to the Bloxy Co-Operatives, brought in for her outstanding IQ and love for science. Within this facility, new resources and products were brought in or created for the purpose of testing and eventual public release, and the experiments conducted were initially harmless. What started out as relatively harmless endeavors such as 'Would this ingredient be good for a new Bloxy Cola flavor?' or 'Is this new material better for producing cans?' quickly grew twisted and dark under Ren's supervision, her sadistic and dangerous curiosity shining through. 'How many toxic materials can we put in our products to save money?' and 'How much of this substance can we add to our product before it becomes a health risk?' were just some of the increasingly-sketchy questions Ren would seek to answer."
        ]
      },
      {
        id: "live-experiments",
        label: "Live Experiments",
        description: [
          "Eventually, Ren grew bored of using chemicals alone, and petitioned to use living Bloxians in her experiments. Ren had already established a presence within Bloxy Co-Operatives by this point, and the higher-ups were left in the dark on Ren's true nature. Naturally, they approved this request and started a campaign to bring in testing subjects, with promises of a handsome paycheck for their efforts. Naturally, the higher-ups would quickly come to regret this decision as Ren was quick to dive off of the deep end.",
          "As the live experiments began, Ren was practically unable to contain her excitement. She'd have no hesitation testing the limits of Bloxian physiology, even though it had no apparent ties to Bloxy Co-Operatives nor their products. She'd test knowingly-toxic materials on Bloxians to see how much they can withstand before they die, she'd see how much of a Bloxian can be removed without them dying, and much worse. Other researchers in the field began to doubt and find a distaste for Ren's cruel curiosity, as she began to essentially torture the inflow of new subjects. The outrage among fellow scientists grew and grew, though they were powerless to stop her as she far outranked other members within the facility."
        ]
      },
      {
        id: "the-explosion",
        label: "The Explosion",
        description: [
          "Eventually, tensions came to a head during Ren's final days under Bloxy Co-Operatives' science wing. Essentially, she had trued produced a bomb that can only kill a Bloxian if they haven't consumed Bloxy Cola in the last 24 hours. While Ren WAS successful in creating a bomb, it did not properly differentiate between those who did and didn't consume a Bloxy Cola. Multiple test subjects and staff were obliterated in the blast, and the facility was heavily damaged by the shockwave. Though Ren survived, she could no longer hide her operations from the higher-ups, as news of the facility's detonation spread like wildfire."
        ]
      },
      {
        id: "going-underground",
        label: "Going Underground",
        description: [
          "As news of the live experiments (and essentially torture) became public information, Bloxy Co-Operatives quickly begun damage control. Surviving employees were given severance pay and released under a contract to never speak of any events that took place within the facility. For a time, Ren was hunted down by Bloxy Co-Operatives through a paid contract issued to the Hunter Association. The search went on for quite some time, though it was eventually called off as Ren was nowhere to be found. In reality, Ren had hid within the ruins of the facility knowing that it would likely have been the last place they'd look, and she was correct to assume so.",
          "From then on, Ren remained within a small radius of worlds surrounding the laboratory, repurposing the ruins into a discreet and spacious home for herself. She has remained undercover to this day, partially out of fear that she'll be found out by either Bloxy Co-Operatives or the public, as her face was made known to the masses. Bloxy Co-Operations has yet to salvage the building, preferring to keep away from their mess and save face after Ren's rampage damaged their reputation."
        ]
      }
    ],
    relationshipsData: {
      "nauli-parter": {
        status: "Friend",
        history: [
          "Nauli was originally Ren's subject, as she had convinced Nauli to undergo an experimental surgery for Robux in return. Nauli underwent the procedure with no issues or adverse effects, and had psy-link antennae implanted in her head. Nauli was paid as promised, but the two ended up connecting throughout the experience.",
          "Nauli asked Ren questions and showed genuine interest in her work, which made Ren feel appreciated. The two opened up with one another, and ended up becoming friends. Ren and Nauli now regularly visit one another, and help each-other when in need.",
          "Ren is uncharacteristically friendly and respectful around Nauli, perhaps a sign of her gratefulness for Nauli's companionship."
        ]
      },
      "vortex-a-steele": {
        status: "Acquaintance",
        history: [
          "Ren was introduced to Vortex through her connection to Nauli, and was commissioned to develop weapons for Vortex. As expected, Ren delivered and eventually produced the Mag-num and the Amplification Gauntlet, weapons that Vortex would go on to use many times.",
          "While Vortex and Ren never grew close, Ren was happy to see her work get put to good use and Vortex respected the craftsmanship that Ren had delivered upon."
        ]
      },
      "bloxxanne-whelder": {
        status: "Rival",
        history: [
          "Ren has always been jealous of Bloxxanne's status and engineering skills, believing that she should be the one in Bloxxanne's place. She detests any mentioning of Bloxxanne or the Builder's Club, believing them to be far below her in intellect."
        ]
      }
    },
    trivia: [
      "Ren is terrible with social cues, often struggling (or entirely failing) to pick up on subtle hints, tones, or body language.",
      "Ren has a consistent habit of interrupting people when they speak—she can't help but get out what she wants to say the moment she wishes to say it.",
      "Ren's shield is partially inspired by Fox's shield from Super Smash Brothers."
    ]
  },
  
};
