
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const caesarBloxwright: WikiEntry = {
  id: "caesar-bloxwright",
  title: "Caesar Bloxwright",
  description: "Caesar is kindhearted, caring, and highly respectful by nature. He deeply values his family and friends, adopting a protective nature toward those he has grown close to.",
  preview: "A towering giant, with an equivocally-sized heart. A vigilante, dedicated to his quest to rid the Bloxiverse of evil.",
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
      combatStats: createCombatStats("B", "B", "E", "E", "D")
    }
  ],
  abilityCarouselImages: [
    {
      url: "/lovable-uploads/d331d668-d72d-4905-8868-e63dc63c5bde.png",
      caption: "Caesar, channeling The Flow as it begins to spread and radiate across his body and clothing."
    },
  ],
  sections: {
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Caesar's overwhelming physical strength and bulwark build make him a slower, yet hard-hitting tank of a fighter. Caesar may be imprecise, but his attacks carry impressive power that can easily prove lethal for fragile or unexpecting opponents. He is a juggernaut, with punches that are not to be taken lightly.",
          "Caesar falters in his speed and reflexes, struggling heavily to keep up with quicker targets or those with sharp reflexes. Without thinking ahead and outsmarting his enemies, they'll often have no trouble weaving and evading any of his attacks."
        ],
        combatStats: createCombatStats("B", "B", "E", "E", "D")
      }
    ],
    history: [
      {
        id: "creation",
        label: "Creation",
        description: [
          "Caesar was born closer to one of Roblox's final waves of new Robloxians, cast into an already-crumbling society that was struggling to fully adjust to the new race. Caesar fled any and all conflict initially, eventually finding himself in the Outer Ring where he would soon go on to create a World. He imagined an island, floating atop an expanse of infinite sea, with a cycle of day and night like he had seen in other Worlds. From this vision, the World that would come to be known as \"Caesar's Isle\" was born.",
          "Despite living in the Outer Ring, a notorious 'danger zone' for the Bloxiverse, Caesar lived a quiet and fulfilling life. Though, Caesar found it to be rather empty at times, for he had made no friends or family on his path. Despite this, Caesar always felt gratefulness, knowing that his situation in life always could've been far, far worse."
        ]
      },
      {
        id: "awakening",
        label: "Awakening",
        description: [
          "Some time after Caesar had established his World in the Outer Ring, a notorious faction known as the Exploiters began to appear, making waves on the news as a dangerous and fear-mongering faction that had no issues pillaging and usurping control of other Worlds for their own nefarious plans. Caesar thought little of it initially, until a fateful day where he too would be assaulted by a small squad of scouting Exploiters.",
          "They attacked suddenly, without warning or restraint. Caesar did his best to resist, but his efforts were futile. He had strength, but that wouldn't be enough to best people who could fly, teleport, and do all kinds of harmful things that Caesar could barely wrap his head around at the time. They beat him senselessly, tarnishing his island and destroying his home in their efforts to look for valuables.",
          "Caesar fully believed he'd die that day, as the ground cracked from being pummeled into it. But inside, on the brink of life and death, something latent awoke within Caesar. An electric static, deep within his soul—as though commanding him to stand and fight. A second wind allowed Caesar to arise, and he unleashed the Electrogravitic Flow for the first time. In his hazy and senseless state, he can only partially recall the events that transpired after that moment. Even so, Caesar is certain of at least one thing—the group of Exploiters who attacked him did not survive.",
          "After recovering from the assault and resting in his now-dilapidated cabin, Caesar reflected on what had occurred during the attack. He realized how lucky he was to have survived, and that a likely-countless amount of other victims would not. A new and burning desire lit up in Caesar's mind, and it was decided. Caesar would dedicate himself to the training of his body and powers, to become a sworn defender and vigilante for those who could not defend themselves."
        ]
      },
      {
        id: "vigilante",
        label: "Vigilante",
        description: [
          "Following the attack and Caesar's subsequent awakening, he would begin rigorous training to hone his powers and body for combat. It took effort and time to figure out how exactly the Flow functioned, but eventually Caesar had developed a basic grasp of its skillset. He took note of the strain it put on his body, and developed a technique that primarily relies on his physical strength instead of his powers alone.",
          "After gaining confidence, he finally set out into the Bloxiverse for the first time, beginning his hunt for criminals up to no good. Most opponents fell with little effort, as Caesar came to realize just how powerful he really was. Some took effort, sure, but most would fall eventually. At times, the power would get to Caesar's head, and he'd reflect and wonder if such strength is what led so many others down the dark paths they led."
        ]
      }
    ],
    appearance: [
      {
        id: "coated",
        label: "Coated",
        description: [
          "Caesar Bloxwright is an extremely tall and widely-built Robloxian, dressed in a black, white-collared trench coat with a grey bowtie clipped at his neck. He has long sleeves, which slit into fingerless gloves at their ends. He has messily-parted, jet black hair with portions poking out and sticking up. Despite having no bangs or obstructions covering his eyes beyond circular glasses, a shadow always appears to hide them from view, even if a light source is directly shined in his face."
        ]
      },
      {
        id: "casual",
        label: "Casual",
        description: [
          "Caesar Bloxwright is an extremely tall and widely-built Robloxian. Outside of combat or when spending time casually at home or with his allies and friends, he'll wear a simplistic outfit consisting of a black t-shirt and grey sweatpants. He has messily-parted, jet black hair with portions poking out and sticking up. Despite having no bangs or obstructions covering his eyes beyond circular glasses, a shadow always appears to hide them from view, even if a light source is directly shined in his face."
        ]
      }
    ],
    personality: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Caesar is a walking definition of both empathy and resolve. He is a loyal protector whose heart is as strong as his fists, carrying a deep-rooted sense of love and loyalty for those he values. He is very down-to-earth and quick-witted, usually capable of remaining calm under decent amounts of pressure. In most cases, he'll often adopt a protective role towards his family and friends, going as far as to throw his life on the line if a dire situation deems it necessary. His sense of self-preservation is weak so long as someone who matters to him is at risk."
        ]
      },
      {
        id: "power-abuse",
        label: "Power Abuse",
        description: [
          "As Caesar pushes the limits of both his body and abilities, the strain and sheer power causes him to lose his composure, as sanity slips away from his mind. In desperate situations such as these, Caesar has a tendency to enter a berserk-like state, drastically altering his behavior and personality.",
          "The previously-witty and mindful Caesar is replaced with bloodlust, blind rage and sadism. The thrill of combat usurps his mind and body, as he'll relentlessly and violently assault his opponents using reckless tactics and unrefined techniques. While Caesar retains enough of his mentality to avoid intentionally bringing harm to his loved ones or allies, his reckless behavior makes him a danger to his immediate surroundings due to the volatile and destructive nature of his abilities.",
          "In most cases, Caesar's rampage will either end after the target has been defeated, he becomes exhausted/incapacitated, or is calmed down by another Bloxian. Regardless of how it ends, Caesar often laments and reflects negatively on his behavior, finding it unbecoming and degrading."
        ]
      }
    ],
    lifestyle: [
      {
        id: "at-home",
        label: "At Home",
        description: [
          "Despite the potential to live a lavish and rich lifestyle, Caesar prefers to live humbly on an empty island belonging only to him. He'll happily spend his days wandering the island on long walks, or catering to one of his many gardens. He enjoys the quiet, lounging around in the sun or the moonlight, spending time with his friends in peace. Even if problems happen to arise in his daily living, most are trivialized by his overwhelming strength and abilities. If enemy Bloxians weren't frequently invading his World, Caesar's life truly would be one of luxury."
        ]
      },
      {
        id: "vigilante",
        label: "Vigilante",
        description: [
          "Caesar believes that his natural gifts were that of fate, and that they are to be used as a tool to make the Bloxiverse a better place. Either alone, or alongside his allies Nauli and Vortex, he'll travel the Bloxiverse in search of villainy to apprehend, operating as a self-proclaimed vigilante. Whenever he subdues a criminal, he'll typically turn them in to the Hunter Association or another holding facility. Despite being offered a position and an extremely high rate of pay by these elite factions, Caesar refuses any and all offers. He acts out of heart and desire, not because he is being paid or praised for doing so, and taking a position at any faction would taint this mindset."
        ]
      }
    ],
    relationshipsData: {
      "nauli-parter": {
        status: "Close Friend & Ally",
        history: [
          "Caesar and Nauli met a few years ago, during an unexpected encounter at a restaurant. Caesar spotted Nauli rummaging through the trash for scraps on his way inside the building, and decided to buy and bring her a proper meal.",
          "This single act of kindness touched Nauli's heart, quickly breaking through her defensive walls as nobody had truly noticed or cared for her. For the first time in a long while, she felt safe enough to open up and the two began to chat over their meals. Their interests in one another only grew as they came to realize their shared values and goals, wishing for peace in the Bloxiverse.",
          "From then on, the pair worked together in almost all aspects, with Caesar relying on Nauli's strategizing and Nauli relying on Caesar's brute strength to take down stronger opponents through their combined efforts. Nauli also began to spend time on Caesar's Isle, breathing a sigh of relief at a place to relax and call home."
        ]
      },
      "vortex-a-steele": {
        status: "Former Enemy, Close Friend & Ally",
        history: [
          "Initially, Vortex was contracted by the Hunter Association to eliminate Caesar due to a hit placed on him by Bryck Manning. Vortex successfully hunted down Caesar, and the two engaged in combat.",
          "Their fight was valiant and hard-fought, but both sides came to the realization that their powers and strengths cancel out one another, and the two mutually agreed to stop fighting. With a moment to chat and actually relax, the two expressed their ideals and morals, quickly learning that they're rather alike.",
          "Though skeptical and uncertain, both placed trust in one another and agreed to peace and cooperation. Vortex cancelled his contract, though this was not the end of his interactions with Caesar—quite the opposite. Caesar met Vortex on occasion from then on out, teaming up to handle tougher contracts that demanded more firepower than what he and his friend Nauli could provide alone.",
          "The three have worked multiple times as an efficient and balanced trio, backed equally by strength, smarts, and speed."
        ]
      },
      "rice-farmer": {
        status: "Close Friend",
        history: [
          "Rice was among one of the many victims Caesar had saved from being terrorized, particularly during an attack from Bryck on the Farmer Sanctuary, a peaceful World where a family of farmers grow tons of food for themselves and Bloxians in need.",
          "Caesar and Rice continued to chat long after Caesar had already saved him, and the two have spent many days together since. Caesar was introduced to the ways of agriculture through Rice, which later led to Caesar's inspiration for starting his many gardens.",
          "Rice has been a great source of comfort and calm for Caesar, as Rice is very down-to-earth and easy to be around."
        ]
      },
      "bryck-manning": {
        status: "Defeated Enemy",
        history: [
          "Caesar and Nauli ventured out to the Farmer Sanctuary after seeing its ongoing attack on the news, at the hands of Bryck Manning.",
          "The two arrived, and with some effort successfully subdued Bryck and removed his source of power, the Gravity Coil. Afterwards, the Gravity Coil was handed off to Ren Bytera for examination while Bryck was sent to the Hunter Association for processing and eventual imprisonment.",
          "Bryck has held a grudge and strong vengeance for Caesar, unbeknownst to him."
        ]
      }
    },
    combat: [
      "Caesar's overwhelming size and bulwark build grant him incredible physical strength and durability, qualities which are only enhanced further by his ability. Caesar relies on slow, yet sturdy and incredibly lethal blows to quickly dispatch enemies that get caught in his path. Caesar is a juggernaut, backed by power that is not to be taken lightly.",
      "Though Caesar has incredible physical potential, he lacks immensely in speed and reflexes. Opponents with proper agility and dexterity will have almost no issues avoiding Caesar and his slow-moving attacks, unless he is able to accurately predict or trick a target into attacking to counter them. The physical 'weight' added by his ability only draws back the speed of his movement further, as he exchanges mobility for lethality."
    ],
    abilityData: {
      overview: {
        text: [
          "Caesar's body acts as a perfect host and conduit for an anomalous source of power, formally known as the Electrogravitic Flow or 'The Flow' for short. The Flow manifests as a sharp, contorting plasma that ripples in blue across his entire body.",
          "Through the Flow, Caesar can generate and discharge electrified plasma towards targets or his surroundings, allowing him to heavily damage targets or manipulate any local magnetic and gravitational forces his energy surrounds. This ability has a wide variety of applications in almost all aspects, making Caesar a versatile fighter who can tolerate combat in almost any environments while remaining both formidable and dangerous.",
          "Despite the strengths the Flow offers, Caesar has yet to properly master the Flow or unlock any of its real potential, limiting his capabilities."
        ]
      },
      passives: {
        techniques: [
          {
            id: "generative-gravity",
            title: "Generative Gravity",
            description: [
              "The Flow can manipulate the flow of magnetism and gravity on areas or objects it comes into contact with, and this extends to Caesar's own body. This prevents him from being affected by gravitational anomalies, such as Black Holes or other abilities that affect the forces of gravity."
            ]
          },
          {
            id: "living-leaking-battery",
            title: "Living, Leaking Battery",
            description: [
              "Caesar's body acts essentially as both a generator and battery for the Flow, as it gets passively replenished as Caesar rests or eats food. Occasionally, the build-up of power within Caesar's body becomes overwhelming, causing him to forcibly eject extra energy if he doesn't frequently make use of his ability.",
              "While this is manageable if Caesar consistently fights or remembers to discharge his extra energy, forgetting often means extensive property damage and injuries to anyone in his immediate surroundings."
            ]
          },
          {
            id: "overdrive",
            title: "Overdrive",
            description: [
              "When Caesar is in a life-threatening situation or his adrenaline is pumping, the Flow goes into overdrive and begins mass-producing additional energy. This allows Caesar to push his limits and keep fighting even while exhausted.",
              "However, abusing these limits can cause Caesar to grow ill and become susceptible to going berserk from the Flow's influence until he eventually collapses from exhaustion."
            ]
          }
        ]
      },
      offensive: {
        techniques: [
          {
            id: "discharge",
            title: "Discharge",
            description: [
              "Charging the Flow into his hands, Caesar can discharge energy into his surroundings or towards targets, shocking them and making them susceptible to Caesar's gravity manipulation. This enables him to use a form of telekinesis, freely throwing his opponents or slowing them down greatly if they lack the physical strength to overpower the effects.",
              "Heavier targets require Caesar to discharge larger quantities of energy, making them harder to manipulate and using more of Caesar's stamina and Flow reserves."
            ]
          },
          {
            id: "electropulse",
            title: "Electropulse",
            description: [
              "Caesar can channel the Flow across his entire body, and discharge a wave of energy into his surroundings, shocking them and allowing him to gain control over the flow of gravity and magnetism in his immediate surroundings temporarily.",
              "Gaining control over gravity through this method is far less refined than discharging onto specific targets, though it is highly effective if Caesar is facing multiple opponents."
            ]
          },
          {
            id: "self-amplification",
            title: "Self-Amplification",
            description: [
              "Caesar can freely manipulate his own weight due to his generative gravity, allowing him to amplify the weight of his limbs or entire body. By channeling the Flow with specific timings in tandem with his own movements, Caesar can seriously increase the power behind his physical attacks. With enough momentum, Caesar can successfully breach thick walls, and rip armored doors from their hinges.",
              "Caesar needs to remain mindful of how much he amplifies his body, as his body may not be able to adjust properly if he increases his weight too much, causing him to collapse under the pressure."
            ]
          }
        ]
      },
      defensive: {
        techniques: [
          {
            id: "hard-light-armor",
            title: "Hard-Light Armor",
            description: [
              "Caesar can generate and compress his energy into solid, \"hard-light\" armor that affixes to his body and protects him from both blunt-force trauma and electricity. Depending on how much energy was poured into the barrier, hard-light armor can protect Caesar anywhere from weaker firearms, all the way to small explosions before cracking or shattering from the damage.",
              "Maintaining hard-light armor is incredibly draining of Caesar's energy and can quickly exhaust him if his defenses are shattered multiple times in a row in quick succession. Additionally, hard-light armor can be incredibly heavy, reducing Caesar's speed even further."
            ]
          },
          {
            id: "hard-light-barriers",
            title: "Hard-Light Barriers",
            description: [
              "Similarly to how Caesar can generate hard-light armor, he can also generate constructs formed of this energy to project protective barriers or shielding to defend allies from an attack. This shielding has the same properties as Caesar's hard-light armor, defending targets from damage up to small explosives and electricity.",
              "Caesar cannot generate hard-light armor if he is currently projecting his energy into shielding for another target, as his focus must remain on the shield due to it not being connected to his body, unlike hard-light armor."
            ]
          }
        ]
      },
      utilitarian: {
        techniques: [
          {
            id: "pseudo-telekinesis",
            title: "Pseudo-Telekinesis",
            description: [
              "When objects or areas are imbued with Caesar's energy, he can freely channel the gravity and magnetism of them, allowing him to toss targets around or weigh them down drastically. It can also be utilized for simple tasks in his daily life, fetching items from far away or allowing him to hold things without needing to use his hand.",
              "Naturally, the more objects he manipulates, the higher the energy requirement becomes. While it's relatively easy to hold a large quantity of small objects, particularly heavy objects can quickly push his limits if held for long periods of time."
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
              "A majority of the Flow's abilities require serious amounts of Caesar's stamina to remain effective, and overuse can quickly put him out of commission if he isn't careful."
            ]
          },
          {
            id: "weighed-down",
            title: "Weighed Down",
            description: [
              "The Flow carries an extremely heavy weight that Caesar must endure to effectively use the Flow, and it only worsens as Caesar attempts larger-scaled attacks or attacks of a higher potency. Techniques such as the hard-light armor are especially taxing on Caesar's body, often slowing his speeds to a crawl, and rarely immobilizing him entirely."
            ]
          },
          {
            id: "mental-corruption",
            title: "Mental Corruption",
            description: [
              "If Caesar becomes too lost in combat or pushes his ability far beyond safe limits, he can become susceptible to mental corruption, leading to Caesar going berserk. In this state, Caesar becomes incredibly dangerous to remain around, regardless of if you are a friend or foe.",
              "Though Caesar's mentality remains intact-enough to differentiate between an ally and an enemy, his attacks and the Flow's effects are greatly amplified and pose a serious risk for any Bloxians in his immediate surroundings, including Caesar himself.",
              "This rampage tends to last until Caesar is calmed down, incapacitated, or becomes exhausted. Afterwards, Caesar becomes greatly limited in terms of strength, and the Flow often goes completely offline to recover from Caesar's abuse."
            ]
          }
        ]
      }
    },
    trivia: [
      "Caesar is ambidextrous—he can comfortably use both hands for just about any task.",
      "Caesar's favorite drink is Bloxy Cola, with creamy milk being a close second.",
      "Caesar has an irrational fear of spiders, and bugs in general.",
      "Caesar was the first character made for The Lore, and has gone through several redesigns and total reworks. His creation date goes as far back as 2020!"
    ]
  },
  
  abilityName: "The Electrogravitic Flow",
  stats: createCharacterStats("C", "B", "C", "S")
};
