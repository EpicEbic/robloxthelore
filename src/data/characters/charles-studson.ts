
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const charlesStudson: WikiEntry = {
  id: "charles-studson",
  title: "Charles Studson",
  description: "A sharp, short-fused elite operative for the Hunter Association, ranking as the third best bounty hunter. Known for his aggressive personality and his power of Chainipulation.",
  preview: "An elite-level Hunter Association operative, with a short temper and a rough rivalry against Vortex.",
  content: "",
  category: "character",
  subcategory: "minor-antagonist",
  imageUrl: "/lovable-uploads/6c376c29-2559-4b37-b51e-f6f6a8df3647.png",
  lastUpdated: "2025-01-26",
  part: "TEMP",
  quote: {
    text: "Can we just hurry this up? I've got more contracts to finish today.",
    context: "Charles acting dismissive of a target, before swiftly eliminating them."
  },
  species: "Robloxian",
  age: "22",
  height: "5.5 studs",
  status: "Alive",
  alignment: "Lawful/Neutral",
  role: "Judge",
  archetype: "judge",
  carouselImages: [
    {
      url: "/lovable-uploads/6c376c29-2559-4b37-b51e-f6f6a8df3647.png",
      caption: "Charles Studson in his hunting uniform, complete with black leather overcoat and protective gear."
    },
    {
      url: "/lovable-uploads/829998ec-bb04-4a8e-9b87-56084cf3e432.png",
      caption: "Charles in his casual attire, wearing a white t-shirt and black cargo jeans with his signature chained glasses."
    }
  ],
  abilityCarouselImages: [],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Charles is nimble, able-bodied, and rather flexible. Though he lacks muscle, it is no more than an inconvenience to him as he relies on proper technique rather than mindless strength. Through coordinated strikes and blitzing barrages, Charles can quickly grow to become a problem for those who are slow or unprepared for an encounter.",
        "Charles may not be particularly durable, but his ability makes up for this, protecting Charles in plated armor formed of metallic chains. These chains also help with Charles' mobility, as well as enhancing his range."
      ],
      combatStats: createCombatStats("D", "D", "B", "B", "C")
    }
  ],
  sections: {
    overview: [
      "Charles Studson is a character in The Lore whose role and significance contribute to the overall narrative and world-building. His presence adds to the diverse cast of characters that populate the Bloxiverse.",
      "Charles Studson's character helps expand the lore and provides additional context for the various individuals and groups that exist within the series' universe."
    ],
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        description: [
          "Charles is nimble, able-bodied, and rather flexible. Though he lacks muscle, it is no more than an inconvenience to him as he relies on proper technique rather than mindless strength. Through coordinated strikes and blitzing barrages, Charles can quickly grow to become a problem for those who are slow or unprepared for an encounter.",
          "Charles may not be particularly durable, but his ability makes up for this, protecting Charles in plated armor formed of metallic chains. These chains also help with Charles' mobility, as well as enhancing his range."
        ],
        combatStats: createCombatStats("D", "D", "B", "B", "C"),
        combatStyleData: {
          overview: {
            text: [
              "Charles is nimble, able-bodied, and rather flexible. Though he lacks muscle, it is no more than an inconvenience to him as he relies on proper technique rather than mindless strength. Through coordinated strikes and blitzing barrages, Charles can quickly grow to become a problem for those who are slow or unprepared for an encounter.",
              "Charles may not be particularly durable, but his ability makes up for this, protecting Charles in plated armor formed of metallic chains. These chains also help with Charles' mobility, as well as enhancing his range."
            ]
          }
        }
      }
    ],
    appearance: [
      {
        id: "hunting-uniform",
        label: "Hunting Uniform",
        description: [
          "Charles is a Robloxian of average height with medium-length, messier silver hair which parts downward in different directions. In his hunting uniform, Charles has a black, leather overcoat with metal plating underneath to protect his body. His chest and arms are protected by a thick chainmail material, with his lower jaw protected by a carbon-fiber mask."
        ],
        images: [
          {
            url: "/lovable-uploads/6c376c29-2559-4b37-b51e-f6f6a8df3647.png",
            caption: "Charles, donning his combat armor. Chains have already begun to seep from his body instinctively."
          }
        ]
      },
      {
        id: "casual",
        label: "Casual Attire",
        description: [
          "When outside of his work uniform, Charles wears much simpler clothing — a loosely-fitting white t-shirt with black cargo jeans, still keeping his chained glasses and PDA clipped to his pants. His silver hair maintains its messy, downward-parting style regardless of his outfit."
        ],
        images: [
          {
            url: "/lovable-uploads/829998ec-bb04-4a8e-9b87-56084cf3e432.png",
            caption: "Charles, scrolling through his phone on social media."
          },
          {
            url: "/lovable-uploads/c2105695-5c05-4c5b-9341-7204b20cdbed.png",
            caption: "Whoops, butterfingers! Charles dropped his phone, but thankfully he had his chains to catch it."
          }
        ]
      }
    ],
    personality: [
      {
        id: "aggressive",
        label: "Aggressive Exterior",
        description: [
          "Charles is a sharp, short-fused individual who can be quick to anger when provoked or when things just aren't going his way. He has a distaste for the incompetent or slow, quickly losing what little patience he has. He's loud, egotistical, and a bit self-centered. He's incredibly arrogant, a trait which can quickly get the better of him. Charles almost always operates independently, believing himself to be dragged down by others on his team."
        ]
      },
      {
        id: "vulnerable",
        label: "Vulnerable Interior",
        description: [
          "Despite such an aggressive display of personality, Charles is not without his reasons for behaving this way. Charles suffers from a small handful of mental conditions, mostly depressive episodes caused by feeling as though he isn't ever good enough. Charles is also incredibly lonely and only hurts himself when he pushes any potentially meaningful connections away, all in favor of keeping a good public image to strangers.",
          "To him, getting close to anybody would just put him—and them—at risk; they'd be a liability more than a valued companion."
        ]
      }
    ],
    lifestyle: [
      {
        id: "hunter-association",
        label: "Hunter Association",
        description: [
          "Charles is an elite operative for the Hunter Association, ranking the third best bounty hunter of the Hunters. He has proven himself and his worth countless times, through a variety of contracts and covert missions given to him by the H.A. To accommodate him and his prestigious ranking, the H.A has provided Charles with a master's suite, located directly within the H.A's headquarters. He has the life that some Bloxians could only dream of, provided with all of the food, resources, and entertainment a Bloxian could ever need, and more.",
          "Charles gets through his day by relying on the praise and rushes of dopamine he gets through his completed contracts and rank-climbing, effectively living to serve the H.A and establish a name for himself. Each day brings new trials and tribulations for Charles, and he finds the thrills of hunting to be exhilarating, helping to numb his depression as well. Besides, it's hard to think about how upset you're feeling in the middle of an intense fight, or when you're out lurking for your next bounty to claim."
        ]
      },
      {
        id: "isolation",
        label: "Isolation",
        description: [
          "Although Charles lives directly within the H.A's headquarters — a place full of other hunters and social gatherings, mind you — he has never been much for socializing. Most of the other residents fear him as some hardened hitman, while others envy his position and go out of their way to spitefully ignore him. Even so, Charles doesn't see the point in making friends, as most hunters won't last long and are quick to perish in such a gruesome line of work. He knows that it would only hurt him more if he opened up and got attached.",
          "When Charles isn't on a contract, he often wastes away in his suite. He has no hobbies, no extracurricular activities, or anything of the sort. He prefers to doom-scroll on his phone, or spend his time playing video games. Charles can find himself lost on his phone for hours, sometimes — especially so if no new contracts come to pull him out."
        ]
      }
    ],
    relationshipsData: {
      "vortex-a-steele": {
        status: "Rival / Superior",
        history: [
          "Charles's main opposition within the Hunter Association. They endlessly compete for 2nd place in the rankings, yet Vortex consistently stays one step ahead. Despite the rivalry infuriating him, Charles uses this rage against Vortex as motivation to improve.",
          "The one major connection Charles has formed is with Vortex, his rival and superior within the Hunter Association ranking. They have been neck-and-neck for 2nd place, though Vortex always appears to be one step ahead. Although infuriating, Charles has used Vortex as motivation to better himself and constantly improve, as their fights only grow more intense as they grow more powerful.",
          "Though he'd never admit it, Charles secretly admires Vortex, too."
        ]
      }
    },
    abilityData: {
      overview: {
        text: [
          "Charles has the power of Chainipulation, the ability to summon and manipulate chains from his body and a local area around himself. These chains have incredible tenacity and precision, making them versatile tools for Charles to take advantage of when in combat. They function as grappling hooks, whips, armor, extra limbs, restraints, and much more. The chains aren't made from nothing, of course — Charles uses the iron in his blood to create the chains, meaning he can quickly exhaust himself if he overworks his chain generation."
        ]
      },
      passives: {
        techniques: [
          {
            id: "chain-armor",
            title: "Chain Armor",
            description: [
              "Charles may not be particularly durable, but his ability makes up for this, protecting Charles in plated armor formed of metallic chains. These chains also help with Charles' mobility, as well as enhancing his range."
            ]
          }
        ]
      },
      offensive: {
        techniques: [
          {
            id: "chain-whip",
            title: "Chain Whip",
            description: [
              "Charles can extend chains from his body to lash out at enemies, using them as whips to strike from a distance. The chains have incredible tenacity and precision."
            ]
          }
        ]
      },
      utilitarian: {
        techniques: [
          {
            id: "grappling",
            title: "Grappling",
            description: [
              "The chains function as grappling hooks, allowing Charles to traverse terrain quickly and catch fleeing targets."
            ]
          },
          {
            id: "restraints",
            title: "Restraints",
            description: [
              "Charles can use his chains to restrain and bind targets, making them effective for capturing bounties alive."
            ]
          }
        ]
      },
      drawbacks: {
        techniques: [
          {
            id: "blood-cost",
            title: "Blood Cost",
            description: [
              "The chains aren't made from nothing — Charles uses the iron in his blood to create the chains, meaning he can quickly exhaust himself if he overworks his chain generation."
            ]
          }
        ]
      }
    },
    trivia: [
      "Charles is addicted to two things: Caffeine, and his phone.",
      "During Charles' earlier iterations and development, his power was originally void-like tendrils in place of the chains. I found it a bit too generic and edgy, so I decided to change things up a smidge."
    ]
  },
  
  abilityName: "Chainipulation",
  relatedEntries: ["vortex-a-steele"],
  stats: createCharacterStats("D", "C", "C", "B")
};
