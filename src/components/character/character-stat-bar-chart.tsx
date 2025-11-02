import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CharacterCombatStyleSwitcher } from "./character-combat-style-switcher";
import { CombatStyleOption } from "@/types/wiki-types";

interface StatGrade {
  label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
  value: number; // 0-7 for easier programming
}

interface CharacterStats {
  offense: StatGrade;
  defense: StatGrade;
  utility: StatGrade;
  potential: StatGrade;
}

interface CombatStats {
  strength: StatGrade;
  durability: StatGrade;
  agility: StatGrade;
  precision: StatGrade;
  intelligence: StatGrade;
  subcategories?: {
    penetration?: StatGrade;
    power?: StatGrade;
    intensity?: StatGrade;
    swiftness?: StatGrade;
    endurance?: StatGrade;
    flexibility?: StatGrade;
    accuracy?: StatGrade;
    reactivity?: StatGrade;
    dexterity?: StatGrade;
    tactility?: StatGrade;
    wisdom?: StatGrade;
    stability?: StatGrade;
    vitality?: StatGrade;
    toughness?: StatGrade;
    resistance?: StatGrade;
  };
}

interface CharacterStatBarChartProps {
  stats: CharacterStats | CombatStats;
  characterId?: string;
  abilityName?: string;
  className?: string;
  isPhysicalStats?: boolean;
  currentCombatStyle?: string;
  combatStyles?: CombatStyleOption[];
  onCombatStyleChange?: (styleId: string) => void;
}

const GRADE_VALUES = {
  "F": 0,
  "E": 1,
  "D": 2,
  "C": 3,
  "B": 4,
  "A": 5,
  "S": 6,
  "Ø": 7
} as const;

