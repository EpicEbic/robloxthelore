import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Sword, Shield, Zap, Target, Brain, X, Quote, BarChart3 } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Grade definitions with colors and styling
const GRADES = [
  { 
    grade: "Ø", 
    name: "Godlike",
    description: "Unfathomable levels of power that transcend known limits, often existing beyond logistical reasoning and comprehension. Godlike and effectively unstoppable.", 
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    border: "border-purple-400",
    text: "text-purple-300",
    bg: "bg-purple-900/40"
  },
  { 
    grade: "S", 
    name: "Supreme",
    description: "Mastery and peak performance, rivaled by little to none. A quality displayed by the best of the best, serving as a force not to be messed with or taken lightly.", 
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    border: "border-blue-400",
    text: "text-blue-300",
    bg: "bg-blue-900/40"
  },
  { 
    grade: "A", 
    name: "Exceptional",
    description: "High-ranking proficiency that outclasses a majority of others, even those with lots of experience.", 
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    border: "border-green-400",
    text: "text-green-300",
    bg: "bg-green-900/40"
  },
  { 
    grade: "B", 
    name: "Remarkable",
    description: "Capabilities and excellence that goes far beyond the standard and intermediate expectations.", 
    color: "bg-gradient-to-r from-yellow-300 to-yellow-500",
    border: "border-yellow-400",
    text: "text-yellow-300",
    bg: "bg-yellow-900/40"
  },
  { 
    grade: "C", 
    name: "Proficient",
    description: "Skills or capabilities that are well-versed and generally solid in most circumstances.", 
    color: "bg-gradient-to-r from-orange-400 to-orange-500",
    border: "border-orange-400",
    text: "text-orange-300",
    bg: "bg-orange-900/40"
  },
  { 
    grade: "D", 
    name: "Notable",
    description: "Notably proficient and powerful, though nothing too exceptional.", 
    color: "bg-gradient-to-r from-orange-700 to-orange-800",
    border: "border-orange-600",
    text: "text-orange-400",
    bg: "bg-orange-950/40"
  },
  { 
    grade: "E", 
    name: "Above Average",
    description: "Skillsets or potential above the average civilian, but nothing more.", 
    color: "bg-gradient-to-r from-red-500 to-red-600",
    border: "border-red-400",
    text: "text-red-300",
    bg: "bg-red-900/40"
  },
  { 
    grade: "F", 
    name: "Civilian",
    description: "A civilian-standard grade, when skills or capabilities do not go beyond the norm of society.", 
    color: "bg-gradient-to-r from-gray-500 to-gray-600",
    border: "border-gray-400",
    text: "text-gray-300",
    bg: "bg-gray-800/40"
  },
];

interface Grade {
  grade: string;
  name: string;
  description: string;
  color: string;
  border: string;
  text: string;
  bg: string;
}

interface Subcategory {
  name: string;
  description: string;
  grades: Record<string, string>;
}

interface Category {
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  subcategories: Subcategory[];
}

