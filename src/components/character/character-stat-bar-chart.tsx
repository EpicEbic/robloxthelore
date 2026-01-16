import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, TrendingUp, TrendingDown, Sword, Shield, Zap, Target, Brain } from "lucide-react";
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

interface CombatStats {
  strength: StatGrade;
  durability: StatGrade;
  agility: StatGrade;
  precision: StatGrade;
  intelligence: StatGrade;
  subcategories?: {
    // Strength
    power?: StatGrade;
    lift?: StatGrade;
    penetration?: StatGrade;
    intensity?: StatGrade;
    // Durability
    toughness?: StatGrade;
    vitality?: StatGrade;
    thermostability?: StatGrade;
    esotolerance?: StatGrade;
    // Agility
    swiftness?: StatGrade;
    acceleration?: StatGrade;
    flexibility?: StatGrade;
    endurance?: StatGrade;
    // Precision
    accuracy?: StatGrade;
    range?: StatGrade;
    dexterity?: StatGrade;
    reactivity?: StatGrade;
    // Intelligence
    tactility?: StatGrade;
    wisdom?: StatGrade;
    foresight?: StatGrade;
    sanity?: StatGrade;
  };
}

interface CharacterStatBarChartProps {
  stats: CombatStats;
  characterId?: string;
  className?: string;
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

// Grade colors matching the statistics page
const GRADE_COLORS = {
  "Ø": { bg: "bg-gradient-to-r from-purple-500 to-pink-500", border: "border-purple-400", text: "text-purple-300" },
  "S": { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", border: "border-blue-400", text: "text-blue-300" },
  "A": { bg: "bg-gradient-to-r from-green-500 to-emerald-500", border: "border-green-400", text: "text-green-300" },
  "B": { bg: "bg-gradient-to-r from-yellow-400 to-yellow-500", border: "border-yellow-400", text: "text-yellow-300" },
  "C": { bg: "bg-gradient-to-r from-orange-400 to-amber-500", border: "border-orange-400", text: "text-orange-300" },
  "D": { bg: "bg-gradient-to-r from-orange-700 to-red-700", border: "border-orange-500", text: "text-orange-400" },
  "E": { bg: "bg-gradient-to-r from-red-500 to-rose-600", border: "border-red-400", text: "text-red-300" },
  "F": { bg: "bg-gradient-to-r from-gray-600 to-gray-700", border: "border-gray-400", text: "text-gray-300" }
} as const;

// Grade descriptions for each subcategory - Physical stats only
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
    "Ø": "This Bloxian's destructive potential is so immeasurably high that obliterating entire Worlds is child's play. A flick of their finger could reshape vast portions of the Bloxiverse. The sheer force behind their movements could level civilizations without a second thought.",
    "S": "This Bloxian can reshape entire landscapes with minimal effort, annihilating large-scale cities or mountain ranges with a single strike. Their destructive output rivals natural disasters, leaving devastation in their wake.",
    "A": "This Bloxian can level outposts or smaller cities in just a punch or two. Reinforced structures crumble before them, and their strikes carry enough force to cause localized earthquakes.",
    "B": "This Bloxian's power enables them to destroy entire buildings through their fists alone. They can shatter boulders like glass and punch through reinforced walls with focused effort.",
    "C": "This Bloxian can bring harm to most natural materials including wood, stone, and weaker metals with relative ease. Their strikes carry significant force behind them.",
    "D": "This Bloxian has strength allowing them to damage weaker materials such as wood and stone. With focused effort, they may dent weaker metals.",
    "E": "This Bloxian has slightly above-average strength, giving them a small edge in hand-to-hand combat. They can damage materials such as wood with significant effort.",
    "F": "This Bloxian has no notable strength beyond a standard civilian. They struggle to bring harm beyond their own level."
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
    "Ø": "This Bloxian moves at speeds comparable to teleportation. Entire regions of the Bloxiverse can be crossed in the blink of an eye.",
    "S": "This Bloxian travels at excessive speeds that shatter the sound barrier on a whim, covering entire Worlds in seconds.",
    "A": "This Bloxian rapidly matches the speeds of sports cars and specialized high-speed vehicles.",
    "B": "This Bloxian can outrun most motorized vehicles when at maximum speed. Large fields are cleared in seconds.",
    "C": "This Bloxian quickly reaches and maintains a fast pace, outrunning manual vehicles like bicycles with ease.",
    "D": "This Bloxian achieves speeds comparable to trained athletes, moving notably faster than civilians.",
    "E": "This Bloxian can sprint faster than civilians but is still outpaced by vehicles and trained athletes.",
    "F": "This Bloxian isn't capable of reaching speeds beyond an average citizen."
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
    "Ø": "This Bloxian's accuracy is absolute. Every strike lands exactly where intended with flawless precision, regardless of conditions or obstacles. They never miss their mark.",
    "S": "This Bloxian strikes with near-perfect precision, nailing their intended targets almost without fail even in extremely hostile conditions or against evasive opponents.",
    "A": "This Bloxian attacks with incredible accuracy, consistently landing hits on their targets. They struggle only against the nimblest opponents who can actively evade.",
    "B": "This Bloxian has remarkable accuracy, remaining precise and dangerous even in unfortunate conditions. Most of their attacks connect as intended.",
    "C": "This Bloxian consistently strikes their targets with notable precision above casual combatants. They can reliably hit intended body parts or weak points.",
    "D": "This Bloxian maintains decent accuracy in combat, though quick opponents or stressful situations may cause them to miss more frequently.",
    "E": "This Bloxian handles combat with slight accuracy above untrained combatants, but many attacks may miss or hit unintended areas.",
    "F": "This Bloxian is extremely inaccurate, throwing attacks without care or precision. They frequently miss their intended targets entirely."
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
  sanity: {
    "Ø": "This Bloxian's mind exists beyond sanity and insanity, operating on transcendent consciousness. No force can compromise their mind.",
    "S": "This Bloxian possesses extraordinary mental stability, maintaining composure under extreme psychological torture. Their mind is a fortress.",
    "A": "This Bloxian has exceptional mental fortitude, remaining calm in dire circumstances and resisting most manipulation attempts.",
    "B": "This Bloxian maintains strong mental stability, rarely breaking under pressure and identifying common manipulation.",
    "C": "This Bloxian has good mental stability, maintaining composure in stress and resisting basic manipulation.",
    "D": "This Bloxian maintains decent stability normally, though stress may cause them to falter. Skilled manipulation can affect them.",
    "E": "This Bloxian has fragile stability, struggling under stress and easily manipulated through common tactics.",
    "F": "This Bloxian is severely unstable or easily manipulated—often both. Basic tactics work effortlessly on them."
  },
  lift: {
    "Ø": "This Bloxian can manipulate objects of any mass as though they were weightless. Planets, stars, and celestial bodies pose no challenge.",
    "S": "This Bloxian can manipulate entire islands of weight at a time as though they were toys. Massive structures like skyscrapers can be hoisted and thrown with ease.",
    "A": "This Bloxian can take on the entire weight of tall buildings, lifting and throwing them like projectiles. Heavy military vehicles are manageable with effort.",
    "B": "This Bloxian can perform remarkable feats, benchpressing vehicles with one hand and tossing boulders as if they were soccer balls.",
    "C": "This Bloxian can manhandle larger and heavier objects such as motorcycles and small boulders with relative comfort.",
    "D": "This Bloxian's lifting capacity enables them to handle larger and bulkier objects with relative ease, such as heavy furniture or small vehicles.",
    "E": "This Bloxian is capable of lifting a decent amount of weight, such as bulky rocks or heavy equipment, with noticeable strain.",
    "F": "This Bloxian has a limited lifting capacity consistent with an average civilian, struggling with anything particularly heavy."
  },
  acceleration: {
    "Ø": "This Bloxian achieves maximum velocity instantaneously. There is no buildup—they simply move at their desired speed the moment they choose to.",
    "S": "This Bloxian accelerates to their top speed in fractions of a second, appearing to teleport to observers.",
    "A": "This Bloxian reaches maximum speed almost instantly, requiring only a step or two to achieve full velocity.",
    "B": "This Bloxian accelerates remarkably fast, reaching top speed in just a few strides with minimal buildup.",
    "C": "This Bloxian builds speed quickly, reaching their maximum within several seconds of beginning movement.",
    "D": "This Bloxian accelerates faster than average, requiring less time than most to reach their top speed.",
    "E": "This Bloxian accelerates at a slightly above-average rate, reaching speed faster than untrained individuals.",
    "F": "This Bloxian accelerates slowly, requiring significant time and distance to reach their maximum speed."
  },
  range: {
    "Ø": "This Bloxian can engage targets at any distance with perfect effectiveness. Range is meaningless—they strike with equal lethality across dimensions and vast distances.",
    "S": "This Bloxian operates effectively at extreme distances that would be impossible for others, engaging targets miles away with full combat effectiveness.",
    "A": "This Bloxian excels at very long ranges, comfortably engaging targets hundreds of meters away while maintaining full combat capability.",
    "B": "This Bloxian operates effectively at long range, comfortable with distances that would challenge most marksmen and remaining dangerous from afar.",
    "C": "This Bloxian handles moderate ranges well, effective with ranged weapons at reasonable distances where they can still apply pressure.",
    "D": "This Bloxian is comfortable at shorter ranges, preferring closer combat but capable of engaging at modest distances when necessary.",
    "E": "This Bloxian struggles at range, most effective only at close quarters where distance is not a factor.",
    "F": "This Bloxian can only fight effectively at point-blank range, if at all. Any meaningful distance severely hampers their combat effectiveness."
  },
  foresight: {
    "Ø": "This Bloxian perceives all possible futures with perfect clarity. Every eventuality is known and accounted for before it happens.",
    "S": "This Bloxian plans many steps ahead with near-perfect accuracy, anticipating outcomes that others couldn't conceive.",
    "A": "This Bloxian excels at long-term planning, anticipating consequences far in advance and preparing contingencies.",
    "B": "This Bloxian plans several steps ahead effectively, considering multiple outcomes and preparing accordingly.",
    "C": "This Bloxian has good foresight, planning ahead for likely outcomes and adapting when things change.",
    "D": "This Bloxian thinks ahead in general terms, considering immediate consequences but struggling with long-term planning.",
    "E": "This Bloxian has limited foresight, occasionally planning ahead but often caught off-guard by developments.",
    "F": "This Bloxian rarely thinks beyond the immediate moment, frequently blindsided by foreseeable consequences."
  },
  thermostability: {
    "Ø": "This Bloxian is completely immune to all temperature extremes. Whether plunged into absolute zero or the heart of a star, they remain entirely unaffected.",
    "S": "This Bloxian can withstand temperatures that would vaporize or freeze ordinary matter, including the surface of stars or the void of deep space.",
    "A": "This Bloxian handles extreme temperatures with ease, from volcanic heat to arctic cold, barely noticing conditions that would kill others instantly.",
    "B": "This Bloxian withstands most temperature extremes with minimal effort, shrugging off severe heat and cold that would incapacitate others.",
    "C": "This Bloxian has strong tolerance toward temperature extremes, handling harsh heat or bitter cold better than most.",
    "D": "This Bloxian can tolerate most standard environments, ignoring bitter cold or sweltering heat that would discomfort others.",
    "E": "This Bloxian may tolerate extreme temperatures for longer periods, but not indefinitely. Without protection, they will eventually succumb.",
    "F": "This Bloxian cannot tolerate temperature extremes without special protection, vulnerable to both extreme heat and cold."
  },
  esotolerance: {
    "Ø": "This Bloxian is completely immune to all esoteric hazards. Radiation, electricity, cosmic forces, and any other exotic dangers are entirely harmless to them.",
    "S": "This Bloxian can tolerate exceptionally lethal hazards such as the rupturing gravity of black holes or concentrated cosmic radiation without issue.",
    "A": "This Bloxian withstands most esoteric hazards like radiation, electricity, and cosmic energy with ease, perhaps not even noticing them.",
    "B": "This Bloxian can tolerate advanced hazards such as radiation and electricity in large quantities with minimal discomfort.",
    "C": "This Bloxian may handle advanced hazards including electricity and radiation, having notable resistance to one or more.",
    "D": "This Bloxian may be resistant to esoteric hazards such as radiation or electricity, tolerating exposure better than average.",
    "E": "This Bloxian may tolerate minor exposure to esoteric hazards, but extended contact will cause harm.",
    "F": "This Bloxian has no special tolerance for esoteric hazards, fully vulnerable to radiation, electricity, and other exotic dangers."
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
  }
};

const PHYSICAL_SUBCATEGORIES = [
  // Strength subcategories
  { key: 'power', label: 'Power', category: 'Strength', stat: 'strength' },
  { key: 'lift', label: 'Lift', category: 'Strength', stat: 'strength' },
  { key: 'penetration', label: 'Penetration', category: 'Strength', stat: 'strength' },
  { key: 'intensity', label: 'Intensity', category: 'Strength', stat: 'strength' },
  // Durability subcategories
  { key: 'toughness', label: 'Toughness', category: 'Durability', stat: 'durability' },
  { key: 'vitality', label: 'Vitality', category: 'Durability', stat: 'durability' },
  { key: 'thermostability', label: 'Thermostability', category: 'Durability', stat: 'durability' },
  { key: 'esotolerance', label: 'Esotolerance', category: 'Durability', stat: 'durability' },
  // Agility subcategories
  { key: 'swiftness', label: 'Swiftness', category: 'Agility', stat: 'agility' },
  { key: 'acceleration', label: 'Acceleration', category: 'Agility', stat: 'agility' },
  { key: 'flexibility', label: 'Flexibility', category: 'Agility', stat: 'agility' },
  { key: 'endurance', label: 'Endurance', category: 'Agility', stat: 'agility' },
  // Precision subcategories
  { key: 'accuracy', label: 'Accuracy', category: 'Precision', stat: 'precision' },
  { key: 'range', label: 'Range', category: 'Precision', stat: 'precision' },
  { key: 'dexterity', label: 'Dexterity', category: 'Precision', stat: 'precision' },
  { key: 'reactivity', label: 'Reactivity', category: 'Precision', stat: 'precision' },
  // Intelligence subcategories
  { key: 'tactility', label: 'Tactility', category: 'Intelligence', stat: 'intelligence' },
  { key: 'wisdom', label: 'Wisdom', category: 'Intelligence', stat: 'intelligence' },
  { key: 'foresight', label: 'Foresight', category: 'Intelligence', stat: 'intelligence' },
  { key: 'sanity', label: 'Sanity', category: 'Intelligence', stat: 'intelligence' }
];

const MAIN_CATEGORIES = [
  { 
    name: 'Strength', 
    description: "Measures a character's offensive capabilities through physical power and combat effectiveness.",
    icon: Sword,
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Strength').map(subcat => ({
      ...subcat,
      description: {
        power: "How physically powerful a Bloxian's body is, including their destructive potential.",
        lift: "How much weight a Bloxian can comfortably (or uncomfortably) tolerate at one time.",
        penetration: "How easily a Bloxian can bypass or pierce through defensive layers.",
        intensity: "How much consistent pressure a Bloxian can apply against their opponent."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Durability', 
    description: "Represents a character's defensive capabilities and resistance to damage.",
    icon: Shield,
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Durability').map(subcat => ({
      ...subcat,
      description: {
        toughness: "How many injuries (and the intensity of these injuries) a Bloxian can sustain before becoming incapacitated.",
        vitality: "How healthy a Bloxian is generally, including their fitness and tolerance to disease, poisons, etc.",
        thermostability: "How well a Bloxian can withstand harsh environmental conditions, such as extreme heat or frost.",
        esotolerance: "How well a Bloxian can tolerate rarer hazards, such as cosmic energy, electricity, or radiation."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Agility', 
    description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
    icon: Zap,
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Agility').map(subcat => ({
      ...subcat,
      description: {
        swiftness: "How quickly a Bloxian can move from one point to another.",
        acceleration: "How quickly a Bloxian can reach their top speeds.",
        flexibility: "How easily and gracefully a Bloxian can maneuver through complicated environments.",
        endurance: "How much stamina a Bloxian has, as well as how quickly they burn through it."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Precision', 
    description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
    icon: Target,
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Precision').map(subcat => ({
      ...subcat,
      description: {
        accuracy: "How consistently a Bloxian will land hits on their target.",
        range: "How far of a distance a Bloxian can comfortably and consistently fight from.",
        dexterity: "How fine a Bloxian's motor control is, as well as how quick and steady their hands are while under pressure.",
        reactivity: "How quickly and effectively a Bloxian can react to sources of danger."
      }[subcat.key] || ""
    }))
  },
  { 
    name: 'Intelligence', 
    description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
    icon: Brain,
    subcategories: PHYSICAL_SUBCATEGORIES.filter(s => s.category === 'Intelligence').map(subcat => ({
      ...subcat,
      description: {
        tactility: "How clever a Bloxian acts in combat, making smart and careful choices to bring down enemies.",
        wisdom: "How smart a Bloxian is in everyday life, including emotional maturity and common skillsets.",
        foresight: "How far and easily a Bloxian can plan ahead, both in and out of combat situations.",
        sanity: "How mentally-stable or sane a Bloxian is, including how resistant they are to mental manipulation."
      }[subcat.key] || ""
    }))
  }
];

export function CharacterStatBarChart({ 
  stats, 
  characterId, 
  className,
  currentCombatStyle,
  combatStyles,
  onCombatStyleChange
}: CharacterStatBarChartProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Check if current combat style should pulse between white and purple
  const shouldPulse = currentCombatStyle === "chronipulation-mag-num" || 
    currentCombatStyle === "chronipulation-amplification-gauntlet";

  // Get default combat style (first style or "standard")
  const defaultCombatStyle = useMemo(() => {
    if (!combatStyles || combatStyles.length === 0) return null;
    return combatStyles.find(style => style.id === "standard") || combatStyles[0];
  }, [combatStyles]);

  // Calculate stat differences between current and default combat style
  const getStatDifference = useMemo(() => {
    if (!defaultCombatStyle || !currentCombatStyle || currentCombatStyle === defaultCombatStyle.id) {
      return null;
    }

    const defaultStats = defaultCombatStyle.combatStats as CombatStats;
    const currentStats = stats;

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
      'power', 'lift', 'penetration', 'intensity',
      'toughness', 'vitality', 'thermostability', 'esotolerance',
      'swiftness', 'acceleration', 'flexibility', 'endurance',
      'accuracy', 'range', 'dexterity', 'reactivity',
      'tactility', 'wisdom', 'foresight', 'sanity'
    ] as const;

    allSubcategories.forEach(subcatKey => {
      const defaultSubcat = defaultStats.subcategories?.[subcatKey];
      const currentSubcat = currentStats.subcategories?.[subcatKey];
      
      const defaultMainCategory = subcatKey === 'power' || subcatKey === 'lift' || subcatKey === 'penetration' || subcatKey === 'intensity' ? 'strength' :
                                 subcatKey === 'toughness' || subcatKey === 'vitality' || subcatKey === 'thermostability' || subcatKey === 'esotolerance' ? 'durability' :
                                 subcatKey === 'swiftness' || subcatKey === 'acceleration' || subcatKey === 'flexibility' || subcatKey === 'endurance' ? 'agility' :
                                 subcatKey === 'accuracy' || subcatKey === 'range' || subcatKey === 'dexterity' || subcatKey === 'reactivity' ? 'precision' :
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
  }, [defaultCombatStyle, currentCombatStyle, stats]);

  // Get stat value for a subcategory
  const getSubcategoryStat = (subcatKey: string, mainCategoryStat: StatGrade): StatGrade => {
    const subcategoryStats = stats.subcategories;
    const subcategoryStat = subcategoryStats?.[subcatKey as keyof typeof subcategoryStats];
    return subcategoryStat || mainCategoryStat;
  };

  // Render a single stat bar
  const renderStatBar = (label: string, stat: StatGrade, description?: string, gradeDescription?: string, isSubcategory: boolean = false, statKey?: string) => {
    const statValue = GRADE_VALUES[stat.label];
    const barWidth = `${Math.max((statValue / 7) * 100, 3)}%`;
    const statDiff = statKey && getStatDifference ? getStatDifference[statKey] : null;
    
    return (
      <div className={cn("flex flex-col", isSubcategory ? "ml-4 gap-1" : "gap-1.5")}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col gap-1">
            <span 
              className={cn(
                "font-medium",
                isSubcategory ? "text-sm" : "font-semibold text-base"
              )}
              style={{
                color: shouldPulse ? undefined : '#ffffff',
                textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)'
              }}
            >
              {label}
            </span>
            {description && (
              <span 
                className="leading-tight opacity-70 text-xs"
                style={{
                  color: shouldPulse ? undefined : '#ffffff',
                  textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)'
                }}
              >
                {description}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {statDiff && (
              <div className={cn(
                "flex items-center gap-1 rounded border text-xs font-semibold px-2 py-1 drop-shadow-sm",
                statDiff.diff > 0 
                  ? "bg-green-500/30 border-green-400/50 text-green-300" 
                  : "bg-red-500/30 border-red-400/50 text-red-300"
              )}>
                {statDiff.diff > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {statDiff.diff > 0 ? '+' : ''}{statDiff.diff}
                </span>
              </div>
            )}
            <span 
              className={cn(
                "font-bold rounded-xl px-3 py-1.5 text-white shadow-sm text-sm",
                GRADE_COLORS[stat.label as keyof typeof GRADE_COLORS]?.bg || "bg-gray-600"
              )}
            >
              {stat.label}
            </span>
          </div>
        </div>
        <div className="relative bg-muted/30 rounded-full overflow-hidden h-3">
          {/* Grade segment dividers */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white/20"
              style={{ left: `${(i / 7) * 100}%` }}
            />
          ))}
          {/* Fill bar */}
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              shouldPulse ? "bg-current" : GRADE_COLORS[stat.label as keyof typeof GRADE_COLORS]?.bg || "bg-primary"
            )}
            style={{
              width: barWidth,
              opacity: 0.9
            }}
          />
        </div>
        {gradeDescription && (
          <span 
            className="leading-relaxed opacity-60 italic mt-1.5 text-xs"
            style={{
              color: shouldPulse ? undefined : '#ffffff',
              textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)'
            }}
          >
            {gradeDescription}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex justify-center items-center p-4", className)}>
      <div 
        className={cn(
          "bg-card/80 backdrop-blur-sm rounded-2xl border stat-chart-container w-full max-w-4xl overflow-visible p-8",
          shouldPulse ? "stat-chart-physical-white stat-chart-pulse-purple" : "stat-chart-physical-white"
        )}
      >
        {/* Title with help icon and combat style switcher */}
        <div className={`flex flex-col gap-4 mb-6 ${shouldPulse ? 'pulse-container' : ''} overflow-visible`}>
          <div className="flex items-center justify-between gap-4 overflow-visible">
            <div className="flex items-center justify-center gap-2 flex-1 relative overflow-visible">
              <h3 
                className="text-xl font-bold text-center stat-chart-title physical-stats-title"
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  letterSpacing: '0.025em',
                  ...(shouldPulse ? {
                    color: 'currentColor'
                  } : { 
                    color: '#ffffff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                  })
                }}
              >
                Physical Statistics
              </h3>
              <TooltipProvider>
                <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="flex-shrink-0 relative z-10"
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
                  <TooltipContent 
                    className="max-w-lg z-[9999] p-4" 
                    side="bottom"
                    sideOffset={8}
                    align="start"
                  >
                    <p className="text-sm leading-relaxed break-words whitespace-normal overflow-wrap-anywhere">
                      By default, physical statistics do <strong>NOT</strong> account for the ability of a character if they have one. This is only their raw physical potential!
                      
                      <br /><br />
                      
                      Certain scenarios or combat styles that incorporate a character's ability may make this incorrect, please be aware!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {combatStyles && combatStyles.length > 1 && (
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
        <div className="flex flex-col gap-6">
          {MAIN_CATEGORIES.map((category, index) => {
            const mainCategoryStat = stats[category.name.toLowerCase() as keyof CombatStats] as StatGrade;
            
            return (
              <div key={category.name}>
                {/* Divider between categories */}
                {index > 0 && (
                  <div 
                    className="h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50 my-6"
                    style={{
                      backgroundImage: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)'
                    }}
                  />
                )}
                <div className="space-y-3">
                  {/* Main Category Label */}
                  <div className="flex flex-col border-b border-border/50 gap-1 pb-2">
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <div 
                          className="rounded-xl flex items-center justify-center shrink-0 shadow-sm w-7 h-7"
                          style={{ background: 'linear-gradient(to bottom right, #f3f4f6, #d1d5db)' }}
                        >
                          <category.icon className="icon-force-black w-4 h-4" />
                        </div>
                      )}
                      <h4 
                        className="font-extrabold text-lg"
                        style={{
                          color: shouldPulse ? 'currentColor' : '#ffffff',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)'
                        }}
                      >
                        {category.name}
                      </h4>
                    </div>
                    {category.description && (
                      <p 
                        className="leading-tight opacity-70 text-sm"
                        style={{
                          color: shouldPulse ? undefined : '#ffffff',
                          textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {category.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Subcategory Bars */}
                  <div className="pl-2 space-y-3">
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
              color: shouldPulse ? undefined : '#ffffff',
              textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)'
            }}
          >
            Curious about the meaning of a specific grade or statistic? Click the button to visit the Statistics page to learn more!
          </p>
          <Link to="/statistics">
            <Button 
              variant="outline"
              className="font-medium"
              style={{
                color: shouldPulse ? undefined : '#ffffff',
                borderColor: shouldPulse ? undefined : 'rgba(255, 255, 255, 0.3)',
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
