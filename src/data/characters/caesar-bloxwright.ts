
import { WikiEntry } from "@/types/wiki-types";
import { createCombatStats } from "@/lib/stats";

export const caesarBloxwright: WikiEntry = {
  id: "caesar-bloxwright",
  title: "Caesar Bloxwright",
  description: "Caesar Bloxwright is one of the three protagonists of The Lore, a vigilante operating within the Outer Circle of the Bloxiverse. His journey throughout Part 1 follows he, Nauli and eventually Vortex as they attempt to collect and lock away the Coils of Power after discovering their existence. He forms connections throughout his journey, while trying to keep his undeveloped powers at bay.",
  preview: "A towering giant, with an equivocally-sized heart. A vigilante, dedicated to his quest to rid the Bloxiverse of evil.",
  content: "",
  category: "character",
  subcategory: "protagonist",
  imageUrl: "/lovable-uploads/eddd95a1-b4e5-4b4a-8f64-6fbd33ab1d03.png",
  lastUpdated: "2025-05-20",
  part: "Part 1",
  relatedEntries: ["nauli-parter"],
  quote: {
    text: "That's a shallow way of thinking, assuming I do this purely for the profit. I don't want others to suffer at the hands of people like you, and THAT is my motive. Wherever you're locked up, I hope you take a long time to think about your actions, and resolve to change.",
    context: "Caesar, scolding Bryck as he passes him off to associates of the Hunter Association."
  },
  species: "Robloxian",
  age: "25",
  height: "8 Studs",
  status: "Alive",
  alignment: "Chaperone",
  role: "Chaperone",
  archetype: "chaperone",
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
      label: "Unarmed",
      description: [
        "Caesar is a slow, yet sturdy fighter who relies on his remarkable strength to quickly put down his enemies in just a few hits. He is much larger than the average Bloxian, making him physically imposing towards most. He is naturally tough, capable of enduring injuries that would incapacitate or even kill other Bloxians.",
        "Caesar's big weakness becomes obvious when facing quick or fast-acting opponents, as he is a rather slow fighter. He often struggles with his reflexes, unable to weave or dodge out of most attacks. Without careful planning and predicting, fast targets will have almost no issue avoiding Caesar's deadly fists, especially if they can fight while remaining out of range."
      ],
      combatStats: createCombatStats(
        "B", // Strength: Main category average
        "C", // Durability: Main category average
        "E", // Agility: Main category average
        "D", // Precision: Main category average
        "D", // Intelligence: Main category average
        {
          // Strength subcategories
          power: "B",
          lift: "C",
          penetration: "C",
          intensity: "E",
          // Durability subcategories
          toughness: "C",
          vitality: "B",
          thermostability: "C",
          esotolerance: "C",
          // Agility subcategories
          swiftness: "E",
          acceleration: "E",
          flexibility: "F",
          endurance: "C",
          // Precision subcategories
          accuracy: "D",
          range: "E",
          dexterity: "F",
          reactivity: "D",
          // Intelligence subcategories
          tactility: "D",
          wisdom: "D",
          foresight: "C",
          sanity: "D"
        }
      )
    }
  ],
  abilityCarouselImages: [
    {
      url: "/lovable-uploads/d331d668-d72d-4905-8868-e63dc63c5bde.png",
      caption: "Caesar, channeling The Flow as it begins to spread and radiate across his body and clothing."
    },
  ],
  sections: {
    overview: [
      "Caesar Bloxwright is one of the three protagonists of The Lore, a vigilante operating within the Outer Circle of the Bloxiverse. His journey throughout Part 1 follows he, Nauli and eventually Vortex as they attempt to collect and lock away the Coils of Power after discovering their existence. He forms connections throughout his journey, while trying to keep his undeveloped powers at bay."
    ],
    combatStyles: [
      {
        id: "standard",
        label: "Unarmed",
        description: [
          "Caesar is a slow, yet sturdy fighter who relies on his remarkable strength to quickly put down his enemies in just a few hits. He is much larger than the average Bloxian, making him physically imposing towards most. He is naturally tough, capable of enduring injuries that would incapacitate or even kill other Bloxians.",
          "Caesar's big weakness becomes obvious when facing quick or fast-acting opponents, as he is a rather slow fighter. He often struggles with his reflexes, unable to weave or dodge out of most attacks. Without careful planning and predicting, fast targets will have almost no issue avoiding Caesar's deadly fists, especially if they can fight while remaining out of range."
        ],
        combatStats: createCombatStats(
          "B", // Strength: Main category average
          "B", // Durability: Main category average
          "E", // Agility: Main category average
          "D", // Precision: Main category average
          "E", // Intelligence: Main category average
          {
            // Strength subcategories
            power: "B",
            lift: "B",
            penetration: "C",
            intensity: "D",
            // Durability subcategories
            toughness: "B",
            vitality: "B",
            thermostability: "D",
            esotolerance: "B",
            // Agility subcategories
            swiftness: "E",
            acceleration: "E",
            flexibility: "F",
            endurance: "C",
            // Precision subcategories
            accuracy: "D",
            range: "D",
            dexterity: "E",
            reactivity: "D",
            // Intelligence subcategories
            tactility: "D",
            wisdom: "E",
            foresight: "D",
            sanity: "E"
          }
        ),
        combatStyleData: {
          passives: {
            techniques: [
              {
                id: "healthy-and-hearty",
                title: "Healthy and Hearty",
                description: [
                  "Caesar's larger stature—when paired with his daily regimen and healthy eating—has drastically improved his natural health. This allows him to resist disease and weaker poisons without much difficulty."
                ]
              }
            ]
          },
          offensive: {
            techniques: [
              {
                id: "ripquake-impact",
                title: "Ripquake Impact",
                description: [
                  "By throwing his fist forward into the ground with all of his might, Caesar can cause small tremors, knocking lighter targets off-balance. It can be useful in a pinch to stagger multiple targets nearby, or disrupt a target too quick to hit with conventional attacks."
                ]
              },
              {
                id: "gale-sweep",
                title: "Gale Sweep",
                description: [
                  "By sweeping the air with his leg, Caesar can create a strong current of wind capable of blowing back lighter targets. It also works as a great way to throw sand, dust or other small debris into the air, obscuring the vision of his enemies. The kick itself carries a lot of momentum, making it (obviously) painful to be struck by."
                ]
              }
            ]
          },
          defensive: {
            techniques: [
              {
                id: "iron-stance",
                title: "Iron Stance",
                description: [
                  "By adjusting his posture and bracing himself, Caesar can tolerate a significant amount of force, allowing him to remain sturdy and locked into place."
                ]
              },
              {
                id: "immobility-oath",
                title: "Immobility Oath",
                description: [
                  "Caesar rips into the terrain around himself with his bare hands, rooting into place and fully committing to defense. His breathing slows and his muscles tense, his body adapting to become a living bulwark. Although this technique takes time to prepare, Caesar's tense muscles and rooted state make him near-impossible to move or injure with physical force alone, knives struggling to cut his flesh."
                ]
              }
            ]
          },
          drawbacks: {
            techniques: [
              {
                id: "slow-and-unsteady",
                title: "Slow and Unsteady",
                description: [
                  "Caesar is much larger than other Bloxians, and naturally lacks any flexibility. His top speeds are faster than a typical civilian, but not by far. He may have a high amount of endurance, but his slower pacing makes him easier to outmatch and overwhelm."
                ]
              }
            ]
          }
        }
      }
    ],
    development: [
      {
        id: "chpt-1",
        label: "Chpt. 1: Gravity of the Situation",
        description: [
          "Caesar spends most of the morning tending to his routine around the island. He passes by Nauli's tent and wakes her up for breakfast midway, and she joins him as the two make their way back to his cabin. Caesar sits down to flip through the channels on TV as Nauli prepares breakfast, where he comes across a news broadcast. He and Nauli both learn of the Farmer Sanctuary, and an ongoing attack by a Bloxian known as Bryck Manning. They agree to set out and put a stop to Bryck before he can cause any more destruction.",
          "Caesar and Nauli eventually arrive at the sanctuary and immediately intercept Bryck. Caesar is left to deal with Bryck as Nauli rounds the locals and calms them down, while Caesar is left to confront and—if necessary—apprehend Bryck. Though Caesar tries to reason with Bryck, he is unable to do so and a fight breaks out. This drags on for some time until Nauli is able to return and intervene, inhibiting Bryck with her abilities and enabling Caesar to pry Bryck of the Gravity Coil.",
          "With Bryck de-powered, Caesar spends time chatting with one of the locals—Rice Farmer—while Nauli ties Bryck up. Eventually, he and Nauli take Bryck and leave in search for a place to drop him off. They eventually settle on the Hunter Association, turning him in and going to leave. As they're leaving, an associate comes and explains to he and Nauli that a bounty had been amassed by Bryck, and that they have earned it. Caesar refuses, but Nauli quickly takes it on behalf of both of them.",
          "Caesar and Nauli return home, where Caesar notices that Nauli is carrying a bag she didn't have before. He asks and discovers that she kept the Gravity Coil, planning to do some further research. He and Nauli say their goodbyes as Caesar returns to his cabin for the night."
        ]
      },
      {
        id: "chpt-2",
        label: "Chpt. 2: Time's Up",
        description: [
          "Caesar wakes up restless after the night before, his thoughts lingering on the coil. His morning routine passes as normal, though Caesar chooses to let Nauli sleep this time around, opting to make breakfast himself. He finishes up, and heads back to his cabin only to discover the front door ajar. He is immediately put on-guard, but eventually relaxes as it is discovered that Nauli was inside cooking breakfast for the two of them. As they eat, Nauli discusses her plans to meet up with an old friend to run tests, and determine what the Gravity Coil is.",
          "Caesar hesitates but eventually agrees, before being tasked by Nauli to do some grocery shopping with the bounty they had received after apprehending Bryck. Caesar hesitates and tells Nauli that he'd prefer to go read, but is eventually convinced after being tempted with the idea of Bloxy Cola. The two confirm their plans, as Caesar splits with Nauli to go shopping while her research is underway.",
          "Caesar eventually arrives at a mall, where he goes from store to store. He gets caught up in a handful of decisions, naturally indecisive. He picks out a handful of spices and other goods, alongside a handful of glass-bottled Bloxy Cola to enjoy later. Throughout his trip, he gets the sense that someone or something is following him, but he passes it as paranoia as the trip begins home. On the way however, he is ambushed by a mysterious figure as the two crash into an abandoned world nearby.",
          "Combat began instantly as Caesar was rushed by the attacker. His abilities were forced out as he went onto the defense, forming barriers and constructs to prevent injury. This works initially, though the attacker quickly begins to use stronger weaponry, drawing a powerful revolver that fires rounds capable of piercing Caesar's armor. Eventually, a bullet manages to slide past his defenses and embeds itself in his shoulder, forcing Caesar to his knees from the pain.",
          "Caesar finally snaps as his ability is fully unleashed, the ground around he and the attacker ripping from the violent surges of gravity and electricity. Unleashing a pulse, the man is grabbed and restrained mid-air, before being slammed repeatedly into the ground. Eventually, Caesar launches him into a rocky wall, believing the fight is over. The man retaliates one final time however, landing a single punch which proves futile in injuring Caesar. Grabbing and launching the man away, Caesar pulls him back to his fist before issuing a decisive blow and ending the fight.",
          "The man is restrained as Caesar rests, steadying his breathing as his powers slowly start to calm down. The man awakens as Caesar begins to talk with him, eventually developing a mutual understanding of one another. It is revealed that Caesar had inadvertently claimed the bounty of Bryck, which the man who attacked him was after. Caesar frees the man who then introduces himself as Vortex, a hunter belonging to the Hunter Association. After their goodbyes, Vortex nods before disappearing in a flash of purple light.",
          "Caesar stays back and recovers for a few more minutes, but eventually sets off for home and emerges into the island later. Nauli has already arrived home, and quickly sees that he is exhausted and has a bullet lodged deep within his shoulder. She helps him inside and puts him to rest in his bed, insisting that she'll cover what she learned with Ren in the morning."
        ]
      },
      {
        id: "chpt-3",
        label: "Chpt. 3: Deep Cuts",
        description: [
          "Caesar has rested since his encounter with Vortex yesterday, but is significantly inhibited by the wound and bullet in his shoulder. Nauli urges him to rest, but he insists on completing his morning duties. Nauli argues, but ultimately cannot stop him as he gets ready for the day. As he eats soup prepared by her, Nauli slips away and calls for Rice Farmer to come and keep a watch on Caesar as he works. Rice Farmer agrees, and begins the journey to the island. As Caesar is leaving, she distracts him by discussing what she had learned about the coil they collected.",
          "Caesar is informed that it is one of the three Power Coils, legendary artifacts that can manipulate different laws of reality. She explains her plan to leave and gather intel by travelling to a handful of different places, to which Caesar is worried for her, but agrees. It is then that Rice Farmer shows up, as Nauli says her goodbyes and leaves on her mission while Caesar and Rice begin the daily chores of the island.",
          "Caesar and Rice work slowly and casually with each other, making conversation as Caesar tests the limits of his arm after the shoulder injury. It does not take them long to finish up his duties despite the setback, and he and Rice go to relax and chat until Nauli's return. As they make conversation, Caesar slowly opens up about his history prior to having powers. He explains to Rice about the attack on his home, and the near-death experience that caused his latent powers to activate.",
          "Rice goes to share his own history, but both of them are interrupted by Vortex as he emerges onto the island. He hands Caesar a vial of green liquid, explaining that it is healing magic. Caesar eventually drinks the vial and his body recovers almost immediately, the bullet ejecting from his body as the wound seals. Caesar is thankful and invites Vortex to stick around, leading to friendly sparring to pass the time.",
          "Eventually, they go to relax on the porch of his cabin just as Nauli returns, though she is covered in blood. Caesar fears the worst, but eventually realizes that the blood is not her own. After he calms down and introduces Vortex to Nauli, Rice and Vortex both part ways with the group to return home. Caesar and Nauli discuss her findings, mentioning that she wishes to investigate the Red-Cliff Arena. She also explains why she's covered in blood, detailing her experience with Karblox Jones and his lackeys.",
          "Caesar is upset that Nauli didn't come to him for extra help, though is more happy to see that she's alright than anything. They say their goodnights as Caesar returns to the cabin and Nauli leaves for the lake to wash her body and clothes of blood."
        ]
      }
    ],
    history: [
      {
        id: "creation",
        label: "Creation",
        description: [
          "Caesar was born closer to the final waves of Robloxians, cast into an already-crumbling society that was struggling to adapt to the influx of new Bloxians. Caesar fled as far as he could amidst the conflict, before eventually settling into the Outer Circle and forming his World, Caesar's Isle. Settled far away from the ongoing chaos of the segments closer to the Heart, Caesar was fortunate and lucky enough to sit mostly idle as the dust settled."
        ]
      },
      {
        id: "awakening",
        label: "Awakening",
        description: [
          "Before Caesar had any known powers, he was ambushed by an unknown assailant and had his world ransacked for supplies. He was beaten violently until his body could no longer move, forced to watch and wallow in his sadness and rage. This near-death experience was enough to awaken his latent abilities, allowing him to make a comeback and lay waste to the attacker in a berserk state.",
          "Caesar's memories of the incident are extremely hazy, but it is presumed that the man did not survive against Caesar. The experience marked a turning point in his life, leading him to resolve to protect others, so they would not have to go through the terrible experience that Caesar once did."
        ]
      }
    ],
    appearance: [
      {
        id: "coated",
        label: "Coated",
        description: [
          "Caesar Bloxwright is an extremely tall and widely-built Robloxian, a majority of his body covered by a black overcoat, white-collared with a grey bowtie clipped on. He has long sleeves which extend into fingerless gloves. Underneath his coat is a black sweater and dark pants, belted into place at his waist. He has messily-parted dark hair, with small strands sticking up at their ends. Despite having no bangs or obstructions covering his face (beyond a pair of circular glasses), a faint shadow always seems to linger where his eyes should be—even if a light source is directly shined in his face."
        ]
      },
      {
        id: "casual",
        label: "Casual",
        description: [
          "Caesar Bloxwright is an extremely tall and widely-built Robloxian. While relaxing around his island or spending time casually with friends, he'll often ditch his coat in favor of lighter and more comfortable clothing. He wears a black t-shirt and grey jogging pants. He still wears circular glasses, and his eyes remain covered by a looming shadow despite the lack of obstructions."
        ],
        images: [
          {
            url: "/images/caesar-casual-1.png",
            caption: "Caesar in his casual attire, relaxing in a comfortable black t-shirt and grey sweatpants."
          }
        ]
      }
    ],
    personality: [
      {
        id: "typical",
        label: "Typical",
        description: [
          "Caesar is a walking example of empathy and resolve. Although quieter by nature, he isn't shy to speak up or act when it comes to his feelings, his decisions guided by strong emotions. He carries a deep-rooted sense of love and loyalty for those he values, and only wants what is best for them, even to his own detriment. He naturally adopts a protective role towards his family and friends, happy to throw his life on the line or push himself to the limit if a dire situation deems it necessary. His sense of self-preservation is weak, so long as anything that matters to him is at risk.",
          "As Caesar is emotionally-driven in all aspects of his life, he is very easy to manipulate or stir up, especially when it comes to something or someone he values. He is quick to break down and become enraged if something valued is threatened or hurt, often leading him to think irrationally or make decisions with reckless abandon. He does his best to keep his mind under control, but his body tends to act without waiting for thought."
        ]
      },
      {
        id: "overload",
        label: "Overload",
        description: [
          "Caesar's ability can heavily influence his mind as it is pushed further and further, causing him to grow lost in the heat of battle and begin to act recklessly. If he doesn't carefully manage his psyche and maintain self control, he'll lose himself completely as his mind surrenders to the sheer power. In this state, Caesar goes berserk; He'll attack his enemies with little consideration for himself, nor his allies or loved ones. He is driven solely by bloodlust and raw motivation, urged by his own powers to lay waste to any that oppose his goals. He acts maniacal and completely unreasonable, nearly impossible to sway with logic nor emotion.",
          "This fever often lasts until Caesar exhausts himself of stamina, or until his target(s) becomes incapacitated or deceased. When he comes to his senses, he lacks memories or clear recollection of what occurred while he was berserk, but he often expresses regret at such degrading behavior."
        ]
      }
    ],
    lifestyle: [
      {
        id: "at-home",
        label: "At Home",
        description: [
          "Caesar lives within his Robloxian World, known simply as Caesar's Isle. Within this forested and mountainous island, he dwells within a small cabin of his own creation. Each day he sticks to a daily routine, running rounds of his island to inspect and check up on a handful of chores. He'll check the supports of his cabin, before watering and turning the soils of his gardens. He navigates the island in a large looped path as this process is completed, inspecting lamposts along the way and refilling their oil for the coming nights.",
          "He enjoys reading and writing at his desk, or relaxing with his favorite beverage, the Bloxy Cola. He'll often relax and watch TV on his couch, frequently inviting the other resident of the island—Nauli Parter—to spend time with him. She's often responsible for cooking their meals, as Caesar struggles to prepare anything actually tasty."
        ]
      },
      {
        id: "vigilante",
        label: "The Vigilante",
        description: [
          "Caesar has set himself on a noble path in life, to act as a protector for those who cannot defend themselves. He too has known what it is like to be helpless and defenseless, aiming to prevent as many as he can from suffering the same fate. Backed by his immense strength and powerful ability, he'll often seek out danger directly, apprehending threats and saving innocents from terror and destruction. Caesar dedicated himself to this way of life from the moment he had developed his powers, which emerged during a near-death encounter on his island a few years prior. He has taken the opportunity to learn how to hone and manage his skills along the way, improving little by little with each battle.",
          "Though Caesar initially worked alone, he eventually met and paired up with Nauli as they shared similar goals. His group would grow again later on, after an encounter and subsequent battle with Vortex. Though this relationship began rocky initially, Vortex was eventually trusted as all three began to work in tandem."
        ]
      }
    ],
    relationshipsData: {
      "nauli-parter": {
        status: "Close Friend & Ally",
        history: [
          "Caesar and Nauli originally met during an unexpected encounter at a restaurant. He found Nauli rummaging through trash for scraps, offering to buy her a meal as the two began to chat. As they opened up more with one another, it quickly became apparent that they had similar fields of work and aspirations. Though Nauli was unsure of Caesar at first, they went on to establish a strong friendship as they began working together and grew to trust one another.",
          "Caesar knew Nauli was mostly homeless, and eventually constructed a simple campsite within his island for her to stay at. She would go on to make this her permanent home in the coming months, and continues to live there to this day."
        ]
      },
      "vortex-a-steele": {
        status: "Friend & Ally",
        history: [
          "Caesar and Vortex met one another on poor terms, as he attacked Caesar during their first physical encounter. Caesar had inadvertently claimed the bounty of Bryck Manning when surrendering him to the Hunter Association, unknowingly stealing a paid contract from Vortex. The two fought until Caesar eventually overpowered Vortex and both Bloxians calmed down. After a bit of clearing the air and coming to an understanding of one another, they mutually agreed to call a truce as Vortex left.",
          "Vortex inevitably returned later on to make amends, providing Caesar with an elixir to treat the injuries he had caused, clearing his conscience and calling things even. Vortex ended up sticking around after this, and has since begun to pair up with him on occasion. Caesar isn't too closely-knit with Vortex, but their trust and bond has slowly been forming as time goes on."
        ]
      },
      "rice-farmer": {
        status: "Friend",
        history: [
          "Caesar and Rice met after Caesar apprehended Bryck Manning during their fight at the Farmer Sanctuary, Rice's home. Caesar and Rice formed a small connection during their brief conversation, and Rice has occasionally appeared to assist or spend time with Caesar as a thank-you for his service. Caesar admires Rice for his wisdom and genuineness."
        ]
      },
      "bryck-manning": {
        status: "Captured Enemy",
        history: [
          "Caesar and Bryck had an intense battle within the Farmer Sanctuary, eventually leading to Caesar apprehending Bryck and providing him to the Hunter Association. Bryck has since been imprisoned, though not before he could tip off an angry Vortex as to who had claimed his bounty, which lead to Vortex's attack on Caesar.",
          "Though powerless and unable to do much in his current situation, Bryck now resides within the Hunter Association's prison and vows to get back at Caesar. However, Caesar remains blissfully unaware of Bryck's plans for revenge."
        ]
      }
    },
    abilityData: {
      overview: {
        text: [
          "Caesar's body acts as a host and conduit for an anomalous source of power, formally known as the Electrogravitic Flow and informally known as the Flow. It manifests as a sky-blue plasma, smoothly rippling across his entire body and projecting itself onto areas he wishes to manipulate.",
          "The Flow enables Caesar to generate and discharge electrified plasma, capable of manipulating his own gravity or the gravity of his surroundings. This essentially grants him a powerful form of telekinesis, capable of controlling the battlefield, all while amplifying Caesar's movements to strengthen his attacks or hold his ground.",
          "Though the Flow has clear potential for growth, Caesar is a beginner and finds it difficult to properly control. The natural influence of the Flow seeps into his mind as he continues to use it, requiring him to act carefully; Lest he lose himself to the power and go berserk."
        ]
      },
      passives: {
        techniques: [
          {
            id: "self-generative-gravity",
            title: "Self-Generative Gravity",
            description: [
              "Caesar's body does not follow the standard laws of physics, as the Flow constantly lingers within his vessel. The Flow automatically detects incoming dangers, such as deadly levels of gravity, and mitigates the effects. This allows Caesar to tolerate extreme conditions that would crush or stretch others—such as close proximity to the Heart of the Bloxiverse."
            ]
          }
        ]
      },
      offensive: {
        techniques: [
          {
            id: "absolute-mass",
            title: "Absolute Mass",
            description: [
              "By unleashing waves of plasma and gravity onto his targets, Caesar can control their density, subsequently increasing or decreasing their weight. Primarily, this technique is used to restrain or slow targets down, increasing their mass and forcing them to the ground. This makes them easier to attack or apprehend, although it is extremely tiresome to hold down a target for long, especially if the target is trying to resist the effect."
            ]
          },
          {
            id: "cosmic-whip",
            title: "Cosmic Whip",
            description: [
              "Caesar can project a tether-like whip, formed out of hardened plasma. He can fire it towards targets, and yank them inwards to strike. He can choose to swing the whip to injure his targets, shocking and lacerating anything struck. The whip can also be utilized as a handy restraint, allowing Caesar to bind targets to himself, other Bloxians, or the environment."
            ]
          },
          {
            id: "density-discharge",
            title: "Density Discharge",
            description: [
              "Caesar siphons a significant amount of mass into his body, slowing his movements to a crawl as his body buckles from overwhelming weight. After a sufficient amount of mass has been collected, Caesar then unleashes a violent surge of raw kinetic force. This blast is capable of rupturing anything in his immediate vicinity, launching back whatever happened to be caught nearby.",
              "Caesar can localize a discharge to just one of his limbs if necessary, allowing him to use the rest of his body as it builds up force. Naturally, a one-limb discharge is significantly less powerful compared to a full-body discharge."
            ]
          },
          {
            id: "self-amplification",
            title: "Self-Amplification",
            description: [
              "Caesar can utilize the mass-altering properties of the Flow to increase the power behind his punches and kicks, allowing him to strike with ground-trembling force while using only half the effort necessary."
            ]
          }
        ]
      },
      defensive: {
        techniques: [
          {
            id: "hard-light-constructs",
            title: "Hard-Light Constructs",
            description: [
              "Caesar can create solid barriers, formed through the compression of the Flow's plasma. The shapes and behaviors of these constructs vary significantly, allowing Caesar to create a variety of different constructs for different situations. Caesar can form basic walls or domes, or even go as far as to create entire sets of armor out of his plasma, lining his body to provide extra defense."
            ]
          },
          {
            id: "telekinesis",
            title: "Telekinesis",
            description: [
              "The Flow acts as a simple form of telekinesis, allowing Caesar to do basic actions from a distance. Grabbing food mid-air before it can hit the floor, pulling something out-of-reach into his hands or any other menial tasks are doable. His precision with telekinesis is poor, he could not type quickly on a keyboard or write with a pen and paper."
            ]
          }
        ]
      },
      drawbacks: {
        techniques: [
          {
            id: "rapid-energy-consumption",
            title: "Rapid Energy Consumption",
            description: [
              "The Flow is exhausting to use, especially when pushed to its limits. Careful stamina management and sparing use of the Flow is necessary to perform effectively in combat."
            ]
          },
          {
            id: "weighed-down",
            title: "Weighed Down",
            description: [
              "The Flow has a natural weight of its own, and is partially responsible for why Caesar is naturally slow."
            ]
          },
          {
            id: "corruptive-polarity",
            title: "Corruptive Polarity",
            description: [
              "As the Flow carries an electrical current, it intercepts with the electric signals in Caesar's brain and slowly influences his mind. The more the Flow is used, the more this effect takes a hold of his psyche. This ends up leading into confusion and behavioral issues, inevitably leading to Caesar going berserk."
            ]
          }
        ]
      }
    },
    trivia: [
      "Caesar is ambidextrous, meaning that he can comfortably use both hands for just about any task. He developed this skill through the time spent tending to his island.",
      "Caesar's favorite beverage is the Bloxy Cola, and would probably substitute it for water if he were rich enough.",
      "Caesar has a fear of spiders, and bugs in general.",
      "Caesar was the first character to be made for The Lore, and has gone through several redesigns, rewrites, and reworks. His creation date goes as far back as 2020!"
    ]
  },
  
  abilityName: "The Electrogravitic Flow"
};