// Grade descriptions for each subcategory - FULL DESCRIPTIONS from StatisticInfoPage
const STAT_GRADE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  penetration: {
    "Ø": "This Bloxian's ability to injure others transcends all forms of defense, allowing attacks to connect with absolute power. They can bypass and ignore any and all lines of defense, no matter what conditions may be in place. If this Bloxian attacks a target, the injury that follows will be raw and in-full.",
    "S": "This Bloxian has no difficulty obliterating all known lines of defense, regardless of abilities or materials. Their raw strength enables them to always attack with maximum lethality, with no amount of Bloxite armor saving them.",
    "A": "This Bloxian can tear through the strongest of defenses with ease, even multi-layered levels of equipment and other abilities stacked into the mix. Bloxite-reinforced structures and armor may hold, but nothing below stands much of a chance.",
    "B": "This Bloxian can easily penetrate specialized equipment and abilities, shattering through lines of defense as they're cut like butter. At this stage, only the toughest lines of defense and extremely defensive-oriented abilities may resist the fine-tuned destruction this Bloxian can issue.",
    "C": "This Bloxian can bypass most standard materials, as well as medium-class armors formed of stronger metals such as iron and titanium. Their blows reverberate and often carry tremendous force, making penetration easy on most targets who aren't using advanced equipment or specialized abilities.",
    "D": "This Bloxian can bypass most low-end abilities as well as medium-class armor, including those formed of weaker materials such as stone and wood. Through focus and effort, flimsy armor formed of gold or other weaker metal may also be bypassed.",
    "E": "This Bloxian has above-average penetrating power, enabling them to bypass the weakest of barriers, or targets wearing cheap protective gear formed of wood-level material.",
    "F": "This Bloxian has no capabilities to penetrate the defenses of others by any means, at least beyond that of typical civilians."
  },
  power: {
    "Ø": "This Bloxian's raw strength is so immeasurably high that destroying entire Worlds (or even groups of Worlds at a time) is child's play. A flick of their finger could reshape entire portions of the Bloxiverse. A sigh could kill millions from the deathly winds that follow.",
    "S": "This Bloxian is capable of reshaping entire portions of land with minimal effort, waving their hand to obliterate large-scale cities or mountain ranges. Their lifting capacity allows them to manipulate entire islands of weight at a time as though it were a toy.",
    "A": "This Bloxian can level outposts or smaller cities in just a punch or two. Reinforced structures are trivial to destroy, ripped apart with their bare hands alone. They can take on the entire weight of tall buildings, throwing them like a spear.",
    "B": "This Bloxian's raw strength enables them to destroy entire buildings and other structures through their fists alone. They can perform remarkable feats, benchpressing vehicles with one hand and kicking boulders as if they were soccer balls. With effort, they can likely pry through reinforced structures if given the time to do so.",
    "C": "This Bloxian can manhandle larger and heavier objects such as motorcycles and small boulders. Through their strength, they can bring harm to most natural resources including wood, stone, and weaker metals with relative ease.",
    "D": "This Bloxian has strength which allows them to damage a majority of weaker materials, such as wood and stone. When pouring all of their strength into an attack, they may be able to dent weaker metals such as gold. Their lifting capacity enables them to handle larger and bulkier objects with relative ease.",
    "E": "This Bloxian has slightly above-average strength, giving them a small edge in hand-to-hand combat against civilians. With significant effort, they may be able to damage materials such as wood and brittle stone. They're capable of lifting a decent amount of weight, such as bulky rocks.",
    "F": "This Bloxian has no notable strength beyond a standard civilian. They struggle to bring harm to any others beyond their own level of strength, and have a limited lifting capacity."
  },
  intensity: {
    "Ø": "This Bloxian is impossibly efficient at applying unyielding pressure, capable of attacking continuously without any reprieve for the opponent. Their assault is perpetual and inescapable by all means.",
    "S": "This Bloxian can maintain constant and aggressive pressure with little to no openings for an enemy to retaliate. Escape becomes near-impossible without specialized abilities or another means of fleeing conflict, and even these methods will typically struggle.",
    "A": "This Bloxian can remain strong, consistent pressure throughout entire combat situations, forcing opponents to remain on high alert and play defensively. Fighting this Bloxian requires the enemy to carefully defend, and search for brief windows where they can finally strike back.",
    "B": "This Bloxian can apply significant pressure while engaged in combat, often cornering or locking opponents into tightly-knit combat where they maintain an upper hand consistently. Escape from this Bloxian remains possible, but difficult.",
    "C": "This Bloxian is moderately skilled at keeping pressure on their targets, often forcing them into combos or overwhelming them through strength alone.",
    "D": "This Bloxian is capable of applying some pressure in combat, though inconsistent or oftentimes easy to counter.",
    "E": "This Bloxian has limited skills necessary to maintain offensive pressure on a target, occasionally remaining consistent—but often struggling in the end.",
    "F": "This Bloxian fails to apply any pressure in combat, either due to their weakness, their style of combat, or their physique."
  },
  swiftness: {
    "Ø": "This Bloxian can achieve speeds comparable to that of teleportation, leaving vacuums behind that explode and compress anything nearby as they travel. If oxygen is present when they travel, it combusts from the friction they can generate by moving. Entire regions of the Bloxiverse can be crossed in the blink of an eye—a \"casual\" walk may mean travelling the entire known span of the Bloxiverse.",
    "S": "This Bloxian travels at excessive speeds that can shatter the sound barrier on a whim, quickly reaching velocities that can cover entire Worlds in mere minutes or seconds depending on the size.",
    "A": "This Bloxian can rapidly accelerate and match the speeds of sports cars and other specialized vehicles designed to travel extremely fast. Entire regions can be ran across with enough time.",
    "B": "This Bloxian can outrun most motorized vehicles when given enough time to build up to their maximum. Crossing large fields becomes trivial as most can be cleared in seconds.",
    "C": "This Bloxian is capable of quickly reaching and maintaining a fast pace that allows them to outrun manual vehicles and equipment such as bicycles. Navigating smaller cities is relatively easy to do on foot.",
    "D": "This Bloxian can achieve speeds comparable to that of a trained athlete, often requiring minimal time to build up their speeds.",
    "E": "This Bloxian can sprint and reach speeds above civilians, but can still be outpaced by vehicles and trained athletes.",
    "F": "This Bloxian isn't capable of reaching speeds beyond an average citizen, easily outpaced by stronger runners, vehicles, and those with abilities that enhance their mobility."
  },
  endurance: {
    "Ø": "This Bloxian has boundless stamina and endurance that physically cannot run dry. They constantly operate at peak physical capacity, and often do not require food, sleep, or any other form of sustenance.",
    "S": "This Bloxian essentially never runs dry of stamina so long as they manage themselves, effortlessly handling any physical tasks they are capable of. They may be able to last entire days without tiring, or tolerate extremely exhausting conditions for unhealthy lengths of time before collapsing.",
    "A": "This Bloxian's endurance is strong enough to tolerate running and sprinting without any noticeable impact on their energy or stamina. They can hold their breath for potentially hours, and navigate complex terrain for extremely long lengths of time before finally exhausting. They often need to sleep and eat less.",
    "B": "This Bloxian can handle cross-country journeys without much sleep or preparation, scaling the tallest cliffs and holding their breath underwater for multiple minutes.",
    "C": "This Bloxian can tolerate sprinting throughout entire marathons, or climbing mountains without breaking much of a sweat. Continuous or prolonged activity can still run their stamina reserves dry if they don't properly manage themselves.",
    "D": "This Bloxian has notable endurance allowing them to tolerate large-distance treks and journeys without tiring much. Hiking in difficult terrain or performing particularly stressful actions such as heavy lifting may still exhaust them after some time.",
    "E": "This Bloxian can tolerate decent-length sprints and excessive physical activity before eventually tiring and requiring a break.",
    "F": "This Bloxian has limited stamina, exhausting them from basic exercise or straining activities. They quickly become breathless when running short distances, and exhaust quickly."
  },
  flexibility: {
    "Ø": "This Bloxian can freely contort and warp their body to improbable extents, achieving new shapes or forms entirely. No shape or appearance is off-limits so long as they have the physical mass necessary to do so.",
    "S": "This Bloxian is a master contortionist who can quickly manipulate their body in a variety of ways to effortlessly avoid incoming enemy attacks, capable of weaving around melee weaponry and firearms with ease through the dislocation of limbs or temporary displacement of bone.",
    "A": "This Bloxian can comfortably handle and avoid the attacks of multiple enemies, effortlessly dodging most melee weaponry and trained fighters. They may be able to handle slower projectiles or single-shot firearms on a whim if they notice the enemy quickly enough.",
    "B": "This Bloxian can tolerate multiple close-quarters opponents at once, and manipulate their body with extreme control to dodge and weave around complex attacks. Though rarely, they may be able to avoid single-shot firearms if they are made aware of the enemy beforehand.",
    "C": "This Bloxian can tolerate multiple fighters at once, expertly manipulating their body to weave and avoid close-quarters combat. They can tolerate faster melee weaponry most of the time, but may struggle against multiple weapons at once.",
    "D": "This Bloxian can efficiently weave and maneuver against skilled fistfighters and kickboxers, and may be able to predict and dodge slower melee weapons.",
    "E": "This Bloxian can bend and manipulate themselves to avoid simple attacks such as punches and kicks. They'll still struggle against weapons.",
    "F": "This Bloxian lacks any flexibility beyond the average civilian, unable to perform advanced stretches or maneuvers."
  },
  accuracy: {
    "Ø": "This Bloxian's accuracy is absolute, allowing improbable attacks to land with flawless execution. They can strike freely, remaining ignorant of any conditions, distance or complexity. Obstacles are irrelevant to them.",
    "S": "This Bloxian can handle any weapons, regardless of their typing or range. Their attacks strike with the utmost precision, nailing their targets almost without fail even in extremely hostile conditions. Only specialized abilities and equipment can hinder their ability to issue these definitive strikes.",
    "A": "This Bloxian can attack while handling both melee and ranged with incredible accuracy. Their attacks strike with incredible precision, landing almost always and only struggling against the nimblest of opponents or those who have defensive abilities enabling them to evade.",
    "B": "This Bloxian has remarkable accuracy with most weaponry, allowing them to remain precise and dangerous even in unfortunate conditions or situations. They can handle most melee encounters, and operate ranged weapons with remarkable accuracy.",
    "C": "This Bloxian can consistently manage to strike most targets within a moderate range, handling firearms with notable precision above casuals and the unexperienced. Stressful situations or other factors may hinder their capabilities.",
    "D": "This Bloxian can maintain decent accuracy in hand-to-hand combat, though quick opponents or tough conditions can still easily overwhelm their senses and have them struggling to land a hit.",
    "E": "This Bloxian can somewhat handle close-range encounters with slight accuracy and edge above untrained combatants, but will struggle with most longer-ranged weaponry and long handheld weapons.",
    "F": "This Bloxian is either extremely inaccurate, or lacks any control beyond a civilian. Their attacks are thrown without much care or precision. Alternatively, they may simply be too explosive to control."
  },
  reactivity: {
    "Ø": "This Bloxian's reflexes transcend time, allowing them to initiate countermeasures at speeds beyond comprehension. They react with absolute certainty, knowing and bringing an end to almost any threat before it even has a chance to become a threat in the first place.",
    "S": "This Bloxian can react at improbable speeds, often forming countermeasures and planning multiple steps ahead to ensure an upper hand in combat. Sneak attacks are nearly impossible, as it (alongside any other possibilities) will have already been thought of and prevented before it could have even been enacted.",
    "A": "This Bloxian can effortlessly react thanks to their extremely strong senses and quick thinking, avoiding complex attacks without breaking a sweat. They can handle multiple targets at once, and even find ways to handle normally-unavoidable injuries, such as gunfire or offensive-oriented abilities.",
    "B": "This Bloxian's reflexes are excellent, capable of reacting to almost all common forms of attack with quick and effective countermeasures. They may be able to react to normally-unavoidable damage, such as quick projectiles or certain offensive abilities, allowing them to negate or avoid the attack.",
    "C": "This Bloxian has strong senses, allowing them to respond and counteract most threats on a whim. They are difficult to catch by surprise, without lengthy setups to create a perfect ambush that is beyond their physical ability to counter.",
    "D": "This Bloxian has above-average reflexes, allowing them to react quickly to slower attacks and subtly pick up on approaching dangers. Most sneak attacks attempted by unarmed assailants will fail, unless they have a quicker means of attacking—such as a firearm.",
    "E": "This Bloxian has improved senses and reflexes allowing them to handle basic threats and mitigate simpler surprise attacks.",
    "F": "This Bloxian lacks any enhanced reflexes, making them an easy target against almost all forms of attack. They remain vulnerable and unaware of danger just as any civilian would be."
  },
  dexterity: {
    "Ø": "This Bloxian's ability to control their body with efficiency, accuracy, and precision is absolutely unmatched, capable of enacting any physical action with perfect steadiness, regardless of any conditions, such as stress or environmental dangers. So long as they are physically capable of performing the action they wish to perform, it will be done flawlessly—guaranteed.",
    "S": "This Bloxian's dexterity is world-class, allowing them to perform seemingly-impossible feats that would normally be deemed unachievable, such as performing heart surgery in a crashing helicopter as if it were just another tuesday. Their prowess and skillset is not to be taken lightly.",
    "A": "This Bloxian can handle advanced tools and weapons with extreme precision and accuracy, even in terrible conditions or when suffering from extreme injuries. They maintain consistent effectiveness that makes them efficient and exceptional at almost anything they do.",
    "B": "This Bloxian has remarkable handling of most advanced tools and weaponry, enabling them to operate most with accuracy and precision. They can shrug off a majority of (if not all) stress, maintaining consistent quality with their skills even in adverse conditions. Physical injuries may reduce their capabilities, but it would take significant wounds to do so.",
    "C": "This Bloxian has good handling of most tools and weapons, allowing them to keep their hand steady and their movements clear in pressing situations. They are likely resistant to stress, but injuries or other physical factors may inhibit their motor skills.",
    "D": "This Bloxian has decent motor control and handling, capable of operating most standard tools and weaponry with efficiency in combat. Stress may reduce their effectiveness.",
    "E": "This Bloxian can handle simpler tools and weapons with notable accuracy, though their skillset may crumble under stress, anxiety, or other negative conditions.",
    "F": "This Bloxian has minimal dexterity and motor control, fumbling tasks just as easily as an ordinary person. Their handiwork and movements will degrade quickly under stress or unfavorable conditions."
  },
  tactility: {
    "Ø": "This Bloxian has omniscient awareness of those they fight, knowing every possible outcome and potential countermeasure instantaneously. They can never be surprised or outmaneuvered tactically, always remaining multiple steps ahead and outplaying anyone when it comes to trials of the mind.",
    "S": "This Bloxian can solve and mitigate combative problems that would overwhelm even the most advanced fighters, boasting an incredible and nearly-unmatched capacity to predict, adapt, and exploit the weaknesses of their enemy. They are a masterful tactician, boasting near-perfect strategic awareness at all times.",
    "A": "This Bloxian has renowned combat intelligence that allows them to perform large-scale strategic thinking on the fly. They are an incredible tactician, carefully plotting and keeping a keen eye on their targets to quickly and accurately create countermeasures to defeat their enemies. They remain two steps ahead as often as they can, to hold a combative edge against opponents stronger than them.",
    "B": "This Bloxian's combat intelligence is very high, allowing them to quickly adapt themselves to a variety of situations, planning carefully and executing thought-out plans on a whim. They can analyze most opponents to form the best courses of action and formulate counteractions to their strengths.",
    "C": "This Bloxian has intelligence which enables them to think quickly and tactfully, picking up on advanced opponents and adapting their strategy mid-combat with slight effort. Through combat and trial and error, they can eventually deduce the weaknesses of an enemy and exploit them to attain victory.",
    "D": "This Bloxian's tactical capacity grants them decent intelligence in combat, forming solutions to problems over the course of a battle. They can figure out weaknesses of their enemies when given enough time to think, though complex abilities or powerful opponents may hinder their capacity to understand.",
    "E": "This Bloxian has a slight understanding of combat, allowing them to handle equally-matched opponents and plan accordingly to their enemy.",
    "F": "This Bloxian has no combat experience whatsoever and will underperform heavily against essentially any opponents."
  },
  wisdom: {
    "Ø": "This Bloxian is omniscient and all-knowing of any information that has been known, is known, or will be known. No subject, regardless of its nature or complexity, can and will be understood if it is not already. It is impossible to withhold information of any kind.",
    "S": "This Bloxian's intellect far surpasses almost all others, making them a prodigy. Everything that realistically can be learnt, is either already known or will soon come to be understood. They master new fields incredibly quickly so long as they are physically able, and are incredibly well-versed and wise in all walks of life.",
    "A": "This Bloxian is nearly a genius in terms of their intelligence, with almost no fields or studies remaining impossible to learn or understand. They bear advanced reasoning and intellect, thoroughly educated on a variety of different subjects, and never struggling to learn something new.",
    "B": "This Bloxian has lots of wisdom and intellect to spare, capable of solving complex problems and making logical deductions and solutions with relative ease. They quickly pick up on new skills, and have little difficulty learning new things beyond their comfort zone.",
    "C": "This Bloxian is decently intelligent and can understand increasingly-complex concepts, coming to reason through their advanced problem-solving skills. They often master new fields quicker than most, and make out to be very wise.",
    "D": "This Bloxian has notably high intelligence compared to most Bloxians, capable of understanding advanced problems and concepts. They're often wise and full of clarity for their age.",
    "E": "This Bloxian displays notable intelligence and understandings in life, capable of thinking quickly and acting resourcefully. Stressful situations may cause them to lock up.",
    "F": "This Bloxian shows intelligence consistent with (or below) the average IQ of a civilian, capable of basic problem solving and reasoning."
  },
  stability: {
    "Ø": "This Bloxian's mind exists beyond the concepts of sanity and insanity, operating on a level of consciousness that transcends all conventional understanding. Their mental fortitude is absolute and impenetrable, rendering them completely immune to any and all forms of manipulation, deception, or mental intrusion regardless of the methods or abilities employed. No force, ability, or entity can compromise their mind.",
    "S": "This Bloxian possesses extraordinary mental stability and clarity, maintaining perfect composure even when subjected to extreme psychological torture, trauma, or stress. Their mind is a fortress that resists virtually all forms of manipulation, trickery, and mental abilities. Only the most powerful reality-warping abilities might have a chance, though even those would require tremendous effort.",
    "A": "This Bloxian has exceptional mental fortitude and remarkable emotional control, remaining calm and rational even in the most dire and stressful circumstances. They can easily identify and resist most forms of manipulation, deception, and mental intrusion. Advanced mental abilities may affect them, but they'll likely recognize the attempt and work to counteract it.",
    "B": "This Bloxian maintains strong mental stability and composure across most situations, rarely losing their cool or breaking under pressure. They can identify and resist common forms of manipulation and trickery with relative ease. More sophisticated mental manipulation or abilities may affect them, though they'll often realize something is amiss.",
    "C": "This Bloxian has good mental stability and generally maintains their composure in stressful situations. They can resist basic manipulation attempts and recognize obvious deception. More advanced or subtle manipulation techniques may succeed, especially when combined with abilities or prolonged exposure.",
    "D": "This Bloxian maintains decent mental stability under normal circumstances, though stressful situations may cause them to falter. They remain susceptible to skilled manipulation and deception, particularly when caught off-guard or under duress. Mental abilities and sustained psychological pressure can compromise their judgment.",
    "E": "This Bloxian has fragile mental stability and struggles to maintain composure when under significant stress or pressure. They are easily manipulated through common tactics such as lies, guilt-tripping, or emotional exploitation. Their judgment becomes clouded quickly in high-stress situations.",
    "F": "This Bloxian is either severely mentally unstable or pathetically easy to manipulate—often both. They may suffer from delusions, paranoia, or other mental conditions that severely impair their judgment. Even the most basic manipulation tactics work effortlessly on them, and they can be tricked or deceived with minimal effort."
  },
  vitality: {
    "Ø": "This Bloxian's body is completely immune to all forms of physical degradation, illness, or aging. Their natural health cannot be diminished by any means, nor can any substances or materials harm them in any way.",
    "S": "This Bloxian can regenerate from most injuries in record times, and ignore the effects of almost all illnesses and toxic materials, including poisons. They may entirely halt aging if they remain in good health, or age at exceptionally slow rates that are practically unnoticeable.",
    "A": "This Bloxian has exceptional vitality, recovering quickly from fatal injuries at impressively fast speeds, whilst shrugging off most illnesses, poisons, and other toxic contaminants. They may age slower by a significantly reduced rate compared to other Bloxians.",
    "B": "This Bloxian's body is incredibly healthy, capable of withstanding serious conditions such as blood loss, infection, and stronger illnesses. They can resist weaker poisons almost entirely, as well as most toxic substances. This Bloxian may age slightly slower than their peers.",
    "C": "This Bloxian is remarkably healthy across the board, shrugging off most illnesses and ailments due to a strong immune system and healthy organs. They may be able to tolerate weaker poisons and other toxic substances, but remain vulnerable to overexposure.",
    "D": "This Bloxian has notably high vitality, often tolerating minor ailments better than the average civilian. Disease is less effective against them, though they remain just as susceptible to stronger illnesses and poisons.",
    "E": "This Bloxian's health is in good condition and rests above the average civilian, but they remain vulnerable to illnesses and injury.",
    "F": "This Bloxian is no healthier than a typical citizen, vulnerable to all forms of poison, disease, and natural processes such as aging."
  },
  toughness: {
    "Ø": "This Bloxian is completely and wholly invulnerable to any and all physical forms of injury. No amount or intensity of incoming damage could incapacitate them, nor scratch or lower the integrity of their body in any way.",
    "S": "This Bloxian shrugs off cataclysmic explosions that could shatter or melt mountains, sustaining minimal injuries. No standard weapons—regardless of their strength—pose any threat to them. Extremely powerful firearms or large-scale railguns may deal significant damage, though it would require tremendous effort.",
    "A": "This Bloxian can tolerate ground-trembling impacts that could eviscerate reinforced buildings or portions of cities, sustaining only minor injuries. Stronger firearms and blunt force trauma is significantly ineffective, and the skin of this Bloxian essentially cannot be cut. Only the strongest of firearms can penetrate their skin, let alone their internal muscles.",
    "B": "This Bloxian can remain composed when faced with attacks capable of destroying smaller buildings, sustaining only minor injuries. Their tough muscles can resist weaker firearms, almost all standard blunt weaponry, as well as most blades.",
    "C": "This Bloxian can withstand being tossed through weaker structures formed of wood, and shrug off smaller cuts and wounds. Blunt force trauma issued by standard weapons is ineffective at injuring them.",
    "D": "This Bloxian is tough enough to withstand blunt force for longer periods of time, but may remain susceptible to being cut by sharp knives, or impaled. They only bruise from extremely rough landings or impacts.",
    "E": "This Bloxian's body can tolerate injury better than most, preventing them from being cut or bruised as easily. They remain just as vulnerable to most basic weaponry.",
    "F": "This Bloxian is just as susceptible to injury as any other civilian, easily injured by common accidents including falls, bumps, etc."
  },
  resistance: {
    "Ø": "This Bloxian is completely immune and incapable of being affected by environmental hazards, regardless of type or intensity. No natural threat poses any feasible harm to them.",
    "S": "This Bloxian, on top of handling almost all typical hazards seen in the environment, they may be able to tolerate exceptionally lethal hazards, such as the rupturing gravity produced by black holes.",
    "A": "This Bloxian can likely withstand extreme temperatures and most natural hazards such as radiation or electricity. This can be done with relative ease, perhaps not even noticing the danger at all.",
    "B": "This Bloxian can withstand most temperatures, shrugged off with minimal effort. Advanced hazards such as radiation and electricity can likely be tolerated in large quantities.",
    "C": "This Bloxian likely has strong tolerance towards one or more natural hazards, and may be able to handle advanced hazards including electricity and radiation.",
    "D": "This Bloxian can tolerate most standard environments, ignoring the bitter cold or the sweltering heat. Alternatively (or additionally), they may be resistant to other esoteric hazards, such as radiation.",
    "E": "This Bloxian may tolerate extreme environments for longer, but not forever. Without equipment or protection, they will inevitably fall victim to harsh climates.",
    "F": "This Bloxian cannot tolerate any environmental hazards without special protection, making them susceptible to extremely hot and extremely cold climates."
  }
};

