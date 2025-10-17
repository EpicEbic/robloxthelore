
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const vortexASteele: WikiEntry = {
  id: "vortex-a-steele",
  title: "Vortex A. Steele",
  description: "Sharp, quick-witted, and stubborn, Vortex is a high-ranking Bounty Hunter for the Hunter Association who carries a small temper but has a good heart.",
  preview: "A sharp, quick-witted and stubborn bounty hunter with unyielding dedication to his job.",
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
      caption: "Vortex in his signature black and yellow gear, ready for action."
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Vortex mostly relies on his remarkable agility and precision in combat, focusing his blows and targeting weak or unstable points on his opponents. He is masterful at reading the body language and movement of targets, allowing him to accurately predict and outmaneuver his enemies.",
        "His ability (Chronipulation) only furthers his potential, turning Vortex into a blitzing powerhouse who can take quite a hit, if you're even able to strike him to begin with."
      ],
      combatStats: createCombatStats("D", "D", "B", "B", "B"),
      images: [
        {
          url: "/lovable-uploads/f387ffd7-944e-4544-9123-4a4656cfc89c.png",
          caption: "Vortex's agility and speed allows him to easily outpace slower targets like Caesar, giving him an edge."
        }
      ]
    },
    {
      id: "magnetivolver",
      label: "Magnetivolver",
      description: [
        "Vortex is armed with a high-caliber magnetic railgun, compacted down to the size and shape of a large handheld revolver. It is capable of charging and firing lethal, high-velocity rounds which can pierce multiple materials or targets at once. These rounds remain magnetically linked to the Magnetivolver as long as they remain in motion, allowing Vortex to redirect his bullets and slightly alter their trajectory even after they've been fired.",
        "The Magnetivolver was specifically designed to work in tandem with Vortex's Chronipulation, allowing Vortex to charge it with his chrono-energy. By doing so, he can decrease the charge time inbetween shots, as well as fire rounds at even higher speeds than the norm, essentially turning the Magnetivolver into a handheld railcannon."
      ],
      combatStats: createCombatStats("D", "D", "B", "A", "B"),
      images: [
        {
          url: "/lovable-uploads/9289b6a9-41e2-4023-9996-72493748bd7e.png",
          caption: "Vortex, taking aim with his Magnetivolver."
        },
        {
          url: "/lovable-uploads/bd5cf524-061d-4cab-8e20-4b7010aac45a.png",
          caption: "A close-up of Vortex's Magnetivolver."
        },
        {
          url: "/lovable-uploads/c8949ba7-0df2-4911-bf84-9f38cdf51816.png",
          caption: "Vortex, overclocking his Magnetivolver through Chronipulation."
        },
        {
          url: "/lovable-uploads/ecc55a94-b059-4587-8989-39cac284c31a.png",
          caption: "A close-up of Vortex's Magnetivolver, when charged with his chrono-energy."
        }
      ]
    },
    {
      id: "amplification-gauntlet",
      label: "Amplification Gauntlet",
      description: [
        "The Amplification Gauntlet (hereby referred to as the Amp Gauntlet) is a mountable gauntlet that Vortex can wear on his right arm. While powered, it grants Vortex a significant boost in raw strength for his arm, allowing him to effortlessly destroy concrete, rebar, etc. Vortex rarely uses the Amp Gauntlet despite the power it provides, simply because it tends to clash with his fast-foot fighting style and precise technique.",
        "The Amp Gauntlet was specifically designed to work in tandem with Vortex's Chronipulation, allowing Vortex to attune the gauntlet to his chrono-energy. While the Amp Gauntlet is attuned to his ability, Vortex can drastically increase his movement speed, despite the heavier weight that comes with wearing it. Unlike the Magnetivolver, it takes significantly more energy for Vortex to keep the Amp Gauntlet attuned. As such, Vortex only attunes the Amp Gauntlet scarcely."
      ],
      combatStats: createCombatStats("B", "D", "D", "C", "B"),
      images: [
        {
          url: "/lovable-uploads/a5823d3b-ab54-46b3-8840-30841d9a26a1.png",
          caption: "Vortex, having donned the Amplification Gauntlet. The heavy weight of the gauntlet has him tilting over a bit."
        },
        {
          url: "/lovable-uploads/4dabb92d-56c7-4bcd-8c0c-a4d961d400b7.png",
          caption: "A close up of the Amplification Gauntlet."
        },
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
          "Vortex mostly relies on his remarkable agility and precision in combat, focusing his blows and targeting weak or unstable points on his opponents. He is masterful at reading the body language and movement of targets, allowing him to accurately predict and outmaneuver his enemies.",
          "His ability (Chronipulation) only furthers his potential, turning Vortex into a blitzing powerhouse who can take quite a hit, if you're even able to strike him to begin with."
        ],
        combatStats: createCombatStats("D", "D", "B", "B", "B"),
        images: [
          {
            url: "/lovable-uploads/f387ffd7-944e-4544-9123-4a4656cfc89c.png",
            caption: "Vortex's agility and speed allows him to easily outpace slower targets like Caesar, giving him an edge."
          }
        ]
      },
      {
        id: "magnetivolver",
        label: "Magnetivolver",
        description: [
          "Vortex is armed with a high-caliber magnetic railgun, compacted down to the size and shape of a large handheld revolver. It is capable of charging and firing lethal, high-velocity rounds which can pierce multiple materials or targets at once. These rounds remain magnetically linked to the Magnetivolver as long as they remain in motion, allowing Vortex to redirect his bullets and slightly alter their trajectory even after they've been fired.",
          "The Magnetivolver was specifically designed to work in tandem with Vortex's Chronipulation, allowing Vortex to charge it with his chrono-energy. By doing so, he can decrease the charge time inbetween shots, as well as fire rounds at even higher speeds than the norm, essentially turning the Magnetivolver into a handheld railcannon."
        ],
        combatStats: createCombatStats("D", "D", "B", "A", "B"),
        images: [
          {
            url: "/lovable-uploads/9289b6a9-41e2-4023-9996-72493748bd7e.png",
            caption: "Vortex, taking aim with his Magnetivolver."
          },
          {
            url: "/lovable-uploads/bd5cf524-061d-4cab-8e20-4b7010aac45a.png",
            caption: "A close-up of Vortex's Magnetivolver."
          },
          {
            url: "/lovable-uploads/c8949ba7-0df2-4911-bf84-9f38cdf51816.png",
            caption: "Vortex, overclocking his Magnetivolver through Chronipulation."
          },
          {
            url: "/lovable-uploads/ecc55a94-b059-4587-8989-39cac284c31a.png",
            caption: "A close-up of Vortex's Magnetivolver, when charged with his chrono-energy."
          }
        ]
      },
      {
        id: "amplification-gauntlet",
        label: "Amplification Gauntlet",
        description: [
          "The Amplification Gauntlet (hereby referred to as the Amp Gauntlet) is a mountable gauntlet that Vortex can wear on his right arm. While powered, it grants Vortex a significant boost in raw strength for his arm, allowing him to effortlessly destroy concrete, rebar, etc. Vortex rarely uses the Amp Gauntlet despite the power it provides, simply because it tends to clash with his fast-foot fighting style and precise technique.",
          "The Amp Gauntlet was specifically designed to work in tandem with Vortex's Chronipulation, allowing Vortex to attune the gauntlet to his chrono-energy. While the Amp Gauntlet is attuned to his ability, Vortex can drastically increase his movement speed, despite the heavier weight that comes with wearing it. Unlike the Magnetivolver, it takes significantly more energy for Vortex to keep the Amp Gauntlet attuned. As such, Vortex only attunes the Amp Gauntlet scarcely."
        ],
        combatStats: createCombatStats("B", "D", "D", "C", "B"),
        images: [
          {
            url: "/lovable-uploads/a5823d3b-ab54-46b3-8840-30841d9a26a1.png",
            caption: "Vortex, having donned the Amplification Gauntlet. The heavy weight of the gauntlet has him tilting over a bit."
          },
          {
            url: "/lovable-uploads/4dabb92d-56c7-4bcd-8c0c-a4d961d400b7.png",
            caption: "A close up of the Amplification Gauntlet."
          },
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
        description: "Vortex A. Steele is an average-built Noob. He has brown, spiked hair which is often flattened down into place by a black pleather cap. He wears dark, obscuring clothing including black jeans and a black t-shirt, as well as a scarf and square-frame sunglasses. His body is adorned by various straps and belts allowing him to reposition his gear as he sees fit.",
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
          "Vortex A. Steele is an average-built Noob. He has brown, spiked hair which is often flattened down into place by a black pleather cap. He wears dark, obscuring clothing including black jeans and a black t-shirt, as well as a scarf and square-frame sunglasses. His body is adorned by various straps and belts allowing him to reposition his gear as he sees fit.",
          "When leaving for missions or otherwise participating in contracted work, Vortex is often strapped with his Magnetivolver, a powerful firearm which he likes to keep on his person at all times. Additionally, when undertaking lethal-level operations, he'll often don the Amplification Gauntlet, which he exclusively wears on his right arm."
        ],
        images: [
          {
            url: "/lovable-uploads/670fa9e8-fb9d-4af9-a2f3-ff8f99c37005.png",
            caption: "Vortex, having brandished his Magnetivolver."
          },
          {
            url: "/lovable-uploads/df19aa82-aab3-4e5c-bbc4-2b986916208d.png",
            caption: "Vortex, striking a pose with his Amplification Gauntlet."
          }
        ]
      }
    ],
    personality: [
      "Vortex is cold, callous, and calculated. He values very little in life beyond his own well-being and the safety of his friends and allies. At heart, he is a man of law and order, a trait that is commonplace among operatives working for the Hunter Association. He is an overachiever with a stubborn nature, preferring to beat to his own drum even in critical moments where teamwork can prove necessary.",
      "Vortex's hardheaded attitude and methods often make him a difficult ally to work with, as he often won't agree to plans unless he was the one to make them. This rush-rush attitude often gets the better of him, causing disruption within any team or alliance he may be working with. Vortex also has quite a temper and is incredibly easy to bait into aggression, as he is quick to anger."
    ],
    lifestyle: [
      "Vortex is a hot-blooded and efficient worker, who has dedicated most of his life to his line of work. He has established a high-ranking position as an operative within a reputable bounty-claiming faction known as the Hunter Association, who provide Vortex with necessities such as housing and food, in exchange for his unyielding service and loyalty to both the Hunter Association and the duties that come with the job.",
      "Most of his time awake is spent on contracts—hits that have been issued by either the H.A itself, or through clients who have paid a hefty sum to have their enemies marked for death. Vortex is indifferent to both his clients and those who have been marked, suppressing the guilt that may come from operating as a hitman, especially where those both good and evil are treated the same.",
      "Due to Vortex's high-ranking position within the Hunter Association, he is accommodated greatly for his work. Granted a penthouse apartment within the headquarters of the Hunter Association, Vortex is free to live a life of luxury, so long as his efforts for the Hunter Association remain unwavering. Despite the luxury however, Vortex cares little for it, finding satisfaction only in his work and through the few friends he has.",
      "Vortex is good allies and friends with Caesar and Nauli, two individuals who share an idealistic future where evil is wiped from the Bloxiverse. While they aren't operatives for the Hunter Association, he'll occasionally partner up with either or both of them to take down stronger threats and tackle harder operations."
    ],
    history: [
      "Prior to his acquisition by the Hunter Association, Vortex (who at the time was named Volkan) was no different than the common Noob. Like most Noobs, he would tread from one World to the next, in search of a place of his own to call home. But the Bloxiverse is as cruel as it is unyielding, and Volkan quickly found that there was no place for the weak. Constant assaults from a variety of different individuals and groups meant Volkan was always on the run, put under unending stress as he'd hop from World to World in an effort to find peace.",
      "At his lowest, he was found and brought in by an elderly ambassador for the Hunter Association and was nurtured back to good mental and physical health, before being proposed a position within their ranks. Naturally, Volkan accepted and began mentorship under their faction. He was quick to prove his worth, recognized for his tenacity and resourcefulness in pressing situations—traits he had developed after spending life on-the-run as long as he had.",
      "Volkan slowly grew from his position as a rookie, initially serving as a backup assistant for higher-ranking operatives. Eventually, he was issued low-grade contracts to undertake on his own, and his experience only grew exponentially from there. At some point during this period of growth, Volkan awakened his latent ability to manipulate time—a power that would only prove to soar his climb to becoming an Elite within the association.",
      "Finally having reached the status of an Elite, Volkan surrendered his individuality and identity to the Hunter Association, becoming Vortex and settling as one of the H.A's top operatives—a position which has remained widely uncontested to this day."
    ],
    relationships: [
      "Caesar Bloxwright - Close Friend | Vortex was originally assigned a contract to eliminate Caesar, issued by a petty Bryck Manning after Caesar had apprehended him during Bryck's attack on the Farmer Sanctuary. The conflict between Vortex and Caesar stretched on for quite some time, but Vortex was eventually forced to drop the contract after he began to realize that he wasn't capable of defeating him. Eventually, the two began to talk and came to understand each other, realizing they share the same goal of bringing about peace to the Bloxiverse. The two grew from there, eventually becoming close allies.",
      "Nauli Parter - Close Friend | Vortex naturally came into contact with Nauli after he had given up on Caesar's contract, as Nauli is close friends with Caesar. While Nauli was incredibly skeptical of Vortex's intentions—skepticism which was well-justified—Vortex eventually proved his authenticity and their relationship prospered from there.",
      "Ren Bytera - Acquaintance | Through Vortex's connection to Nauli, he was able to reach out and receive assistance from Ren, who would go on to produce Vortex's signature Magnetivolver and Amplification Gauntlet. The two aren't very close and don't talk often, but Vortex admires her craft and intelligence.",
      "The Hunter Association - Employer | Vortex is irrefutably tied to the Hunter Association, as it serves as an essential lifeline for Vortex. Without his loyalty and commission to the H.A, he'd quickly lose his home and his status."
    ],
    combat: [
      "Combat Style information is now detailed in the Combat Styles section above."
    ],
    abilityDetails: [
      "Vortex was born with an innate ability allowing him to sense and warp the flow of time within his local area. He can freely accelerate and decelerate himself at will, create loops, and—under certain circumstances—halt the flow of time entirely for short durations."
    ],
    offensiveCapabilities: [
      "By rapidly accelerating the flow of time on his body, Vortex can generously amplify his speed and reach breakneck velocities with ease. Vortex can rapidly bombard targets with blitzing barrages, and elegantly dodge and weave around the tightest of attacks. These insane speeds can be upheld without fail, so long as Vortex remains in a healthy condition and has the required energy to do so.",
      "If Vortex accelerates fast enough and achieves a critical velocity, he can essentially halt the flow of time. While time isn't actually frozen at any point during this period, any actions he makes are so imperceptibly fast, that they happen instantaneously to an outsider's perspective.",
      "Vortex can also choose to target opponents with his Chronipulation, in an effort to slow their momentum or immobilize them entirely. Weak targets take little effort to halt, while physically-stronger targets and certain abilities can resist the effects of Chronipulation, or entirely nullify it."
    ],
    defensiveCapabilities: [
      "While Chronipulation doesn't offer a direct boost to Vortex's defense, his reflexes are greatly increased when he's accelerating his own body. When Vortex amplifies his speed, outsiders interpret this as Vortex speeding up. But from Vortex's perspective, his speed never changes—rather, the world appears to slow down around him.",
      "This slowing effect is what grants Vortex his incredible reflexes, making him an incredibly difficult target to hit without careful planning and predicting."
    ],
    utilitarianCapabilities: [
      "Chronipulation has many practical uses and benefits, allowing it to serve as an effective tool in battle.",
      "Vortex is capable of dropping 'Time Anchors' that last for 10 seconds, enabling him to travel back in time to when it was originally placed. On top of bringing Vortex to the position and time when the anchor was placed, his body is also restored to whatever condition it was in, including his brain. Normally, this means that Vortex wouldn't retain the memory of his time anchor—but fortunately his memories are transferred to his older self when the anchor activates.",
      "Vortex can opt to place 'Time Nets' on structures, that turn invisible until disturbed. These traps contain high quantities of chrono-energy that release in a singular burst, briefly halting the flow of time for anyone or anything who happened to trigger the trap."
    ],
    drawbacks: [
      "While Chronipulation is incredibly powerful and versatile, these benefits are not given for free. Chronipulation consumes Vortex's stamina at a rapid rate, the cost only increasing as Vortex uses his ability at higher intensities. If vortex isn't careful to manage his stamina and energy, overuse can quickly exhaust him, or even cause him to pass out until he can recover from his fatigue."
    ],
    trivia: [
      "Vortex's favorite drink is the Witches Brew.",
      "Ironically, despite being yellow himself, Vortex hates the color yellow.",
      "Vortex is an entry made after (and inspired by) my friend and their Roblox avatar."
    ]
  },
  
  abilityName: "Chronipulation",
  stats: createCharacterStats("A", "B", "S", "S")
};
