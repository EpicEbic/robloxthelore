
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const builderman: WikiEntry = {
  id: "builderman",
  title: "Builderman",
  description: "The cheery and energetic leader of the Buildermen faction, bestowed with divine creation powers by Roblox themselves.",
  preview: "A cheery and energetic leader for the Buildermen faction, gifted with the divine powers of creation by Roblox themselves.",
  content: "",
  category: "character",
  subcategory: "neutral",
  lastUpdated: "2025-01-26",
  
  quote: {
    text: "A mansion? A rocket? A city? The only limit is my imagination!",
    context: "Builderman, claiming to a civilian that his limit really is his imagination."
  },
  species: "Noob",
  age: "N/A (Divine Youth)",
  alignment: "Lawful/Good",
  role: "Paladin",
  
  carouselImages: [
    {
      url: "/images/builderman-modern-1.png",
      caption: "Builderman, giving a wave while leaning on his Banhammer."
    }
  ],
  
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Builderman is a smart, physically-blessed fighter who is dangerous even without the use of his ability. His countless years of war and battle have turned him into an effective tactician, capable of quickly analyzing and creating counters for his opponents mid-combat. He aims to maintain consistent pressure on his opponents, striking carefully and critically to quickly break the defenses of his targets down."
      ],
      combatStats: createCombatStats(
        "B", // Strength
        "B", // Durability
        "A", // Agility
        "B", // Precision
        "A", // Intelligence
        {
          // Strength subcategories
          power: "B",
          lift: "B",
          penetration: "B",
          intensity: "A",
          // Durability subcategories
          toughness: "B",
          vitality: "S",
          thermostability: "A",
          esotolerance: "A",
          // Agility subcategories
          swiftness: "A",
          acceleration: "A",
          flexibility: "B",
          endurance: "A",
          // Precision subcategories
          accuracy: "B",
          range: "C",
          dexterity: "S",
          reactivity: "S",
          // Intelligence subcategories
          tactility: "B",
          wisdom: "A",
          foresight: "C",
          sanity: "A"
        }
      ),
      images: []
    },
    {
      id: "the-banhammer",
      label: "The Banhammer",
      description: [
        "Through the power contained within the Banhammer, Builderman becomes immeasurably powerful, capable of attacking with strength that obliterates matter from reality itself. The strength of the swing does not matter, but rather Builderman's intent on what he wishes to erase. So he wishes, Builderman has to do nothing more than tap the surface of the Banhammer's head on a target for its ability to take effect.",
        "Certain matter is impossible for the Banhammer to erase, primarily gasses (including air) and specific liquids."
      ],
      combatStats: createCombatStats(
        "Ø", // Strength
        "B", // Durability
        "A", // Agility
        "B", // Precision
        "A", // Intelligence
        {
          // Strength subcategories
          power: "Ø",
          lift: "B",
          penetration: "Ø",
          intensity: "S",
          // Durability subcategories
          toughness: "B",
          vitality: "S",
          thermostability: "A",
          esotolerance: "A",
          // Agility subcategories
          swiftness: "A",
          acceleration: "A",
          flexibility: "B",
          endurance: "A",
          // Precision subcategories
          accuracy: "B",
          range: "B",
          dexterity: "S",
          reactivity: "S",
          // Intelligence subcategories
          tactility: "B",
          wisdom: "A",
          foresight: "C",
          sanity: "A"
        }
      ),
      images: []
    }
  ],
  abilityCarouselImages: [],
  sections: {
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Builderman is a smart, physically-blessed fighter who is dangerous even without the use of his ability. His countless years of war and battle have turned him into an effective tactician, capable of quickly analyzing and creating counters for his opponents mid-combat. He aims to maintain consistent pressure on his opponents, striking carefully and critically to quickly break the defenses of his targets down."
        ],
        combatStats: createCombatStats(
          "B", // Strength
          "B", // Durability
          "A", // Agility
          "B", // Precision
          "A", // Intelligence
          {
            // Strength subcategories
            power: "B",
            lift: "B",
            penetration: "B",
            intensity: "A",
            // Durability subcategories
            toughness: "B",
            vitality: "S",
            thermostability: "A",
            esotolerance: "A",
            // Agility subcategories
            swiftness: "A",
            acceleration: "A",
            flexibility: "B",
            endurance: "A",
            // Precision subcategories
            accuracy: "B",
            range: "C",
            dexterity: "S",
            reactivity: "S",
            // Intelligence subcategories
            tactility: "B",
            wisdom: "A",
            foresight: "C",
            sanity: "A"
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "Builderman is a smart, physically-blessed fighter who is dangerous even without the use of his ability. His countless years of war and battle have turned him into an effective tactician, capable of quickly analyzing and creating counters for his opponents mid-combat. He aims to maintain consistent pressure on his opponents, striking carefully and critically to quickly break the defenses of his targets down."
            ]
          },
          passives: {
            techniques: [
              {
                id: "blessing-of-god",
                title: "Blessing of God",
                description: [
                  "Builderman has been imbued with a fraction of Roblox's power, physically enhancing his body's strength and health while also granting him the gift of creation. He is entirely immune to certain ailments, namely disease and aging. He can tolerate harmful conditions for longer than most, absorbing radiation and other harmful substances."
                ]
              }
            ]
          }
        },
        images: []
      },
      {
        id: "the-banhammer",
        label: "The Banhammer",
        description: [
          "Through the power contained within the Banhammer, Builderman becomes immeasurably powerful, capable of attacking with strength that obliterates matter from reality itself. The strength of the swing does not matter, but rather Builderman's intent on what he wishes to erase. So he wishes, Builderman has to do nothing more than tap the surface of the Banhammer's head on a target for its ability to take effect.",
          "Certain matter is impossible for the Banhammer to erase, primarily gasses (including air) and specific liquids."
        ],
        combatStats: createCombatStats(
          "Ø", // Strength
          "B", // Durability
          "A", // Agility
          "B", // Precision
          "A", // Intelligence
          {
            // Strength subcategories
            power: "Ø",
            lift: "B",
            penetration: "Ø",
            intensity: "S",
            // Durability subcategories
            toughness: "B",
            vitality: "S",
            thermostability: "A",
            esotolerance: "A",
            // Agility subcategories
            swiftness: "A",
            acceleration: "A",
            flexibility: "B",
            endurance: "A",
            // Precision subcategories
            accuracy: "B",
            range: "B",
            dexterity: "S",
            reactivity: "S",
            // Intelligence subcategories
            tactility: "B",
            wisdom: "A",
            foresight: "C",
            sanity: "A"
          }
        ),
        combatStyleData: {
          overview: {
            text: [
              "Through the power contained within the Banhammer, Builderman becomes immeasurably powerful, capable of attacking with strength that obliterates matter from reality itself. The strength of the swing does not matter, but rather Builderman's intent on what he wishes to erase. So he wishes, Builderman has to do nothing more than tap the surface of the Banhammer's head on a target for its ability to take effect.",
              "Certain matter is impossible for the Banhammer to erase, primarily gasses (including air) and specific liquids."
            ]
          },
          passives: {
            techniques: [
              {
                id: "blessing-of-god-banhammer",
                title: "Blessing of God",
                description: [
                  "Builderman has been imbued with a fraction of Roblox's power, physically enhancing his body's strength and health while also granting him the gift of creation. He is entirely immune to certain ailments, namely disease and aging. He can tolerate harmful conditions for longer than most, absorbing radiation and other harmful substances."
                ]
              },
              {
                id: "one-size-fits-all",
                title: "One Size Fits All",
                description: [
                  "The Banhammer can automatically resize to fit Builderman's needs, growing as large as a building or shrinking to the size of a bean on a whim.",
                  "Regardless of however large the hammer becomes, its weight does not increase, nor does its power grow any weaker."
                ]
              },
              {
                id: "worthy-wielder",
                title: "Worthy Wielder",
                description: [
                  "The Banhammer can be lifted by any Bloxian who tries, but only Builderman is capable of activating the hammer's innate ability to erase matter.",
                  "Builderman is unsure if there are specific conditions to become \"worthy\" of the hammer, or if it is exclusive to him."
                ]
              }
            ]
          },
          offensive: {
            techniques: [
              {
                id: "absolute-erasure",
                title: "Absolute Erasure",
                description: [
                  "Through one swing of the Banhammer, any target can be completely annihilated from reality itself, not even an atomic trace left behind. The size of the target—nor any defenses they may have set up—can do anything to stop the Banhammer's ability from activating. One swing will always do the trick, every time.",
                  "The sole exception to the Banhammer depends on the matter Builderman is swinging at. Gasses (such as air) and certain liquids do not trigger the Banhammer's ability."
                ]
              }
            ]
          },
          defensive: {
            techniques: [
              {
                id: "pylon-of-annihilation",
                title: "Pylon of Annihilation",
                description: [
                  "By planting the handle of the Banhammer into the ground, it begins to radiate an aura of pure obliteration, erasing anything that steps within—aside from Builderman and anybody he subconsciously allows inside. This aura acts as a powerful shield, capable of nullifying any attack before it can even reach targets inside."
                ]
              }
            ]
          }
        },
        images: []
      }
    ],
    appearance: [
      {
        id: "modern",
        label: "Modern",
        description: [
          "Builderman is an average-built Noob, with noticeably-unique skin tones that normally do not appear within the Noobish race. While his head is the standard yellow seen on most Noobs, his torso is orange whilst his arms and legs are a deep greyish-blue. Most of his skin is covered by his working suit, a grey strap-belt jacket with a hood and grey pants. His hood is almost always up, obscuring a black and orange hardhat he wears. He is often seen with a utility belt, a variety of tools hoisted neatly across the front. Underneath his clothing, a tattoo of a wrench was plastered across his chest by Roblox, a symbol of his importance and position as the Builderman. Builderman can choose whether his mark is hidden completely, visible underneath his clothing, or present above his clothing.",
          "Builderman carries the Banhammer on his person at all times, usually hovering idly behind his back, or shrunk down to fit in a pocket for subtlety or convenience."
        ],
        images: [
          {
            url: "/images/builderman-modern-1.png",
            caption: "Builderman, giving a wave while leaning on his Banhammer."
          },
          {
            url: "/images/builderman-modern-2.png",
            caption: "Builderman is resting atop the Banhammer, surely it can't be that comfortable, right?"
          }
        ]
      },
      {
        id: "legacy",
        label: "Legacy",
        description: [
          "During the ancient times, Builderman's unique skin tones were much more apparent, as he wore nothing beyond white pauldrons, his hard hat and various bandages. Such attire was necessary for protection and good health, especially during the Great Guesticide and the war that came with it. The wrench marking was much more visible and covered most of his chest, present over the bandages wrapped across his body.",
          "Even in these times, Builderman always kept the Banhammer within reach, especially so during the darker ages of the Bloxiverse."
        ],
        images: [
          {
            url: "/images/builderman-legacy-1.png",
            caption: "Builderman, solemnly kneeling with his Banhammer in hand."
          },
          {
            url: "/images/builderman-legacy-2.png",
            caption: "It was difficult to keep a prideful and happy persona on at all times, but Builderman did what he could."
          }
        ]
      }
    ],
    personality: [
      {
        id: "modern",
        label: "Modern",
        description: [
          "Builderman is a cheery, easygoing and very upstanding man. He is a natural leader and full of determination, qualities necessary to run his faction—the Buildermen. He can be a showoff at times, especially when he is around Bloxians he wishes to impress, but it is all well-intentioned in the end, done for good fun and never purely to gloat about his abilities. He always acts as a people-pleaser, whether intentionally or subconsciously. He is entirely against violence and disorder, and quickly becomes flustered when any kind of fighting happens, especially when it is physical. He carries trauma from his legacy of bloodshed during the war, triggered easily by reminders or stress. He hates to relive the events that transpired during those years, and the lives he had to end as a result of it."
        ]
      },
      {
        id: "legacy",
        label: "Legacy",
        description: [
          "During the early years of the Bloxiverse, Builderman had a much larger role within the Bloxiverse. He was chosen by Roblox to act as a guardian and peacekeeper, tasked to act as a beacon of hope and security for the Guests. This was already very stressful for Builderman, and things only grew worse as the war broke out. His heroic persona quickly fell apart under the tension, and he was eventually forced to choose sides, becoming a military leader for the Noobs. He became colder, distancing himself from reality and doing his best to commit atrocities to Guestkind with blind eyes. Once the war was over and the last known Guests were annihilated, Builderman retired to recover both physically and mentally from the PTSD he had developed.",
          "It would take many, many years for Builderman to stabilize himself and put the events that transpired behind him."
        ]
      }
    ],
    lifestyle: [
      {
        id: "the-buildermen",
        label: "The Buildermen",
        description: [
          "Builderman is the founder and director for the Buildermen, a faction dedicated to the production and distribution of material goods for Bloxians in need. He has established himself as a known celebrity, praised by many for his selflessness and honorable charity work. He doesn't like the public attention, crediting his many employees despite operating as the backbone of the Buildermen, singlehandedly making the entire operation possible. Aside from explicit interviews and meetings, he has positioned his closest friend and highest-ranked employee, Bloxxanne Whelder, to stay in charge of the public fronts, as he tends to get nervous and tense from the publicity. Even hidden from the public eye, Builderman always tries to outdo himself in his work, using his resources and abilities to make sure that the Buildermen can always provide for the needy at any hour of the day."
        ]
      },
      {
        id: "free-time",
        label: "Free Time",
        description: [
          "Builderman has very little time to himself outside of work, even while living within the headquarters for the Buildermen. His work is intensive and exhausting, leaving Builderman with a desire to sleep when his quota for the day has finally been met. With the little time he does have in the end, he enjoys watching TV and painting. He has a particular affinity for art, fascinated by the process. He has been unable to properly replicate artwork with the ability of creation, leading him to paint in an effort to learn and understand what defines a piece as 'art'."
        ]
      }
    ],
    history: [
      {
        id: "establishment",
        label: "Establishment",
        description: [
          "Builderman was originally an unnamed Noob, born alongside the first batch of Noobkind, created by Roblox to fill the Bloxiverse with life beyond the Guests. Roblox was still heavily involved with the security and development of the Bloxiverse by this point, allowing the Noobs and Guests to interact with Roblox himself. Roblox and Builderman grew close in particular, Roblox found Builderman's natural kindness and humble personality to be endearing. Builderman was the first Noob—and the first Bloxian—to successfully befriend god, and all it took was being himself.",
          "One day, Roblox approached Builderman with a proposition; He wished for Builderman to become an authority within the Bloxiverse, asking him to help create worlds that would eventually be inhabited by future Noobs. Builderman was honored and bewildered at the idea, accepting with no hesitation—doing so without consideration for the duties that would come with this role. In the end, he was chosen to be bestowed a fraction of Roblox's power, granting him the spark of creation—something no Guest or Noob has ever received to-date. This spark would grant him the incredible powers of creation, alongside a significant boost in power and eternal youth. From that point on, Roblox named him the 'Builderman', the first Bloxian to create entire worlds in the name of Roblox.",
          "Roblox was not blind to the potential dangers that would arise for Builderman, especially while acting as Roblox's right-hand man. To help Builderman defend himself and channel the spark of creation he had been blessed with, Roblox forged a legendary tool to assist him. From this, the Banhammer was born and bestowed upon Builderman as a gift."
        ]
      },
      {
        id: "racial-conflicts",
        label: "Racial Conflicts",
        description: [
          "Time had passed since Builderman had become a creator, and tensions had begun to rise between the Guests and the Noobs. Roblox feared the worst and inquired with Builderman, looking for a levelheaded perspective on the situation to better judge his next course of action. Builderman believed it was better to let things play out naturally for the Bloxians, fearing that Roblox's creations may turn on him if he were to pick sides. Roblox took note of Builderman's advice, letting him return to his duties.",
          "Eventually, what Roblox predicted would come to pass. A great war known in history as the Guesticide had begun, a retaliation organized by the Guests due to the feelings of inferiority they felt. Builderman first tried to calm things between the two sides, but the Guests eventually started to attack Builderman as well. The Noobs were hesitant to retaliate, but Builderman gathered the courage and rallied them together, knowing they would need to defend themselves against such stubborn opponents. Builderman set himself into the position as a military leader for the Noobs, and went on to charge into many battles alongside them. Builderman despised every second of it, knowing the suffering he was inflicting on those poor souls, who only wanted recognition and appreciation. He couldn't help but wonder why they had gone about getting attention this way.",
          "The war raged on for an amount of time Builderman didn't care to recall, he was too busy dissociating from the conflict. It was clear that the Noobs truly were superior in the end, because they had soon wiped all known Guests completely off of the map. Builderman quickly retired as the leader of the Noobs, retreating to hide away for multiple years as he recovered from the trauma and PTSD he had gone on to develop from the slaughter."
        ],
        images: [
          {
            url: "/images/builderman-history-1.png",
            caption: "Builderman had no choice in the conflict, but he still hated every second of it."
          }
        ]
      },
      {
        id: "the-recovery",
        label: "The Recovery",
        description: [
          "Eventually, Builderman returned to a healthy state of mind, though permanently scarred by trauma impossible to shake. He set out on a journey of repentance and forgiveness, desiring to clear his soul and mind of the atrocities he had no choice but to commit. He began small, doing odd jobs and quick favors for strangers. He knew it barely made an impact, but it still helped to clear his conscience a bit. Things would progress quickly, his favors and actions growing larger and larger as he became more absorbed in the joy he felt from helping others. He realized that his gift from Roblox could be used beyond the creation of Worlds, that it could be used to meet the needs of Bloxians.",
          "A thought struck Builderman's mind, one that would change the course of his life forever. Maybe beyond the creation of Worlds, this was his true purpose? He could do more than expand, he could further help what was already made. This change of thought would be a turning point for Builderman, who began looking into the creation of a charity, one that could provide resources to those in need."
        ]
      },
      {
        id: "the-building-men",
        label: "The Building Men",
        description: [
          "This dedication would eventually culminate into a small faction, run by Builderman and a few volunteers. They were known as the Buildermen, dispersing necessities to Bloxians far and wide. Builderman would handle the creation of these resources, while his assistants would handle the distribution of these goods. Their charity quickly picked up traction, with more volunteers wishing to help out, and larger demands appearing as the Buildermen society established themselves. The operation grew rapidly, and Builderman was riding the highs of success.",
          "For a while, the Buildermen held steady in their work, and many Noobs got just about anything they could've needed for their survival. It was brief, but beautiful golden age for both Builderman and the Bloxiverse."
        ]
      },
      {
        id: "end-of-an-era",
        label: "End Of An Era",
        description: [
          "Eventually would come the day where Roblox would disappear forever, without so much as a word—not even a goodbye. This broke Builderman's heart for a long time, wondering if he and Roblox were truly friends. He swallowed his doubts, believing that Roblox surely wouldn't disappear without any reason. Besides, he had no time to worry about Roblox, as the Robloxians had arrived right as Roblox disappeared—as though it were a final gift for the Bloxiverse.",
          "Naturally, chaos quickly ensued from the arrival of the Robloxians, making the Buildermen and their jobs even more important than they already were. Demands for supplies and Worlds skyrocketed as the Bloxiverse's economy struggled to adapt to the sudden influx of Bloxians. It was during this insanity where Builderman first met Bloxxanne, a girl born with a knack for inventing. Builderman quickly grew attached to her, and the pair became great friends. Eventually, Bloxxanne began climbing the ranks of the Buildermen, which would quickly lead her to become Builderman's right hand woman, valued for her intelligence, ingenuity, and companionship.",
          "Soon would come the modern day, where the Buildermen continue their operation with Builderman and Bloxxanne at the front. Builderman still longs for the day Roblox returns, but his faith crumbles more and more with each passing day. Even so, he holds the memories he made with Roblox dearly, lamenting about the simpler times before he had become the Builderman. His struggles with PTSD continue, but each day he grows a little stronger, even if by only a pinch."
        ]
      }
    ],
    relationshipsData: {
      "bloxxanne-whelder": {
        status: "Close Friend / Romantic Interest",
        history: [
          "Builderman and Bloxxanne have been together since the earlier days of the Buildermen faction, closely-knit for as long as they can remember. She has helped Builderman through the darkest of times, always being there for him during his manic episodes and panic attacks from his PTSD. Together, they have managed to run the Buildermen for years and years, and their operation only seems to be growing stronger with each passing day.",
          "Builderman secretly has feelings for Bloxxanne, doing his best to shove them down and hide them from her. He fears that she wouldn't reciprocate how he feels, and that if she did, it would only be out of pity."
        ],
        images: [
          {
            url: "/images/builderman-ren-1.png",
            caption: "Builderman, having a conversation with Bloxxanne. Why does he look so nervous?"
          }
        ]
      }
    },
    abilityData: {
      overview: {
        text: [
          "Builderman may manifest any object, structure, or construct from nothing at any given moment, so long as they can properly fathom the form, composition, and function. Creation has a limited range of 10,000 x 10,000 studs per-construct.",
          "\"Impossible\" objects, such as 4-D (four-dimensional) constructs or non-euclidean geometry are impossible to create, as they bend the natural laws imposed by the Bloxiverse, and cannot be entirely fathomed by 3-D (three-dimensional) beings."
        ]
      },
      passives: {
        techniques: [
          {
            id: "spatial-intuition",
            title: "Spatial Intuition",
            description: [
              "Within the 10,000 x 10,000 stud range of Builderman's ability, he is granted an innate awareness of his surroundings. This makes it incredibly difficult to sneak up on Builderman, or do something without his knowledge."
            ]
          },
          {
            id: "subconsciously-familiar",
            title: "Subconsciously Familiar",
            description: [
              "The more Builderman fathoms specific objects into existence, the easier it becomes to do again for that particular object in the future. The more he understands what it is he creates, the faster and more efficiently he can produce that object in particular."
            ]
          },
          {
            id: "adaptive-reinforcement",
            title: "Adaptive Reinforcement",
            description: [
              "Created objects will begin to self-optimize against stress, damage, or misuse, so long as Builderman remains conscious and within the 10,000 x 10,000 stud range."
            ]
          },
          {
            id: "object-permanence",
            title: "Object Permanence",
            description: [
              "Even after constructs leave the 10,000 x 10,000 stud radius, they continue to exist, for as long as the materials the object is made of continue to hold up."
            ]
          }
        ]
      },
      offensive: {
        techniques: [
          {
            id: "immediate-armament",
            title: "Immediate Armament",
            description: [
              "Builderman is capable of fathoming weapons directly into his hands or the surrounding area, depending on what the situation demands. Blades, firearms, cannons, bombs and more are all plausible options."
            ]
          },
          {
            id: "constructive-crush",
            title: "Constructive Crush",
            description: [
              "Builderman can fathom extremely large constructs above his enemy, bringing them down to flatten them under immense weight. Typically, he'll create buildings to do so, or large solid cubes of heavy materials such as iron or stone."
            ]
          },
          {
            id: "potential-bomb",
            title: "Potential Bomb",
            description: [
              "By straining his mind and intentionally thinking unclearly, Builderman can create deadly explosions of raw potential, unleashing a slurry of various materials and half-complete constructs in all directions.",
              "This technique may unintentionally activate if Builderman is under significant stress, though it grows stronger as he becomes more and more desperate."
            ]
          },
          {
            id: "environmental-weaponization",
            title: "Environmental Weaponization",
            description: [
              "Builderman can utilize the environment to his advantage, building his constructs off of the conditions he may find himself in. He can conjure spikes of stone in tight spaces, create pitfalls by detonating bombs underground. It all depends on where Builderman may find himself in that moment."
            ]
          }
        ]
      },
      defensive: {
        techniques: [
          {
            id: "instantaneous-bulwark",
            title: "Instantaneous Bulwark",
            description: [
              "When in danger, Builderman can conjure durable materials into powerful shields and barriers to defend him from incoming enemy attacks. Simple barriers and defensive bulwarks can be created much faster than weapons, due to the simplicity and often-high urgency."
            ]
          },
          {
            id: "dynamic-armor",
            title: "Dynamic Armor",
            description: [
              "Builderman can surround his body with a variety of different materials, flowing around him and creating a protective layer. This armor can change materials and size as-per Builderman's requirements, adapting to tolerate things like concussive force, intense heat, electricity, etc."
            ]
          },
          {
            id: "emergency-reconstruction",
            title: "Emergency Reconstruction",
            description: [
              "If a defensive (or offensive) construct is destroyed in combat, a simpler \"fallback\" version can instantly be created in its place. Fallback constructs are typically much weaker than their well-thought counterparts."
            ]
          }
        ]
      },
      utilitarian: {
        techniques: [
          {
            id: "architectural-genesis",
            title: "Architectural Genesis",
            description: [
              "So long as it remains within the 10,000 x 10,000 stud limit, Builderman can fathom large-scale architecture on a whim, creating entire cities or operational facilities within the spatial limit. A new home is never more than a wave of the hand away, and imprisoning enemies in a metal labyrinth has never been easier."
            ]
          },
          {
            id: "infinitool",
            title: "Infinitool",
            description: [
              "Builderman ALWAYS has the necessary tool for the job, capable of fathoming just about any equipment he needs to complete just about any job. The tools on his belt were also made through his abilities."
            ]
          },
          {
            id: "sustenance-fathoming",
            title: "Sustenance Fathoming",
            description: [
              "Whether he or another Bloxian is hungry or thirsty, Builderman can generate liquids and foods on a whim."
            ]
          }
        ]
      },
      ultimate: {
        techniques: [
          {
            id: "world-expansion",
            title: "World Expansion",
            description: [
              "In a pinch or against particularly tough opponents, Builderman can construct temporary worlds to contain enemies. These temporary worlds do not follow the typical bounds set by normal Robloxian Worlds, and can have specialized effects or architecture, often designed around hindering or eliminating whatever may be inside.",
              "The effects of temporary worlds range widely, but typically get stuffed full of hazardous materials. Entire worlds made purely of fire or radiation, walls that close in on all sides, worlds of pure water to drown enemies. The only limit is his imagination."
            ]
          },
          {
            id: "colossa-cannon",
            title: "Colossa-Cannon",
            description: [
              "Builderman can fathom a singular, supermassive cannon which completely covers the 10,000 x 10,000 stud limit. This cannon fires with enough force to shake entire quadrants of the Bloxiverse, temporarily outshining the Heart. The blast easily annihilates entire worlds that are struck by the beam, only ceasing when Builderman cannot maintain the cannon any longer.",
              "Such a massively-powerful construct is extremely taxing on Builderman's mind and body. The last use of this technique occurred during the Great Guesticide, after which Builderman fell into a deep coma for multiple weeks."
            ]
          }
        ]
      },
      drawbacks: {
        techniques: [
          {
            id: "cognitive-overload",
            title: "Cognitive Overload",
            description: [
              "Creating too much, too fast can cause Builderman to become overwhelmed by his own thoughts and the flow of creation, nullifying his ability entirely until he can clear his mind and refocus."
            ]
          },
          {
            id: "thought-decay",
            title: "Thought Decay",
            description: [
              "If Builderman rapidly creates constructs over and over, they become more and more misshapen overtime. Significant stress or a lack of energy and effort can cause objects to have deformities and become completely non-functional."
            ]
          },
          {
            id: "physical-drainage",
            title: "Physical Drainage",
            description: [
              "High-powered constructs (such as cannons, vehicles, etc.) quickly exhaust Builderman when created en masse, requiring him to plan carefully in order to continue using his ability over a long span of time."
            ]
          }
        ]
      }
    },
    trivia: [
      "Builderman has an addiction to herbal tea.",
      "Builderman is based off of a real Roblox user of the same name."
    ]
  },
  
  abilityName: "Creation",
  stats: createCharacterStats("S", "A", "Ø", "A")
};
