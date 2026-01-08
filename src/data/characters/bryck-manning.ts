import { WikiEntry } from "@/types/wiki-types";
import { createCombatStats } from "@/components/character/character-stat-chart";

export const bryckManning: WikiEntry = {
  id: "bryck-manning",
  title: "Bryck Manning",
  description: "A minor antagonist Robloxian with a power complex, especially after coming into ownership of the Gravity Coil.",
  preview: "A mistreated civilian, driven into a god complex through the acquisition of the Gravity Coil.",
  content: "Bryck Manning is a minor antagonist character who represents the dangers of unchecked power and the cycle of trauma. Once a powerless civilian constantly displaced by disaster, he has transformed into the very problem he once faced after acquiring the Gravity Coil.",
  category: "character",
  subcategory: "minor-antagonist",
  imageUrl: "/images/bryck-manning-uncoiled-1.png",
  lastUpdated: "2025-01-08",
  part: "Part 1",
  quote: {
    text: "I finally have some power for myself, so tell me—why the HELL would I give that up!?",
    context: "Bryck, arguing with Caesar after he asked Bryck to remove the Gravity Coil and surrender."
  },
  species: "Robloxian",
  age: "28",
  alignment: "Neutral / Evil",
  role: "Marauder",
  archetype: "marauder",
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      combatStats: createCombatStats("E", "D", "E", "D", "F"),
      description: [
        "Bryck is an average fighter with minimal combat intelligence. His light training at the gym has been shown to help him in combat, but he is ultimately outclassed by basic weapons, stronger fighters, or those with an ability."
      ],
      images: [
        {
          url: "/images/bryck-manning-standard-combat.png",
          caption: "Bryck stands little chance against threats such as the Subspacer, his strength alone can't save him."
        }
      ]
    },
    {
      id: "coiled-up",
      label: "Coiled Up",
      combatStats: createCombatStats("C", "D", "B", "C", "F"),
      description: [
        "Utilizing the Gravity Coil, Bryck can freely amplify or reduce the local forces of gravity and pressure surrounding his body. Such powers enable him to perform superhuman feats, leaping as high into the sky as he wishes or crashing down with tremendous force. By directing the flow of gravity to face different cardinal directions, Bryck can achieve a (albeit weaker) form of flight or navigate tough vertical terrain.",
        "Bryck has been in possession of the Gravity Coil for a long while, giving him ample time to experiment with the potential of the Gravity Coil and hone his skills while utilizing it. This level of experience, when paired with Bryck's egotistical and overconfident nature, can make him quite the devastating opponent for Civilians or weaker combatants."
      ],
      images: [
        {
          url: "/images/bryck-manning-coiled-up-combat.png",
          caption: "Bryck, drastically amplifying his weight to crush a target beneath him as they crash to the ground."
        }
      ]
    }
  ],
  carouselImages: [
    {
      url: "/images/bryck-manning-uncoiled-1.png",
      caption: "Bryck in his uncoiled state, sitting dejectedly against a brick wall"
    },
    {
      url: "/images/bryck-manning-uncoiled-2.png", 
      caption: "Bryck raising his fist in determination while uncoiled"
    }
  ],
  sections: {
    combatStyles: [
      {
        id: "standard",
        label: "Standard",
        combatStats: createCombatStats("E", "D", "E", "D", "F"),
        description: [
          "Bryck is an average fighter with minimal combat intelligence. His light training at the gym has been shown to help him in combat, but he is ultimately outclassed by basic weapons, stronger fighters, or those with an ability."
        ],
        images: [
          {
            url: "/images/bryck-manning-standard-combat.png",
            caption: "Bryck stands little chance against threats such as the Subspacer, his strength alone can't save him."
          }
        ]
      },
      {
        id: "coiled-up",
        label: "Coiled Up",
        combatStats: createCombatStats("C", "D", "B", "C", "F"),
        description: [
          "Utilizing the Gravity Coil, Bryck can freely amplify or reduce the local forces of gravity and pressure surrounding his body. Such powers enable him to perform superhuman feats, leaping as high into the sky as he wishes or crashing down with tremendous force. By directing the flow of gravity to face different cardinal directions, Bryck can achieve a (albeit weaker) form of flight or navigate tough vertical terrain.",
          "Bryck has been in possession of the Gravity Coil for a long while, giving him ample time to experiment with the potential of the Gravity Coil and hone his skills while utilizing it. This level of experience, when paired with Bryck's egotistical and overconfident nature, can make him quite the devastating opponent for Civilians or weaker combatants."
        ],
        images: [
          {
            url: "/images/bryck-manning-coiled-up-combat.png",
            caption: "Bryck, drastically amplifying his weight to crush a target beneath him as they crash to the ground."
          }
        ]
      }
    ],
    appearance: [
      {
        id: "uncoiled",
        label: "Uncoiled",
        description: "Bryck Manning is a taller, slimmer Robloxian with shorter brown hair and stubble along his cheeks and chin. He wears a green-and-black striped sweater with belted grey jeans, and black shoes.",
        images: [
          {
            url: "/images/bryck-manning-uncoiled-1.png",
            caption: "Bryck, resting against a wall made of brick."
          },
          {
            url: "/images/bryck-manning-uncoiled-2.png", 
            caption: "Bryck, struggling to contain his emotions as an anxiety attack closes in on his mind."
          }
        ]
      },
      {
        id: "coiled-up", 
        label: "Coiled Up",
        description: "Bryck Manning is a taller, slimmer Robloxian with shorter brown hair and stubble along his cheeks and chin. He wears a green-and-black striped sweater with belted grey jeans, and black shoes.\n\nWhile using the Gravity Coil, he'll often wrap it around his right arm. It bends freely to the movements he'll make, almost feeling as though it isn't there.",
        images: [
          {
            url: "/images/bryck-manning-coiled-1.png",
            caption: "Bryck's overconfidence shines through once the Gravity Coil comes on."
          },
          {
            url: "/images/bryck-manning-coiled-2.png",
            caption: "Bryck's ego often gets the better of him, as his god complex causes him to see those below him as worthless tools."
          },
          {
            url: "/images/bryck-manning-coiled-3.png",
            caption: "Bryck, robbing an innocent Noob of any valuable belongings she may have."
          }
        ]
      }
    ],
    personality: [
      {
        id: "uncoiled",
        label: "Uncoiled",
        description: [
          "Bryck is a short-tempered and incredibly stubborn man. He despises existing as 'just another civilian' within the Bloxiverse, born without any special gifts or latent abilities. No super strength, no anomalous abilities, no remarkable intelligence—nothing. His hatred has left Bryck as a miserable man, someone who rarely finds joy out of living his life.",
          "Despite his tempered personality, Bryck can be remarkably flakey and paranoid—even in situations where no danger is obviously present. His misfortunate life has led him to act this way, his fear and paranoia causing him to believe that something bad is going to happen, simply because it hasn't happened yet. This mindset follows Bryck wherever he goes, draining him both mentally and physically as he always remains on-guard.",
          "Underneath his callous and tough persona, Bryck is a broken man who radiates with hatred due to his own mistreatment. He seeks what little fulfillment he can by pushing down others, in a desperate attempt to feel powerful. By thickening his ego, he can remain numb and drown out the fear and hatred in his heart for the accursed reality he has been placed within."
        ]
      },
      {
        id: "coiled-up",
        label: "Coiled Up", 
        description: [
          "Under the influence of the Gravity Coil's sheer power and potential, Bryck quickly loses himself to his power complex. He becomes unstable, abusing the coil to do whatever he wishes, while remaining ignorant of those around him. His (previously-emotional) anxiety attacks and manic episodes become physical, as Bryck gets lost in his power and takes out his frustration physically, destroying infrastructure or injuring innocents on a whim.",
          "On top of his unstable emotions and behavior, Bryck's sadistic nature and ego tends to shine through when he is abusing the coil. He has no issues taunting or flaunting his power to civilians and opponents alike, so long as his confidence allows him to believe that he'll win the fight—and he's often too self-absorbed and high off of his power to believe he'd ever be in a position to lose. Unless issued a much-needed reality check, Bryck's god complex often never runs dry."
        ]
      }
    ],
    lifestyle: [
      {
        id: "pre-arrest",
        label: "Pre-Arrest",
        description: [
          "Bryck has always been on the move, treading from place to place as the years went by. His misfortunate history has deemed it necessary to remain on the move, due to the constant attacks and mass destruction caused by Bloxians up to no good. As of the present day, Bryck has found himself situated within a run-down apartment, residing within a communal Robloxian World located in the Bloxiverse's Outer Ring. The living conditions are far from ideal, but when you're a homeless man seeking a home, it's a bit harder to complain. Somehow, though, Bryck finds a way to regardless.",
          "While he detests living within such a shoddy community building, he fears moving as his effort could all be for nothing if a dangerous Bloxian decided his home would make a great punching bag. Even armed with a powerful artifact like the Gravity Coil, Bryck doesn't trust his combat potential against actual opponents, and prefers to use it against civilian-grade opponents. He'll use it to rob and harass those beneath him, primarily to get various resources he needs for his survival, such as food.",
          "Bryck tries to keep a low profile, but his episodes and tendency for power abuse often find him out and about, typically causing trouble for various victims. When suffering from a particularly strong episode or bad mood, Bryck is known to go out and trash infrastructure to physically vent his frustration. Crashing through terrain and buildings are just examples of the destruction he'll often cause as he expels his energy and exhausts himself.",
        ]
      },
      {
        id: "prisoner",
        label: "Prisoner",
        description: [
          "After being incapacitated and detained by Caesar and Nauli, Bryck was incarcerated and imprisoned within the Hunter Association's holding facility to serve time for his large list of criminal activity. Stripped of his belongings aside from a prisoner's uniform, Bryck has been left to fend for himself against the other inmates. His manic episodes have grown to be particularly strong, craving the feelings of freedom he once felt when he held ownership of the Gravity Coil.",
          "Like most inmates, Bryck has been put to work in physical labor, positioned within a mineral extraction site where he'll chip away at rocks in the hot sun. As much as Bryck would love to disobey and laze about instead, he finds the idea of execution far less attractive. At the very least, such intensive and focused work allows Bryck to remain numb to the bad thoughts and feelings.",
          "Thankfully, the prison is not without amenities for inmates, such as the counselling service provided by the Hunter Association's wellness department. Weekly visits with his assigned therapist have enabled Bryck to open up about his mental anguish and sickening life, working on himself and his feelings through emotional training and psychological evaluation. Slowly but surely, Bryck's mentality has begun to improve as his outlook on life has grown ever-so-slightly less bleak. Despite these improvements, his vengeance against Caesar and Nauli remains ablaze."
        ],
        images: [
          {
            url: "/images/bryck-manning-prisoner.png",
            caption: "An exhausted Bryck, resting his issued pickaxe over his shoulders and neck."
          }
        ]
      }
    ],
    history: [
      "Bryck Manning has lived a life shaped by misfortune and uncertainty. It's already common knowledge that the Bloxiverse is a dangerous place for many, but Bryck was truly dealt the shorter end of the stick in life. From birth, he was essentially always on the run. Each time he'd settle down and find a place he's happy with, some force of nature (or a Bloxian with sour intent) would quickly destroy whatever Bryck had managed to make for himself. This routine became commonplace for Bryck, much to his dismay. The severity and frequency of Bryck's assaults would suggest that they were targeted attacks, but this isn't the case. Unfortunately, he really is just unlucky.",
      "Bryck has always sought a means to defend himself, some way to fight back against the cruelty. But as a mere powerless Bloxian, there was only so much he could do. Bryck tried exercising and excessive training at the gym, and while this did help—it was never enough. No amount of physical strength could truly best a Bloxian gifted with a powerful ability, and Bryck came to understand and despise this. Hatred and humiliation bubbled up internally each time he'd be set back by another attack, twisting his emotions and turning Bryck into a hateful and sadistic man.",
      "Of course, this vicious cycle could only last for so long, and Bryck's life would finally hit a turning point. Late at night, Bryck was wandering aimlessly after a recent attack had evaporated his home into dust. Cursing to himself, he took out his frustration on an empty can of Bloxy Cola, as he kicked it around the empty street. But something caught his attention—a glimmer of blue in the moonlight, off in the bushes. Thinking it to potentially be something of value, he approached the bush and pulled out the object. Lo and behold, Bryck was bewildered to have unearthed an artifact, one of legend. Bryck had encountered the Gravity Coil.",
      "As a natural skeptic, he first believed it to be a fake, or some cruel joke planted by a prankster. The Power Coils had been spoken about in many of the history books, what could something so important possibly be doing here? He kept these thoughts in mind and kept his expectations low, and slipped it on his arm. But, no... this was no fake. The coil shifted to fit his arm and locked into place, producing a sound that he could only describe as clicking. Calming himself, he tried to trigger the effects of the coil. Nothing happened at first, and it took a bit of trial and error as Bryck flailed and leapt around like an idiot, expecting the coil to work automatically. But he soon came to understand that it took his subconscious will rather than physical action, and for the first time Bryck successfully managed to trigger the coil and hover.",
      "It was a cascading spiral for Bryck from that moment on, as he began to experiment and test the limits of his own body, as well as the coil's power. The more he used it, the more his sadistic nature began to shine. His experiments began as harmless tests at first—seeing how high he could jump or what amount of intensified gravity he could tolerate. But as things progressed, he began to test the potential it held for combat, destroying infrastructure or attacking innocents. His power complex took hold and grew as Bryck continued to use the coil, eventually becoming consumed by the power.",
      "His original desires for a way to protect himself grew twisted into sadistic revenge, leading Bryck to become the very thing he swore against. He finally had a way to settle down in a home, one he could valiantly protect—but no. That wasn't enough anymore, he had the power he needed and it was time to show off just what he was capable of. The consequences of generational trauma have been realized through Bryck's behavior and actions."
    ],
    relationships: [
      "Charles Studson - Ally: Though the two aren't close in any respect, they've spent time together in the Hunter Association's holding facility, where the two grew to be partners in their work. They've also bonded over the distaste they share for Caesar, Nauli, and Vortex. It was through Bryck's connection to Charles that a Hunter Association contract could be made against Caesar, despite Bryck being in the Hunter Association's prison.",
      "Caesar Bloxwright - Enemy: Caesar (alongside Nauli) were the ones to successfully subdue and capture Bryck, before transferring him to the Hunter Association's facility. Bryck's petty mindset desired nothing but revenge, though there was little that could be done from inside of prison. Through his connection to Charles, Bryck had a hit placed on Caesar which was eventually taken on by Vortex.",
      "Nauli Bloxwright - Enemy: Nauli (alongside Caesar) were the ones to successfully incapacitate Bryck during his rampage in the Farmer Sanctuary, though Nauli only served to support Caesar throughout the battle. Though Bryck despises Nauli, his hatred was far more focused on the petty revenge he wished to bring upon Caesar instead.",
      "Vortex A. Steele - Enemy: Bryck has a distaste for Vortex after he had failed to complete Bryck's contract against Caesar. While normally it would've ended there, Bryck was enraged to learn that on top of failing the contract against Caesar, he had also gone on to become Caesar's close friend."
    ],
    relationshipsData: {
      "caesar-bloxwright": {
        status: "Sworn Enemy and Target of Revenge",
        history: [
          "Bryck first encountered Caesar during his rampage at the Farmer's Sanctuary, where he was indiscriminately destroying property and terrorizing innocent civilians.",
          "Caesar intervened to stop the destruction. Despite Bryck's serpentine agility and venomous abilities, Caesar's raw power and determination drove him back, saving countless lives.",
          "Though Caesar was unable to permanently stop Bryck at that moment, the humiliation of being forced to retreat burned deeply. Bryck's pride was wounded, and his petty nature transformed the encounter into an obsession for revenge.",
          "From his cell in the Hunter Association's holding facility, Bryck used his connections to Charles Studson to issue a contract on Caesar's life. When Vortex failed to complete that contract and instead befriended Caesar, Bryck's hatred only intensified.",
          "Caesar represents everything Bryck despises: heroism, selflessness, and the ability to inspire others. Bryck dreams of the day he can escape and exact his revenge."
        ]
      },
      "nauli-parter": {
        status: "Enemy and Obstacle",
        history: [
          "Nauli was present during Bryck's rampage at the Farmer's Sanctuary, working alongside Caesar to stop his destruction.",
          "While Caesar engaged Bryck directly, Nauli provided crucial psychic support—disrupting Bryck's focus, creating illusions, and coordinating the defense of innocent bystanders.",
          "Bryck found Nauli's psychic abilities particularly frustrating. Her mental manipulation made it difficult for him to think clearly during the battle, contributing significantly to his defeat.",
          "Though Bryck despises Nauli, his hatred for her is somewhat overshadowed by his obsession with Caesar. He sees her as an annoying obstacle rather than his primary target.",
          "Still, Bryck would relish the opportunity to demonstrate that his venom and agility are more than a match for her psychic tricks."
        ]
      },
      "vortex-a-steele": {
        status: "Failed Contractor and Traitor",
        history: [
          "Bryck hired Vortex through the Hunter Association to eliminate Caesar, seeing the elite hunter as the perfect tool for his revenge.",
          "Bryck waited eagerly from his prison cell for news of Caesar's demise. Instead, reports came back of repeated failures—Vortex couldn't defeat Caesar despite numerous attempts.",
          "What happened next infuriated Bryck beyond measure: Vortex dropped the contract entirely and, worse, became friends with Caesar. In Bryck's eyes, this was the ultimate betrayal.",
          "Bryck sees Vortex as a failure and a traitor who let personal feelings interfere with professional duty. The fact that someone as skilled as Vortex couldn't defeat Caesar only makes Bryck more determined to do it himself.",
          "If Bryck ever escapes, both Caesar and Vortex will be on his list of targets—one for defeating him, the other for disappointing him."
        ]
      }
    },
    combat: [
      `
Bryck is an average fighter with minimal combat intelligence. His light training at the gym has been shown to help him in combat, but he is ultimately outclassed by basic weapons, stronger fighters, or those with an ability.
      `
    ],
    trivia: [
      "Bryck Manning's design is loosely inspired by the outfit worn by Steve Burns in the kids animated series, Blue's Clues.",
      "Bryck was originally planned to be a Noob, but things got changed around in the last minute and Ren Bytera was turned into a noob instead."
    ]
  }
};