// Physical Statistics data
const PHYSICAL_STATS: Category[] = [
  {
    name: "Offense",
    description: "Measures a character's offensive capabilities through physical power and combat effectiveness.",
    icon: Sword,
    iconColor: "from-red-500 to-orange-500",
    subcategories: [
      {
        name: "Power",
        description: "How physically powerful a Bloxian's body is, including their destructive potential.",
        grades: {
          "Ø": "This Bloxian's destructive potential is so immeasurably high that obliterating entire Worlds is child's play. A flick of their finger could reshape vast portions of the Bloxiverse. The sheer force behind their movements could level civilizations without a second thought.",
          "S": "This Bloxian can reshape entire landscapes with minimal effort, annihilating large-scale cities or mountain ranges with a single strike. Their destructive output rivals natural disasters, leaving devastation in their wake.",
          "A": "This Bloxian can level outposts or smaller cities in just a punch or two. Reinforced structures crumble before them, and their strikes carry enough force to cause localized earthquakes.",
          "B": "This Bloxian's power enables them to destroy entire buildings through their fists alone. They can shatter boulders like glass and punch through reinforced walls with focused effort.",
          "C": "This Bloxian can bring harm to most natural materials including wood, stone, and weaker metals with relative ease. Their strikes carry significant force behind them.",
          "D": "This Bloxian has strength allowing them to damage weaker materials such as wood and stone. With focused effort, they may dent weaker metals.",
          "E": "This Bloxian has slightly above-average strength, giving them a small edge in hand-to-hand combat. They can damage materials such as wood with significant effort.",
          "F": "This Bloxian has no notable strength beyond a standard civilian. They struggle to bring harm beyond their own level."
        }
      },
      {
        name: "Lift",
        description: "How much weight a Bloxian can comfortably (or uncomfortably) tolerate at one time.",
        grades: {
          "Ø": "This Bloxian can manipulate objects of any mass as though they were weightless. Planets, stars, and celestial bodies pose no challenge—weight is simply irrelevant to them.",
          "S": "This Bloxian can manipulate entire islands of weight at a time as though they were toys. Massive structures like skyscrapers can be hoisted and thrown with ease.",
          "A": "This Bloxian can take on the entire weight of tall buildings, lifting and throwing them like projectiles. Heavy military vehicles are manageable with effort.",
          "B": "This Bloxian can perform remarkable feats, benchpressing vehicles with one hand and tossing boulders as if they were soccer balls.",
          "C": "This Bloxian can manhandle larger and heavier objects such as motorcycles and small boulders with relative comfort.",
          "D": "This Bloxian's lifting capacity enables them to handle larger and bulkier objects with relative ease, such as heavy furniture or small vehicles.",
          "E": "This Bloxian is capable of lifting a decent amount of weight, such as bulky rocks or heavy equipment, with noticeable strain.",
          "F": "This Bloxian has a limited lifting capacity consistent with an average civilian, struggling with anything particularly heavy."
        }
      },
      {
        name: "Penetration",
        description: "How easily a Bloxian can bypass or pierce through defensive layers.",
        grades: {
          "Ø": "This Bloxian's attacks transcend all forms of defense. Any and all protective measures are ignored entirely—if they strike, the damage connects in full, guaranteed.",
          "S": "This Bloxian obliterates all known lines of defense regardless of abilities or materials. No amount of Bloxite armor or layered protection can stop their assault.",
          "A": "This Bloxian tears through the strongest defenses with ease, including multi-layered equipment and stacked abilities. Only Bloxite-reinforced protections may hold.",
          "B": "This Bloxian easily penetrates specialized equipment and abilities, shattering defenses like butter. Only the toughest protections may resist.",
          "C": "This Bloxian can bypass most standard materials and medium-class armors formed of iron and titanium. Their blows carry tremendous penetrating force.",
          "D": "This Bloxian can bypass low-end abilities and armor formed of weaker materials like stone and wood. Flimsy metal armor may also be pierced with effort.",
          "E": "This Bloxian has above-average penetrating power, enabling them to bypass the weakest barriers or cheap protective gear.",
          "F": "This Bloxian has no notable capability to penetrate defenses beyond that of typical civilians."
        }
      },
      {
        name: "Intensity",
        description: "How much consistent pressure a Bloxian can apply against their opponent.",
        grades: {
          "Ø": "This Bloxian applies unyielding pressure without pause, capable of attacking continuously with no reprieve for the opponent. Their assault is perpetual and inescapable.",
          "S": "This Bloxian maintains constant aggressive pressure with virtually no openings. Escape becomes near-impossible without specialized means of fleeing.",
          "A": "This Bloxian applies strong, consistent pressure throughout combat, forcing opponents to remain defensive and search desperately for counterattack windows.",
          "B": "This Bloxian applies significant pressure, often cornering opponents into tight combat situations where they maintain a consistent upper hand.",
          "C": "This Bloxian is moderately skilled at keeping pressure on targets, often forcing them into combos or overwhelming them through persistence.",
          "D": "This Bloxian is capable of applying some pressure in combat, though it may be inconsistent or easy to counter.",
          "E": "This Bloxian has limited skills for maintaining offensive pressure, occasionally staying consistent but often struggling.",
          "F": "This Bloxian fails to apply meaningful pressure in combat, whether due to weakness, style, or physique."
        }
      }
    ]
  },
  {
    name: "Defense",
    description: "Represents a character's defensive capabilities and resistance to damage.",
    icon: Shield,
    iconColor: "from-blue-500 to-cyan-500",
    subcategories: [
      {
        name: "Toughness",
        description: "How many injuries (and the intensity of these injuries) a Bloxian can sustain before becoming incapacitated.",
        grades: {
          "Ø": "This Bloxian is completely invulnerable to all physical forms of injury. No amount or intensity of damage could incapacitate them or lower their body's integrity in any way.",
          "S": "This Bloxian shrugs off cataclysmic explosions that could shatter mountains, sustaining minimal injuries. No standard weapons pose any threat to them.",
          "A": "This Bloxian tolerates ground-trembling impacts that could eviscerate reinforced buildings, sustaining only minor injuries. Their skin essentially cannot be cut.",
          "B": "This Bloxian remains composed when faced with attacks capable of destroying buildings, sustaining only minor injuries. Their muscles resist firearms and most blades.",
          "C": "This Bloxian can withstand being tossed through weaker structures and shrug off smaller cuts and wounds. Standard blunt weapons are ineffective.",
          "D": "This Bloxian is tough enough to withstand blunt force longer, but remains susceptible to sharp weapons. They only bruise from extremely rough impacts.",
          "E": "This Bloxian's body tolerates injury better than most, preventing easy cuts or bruises. They remain vulnerable to basic weaponry.",
          "F": "This Bloxian is just as susceptible to injury as any civilian, easily hurt by common accidents."
        }
      },
      {
        name: "Vitality",
        description: "How healthy a Bloxian is generally, including their fitness and tolerance to disease, poisons, etc.",
        grades: {
          "Ø": "This Bloxian's body is completely immune to all forms of physical degradation, illness, or aging. Their health cannot be diminished by any means.",
          "S": "This Bloxian regenerates from most injuries in record times and ignores almost all illnesses and toxic materials. They may entirely halt aging.",
          "A": "This Bloxian has exceptional vitality, recovering quickly from fatal injuries and shrugging off most illnesses and poisons. They age significantly slower.",
          "B": "This Bloxian's body is incredibly healthy, withstanding serious conditions like blood loss and infection. They resist weaker poisons almost entirely.",
          "C": "This Bloxian is remarkably healthy, shrugging off most illnesses due to a strong immune system. They tolerate weaker poisons but remain vulnerable to overexposure.",
          "D": "This Bloxian has notably high vitality, tolerating minor ailments better than average. Disease is less effective, though stronger illnesses still affect them.",
          "E": "This Bloxian's health rests above average, but they remain vulnerable to illnesses and injury.",
          "F": "This Bloxian is no healthier than a typical citizen, vulnerable to poison, disease, and aging."
        }
      },
      {
        name: "Thermostability",
        description: "How well a Bloxian can withstand harsh environmental conditions, such as extreme heat or frost.",
        grades: {
          "Ø": "This Bloxian is completely immune to all temperature extremes. Whether plunged into absolute zero or the heart of a star, they remain entirely unaffected.",
          "S": "This Bloxian can withstand temperatures that would vaporize or freeze ordinary matter, including the surface of stars or the void of deep space.",
          "A": "This Bloxian handles extreme temperatures with ease, from volcanic heat to arctic cold, barely noticing conditions that would kill others instantly.",
          "B": "This Bloxian withstands most temperature extremes with minimal effort, shrugging off severe heat and cold that would incapacitate others.",
          "C": "This Bloxian has strong tolerance toward temperature extremes, handling harsh heat or bitter cold better than most.",
          "D": "This Bloxian can tolerate most standard environments, ignoring bitter cold or sweltering heat that would discomfort others.",
          "E": "This Bloxian may tolerate extreme temperatures for longer periods, but not indefinitely. Without protection, they will eventually succumb.",
          "F": "This Bloxian cannot tolerate temperature extremes without special protection, vulnerable to both extreme heat and cold."
        }
      },
      {
        name: "Esotolerance",
        description: "How well a Bloxian can tolerate rarer hazards, such as cosmic energy, electricity, or radiation.",
        grades: {
          "Ø": "This Bloxian is completely immune to all esoteric hazards. Radiation, electricity, cosmic forces, and any other exotic dangers are entirely harmless to them.",
          "S": "This Bloxian can tolerate exceptionally lethal hazards such as the rupturing gravity of black holes or concentrated cosmic radiation without issue.",
          "A": "This Bloxian withstands most esoteric hazards like radiation, electricity, and cosmic energy with ease, perhaps not even noticing them.",
          "B": "This Bloxian can tolerate advanced hazards such as radiation and electricity in large quantities with minimal discomfort.",
          "C": "This Bloxian may handle advanced hazards including electricity and radiation, having notable resistance to one or more.",
          "D": "This Bloxian may be resistant to esoteric hazards such as radiation or electricity, tolerating exposure better than average.",
          "E": "This Bloxian may tolerate minor exposure to esoteric hazards, but extended contact will cause harm.",
          "F": "This Bloxian has no special tolerance for esoteric hazards, fully vulnerable to radiation, electricity, and other exotic dangers."
        }
      }
    ]
  },
  {
    name: "Agility",
    description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
    icon: Zap,
    iconColor: "from-yellow-500 to-amber-500",
    subcategories: [
      {
        name: "Swiftness",
        description: "How quickly a Bloxian can move from one point to another.",
        grades: {
          "Ø": "This Bloxian moves at speeds comparable to teleportation. Entire regions of the Bloxiverse can be crossed in the blink of an eye. Their movement leaves devastation in its wake.",
          "S": "This Bloxian travels at excessive speeds that shatter the sound barrier on a whim, covering entire Worlds in seconds.",
          "A": "This Bloxian rapidly matches the speeds of sports cars and specialized high-speed vehicles. Entire regions can be crossed with time.",
          "B": "This Bloxian can outrun most motorized vehicles when at maximum speed. Large fields are cleared in seconds.",
          "C": "This Bloxian quickly reaches and maintains a fast pace, outrunning manual vehicles like bicycles with ease.",
          "D": "This Bloxian achieves speeds comparable to trained athletes, moving notably faster than civilians.",
          "E": "This Bloxian can sprint faster than civilians but is still outpaced by vehicles and trained athletes.",
          "F": "This Bloxian isn't capable of reaching speeds beyond an average citizen."
        }
      },
      {
        name: "Acceleration",
        description: "How quickly a Bloxian can reach their top speeds.",
        grades: {
          "Ø": "This Bloxian achieves maximum velocity instantaneously. There is no buildup—they simply move at their desired speed the moment they choose to.",
          "S": "This Bloxian accelerates to their top speed in fractions of a second, appearing to teleport to observers.",
          "A": "This Bloxian reaches maximum speed almost instantly, requiring only a step or two to achieve full velocity.",
          "B": "This Bloxian accelerates remarkably fast, reaching top speed in just a few strides with minimal buildup.",
          "C": "This Bloxian builds speed quickly, reaching their maximum within several seconds of beginning movement.",
          "D": "This Bloxian accelerates faster than average, requiring less time than most to reach their top speed.",
          "E": "This Bloxian accelerates at a slightly above-average rate, reaching speed faster than untrained individuals.",
          "F": "This Bloxian accelerates slowly, requiring significant time and distance to reach their maximum speed."
        }
      },
      {
        name: "Flexibility",
        description: "How easily and gracefully a Bloxian can maneuver through complicated environments.",
        grades: {
          "Ø": "This Bloxian can freely contort and warp their body to improbable extents, achieving any shape or form with sufficient mass.",
          "S": "This Bloxian is a master contortionist, dislocating limbs and displacing bone to effortlessly avoid any incoming attack.",
          "A": "This Bloxian comfortably handles and avoids attacks from multiple enemies, effortlessly dodging melee weaponry and trained fighters.",
          "B": "This Bloxian tolerates multiple close-quarters opponents, manipulating their body with extreme control to weave around complex attacks.",
          "C": "This Bloxian expertly manipulates their body to weave and avoid close-quarters combat from multiple fighters.",
          "D": "This Bloxian efficiently weaves against skilled fistfighters and may predict and dodge slower melee weapons.",
          "E": "This Bloxian can bend and manipulate themselves to avoid simple attacks like punches and kicks.",
          "F": "This Bloxian lacks flexibility beyond the average civilian, unable to perform advanced maneuvers."
        }
      },
      {
        name: "Endurance",
        description: "How much stamina a Bloxian has, as well as how quickly they burn through it.",
        grades: {
          "Ø": "This Bloxian has boundless stamina that physically cannot run dry. They operate at peak capacity indefinitely, requiring no sustenance.",
          "S": "This Bloxian essentially never tires, effortlessly handling any physical task. They may last entire days without rest.",
          "A": "This Bloxian's endurance allows running and sprinting with no noticeable stamina impact. They need less sleep and food.",
          "B": "This Bloxian handles cross-country journeys without much sleep, scaling tall cliffs and holding their breath for minutes.",
          "C": "This Bloxian tolerates marathon sprints or mountain climbs without breaking a sweat, though prolonged activity eventually tires them.",
          "D": "This Bloxian has notable endurance for large-distance treks. Stressful actions may still exhaust them after time.",
          "E": "This Bloxian tolerates decent-length sprints before eventually tiring and requiring a break.",
          "F": "This Bloxian has limited stamina, becoming breathless from short distances and basic exercise."
        }
      }
    ]
  },
  {
    name: "Precision",
    description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
    icon: Target,
    iconColor: "from-green-500 to-emerald-500",
    subcategories: [
      {
        name: "Accuracy",
        description: "How consistently a Bloxian will land hits on their target.",
        grades: {
          "Ø": "This Bloxian's accuracy is absolute. Every strike lands exactly where intended with flawless precision, regardless of conditions or obstacles. They never miss their mark.",
          "S": "This Bloxian strikes with near-perfect precision, nailing their intended targets almost without fail even in extremely hostile conditions or against evasive opponents.",
          "A": "This Bloxian attacks with incredible accuracy, consistently landing hits on their targets. They struggle only against the nimblest opponents who can actively evade.",
          "B": "This Bloxian has remarkable accuracy, remaining precise and dangerous even in unfortunate conditions. Most of their attacks connect as intended.",
          "C": "This Bloxian consistently strikes their targets with notable precision above casual combatants. They can reliably hit intended body parts or weak points.",
          "D": "This Bloxian maintains decent accuracy in combat, though quick opponents or stressful situations may cause them to miss more frequently.",
          "E": "This Bloxian handles combat with slight accuracy above untrained combatants, but many attacks may miss or hit unintended areas.",
          "F": "This Bloxian is extremely inaccurate, throwing attacks without care or precision. They frequently miss their intended targets entirely."
        }
      },
      {
        name: "Range",
        description: "How far of a distance a Bloxian can comfortably and consistently fight from.",
        grades: {
          "Ø": "This Bloxian can engage targets at any distance with perfect effectiveness. Range is meaningless—they strike with equal lethality across dimensions and vast distances.",
          "S": "This Bloxian operates effectively at extreme distances that would be impossible for others, engaging targets miles away with full combat effectiveness.",
          "A": "This Bloxian excels at very long ranges, comfortably engaging targets hundreds of meters away while maintaining full combat capability.",
          "B": "This Bloxian operates effectively at long range, comfortable with distances that would challenge most marksmen and remaining dangerous from afar.",
          "C": "This Bloxian handles moderate ranges well, effective with ranged weapons at reasonable distances where they can still apply pressure.",
          "D": "This Bloxian is comfortable at shorter ranges, preferring closer combat but capable of engaging at modest distances when necessary.",
          "E": "This Bloxian struggles at range, most effective only at close quarters where distance is not a factor.",
          "F": "This Bloxian can only fight effectively at point-blank range, if at all. Any meaningful distance severely hampers their combat effectiveness."
        }
      },
      {
        name: "Dexterity",
        description: "How fine a Bloxian's motor control is, as well as how quick and steady their hands are while under pressure.",
        grades: {
          "Ø": "This Bloxian's motor control is absolutely unmatched. Any physical action is performed flawlessly regardless of conditions—guaranteed.",
          "S": "This Bloxian's dexterity is world-class, performing seemingly-impossible feats like surgery in a crashing helicopter.",
          "A": "This Bloxian handles advanced tools with extreme precision even when suffering injuries or in terrible conditions.",
          "B": "This Bloxian has remarkable handling of advanced tools and weaponry, shrugging off stress and maintaining quality.",
          "C": "This Bloxian has good handling of tools and weapons, keeping steady hands in pressing situations.",
          "D": "This Bloxian has decent motor control, operating standard tools efficiently. Stress may reduce effectiveness.",
          "E": "This Bloxian handles simpler tools with notable accuracy, though skills crumble under stress.",
          "F": "This Bloxian has minimal dexterity, fumbling tasks easily and degrading quickly under pressure."
        }
      },
      {
        name: "Reactivity",
        description: "How quickly and effectively a Bloxian can react to sources of danger.",
        grades: {
          "Ø": "This Bloxian's reflexes transcend time, initiating countermeasures at speeds beyond comprehension before threats materialize.",
          "S": "This Bloxian reacts at improbable speeds, forming countermeasures steps ahead. Sneak attacks are nearly impossible.",
          "A": "This Bloxian effortlessly reacts to complex attacks, handling multiple targets and normally-unavoidable injuries like gunfire.",
          "B": "This Bloxian's reflexes are excellent, reacting to common attacks with quick countermeasures and potentially avoiding gunfire.",
          "C": "This Bloxian has strong senses, responding to most threats on a whim. They're difficult to ambush.",
          "D": "This Bloxian has above-average reflexes, reacting to slower attacks and picking up on approaching dangers.",
          "E": "This Bloxian has improved reflexes, handling basic threats and mitigating simpler surprise attacks.",
          "F": "This Bloxian lacks enhanced reflexes, remaining vulnerable and unaware of danger like any civilian."
        }
      }
    ]
  },
  {
    name: "Intelligence",
    description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
    icon: Brain,
    iconColor: "from-purple-500 to-pink-500",
    subcategories: [
      {
        name: "Tactility",
        description: "How clever a Bloxian acts in combat, making smart and careful choices to bring down enemies.",
        grades: {
          "Ø": "This Bloxian has omniscient awareness of combat, knowing every outcome instantaneously. They can never be outmaneuvered tactically.",
          "S": "This Bloxian solves combative problems that would overwhelm the most advanced fighters, with nearly-unmatched capacity to predict and exploit.",
          "A": "This Bloxian has renowned combat intelligence, performing large-scale strategic thinking on the fly and staying steps ahead.",
          "B": "This Bloxian's combat intelligence is very high, quickly adapting to situations and analyzing opponents for countermeasures.",
          "C": "This Bloxian thinks quickly and tactfully, adapting strategy mid-combat and deducing enemy weaknesses through trial.",
          "D": "This Bloxian's tactical capacity grants decent combat intelligence, forming solutions over the course of battle.",
          "E": "This Bloxian has slight combat understanding, handling equally-matched opponents with basic planning.",
          "F": "This Bloxian has no combat experience and will underperform against essentially any opponents."
        }
      },
      {
        name: "Wisdom",
        description: "How smart a Bloxian is in everyday life, including emotional maturity and common skillsets.",
        grades: {
          "Ø": "This Bloxian is omniscient and all-knowing. No subject is beyond their understanding—past, present, or future.",
          "S": "This Bloxian's intellect far surpasses almost all others. Everything that can be learnt is either known or will soon be understood.",
          "A": "This Bloxian is nearly a genius, with almost no fields impossible to learn. They're thoroughly educated and never struggle to learn.",
          "B": "This Bloxian has wisdom to spare, solving complex problems and learning new skills with relative ease.",
          "C": "This Bloxian is decently intelligent, understanding complex concepts and mastering new fields quicker than most.",
          "D": "This Bloxian has notably high intelligence, understanding advanced problems and showing wisdom for their age.",
          "E": "This Bloxian displays notable intelligence, thinking quickly and acting resourcefully. Stress may cause them to lock up.",
          "F": "This Bloxian shows average civilian intelligence, capable of basic problem solving and reasoning."
        }
      },
      {
        name: "Foresight",
        description: "How far and easily a Bloxian can plan ahead, both in and out of combat situations.",
        grades: {
          "Ø": "This Bloxian perceives all possible futures with perfect clarity. Every eventuality is known and accounted for before it happens.",
          "S": "This Bloxian plans many steps ahead with near-perfect accuracy, anticipating outcomes that others couldn't conceive.",
          "A": "This Bloxian excels at long-term planning, anticipating consequences far in advance and preparing contingencies.",
          "B": "This Bloxian plans several steps ahead effectively, considering multiple outcomes and preparing accordingly.",
          "C": "This Bloxian has good foresight, planning ahead for likely outcomes and adapting when things change.",
          "D": "This Bloxian thinks ahead in general terms, considering immediate consequences but struggling with long-term planning.",
          "E": "This Bloxian has limited foresight, occasionally planning ahead but often caught off-guard by developments.",
          "F": "This Bloxian rarely thinks beyond the immediate moment, frequently blindsided by foreseeable consequences."
        }
      },
      {
        name: "Sanity",
        description: "How mentally-stable or sane a Bloxian is, including how resistant they are to mental manipulation.",
        grades: {
          "Ø": "This Bloxian's mind exists beyond sanity and insanity, operating on transcendent consciousness. No force can compromise their mind.",
          "S": "This Bloxian possesses extraordinary mental stability, maintaining composure under extreme psychological torture. Their mind is a fortress.",
          "A": "This Bloxian has exceptional mental fortitude, remaining calm in dire circumstances and resisting most manipulation attempts.",
          "B": "This Bloxian maintains strong mental stability, rarely breaking under pressure and identifying common manipulation.",
          "C": "This Bloxian has good mental stability, maintaining composure in stress and resisting basic manipulation.",
          "D": "This Bloxian maintains decent stability normally, though stress may cause them to falter. Skilled manipulation can affect them.",
          "E": "This Bloxian has fragile stability, struggling under stress and easily manipulated through common tactics.",
          "F": "This Bloxian is severely unstable or easily manipulated—often both. Basic tactics work effortlessly on them."
        }
      }
    ]
  }
];

