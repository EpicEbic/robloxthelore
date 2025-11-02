import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info, Zap, Sword, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function StatisticInfoPage() {
  const [openStats, setOpenStats] = useState<Record<string, boolean>>({});
  
  const toggleStat = (statName: string) => {
    setOpenStats(prev => ({
      ...prev,
      [statName]: !prev[statName]
    }));
  };

  const grades = [
    {
      grade: "Ø",
      description: "Unfathomable levels of power than transcend known limits, often existing beyond logistical reasoning and comprehension. Godlike and effectively unstoppable.",
      color: "bg-gradient-to-r from-purple-500 to-yellow-500"
    },
    {
      grade: "S",
      description: "Mastery and peak performance, rivaled by little to none. A quality displayed by the best of the best, serving as a force not to be messed with or taken lightly.",
      color: "bg-gradient-to-r from-red-500 to-orange-500"
    },
    {
      grade: "A",
      description: "High-ranking proficency that outclasses a majority of others, even those with lots of experience.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      grade: "B",
      description: "Capabilities and excellence that goes far beyond the standard and intermediate expectations.",
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      grade: "C",
      description: "Skills or capabilities that are well-versed and generally solid in most circumstances.",
      color: "bg-gradient-to-r from-yellow-500 to-amber-500"
    },
    {
      grade: "D",
      description: "Notably proficient and powerful, though nothing too exceptional.",
      color: "bg-gradient-to-r from-orange-600 to-red-600"
    },
    {
      grade: "E",
      description: "Skillsets or potential above the average civilian, but nothing more.",
      color: "bg-gradient-to-r from-red-600 to-red-700"
    },
    {
      grade: "F",
      description: "A civilian-standard grade, when skills or capabilities do not go beyond the norm of society.",
      color: "bg-gradient-to-r from-gray-600 to-gray-700"
    }
  ];

  // Physical Statistics structure with subcategories and their grade descriptions
  const physicalStats = {
    "Offense": {
      description: "Measures a character's offensive capabilities through physical power and combat effectiveness.",
      subcategories: [
        { 
          name: "Power", 
          description: "The raw physical potential of a Bloxian, as well as their lifting capacity.",
          grades: {
            "Ø": "This Bloxian's raw strength is so immeasurably high that destroying entire Worlds (or even groups of Worlds at a time) is child's play. A flick of their finger could reshape entire portions of the Bloxiverse. A sigh could kill millions from the deathly winds that follow.",
            "S": "This Bloxian is capable of reshaping entire portions of land with minimal effort, waving their hand to obliterate large-scale cities or mountain ranges. Their lifting capacity allows them to manipulate entire islands of weight at a time as though it were a toy.",
            "A": "This Bloxian can level outposts or smaller cities in just a punch or two. Reinforced structures are trivial to destroy, ripped apart with their bare hands alone. They can take on the entire weight of tall buildings, throwing them like a spear.",
            "B": "This Bloxian's raw strength enables them to destroy entire buildings and other structures through their fists alone. They can perform remarkable feats, benchpressing vehicles with one hand and kicking boulders as if they were soccer balls. With effort, they can likely pry through reinforced structures if given the time to do so.",
            "C": "This Bloxian can manhandle larger and heavier objects such as motorcycles and small boulders. Through their strength, they can bring harm to most natural resources including wood, stone, and weaker metals with relative ease.",
            "D": "This Bloxian has strength which allows them to damage a majority of weaker materials, such as wood and stone. When pouring all of their strength into an attack, they may be able to dent weaker metals such as gold. Their lifting capacity enables them to handle larger and bulkier objects with relative ease.",
            "E": "This Bloxian has slightly above-average strength, giving them a small edge in hand-to-hand combat against civilians. With significant effort, they may be able to damage materials such as wood and brittle stone. They're capable of lifting a decent amount of weight, such as bulky rocks.",
            "F": "This Bloxian has no notable strength beyond a standard civilian. They struggle to bring harm to any others beyond their own level of strength, and have a limited lifting capacity."
          }
        },
        { 
          name: "Penetration", 
          description: "The amount of armor or other lines of defense that a Bloxian can penetrate with their attacks.",
          grades: {
            "Ø": "This Bloxian's ability to injure others transcends all forms of defense, allowing attacks to connect with absolute power. They can bypass and ignore any and all lines of defense, no matter what conditions may be in place. If this Bloxian attacks a target, the injury that follows will be raw and in-full.",
            "S": "This Bloxian has no difficulty obliterating all known lines of defense, regardless of abilities or materials. Their raw strength enables them to always attack with maximum lethality, with no amount of Bloxite armor saving them.",
            "A": "This Bloxian can tear through the strongest of defenses with ease, even multi-layered levels of equipment and other abilities stacked into the mix. Bloxite-reinforced structures and armor may hold, but nothing below stands much of a chance.",
            "B": "This Bloxian can easily penetrate specialized equipment and abilities, shattering through lines of defense as they're cut like butter. At this stage, only the toughest lines of defense and extremely defensive-oriented abilities may resist the fine-tuned destruction this Bloxian can issue.",
            "C": "This Bloxian can bypass most standard materials, as well as medium-class armors formed of stronger metals such as iron and titanium. Their blows reverberate and often carry tremendous force, making penetration easy on most targets who aren't using advanced equipment or specialized abilities.",
            "D": "This Bloxian can bypass most low-end abilities as well as medium-class armor, including those formed of weaker materials such as stone and wood. Through focus and effort, flimsy armor formed of gold or other weaker metal may also be bypassed.",
            "E": "This Bloxian has above-average penetrating power, enabling them to bypass the weakest of barriers, or targets wearing cheap protective gear formed of wood-level material.",
            "F": "This Bloxian has no capabilities to penetrate the defenses of others by any means, at least beyond that of typical civilians."
          }
        },
        { 
          name: "Intensity", 
          description: "How relentless and pressuring a Bloxian is when in combat.",
          grades: {
            "Ø": "This Bloxian is impossibly efficient at applying unyielding pressure, capable of attacking continuously without any reprieve for the opponent. Their assault is perpetual and inescapable by all means.",
            "S": "This Bloxian can maintain constant and aggressive pressure with little to no openings for an enemy to retaliate. Escape becomes near-impossible without specialized abilities or another means of fleeing conflict, and even these methods will typically struggle.",
            "A": "This Bloxian can remain strong, consistent pressure throughout entire combat situations, forcing opponents to remain on high alert and play defensively. Fighting this Bloxian requires the enemy to carefully defend, and search for brief windows where they can finally strike back.",
            "B": "This Bloxian can apply significant pressure while engaged in combat, often cornering or locking opponents into tightly-knit combat where they maintain an upper hand consistently. Escape from this Bloxian remains possible, but difficult.",
            "C": "This Bloxian is moderately skilled at keeping pressure on their targets, often forcing them into combos or overwhelming them through strength alone.",
            "D": "This Bloxian is capable of applying some pressure in combat, though inconsistent or oftentimes easy to counter.",
            "E": "This Bloxian has limited skills necessary to maintain offensive pressure on a target, occasionally remaining consistent—but often struggling in the end.",
            "F": "This Bloxian fails to apply any pressure in combat, either due to their weakness, their style of combat, or their physique."
          }
        }
      ]
    },
    "Defense": {
      description: "Represents a character's defensive capabilities and resistance to damage.",
      subcategories: [
        { 
          name: "Toughness", 
          description: "The amount and intensity of physical injuries a Bloxian can sustain before becoming incapacitated.",
          grades: {
            "Ø": "This Bloxian is completely and wholly invulnerable to any and all physical forms of injury. No amount or intensity of incoming damage could incapacitate them, nor scratch or lower the integrity of their body in any way.",
            "S": "This Bloxian shrugs off cataclysmic explosions that could shatter or melt mountains, sustaining minimal injuries. No standard weapons—regardless of their strength—pose any threat to them. Extremely powerful firearms or large-scale railguns may deal significant damage, though it would require tremendous effort.",
            "A": "This Bloxian can tolerate ground-trembling impacts that could eviscerate reinforced buildings or portions of cities, sustaining only minor injuries. Stronger firearms and blunt force trauma is significantly ineffective, and the skin of this Bloxian essentially cannot be cut. Only the strongest of firearms can penetrate their skin, let alone their internal muscles.",
            "B": "This Bloxian can remain composed when faced with attacks capable of destroying smaller buildings, sustaining only minor injuries. Their tough muscles can resist weaker firearms, almost all standard blunt weaponry, as well as most blades.",
            "C": "This Bloxian can withstand being tossed through weaker structures formed of wood, and shrug off smaller cuts and wounds. Blunt force trauma issued by standard weapons is ineffective at injuring them.",
            "D": "This Bloxian is tough enough to withstand blunt force for longer periods of time, but may remain susceptible to being cut by sharp knives, or impaled. They only bruise from extremely rough landings or impacts.",
            "E": "This Bloxian's body can tolerate injury better than most, preventing them from being cut or bruised as easily. They remain just as vulnerable to most basic weaponry.",
            "F": "This Bloxian is just as susceptible to injury as any other civilian, easily injured by common accidents including falls, bumps, etc."
          }
        },
        { 
          name: "Vitality", 
          description: "The overall physical health of a Bloxian, accounting for their fitness and any conditions they may have.",
          grades: {
            "Ø": "This Bloxian's body is completely immune to all forms of physical degradation, illness, or aging. Their natural health cannot be diminished by any means, nor can any substances or materials harm them in any way.",
            "S": "This Bloxian can regenerate from most injuries in record times, and ignore the effects of almost all illnesses and toxic materials, including poisons. They may entirely halt aging if they remain in good health, or age at exceptionally slow rates that are practically unnoticeable.",
            "A": "This Bloxian has exceptional vitality, recovering quickly from fatal injuries at impressively fast speeds, whilst shrugging off most illnesses, poisons, and other toxic contaminants. They may age slower by a significantly reduced rate compared to other Bloxians.",
            "B": "This Bloxian's body is incredibly healthy, capable of withstanding serious conditions such as blood loss, infection, and stronger illnesses. They can resist weaker poisons almost entirely, as well as most toxic substances. This Bloxian may age slightly slower than their peers.",
            "C": "This Bloxian is remarkably healthy across the board, shrugging off most illnesses and ailments due to a strong immune system and healthy organs. They may be able to tolerate weaker poisons and other toxic substances, but remain vulnerable to overexposure.",
            "D": "This Bloxian has notably high vitality, often tolerating minor ailments better than the average civilian. Disease is less effective against them, though they remain just as susceptible to stronger illnesses and poisons.",
            "E": "This Bloxian's health is in good condition and rests above the average civilian, but they remain vulnerable to illnesses and injury.",
            "F": "This Bloxian is no healthier than a typical citizen, vulnerable to all forms of poison, disease, and natural processes such as aging."
          }
        },
        { 
          name: "Resistance", 
          description: "How well a Bloxian is able to tolerate harsh environmental conditions and hazards before suffering from their effects.",
          grades: {
            "Ø": "This Bloxian is completely immune and incapable of being affected by environmental hazards, regardless of type or intensity. No natural threat poses any feasible harm to them.",
            "S": "This Bloxian, on top of handling almost all typical hazards seen in the environment, may be able to tolerate exceptionally lethal hazards, such as the rupturing gravity produced by black holes.",
            "A": "This Bloxian can likely withstand extreme temperatures and most natural hazards such as radiation or electricity. This can be done with relative ease, perhaps not even noticing the danger at all.",
            "B": "This Bloxian can withstand most temperatures, shrugged off with minimal effort. Advanced hazards such as radiation and electricity can likely be tolerated in large quantities.",
            "C": "This Bloxian likely has strong tolerance towards one or more natural hazards, and may be able to handle advanced hazards including electricity and radiation.",
            "D": "This Bloxian can tolerate most standard environments, ignoring the bitter cold or the sweltering heat. Alternatively (or additionally), they may be resistant to other esoteric hazards, such as radiation.",
            "E": "This Bloxian may tolerate extreme environments for longer, but not forever. Without equipment or protection, they will inevitably fall victim to harsh climates.",
            "F": "This Bloxian cannot tolerate any environmental hazards without special protection, making them susceptible to extremely hot and extremely cold climates."
          }
        }
      ]
    },
    "Agility": {
      description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
      subcategories: [
        { 
          name: "Swiftness", 
          description: "How quickly a Bloxian can move, as well as how quickly they can reach that speed.",
          grades: {
            "Ø": "This Bloxian can achieve speeds comparable to that of teleportation, leaving vacuums behind that explode and compress anything nearby as they travel. If oxygen is present when they travel, it combusts from the friction they can generate by moving. Entire regions of the Bloxiverse can be crossed in the blink of an eye—a \"casual\" walk may mean travelling the entire known span of the Bloxiverse.",
            "S": "This Bloxian travels at excessive speeds that can shatter the sound barrier on a whim, quickly reaching velocities that can cover entire Worlds in mere minutes or seconds depending on the size.",
            "A": "This Bloxian can rapidly accelerate and match the speeds of sports cars and other specialized vehicles designed to travel extremely fast. Entire regions can be ran across with enough time.",
            "B": "This Bloxian can outrun most motorized vehicles when given enough time to build up to their maximum. Crossing large fields becomes trivial as most can be cleared in seconds.",
            "C": "This Bloxian is capable of quickly reaching and maintaining a fast pace that allows them to outrun manual vehicles and equipment such as bicycles. Navigating smaller cities is relatively easy to do on foot.",
            "D": "This Bloxian can achieve speeds comparable to that of a trained athlete, often requiring minimal time to build up their speeds.",
            "E": "This Bloxian can sprint and reach speeds above civilians, but can still be outpaced by vehicles and trained athletes.",
            "F": "This Bloxian isn't capable of reaching speeds beyond an average citizen, easily outpaced by stronger runners, vehicles, and those with abilities that enhance their mobility."
          }
        },
        { 
          name: "Endurance", 
          description: "The amount of general stamina a Bloxian has, as well as how quickly they burn through it.",
          grades: {
            "Ø": "This Bloxian has boundless stamina and endurance that physically cannot run dry. They constantly operate at peak physical capacity, and often do not require food, sleep, or any other form of sustenance.",
            "S": "This Bloxian essentially never runs dry of stamina so long as they manage themselves, effortlessly handling any physical tasks they are capable of. They may be able to last entire days without tiring, or tolerate extremely exhausting conditions for unhealthy lengths of time before collapsing.",
            "A": "This Bloxian's endurance is strong enough to tolerate running and sprinting without any noticeable impact on their energy or stamina. They can hold their breath for potentially hours, and navigate complex terrain for extremely long lengths of time before finally exhausting. They often need to sleep and eat less.",
            "B": "This Bloxian can handle cross-country journeys without much sleep or preparation, scaling the tallest cliffs and holding their breath underwater for multiple minutes.",
            "C": "This Bloxian can tolerate sprinting throughout entire marathons, or climbing mountains without breaking much of a sweat. Continuous or prolonged activity can still run their stamina reserves dry if they don't properly manage themselves.",
            "D": "This Bloxian has notable endurance allowing them to tolerate large-distance treks and journeys without tiring much. Hiking in difficult terrain or performing particularly stressful actions such as heavy lifting may still exhaust them after some time.",
            "E": "This Bloxian can tolerate decent-length sprints and excessive physical activity before eventually tiring and requiring a break.",
            "F": "This Bloxian has limited stamina, exhausting them from basic exercise or straining activities. They quickly become breathless when running short distances, and exhaust quickly."
          }
        },
        { 
          name: "Flexibility", 
          description: "How easily and gracefully a Bloxian can weave, bend, and maneuver themselves through fast or complicated attacks.",
          grades: {
            "Ø": "This Bloxian can freely contort and warp their body to improbable extents, achieving new shapes or forms entirely. No shape or appearance is off-limits so long as they have the physical mass necessary to do so.",
            "S": "This Bloxian is a master contortionist who can quickly manipulate their body in a variety of ways to effortlessly avoid incoming enemy attacks, capable of weaving around melee weaponry and firearms with ease through the dislocation of limbs or temporary displacement of bone.",
            "A": "This Bloxian can comfortably handle and avoid the attacks of multiple enemies, effortlessly dodging most melee weaponry and trained fighters. They may be able to handle slower projectiles or single-shot firearms on a whim if they notice the enemy quickly enough.",
            "B": "This Bloxian can tolerate multiple close-quarters opponents at once, and manipulate their body with extreme control to dodge and weave around complex attacks. Though rarely, they may be able to avoid single-shot firearms if they are made aware of the enemy beforehand.",
            "C": "This Bloxian can tolerate multiple fighters at once, expertly manipulating their body to weave and avoid close-quarters combat. They can tolerate faster melee weaponry most of the time, but may struggle against multiple weapons at once.",
            "D": "This Bloxian can efficiently weave and maneuver against skilled fistfighters and kickboxers, and may be able to predict and dodge slower melee weapons.",
            "E": "This Bloxian can bend and manipulate themselves to avoid simple attacks such as punches and kicks. They'll still struggle against weapons.",
            "F": "This Bloxian lacks any flexibility beyond the average civilian, unable to perform advanced stretches or maneuvers."
          }
        }
      ]
    },
    "Precision": {
      description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
      subcategories: [
        { 
          name: "Accuracy", 
          description: "How good a Bloxian is at connecting their attacks, especially when attacking from a distance.",
          grades: {
            "Ø": "This Bloxian's accuracy is absolute, allowing improbable attacks to land with flawless execution. They can strike freely, remaining ignorant of any conditions, distance or complexity. Obstacles are irrelevant to them.",
            "S": "This Bloxian can handle any weapons, regardless of their typing or range. Their attacks strike with the utmost precision, nailing their targets almost without fail even in extremely hostile conditions. Only specialized abilities and equipment can hinder their ability to issue these definitive strikes.",
            "A": "This Bloxian can attack while handling both melee and ranged with incredible accuracy. Their attacks strike with incredible precision, landing almost always and only struggling against the nimblest of opponents or those who have defensive abilities enabling them to evade.",
            "B": "This Bloxian has remarkable accuracy with most weaponry, allowing them to remain precise and dangerous even in unfortunate conditions or situations. They can handle most melee encounters, and operate ranged weapons with remarkable accuracy.",
            "C": "This Bloxian can consistently manage to strike most targets within a moderate range, handling firearms with notable precision above casuals and the unexperienced. Stressful situations or other factors may hinder their capabilities.",
            "D": "This Bloxian can maintain decent accuracy in hand-to-hand combat, though quick opponents or tough conditions can still easily overwhelm their senses and have them struggling to land a hit.",
            "E": "This Bloxian can somewhat handle close-range encounters with slight accuracy and edge above untrained combatants, but will struggle with most longer-ranged weaponry and long handheld weapons.",
            "F": "This Bloxian is either extremely inaccurate, or lacks any control beyond a civilian. Their attacks are thrown without much care or precision. Alternatively, they may simply be too explosive to control."
          }
        },
        { 
          name: "Dexterity", 
          description: "A Bloxian's motor control, primarily how steady and quick their hands are, especially under stress.",
          grades: {
            "Ø": "This Bloxian's ability to control their body with efficiency, accuracy, and precision is absolutely unmatched, capable of enacting any physical action with perfect steadiness, regardless of any conditions, such as stress or environmental dangers. So long as they are physically capable of performing the action they wish to perform, it will be done flawlessly—guaranteed.",
            "S": "This Bloxian's dexterity is world-class, allowing them to perform seemingly-impossible feats that would normally be deemed unachievable, such as performing heart surgery in a crashing helicopter as if it were just another tuesday. Their prowess and skillset is not to be taken lightly.",
            "A": "This Bloxian can handle advanced tools and weapons with extreme precision and accuracy, even in terrible conditions or when suffering from extreme injuries. They maintain consistent effectiveness that makes them efficient and exceptional at almost anything they do.",
            "B": "This Bloxian has remarkable handling of most advanced tools and weaponry, enabling them to operate most with accuracy and precision. They can shrug off a majority of (if not all) stress, maintaining consistent quality with their skills even in adverse conditions. Physical injuries may reduce their capabilities, but it would take significant wounds to do so.",
            "C": "This Bloxian has good handling of most tools and weapons, allowing them to keep their hand steady and their movements clear in pressing situations. They are likely resistant to stress, but injuries or other physical factors may inhibit their motor skills.",
            "D": "This Bloxian has decent motor control and handling, capable of operating most standard tools and weaponry with efficiency in combat. Stress may reduce their effectiveness.",
            "E": "This Bloxian can handle simpler tools and weapons with notable accuracy, though their skillset may crumble under stress, anxiety, or other negative conditions.",
            "F": "This Bloxian has minimal dexterity and motor control, fumbling tasks just as easily as an ordinary person. Their handiwork and movements will degrade quickly under stress or unfavorable conditions."
          }
        },
        { 
          name: "Reactivity", 
          description: "How sharp a Bloxian's reflexes are, and how good they are at counteracting with their reflexes.",
          grades: {
            "Ø": "This Bloxian's reflexes transcend time, allowing them to initiate countermeasures at speeds beyond comprehension. They react with absolute certainty, knowing and bringing an end to almost any threat before it even has a chance to become a threat in the first place.",
            "S": "This Bloxian can react at improbable speeds, often forming countermeasures and planning multiple steps ahead to ensure an upper hand in combat. Sneak attacks are nearly impossible, as it (alongside any other possibilities) will have already been thought of and prevented before it could have even been enacted.",
            "A": "This Bloxian can effortlessly react thanks to their extremely strong senses and quick thinking, avoiding complex attacks without breaking a sweat. They can handle multiple targets at once, and even find ways to handle normally-unavoidable injuries, such as gunfire or offensive-oriented abilities.",
            "B": "This Bloxian's reflexes are excellent, capable of reacting to almost all common forms of attack with quick and effective countermeasures. They may be able to react to normally-unavoidable damage, such as quick projectiles or certain offensive abilities, allowing them to negate or avoid the attack.",
            "C": "This Bloxian has strong senses, allowing them to respond and counteract most threats on a whim. They are difficult to catch by surprise, without lengthy setups to create a perfect ambush that is beyond their physical ability to counter.",
            "D": "This Bloxian has above-average reflexes, allowing them to react quickly to slower attacks and subtly pick up on approaching dangers. Most sneak attacks attempted by unarmed assailants will fail, unless they have a quicker means of attacking—such as a firearm.",
            "E": "This Bloxian has improved senses and reflexes allowing them to handle basic threats and mitigate simpler surprise attacks.",
            "F": "This Bloxian lacks any enhanced reflexes, making them an easy target against almost all forms of attack. They remain vulnerable and unaware of danger just as any civilian would be."
          }
        }
      ]
    },
    "Intelligence": {
      description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
      subcategories: [
        { 
          name: "Tactility", 
          description: "How intelligent a Bloxian is in combat situations, including their ability to think quickly, plan ahead, and remain cool under pressure.",
          grades: {
            "Ø": "This Bloxian has omniscient awareness of those they fight, knowing every possible outcome and potential countermeasure instantaneously. They can never be surprised or outmaneuvered tactically, always remaining multiple steps ahead and outplaying anyone when it comes to trials of the mind.",
            "S": "This Bloxian can solve and mitigate combative problems that would overwhelm even the most advanced fighters, boasting an incredible and nearly-unmatched capacity to predict, adapt, and exploit the weaknesses of their enemy. They are a masterful tactician, boasting near-perfect strategic awareness at all times.",
            "A": "This Bloxian has renowned combat intelligence that allows them to perform large-scale strategic thinking on the fly. They are an incredible tactician, carefully plotting and keeping a keen eye on their targets to quickly and accurately create countermeasures to defeat their enemies. They remain two steps ahead as often as they can, to hold a combative edge against opponents stronger than them.",
            "B": "This Bloxian's combat intelligence is very high, allowing them to quickly adapt themselves to a variety of situations, planning carefully and executing thought-out plans on a whim. They can analyze most opponents to form the best courses of action and formulate counteractions to their strengths.",
            "C": "This Bloxian has intelligence which enables them to think quickly and tactfully, picking up on advanced opponents and adapting their strategy mid-combat with slight effort. Through combat and trial and error, they can eventually deduce the weaknesses of an enemy and exploit them to attain victory.",
            "D": "This Bloxian's tactical capacity grants them decent intelligence in combat, forming solutions to problems over the course of a battle. They can figure out weaknesses of their enemies when given enough time to think, though complex abilities or powerful opponents may hinder their capacity to understand.",
            "E": "This Bloxian has a slight understanding of combat, allowing them to handle equally-matched opponents and plan accordingly to their enemy.",
            "F": "This Bloxian has no combat experience whatsoever and will underperform heavily against essentially any opponents."
          }
        },
        { 
          name: "Wisdom", 
          description: "The general intelligence and clarity of Bloxians, specifically outside of combat situations.",
          grades: {
            "Ø": "This Bloxian is omniscient and all-knowing of any information that has been known, is known, or will be known. No subject, regardless of its nature or complexity, can and will be understood if it is not already. It is impossible to withhold information of any kind.",
            "S": "This Bloxian's intellect far surpasses almost all others, making them a prodigy. Everything that realistically can be learnt, is either already known or will soon come to be understood. They master new fields incredibly quickly so long as they are physically able, and are incredibly well-versed and wise in all walks of life.",
            "A": "This Bloxian is nearly a genius in terms of their intelligence, with almost no fields or studies remaining impossible to learn or understand. They bear advanced reasoning and intellect, thoroughly educated on a variety of different subjects, and never struggling to learn something new.",
            "B": "This Bloxian has lots of wisdom and intellect to spare, capable of solving complex problems and making logical deductions and solutions with relative ease. They quickly pick up on new skills, and have little difficulty learning new things beyond their comfort zone.",
            "C": "This Bloxian is decently intelligent and can understand increasingly-complex concepts, coming to reason through their advanced problem-solving skills. They often master new fields quicker than most, and make out to be very wise.",
            "D": "This Bloxian has notably high intelligence compared to most Bloxians, capable of understanding advanced problems and concepts. They're often wise and full of clarity for their age.",
            "E": "This Bloxian displays notable intelligence and understandings in life, capable of thinking quickly and acting resourcefully. Stressful situations may cause them to lock up.",
            "F": "This Bloxian shows intelligence consistent with (or below) the average IQ of a civilian, capable of basic problem solving and reasoning."
          }
        },
        { 
          name: "Stability", 
          description: "How mentally sane or stable a Bloxian is, including how resistant they are to mental manipulation.",
          grades: {
            "Ø": "This Bloxian's mind exists beyond the concepts of sanity and insanity, operating on a level of consciousness that transcends all conventional understanding. Their mental fortitude is absolute and impenetrable, rendering them completely immune to any and all forms of manipulation, deception, or mental intrusion regardless of the methods or abilities employed. No force, ability, or entity can compromise their mind.",
            "S": "This Bloxian possesses extraordinary mental stability and clarity, maintaining perfect composure even when subjected to extreme psychological torture, trauma, or stress. Their mind is a fortress that resists virtually all forms of manipulation, trickery, and mental abilities. Only the most powerful reality-warping abilities might have a chance, though even those would require tremendous effort.",
            "A": "This Bloxian has exceptional mental fortitude and remarkable emotional control, remaining calm and rational even in the most dire and stressful circumstances. They can easily identify and resist most forms of manipulation, deception, and mental intrusion. Advanced mental abilities may affect them, but they'll likely recognize the attempt and work to counteract it.",
            "B": "This Bloxian maintains strong mental stability and composure across most situations, rarely losing their cool or breaking under pressure. They can identify and resist common forms of manipulation and trickery with relative ease. More sophisticated mental manipulation or abilities may affect them, though they'll often realize something is amiss.",
            "C": "This Bloxian has good mental stability and generally maintains their composure in stressful situations. They can resist basic manipulation attempts and recognize obvious deception. More advanced or subtle manipulation techniques may succeed, especially when combined with abilities or prolonged exposure.",
            "D": "This Bloxian maintains decent mental stability under normal circumstances, though stressful situations may cause them to falter. They remain susceptible to skilled manipulation and deception, particularly when caught off-guard or under duress. Mental abilities and sustained psychological pressure can compromise their judgment.",
            "E": "This Bloxian has fragile mental stability and struggles to maintain composure when under significant stress or pressure. They are easily manipulated through common tactics such as lies, guilt-tripping, or emotional exploitation. Their judgment becomes clouded quickly in high-stress situations.",
            "F": "This Bloxian is either severely mentally unstable or pathetically easy to manipulate—often both. They may suffer from delusions, paranoia, or other mental conditions that severely impair their judgment. Even the most basic manipulation tactics work effortlessly on them, and they can be tricked or deceived with minimal effort."
          }
        }
      ]
    }
  };

  // Ability Statistics structure (to be updated later with subcategories)
  const abilityStats = {
    "Offense": {
      description: "Measures a character's ability to deal damage and harm opponents through their abilities, weapons, or techniques.",
      grades: {
        "Ø": "An ability with transcendent power that carries strength immeasurable by standard metric units. Entire worlds or portions of the Bloxiverse would be trivial to wipe clean, and the user may be capable of obliterating esoteric materials such as concepts.",
        "S": "An ability that bears world-shattering destructive power, likely capable of reshaping continents of land or puncturing even Bloxite-reinforced structures.",
        "A": "An ability that, with some effort, could level entire portions of larger cities or obliterate smaller settlements with enough focus.",
        "B": "An ability that has little difficulty levelling large buildings, and even structures that have been reinforced with enough power.",
        "C": "An ability that enables the destruction of smaller-scale structures and vehicles, such as shops or cars.",
        "D": "An ability granting notable increases in destructive potential, allowing for a wielder to damage or destroy small objects such as cars or armored doors with effort.",
        "E": "An ability that grants a slightly notable boost in power over civilians with no power to their name. May be able to damage or destroy objects and terrain made of weaker metals, stone, and wood.",
        "F": "An ability that does not grant any boosts or increases in a user's destructive potential, whatsoever. Comparable damage to that of a civilian."
      }
    },
    "Defense": {
      description: "Represents how well a character can protect themselves from incoming attacks, whether through armor, shields, or defensive abilities.",
      grades: {
        "Ø": "An ability that grants an absolute defense, preventing any and all conceivable forms of harm from ever inflicting injury on a user. This protection may be extendable to other beings or objects beyond the user themselves.",
        "S": "An ability granting the user a means to defend themself against many or all standard forms of harm, including physical trauma, ability-based trauma. Rail-cannon impacts and mountain-shattering blows are tolerable in smaller numbers. Likely capable of resisting or negating most environmental hazards such as heat, frost, radiation, and/or toxicity.",
        "A": "An ability that enables a user to defend themselves against a majority of stronger blunt-force trauma, and ability-based trauma. Can likely endure most weaker explosives, and ability-amplified physical attacks. Likely resistant to one or more environmental hazards, such as heat, frost, and/or electricity.",
        "B": "An ability which allows the user to protect themselves against a majority of standard blunt-force trauma, and certain abilities. May resist certain weak environmental hazards, such as fire or frost.",
        "C": "An ability granting the user a decent means to defend themselves, typically against common physical-based attacks. It may be able to resist the effects of certain abilities under specific circumstances.",
        "D": "An ability granting a notable defense against weaker forms of physical-based damage including punches and kicks, and weaker firearms. Very situationally, it may work as a form of defense against other abilities on a weaker scale.",
        "E": "An ability granting a slight enhancement to a user's defense, typically against extremely weak forms of blunt-force trauma, such as punches and kicks. May be able to tolerate weaker firearms. Likely ineffective against ability-based attacks.",
        "F": "An ability that offers no defensive applications in combat whatsoever, comparable to that of a civilian."
      }
    },
    "Utility": {
      description: "Evaluates the versatility and practical applications of a character's abilities outside of direct combat scenarios.",
      grades: {
        "Ø": "An ability with near-limitless potential for applications, both in and out of combat. Thought alone can accomplish a majority of the user's desires, potentially allowing them to manipulate entire segments of reality or alter causality on a whim. May be able to fathom physical materials or constructs of any scale into existence from nothing.",
        "S": "An ability that has countless practical uses in application, both in and out of combat. With negligible effort, one could perform miraculous feats such as ecosystem-reshaping, reality-scale teleportation, or alchemy allowing them to turn any material into another.",
        "A": "An ability with remarkable utilitarian potential, likely in circumstances both related to-- and out-- of combat. Feats may include an exceptional one-fits-all tool, or offer an extremely powerful means of transportation, or perhaps heal biological entities with slight effort.",
        "B": "An ability with smaller-scaled utilitarian applications, mostly combat-oriented. Such feats may include local-ranged teleportation, entity/structure scanning, psychic awareness or manipulation, and minor injury healing.",
        "C": "An ability with some offensive-oriented utilitarian applications. Feats could include basic medical applications, generic scanning and/or analyzing, or minor psychic abilities.",
        "D": "An ability with notable potential as a utility, exclusively for combat. May include sensory enhancement, improved mobility, or specialized tools applicable in certain situations or circumstances.",
        "E": "An ability with slight enhancements to a user's potential as a utilitarian. Likely has extremely specific tools or situational abilities that are impractical unless applied in hyper-circumstantial combat situations.",
        "F": "An ability that offers no utilitarian potential in combat, equivalent and comparable to that of a civilian."
      }
    },
    "Potential": {
      description: "Assesses the theoretical maximum power or growth capacity of a character's abilities under optimal conditions.",
      grades: {
        "Ø": "An ability offering an infinite capacity for growth, with no conceivable limits or ceiling for improvement. With effort, one could transcend the known boundaries or limits established by reality itself.",
        "S": "An ability with near-boundless potential yet to be tapped into, with the possibility to reach planetary or cosmic levels of influence. The user may develop and improve their skills and power rapidly.",
        "A": "An ability with a large reserve of potential, and will likely go on to be honed into an extremely formidable force in a short amount of time if the user is given a chance.",
        "B": "An ability that still has plenty of room to grow, allowing a user to hone their skills and train themselves to master their potential, evolving their powers into remarkable tools and weapons.",
        "C": "An ability that has decent room for growth, allowing a user to sharpen their skills and develop above-standard competency through training.",
        "D": "An ability that likely cannot be improved, but can be mastered through dedication and significant effort.",
        "E": "An ability that cannot be physically strengthened or improved, but may be honed or refined to improve efficiency and techniques.",
        "F": "An ability that has no further room for growth, irrelevant of a user's training or efforts to do so."
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Statistic Information
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Understanding the grading system and what each statistic represents in character evaluations.
        </p>
      </div>

      {/* 8-Grade Legend */}
      <Card className="mb-8 rounded-2xl shadow-xl border-2">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-3xl">8-Grade System</CardTitle>
          </div>
          <CardDescription className="text-base">
            The 8-tier grading system used to evaluate character statistics and abilities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {grades.map((grade) => (
              <div
                key={grade.grade}
                className="flex items-start space-x-3 p-4 rounded-xl border-2 bg-card/50 hover:bg-card/80 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <Badge
                  variant="outline"
                  className={`text-xl font-bold min-w-[48px] h-12 justify-center ${grade.color} text-white border-none shadow-lg flex-shrink-0`}
                >
                  {grade.grade}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground leading-tight">
                    {grade.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Physical Statistics */}
        <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Sword className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-3xl">Physical Statistics</CardTitle>
            </div>
            <CardDescription className="text-base">
              These stats measure a character's physical capabilities and combat prowess
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(physicalStats).map(([categoryName, categoryData]) => (
                  <Collapsible
                  key={categoryName}
                  open={openStats[`physical-${categoryName}`]}
                  onOpenChange={() => toggleStat(`physical-${categoryName}`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 rounded-xl border-2 bg-card/50 hover:bg-card/80 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="font-bold text-base px-3 py-1"
                          >
                          {categoryName}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground pr-4">
                        {categoryData.description}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-6 w-6 text-primary transition-all duration-300 ease-out flex-shrink-0",
                        openStats[`physical-${categoryName}`] ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-5 pt-4 space-y-3">
                      {/* Subcategories */}
                      {categoryData.subcategories.map((subcat) => (
                        <Collapsible
                          key={subcat.name}
                          open={openStats[`subcat-${categoryName}-${subcat.name}`]}
                          onOpenChange={() => toggleStat(`subcat-${categoryName}-${subcat.name}`)}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border-2 bg-background/30 hover:bg-background/50 hover:shadow-md transition-all duration-200">
                            <div className="text-left flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs font-medium">
                                  {subcat.name}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground pr-4">
                                {subcat.description}
                              </p>
                            </div>
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 text-primary transition-all duration-300 ease-out flex-shrink-0",
                                openStats[`subcat-${categoryName}-${subcat.name}`] ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="px-4 pb-4 pt-3 mt-2 ml-4 border-l-2 border-primary/20">
                              <div className="grid gap-2">
                                {Object.entries(subcat.grades).map(([grade, description]) => {
                            const gradeInfo = grades.find((g) => g.grade === grade);
                            return (
                              <div
                                key={grade}
                                      className="flex items-start space-x-3 p-3 rounded-lg border-2 bg-background/40 backdrop-blur-sm hover:shadow-sm transition-shadow"
                              >
                                <Badge
                                  variant="outline"
                                        className={`text-sm font-bold min-w-[36px] h-9 justify-center ${gradeInfo?.color} text-white border-none shadow-sm flex-shrink-0`}
                                >
                                  {grade}
                                </Badge>
                                <div className="flex-1">
                                        <div className="text-xs text-foreground leading-relaxed">
                                    {description}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ability Statistics */}
        <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-3xl">Ability Statistics</CardTitle>
            </div>
            <CardDescription className="text-base">
              These stats evaluate the effectiveness and potential of a character's special abilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(abilityStats).map(([statName, statData]) => (
                  <Collapsible
                    key={statName}
                  open={openStats[`ability-${statName}`]}
                  onOpenChange={() => toggleStat(`ability-${statName}`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 rounded-xl border-2 bg-card/50 hover:bg-card/80 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="font-bold text-base px-3 py-1"
                          >
                            {statName}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground pr-4">
                        {statData.description}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-6 w-6 text-primary transition-all duration-300 ease-out flex-shrink-0",
                        openStats[`ability-${statName}`] ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-5 pb-5 pt-4">
                        <div className="grid gap-3">
                        {Object.entries(statData.grades).map(([grade, description]) => {
                            const gradeInfo = grades.find((g) => g.grade === grade);
                            return (
                              <div
                                key={grade}
                                className="flex items-start space-x-3 p-4 rounded-xl border-2 bg-background/50 backdrop-blur-sm hover:shadow-md transition-shadow"
                              >
                                <Badge
                                  variant="outline"
                                  className={`text-base font-bold min-w-[40px] h-10 justify-center ${gradeInfo?.color} text-white border-none shadow-md flex-shrink-0`}
                                >
                                  {grade}
                                </Badge>
                                <div className="flex-1">
                                  <div className="text-sm text-foreground leading-relaxed">
                                    {description}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
