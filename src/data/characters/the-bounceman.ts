import { WikiEntry } from "@/types/wiki-types";
import { createCombatStats } from "@/components/character/character-stat-chart";

export const theBounceman: WikiEntry = {
  id: "the-bounceman",
  title: "The Bounceman",
  description: "A crazed rubber ball who forces unwilling participants into an impossible training regimen, often leading to their death.",
  preview: "A crazed rubber ball known for forcing victims into an impossible training regimen until they pass out—or even die—from exhaustion.",
  content: "The Bounceman is a short, rotund Robloxian with no arms or legs, transformed from a simple office worker named Boris Dohm into a hyper-buoyant rubber sphere through horrific experiments conducted by Rovan Macov. He now roams the Bloxiverse, forcing unwilling participants into an impossible training regimen that only he can complete.",
  category: "character",
  subcategory: "minor-antagonist",
  imageUrl: "/images/bounceman.png", // Placeholder - will be updated when images are added
  lastUpdated: "2025-01-27",
  
  quote: {
    text: "Why sit down when you could keep on moving?",
    context: "The Bounceman's philosophy on life, often stated to his victims before forcing them into his training regimen."
  },
  species: "Robloxian (Modified)",
  age: "Unknown",
  alignment: "Chaotic Evil",
  
  combatStyles: [
    {
      id: "atomic-trampoline",
      label: "Atomic Trampoline",
      combatStats: createCombatStats("B", "A", "S", "D", "F", {
        power: "D",
        penetration: "C",
        intensity: "A",
        toughness: "A",
        vitality: "A",
        resistance: "B",
        swiftness: "S",
        endurance: "A",
        flexibility: "E",
        accuracy: "C",
        dexterity: "F",
        reactivity: "E",
        tactility: "E",
        wisdom: "F",
        stability: "F"
      }),
      description: [
        "The Bounceman relies on an internal device known as the Atomic Trampoline to remain incredibly bouncy and mobile while in combat. He'll slam into his targets at incredibly lethal velocities, beating his victims into submission and their eventual death.",
        "He is mostly immune to physical weaponry, mainly due to his unique body structure. Most of his body is protected by a thick rubbery material, while his bones have been cast into a metal skeleton. While puncturing him with sharp weapons is possible, the ultra-dense rubber seals most wounds immediately."
      ]
    }
  ],
  
  carouselImages: [
    {
      url: "/images/bounceman.png",
      caption: "The Bounceman's menacing appearance."
    }
  ],
  
  sections: {
    appearance: [
      {
        id: "default",
        label: "Default",
        description: "The Bounceman is a short, rotund Robloxian with no arms or legs. He has white skin, with a red-rubber body, and a white-rubber bottom. He wears a specially-tailored trench coat with a flared collar and tail, which runs down either side of his body. He has large, bulbous eyes that stick out of his head, with no visible mouth to be seen. The Bounceman is entirely bald, though a top hat often covers a majority of his head.",
        images: [
          {
            url: "/images/bounceman.png",
            caption: "The Bounceman's menacing appearance."
          }
        ]
      }
    ],
    
    personality: [
      "The Bounceman is an extremely energetic, jittery, and simple-minded individual. He loves being active and expelling his energy, often forcing unwilling participants to partake in his intense training regimen (one impossible to complete for most humanoid Robloxians), typically until they pass out—or even die—from exhaustion.",
      "The Bounceman is nearly impossible to socialize or communicate with, bearing no personality beyond his hobby of exercise. Almost never is the Bounceman seen relaxing or lounging around, aside from the rare occasions when he needs to sleep."
    ],
    
    lifestyle: [
      {
        id: "alone",
        label: "Alone",
        description: [
          "The Bounceman leads a one-track lifestyle, only seeking to stay moving and bouncing around through his rubbery body. He believes that sharing the joys of exercise is his express purpose, happily displaying his devotion to motion to any unfortunate victims who may be nearby.",
          "As the Bounceman lacks any limbs, there are very few hobbies he could truly participate in—even with a clear and sane mind. But even then; in his eyes, those extra activities would be silly! After all, why sit down when you could keep on moving? He'll make sure they understand this, whether they like it or not."
        ]
      },
      {
        id: "victims",
        label: "Victims",
        description: [
          "Out and about within the Bloxiverse, the Bounceman springs from one World to the next, all in search of 'lucky ones' to share the joys of movement with. Once he has his eyes set on a victim, little can be done to stop him. His smaller form and rubberized body allow him to catch up to the most elusive of Bloxians, with relatively no effort required.",
          "He'll wear his target down until he can force them to exercise along with him, often demanding his victims to complete feats that only the Bounceman is realistically capable of. When they inevitably fail to meet his expectations, they'll be forced to try again and get senselessly beaten when they cannot any longer.",
          "It is undetermined whether the Bounceman's training regimen is made to be sadistic (and/or purposefully impossible) in nature, or if it was truly made for some innocent (and deluded) fun. Regardless of the intent, crossing paths with the Bounceman is never a good idea."
        ]
      }
    ],
    
    history: [
      {
        id: "boris-dohm",
        label: "Boris Dohm",
        description: [
          "Far before the Bounceman's own existence was a man by the name of Boris Dohm. Boris was a simple and ordinary man, a fan of tailoring and exercise. He worked an office job within the Roblox World Headquarters, positioned as an intern within one of their many offices. His life was easy and honest, though admittedly it was one of mediocrity.",
          "Despite how plain it all was, Boris felt no desires for change or more in his life. He knew he had it better than most others did, and he felt peace knowing that he was, at the very least, in a secure position in life. He may have settled for simplicity, but he cherished it all nonetheless.",
          "Boris was happy."
        ],
        images: [
          {
            url: "/images/boris-dohm.png",
            caption: "Boris, wearing a coat he tailored over the course of a week. He was always proud of his work."
          }
        ]
      },
      {
        id: "the-accident",
        label: "The Accident",
        description: [
          "Yet another day arrived at the office, one like any other. Boris sat at his desk, ruffling through pages and organizing documents when a member of management approached him, leaning onto his desk. Boris was a bit nervous, but the manager reassured him that he only wanted a favor. He asked Boris to go on a large coffee run for the employees on his floor. Boris agreed, hoping to seize the opportunity for a chance to slack off. Boris swiped the company card from its holder on the wall, heading out of the building as he took a breath of fresh air and had a big stretch. He left the confines of the World and entered the Miasma, setting off for the Starblox that wasn't too far away. The Miasma was noticeably empty, but Boris paid it no mind.",
          "Boris loved being the designated coffee-man for his co-workers, surprised that people weren't competing for the position. Sitting down for those long hours, sorting through those documents... It eats away at the mind after a while. An opportunity to get out and have time to yourself whilst still being paid? It was a no-brainer decision in Boris' eyes. He always wished he could've landed a more active job, one that kept him moving around and working hard. He also wouldn't have minded being a tailor, seeing as he regularly practiced his own clothesmaking in his spare time.",
          "Boris put these thoughts aside as he neared the Starblox. Suddenly, a World nearby violently erupted into a flash of electricity, before shattering and scattering debris in every direction. Boris had enough time to react but was left with no means to defend himself, allowing a large chunk of debris to tear completely through most of his torso. He immediately began to lose consciousness as he was blasted back, his last conscious thoughts lingering on wishing he could've done more with his life. As the company phone flew away, the embedded security measures within had activated from the impact, dialing emergency services who quickly closed in on Boris' location.",
          "Despite the odds, Boris' unconscious body was recovered and successfully stabilized after multiple surgeries and a plethora of medications. Although he survived the incident, he was left completely comatose and entirely unresponsive. Members of his family frequently visited him, caring for him by changing his clothing and stretching his body. This was a routine that would continue on for many months, but Boris' condition only seemed to grow more bleak as time went on."
        ],
        images: [
          {
            url: "/images/boris-hospital1.png",
            caption: "Boris, comatose and hospitalized. Most of his limbs have been blown away from the incident."
          }
        ]
      },
      {
        id: "a-new-hope",
        label: "A New Hope",
        description: [
          "Soon enough, the hospital housing Boris provided his caregivers with an ultimatum—Let Boris continue to fight a losing battle, or pull the plug on his life support and end his suffering. His family initially protested the idea, but the hospital soon convinced them that it was simply in Boris' best interests. A heap of paperwork was completed for the scheduled plug-pull, something he would've happily done given the experience at his job. Eventually, days had passed and the time arrived where Boris would be put to rest for good.",
          "His mother was the one who would do it, given a final chance to say goodbye to her son. Her hand gripped the plug, trembling with a mix of sorrow, anger, and hesitation. Right as she gathered the resolve to rip the cord from the wall, a man burst through the door and yelled for her to stop. The shock made her release the cord instantly, turning towards the voice. The man introduced himself as Rovan, explaining that he was a master of bioengineering. He explained his work, and that he believed that Boris could be saved—Not with medicine, but by being rebuilt. His family was suspicious, but Boris' mother quickly folded under the pressure. She'd rather have taken a chance to save Boris than to end his life herself.",
          "More paperwork was signed, passing the rights Boris' family had over him onto Rovan, who happily took Boris away with the promise that he would live on once again. They were left with a contact card to reach out, and stay in touch with the process. With a nod and wave goodbye, Rovan wheeled Boris out after his life support system was transferred to a portable unit.",
          "This would be the last time Boris' family would ever see or hear of him."
        ],
        images: [
          {
            url: "/images/borismomhope.png",
            caption: "Boris' mother, accepting Rovan's terms for help."
          }
        ]
      },
      {
        id: "the-experiment",
        label: "The Experiment",
        description: [
          "Arriving back at Rovan's facility, Boris was roughly thrown onto the operating table, as a sinister smile crept across Rovan's face. Those fools had signed off their rights to Boris, freeing him of any legal complications. They had even bought the fake contact card, what a joke! Rovan laughed to himself, as he prepared his tools for the surgeries and experiments that would soon follow. Though he had no plans to return Boris to his family, Rovan was not entirely lying about his promise to awaken Boris—He would do so, no matter the cost. He would awaken Boris once again, through the lens of Rovan's sickened visions.",
          "Rovan wasted no time and immediately got to work, dissecting parts of Boris that he believed weren't needed. His limbs had already been damaged by the accident, they were just dead weight and obviously had to go. His hair got in the way of brain surgeries, so his scalp was lightly cooked by a laser to permanently be rid Boris of hair. Boris was cut open and had a majority of his organs replaced with mechanical components, pieces that were much more efficient than their organic counterparts. Boris had his body heavily morphed and reshaped to fit the new components and structure of his body. A special skeleton was implanted to retain a rounded shape, as his skull was compressed into his chest to complete the spherical appearance. His eyes were gouged and reattached to the surface of his face.",
          "Rovan realized that if Boris woke up, he'd have no way to do much of anything—Especially not move, and that simply wouldn't do. Beyond his face, Boris was skinned and had a specialized rubber replace the surface of his body. Boris was cut open once again, as a device known as the Atomic Trampoline was installed; This granted Boris the ability to aim and bounce himself freely. The clothing Boris originally wore was reattached and embedded within the rubber, as Rovan found the charm of Boris' coat to fit the new body nicely.",
          "Eventually, it came time to relocate Boris' brain deeper into his chest cavity. Rovan had previously compressed the skull down to a flat surface, something he believed may have damaged the brain. He carefully cut open Boris, one last time. He sliced his brain from his skull, carefully replanting it into a specialized compartment within Boris' chest. A nanosurgical device was used to attach individual nerves and brain cells back to the brain stem, though this was not done with guaranteed accuracy. Small connections were likely missed, and some connections were probably made incorrectly. Rovan had no choice but to look past these marginal errors, as they were problems not even he could fix.",
          "After weeks of work and perfecting Boris' new form, it finally came time to wake the new man up. Electricity and adrenaline was pumped into his body en-masse, shocking Boris' body to life. Such a method was harsh, but Rovan believed that it would be extremely difficult to wake someone up, especially if they had been altered to such an extreme degree like Boris. He trusted his methods and he was right to do so, as Boris' eyes shot open for the first time in months.",
          "Rovan had succeeded in awakening Boris."
        ],
        images: [
          {
            url: "/images/borisoperation.png",
            caption: "Rovan, operating on Boris. His transformation is already underway. The mask keeps him breathing."
          }
        ]
      },
      {
        id: "the-reawakening",
        label: "The Reawakening",
        description: [
          "Exhausted and clouded by a broken mind, Boris looked around blankly as he came to his senses. He scanned the room with his tired eyes, looking down at his own body and learning of the horrible changes Rovan had made. Yet, despite the severity of the things Rovan had done, Boris did not scream or cry. His deadpan expression confused even Rovan, who hypothesized that he may have improperly reconnected Boris' brain. Despite the obvious mental struggle, Rovan decided to attempt a conversation with Boris. Though just as he went to speak, Boris rolled off of the table, bouncing into a nearby wall. His expression, though hard to read, suggested he was lost in thought.",
          "Deep in Boris' mind, he thought deeply in a desperate effort to cling to whatever memories he could. He remembered his job, being at work and getting asked to do a favor by a coworker. What WAS the favor? It was to grab something, perhaps papers? No, it was coffee—Boris had left to get coffee. His thoughts spiraled as his memories came flooding back, and eventually he recalled the injury, alongside the last moments of regret he felt; The feelings he carried before what he believed would be his death. He let out a cry of rage and sorrow, screaming from the slurry of emotion that came pouring into his heart. His mind twisted as his senses returned, fully grasping the situation he now found himself within.",
          "Rovan realized that Boris' condition was growing unstable, but it was already too late—The raw emotion Boris felt was enough to trigger the Atomic Trampoline that Rovan had installed, causing Boris to violently bounce against the walls, his momentum increasing as it put strain on the facility's structure. With a final yell, Boris breached the armored walls and shot out of the World he was contained within, straight into the Miasma. He launched from World to World, confused and scared. His thoughts were racing as they slowly drained away from his mind, eventually calming down as he came to a slow float within the cosmic nothingness."
        ],
        images: [
          {
            url: "/images/borisreawakening.png",
            caption: "Boris, reawakening from his transformation."
          }
        ]
      },
      {
        id: "the-bounceman",
        label: "The Bounceman",
        description: [
          "As Boris came to a standstill, he had a moment alone to truly process and understand what had happened. He wept at the situation, for a reason his hazy mind struggled to comprehend. The last thoughts he had as a normal Bloxian were all that he was left with, his dreams to do more in life, to train and become a masterful tailor... But, wait. Just then, he was soaring through the Bloxiverse at speeds he once only could've dreamed of! His coat he made was still attached, too! Say, perhaps this new situation he found himself in was not one of sadness and shamefulness, but rather a blessing in disguise?",
          "In his twisted euphoria, Boris let go of his old life and fully submerged himself into this new headspace. The joy he felt was unimaginable, he was free to go where he pleased and act however he wished. Why weren't others the way he was? Why did they settle for such mediocrity, when they too could be free? Boris' own mind left for the back seat, as a new persona set in. He desired to share the euphoric feelings he felt as a free man, and set off on a quest to train others to attain the same status he did—despite being completely unaware of how he'd ended up the way he did in the first place.",
          "Boris (a name he no longer recalled) went on to become a notoriously-known Bloxian, said to force his victims into a twisted training regimen. He'll insist that if you try hard enough, then you too can reach his status. The regimen itself is impossible to complete... At least, if you aren't a hyper-buoyant rubber sphere. This causes his unwilling participants to inevitably fall short of his expectations. When they do, they're either forced to try again, or beaten senselessly as a form of motivation—A process that inevitably leads to the death of his targets.",
          "Nobody knows where he came from, or why he does what it is he does. But he has had the time to amass a reputation and earn a name for himself, one that strikes fear when told around a campfire late at night—A crazed rubber ball, known as the Bounceman."
        ]
      }
    ],
    
    relationships: [
      "Rovan Macov (Partial Creator): Rovan Macov is a lunatic, as well as the biomechanical engineer responsible for the creation of the Bounceman. As a normal Bloxian, Boris never knew Rovan as they only met long after Boris had gone comatose. Although, as the Bounceman, the two had interacted with one-another for mere minutes, before he escaped from the facility Rovan held him in. It is undetermined whether the Bounceman is aware of what Rovan did to him, though it would appear he holds no ill intent towards Rovan if so. He'd probably treat Rovan as he does with other Bloxians, attempting to grant them the same freedom Rovan had oh-so-generously awakened in him."
    ],
    
    relationshipsData: {
      "rovan-macov": {
        status: "Partial Creator",
        history: [
          "Rovan Macov is a lunatic, as well as the biomechanical engineer responsible for the creation of the Bounceman. As a normal Bloxian, Boris never knew Rovan as they only met long after Boris had gone comatose.",
          "As the Bounceman, the two had interacted with one-another for mere minutes, before he escaped from the facility Rovan held him in. It is undetermined whether the Bounceman is aware of what Rovan did to him, though it would appear he holds no ill intent towards Rovan if so.",
          "He'd probably treat Rovan as he does with other Bloxians, attempting to grant them the same freedom Rovan had oh-so-generously awakened in him."
        ]
      }
    },
    
    combatStyles: [
      {
        id: "atomic-trampoline",
        label: "Atomic Trampoline",
        combatStats: createCombatStats("B", "A", "S", "D", "F", {
          power: "D",
          penetration: "C",
          intensity: "A",
          toughness: "A",
          vitality: "A",
          resistance: "B",
          swiftness: "S",
          endurance: "A",
          flexibility: "E",
          accuracy: "C",
          dexterity: "F",
          reactivity: "E",
          tactility: "E",
          wisdom: "F",
          stability: "F"
        }),
        description: [
          "The Bounceman relies on an internal device known as the Atomic Trampoline to remain incredibly bouncy and mobile while in combat. He'll slam into his targets at incredibly lethal velocities, beating his victims into submission and their eventual death.",
          "He is mostly immune to physical weaponry, mainly due to his unique body structure. Most of his body is protected by a thick rubbery material, while his bones have been cast into a metal skeleton. While puncturing him with sharp weapons is possible, the ultra-dense rubber seals most wounds immediately."
        ],
        combatStyleData: {
          overview: {
            text: [
              "The Bounceman relies on an internal device known as the Atomic Trampoline to remain incredibly bouncy and mobile while in combat. He'll slam into his targets at incredibly lethal velocities, beating his victims into submission and their eventual death.",
              "He is mostly immune to physical weaponry, mainly due to his unique body structure. Most of his body is protected by a thick rubbery material, while his bones have been cast into a metal skeleton. While puncturing him with sharp weapons is possible, the ultra-dense rubber seals most wounds immediately."
            ]
          },
          passives: {
            techniques: [
              {
                id: "atomic-trampoline",
                title: "Atomic Trampoline",
                description: [
                  "The Bounceman is implanted with a powerful device known as the Atomic Trampoline, allowing him to subconsciously alter his density and buoyancy on a whim. Combined with his rubbery body, the Bounceman can quickly accelerate and reach lethal speeds, allowing him to quickly move from place to place and tear through some of the toughest materials. So long as he remains denser than the object he strikes, he'll often punch a hole completely through. Given enough time and with a strong enough kinetic force, the Bounceman can become an unpredictable projectile, capable of travelling speeds that appear blurry to the naked eye.",
                  "Although the Bounceman could theoretically accelerate to infinity, his body and mind can only sustain a limited amount of force. He does not possess enhanced reaction speeds beyond that of an average Bloxian, meaning he becomes significantly more inaccurate as he speeds up. He can comfortably push himself to the speed of sound, but going beyond this often begins to stretch and warp his rubbery body, putting strain on both the Atomic Trampoline and the metal skeleton sustaining his rounded shape. Sustaining such speeds are bound to cause internal injuries, and may even break his skeleton."
                ]
              },
              {
                id: "rubbery-skin",
                title: "Rubbery Skin",
                description: [
                  "The Bounceman has had a majority of his skin replaced with specialized rubber, a material designed to work in tandem with the Atomic Trampoline installed within the Bounceman's torso. It is classified as 'ultra-dense', capable of withstanding incredible velocities and severe impacts without warping or otherwise losing form. It is tough to penetrate, and wounds quickly close up as the pressure seals open holes almost immediately.",
                  "Pushing his speeds to the limit may damage the rubber, as although it is extremely durable, all natural elements have a limit as to what they can sustain. Speeds beyond the speed of sound will contort his body further and further, eventually ripping the rubber away."
                ]
              },
              {
                id: "iron-gut",
                title: "Iron Gut",
                description: [
                  "The Bounceman's skeleton is entirely metal, meshed into a spherical form designed to maintain his rounded appearance. Additionally, all of the Bounceman's organs (everything beyond his brain, eyes, and the skin on his face) have been replaced by their mechanical counterparts and rubber, providing a wide range of benefits:",
                  "He requires exclusively water to sustain himself, meaning he cannot starve. Most of his mechanical organs charge with kinetic force, similarly to the weaponry used by Vortex. As long as he remains on the move, he'll always stay healthy.",
                  "His mechanical organs work autonomously from his brain, meaning he loses energy extremely slowly. He rarely needs to sleep as a result, almost always remaining on the move. Of course, this is excluding the occasional power nap.",
                  "It is nearly impossible to poison or otherwise inflict him with any similar status conditions. Standard needles and darts struggle to penetrate the rubber of his skin, let alone the metallic skeleton and organs kept within—Unless directly injected into his brain through the skin on his face. Though mostly, the only reliable way to inflict the Bounceman with a condition is to use gas, as he still requires air to breathe."
                ]
              }
            ]
          },
          offensive: {
            techniques: [
              {
                id: "kinetic-ricochet",
                title: "Kinetic Ricochet",
                description: [
                  "The Bounceman can senselessly ram into his targets, rapidly firing himself off of the walls to increase his momentum. Targets can quickly become overwhelmed by his high speeds and rapid attacks, often collapsing to the ground from a barrage of rough slams. These attacks do not let up until the Bounceman believes he has thoroughly beaten his target into submission, or if the target can escape or relocate to an area with fewer surfaces to bounce off of.",
                  "This style of attack is highly efficient in close-quarters combat, especially within buildings or other enclosed spaces. It quickly drops in power as the battlefield becomes more spacious, eventually becoming ineffective in entirely flat clearings."
                ]
              },
              {
                id: "rubber-riposte",
                title: "Rubber Riposte",
                description: [
                  "The Bounceman can use the momentum carried within the physical attacks of his enemies, using it as means to speed himself up. In doing so, he can retaliate with a strike at nearly the exact moment he is struck, catching most of his opponents off-guard. This technique works better when the Bounceman is struck by heavier, blunt attacks—Such as those issued from sledgehammers or metal bats.",
                  "Like with most of the Bounceman's methods for combat, this technique relies heavily on close-quarters combat with lots of nearby surfaces to ricochet off of. Open fields prevent the Bounceman from properly performing a ricochet towards his opponent."
                ]
              },
              {
                id: "or-ball-tal-strike",
                title: "Or-ball-tal Strike",
                description: [
                  "When no surfaces are nearby for the Bounceman to ricochet off of, he can leap high into the air and crash down at significant speeds. This essentially turns him into a mini-meteorite, moving towards the ground at a speed that causes the air nearby to ignite from the friction. Depending on what he crashes into and at what speed he is travelling, there is often a small explosion as Bounceman makes contact with the floor. This technique can be repeated rapidly, allowing him to cover large areas with a barrage of strikes into the earth and his targets.",
                  "This technique works, so long as Bounceman does not become lodged into the ground or another material he cannot ricochet off of, such as water."
                ]
              }
            ]
          },
          defensive: {
            techniques: [
              {
                id: "immovable-object",
                title: "Immovable Object",
                description: [
                  "By greatly amplifying his density, the Bounceman can lock his position in place. In doing so, he becomes almost impossible to move without extreme amounts of force, or some form of ability that can alter the weight of targets. This technique is incredibly useful against strong forces, such as winds and powerful impacts that would normally send the Bounceman flying.",
                  "Naturally, the downside to this technique is that the Bounceman becomes completely immobile while it is active. It also takes a few moments to revert the density changes afterwards."
                ]
              }
            ]
          },
          utilitarian: {
            techniques: [
              {
                id: "bouncing-around",
                title: "Bouncing Around",
                description: [
                  "Naturally, the Bounceman has no issues travelling across the Bloxiverse or covering large distances relatively fast. By building up enough momentum—Enough to move quickly but not too much to give him no reaction time—He can effectively go anywhere he pleases. Inter-World travel is trivialized by his impressive speeds, and most opponents stand no chance if they attempt to flee."
                ]
              }
            ]
          },
          drawbacks: {
            techniques: [
              {
                id: "think-fast",
                title: "Think Fast",
                description: [
                  "High speeds make the Bounceman incredibly deadly, yet his mind often struggles to keep up with the impossible speeds his artificial body can reach. His reaction time is not enhanced as his brain (although damaged) remains unaltered, despite the countless surgeries. He can opt to wildly ricochet off of surfaces at the speed of sound if he so chooses, but he is entirely incapable of aiming or properly planning his next moves while doing so."
                ]
              },
              {
                id: "rollin-limbless",
                title: "Rollin' Limbless",
                description: [
                  "Obviously, the Bounceman lacks any arms or legs. Therefore, he struggles to do basically anything that would normally require hands or legs. He cannot sprint, use conventional weaponry, or do much of anything. If he were to somehow be restrained or have his Atomic Trampoline deactivated, he would be left entirely helpless and at the mercy of others."
                ]
              }
            ]
          }
        }
      }
    ],
    
    trivia: [
      "The Bounceman has gone through 3 major redesigns before settling on the current and final appearance!",
      "The Bounceman's design as Boris was done AFTER Bounceman was created, which is perhaps a bit backwards."
    ]
  },
  
  stats: {
    offense: { label: "B", value: 4 },
    defense: { label: "A", value: 5 },
    utility: { label: "S", value: 6 },
    potential: { label: "D", value: 2 }
  }
};

