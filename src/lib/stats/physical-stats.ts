/**
 * Stats System - Physical (Combat) Stats
 * 
 * Defines all physical stat categories, subcategories, and their grade descriptions.
 * Physical stats measure a character's raw physical capabilities.
 */

import type { CategoryDefinition, GradeDescriptions, StatDescriptionMap } from "./types";

// =============================================================================
// PHYSICAL STAT CATEGORIES
// =============================================================================

export const PHYSICAL_CATEGORIES: CategoryDefinition[] = [
  {
    key: "strength",
    label: "Strength",
    description: "Measures offensive capabilities through physical power and combat effectiveness.",
    subcategories: [
      { 
        key: "power", 
        label: "Power", 
        shortLabel: "Power",
        description: "How physically powerful a Bloxian's body is, including their destructive potential." 
      },
      { 
        key: "lift", 
        label: "Lift", 
        shortLabel: "Lift",
        description: "How much weight a Bloxian can comfortably (or uncomfortably) tolerate at one time." 
      },
      { 
        key: "penetration", 
        label: "Penetration", 
        shortLabel: "Pen",
        description: "How easily a Bloxian can bypass or pierce through defensive layers." 
      },
      { 
        key: "intensity", 
        label: "Intensity", 
        shortLabel: "Int",
        description: "How much consistent pressure a Bloxian can apply against their opponent." 
      }
    ]
  },
  {
    key: "durability",
    label: "Durability",
    description: "Represents defensive capabilities and resistance to damage.",
    subcategories: [
      { 
        key: "toughness", 
        label: "Toughness", 
        shortLabel: "Tough",
        description: "How many injuries a Bloxian can sustain before becoming incapacitated." 
      },
      { 
        key: "vitality", 
        label: "Vitality", 
        shortLabel: "Vital",
        description: "How healthy a Bloxian is generally, including tolerance to disease and poisons." 
      },
      { 
        key: "thermostability", 
        label: "Thermostability", 
        shortLabel: "Thermo",
        description: "How well a Bloxian can withstand extreme heat or frost." 
      },
      { 
        key: "esotolerance", 
        label: "Esotolerance", 
        shortLabel: "Esoto",
        description: "How well a Bloxian can tolerate rarer hazards like electricity or radiation." 
      }
    ]
  },
  {
    key: "agility",
    label: "Agility",
    description: "Speed, reflexes, and nimbleness in movement and reaction.",
    subcategories: [
      { 
        key: "swiftness", 
        label: "Swiftness", 
        shortLabel: "Swift",
        description: "How quickly a Bloxian can move from one point to another." 
      },
      { 
        key: "acceleration", 
        label: "Acceleration", 
        shortLabel: "Accel",
        description: "How quickly a Bloxian can reach their top speeds." 
      },
      { 
        key: "flexibility", 
        label: "Flexibility", 
        shortLabel: "Flex",
        description: "How easily a Bloxian can maneuver through complicated environments." 
      },
      { 
        key: "endurance", 
        label: "Endurance", 
        shortLabel: "End",
        description: "How much stamina a Bloxian has, and how quickly they burn through it." 
      }
    ]
  },
  {
    key: "precision",
    label: "Precision",
    description: "Accuracy and fine motor control for precise movements.",
    subcategories: [
      { 
        key: "accuracy", 
        label: "Accuracy", 
        shortLabel: "Acc",
        description: "How consistently a Bloxian will land hits on their target." 
      },
      { 
        key: "range", 
        label: "Range", 
        shortLabel: "Range",
        description: "How far a Bloxian can comfortably and consistently fight from." 
      },
      { 
        key: "dexterity", 
        label: "Dexterity", 
        shortLabel: "Dex",
        description: "How fine a Bloxian's motor control is under pressure." 
      },
      { 
        key: "reactivity", 
        label: "Reactivity", 
        shortLabel: "React",
        description: "How quickly a Bloxian can react to sources of danger." 
      }
    ]
  },
  {
    key: "intelligence",
    label: "Intelligence",
    description: "Mental acuity, strategic thinking, and problem-solving.",
    subcategories: [
      { 
        key: "tactility", 
        label: "Tactility", 
        shortLabel: "Tact",
        description: "How clever a Bloxian acts in combat, making smart choices." 
      },
      { 
        key: "wisdom", 
        label: "Wisdom", 
        shortLabel: "Wis",
        description: "How smart a Bloxian is in everyday life." 
      },
      { 
        key: "foresight", 
        label: "Foresight", 
        shortLabel: "Fore",
        description: "How far a Bloxian can plan ahead." 
      },
      { 
        key: "sanity", 
        label: "Sanity", 
        shortLabel: "San",
        description: "How mentally-stable a Bloxian is." 
      }
    ]
  }
];