// Check if stats is CombatStats (5 stats) or CharacterStats (4 stats)
function isCombatStats(stats: CharacterStats | CombatStats): stats is CombatStats {
  return 'strength' in stats;
}

const PHYSICAL_SUBCATEGORIES = [
  // Strength subcategories (Offense)
  { key: 'power', label: 'Power', category: 'Strength', stat: 'strength' },
  { key: 'penetration', label: 'Penetration', category: 'Strength', stat: 'strength' },
  { key: 'intensity', label: 'Intensity', category: 'Strength', stat: 'strength' },
  // Durability subcategories (Defense)
  { key: 'toughness', label: 'Toughness', category: 'Durability', stat: 'durability' },
  { key: 'vitality', label: 'Vitality', category: 'Durability', stat: 'durability' },
  { key: 'resistance', label: 'Resistance', category: 'Durability', stat: 'durability' },
  // Agility subcategories
  { key: 'swiftness', label: 'Swiftness', category: 'Agility', stat: 'agility' },
  { key: 'endurance', label: 'Endurance', category: 'Agility', stat: 'agility' },
  { key: 'flexibility', label: 'Flexibility', category: 'Agility', stat: 'agility' },
  // Precision subcategories
  { key: 'accuracy', label: 'Accuracy', category: 'Precision', stat: 'precision' },
  { key: 'dexterity', label: 'Dexterity', category: 'Precision', stat: 'precision' },
  { key: 'reactivity', label: 'Reactivity', category: 'Precision', stat: 'precision' },
  // Intelligence subcategories
  { key: 'tactility', label: 'Tactility', category: 'Intelligence', stat: 'intelligence' },
  { key: 'wisdom', label: 'Wisdom', category: 'Intelligence', stat: 'intelligence' },
  { key: 'stability', label: 'Stability', category: 'Intelligence', stat: 'intelligence' }
];

