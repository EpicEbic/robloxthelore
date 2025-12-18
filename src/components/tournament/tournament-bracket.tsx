import { TournamentBracket as TournamentBracketType, TournamentMatch } from "@/utils/tournament-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

interface TournamentBracketProps {
  bracket: TournamentBracketType;
  currentMatchId?: string;
}

interface MatchBoxProps {
  match: TournamentMatch;
  matchId: string;
  isActive: boolean;
}

function MatchBox({ match, matchId, isActive }: MatchBoxProps) {
  return (
    <div
      className={cn(
        "relative w-56 border-2 rounded-lg bg-card transition-all p-4",
        isActive && "border-primary ring-2 ring-primary/30 shadow-lg z-10",
        !isActive && "border-muted/50"
      )}
    >
      <div className="space-y-2">
        {/* Character 1 */}
        <div className="flex items-center gap-3">
          {match.character1 ? (
            <>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                <OptimizedImage
                  src={match.character1.imageUrl || ""}
                  alt={match.character1.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate flex-1 text-sm font-medium">
                {match.character1.title}
              </span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Bye</span>
          )}
        </div>

        {/* VS Divider */}
        <div className="h-px bg-border/50"></div>

        {/* Character 2 */}
        <div className="flex items-center gap-3">
          {match.character2 ? (
            <>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                <OptimizedImage
                  src={match.character2.imageUrl || ""}
                  alt={match.character2.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate flex-1 text-sm font-medium">
                {match.character2.title}
              </span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Bye</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TournamentBracket({ bracket, currentMatchId }: TournamentBracketProps) {
  return (
    <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Tournament Bracket</h2>
        </div>

        <div className="relative overflow-x-auto py-4">
          <div className="inline-flex items-start gap-6 min-w-max px-4">
            {/* Round of 16 */}
            {bracket.roundOf16 && (
              <div className="flex flex-col items-center">
                <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5">
                  {bracket.roundOf16.roundName}
                </Badge>
                <div className="relative flex flex-col gap-4">
                  {bracket.roundOf16.matches.map((match, index) => {
                    const matchId = `roundOf16-${index}`;
                    const isActive = currentMatchId === matchId;
                    return (
                      <MatchBox key={matchId} match={match} matchId={matchId} isActive={isActive} />
                    );
                  })}
                </div>
              </div>
            )}


            {/* Quarterfinals */}
            {bracket.quarterfinals && (
              <div className="flex flex-col items-center">
                <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5">
                  {bracket.quarterfinals.roundName}
                </Badge>
                <div className="relative flex flex-col gap-4">
                  {bracket.quarterfinals.matches.map((match, index) => {
                    const matchId = `quarterfinals-${index}`;
                    const isActive = currentMatchId === matchId;
                    return (
                      <MatchBox key={matchId} match={match} matchId={matchId} isActive={isActive} />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Semifinals */}
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5">
                {bracket.semifinals.roundName}
              </Badge>
              <div className="relative flex flex-col gap-4">
                {bracket.semifinals.matches.map((match, index) => {
                  const matchId = `semifinals-${index}`;
                  const isActive = currentMatchId === matchId;
                  return (
                    <MatchBox key={matchId} match={match} matchId={matchId} isActive={isActive} />
                  );
                })}
              </div>
            </div>

            {/* Finals */}
            <div className="flex flex-col items-center">
              <Badge variant="default" className="mb-4 text-sm px-4 py-1.5">
                {bracket.finals.roundName}
              </Badge>
              <div className="relative">
                {bracket.finals.matches.map((match, index) => {
                  const matchId = `finals-${index}`;
                  const isActive = currentMatchId === matchId;
                  return (
                    <MatchBox key={matchId} match={match} matchId={matchId} isActive={isActive} />
                  );
                })}
              </div>
            </div>

            {/* Champion */}
            {bracket.champion && (
              <div className="flex flex-col items-center justify-center">
                <Badge variant="default" className="mb-4 text-sm px-4 py-1.5 bg-primary">
                  Champion
                </Badge>
                <div className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-primary bg-primary/5">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                    <OptimizedImage
                      src={bracket.champion.imageUrl || ""}
                      alt={bracket.champion.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-lg">{bracket.champion.title}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

