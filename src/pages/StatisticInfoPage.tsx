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
          name: "Strength", 
          description: "The raw physical potential of a Bloxian, as well as their lifting capacity.",
          grades: {
            "Ø": "The character has immeasurable strength that cannot be measured by conventional means. They're capable of exerting forces beyond comprehension, levelling planets or portions of the Bloxiverse with no more than a wave.",
            "S": "The character's strength far surpasses the standard, allowing them to use raw force to level mountain ranges, or large-scale cities with minimal effort.",
            "A": "The character's physical strength enables them to bring down smaller settlements or large, reinforced buildings with some effort.",
            "B": "The character can manhandle smaller structures and large objects such as vehicles or boulders. With effort, they can break through reinforced doors, armor, and more.",
            "C": "The character's notable strength allows them to tackle and destroy large and sturdy objects composed of tougher materials such as metal.",
            "D": "The character has strength necessary to damage objects and small structures formed of weaker material, such as stone and wood.",
            "E": "The character has slightly above-average strength, giving them a small edge in hand-to-hand combat against standard civilians. They can damage wood and, with some effort, stone.",
            "F": "The character has no notable strength above the average strength of a civilian."
          }
        },
        { 
          name: "Penetration", 
          description: "The amount of armor or other lines of defense that a Bloxian can penetrate with their attacks.",
          grades: {
            "Ø": "The character can penetrate any conceivable form of defense, regardless of material or power level. Even conceptual or reality-bending defenses offer no resistance.",
            "S": "The character can penetrate virtually all known materials and defensive structures, including Bloxite-reinforced fortifications and advanced energy barriers.",
            "A": "The character can break through most standard defensive measures, including reinforced concrete, standard armor plating, and moderate energy shields.",
            "B": "The character can penetrate common armor types, reinforced doors, and weaker protective barriers with effort.",
            "C": "The character can penetrate standard civilian-grade defenses and weaker armor materials, though stronger protections may resist.",
            "D": "The character has some ability to damage or break through weaker defensive measures, such as basic wooden structures or thin metal barriers.",
            "E": "The character has minimal penetrating power, capable of breaking through only the weakest of barriers or unarmored targets.",
            "F": "The character has no notable penetrating capabilities beyond that of a standard civilian."
          }
        },
        { 
          name: "Intensity", 
          description: "How relentless and pressuring a Bloxian is when in combat.",
          grades: {
            "Ø": "The character can maintain absolutely unending pressure, capable of attacking continuously without any form of reprieve for the opponent. Their assault is perpetual and inescapable.",
            "S": "The character can maintain near-constant offensive pressure, allowing for minimal breathing room. Opponents are forced into constant defensive positions with rare opportunities to counter.",
            "A": "The character can maintain strong, consistent pressure throughout combat, forcing opponents to remain defensive while finding strategic openings for their own attacks.",
            "B": "The character can apply significant pressure during engagements, often overwhelming opponents but may need brief moments to reset or reposition.",
            "C": "The character can apply moderate pressure in combat, capable of forcing defensive reactions but with noticeable gaps that opponents can exploit.",
            "D": "The character can apply some pressure, though it may be inconsistent or easily countered by more skilled opponents.",
            "E": "The character has limited ability to maintain offensive pressure, often struggling to keep opponents on the defensive.",
            "F": "The character has no notable ability to apply combat pressure beyond that of a standard civilian."
          }
        }
      ]
    },
    "Defense": {
      description: "Represents a character's defensive capabilities and resistance to damage.",
      subcategories: [
        { 
          name: "Vitality", 
          description: "The overall physical health of a Bloxian, accounting for their fitness and any conditions they may have.",
          grades: {
            "Ø": "The character has infinite vitality and health, completely immune to all forms of physical degradation, illness, or aging. Their health cannot be diminished by any means.",
            "S": "The character has exceptional vitality, capable of recovering from near-fatal injuries and resisting virtually all forms of illness or physical degradation.",
            "A": "The character has remarkable health and vitality, able to withstand severe injuries and recover quickly from most forms of physical trauma or illness.",
            "B": "The character has strong vitality and health, capable of enduring significant injuries and resisting most common illnesses or physical conditions.",
            "C": "The character has good overall health and vitality, able to recover from moderate injuries and resist minor illnesses.",
            "D": "The character has above-average health and vitality, capable of withstanding minor injuries better than civilians but still vulnerable to serious harm.",
            "E": "The character has slightly improved health compared to civilians, but remains vulnerable to most forms of injury and illness.",
            "F": "The character has no notable vitality or health beyond that of a standard civilian."
          }
        },
        { 
          name: "Toughness", 
          description: "The amount and intensity of physical injuries a Bloxian can sustain before becoming incapacitated.",
          grades: {
            "Ø": "The character is completely invulnerable to physical injury. No amount or intensity of damage can incapacitate them through physical means alone.",
            "S": "The character can tolerate world-shaking impacts and injuries through raw physical toughness alone, capable of continuing combat despite injuries that would instantly kill most beings.",
            "A": "The character can withstand blows that would level smaller cities, sustaining severe injuries but remaining functional in combat.",
            "B": "The character can keep themselves composed when faced with attacks that could demolish large buildings, sustaining only minor injuries from such impacts.",
            "C": "The character can withstand injuries that would easily slaughter a normal civilian, such as stronger firearms, with moderate recovery needed.",
            "D": "The character's toughness allows them to withstand weaker firearms and weaponry, such as blunt-force weapons and light firearms, with some recovery time.",
            "E": "The character has notable toughness allowing them to tolerate injury better than the average civilian, but still vulnerable to most weaponry.",
            "F": "The character has no notable toughness beyond that of a standard civilian, falling just as easily to injury."
          }
        },
        { 
          name: "Resistance", 
          description: "How well a Bloxian can tolerate environmental hazards and status conditions, such as heat, electricity, and poison.",
          grades: {
            "Ø": "The character is completely immune to all environmental hazards and status conditions, regardless of type or intensity. No form of poison, heat, cold, electricity, or other environmental threat can affect them.",
            "S": "The character can resist virtually all known environmental hazards and status conditions, including extreme temperatures, radiation, toxins, and electrical shocks.",
            "A": "The character can withstand intense environmental hazards, such as radiation or toxicity, and resist most status conditions effectively.",
            "B": "The character can resist some environmental hazards, such as heat, frost, or poison, though extreme versions may still affect them.",
            "C": "The character has some resistance to weaker environmental hazards, such as moderate heat and frost, but remains vulnerable to stronger effects.",
            "D": "The character may have rare resistance to very weak environmental hazards, but generally remains vulnerable to most status conditions and environmental threats.",
            "E": "The character has minimal resistance, perhaps tolerating minor environmental effects slightly better than civilians.",
            "F": "The character has no notable resistance to environmental hazards or status conditions beyond that of a standard civilian."
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
            "Ø": "The character's concept of Distance and ETAs become nothing more than an idea, as the character can freely and near-instantaneously relocate themselves through the sheer power of their body's physical power. It is the closest form of teleportation without actually teleporting.",
            "S": "The character can travel continent-sized spaces in the blink of an eye, reacting to light-speed attacks on a whim. Impossible maneuvers become effortless to pull off.",
            "A": "The character can travel large-scale cities with relative ease, navigating complex urban terrain with minimal effort. Their speed is imperceptible to civilians.",
            "B": "The character can traverse across large-scaled terrain in seconds, with excellent acceleration and top speeds that far exceed any vehicle.",
            "C": "The character has enhanced speed comparable to that of a master-class Olympic runner, allowing them to outpace vehicles and move with remarkable quickness.",
            "D": "The character has advanced mobility, allowing them to outperform most trained soldiers or combatants with notable speed and acceleration.",
            "E": "The character has notable skills when it comes to moving quickly, with heightened speeds that can out-perform most civilians.",
            "F": "The character has no edges in speed beyond the potential of any other civilian."
          }
        },
        { 
          name: "Endurance", 
          description: "The amount of general stamina a Bloxian has, as well as how quickly they burn through it.",
          grades: {
            "Ø": "The character has infinite stamina and endurance, capable of performing at peak physical capacity indefinitely without any form of fatigue or exhaustion.",
            "S": "The character has exceptional endurance, capable of maintaining peak performance for extremely long periods, with minimal stamina consumption even during intense activity.",
            "A": "The character has remarkable stamina reserves, able to engage in prolonged combat or physical activity with only gradual fatigue.",
            "B": "The character has strong endurance, capable of sustaining high-intensity activity for extended periods before needing rest.",
            "C": "The character has good stamina, able to maintain moderate activity levels for reasonable durations without excessive fatigue.",
            "D": "The character has above-average endurance compared to civilians, but still experiences fatigue during prolonged activity.",
            "E": "The character has slightly improved stamina over civilians, but fatigue sets in relatively quickly during physical exertion.",
            "F": "The character has no notable endurance or stamina beyond that of a standard civilian."
          }
        },
        { 
          name: "Flexibility", 
          description: "How easily and gracefully a Bloxian can weave, bend, and maneuver themselves through fast or complicated attacks.",
          grades: {
            "Ø": "The character has absolute, impossible flexibility, capable of contorting their body in any conceivable manner without strain or injury. They can dodge attacks through movements that defy normal physical limitations.",
            "S": "The character has exceptional flexibility and maneuverability, capable of performing seemingly-impossible dodges and contortions with grace and precision.",
            "A": "The character's flexibility and reaction time is imperceptible to civilians, able to weave through complex attacks with remarkable ease.",
            "B": "The character can gracefully navigate advanced terrain and dodge attacks with excellent reflexes and flexibility.",
            "C": "The character has enhanced flexibility and reflexes, allowing them to handle most terrain and evade simpler attacks with relative ease.",
            "D": "The character has advanced potential in their flexibility, allowing them to dodge basic attacks and navigate moderate terrain challenges.",
            "E": "The character has notable flexibility skills, with slightly above-average ability to maneuver and evade compared to civilians.",
            "F": "The character has no edges in flexibility beyond the potential of any other civilian."
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
            "Ø": "The character has absolute, impossible accuracy that cannot be calculated by any normal means. Any desired hit will connect flawlessly, irrelevant of conditions, distance, or complexity.",
            "S": "The character's accuracy is world-class, allowing them to hit targets across vast distances and in impossible conditions with perfect precision.",
            "A": "The character's attacks are incredibly accurate and consistent, allowing them to hit targets across great distances and take advantage of weak points with relative ease.",
            "B": "The character's precision grants them remarkable accuracy with most ranged attacks and projectiles, making them highly effective at hitting intended targets.",
            "C": "The character's accuracy allows for consistent hits at moderate ranges, with good precision in most combat situations.",
            "D": "The character can maintain good accuracy with most tools and weaponry in standard situations, though challenging conditions may reduce effectiveness.",
            "E": "The character has above-average accuracy with simpler tools and short-ranged attacks, but struggles at greater distances.",
            "F": "The character has no enhanced qualities of accuracy beyond that of a standard civilian."
          }
        },
        { 
          name: "Reactivity", 
          description: "How sharp a Bloxian's reflexes are, and how good they are at counteracting with their reflexes.",
          grades: {
            "Ø": "The character has instantaneous, perfect reflexes that operate at speeds beyond comprehension. They can react to and counter any threat before it even becomes a threat.",
            "S": "The character can react to light-speed attacks on a whim, with reflexes so sharp that they can counter complex attacks almost before they're initiated.",
            "A": "The character has incredibly sharp reflexes, allowing them to react quickly to incoming attacks and counter with precision even in chaotic combat situations.",
            "B": "The character has excellent reaction times, capable of responding to most attacks and threats with quick, effective countermeasures.",
            "C": "The character has good reflexes, able to react to common threats and attacks with reasonable speed and effectiveness.",
            "D": "The character has above-average reflexes, capable of reacting to slower attacks and basic threats, though faster opponents may overwhelm them.",
            "E": "The character has slightly improved reflexes compared to civilians, but may struggle to react to faster attacks or complex threats.",
            "F": "The character has no notable reflex capabilities beyond that of a standard civilian."
          }
        },
        { 
          name: "Dexterity", 
          description: "A Bloxian's motor control, primarily how steady and quick their hands are, especially under stress.",
          grades: {
            "Ø": "The character has absolute motor control, capable of performing any physical action with perfect steadiness and precision regardless of conditions, stress, or complexity.",
            "S": "The character's dexterity is world-class, allowing them to perform seemingly-impossible feats normally unachievable, even under extreme stress or chaos.",
            "A": "The character's precision grants them remarkable dexterity with their hands, as well as fine control over all types of weaponry and tools, making them effective and efficient at nearly anything they do.",
            "B": "The character has excellent hand-eye coordination and dexterity, allowing them to keep steady hands even when under intense pressure.",
            "C": "The character has good motor control and dexterity, capable of handling most tools and weapons effectively in standard situations.",
            "D": "The character can keep themselves composed in pressing situations, offering good dexterity with most tools and weaponry, though extreme stress may affect performance.",
            "E": "The character has above-average skills with their dexterity, allowing them to handle simpler tools and weapons with notable accuracy.",
            "F": "The character has no enhanced qualities of dexterity or motor control beyond that of a standard civilian, with coordination that often degrades under stress."
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
            "Ø": "The character has perfect combat intelligence and tactical awareness, knowing every possible outcome and counter-strategy instantaneously. They can never be surprised or outmaneuvered tactically.",
            "S": "The character can solve and mitigate combat problems that would overwhelm even the most advanced tactical systems. They're incredibly intelligent in combat, with near-perfect strategic awareness.",
            "A": "The character's combat intelligence is renowned and capable of large-scale strategic thinking, making them an incredible tactician who can plan far ahead and adapt instantly.",
            "B": "The character's tactical intelligence allows for quick adaptability against a wide range of situations, tactfully planning and executing thought-out plans on a whim.",
            "C": "The character has intelligence enabling them to think quickly and tactfully. They can easily pick up on complex patterns and adapt strategies mid-combat with slight effort.",
            "D": "The character's tactical capacity allows for notable problem-solving skills, quick thinking, and the ability to understand complex combat situations with ease.",
            "E": "The character shows signs of being above-average in terms of combat intelligence, allowing them to think quickly and act resourceful in pressing situations.",
            "F": "The character shows combat intelligence consistent with the average IQ of a civilian, capable of basic tactical reasoning but often struggling under pressure."
          }
        },
        { 
          name: "Wisdom", 
          description: "The general intelligence and clarity of Bloxians, specifically outside of combat situations.",
          grades: {
            "Ø": "The character is omniscient, knowing everything that has been, is, and will be. There is no concept that remains unknown or incomprehensible to them, and if there were, it could be learned instantaneously.",
            "S": "The character can solve and mitigate problems that even the most advanced electronic hardware would struggle with. They're incredibly intelligent, and most fields of work can be mastered instantly.",
            "A": "The character's intelligence is renowned and they're incredibly adaptive, allowing them to quickly pick up and master most fields of work.",
            "B": "The character's intelligence allows for quick learning and understanding across a wide range of subjects and situations.",
            "C": "The character has intelligence enabling them to think critically and learn new concepts with relative ease.",
            "D": "The character's intellectual capacity allows for notable problem-solving skills, quick thinking, and the ability to understand complex concepts with ease.",
            "E": "The character shows signs of being above-average in terms of general intelligence, allowing them to think quickly and act resourceful.",
            "F": "The character shows intelligence consistent with the average IQ of a civilian, capable of basic problem solving and reasoning."
          }
        },
        { 
          name: "Stability", 
          description: "How mentally sane or stable a Bloxian is, including how resistant they are to mental manipulation.",
          grades: {
            "Ø": "The character is completely invulnerable to mental manipulation or conditions. Their mental stability is absolute and unbreakable, regardless of external pressures or attempts at manipulation.",
            "S": "The character's emotional stability is nearly unmatched, allowing them to tolerate extensive mental anguish and torture without cracking. They resist virtually all forms of mental manipulation.",
            "A": "The character is remarkably stable mentally, and proficient with emotional control and manipulation. They resist most forms of mental attack or manipulation.",
            "B": "The character is often incredibly stable mentally, and may even excel at manipulating others or resisting manipulation themselves.",
            "C": "The character has good mental stability, and may be able to manipulate others or resist manipulation themselves in most situations.",
            "D": "The character's mental capacity may remain susceptible to mental manipulation or bluffing, but generally maintains composure under stress.",
            "E": "The character is vulnerable to mental manipulation, and likely unstable with their emotions in stressful situations.",
            "F": "The character is completely susceptible to mental manipulation and can become incredibly unstable in pressing situations."
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
