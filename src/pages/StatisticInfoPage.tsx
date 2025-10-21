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
      name: "Omnipotent",
      description: "Unfathomable levels of power, existing beyond logistical reasoning or comprehension. Godlike and effectively unstoppable.",
      color: "bg-gradient-to-r from-purple-500 to-yellow-500"
    },
    {
      grade: "S",
      name: "Supreme",
      description: "Near-mastered performance, displayed by the best of the best and serves as a force not to be reckoned with.",
      color: "bg-gradient-to-r from-red-500 to-orange-500"
    },
    {
      grade: "A",
      name: "Amazing",
      description: "Proficiency outclasses a majority of other Bloxians, placed high above the civilian-standard.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      grade: "B",
      name: "Better",
      description: "Capabilities are remarkably higher than the standard.",
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      grade: "C",
      name: "Competent",
      description: "Above-average skillset/proficiency, outclassing a decent portion of Bloxians.",
      color: "bg-gradient-to-r from-yellow-500 to-amber-500"
    },
    {
      grade: "D",
      name: "Deficient",
      description: "Enhanced competence and capabilities.",
      color: "bg-gradient-to-r from-orange-600 to-red-600"
    },
    {
      grade: "E",
      name: "Egregious",
      description: "Minor and mostly-insignificant enhancements above that of a civilian.",
      color: "bg-gradient-to-r from-red-600 to-red-700"
    },
    {
      grade: "F",
      name: "Failing",
      description: "A civilian-standard grade, issued when the quality of a skillset matches the established norm of civilization.",
      color: "bg-gradient-to-r from-gray-600 to-gray-700"
    }
  ];

  const statisticDetails = {
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
    },
    "Strength": {
      description: "Raw physical power and the ability to exert force, including lifting capacity and striking power.",
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
    "Durability": {
      description: "Physical toughness and resistance to damage, including pain tolerance and ability to withstand attacks.",
      grades: {
        "Ø": "The character's body is invulnerable to any conceivable forms of damage, preventing them from being harmed by physical blunt-force trauma, abilities, environmental hazards, or phenomena. Even if wounding was possible, any regenerative abilities would likely be imperceptibly fast.",
        "S": "The character can tolerate world-shaking impacts and injuries through raw muscle and vitality alone. May be immune (or at least resistant) to multiple forms of harm, such as physical-based, ability-based, or environment-based.",
        "A": "The character can withstand blows that would level smaller cities and often tolerate some intense environmental hazards, such as radiation or toxicity.",
        "B": "The character can keep themselves composed when faced with attacks that could demolish large buildings, sustaining only minor injuries. May be resistant to some environmental hazards, such as heat, frost or poison.",
        "C": "The character can withstand injuries that would easily slaughter a normal civilian, such as stronger firearms. Possibly resistant to weaker environmental hazards, such as heat and frost.",
        "D": "The character's durability allows them to withstand weaker firearms and weaponry, such as blunt-force weapons and light firearms. Rarely may have resistance to weak environmental hazards, such as heat and frost.",
        "E": "The character has notable durability allowing them to tolerate injury better than the average civilian, giving them an edge in hand-to-hand combat. Despite this, they're likely vulnerable to most (if not all) environmental hazards.",
        "F": "The character has no durability or vitality placing them above a civilian, and would fall just as easily."
      }
    },
    "Agility": {
      description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
      grades: {
        "Ø": "The character's concept of Distance and ETAs become nothing more than an idea, as the character can freely and near-instantaneously relocate themselves through the sheer power of their body's physical power. It is the closest form of teleportation without actually teleporting.",
        "S": "The character can travel continent-sized spaces in the blink of an eye, reacting to light-speed attacks on a whim. Impossible maneuvers become effortless to pull off, dodging the bullets fired by squads of 100 as if it was just another Tuesday.",
        "A": "The character can travel large-scale cities with relative ease, navigating complex urban terrain with minimal effort. Flexibility and reaction time is imperceptible to civilians.",
        "B": "The character can traverse across large-scaled terrain in seconds, with excellent reaction times and graceful navigation of advanced terrain.",
        "C": "The character has enhanced athletic potential comparable to that of a master-class Olympic runner, allowing them to outpace vehicles and handle most terrain with remarkable reflexes and flexibility.",
        "D": "The character has advanced potential in their mobility, allowing them to outperform most trained soldiers or combatants. Likely has enhanced reflexes and flexibility to assist them with tougher terrain.",
        "E": "The character has notable skills when it comes to traversing terrain, and has heightened speeds that can out-perform most civilians. Reaction times and flexibility is slightly above-average.",
        "F": "The character has no edges in mobility beyond the potential of any other civilian."
      }
    },
    "Precision": {
      description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
      grades: {
        "Ø": "The character has absolute, impossible precision that cannot be calculated by any normal means. Any desired physical action will execute flawlessly, irrelevant of conditions, distance, or complexity.",
        "S": "The character's precision is world-class, allowing them to perform seemingly-impossible feats normally unachievable. Heart surgery during a natural disaster, aboard a helicopter that is crashing to the ground-- that would be trivial for them, if not a bit easy.",
        "A": "The character's actions are incredibly precise and consistent, allowing them to hit targets across vast distances and take advantage of weak points on targets with relative ease.",
        "B": "The character's precision grants them remarkable dexterity with their hands, as well as fine control over all types of weaponry and tools, making them effective and efficient at nearly anything they do.",
        "C": "The character's precision allows for advanced hand-to-eye coordination and dexterity, allowing them to keep steady hands even when under intense pressure.",
        "D": "The character can keep themselves composed in pressing situations, offering good accuracy with most tools and weaponry in standard situations.",
        "E": "The character has above-average skills with their dexterity, allowing them to handle simpler tools, weapons and short-ranged firearms with notable accuracy.",
        "F": "The character has no enhanced qualities of dexterity or precision, leaving them with hand-eye coordination that often degrades under stress or adverse conditions."
      }
    },
    "Intelligence": {
      description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
      grades: {
        "Ø": "The character is omniscient, knowing everything that has been, is, and will be. There is no concept that remains unknown or incomprehensible to them, and if there were, it could be learned instantaneously. Completely invulnerable to mental manipulation or conditions.",
        "S": "The character can solve and mitigate problems that even the most advanced electronic hardware would struggle with. They're incredibly intelligent, both in and out of combat. Most fields of work can be mastered instantly. Emotional stability is nearly unmatched, allowing them to tolerate extensive mental anguish and torture without cracking.",
        "A": "The character's intelligence is renowned and capable of large-scale strategic thinking, making them an incredible tactician and allowing them to plan far ahead. They're incredibly adaptive, allowing them to quickly pick up and master most fields of work. Remarkably stable mentally, and proficient with emotional control and manipulation.",
        "B": "The character's intelligence allows for quick adaptability against a wide range of situations, tactfully planning and executing thought-out plans on a whim. Often incredibly stable mentally, and may even excel at manipulating others.",
        "C": "The character has intelligence enabling them to think quickly and tactfully. They can easily pick up on complex patterns, and adapt strategies mid-combat with slight effort. May be able to manipulate others, or resist manipulation themselves.",
        "D": "The character's intellectual capacity allows for notable problem-solving skills, quick thinking, and the ability to understand complex concepts with ease. May remain susceptible to mental manipulation or bluffing.",
        "E": "The character shows signs of being above-average in terms of intelligence, allowing them to think quickly and act resourceful in pressing situations. Vulnerable to mental manipulation, and likely unstable with their emotions in stressful situations.",
        "F": "The character shows intelligence consistent with the average IQ of a civilian, capable of basic problem solving and reasoning. Completely susceptible to mental manipulation and can become incredibly unstable in pressing situations."
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

      {/* Grade System */}
      <Card className="mb-8 rounded-2xl shadow-xl border-2">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-3xl">Grade System</CardTitle>
          </div>
          <CardDescription className="text-base">
            The 8-tier grading system helps to visually rank both characters and their abilities, ranging from Omnipotent (Ø) to Failing (F).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {grades.map((grade) => (
              <div
                key={grade.grade}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 bg-card/50 hover:bg-card/80 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <Badge
                  variant="outline"
                  className={`text-xl font-bold min-w-[48px] h-12 justify-center ${grade.color} text-white border-none shadow-lg`}
                >
                  {grade.grade}
                </Badge>
                <div>
                  <div className="font-bold text-base">{grade.name}</div>
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
              {["Offense", "Defense", "Utility", "Potential"].map((statName) => {
                const stat = statisticDetails[statName as keyof typeof statisticDetails];
                return (
                  <Collapsible
                    key={statName}
                    open={openStats[statName]}
                    onOpenChange={() => toggleStat(statName)}
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
                          {stat.description}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-6 w-6 text-primary transition-all duration-300 ease-out flex-shrink-0",
                          openStats[statName] ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-5 pb-5 pt-4">
                        <div className="grid gap-3">
                          {Object.entries(stat.grades).map(([grade, description]) => {
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
                );
              })}
            </div>
          </CardContent>
        </Card>

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
              {["Strength", "Durability", "Agility", "Precision", "Intelligence"].map((statName) => {
                const stat = statisticDetails[statName as keyof typeof statisticDetails];
                return (
                  <Collapsible
                    key={statName}
                    open={openStats[statName]}
                    onOpenChange={() => toggleStat(statName)}
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
                          {stat.description}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-6 w-6 text-primary transition-all duration-300 ease-out flex-shrink-0",
                          openStats[statName] ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-5 pb-5 pt-4">
                        <div className="grid gap-3">
                          {Object.entries(stat.grades).map(([grade, description]) => {
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
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mt-8 rounded-2xl shadow-xl border-2 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription className="text-base">
            Common questions about the statistic system and how to interpret the data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                question: "How do statistics and grades work?",
                answer: (
                  <div className="space-y-3">
                    <p>
                      Each set of statistics (Physical and Ability) are measured through an 8-grade
                      system, ranging from Ø (Omnipotent) to F (Failing). In most cases, these grades
                      are displayed through a segmented bar chart that lists a character's statistics.
                    </p>
                    <p>An example of a statistic bar chart can be found below:</p>
                    <img
                      src="/lovable-uploads/d8af20a6-2e7b-4c0a-8867-0ce55f7c3f87.png"
                      alt="Example of a Physical Statistics chart showing strength, durability, agility, precision, and intelligence bars with A grades"
                      className="rounded-xl border-2 bg-card w-full max-w-md mx-auto shadow-lg"
                    />
                  </div>
                )
              },
              {
                question: "What is the difference between Physical statistics and Ability statistics?",
                answer:
                  "Physical statistics refer to the qualities of a character without taking any powers they may have into account. It determines their raw strength, durability, their flexibility, their intelligence, and a few other factors into account. Ability statistics refer to the qualities and potential of an ability. It measures the raw damage potential, the defensive potential, the utilitarian potential, and the overall room for growth of an ability."
              },
              {
                question: "Will someone with a higher grade always win?",
                answer:
                  "No, not always! While higher grades do equal more proficiency in that respective category, each character has unique abilities and skillsets that help them shine in different ways. A character who punches hard may struggle against someone who dies in one hit, simply because they're hard to hit in the first place or have some other conditional ability protecting them. A character with an ultimate, unbreakable line of defense may be injured by a situational and specific power of another. Grades give estimates and raw definitions to a character's statistics, but it won't always determine the outcome of a fight."
              }
            ].map((faq, index) => (
              <Collapsible
                key={index}
                open={openStats[`faq-${index}`]}
                onOpenChange={() => toggleStat(`faq-${index}`)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-5 rounded-xl border-2 bg-card/50 hover:bg-card/80 hover:shadow-lg hover:scale-[1.01] transition-all duration-200 text-left">
                  <div className="font-bold text-base pr-4">{faq.question}</div>
                  <ChevronDown
                    className={cn(
                      "h-6 w-6 text-primary transition-all duration-300 ease-out flex-shrink-0",
                      openStats[`faq-${index}`] ? "rotate-180" : "rotate-0"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-5 pb-5 pt-4">
                    <div className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