const MAIN_CATEGORIES = [
  { 
    name: 'Strength', 
    description: "Measures a character's offensive capabilities through physical power and combat effectiveness.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Strength').map(subcat => ({
      ...subcat,
      description: {
        power: "The raw physical potential of a Bloxian, as well as their lifting capacity.",
        penetration: "The amount of armor or other lines of defense that a Bloxian can penetrate with their attacks.",
        intensity: "How relentless and pressuring a Bloxian is when in combat."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Durability', 
    description: "Represents a character's defensive capabilities and resistance to damage.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Durability').map(subcat => ({
      ...subcat,
      description: {
        toughness: "The amount and intensity of physical injuries a Bloxian can sustain before becoming incapacitated.",
        vitality: "The overall physical health of a Bloxian, accounting for their fitness and any conditions they may have.",
        resistance: "How well a Bloxian is able to tolerate harsh environmental conditions and hazards before suffering from their effects."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Agility', 
    description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Agility').map(subcat => ({
      ...subcat,
      description: {
        swiftness: "How quickly a Bloxian can move, as well as how quickly they can reach that speed.",
        endurance: "The amount of general stamina a Bloxian has, as well as how quickly they burn through it.",
        flexibility: "How easily and gracefully a Bloxian can weave, bend, and maneuver themselves through fast or complicated attacks."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Precision', 
    description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Precision').map(subcat => ({
      ...subcat,
      description: {
        accuracy: "How good a Bloxian is at connecting their attacks, especially when attacking from a distance.",
        dexterity: "A Bloxian's motor control, primarily how steady and quick their hands are, especially under stress.",
        reactivity: "How sharp a Bloxian's reflexes are, and how good they are at counteracting with their reflexes."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Intelligence', 
    description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Intelligence').map(subcat => ({
      ...subcat,
      description: {
        tactility: "How intelligent a Bloxian is in combat situations, including their ability to think quickly, plan ahead, and remain cool under pressure.",
        wisdom: "The general intelligence and clarity of Bloxians, specifically outside of combat situations.",
        stability: "How mentally sane or stable a Bloxian is, including how resistant they are to mental manipulation."
      }[subcat.key] || ""
    }))
  }
];

export function CharacterStatBarChart({ 
  stats, 
  characterId, 
  abilityName, 
  className,
  isPhysicalStats = false,
  currentCombatStyle,
  combatStyles,
  onCombatStyleChange
}: CharacterStatBarChartProps) {
  const isCombat = isCombatStats(stats);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Check if current combat style should pulse between white and purple
  const shouldPulse = isPhysicalStats && 
    (currentCombatStyle === "chronipulation-mag-num" || 
     currentCombatStyle === "chronipulation-amplification-gauntlet");

  // Get color class
  const getChartColorClass = () => {
    if (isPhysicalStats) {
      return shouldPulse 
        ? "stat-chart-physical-white stat-chart-pulse-purple" 
        : "stat-chart-physical-white";
    }
    if (characterId === "vortex-a-steele") {
      return "stat-chart-vortex";
    }
    if (characterId === "caesar-bloxwright") {
      return "stat-chart-caesar";
    }
    return "stat-chart-default";
  };

  // Get default combat style (first style or "standard")
  const defaultCombatStyle = useMemo(() => {
    if (!combatStyles || combatStyles.length === 0) return null;
    return combatStyles.find(style => style.id === "standard") || combatStyles[0];
  }, [combatStyles]);

  // Calculate stat differences between current and default combat style
  const getStatDifference = useMemo(() => {
    if (!isCombat || !isPhysicalStats || !defaultCombatStyle || !currentCombatStyle || currentCombatStyle === defaultCombatStyle.id) {
      return null;
    }

    const defaultStats = defaultCombatStyle.combatStats as CombatStats;
    const currentStats = stats as CombatStats;

    const getStatValue = (stat: StatGrade | undefined): number => stat?.value ?? 0;
    const getStatLabel = (stat: StatGrade | undefined): string => stat?.label ?? "F";

    const differences: Record<string, { diff: number; fromLabel: string; toLabel: string }> = {};

    // Compare main category stats
    const mainCategories = ['strength', 'durability', 'agility', 'precision', 'intelligence'] as const;
    mainCategories.forEach(category => {
      const defaultValue = getStatValue(defaultStats[category]);
      const currentValue = getStatValue(currentStats[category]);
      if (defaultValue !== currentValue) {
        differences[category] = {
          diff: currentValue - defaultValue,
          fromLabel: getStatLabel(defaultStats[category]),
          toLabel: getStatLabel(currentStats[category])
        };
      }
    });

    // Compare subcategory stats
    const allSubcategories = [
      'penetration', 'power', 'intensity',
      'toughness', 'vitality', 'resistance',
      'swiftness', 'endurance', 'flexibility',
      'accuracy', 'dexterity', 'reactivity',
      'tactility', 'wisdom', 'stability'
    ] as const;

    allSubcategories.forEach(subcatKey => {
      const defaultSubcat = defaultStats.subcategories?.[subcatKey];
      const currentSubcat = currentStats.subcategories?.[subcatKey];
      
      // Get effective values (use main category if subcategory doesn't exist)
      const defaultMainCategory = subcatKey === 'penetration' || subcatKey === 'power' || subcatKey === 'intensity' ? 'strength' :
                                 subcatKey === 'toughness' || subcatKey === 'vitality' || subcatKey === 'resistance' ? 'durability' :
                                 subcatKey === 'swiftness' || subcatKey === 'endurance' || subcatKey === 'flexibility' ? 'agility' :
                                 subcatKey === 'accuracy' || subcatKey === 'dexterity' || subcatKey === 'reactivity' ? 'precision' :
                                 'intelligence';
      
      const defaultValue = getStatValue(defaultSubcat || defaultStats[defaultMainCategory]);
      const currentValue = getStatValue(currentSubcat || currentStats[defaultMainCategory]);
      
      if (defaultValue !== currentValue) {
        differences[subcatKey] = {
          diff: currentValue - defaultValue,
          fromLabel: getStatLabel(defaultSubcat || defaultStats[defaultMainCategory]),
          toLabel: getStatLabel(currentSubcat || currentStats[defaultMainCategory])
        };
      }
    });

    return Object.keys(differences).length > 0 ? differences : null;
  }, [isCombat, isPhysicalStats, defaultCombatStyle, currentCombatStyle, stats]);

  // Get stat value for a subcategory
  const getSubcategoryStat = (subcatKey: string, mainCategoryStat: StatGrade): StatGrade => {
    if (!isCombat) return mainCategoryStat;
    const subcategoryStats = (stats as CombatStats).subcategories;
    const subcategoryStat = subcategoryStats?.[subcatKey as keyof typeof subcategoryStats];
    return subcategoryStat || mainCategoryStat;
  };

  // Render a single stat bar
  const renderStatBar = (label: string, stat: StatGrade, description?: string, gradeDescription?: string, isSubcategory: boolean = false, statKey?: string) => {
    const statValue = GRADE_VALUES[stat.label];
    const barWidth = `${(statValue / 7) * 100}%`;
    
    // Get stat difference if available
    const statDiff = statKey && getStatDifference ? getStatDifference[statKey] : null;
    
    return (
      <div className={cn("flex flex-col", isSubcategory ? "ml-4 gap-1" : "gap-1.5")}>
        <div className={cn("flex items-center justify-between", isPhysicalStats ? "text-sm" : "text-xs")}>
          <div className={cn("flex flex-col", isPhysicalStats ? "gap-1" : "gap-0")}>
            <span 
              className={cn(
                "font-medium",
                isSubcategory 
                  ? (isPhysicalStats ? "text-sm" : "text-xs")
                  : (isPhysicalStats ? "font-semibold text-base" : "font-semibold text-xs")
              )}
              style={{
                color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
              }}
            >
              {label}
            </span>
            {description && (
              <span 
                className={cn(
                  "leading-tight opacity-70",
                  isPhysicalStats ? "text-xs" : "text-[10px]"
                )}
                style={{
                  color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                  textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)' : undefined
                }}
              >
                {description}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {statDiff && (
              <div className={cn(
                "flex items-center gap-1 rounded border",
                isPhysicalStats 
                  ? "text-xs font-semibold px-2 py-1" 
                  : "text-[10px] font-semibold px-1.5 py-0.5",
                statDiff.diff > 0 
                  ? "bg-green-500/30 border-green-400/50 text-green-300" 
                  : "bg-red-500/30 border-red-400/50 text-red-300",
                isPhysicalStats && "drop-shadow-sm"
              )}>
                {statDiff.diff > 0 ? (
                  <TrendingUp className={isPhysicalStats ? "h-4 w-4" : "h-3 w-3"} />
                ) : (
                  <TrendingDown className={isPhysicalStats ? "h-4 w-4" : "h-3 w-3"} />
                )}
                <span>
                  {statDiff.diff > 0 ? '+' : ''}{statDiff.diff}
                </span>
              </div>
            )}
            <span 
              className={cn(
                "font-bold",
                isPhysicalStats ? "text-base" : "text-sm"
              )}
              style={{
                color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
              }}
            >
              {stat.label}
            </span>
          </div>
        </div>
        <div className={cn("bg-muted/30 rounded-full overflow-hidden", isPhysicalStats ? "h-3" : "h-2")}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              shouldPulse ? "bg-current" : (isPhysicalStats ? "bg-white" : "bg-primary")
            )}
            style={{
              width: barWidth,
              opacity: shouldPulse ? undefined : (isPhysicalStats ? 0.9 : undefined)
            }}
          />
        </div>
        {gradeDescription && (
          <span 
            className={cn(
              "leading-relaxed opacity-60 italic mt-1.5",
              isPhysicalStats ? "text-xs" : "text-[9px] leading-tight"
            )}
            style={{
              color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
              textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)' : undefined
            }}
          >
            {gradeDescription}
          </span>
        )}
      </div>
    );
  };

  if (!isCombat) {
    // For non-combat stats (ability stats), render simple bar chart
    return (
      <div className={cn("flex justify-center items-center p-4", className)}>
        <div className={cn(
          "bg-card/80 backdrop-blur-sm rounded-2xl p-6 border stat-chart-container w-full max-w-md",
          getChartColorClass()
        )}>
          <h3 className="text-xl font-bold mb-6 text-center stat-chart-title">
            {abilityName ? `${abilityName} Statistics` : "Ability Statistics"}
          </h3>
          <div className="space-y-4">
            {Object.entries(stats).map(([key, stat]) => (
              <div key={key}>
                {renderStatBar(key.charAt(0).toUpperCase() + key.slice(1), stat)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center items-center p-4", className)}>
      <div 
        className={cn(
          "bg-card/80 backdrop-blur-sm rounded-2xl border stat-chart-container w-full max-w-4xl",
          isPhysicalStats ? "p-8" : "p-6",
          getChartColorClass()
        )}
      >
        {/* Title with help icon and combat style switcher */}
        <div className={`flex flex-col gap-4 mb-6 ${shouldPulse ? 'pulse-container' : ''}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2 flex-1">
              <h3 
                className={`text-xl font-bold text-center stat-chart-title ${isPhysicalStats ? 'physical-stats-title' : ''}`}
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  letterSpacing: '0.025em',
                  ...(shouldPulse ? {
                    color: 'currentColor'
                  } : (isPhysicalStats ? { 
                    color: '#ffffff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                  } : {}))
                }}
              >
                Physical Statistics
              </h3>
              {isPhysicalStats && (
                <TooltipProvider>
                  <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="flex-shrink-0"
                        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                      >
                        <HelpCircle 
                          className="h-5 w-5 no-pulse"
                          style={{
                          color: '#ffffff',
                          stroke: '#ffffff',
                          fill: 'none',
                          filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))',
                          animation: 'none'
                        }}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <p className="text-sm leading-relaxed">
                        By default, physical statistics do <strong>NOT</strong> account for the ability of a character if they have one. This is only their raw physical potential!
                        
                        <br /><br />
                        
                        Certain scenarios or combat styles that incorporate a character's ability may make this incorrect, please be aware!
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {isPhysicalStats && combatStyles && combatStyles.length > 1 && (
              <div className="flex-shrink-0 min-w-0 flex-1 max-w-xs relative">
                <CharacterCombatStyleSwitcher
                  combatStyles={combatStyles}
                  currentStyle={currentCombatStyle || combatStyles[0].id}
                  onStyleChange={onCombatStyleChange || (() => {})}
                  align="right"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Bar Chart */}
        <div className={cn("flex flex-col", isPhysicalStats ? "gap-6" : "gap-4")}>
          {MAIN_CATEGORIES.map((category, index) => {
            const mainCategoryStat = stats[category.name.toLowerCase() as keyof CombatStats] as StatGrade;
            
            return (
              <div key={category.name}>
                {/* Divider between categories (not before first) */}
                {index > 0 && (
                  <div 
                    className={cn(
                      "h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50",
                      isPhysicalStats ? "my-6" : "my-4"
                    )}
                    style={{
                      backgroundImage: isPhysicalStats 
                        ? 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)'
                        : undefined
                    }}
                  />
                )}
                <div className={cn("space-y-2", isPhysicalStats && "space-y-3")}>
                        {/* Main Category Label */}
                        <div className={cn(
                          "flex flex-col border-b border-border/50",
                          isPhysicalStats ? "gap-1 pb-2" : "gap-0.5 pb-1.5"
                        )}>
                          <div className="flex items-center gap-2">
                            <h4 
                              className={cn(
                                "font-extrabold",
                                isPhysicalStats ? "text-lg" : "text-sm"
                              )}
                              style={{
                                color: shouldPulse ? 'currentColor' : (isPhysicalStats ? '#ffffff' : undefined),
                                textShadow: isPhysicalStats ? '1px 1px 2px rgba(0, 0, 0, 0.6)' : undefined
                              }}
                            >
                              {category.name}
                            </h4>
                          </div>
                  {category.description && (
                    <p 
                      className={cn(
                        "leading-tight opacity-70",
                        isPhysicalStats ? "text-sm" : "text-[10px]"
                      )}
                      style={{
                        color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                        textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)' : undefined
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>
                
                {/* Subcategory Bars */}
                <div className={cn("pl-2", isPhysicalStats ? "space-y-3" : "space-y-2")}>
                  {category.subcategories.map((subcat) => {
                    const subcategoryStat = getSubcategoryStat(subcat.key, mainCategoryStat);
                    const subcatDescription = (subcat as any).description;
                    const statKey = subcat.key;
                    const gradeDescription = STAT_GRADE_DESCRIPTIONS[subcat.key]?.[subcategoryStat.label];
                    return (
                      <div key={subcat.key}>
                        {renderStatBar(subcat.label, subcategoryStat, subcatDescription, gradeDescription, true, statKey)}
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Information Segment */}
        <div className="flex flex-col items-center gap-4 w-full px-4 py-4 mt-6">
          <p 
            className="text-center text-sm"
            style={{
              color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '#a855f7' : undefined)),
              textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
            }}
          >
            Curious about the meaning of a specific grade or statistic? Click the button to visit the Statistics page to learn more!
          </p>
          <Link to="/statistics">
            <Button 
              variant="outline"
              className="font-medium"
              style={{
                color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                borderColor: shouldPulse ? undefined : (isPhysicalStats ? 'rgba(255, 255, 255, 0.3)' : undefined),
              }}
            >
              Visit Statistics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