export function PhysicalStatsGrid() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedStat, setSelectedStat] = useState<{ category: string; subcat: string; grade: string } | null>(null);

  const getGradeInfo = (gradeKey: string) => GRADES.find(g => g.grade === gradeKey);

  return (
    <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-900" />
          </div>
          <CardTitle className="text-3xl">Physical Statistics</CardTitle>
        </div>
        <p className="text-base text-muted-foreground">
          These stats measure a character's physical capabilities and combat prowess. Click on any grade to learn more.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Grade Legend Section */}
        <div className={cn(
          "relative transition-all duration-200",
          selectedGrade ? "min-h-[280px] overflow-hidden" : "overflow-visible"
        )}>
          {/* Expanded Grade View */}
          {selectedGrade && (
            <div 
              className={cn(
                "absolute inset-0 z-10 rounded-xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                selectedGrade.bg,
                selectedGrade.border
              )}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={cn(
                  "absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10",
                  selectedGrade.border.replace("border-", "bg-")
                )} />
                <div className={cn(
                  "absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-10",
                  selectedGrade.border.replace("border-", "bg-")
                )} />
              </div>

              <button
                onClick={() => setSelectedGrade(null)}
                className={cn(
                  "absolute top-4 right-4 p-2 rounded-full z-20 transition-all duration-200",
                  "hover:bg-white/10 hover:scale-110",
                  selectedGrade.border
                )}
              >
                <X className={cn("w-5 h-5", selectedGrade.text)} />
              </button>

              <div className="relative h-full flex flex-col p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center shrink-0",
                    selectedGrade.color,
                    "shadow-lg"
                  )}>
                    <span className="text-3xl font-black text-white">{selectedGrade.grade}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("text-3xl font-bold tracking-tight mb-2", selectedGrade.text)}>
                      Grade {selectedGrade.grade}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-sm font-medium px-3 py-1",
                        selectedGrade.border,
                        selectedGrade.text
                      )}
                    >
                      {selectedGrade.name}
                    </Badge>
                  </div>
                </div>

                <div className={cn(
                  "h-px w-full mb-6",
                  selectedGrade.border.replace("border-", "bg-"),
                  "opacity-40"
                )} />

                <div className="flex-1 flex items-start gap-4">
                  <Quote className={cn("w-8 h-8 shrink-0 opacity-40 mt-1", selectedGrade.text)} />
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed font-light text-foreground/90">
                      {selectedGrade.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground text-center">
                    Press the X button to return to the grid
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Grade Grid */}
          <div className={cn(
            "transition-opacity duration-200",
            selectedGrade ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">Grade Scale</h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
              {GRADES.map((grade) => (
                <button
                  key={grade.grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={cn(
                    "relative p-2 sm:p-3 rounded-lg sm:rounded-xl border sm:border-2 transition-all duration-200",
                    "cursor-pointer flex flex-col items-center justify-center gap-0.5 sm:gap-1",
                    "hover:brightness-110 active:scale-95",
                    "focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-offset-1 sm:focus:ring-offset-2 focus:ring-offset-background",
                    grade.bg,
                    grade.border
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded sm:rounded-lg flex items-center justify-center",
                    grade.color,
                    "shadow-md"
                  )}>
                    <span className="text-base sm:text-xl font-black text-white">{grade.grade}</span>
                  </div>
                  <span className={cn("text-[8px] sm:text-[10px] font-medium text-center leading-tight", grade.text)}>
                    {grade.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-6" />

        {/* Stat Categories */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Stat Categories</h4>
          
          {PHYSICAL_STATS.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <div key={category.name} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    category.iconColor
                  )}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-foreground">{category.name}</h5>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                {/* Subcategory Grids */}
                <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {category.subcategories.map((subcat) => {
                    const isExpanded = selectedStat?.category === category.name && selectedStat?.subcat === subcat.name;
                    const expandedGrade = isExpanded ? getGradeInfo(selectedStat.grade) : null;
                    
                    return (
                      <div 
                        key={subcat.name}
                        className={cn(
                          "relative rounded-lg sm:rounded-xl border p-2 sm:p-3 md:p-4 transition-all duration-200 min-h-[160px] sm:min-h-[180px]",
                          isExpanded ? "overflow-hidden" : "bg-muted/20 overflow-visible"
                        )}
                      >
                        {/* Expanded View - fills entire card */}
                        {isExpanded && expandedGrade && (
                          <div 
                            className={cn(
                              "absolute inset-0 z-10 rounded-xl border-2 p-4 animate-in fade-in zoom-in-95 duration-200",
                              expandedGrade.bg,
                              expandedGrade.border
                            )}
                          >
                            {/* Close button */}
                            <button
                              onClick={() => setSelectedStat(null)}
                              className={cn(
                                "absolute top-2 right-2 p-1.5 rounded-full z-20 transition-all duration-200",
                                "hover:bg-white/10 hover:scale-110",
                                expandedGrade.border
                              )}
                            >
                              <X className={cn("w-4 h-4", expandedGrade.text)} />
                            </button>

                            {/* Content */}
                            <div className="h-full flex flex-col">
                              {/* Header */}
                              <div className="flex items-center gap-3 mb-3">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                  expandedGrade.color,
                                  "shadow-md"
                                )}>
                                  <span className="text-lg font-black text-white">{selectedStat.grade}</span>
                                </div>
                                <div>
                                  <h6 className={cn("font-bold text-sm", expandedGrade.text)}>{subcat.name}</h6>
                                  <span className="text-xs text-muted-foreground">{expandedGrade.name}</span>
                                </div>
                              </div>

                              {/* Divider */}
                              <div className={cn(
                                "h-px w-full mb-3",
                                expandedGrade.border.replace("border-", "bg-"),
                                "opacity-40"
                              )} />

                              {/* Description */}
                              <div className="flex-1 overflow-y-auto">
                                <p className="text-xs leading-relaxed text-foreground/90">
                                  {subcat.grades[selectedStat.grade]}
                                </p>
                              </div>

                              {/* Footer hint */}
                              <div className="mt-3 pt-2 border-t border-white/10">
                                <p className="text-[10px] text-muted-foreground text-center">
                                  Press X to close
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Normal View */}
                        <div className={cn(
                          "transition-opacity duration-200 h-full flex flex-col",
                          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                        )}>
                          <div className="min-h-[60px] sm:min-h-[72px]">
                            <h6 className="font-semibold text-foreground">{subcat.name}</h6>
                            <p className="text-xs text-muted-foreground">{subcat.description}</p>
                          </div>
                          
                          {/* Divider */}
                          <div className="h-px w-full bg-border/50 my-2 sm:my-3" />
                          
                          {/* Grade buttons for this substat */}
                          <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mt-auto">
                            {GRADES.map((grade) => (
                              <button
                                key={grade.grade}
                                onClick={() => setSelectedStat({ category: category.name, subcat: subcat.name, grade: grade.grade })}
                                className={cn(
                                  "p-1 sm:p-1.5 rounded-lg sm:rounded-xl border sm:border-2 transition-all duration-200",
                                  "cursor-pointer flex flex-col items-center justify-center",
                                  "hover:brightness-110 active:scale-95",
                                  "focus:outline-none focus:ring-1 focus:ring-offset-1",
                                  grade.bg,
                                  grade.border
                                )}
                              >
                              <div className={cn(
                                  "w-full aspect-square rounded sm:rounded-lg flex items-center justify-center",
                                  grade.color,
                                  "shadow-sm"
                                )}>
                                  <span className="text-[10px] sm:text-xs font-bold text-white">{grade.grade}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
