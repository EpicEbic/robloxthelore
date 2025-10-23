import { WikiEntry } from "@/types/wiki-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Zap, Shield, Sword, Target, Brain, Gauge, TrendingUp, Users, Plus, Minus, Trophy } from "lucide-react";
import { getMatchupDescription } from "@/data/matchups";
import { getCharacterTraits } from "@/data/character-traits";
import { getVerdict } from "@/data/verdicts";

interface ComparisonResultsProps {
  entry1: WikiEntry;
  entry2: WikiEntry;
  combatStyle1?: string | null;
  combatStyle2?: string | null;
}

export function ComparisonResults({ entry1, entry2, combatStyle1, combatStyle2 }: ComparisonResultsProps) {
  // Calculate power level based on combined ability and physical stats
  const calculatePowerLevel = (entry: WikiEntry) => {
    if (entry.category !== "character") {
      return 30; // Default for non-characters
    }

    let abilityTotal = 0;
    let physicalTotal = 0;
    
    // Handle ability stats - if no ability, set all to F (0)
    if (entry.stats) {
      abilityTotal = Object.values(entry.stats).reduce((sum, stat) => sum + stat.value, 0);
    } // If no stats, defaults to 0 (F level)

    // Handle physical stats - use selected combat style or first one if available
    if (entry.combatStyles && entry.combatStyles.length > 0) {
      const targetStyleId = entry === entry1 ? combatStyle1 : combatStyle2;
      const combatStyle = entry.combatStyles.find(style => style.id === targetStyleId) || entry.combatStyles[0];
      const combatStats = combatStyle.combatStats;
      if (combatStats) {
        physicalTotal = Object.values(combatStats).reduce((sum, stat) => sum + stat.value, 0);
      }
    } // If no combat stats, defaults to 0 (F level)

    const totalPower = abilityTotal + physicalTotal;
    const maxPossiblePower = 63; // 9 total stats * 7 max value (Ø = 7)
    
    return Math.min(100, (totalPower / maxPossiblePower) * 100);
  };

  const powerLevel1 = calculatePowerLevel(entry1);
  const powerLevel2 = calculatePowerLevel(entry2);
  
  const matchupDescription = getMatchupDescription(entry1.id, entry2.id);
  const traits1 = getCharacterTraits(entry1.id);
  const traits2 = getCharacterTraits(entry2.id);
  const verdict = getVerdict(entry1.id, entry2.id);

  // Check if either character lacks meaningful abilities (all F stats means no real abilities)
  const entry1HasAbility = entry1.category === "character" && !!entry1.stats && 
    Object.values(entry1.stats).some(stat => stat.value > 0);
  const entry2HasAbility = entry2.category === "character" && !!entry2.stats && 
    Object.values(entry2.stats).some(stat => stat.value > 0);

  const getStatDisplay = (stat: { label: string; value: number } | undefined, hasAbility: boolean = true, baseStat?: { label: string; value: number }) => {
    if (!hasAbility) {
      // Return N/A for characters with no meaningful abilities
      return { label: "N/A", value: 0, color: "text-gray-400", indicator: null };
    }
    if (!stat) return { label: "N/A", value: 0, color: "text-gray-400", indicator: null };
    
    const colors = {
      "F": "text-red-600",
      "E": "text-red-500", 
      "D": "text-orange-500",
      "C": "text-yellow-500",
      "B": "text-green-500",
      "A": "text-blue-500",
      "S": "text-purple-500",
      "Ø": "text-pink-600"
    };
    
    // Calculate indicator based on comparison to base stat
    let indicator = null;
    if (baseStat && baseStat.value !== stat.value) {
      if (stat.value > baseStat.value) {
        indicator = { type: "up", text: `+${stat.value - baseStat.value} (up from ${baseStat.label})` };
      } else {
        indicator = { type: "down", text: `${stat.value - baseStat.value} (down from ${baseStat.label})` };
      }
    }
    
    return {
      label: stat.label,
      value: stat.value,
      color: colors[stat.label as keyof typeof colors] || "text-gray-400",
      indicator
    };
  };

  const getStatComparison = (stat1: { value: number } | undefined, stat2: { value: number } | undefined) => {
    const s1 = stat1?.value || 0; 
    const s2 = stat2?.value || 0; 
    return {
      entry1: s1,
      entry2: s2,
      winner: s1 > s2 ? 1 : s1 < s2 ? 2 : 0,
    };
  };

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-0">
        {/* Power Percentage Analysis */}
        <div className="p-6 border-b border-border/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Raw Statistics Analysis
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Combined ability and physical stats. Characters without abilities show N/A in all ability categories.
            </p>
            
            {/* Ability status warnings - show when one character lacks abilities */}
            {(!entry1HasAbility || !entry2HasAbility) && (entry1HasAbility || entry2HasAbility) && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> {!entry1HasAbility ? `${entry1.title} lacks` : `${entry2.title} lacks`} special abilities. 
                  They show N/A in all ability categories.
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{entry1.title}</span>
                  <Badge variant={powerLevel1 > powerLevel2 ? "default" : "secondary"} className="rounded-full">
                    {Math.round(powerLevel1)}%
                  </Badge>
                </div>
                <Progress value={powerLevel1} className="h-4" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{entry2.title}</span>
                  <Badge variant={powerLevel2 > powerLevel1 ? "default" : "secondary"} className="rounded-full">
                    {Math.round(powerLevel2)}%
                  </Badge>
                </div>
                <Progress value={powerLevel2} className="h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Individual Stats Comparison */}
        {entry1.category === "character" && entry2.category === "character" && (
          <>
            {/* Ability Stats - only show if at least one character has abilities */}
            {(entry1HasAbility || entry2HasAbility) && (
              <div className="p-6 border-b border-border/50">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5" />
                  Ability Statistics
                </h3>
                
                <div className="space-y-6">
                  {[
                    { key: "offense", label: "Offense", icon: Sword },
                    { key: "defense", label: "Defense", icon: Shield },
                    { key: "utility", label: "Utility", icon: Target },
                    { key: "potential", label: "Potential", icon: TrendingUp },
                  ].map(({ key, label, icon: Icon }) => {
                    const stat1 = entry1.stats?.[key as keyof typeof entry1.stats];
                    const stat2 = entry2.stats?.[key as keyof typeof entry2.stats];
                    const comp = getStatComparison(stat1, stat2);
                    const display1 = getStatDisplay(stat1, entry1HasAbility);
                    const display2 = getStatDisplay(stat2, entry2HasAbility);
                    
                    return (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-semibold text-base">{label}</span>
                        </div>
                        
                        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 items-center">
                          {/* Mobile: Stack vertically, Desktop: 3-column grid */}
                          {/* Character 1 */}
                          <div className={`text-center p-4 rounded-xl border-2 transition-colors ${
                            !entry1HasAbility && display1.label === "N/A"
                              ? "border-gray-500 bg-gray-50 dark:bg-gray-950/20"
                              : comp.winner === 1 
                                ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                                : comp.winner === 0 
                                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                                  : "border-muted-foreground/20 bg-muted/30"
                          }`}>
                            <div className="text-sm font-medium text-muted-foreground mb-2 truncate">{entry1.title}</div>
                            <div className={`text-3xl font-bold font-mono ${display1.color}`}>
                              {display1.label}
                            </div>
                            {!entry1HasAbility && display1.label === "N/A" && (
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                                NO ABILITY - NO STATS
                              </div>
                            )}
                            {comp.winner === 1 && entry1HasAbility && (
                              <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                                WINNER
                              </div>
                            )}
                            {comp.winner === 0 && entry1HasAbility && entry2HasAbility && (
                              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">
                                TIE
                              </div>
                            )}
                          </div>
                          
                          {/* VS separator - hidden on mobile, shown on desktop */}
                          <div className="hidden sm:block text-center">
                            <span className="text-lg font-bold text-muted-foreground">VS</span>
                          </div>
                          
                          {/* Mobile VS separator */}
                          <div className="sm:hidden text-center py-2">
                            <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">VS</span>
                          </div>
                          
                          {/* Character 2 */}
                          <div className={`text-center p-4 rounded-xl border-2 transition-colors ${
                            !entry2HasAbility && display2.label === "N/A"
                              ? "border-gray-500 bg-gray-50 dark:bg-gray-950/20"
                              : comp.winner === 2 
                                ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                                : comp.winner === 0 
                                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                                  : "border-muted-foreground/20 bg-muted/30"
                          }`}>
                            <div className="text-sm font-medium text-muted-foreground mb-2">{entry2.title}</div>
                            <div className={`text-3xl font-bold font-mono ${display2.color}`}>
                              {display2.label}
                            </div>
                            {!entry2HasAbility && display2.label === "N/A" && (
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                                NO ABILITY - NO STATS
                              </div>
                            )}
                            {comp.winner === 2 && entry2HasAbility && (
                              <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                                WINNER
                              </div>
                            )}
                            {comp.winner === 0 && entry1HasAbility && entry2HasAbility && (
                              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">
                                TIE
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Physical Stats */}
            <div className="p-6 border-b border-border/50">
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Physical Statistics
                </h3>
                {/* Show which combat styles are being compared */}
                {(entry1.combatStyles?.length > 1 || entry2.combatStyles?.length > 1) && (
                  <div className="text-sm text-muted-foreground mt-2">
                    Comparing: <strong>{entry1.combatStyles?.find(s => s.id === combatStyle1)?.label || entry1.combatStyles?.[0]?.label || "Standard"}</strong> vs <strong>{entry2.combatStyles?.find(s => s.id === combatStyle2)?.label || entry2.combatStyles?.[0]?.label || "Standard"}</strong>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                {[
                  { key: "strength", label: "Strength", icon: Sword },
                  { key: "durability", label: "Durability", icon: Shield },
                  { key: "agility", label: "Agility", icon: Zap },
                  { key: "precision", label: "Precision", icon: Target },
                  { key: "intelligence", label: "Intelligence", icon: Brain },
                ].map(({ key, label, icon: Icon }) => {
                  // Get the selected combat styles for each character
                  const entry1CombatStyle = entry1.combatStyles?.find(style => style.id === combatStyle1) || entry1.combatStyles?.[0];
                  const entry2CombatStyle = entry2.combatStyles?.find(style => style.id === combatStyle2) || entry2.combatStyles?.[0];
                  
                  // Get base combat styles (first ones) for comparison
                  const entry1BaseCombatStyle = entry1.combatStyles?.[0];
                  const entry2BaseCombatStyle = entry2.combatStyles?.[0];
                  
                  const stat1 = entry1CombatStyle?.combatStats?.[key as "strength" | "durability" | "agility" | "precision" | "intelligence"];
                  const stat2 = entry2CombatStyle?.combatStats?.[key as "strength" | "durability" | "agility" | "precision" | "intelligence"];
                  
                  // Get base stats for indicator calculation
                  const baseStat1 = entry1BaseCombatStyle?.combatStats?.[key as "strength" | "durability" | "agility" | "precision" | "intelligence"];
                  const baseStat2 = entry2BaseCombatStyle?.combatStats?.[key as "strength" | "durability" | "agility" | "precision" | "intelligence"];
                  const comp = getStatComparison(stat1, stat2);
                  const display1 = getStatDisplay(stat1, true, baseStat1);
                  const display2 = getStatDisplay(stat2, true, baseStat2);
                  
                  return (
                    <div key={key} className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-base">{label}</span>
                      </div>
                      
                      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 items-center">
                        {/* Character 1 */}
                        <div className={`text-center p-4 rounded-xl border-2 transition-colors ${
                          comp.winner === 1 
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                            : comp.winner === 0 
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                              : "border-muted-foreground/20 bg-muted/30"
                        }`}>
                          <div className="text-sm font-medium text-muted-foreground mb-2 truncate">{entry1.title}</div>
                          <div className={`text-3xl font-bold font-mono ${display1.color} flex items-center justify-center gap-2`}>
                            {display1.label}
                            {display1.indicator && (
                              <span className={`text-xs font-normal ${
                                display1.indicator.type === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {display1.indicator.text}
                              </span>
                            )}
                          </div>
                          {comp.winner === 1 && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                              WINNER
                            </div>
                          )}
                          {comp.winner === 0 && (
                            <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">
                              TIE
                            </div>
                          )}
                        </div>
                        
                        {/* VS separator - hidden on mobile, shown on desktop */}
                        <div className="hidden sm:block text-center">
                          <span className="text-lg font-bold text-muted-foreground">VS</span>
                        </div>
                        
                        {/* Mobile VS separator */}
                        <div className="sm:hidden text-center py-2">
                          <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">VS</span>
                        </div>
                        
                        {/* Character 2 */}
                        <div className={`text-center p-4 rounded-xl border-2 transition-colors ${
                          comp.winner === 2 
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                            : comp.winner === 0 
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                              : "border-muted-foreground/20 bg-muted/30"
                        }`}>
                          <div className="text-sm font-medium text-muted-foreground mb-2 truncate">{entry2.title}</div>
                          <div className={`text-3xl font-bold font-mono ${display2.color} flex items-center justify-center gap-2`}>
                            {display2.label}
                            {display2.indicator && (
                              <span className={`text-xs font-normal ${
                                display2.indicator.type === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {display2.indicator.text}
                              </span>
                            )}
                          </div>
                          {comp.winner === 2 && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                              WINNER
                            </div>
                          )}
                          {comp.winner === 0 && (
                            <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">
                              TIE
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Pros and Cons */}
        <div className="p-6 border-b border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { entry: entry1, traits: traits1 },
              { entry: entry2, traits: traits2 }
            ].map(({ entry, traits }, index) => (
              <div key={entry.id} className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {entry.title}
                  <Badge variant="outline" className="text-xs rounded-full">
                    {Math.round(index === 0 ? powerLevel1 : powerLevel2)}%
                  </Badge>
                </h3>
                
                <div className="space-y-4">
              {traits ? (
                <>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Plus className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {traits.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0">•</span>
                          <span className="break-words">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2 text-red-700 dark:text-red-400">
                      <Minus className="h-4 w-4" />
                      Weaknesses
                    </h4>
                    <ul className="space-y-1">
                      {traits.cons.map((con, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 mt-1 flex-shrink-0">•</span>
                          <span className="break-words">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Character analysis not available yet.
                </p>
              )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Matchup Section */}
        {matchupDescription && (
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              Matchup Analysis
            </h3>
            
            <div className="bg-muted/50 p-4 rounded-xl">
              <div className="text-sm leading-relaxed space-y-3">
                {matchupDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Verdict */}
        {verdict && (
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-3">
                <Trophy className="h-7 w-7 text-primary" />
                Final Verdict
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Winner/Outcome Section */}
              <div className="text-center space-y-4">
              <div className="text-lg font-semibold text-muted-foreground">
                Winner
              </div>
              
              {verdict.winner ? (
                <div className="space-y-3">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {verdict.explanation.startsWith("Take A Wild Guess") 
                      ? "Take a wild guess." 
                      : (entry1.id === verdict.winner ? entry1.title : entry2.title)}
                  </div>
                   <Badge variant="default" className="text-lg px-4 py-2 font-semibold rounded-full">
                       {((entry1.id === "caesar-bloxwright" && entry2.id === "rice-farmer") || 
                        (entry1.id === "rice-farmer" && entry2.id === "caesar-bloxwright") ||
                        (entry1.id === "caesar-bloxwright" && entry2.id === "spawnboy") || 
                        (entry1.id === "spawnboy" && entry2.id === "caesar-bloxwright") ||
                        (entry1.id === "nauli-parter" && entry2.id === "spawnboy") ||
                        (entry1.id === "spawnboy" && entry2.id === "nauli-parter") ||
                        (entry1.id === "rice-farmer" && entry2.id === "vortex-a-steele") ||
                        (entry1.id === "vortex-a-steele" && entry2.id === "rice-farmer"))
                          ? "Guaranteed Outcome" 
                          : `${verdict.confidence} Confidence`}
                   </Badge>
                </div>
              ) : (
                <div className="text-5xl font-bold bg-gradient-to-r from-muted-foreground to-muted-foreground/70 bg-clip-text text-transparent">
                  Tie / Stalemate
                </div>
              )}
            </div>
            
            {/* Explanation Section */}
            <div className="bg-muted/30 p-6 rounded-xl">
              <div className="text-lg font-semibold mb-3 text-center">Analysis</div>
              <p className="text-base leading-relaxed text-center">
                {verdict.explanation.startsWith("Take A Wild Guess") 
                  ? verdict.explanation.replace("Take A Wild Guess. ", "") 
                  : verdict.explanation}
              </p>
            </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}