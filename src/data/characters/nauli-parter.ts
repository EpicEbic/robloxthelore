
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const nauliParter: WikiEntry = {
  id: "nauli-parter",
  title: "Nauli Parter",
  description: "A nomadic Robloxian with augmented psychic abilities, traveling the Bloxiverse to serve justice alongside her close allies.",
  preview: "A tactical nomad with the power of pathokinesis, Nauli is ruthless to strangers but deeply caring to her friends.",
  content: "Nauli Parter is a 23-year-old Robloxian with augmented psychic abilities who lives a nomadic lifestyle, wandering the Bloxiverse to fight evil wherever it may lurk.",
  category: "character",
  subcategory: "protagonist",
  imageUrl: "/lovable-uploads/1cd20d3c-e29b-4fe3-8a40-e4732259983b.png",
  lastUpdated: "2025-07-29",
  relatedEntries: ["caesar-bloxwright", "vortex-a-steele", "ren-bytera"],
  quote: {
    text: "Hurry up, I didn't come here just to dawdle. Fight me.",
    context: "Nauli, challenging an opponent who's taking too long to make their move."
  },
  species: "Robloxian",
  age: "23",
  alignment: "Neutral / Good",
  carouselImages: [
    {
      url: "/lovable-uploads/1cd20d3c-e29b-4fe3-8a40-e4732259983b.png",
      caption: "Nauli, ready to strike while wielding her combat dagger."
    },
    {
      url: "/lovable-uploads/4c3cd16b-cbb7-4492-aa35-b91fc09db63f.png",
      caption: "Nauli, on a stroll with her close friend Caesar."
    }
  ],
  combatStyles: [
    {
      id: "standard",
      label: "Standard",
      description: [
        "Nauli is agile, yet fragile when it comes to combat. Nauli aims to play a supportive role when working with her allies, using her abilities to benefit her friends and hinder any opposition. However, Nauli shouldn't be taken lightly, even as an individual. She is deceptively flexible and acrobatic, making her a hard target to hit, and giving her an edge in surprise attacks and ambushes.",
        "Nauli always tries to keep a hold of her combat dagger, which can provide a much-needed edge in more stressful situations she has found herself in."
      ],
      combatStats: createCombatStats("F", "E", "B", "B", "C")
    }
  ],
  sections: {
    history: [
      "Far before meeting Caesar or Vortex, Nauli was originally a part of tests run by Ren Bytera, an unethical scientist with an insatiable desire to push the boundaries of science. Through an experiment, Nauli was augmented with permanent psy-link receivers, which were originally intended to allow telepathic, one-way communication through short messages. However, these augments proved far more capable than initially believed, as Nauli quickly learned that she had developed the ability to completely influence a Bloxian's psyche.",
      "Beyond her past with Ren, Nauli doesn't appear to be fond of discussing previous events in her life, actively dodging questions about where she used to live or any other friendships or relationships she has. Caesar has speculated that something traumatic may have occurred in Nauli's life, though she refuses to confirm or deny if he's correct in his assumption."
    ],
    appearance: "Nauli is an average-built Robloxian. She has messy, bob-cut blonde hair with augmented antennae protruding from her head. She wears a grey, tactical tracksuit almost anywhere she goes, with green and beige leather pads on her upper arms and shoulders which provide slight protection. She has a green-striped scarf, as well as a camouflage utility belt which she uses to carry a variety of smaller weaponry and tools, most notably her combat dagger.",
    personality: [
      "Nauli can be quite a wildcard when it comes to behavior, as her demeanour can be quick to shift depending on who she's interacting with, and how they choose to interact with her.",
      "To strangers, Nauli is nothing short of ruthless. She saves her words, often remaining quiet and cold when faced with the unknown. Mercy is merely a concept to her, as she won't hesitate to bring an early end to those who she believes to be a threat. Nauli never pulls her punches or flares her style, as it's better to be effective than to be fancy.",
      "However, if interacting with close friends or family, Nauli is almost unrecognizably different from her cold and callous persona. Her hostility melts away in the presence of those she loves, displaying a surprisingly deep sense of passion and consideration. She's always looking to watch out for her allies and friends, and be there for them in times of need. She loves to be useful, assisting with almost anything in any way she can. Nauli doesn't like to dawdle around, and loves nothing more than to stay busy."
    ],
    lifestyle: [
      "Nauli lives a nomadic and spontaneous lifestyle, with no real home to call her own. She wanders the expanses of the Bloxiverse, moving from region to region and seeking evil to serve justice to, wherever it may lurk. Most of the time, her closest allies and friends, Caesar and Vortex, accompany her as they share a close bond and similar goals. While otherwise, Nauli would likely be homeless, she has been freely invited by both Vortex and Caesar to freely stay at either of their places whenever she'd like.",
      "When she isn't serving justice, Nauli spends most of her free time training her agility or tending to chores around Caesar's cabin or Vortex's apartment. She doesn't like to idle for long, much preferring to keep busy as best she can. She regularly indulges in yoga, as well as intense acrobatics to keep herself flexible and fit, prepared for anything. She loves to partake in friendly sparring sessions with Caesar or Vortex, in efforts to sharpen her reflexes and improve her endurance and stamina."
    ],
    relationships: [
      "Caesar Bloxwright - Close Friend | Caesar and Nauli have been inseparable friends, closely bonded for years upon years. They originally met as strangers in a restaurant, after Caesar offered to buy Nauli something to eat after he had found her rummaging through garbage. From then on, Caesar's kindness allowed Nauli to open up and express herself, inevitably leading to their growing connection.",
      "Vortex A. Steele - Close Friend | While initially enemies, Nauli slowly grew to trust Vortex after their differences were put aside. She came to respect Vortex's dedication to his line of work, and eventually the two became good friends.",
      "Ren Bytera - Friend | While initially very skeptical of Ren and her shady proposals, Ren's enthusiasm over her passions was very endearing to Nauli. The two became decent friends, and eventually Nauli had gained enough trust to assist Ren in her experiments, eventually leading to the augmentation implant that led to Nauli acquiring her powers."
    ],
    combat: [
      "Nauli is agile, yet fragile when it comes to combat. Nauli aims to play a supportive role when working with her allies, using her abilities to benefit her friends and hinder any opposition. However, Nauli shouldn't be taken lightly, even as an individual. She is deceptively flexible and acrobatic, making her a hard target to hit, and giving her an edge in surprise attacks and ambushes.",
      "Nauli always tries to keep a hold of her combat dagger, which can provide a much-needed edge in more stressful situations she has found herself in."
    ],
    abilityDetails: [
      "Nauli's augmented antennae grant her the ability of Pathokinesis, allowing her to influence and manipulate the psyches and thoughts of other Bloxians. This mental manipulation has a handful of powerful applications, and can be used to both benefit and hinder targets of her choosing. Pathokinesis especially shines when used in tandem with her allies and their abilities."
    ],
    offensiveCapabilities: [
      "While not inherently lethal, Nauli can oppress feelings and thoughts that bring motivation or happiness, depressing targets and weakening their resolve. This often leads enemies to act aloof or lose a will to fight, weakening them. Beyond this, Nauli can greatly confuse targets, either by mentally dampening their ability to think, or by causing visual or auditory hallucinations. These illusions become stronger and more convincing if the target is tired, weakened, or otherwise has a weak psyche."
    ],
    defensiveCapabilities: [
      "Nauli's ability lacks greatly in defense, as Pathokinesis offers no abilities beyond mental manipulation. At best, she could opt to create illusory clones of herself to confuse opponents, or make them interpret her as another Bloxian or an inanimate object. But, these methods of defense are unreliable if the target has common sense and/or an understanding of how Nauli's ability works, effectively leaving those strategies as more of an emergency gambit."
    ],
    utilitarianCapabilities: [
      "Pathokinesis can be incredibly beneficial to allies, especially on the heat of the battlefield. Nauli can fill the minds of her allies with a sense of calm, or invigorate them with confidence and motivation. Similarly to a phone, Nauli can \"call\" people mentally, establishing a two-way psychic link that allows her and her allies to speak without a need to talk out loud.",
      "Additionally, she can numb the pain of others (or herself) by inhibiting pain receptors in the brain, allowing allies to keep fighting while suffering less from damage they may receive. It also helps to aid them in the recovery process, greatly reducing suffering during the healing process. It's important to note that while Nauli can numb pain and negate suffering, she is incapable of actually healing the wounds herself."
    ],
    drawbacks: [
      "Nauli's ability can, at times, be incredibly situational or outright useless. This is especially evident when Nauli faces a target alone, specifically those with a strong sense of mentality or willpower. Pathokinesis is ineffective against those with strong minds, nullifying her ability completely. In these situations, Nauli is forced to rely on her highly-trained agility and her (admittedly weak) physical strength, leaving her particularly vulnerable."
    ],
    trivia: [
      "Nauli hates all sodas and beverages beyond tea and water, believing popular choices like the Bloxy Cola or Witches Brew to be far too fake and chemically-enhanced to be worth drinking.",
      "Nauli's favorite color is, if you can imagine, green.",
      "Nauli is 2nd when it comes to \"most rewrites\" for The Lore, just behind Caesar who has had far, far more."
    ]
  },
  
  abilityName: "Pathokinesis",
  stats: createCharacterStats("E", "E", "C", "E")
};
