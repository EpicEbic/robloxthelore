
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const nauliParter: WikiEntry = {
  id: "nauli-parter",
  title: "Nauli Parter",
  description: "A nomadic Robloxian with augmented psychic abilities, traveling the Bloxiverse to serve justice alongside her close allies.",
  preview: "A tactician and effective manipulator, Nauli's split personality makes her both a strong ally and a dangerous enemy.",
  content: "Nauli Parter is a 23-year-old Robloxian with augmented psychic abilities who lives a nomadic lifestyle, wandering the Bloxiverse to fight evil wherever it may lurk.",
  category: "character",
  subcategory: "protagonist",
  imageUrl: "/lovable-uploads/1cd20d3c-e29b-4fe3-8a40-e4732259983b.png",
  lastUpdated: "2025-07-29",
  relatedEntries: ["caesar-bloxwright", "vortex-a-steele", "ren-bytera", "bryck-manning"],
  quote: {
    text: "Hurry up, I didn't come here just to dawdle. Fight me.",
    context: "Nauli, challenging an opponent who's taking too long to make their move."
  },
  species: "Robloxian",
  age: "23",
  alignment: "Neutral / Good",
  carouselImages: [
    {
      url: "/images/nauli-tactical-1.png",
      caption: "Nauli, keeping watch of the distance. You never know when a new threat might strike."
    }
  ],
  abilityCarouselImages: [
    {
      url: "/images/nauli-ability-1.png",
      caption: "Nauli's eyes form spark-like symbols, as she channels Pathokinesis to manipulate a target."
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Nauli is quick, flexible, and sharp-witted. She is agile in combat and can issue flurries of punches or kicks with little to no warning. Her reflexes are incredibly strong, enabling her to weave and avoid the attacks of other Bloxians in most hand-to-hand combat situations.",
        "Despite Nauli's speed, she isn't particularly strong, nor durable. She takes care to avoid unnecessary risks, opting to wear opponents down slowly until she is presented an opportunity to issue a killing blow."
      ],
      // ESTIMATED STATS - Subject to change
      // Strength: E (low power), Durability: E (low endurance), Agility: C (above average speed), Precision: B (high accuracy), Intelligence: B (high tactical thinking)
      combatStats: createCombatStats("E", "E", "C", "B", "B"),
      images: [
        {
          url: "/images/nauli-combat-1.png",
          caption: "Nauli, having drawn her knife from her belt."
        }
      ]
    }
  ],
  sections: {
    appearance: [
      {
        id: "tactical",
        label: "Tactical",
        description: [
          "Nauli is an average-built Robloxian, often seen wearing a grey, white-striped tracksuit. She is equipped with a variety of green armaments, including a utility belt, scarf, and a shoulder pad. Affixed to the left of her belt is a combat knife, allowing for a quick removal if necessary. She has blonde, bobbed hair with two metal antennae protruding from either side of her head."
        ],
        images: [
          {
            url: "/images/nauli-tactical-1.png",
            caption: "Nauli, keeping watch of the distance. You never know when a new threat might strike."
          }
        ]
      },
      {
        id: "casual",
        label: "Casual",
        description: [
          "Nauli is an average-built Robloxian, often seen wearing a grey, white-striped tracksuit. She has blonde, bobbed hair with two metal antennae protruding from either side of her head."
        ],
        images: [
          {
            url: "/images/nauli-casual-1.png",
            caption: "Nauli, without the tactical gear and accessories attached to her tracksuit."
          }
        ]
      }
    ],
    personality: [
      {
        id: "strangers",
        label: "Strangers",
        description: [
          "Nauli is a cold cynic, and isn't much for words unless speaking would be to her own benefit. Mercy is merely a concept, as she won't hesitate to attack and eliminate those she believes to be a threat. She finds no use in pulling her punches or flaring her style, believing it is better to be effective than it is to be fancy."
        ]
      },
      {
        id: "friends-family",
        label: "Friends / Family",
        description: [
          "When alone and in the presence of someone she trusts, Nauli's demeanor completely changes. She becomes cheery, friendly, and a pleasantly pleasing person to be around. She is energetic, enthusiastic, and loves to encourage and help those she loves to the best of her ability. She likes to remain productive, helping with small chores around the homes of her allies, even if she isn't asked to.",
          "To those who are unaware of Nauli's split personality, you could pass her as two different people with how drastically and unrecognizably different her behavior shifts."
        ]
      }
    ],
    lifestyle: [
      {
        id: "nomad",
        label: "Nomad",
        description: [
          "Nauli lives a nomadic and spontaneous lifestyle, with no real home to claim as her own. Traumatic past incidents have prevented Nauli from creating a new Robloxian world after her initial World was destroyed, leading to her fantastic travels across the Bloxiverse's farthest reaches. Though she lacked a consistent home for the longest time, she met Caesar and eventually settled down in a campsite positioned on his island.",
          "Within the island, Nauli has finally been free to feel peace and security; Commodities that she had rarely had the luxury of experiencing. Under Caesar's protection and free to decorate and expand her campsite as she wishes, she has made quite a comfortable outpost for herself. She'll often go out of her way to assist Caesar with his chores around the island, as a way to share her appreciation.",
          "Despite a campsite to call her own, Nauli still tends to travel around from time to time, feeling more at ease when she remains on the move. She acts as though something bad would happen, should she remain in place for too long. Her mysterious fear is not without good reason, naturally."
        ]
      },
      {
        id: "assassin",
        label: "Assassin",
        description: [
          "Nauli primarily operates as an independent assassin, taking on private contracts issued by shady Bloxians. While initially she worked alone, Nauli has since begun to work with Caesar in a combined effort to eliminate particularly strong opponents that neither could best alone. This group effort has furthered her own skillset and has allowed her to gain a serious reputation."
        ]
      }
    ],
    history: [
      {
        id: "creation",
        label: "Creation",
        description: [
          "Nauli was created during one of the final Robloxian waves prior to Roblox's disappearance, thrown into the frenzy with little to no knowledge of life. Like many other Robloxians, she fled and sought refuge in a Robloxian world of her own creation, born from her imagination. She created a paradise, full of grassy valleys and rivers that ran as far as the eye could see, with clear sunny skies and a crisp, cool breeze you could soak in for hours.",
          "Nauli's world grew to be quite a popular settlement for Robloxians and Noobs alike, as it was positioned in the Inner Ring, a segment of the Bloxiverse highly accessible to most Bloxians, due to its proximity to the Heart. Slowly but surely, Nauli amassed a small village of Bloxians whom she grew close with and lived alongside in prosperity.",
          "Life was perfect for Nauli, and she has always recalled it as the happiest period of her life."
        ]
      },
      {
        id: "scarlet",
        label: "Scarlet",
        description: [
          "Some time had passed since establishing her World, and the village inside had amassed into a small settlement by this point. She had formed countless relationships and meaningful connections throughout her experience in life, and she had been taught many practical skills by her villagers. She was revered as a wonderful leader and a beacon of hope for the Bloxiverse.",
          "But alas, nothing good can last forever.",
          "As her World was easily accessible, it was only a matter of time before those with impure intentions would stumble upon her domain. Eventually, this fate came to pass as the Scarlet Flame, a notorious criminal and pyromaniac, discovered the World and her settlement. From then on, the fate of the World and its inhabitants were sealed.",
          "The superheated inferno and genocide that soon followed was nothing short of horrific. Entire portions of the settlement ignited into crimson-colored flames, as helpless innocents scrambled for safety, only to be burnt alive. The rivers boiled as the waters were stained red with blood, before turning black from the ash of corpses and structures alike. Explosions erupted, dealing with sturdier buildings formed of rock and other non-flammable materials.",
          "Nauli, shellshocked and barely holding a grip of herself, managed to barely escape her own World in time, before it collapsed from the extensive heat damage at the hands of the Scarlet Flame. In a mere hour, Nauli's entire life and all of her lifelong friends had been claimed by the crimson fires, leaving her with nothing but the charred clothes on her body and a traumatic experience.",
          "That day forever changed Nauli, and she was never quite the same again. She became untrusting, developing a cold and cynical outlook on life. She stopped caring, and grew bitter to the Bloxiverse. Despite it all, she vowed to never become a monster such as the Scarlet Flame."
        ]
      },
      {
        id: "augmentation",
        label: "Augmentation",
        description: [
          "Piece by piece, Nauli managed to rebuild her life, though the trauma never truly left her. She trained and tried to grow from her experiences, becoming remarkably flexible and agile over time. Her prowess and skillset eventually gathered the attention of Ren, a morally-absent scientist who saw Nauli as a perfect experimentation opportunity.",
          "Ren introduced herself to Nauli, and pitched her plan to enhance Nauli's abilities. Though reluctant, Nauli believed she had little to lose and agreed to undergo the procedure. She would have psy-link antennae directly implanted into her skull and brain, with the promise of a large pay and Nauli's absolute safety.",
          "The surgery was a success, though it yielded unexpected results. The experiment was originally intended to grant Nauli psychic abilities, allowing her to send messages to the minds of other Bloxians, and mentally tune into the radio. While this worked as intended, Nauli could now also send out signals through her antennae, enabling her to manipulate the psyche of other Bloxians nearby. Ren was fascinated by this new ability, and insisted Nauli stay put for further testing.",
          "Eventually, Nauli was released back into the world, with her permanent antennae and new abilities. From here, she began to wonder what she could accomplish with a power such as hers. Time would soon tell."
        ]
      },
      {
        id: "assassin",
        label: "Assassin",
        description: [
          "Nauli eventually came to the conclusion that her best bet was to use her ability combatively, inspiring her to become a spy and assassin for-hire. It wasn't long before contracts began to roll in, and Nauli quickly picked up on the dirty work. She was efficient, and no intel remained out of reach through the use of her psychic powers. She found solace through these contracts, rediscovering her purpose that had long-since been extinguished by the Scarlet Flame.",
          "Nauli went on to hone her abilities and eventually became a master in her line of work. She trained and grew to become incredibly efficient with small weapons such as daggers and kunai, taking advantage of her speeds and flexibility to quickly outpace her contracts, and swiftly eliminate those she was told to. Her colder nature made her a natural, and her contracts were dropping like flies. She felt unstoppable, if not for the lingering thoughts of the Scarlet Flame in her mind.",
          "Some time after becoming an Assassin, she met Caesar and the two clicked almost immediately. Their shared morale and ideals made them realize it would be in their best interests to cooperate, leading the pair to collaborate in an effort to apprehend dangerous Bloxians that were too risky to tackle alone."
        ]
      }
    ],
    relationshipsData: {
      "caesar-bloxwright": {
        status: "Close Friend & Ally",
        history: [
          "Nauli was rummaging through a garbage bin for scraps of food, as she was running low on cash. Suddenly, a gentleman approached her, offering up a packaged meal he had purchased specifically for her from the till. Though Nauli's skepticism and paranoia wanted desperately to decline the food, her stomach simply could not.",
          "She quickly downed the meal while chatting with the man, whom she eventually learned was Caesar, a self-proclaimed vigilante on a mission to take down as many evil Bloxians as he could. Nauli admired his noble mission, and quickly realized that the two would pair greatly together, due to their shared interests.",
          "The two began to collaborate from then and onward, and have gone on to become an incredibly dangerous duo. Nauli's skills and psychic powers support Caesar while he focuses on the offense and defense. Together, very few threats truly stand in their way, though the Bloxiverse always has a bigger fish...",
          "After working together for some time, Nauli had formed a close bond with Caesar. This eventually lead to her being introduced to his island, and subsequently receiving a small plot of land for a campsite where she continues to live on most days."
        ],
        images: [
          {
            url: "/images/nauli-caesar-1.png",
            caption: "Nauli and Caesar, walking casually together as they chat."
          }
        ]
      },
      "vortex-a-steele": {
        status: "Former Enemy, Close Friend & Ally",
        history: [
          "Nauli was extremely skeptical when Caesar initially introduced Vortex as \"the guy who tried to kill me\" to her. She had little to no trust in Vortex, and it took some time to warm up to him. But as the days passed, she realized that Vortex genuinely held no ill intent, and was simply doing his job.",
          "She grew to respect Vortex's abilities and potential in combat, and learned to further trust him. Though he's hot-headed and stubborn, he has always meant well in the end. At times, Vortex has even collaborated alongside herself and Caesar to tackle particularly dangerous Bloxians as a trio."
        ]
      },
      "ren-bytera": {
        status: "Acquaintance",
        history: [
          "Though Nauli never grew close to Ren in any aspects, Ren's intelligence is something Nauli admires.",
          "Ren is also responsible for the psy-link antennae augmented into Nauli's head, so naturally it would be in line to keep communications open. At times, Ren has directly assisted Nauli and her allies by studying artifacts or providing various pieces of gear and equipment for the team."
        ]
      },
      "bryck-manning": {
        status: "Defeated Enemy",
        history: [
          "Alongside Caesar, Nauli assisted in the apprehension of Bryck Manning, a terrorist rampaging in a peaceful World known as the Farmer Sanctuary. Though she wasn't directly responsible for Bryck's subduing, she used her powers to help Caesar apprehend him. She was also credited when Bryck was later turned into the Hunter Association prior to his imprisonment."
        ]
      }
    },
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Nauli is quick, flexible, and sharp-witted. She is agile in combat and can issue flurries of punches or kicks with little to no warning. Her reflexes are incredibly strong, enabling her to weave and avoid the attacks of other Bloxians in most hand-to-hand combat situations.",
          "Despite Nauli's speed, she isn't particularly strong, nor durable. She takes care to avoid unnecessary risks, opting to wear opponents down slowly until she is presented an opportunity to issue a killing blow."
        ],
        combatStats: createCombatStats(
          "E", // Strength: Main category average
          "E", // Durability: Main category average
          "C", // Agility: Main category average
          "B", // Precision: Main category average
          "B", // Intelligence: Main category average
          {
            // Strength subcategories
            penetration: "D",  // Uses knives/focused attacks but low base power
            strength: "F",     // Not particularly strong
            intensity: "E",    // Low power behind attacks
            // Agility subcategories
            swiftness: "C",    // Quick movement, can issue flurries
            endurance: "C",   // Can sustain combat, wears opponents down
            flexibility: "B",  // Very flexible and agile
            // Precision subcategories
            accuracy: "B",    // Master assassin, high precision
            reactivity: "A",  // Incredibly strong reflexes, can weave attacks
            dexterity: "B",   // Skilled with daggers and kunai
            // Intelligence subcategories
            tactility: "A",   // Sharp-witted tactician, cold and calculative
            wisdom: "B",      // Master assassin, strategic thinking
            stability: "C",  // Can remain focused, though has trauma
            // Durability subcategories
            vitality: "E",    // Not durable, avoids unnecessary risks
            toughness: "E",   // Not particularly durable
            resistance: "E"   // Low durability overall
          }
        ),
        images: [
          {
            url: "/images/nauli-combat-1.png",
            caption: "Nauli, having drawn her knife from her belt."
          }
        ]
      }
    ],
    abilityData: {
      overview: {
        text: [
          "Nauli's psy-link antennae grant her the ability of Pathokinesis, allowing her to influence and manipulate the psyche of her victims. This mental manipulation has a handful of useful applications, and can prove to be either beneficial or detrimental depending on who she is influencing and the effort she is putting in to her manipulation.",
          "Though Nauli has had ample time to refine her techniques and ability, it appears as though some untapped potential remains."
        ]
      },
      passives: {
        techniques: [
          {
            id: "mind-reading",
            title: "Mind Reading",
            description: [
              "Nauli can tune in to the thoughts and feelings of those nearby, allowing her to quickly gather any information she wishes to know. This can be incredibly useful when interrogating targets, as it is physically impossible for them to lie.",
              "Interestingly, some form of mental block prevents her from reading the minds of those she loves, preventing the effects from working on Caesar, Vortex, etc."
            ]
          },
          {
            id: "subconscious-influence",
            title: "Subconscious Influence",
            description: [
              "Nauli's psy-link antennae constantly produce waves that influence Bloxians on a subconscious level, subtly altering their behaviors and thoughts to benefit Nauli. These effects are extremely weak and only cause slight shifts in personalities or desires.",
              "Nauli doesn't do this intentionally, so it would seem that the psy-link antennae are reading Nauli's own subconscious automatically, and projecting her desires into the minds of others."
            ]
          },
          {
            id: "influence-immunity",
            title: "Influence Immunity",
            description: [
              "Due to the presence of psy-link antennae in Nauli's brain and skull, she is naturally immune to the influence of other psychic powers, particularly those that affect the emotional spectrum or memories."
            ]
          }
        ]
      },
      offensive: {
        techniques: [
          {
            id: "mental-depress",
            title: "Mental Depress",
            description: [
              "Nauli can depress the minds of her targets, severely reducing their motivation and morale. Typically, this causes enemies to act aloof or carelessly, making them easier targets to eliminate."
            ]
          },
          {
            id: "psyscramble",
            title: "Psyscramble",
            description: [
              "Essentially unleashing a mental EMP, Nauli can temporarily scramble the thoughts and memories of her targets, heavily confusing them and making them extremely vulnerable targets until they can regain composure."
            ]
          }
        ]
      },
      defensive: {
        techniques: [
          {
            id: "psy-clones",
            title: "Psy-clones",
            description: [
              "Projecting realistic illusory clones of herself into the mind of her target, Nauli can become near-impossible to track as the victim is likely to attack one of the many fake Naulis instead of the real one."
            ]
          }
        ]
      },
      utilitarian: {
        techniques: [
          {
            id: "psych-up",
            title: "Psych Up",
            description: [
              "Nauli can channel motivation and bravery into her allies, boosting their morale and allowing them to fight with confidence, even in situations that seem bleak or completely hopeless. Despite not offering any direct boost in power to her allies, boosting them mentally has proven to be extremely effective as the reduced pressure makes it easier to think smarter."
            ]
          },
          {
            id: "pain-tolerance",
            title: "Pain Tolerance",
            description: [
              "Nauli can numb the pain of her own injuries or the injuries of another Bloxian by blocking the receptors in the brain that process pain. This can completely ease the suffering of those who have been heavily injured, and enables wounded Bloxians to continue fighting with their all.",
              "It's important to note that while the pain can be completely numbed and ignored, no actual healing occurs, making it the equivalent to a powerful painkiller."
            ]
          }
        ]
      },
      drawbacks: {
        techniques: [
          {
            id: "enemy-resolve",
            title: "Enemy Resolve",
            description: [
              "Pathokinesis has reduced effectiveness against those with a strong mind or resolve. It also struggles against those with no capacity to feel emotion, or those who are mentally insane. In some severe cases, Pathokinesis can be entirely nullified."
            ]
          }
        ]
      }
    },
    trivia: [
      "Nauli hates all sodas and beverages beyond tea and water, believing popular choices like the Bloxy Cola or Witches Brew to be far too fake and chemically-enhanced to be worth drinking.",
      "Nauli's favorite color is, if you can imagine, green.",
      "Nauli is 2nd when it comes to \"most rewrites\" for The Lore, just behind Caesar who has had far, far more."
    ]
  },
  
  abilityName: "Pathokinesis",
  stats: createCharacterStats("F", "F", "C", "C")
};