// =============================================================================
// PHYSICAL STAT GRADE DESCRIPTIONS
// =============================================================================

/**
 * Grade descriptions for all physical stats.
 * Each stat has descriptions for all 8 grade levels (F through Ø).
 */
export const PHYSICAL_STAT_DESCRIPTIONS: StatDescriptionMap = {
  // ===== STRENGTH SUBCATEGORIES =====
  power: {
    "Ø": "This Bloxian's destructive potential is unfathomable, capable of obliterating entire Worlds with the flick of a wrist. The very concept of physical limits does not apply to them.",
    "S": "This Bloxian can reshape landscapes and annihilate cities with minimal effort. Their strikes carry enough force to level mountain ranges in seconds.",
    "A": "This Bloxian can demolish reinforced structures and level city blocks with their attacks. Few defenses can withstand the raw power they bring to bear.",
    "B": "This Bloxian possesses the strength to destroy buildings and heavily armored vehicles. Their punches can send opponents flying through solid walls.",
    "C": "This Bloxian can break through stone, metal, and most natural materials with their strikes. They hit hard enough to incapacitate trained fighters in a single blow.",
    "D": "This Bloxian has strength notably above the average citizen, capable of breaking wooden barriers and denting weaker metals. They can hold their own in most physical confrontations.",
    "E": "This Bloxian has slightly above-average strength, giving them a minor edge in hand-to-hand combat. They can overpower untrained opponents with some effort.",
    "F": "This Bloxian has no notable strength beyond a standard civilian. They struggle in physical confrontations against anyone with combat training."
  },
  lift: {
    "Ø": "This Bloxian can manipulate objects of any mass as though they were weightless. Planets, stars, and celestial bodies pose no challenge to their lifting capabilities.",
    "S": "This Bloxian can hoist entire landmasses and massive structures without breaking a sweat. They treat aircraft carriers and skyscrapers like children's toys.",
    "A": "This Bloxian can lift and throw objects weighing hundreds of tons, including large buildings and naval vessels. Their carrying capacity defies conventional physics.",
    "B": "This Bloxian can benchpress vehicles and toss boulders with one hand. Lifting a loaded truck overhead is a casual feat for them.",
    "C": "This Bloxian can handle motorcycles, large appliances, and small boulders with relative ease. They can carry several times their own body weight.",
    "D": "This Bloxian can lift heavy furniture and equipment that would require multiple civilians. They show notable strength when moving bulky objects.",
    "E": "This Bloxian can lift moderate weights with visible strain, slightly outperforming the average citizen. They can carry loads that most would struggle with.",
    "F": "This Bloxian has lifting capacity consistent with an average civilian. Heavy objects require significant effort or assistance to move."
  },
  penetration: {
    "Ø": "This Bloxian's attacks transcend all forms of defense, connecting with absolute certainty regardless of barriers, abilities, or divine protection. Nothing can stop their strikes.",
    "S": "This Bloxian can shatter any known defensive measure, including ability-enhanced barriers and the strongest materials in existence. No armor or shield can protect against them.",
    "A": "This Bloxian tears through multi-layered defenses and reinforced armor with ease. Even abilities designed specifically for protection offer little resistance.",
    "B": "This Bloxian can penetrate specialized armor and defensive abilities, breaking through most protective measures. Heavily fortified positions crumble before them.",
    "C": "This Bloxian can pierce through standard armor and medium-grade defensive barriers. Most conventional protection offers only partial resistance to their attacks.",
    "D": "This Bloxian can bypass light armor and weaker defensive abilities. Standard protective gear provides limited defense against their strikes.",
    "E": "This Bloxian has slightly above-average penetrating power, capable of getting through the weakest barriers. Basic defenses still pose a challenge.",
    "F": "This Bloxian has no notable ability to penetrate defenses. Even standard armor and basic barriers effectively block their attacks."
  },
  intensity: {
    "Ø": "This Bloxian applies pressure so relentlessly that opponents cannot process one attack before the next arrives. Their offensive output is literally endless and without pause, overwhelming any defense.",
    "S": "This Bloxian maintains devastating pressure with virtually no openings for retaliation. Opponents are overwhelmed before they can mount any meaningful defense against the onslaught.",
    "A": "This Bloxian can sustain aggressive pressure throughout prolonged engagements, rarely giving opponents room to breathe. Their attack patterns are exhausting to defend against consistently.",
    "B": "This Bloxian applies significant combat pressure, often cornering opponents and controlling the flow of battle. They excel at keeping enemies on the defensive throughout the fight.",
    "C": "This Bloxian maintains consistent offensive pressure, making it difficult for opponents to find openings. They can push trained fighters onto their back foot effectively.",
    "D": "This Bloxian can apply pressure in combat, though their intensity fluctuates over time. They occasionally create opportunities through sustained aggression when focused.",
    "E": "This Bloxian has limited ability to maintain offensive pressure, often leaving gaps between attacks. Experienced fighters can exploit these openings with relative ease.",
    "F": "This Bloxian fails to apply meaningful pressure in combat. Opponents can easily dictate the pace and find openings to counterattack at will."
  },
  
  // ===== DURABILITY SUBCATEGORIES =====
  toughness: {
    "Ø": "This Bloxian is completely invulnerable to all forms of physical injury. No amount of force, regardless of magnitude, can harm their body in any way.",
    "S": "This Bloxian shrugs off cataclysmic explosions and impacts that would shatter mountains. Attacks capable of leveling cities leave them entirely unfazed and unharmed.",
    "A": "This Bloxian can withstand building-destroying impacts with only minor injuries. They recover from blows that would instantly kill most others without lasting damage.",
    "B": "This Bloxian can endure attacks powerful enough to demolish vehicles and break through walls. Serious injuries require tremendous force to inflict upon them.",
    "C": "This Bloxian can withstand significant blunt trauma and survive being thrown through structures. They recover from injuries that would hospitalize the average civilian.",
    "D": "This Bloxian is notably tougher than average, capable of taking hits that would incapacitate untrained individuals. They can fight through moderate pain without issue.",
    "E": "This Bloxian can tolerate slightly more punishment than the average civilian. They bruise less easily and recover somewhat faster from minor injuries and impacts.",
    "F": "This Bloxian is just as susceptible to injury as any other civilian. Standard attacks cause expected damage with no notable resistance to speak of."
  },
  vitality: {
    "Ø": "This Bloxian's body is immune to all degradation, illness, aging, and biological weakness. They exist in a state of perfect, eternal health that cannot be compromised.",
    "S": "This Bloxian can regenerate from catastrophic injuries in moments and is immune to virtually all diseases and toxins. Their body maintains peak condition indefinitely without fail.",
    "A": "This Bloxian recovers from severe injuries remarkably fast and shrugs off illnesses that would devastate others. Their immune system is nearly impenetrable, keeping them in constant good health.",
    "B": "This Bloxian heals significantly faster than normal and rarely falls ill. Serious conditions that would sideline others barely slow them down at all.",
    "C": "This Bloxian maintains excellent health and recovers from injuries and sickness faster than average. Most common ailments pass quickly without lasting effect.",
    "D": "This Bloxian has notably good health, fighting off minor illnesses easily and healing from injuries at an above-average rate. They stay healthy more often than not.",
    "E": "This Bloxian is slightly healthier than the average civilian, with a somewhat stronger immune system. Their recovery times are marginally faster than most.",
    "F": "This Bloxian has no enhanced vitality, being just as susceptible to illness and injury as any typical citizen. They heal and recover at normal rates."
  },
  thermostability: {
    "Ø": "This Bloxian is completely immune to all temperature extremes, from absolute zero to the heart of a star. Heat and cold are meaningless concepts to their body.",
    "S": "This Bloxian withstands temperatures that would vaporize steel or freeze matter solid instantly. Extreme heat and cold have no meaningful effect on them whatsoever.",
    "A": "This Bloxian can endure environments of intense heat or freezing cold that would quickly kill others. Industrial furnaces and arctic blizzards pose no threat to their wellbeing.",
    "B": "This Bloxian handles significant temperature extremes with minimal discomfort. They can operate in burning deserts or frozen tundras without special protection.",
    "C": "This Bloxian has strong tolerance for temperature variations, handling hot and cold environments that would distress most people. They adapt quickly to harsh climates.",
    "D": "This Bloxian can endure moderately extreme temperatures longer than civilians. They adapt to uncomfortable conditions with relative ease, though limits exist.",
    "E": "This Bloxian tolerates temperature extremes slightly better than average, though prolonged exposure still causes problems. They last longer than most in harsh conditions.",
    "F": "This Bloxian has no special resistance to temperature extremes. They require protection in harsh hot or cold environments just like any civilian."
  },
  esotolerance: {
    "Ø": "This Bloxian is completely immune to all esoteric hazards, including radiation, electricity, dimensional effects, and phenomena beyond comprehension. The strangest forces in existence pass through them harmlessly.",
    "S": "This Bloxian can withstand exposure to the most lethal hazards imaginable, including black hole radiation and cosmic-level energies. Nothing unconventional can harm them.",
    "A": "This Bloxian handles dangerous esoteric hazards like high radiation, powerful electrical currents, and exotic energies with ease. Hazards that would kill others barely register to them.",
    "B": "This Bloxian can tolerate significant exposure to electricity, radiation, and other advanced hazards that would severely harm most individuals. They shrug off dangers that require specialized protection.",
    "C": "This Bloxian has notable resistance to esoteric hazards, handling moderate doses of electricity and radiation without serious harm. Unconventional dangers are less threatening to them.",
    "D": "This Bloxian shows some resistance to unconventional hazards, tolerating minor electrical shocks and low radiation exposure better than average. They recover from such exposures relatively quickly.",
    "E": "This Bloxian has slight tolerance for esoteric hazards, recovering from minor exposures more quickly than civilians. However, significant exposure still poses real danger.",
    "F": "This Bloxian has no special resistance to esoteric hazards. Electricity, radiation, and similar dangers affect them just as they would any normal citizen."
  },
  
  // ===== AGILITY SUBCATEGORIES =====
  swiftness: {
    "Ø": "This Bloxian moves at speeds indistinguishable from instantaneous teleportation. Distance and space are meaningless concepts to their velocity, as they exist everywhere at once.",
    "S": "This Bloxian shatters the sound barrier many times over, moving faster than the eye can track. They cross vast distances in the blink of an eye, leaving shockwaves in their wake.",
    "A": "This Bloxian can match and exceed the speeds of racing vehicles, becoming a blur to onlookers. Catching them in pursuit is nearly impossible for most opponents.",
    "B": "This Bloxian can outpace most motorized vehicles and trained athletes with ease. Their sprinting speed is remarkable by any standard, making escape or pursuit trivial.",
    "C": "This Bloxian moves faster than trained athletes, maintaining impressive speeds that make them difficult to keep up with. They can close distances quickly in combat.",
    "D": "This Bloxian has speed comparable to professional athletes, outpacing most civilians with ease. They move noticeably faster than untrained individuals.",
    "E": "This Bloxian can sprint slightly faster than average civilians, showing modest improvement in movement speed. This gives them a minor advantage in foot pursuits.",
    "F": "This Bloxian moves no faster than an average civilian. Their speed offers no advantage in pursuit or escape, putting them at a disadvantage against faster opponents."
  },
  acceleration: {
    "Ø": "This Bloxian reaches maximum velocity instantaneously, with no perceivable transition from stationary to top speed. The laws of physics simply do not apply to their acceleration.",
    "S": "This Bloxian hits their maximum speed in fractions of a second, appearing to shift from still to blur without any buildup period. Their acceleration defies conventional understanding.",
    "A": "This Bloxian accelerates with breathtaking quickness, reaching full speed before most opponents can react to their movement. Their explosive starts are difficult to anticipate.",
    "B": "This Bloxian builds speed remarkably fast, able to launch into a full sprint with minimal windup. Their burst speed catches opponents off guard consistently.",
    "C": "This Bloxian accelerates quickly, reaching running speed faster than trained athletes. They respond to sudden situations with notable agility and quickness.",
    "D": "This Bloxian picks up speed faster than average, transitioning from walking to running with smooth efficiency. They get moving quicker than untrained individuals.",
    "E": "This Bloxian accelerates slightly faster than civilians, showing minor improvement in how quickly they reach their top speed. Explosive starts remain challenging for them.",
    "F": "This Bloxian accelerates slowly, taking noticeable time to build momentum. Quick starts are not their strength, leaving them vulnerable to faster opponents."
  },
  flexibility: {
    "Ø": "This Bloxian can contort their body in ways that defy physics and anatomy. They bend, twist, and maneuver through impossibly tight spaces without any limitation whatsoever.",
    "S": "This Bloxian is a master of body manipulation, able to dodge and weave through attacks from any direction. They navigate any environment flawlessly, no matter how cramped or chaotic.",
    "A": "This Bloxian handles multiple attackers with graceful evasion, slipping through tight spaces and awkward angles with practiced ease. Their movements are fluid and difficult to predict.",
    "B": "This Bloxian can effectively manage several opponents simultaneously, dodging and repositioning with impressive fluidity. They rarely get cornered or trapped in combat.",
    "C": "This Bloxian moves with notable nimbleness, weaving through attacks and obstacles better than most trained combatants. They adapt to confined spaces effectively.",
    "D": "This Bloxian has decent flexibility, able to dodge attacks and navigate obstacles that would trip up average civilians. They move with above-average coordination.",
    "E": "This Bloxian is slightly more flexible than average, able to duck and weave past simple attacks with modest success. Complex evasions remain challenging for them.",
    "F": "This Bloxian has average flexibility, struggling to maneuver in tight situations or evade multiple threats. They often get caught in positions they cannot escape."
  },
  endurance: {
    "Ø": "This Bloxian has truly limitless stamina that cannot be depleted by any means. They can maintain peak exertion indefinitely without rest, never knowing the meaning of fatigue.",
    "S": "This Bloxian has stamina reserves so vast they appear infinite. Days of continuous exertion leave them virtually unaffected, outlasting any opponent through sheer persistence.",
    "A": "This Bloxian can maintain intense physical activity for extended periods with minimal fatigue. Marathon efforts are their specialty, and they rarely need to pause for recovery.",
    "B": "This Bloxian has exceptional endurance, capable of prolonged exertion that would exhaust trained athletes. Rest is rarely urgent for them, even after hours of combat.",
    "C": "This Bloxian can sustain physical activity for hours without significant fatigue. They outlast most opponents in battles of attrition and recover quickly from exertion.",
    "D": "This Bloxian has above-average endurance, tiring more slowly than civilians during extended physical efforts. They can push through moderate exertion without much difficulty.",
    "E": "This Bloxian has slightly better stamina than average, lasting a bit longer before fatigue sets in. Extended activity still wears them down eventually.",
    "F": "This Bloxian has limited endurance and tires quickly. Extended physical activity rapidly depletes their energy, leaving them vulnerable."
  },
  
  // ===== PRECISION SUBCATEGORIES =====
  accuracy: {
    "Ø": "This Bloxian's accuracy is absolute and perfect, with every attack landing exactly where intended. Distance, conditions, and interference have no effect on their precision.",
    "S": "This Bloxian strikes with near-perfect precision, hitting targets under any conditions. Missing is essentially impossible for them, even against the most evasive opponents.",
    "A": "This Bloxian attacks with remarkable accuracy, consistently landing hits even on moving targets in chaotic environments. Their precision is a reliable asset in any fight.",
    "B": "This Bloxian has excellent accuracy, maintaining precision even under stress or in poor conditions. They rarely miss their mark when it matters most.",
    "C": "This Bloxian strikes with consistent accuracy, landing most attacks on target in standard combat situations. They can be counted on to hit what they aim for.",
    "D": "This Bloxian has decent accuracy, hitting targets more reliably than untrained combatants. Their aim is serviceable, though not exceptional.",
    "E": "This Bloxian shows slightly above-average accuracy, managing to hit targets somewhat more often than civilians. Precision under pressure remains inconsistent for them.",
    "F": "This Bloxian has poor accuracy and struggles to land attacks consistently. Their strikes often miss or hit unintended areas, limiting their effectiveness."
  },
  range: {
    "Ø": "This Bloxian can engage targets at any distance with perfect effectiveness. Range is a meaningless concept to their combat capabilities, as near and far are the same to them.",
    "S": "This Bloxian operates effectively at extreme distances that would be impossible for others. Their effective range spans horizons, striking with precision across miles.",
    "A": "This Bloxian excels at very long ranges, maintaining accuracy and power where most combatants would be helpless. Distance is an advantage for them, not an obstacle.",
    "B": "This Bloxian is comfortable at long range, engaging targets effectively from distances that would challenge skilled fighters. They lose little effectiveness as range increases.",
    "C": "This Bloxian handles moderate ranges well, fighting effectively at distances beyond typical melee range. They can threaten opponents who try to create space.",
    "D": "This Bloxian prefers closer engagements but can manage at modest distances. Extended range reduces their effectiveness, though they remain functional.",
    "E": "This Bloxian struggles at anything beyond close range, preferring to fight in immediate proximity to opponents. Distance quickly diminishes their threat level.",
    "F": "This Bloxian can only fight effectively at point-blank range. Any distance significantly hampers their combat ability, leaving them vulnerable to ranged opponents."
  },
  dexterity: {
    "Ø": "This Bloxian has absolute mastery over their motor control, capable of performing any physical action with perfect precision regardless of complexity. Their hands move with impossible accuracy and grace.",
    "S": "This Bloxian's fine motor control is unmatched, allowing them to perform impossibly delicate tasks under any conditions. Pressure and chaos do nothing to affect their steady hands.",
    "A": "This Bloxian handles even the most complex tools and weapons with expert precision. Their hands are incredibly steady and controlled, rarely if ever making mistakes.",
    "B": "This Bloxian has excellent dexterity, manipulating intricate mechanisms and weapons with smooth, practiced skill. They make difficult tasks look effortless.",
    "C": "This Bloxian shows good manual dexterity, handling most tools and weapons with competent precision. They rarely fumble or make careless errors.",
    "D": "This Bloxian has decent hand-eye coordination and motor control, performing tasks with above-average steadiness. They handle equipment better than untrained individuals.",
    "E": "This Bloxian has slightly better dexterity than average, showing modest improvement in fine motor tasks. Complex manipulations still pose some challenge.",
    "F": "This Bloxian has minimal dexterity, struggling with precise movements and detailed manual tasks. Delicate work often results in mistakes or fumbling."
  },
  reactivity: {
    "Ø": "This Bloxian's reflexes transcend time itself, allowing them to perceive and respond to threats before they even occur. Cause and effect bend around their reactions.",
    "S": "This Bloxian reacts at speeds that seem impossible, countering attacks faster than most can perceive them happening. Nothing catches them by surprise.",
    "A": "This Bloxian has lightning-fast reflexes, responding to danger almost instantaneously. Surprise attacks rarely catch them off guard, no matter how sudden.",
    "B": "This Bloxian's reactions are excellent, picking up on threats quickly and responding before most combatants can act. Their awareness in combat is impressive.",
    "C": "This Bloxian has sharp reflexes, noticing and responding to danger faster than trained fighters. They adapt to changing situations with notable speed.",
    "D": "This Bloxian has above-average reaction time, picking up on threats slightly faster than typical civilians. Their responses are quicker than most expect.",
    "E": "This Bloxian reacts slightly faster than average, with marginally improved response to sudden events. Quick threats still pose challenges for them.",
    "F": "This Bloxian has no enhanced reflexes. They react to danger at the same speed as any average civilian, often getting caught off guard."
  },
  
  // ===== INTELLIGENCE SUBCATEGORIES =====
  tactility: {
    "Ø": "This Bloxian possesses perfect combat awareness, knowing exactly what every opponent will do before they do it. Victory is inevitable when they take the field.",
    "S": "This Bloxian's tactical genius allows them to outthink opponents who vastly outclass them in raw power. They find winning strategies in impossible situations with uncanny consistency.",
    "A": "This Bloxian demonstrates exceptional combat intelligence, reading opponents and adapting strategies with remarkable skill. They exploit weaknesses others would never notice.",
    "B": "This Bloxian has high tactical awareness, consistently making smart decisions in combat and exploiting enemy weaknesses. They rarely fall for tricks or traps.",
    "C": "This Bloxian shows solid tactical thinking, making sound choices in most combat situations. They avoid obvious mistakes and capitalize on clear opportunities.",
    "D": "This Bloxian has decent combat sense, understanding basic tactics and applying them with moderate effectiveness. They handle straightforward fights competently.",
    "E": "This Bloxian has basic combat understanding, knowing enough to avoid the worst mistakes. They lack refined tactical skill and struggle against experienced opponents.",
    "F": "This Bloxian has no meaningful combat experience or tactical knowledge. They make poor decisions under pressure and are easily outmaneuvered."
  },
  wisdom: {
    "Ø": "This Bloxian is omniscient, possessing complete knowledge of all things past, present, and future. Nothing is unknown to them, and all mysteries are laid bare before their mind.",
    "S": "This Bloxian's intellect far exceeds almost all others, understanding concepts and making connections that seem impossible to lesser minds. They solve problems that would stump entire teams.",
    "A": "This Bloxian is a genius by any standard, grasping complex ideas quickly and retaining vast amounts of knowledge. Their intellect is a formidable asset in any situation.",
    "B": "This Bloxian is highly intelligent, excelling in academic and practical problem-solving with notable wisdom. They learn quickly and apply knowledge effectively.",
    "C": "This Bloxian is notably smart, demonstrating above-average reasoning and knowledge in most areas. They handle intellectual challenges better than most.",
    "D": "This Bloxian shows decent intelligence, learning and understanding things faster than the average civilian. They grasp new concepts with reasonable effort.",
    "E": "This Bloxian has slightly above-average intelligence, picking up concepts a bit faster than most. Complex ideas still require time and effort to fully understand.",
    "F": "This Bloxian has average intelligence consistent with a typical civilian. Complex concepts require extra effort and may elude them entirely."
  },
  foresight: {
    "Ø": "This Bloxian perceives all possible futures with perfect clarity, knowing exactly how every action will unfold across infinite timelines. The future holds no surprises for them.",
    "S": "This Bloxian plans many steps ahead with near-perfect accuracy, anticipating consequences and contingencies that would never occur to others. Their predictions border on prophetic.",
    "A": "This Bloxian excels at long-term planning, seeing likely outcomes far in advance and preparing accordingly. They position themselves for success well before opportunities arise.",
    "B": "This Bloxian plans several moves ahead effectively, considering consequences and positioning themselves for future advantages. They rarely get caught unprepared.",
    "C": "This Bloxian has good foresight, thinking ahead and preparing for likely developments in most situations. They anticipate problems before they become urgent.",
    "D": "This Bloxian considers future implications in general terms, though their planning lacks depth beyond the obvious. They handle predictable situations well enough.",
    "E": "This Bloxian has limited foresight, occasionally thinking ahead but often focusing on immediate concerns. Long-term planning is not their strong suit.",
    "F": "This Bloxian rarely considers future consequences, living largely in the moment with minimal planning. They are frequently caught off guard by predictable outcomes."
  },
  sanity: {
    "Ø": "This Bloxian's mind exists beyond conventional sanity, operating on a level where mental manipulation and psychological attacks are meaningless concepts. Their psyche is unbreakable and eternal.",
    "S": "This Bloxian possesses extraordinary mental stability, remaining composed under pressures that would shatter the minds of others. Psychological warfare is useless against them.",
    "A": "This Bloxian has exceptional mental fortitude, resisting psychological manipulation and maintaining clarity in extreme stress. They remain focused when others would crumble.",
    "B": "This Bloxian maintains strong mental stability, keeping composed under significant pressure and resisting most manipulation attempts. Their mind is difficult to shake.",
    "C": "This Bloxian has solid mental health, remaining stable in stressful situations and recognizing manipulation tactics. They handle psychological pressure better than most.",
    "D": "This Bloxian has decent mental stability, though extreme stress or skilled manipulation can affect their judgment. They cope reasonably well under normal pressure.",
    "E": "This Bloxian's mental stability is somewhat fragile, making them more susceptible to stress and manipulation than average. High-pressure situations affect their performance.",
    "F": "This Bloxian is mentally unstable or easily manipulated, struggling to maintain composure under pressure. They are vulnerable to psychological tactics and emotional distress."
  }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the category definition for a physical stat category key
 */
export function getPhysicalCategory(categoryKey: string): CategoryDefinition | undefined {
  return PHYSICAL_CATEGORIES.find(cat => cat.key === categoryKey);
}

/**
 * Get the subcategory definition for a physical stat subcategory key
 */
export function getPhysicalSubcategory(subcategoryKey: string): { category: CategoryDefinition; subcategory: CategoryDefinition["subcategories"][0] } | undefined {
  for (const category of PHYSICAL_CATEGORIES) {
    const subcategory = category.subcategories.find(sub => sub.key === subcategoryKey);
    if (subcategory) {
      return { category, subcategory };
    }
  }
  return undefined;
}

/**
 * Get the grade description for a physical stat
 */
export function getPhysicalStatDescription(statKey: string, grade: string): string {
  const descriptions = PHYSICAL_STAT_DESCRIPTIONS[statKey];
  if (!descriptions) {
    return `Grade ${grade} in ${statKey}`;
  }
  return descriptions[grade as keyof GradeDescriptions] || `Grade ${grade} in ${statKey}`;
}

/**
 * Get the stat definition (what the stat measures) for a physical stat
 */
export function getPhysicalStatDefinition(statKey: string): string {
  // Check if it's a category
  const category = getPhysicalCategory(statKey);
  if (category) {
    return category.description;
  }
  
  // Check if it's a subcategory
  const subcatResult = getPhysicalSubcategory(statKey);
  if (subcatResult) {
    return subcatResult.subcategory.description;
  }
  
  return "";
}

