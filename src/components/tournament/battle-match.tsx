import { TournamentMatch } from "@/utils/tournament-utils";
import { getBattleData, simulateBattle } from "@/data/tournament-battles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BattleMatchProps {
  match: TournamentMatch;
  onOutcome: (outcome: "character1" | "character2" | "forfeit", explanation: string) => void;
  mode: "automatic" | "manual";
}

export function BattleMatch({ match, onOutcome, mode }: BattleMatchProps) {
  if (!match.character1 || !match.character2) {
    // Bye match - show bye message
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Bye</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {match.character1 && (
            <div>
              <p className="text-lg font-medium">{match.character1.title} advances with a bye.</p>
              <Button onClick={() => onOutcome("character1", `${match.character1!.title} advances with a bye.`)} className="mt-4">
                Continue
              </Button>
            </div>
          )}
          {match.character2 && (
            <div>
              <p className="text-lg font-medium">{match.character2.title} advances with a bye.</p>
              <Button onClick={() => onOutcome("character2", `${match.character2!.title} advances with a bye.`)} className="mt-4">
                Continue
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const battleData = getBattleData(match.character1.id, match.character2.id);

  const handleAutomaticBattle = () => {
    const outcome = simulateBattle(battleData);
    let explanation = "";
    
    if (outcome === "forfeit") {
      explanation = battleData.forfeitExplanation || "Both characters forfeit the match.";
    } else if (outcome === "character1") {
      explanation = battleData.character1WinExplanation;
    } else {
      explanation = battleData.character2WinExplanation;
    }
    
    onOutcome(outcome, explanation);
  };

  const handleManualOutcome = (outcome: "character1" | "character2") => {
    let explanation = "";
    if (outcome === "character1") {
      explanation = battleData.character1WinExplanation;
    } else {
      explanation = battleData.character2WinExplanation;
    }
    onOutcome(outcome, explanation);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Battle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Character Display */}
        <div className="relative grid grid-cols-2 gap-6 py-8">
          {/* Character 1 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
              <OptimizedImage
                src={match.character1.imageUrl || ""}
                alt={match.character1.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold">{match.character1.title}</h3>
            <Badge variant="outline">Win Chance: {battleData.character1WinChance}%</Badge>
            <Progress value={battleData.character1WinChance} className="w-full" />
          </div>

          {/* VS Divider */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Badge variant="secondary" className="text-lg px-4 py-2">VS</Badge>
          </div>

          {/* Character 2 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
              <OptimizedImage
                src={match.character2.imageUrl || ""}
                alt={match.character2.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold">{match.character2.title}</h3>
            <Badge variant="outline">Win Chance: {battleData.character2WinChance}%</Badge>
            <Progress value={battleData.character2WinChance} className="w-full" />
          </div>
        </div>

        {/* Forfeit Option */}
        {battleData.forfeitChance && battleData.forfeitChance > 0 && (
          <div className="text-center">
            <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400">
              Forfeit Chance: {battleData.forfeitChance}%
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        {mode === "automatic" ? (
          <div className="flex justify-center">
            <Button onClick={handleAutomaticBattle} size="lg" className="min-w-[200px]">
              Simulate Battle
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => handleManualOutcome("character1")}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              {match.character1.title} Wins
            </Button>
            {battleData.forfeitChance && battleData.forfeitChance > 0 && (
              <Button
                onClick={() => onOutcome("forfeit", battleData.forfeitExplanation || "Both characters forfeit.")}
                variant="outline"
                size="lg"
                className="border-yellow-500 text-yellow-600 dark:text-yellow-400"
              >
                Forfeit
              </Button>
            )}
            <Button
              onClick={() => handleManualOutcome("character2")}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              {match.character2.title} Wins
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

