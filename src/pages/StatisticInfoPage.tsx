import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
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
  const grades = [{
    grade: "Ø",
    name: "Omnipotent",
    description: "Unfathomable levels of power, typically beyond reasoning or comprehension.",
    color: "bg-gradient-to-r from-purple-500 to-gold-500"
  }, {
    grade: "S",
    name: "Supreme",
    description: "Outstanding mastery, among the best of the best.",
    color: "bg-gradient-to-r from-red-500 to-orange-500"
  }, {
    grade: "A",
    name: "Amazing",
    description: "Remarkable proficiency, far above the standard.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500"
  }, {
    grade: "B",
    name: "Better",
    description: "Notable capabilities, high competence.",
    color: "bg-gradient-to-r from-green-500 to-emerald-500"
  }, {
    grade: "C",
    name: "Competent",
    description: "Above-average ability and potential.",
    color: "bg-gradient-to-r from-yellow-500 to-amber-500"
  }, {
    grade: "D",
    name: "Deficient",
    description: "Enhanced competence and capabilities.",
    color: "bg-gradient-to-r from-orange-600 to-red-600"
  }, {
    grade: "E",
    name: "Egregious",
    description: "Minor capabilities, typically less significant.",
    color: "bg-gradient-to-r from-red-600 to-red-700"
  }, {
    grade: "F",
    name: "Failing",
    description: "Civilian-standard capabilities, with no notable skillset or potential beyond the norm.",
    color: "bg-gradient-to-r from-gray-600 to-gray-700"
  }];
  const statisticDetails = {
    "Offense": {
      description: "Measures a character's ability to deal damage and harm opponents through their abilities, weapons, or techniques.",
      grades: {
        "Ø": "Absolute offensive capability transcending all limitations. Any intended destructive effect becomes reality, capable of annihilating concepts, dimensions, or existence itself.",
        "S": "World-shattering destructive power. Can obliterate entire continents, reshape planetary surfaces, or erase fortified cities with casual effort.",
        "A": "City-leveling offensive capability. Single attacks can destroy large urban districts, capital ships, or geological formations like mountains.",
        "B": "Building-destroying power. Can collapse large structures, pierce through advanced armor, and overwhelm enhanced defensive systems with focused effort.",
        "C": "Enhanced combat effectiveness. Significantly superior to standard weaponry, capable of damaging heavy vehicles and fortified positions.",
        "D": "Advanced weaponry level. Comparable to high-end firearms and explosives, lethal against most unprotected targets.",
        "E": "Basic enhanced capability. Slight advantage over standard equipment, similar to small arms or light melee weapons.",
        "F": "Minimal to no offensive potential. Standard civilian-level capability with little combat effectiveness."
      }
    },
    "Defense": {
      description: "Represents how well a character can protect themselves from incoming attacks, whether through armor, shields, or defensive abilities.",
      grades: {
        "Ø": "Absolute defensive immunity. Cannot be harmed by any conceivable means, with protection extending to anyone or anything they choose to shield.",
        "S": "World-ending attack immunity. Can withstand planetary bombardments, continental destruction, or reality-warping assaults with minimal effect.",
        "A": "City-leveling attack resistance. Can survive direct hits from massive explosions, geological disasters, and extreme environmental hazards.",
        "B": "Building-destroying attack mitigation. Resistant to heavy explosives, advanced weaponry, and moderate environmental dangers.",
        "C": "Enhanced protective capability. Can withstand heavy firearms, melee weapons, and basic environmental hazards with manageable damage.",
        "D": "Advanced armor equivalent. Effective against standard weapons and trained combatants in most situations.",
        "E": "Basic protective enhancement. Minor resistance to damage and weak environmental hazards.",
        "F": "Minimal defensive capability. Standard civilian vulnerability to most forms of harm."
      }
    },
    "Utility": {
      description: "Evaluates the versatility and practical applications of a character's abilities outside of direct combat scenarios.",
      grades: {
        "Ø": "Unlimited utility potential. Can accomplish anything through thought alone—reality manipulation, causality alteration, and omniversal convenience.",
        "S": "World-changing versatility. Can reshape ecosystems, alter time flow, cure diseases, manipulate infrastructure, and generate resources at will.",
        "A": "City-wide impact utility. Massive logistical advantages, large-scale environmental control, and reality-bending applications in specific areas.",
        "B": "Building-scale utility range. Teleportation, area healing, rapid construction/destruction, and advanced scanning capabilities.",
        "C": "Enhanced tactical utility. Medical abilities, short-range teleportation, stealth, and localized environmental manipulation.",
        "D": "Advanced utility applications. Sensory enhancement, improved mobility, and specialized tools for specific situations.",
        "E": "Basic utility functions. Limited tools and situational abilities with narrow applications.",
        "F": "Minimal utility potential. Little to no practical application beyond standard function."
      }
    },
    "Potential": {
      description: "Assesses the theoretical maximum power or growth capacity of a character's abilities under optimal conditions.",
      grades: {
        "Ø": "Infinite growth potential. No conceivable limits or ceiling, with the possibility of transcending all known boundaries over time.",
        "S": "World-tier growth ceiling. Can potentially reach planetary or cosmic influence levels with exceptionally rapid development.",
        "A": "City-tier potential maximum. Can grow into a formidable force capable of large-scale impact and top-tier effectiveness.",
        "B": "Building-tier growth capacity. Strong returns from training and augmentation, evolving into high-level capabilities.",
        "C": "Enhanced growth potential. Can develop into above-standard competency through dedicated improvement.",
        "D": "Advanced mastery potential. Quick learning curve but reaches peak effectiveness relatively soon.",
        "E": "Basic improvement capacity. Limited growth that refines existing abilities without dramatic power increases.",
        "F": "Minimal growth potential. Little to no meaningful development beyond current baseline capabilities."
      }
    },
    "Strength": {
      description: "Raw physical power and the ability to exert force, including lifting capacity and striking power.",
      grades: {
        "Ø": "Infinite physical strength. No measurable limits, capable of moving planets, crushing dimensions, or exerting force beyond comprehension.",
        "S": "World-moving strength. Can level mountain ranges, reshape continents, and treat massive geological formations as trivial obstacles.",
        "A": "City-moving power. Can lift skyscrapers, punch through reinforced megastructures, and move massive vehicles like toys.",
        "B": "Building-moving strength. Can flip large structures, crush thick steel, and lift heavy machinery with relative ease.",
        "C": "Enhanced physical power. Can lift vehicles, destroy reinforced materials, and overpower multiple opponents simultaneously.",
        "D": "Advanced Bloxian strength. Can lift several tons, break through walls, and overpower trained fighters.",
        "E": "Basic enhanced strength. Can carry heavy objects and break through weak materials with effort.",
        "F": "Standard physical strength. Normal Bloxian capability with limited destructive potential."
      }
    },
    "Durability": {
      description: "Physical toughness and resistance to damage, including pain tolerance and ability to withstand attacks.",
      grades: {
        "Ø": "Absolute invulnerability. Cannot be harmed, damaged, or affected by any force, energy, or phenomenon unless choosing to be.",
        "S": "World-ending event survival. Can endure planetary destruction, cosmic forces, and reality-altering attacks with minimal impact.",
        "A": "City-destroying force resistance. Survives massive explosions, geological disasters, and extreme environmental conditions with minor injuries.",
        "B": "Building-destroying impact tolerance. Resistant to heavy explosives, advanced weapons, and severe environmental hazards.",
        "C": "Enhanced physical resistance. Can withstand significant damage from firearms, melee weapons, and moderate environmental dangers.",
        "D": "Advanced toughness. Can absorb punishment from trained fighters and survive crashes through light obstacles.",
        "E": "Basic enhanced durability. Slightly more resilient than average, can take more hits before becoming incapacitated.",
        "F": "Standard physical durability. Normal vulnerability to injury and environmental hazards."
      }
    },
    "Agility": {
      description: "Speed, reflexes, and nimbleness - how quickly and gracefully a character can move and react.",
      grades: {
        "Ø": "Absolute mobility. Instantaneous movement and reaction regardless of distance, time, or physical laws.",
        "S": "World-crossing speed. Can traverse continents instantly, react to light-speed attacks, and perform impossible maneuvers effortlessly.",
        "A": "City-crossing velocity. Moves faster than vehicles, creates afterimages, and demonstrates superhuman flexibility and reaction times.",
        "B": "Building-crossing speed. Rapid movement across large areas, excellent reaction times, and graceful navigation of complex terrain.",
        "C": "Enhanced athletic ability. Olympic-level performance, can outpace vehicles, and handle urban parkour with ease.",
        "D": "Advanced mobility. Superior to trained athletes, quick reactions, and reliable movement across varied terrain.",
        "E": "Basic enhanced agility. Slightly above average movement speed and flexibility with decent coordination.",
        "F": "Standard mobility. Normal Bloxian agility prone to typical coordination issues and movement limitations."
      }
    },
    "Precision": {
      description: "Accuracy and fine motor control - the ability to perform precise movements and hit targets consistently.",
      grades: {
        "Ø": "Absolute precision. Perfect accuracy regardless of conditions, distance, or complexity of the task being performed.",
        "S": "World-class precision. Can perform impossible feats of accuracy under any conditions, such as surgery during natural disasters.",
        "A": "City-sniper accuracy. Can hit targets across vast distances with perfect precision and handle complex tasks requiring exceptional dexterity.",
        "B": "Building-range precision. Excellent accuracy with various weapons and tools, enhanced fine motor control for detailed work.",
        "C": "Enhanced dexterity. High accuracy in tactical situations, steady hands for technical work, and reliable precision under pressure.",
        "D": "Advanced hand-eye coordination. Good accuracy with weapons and tools, steady performance in most situations.",
        "E": "Basic enhanced precision. Slightly above average dexterity and accuracy suitable for professional work.",
        "F": "Standard precision. Normal Bloxian hand-eye coordination that degrades under stress or adverse conditions."
      }
    },
    "Intelligence": {
      description: "Mental acuity, strategic thinking, and problem-solving capabilities in combat and general situations.",
      grades: {
        "Ø": "Omniscient intellect. Perfect knowledge and understanding of all things, with no concept remaining unknown or incomprehensible.",
        "S": "World-genius level. Extraordinary intellect capable of solving global problems, predicting complex outcomes, and mastering any field instantly.",
        "A": "City-planner intelligence. Renowned intellect capable of large-scale strategic thinking, complex problem-solving, and advanced analysis.",
        "B": "Building-architect level. Advanced intelligence allowing quick adaptation, impressive problem-solving, and strategic thinking under pressure.",
        "C": "Enhanced cognitive ability. Above-average intelligence with good learning capacity, pattern recognition, and tactical thinking.",
        "D": "Advanced intellect. Notable problem-solving skills, quick thinking, and the ability to understand complex concepts.",
        "E": "Basic enhanced intelligence. Slightly above average mental capacity with decent analytical and learning abilities.",
        "F": "Standard intelligence. Normal cognitive function that may struggle with complex problems or high-pressure situations."
      }
    }
  };
  return <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Statistic Information</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Understanding the grading system and what each statistic represents in character evaluations.
        </p>
      </div>

      {/* Grade System */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Grade System</CardTitle>
          <CardDescription>The 8-tier grading system helps to visually rank both characters and their abilities, ranging from Omnipotent (Ø) to Failing (F).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {grades.map(grade => <div key={grade.grade} className="flex items-center space-x-3 p-3 rounded-lg border bg-card/50">
                <Badge variant="outline" className={`text-lg font-bold min-w-[40px] h-10 justify-center ${grade.color} text-white border-none`}>
                  {grade.grade}
                </Badge>
                <div>
                  <div className="font-semibold">{grade.name}</div>
                  <div className="text-sm text-muted-foreground">{grade.description}</div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {/* Ability Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ability Statistics</CardTitle>
            <CardDescription>
              These stats evaluate the effectiveness and potential of a character's special abilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Offense", "Defense", "Utility", "Potential"].map(statName => {
              const stat = statisticDetails[statName as keyof typeof statisticDetails];
              return <Collapsible key={statName} open={openStats[statName]} onOpenChange={() => toggleStat(statName)}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors">
                      <div className="text-left">
                        <Badge variant="secondary" className="font-semibold mb-1">
                          {statName}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {stat.description}
                        </p>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openStats[statName] ? "rotate-180" : "rotate-0")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="grid gap-3 mt-4">
                        {Object.entries(stat.grades).map(([grade, description]) => {
                      const gradeInfo = grades.find(g => g.grade === grade);
                      return <div key={grade} className="flex items-start space-x-3 p-3 rounded-lg border bg-background/50">
                              <Badge variant="outline" className={`text-sm font-bold min-w-[32px] h-8 justify-center ${gradeInfo?.color} text-white border-none`}>
                                {grade}
                              </Badge>
                              <div className="flex-1">
                                <div className="text-sm text-foreground">{description}</div>
                              </div>
                            </div>;
                    })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* Physical Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Physical Statistics</CardTitle>
            <CardDescription>
              These stats measure a character's physical capabilities and combat prowess
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Strength", "Durability", "Agility", "Precision", "Intelligence"].map(statName => {
              const stat = statisticDetails[statName as keyof typeof statisticDetails];
              return <Collapsible key={statName} open={openStats[statName]} onOpenChange={() => toggleStat(statName)}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors">
                      <div className="text-left">
                        <Badge variant="secondary" className="font-semibold mb-1">
                          {statName}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {stat.description}
                        </p>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openStats[statName] ? "rotate-180" : "rotate-0")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="grid gap-3 mt-4">
                        {Object.entries(stat.grades).map(([grade, description]) => {
                      const gradeInfo = grades.find(g => g.grade === grade);
                      return <div key={grade} className="flex items-start space-x-3 p-3 rounded-lg border bg-background/50">
                              <Badge variant="outline" className={`text-sm font-bold min-w-[32px] h-8 justify-center ${gradeInfo?.color} text-white border-none`}>
                                {grade}
                              </Badge>
                              <div className="flex-1">
                                <div className="text-sm text-foreground">{description}</div>
                              </div>
                            </div>;
                    })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>;
            })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          <CardDescription>
            Common questions about the statistic system and how to interpret the data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[{
            question: "How do statistics and grades work?",
            answer: <div className="space-y-3">
                    <p>Each set of statistics (Physical and Ability) are measured through an 8-grade system, ranging from Ø (Omnipotent) to F (Failing). In most cases, these grades are displayed through a segmented bar chart that lists a character's statistics.</p>
                    <p>An example of a statistic bar chart can be found below:</p>
                    <img src="/lovable-uploads/d8af20a6-2e7b-4c0a-8867-0ce55f7c3f87.png" alt="Example of a Physical Statistics chart showing strength, durability, agility, precision, and intelligence bars with A grades" className="rounded-lg border bg-card w-full max-w-md mx-auto" />
                  </div>
          }, {
            question: "What is the difference between Physical statistics and Ability statistics?",
            answer: "Physical statistics refer to the qualities of a character without taking any powers they may have into account. It determines their raw strength, durability, their flexibility, their intelligence, and a few other factors into account. Ability statistics refer to the qualities and potential of an ability. It measures the raw damage potential, the defensive potential, the utilitarian potential, and the overall room for growth of an ability."
          }, {
            question: "Will someone with a higher grade always win?",
            answer: "No, not always! While higher grades do equal more proficiency in that respective category, each character has unique abilities and skillsets that help them shine in different ways. A character who punches hard may struggle against someone who dies in one hit, simply because they're hard to hit in the first place or have some other conditional ability protecting them. A character with an ultimate, unbreakable line of defense may be injured by a situational and specific power of another. Grades give estimates and raw definitions to a character's statistics, but it won't always determine the outcome of a fight."
          }].map((faq, index) => <Collapsible key={index} open={openStats[`faq-${index}`]} onOpenChange={() => toggleStat(`faq-${index}`)}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors text-left">
                  <div className="font-semibold">{faq.question}</div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform flex-shrink-0 ml-2", openStats[`faq-${index}`] ? "rotate-180" : "rotate-0")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="text-sm text-muted-foreground mt-2">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}