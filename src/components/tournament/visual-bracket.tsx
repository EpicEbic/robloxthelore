import { TournamentBracket as TournamentBracketType, TournamentMatch } from "@/utils/tournament-utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface VisualBracketProps {
  bracket: TournamentBracketType;
  currentMatchId?: string;
}

// Data structures for dynamic bracket generation
interface BracketRound {
  id: string;
  name: string;
  matches: TournamentMatch[];
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
}

interface BracketMatch {
  id: string;
  match: TournamentMatch;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  roundIndex: number;
  matchIndex: number;
  isActive: boolean;
}

interface BracketConnection {
  id: string;
  fromMatch: string;
  toMatch: string;
  points: { x: number; y: number }[];
  isPair: boolean;
}

interface BracketLayout {
  rounds: BracketRound[];
  matches: BracketMatch[];
  connections: BracketConnection[];
  dimensions: { width: number; height: number };
}

// Dynamic bracket calculator
function calculateBracketLayout(
  bracket: TournamentBracketType, 
  currentMatchId?: string,
  containerWidth = 1200
): BracketLayout {
  // Configuration
  const MATCH_WIDTH = 160;
  const MATCH_HEIGHT = 60;
  const ROUND_SPACING = 80;
  const MATCH_SPACING = 20;
  const HEADER_HEIGHT = 40;
  const CONNECTOR_LENGTH = 30;

  // Extract rounds from bracket
  const roundsData = [];
  if (bracket.roundOf16) roundsData.push({ key: "roundOf16", data: bracket.roundOf16 });
  if (bracket.quarterfinals) roundsData.push({ key: "quarterfinals", data: bracket.quarterfinals });
  roundsData.push({ key: "semifinals", data: bracket.semifinals });
  roundsData.push({ key: "finals", data: bracket.finals });

  // Calculate total dimensions
  const maxMatches = Math.max(...roundsData.map(r => r.data.matches.length));
  const totalHeight = maxMatches * MATCH_HEIGHT + (maxMatches - 1) * MATCH_SPACING;
  const totalWidth = roundsData.length * MATCH_WIDTH + (roundsData.length - 1) * (ROUND_SPACING + CONNECTOR_LENGTH);

  // Scale to fit container if needed
  const scale = Math.min(1, (containerWidth - 100) / totalWidth);
  const scaledMatchWidth = MATCH_WIDTH * scale;
  const scaledMatchHeight = MATCH_HEIGHT * scale;
  const scaledRoundSpacing = ROUND_SPACING * scale;
  const scaledMatchSpacing = MATCH_SPACING * scale;
  const scaledConnectorLength = CONNECTOR_LENGTH * scale;
  const scaledTotalHeight = totalHeight * scale;

  // Generate rounds
  const rounds: BracketRound[] = roundsData.map((roundData, roundIndex) => {
    const x = roundIndex * (scaledMatchWidth + scaledRoundSpacing + scaledConnectorLength);
    const roundHeight = roundData.data.matches.length * scaledMatchHeight + (roundData.data.matches.length - 1) * scaledMatchSpacing;
    const y = (scaledTotalHeight - roundHeight) / 2 + HEADER_HEIGHT;

    return {
      id: roundData.key,
      name: roundData.data.roundName,
      matches: roundData.data.matches,
      position: { x, y },
      dimensions: { width: scaledMatchWidth, height: roundHeight }
    };
  });

  // Generate matches with precise alignment for convergence points
  const matches: BracketMatch[] = [];
  rounds.forEach((round, roundIndex) => {
    round.matches.forEach((match, matchIndex) => {
      const x = round.position.x;
      let y = round.position.y + matchIndex * (scaledMatchHeight + scaledMatchSpacing);
      
      // For rounds with fewer matches, position to align convergence points exactly
      if (roundIndex > 0) {
        const prevRound = rounds[roundIndex - 1];
        const currentMatchCount = round.matches.length;
        const prevMatchCount = prevRound.matches.length;
        
        if (prevMatchCount === currentMatchCount * 2) {
          // Calculate where the previous round's pairs would converge
          const prevRoundStartY = prevRound.position.y;
          
          // For each match in current round, align with its corresponding pair convergence
          const firstPrevMatchY = prevRoundStartY + (matchIndex * 2) * (scaledMatchHeight + scaledMatchSpacing);
          const secondPrevMatchY = prevRoundStartY + (matchIndex * 2 + 1) * (scaledMatchHeight + scaledMatchSpacing);
          
          const firstPrevMatchCenterY = firstPrevMatchY + scaledMatchHeight / 2;
          const secondPrevMatchCenterY = secondPrevMatchY + scaledMatchHeight / 2;
          const convergenceY = (firstPrevMatchCenterY + secondPrevMatchCenterY) / 2;
          
          // Position this match so its center aligns with the convergence point
          y = convergenceY - scaledMatchHeight / 2;
        }
      }
      
      const matchId = `${round.id}-${matchIndex}`;

      matches.push({
        id: matchId,
        match,
        position: { x, y },
        dimensions: { width: scaledMatchWidth, height: scaledMatchHeight },
        roundIndex,
        matchIndex,
        isActive: currentMatchId === matchId
      });
    });
  });

  // Generate connections
  const connections: BracketConnection[] = [];
  rounds.slice(0, -1).forEach((round, roundIndex) => {
    const nextRound = rounds[roundIndex + 1];
    
    round.matches.forEach((match, matchIndex) => {
      if (!match.outcome || !match.winner) return;

      const currentMatch = matches.find(m => m.roundIndex === roundIndex && m.matchIndex === matchIndex);
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextMatch = matches.find(m => m.roundIndex === roundIndex + 1 && m.matchIndex === nextMatchIndex);
      
      if (!currentMatch || !nextMatch) return;

      const isFirstInPair = matchIndex % 2 === 0;
      const secondMatchIndex = matchIndex + 1;
      
      if (isFirstInPair && secondMatchIndex < round.matches.length) {
        const secondMatch = matches.find(m => m.roundIndex === roundIndex && m.matchIndex === secondMatchIndex);
        
        if (secondMatch && secondMatch.match.outcome && secondMatch.match.winner) {
          // Pair connection
          const currentCenter = {
            x: currentMatch.position.x + currentMatch.dimensions.width,
            y: currentMatch.position.y + currentMatch.dimensions.height / 2
          };
          const secondCenter = {
            x: secondMatch.position.x + secondMatch.dimensions.width,
            y: secondMatch.position.y + secondMatch.dimensions.height / 2
          };
          const convergenceX = currentCenter.x + scaledConnectorLength / 2;
          const convergenceY = (currentCenter.y + secondCenter.y) / 2;
          const nextCenter = {
            x: nextMatch.position.x,
            y: nextMatch.position.y + nextMatch.dimensions.height / 2
          };

          connections.push({
            id: `pair-${round.id}-${matchIndex}`,
            fromMatch: currentMatch.id,
            toMatch: nextMatch.id,
            points: [
              currentCenter,
              { x: convergenceX, y: currentCenter.y },
              { x: convergenceX, y: secondCenter.y },
              { x: convergenceX, y: convergenceY },
              { x: nextCenter.x, y: convergenceY }
            ],
            isPair: true
          });

          // Add second match line
          connections.push({
            id: `pair-second-${round.id}-${matchIndex}`,
            fromMatch: secondMatch.id,
            toMatch: nextMatch.id,
            points: [
              secondCenter,
              { x: convergenceX, y: secondCenter.y }
            ],
            isPair: false
          });
        }
      } else if (!isFirstInPair) {
        // Skip second matches in pairs (handled by first match)
        return;
      } else {
        // Single match connection
        const currentCenter = {
          x: currentMatch.position.x + currentMatch.dimensions.width,
          y: currentMatch.position.y + currentMatch.dimensions.height / 2
        };
        const nextCenter = {
          x: nextMatch.position.x,
          y: nextMatch.position.y + nextMatch.dimensions.height / 2
        };
        const connectorX = currentCenter.x + scaledConnectorLength / 2;

        connections.push({
          id: `single-${round.id}-${matchIndex}`,
          fromMatch: currentMatch.id,
          toMatch: nextMatch.id,
          points: [
            currentCenter,
            { x: connectorX, y: currentCenter.y },
            { x: connectorX, y: nextCenter.y },
            nextCenter
          ],
          isPair: false
        });
      }
    });
  });

  return {
    rounds,
    matches,
    connections,
    dimensions: { width: totalWidth * scale, height: scaledTotalHeight + HEADER_HEIGHT * 2 }
  };
}

// Match component
function DynamicMatchBox({ bracketMatch }: { bracketMatch: BracketMatch }) {
  const { match, position, dimensions, isActive } = bracketMatch;
  const hasOutcome = match.outcome !== undefined;
  const winner = match.winner;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "absolute border-2 rounded-md bg-card transition-all overflow-hidden",
        isActive && "border-primary ring-2 ring-primary/20 z-10",
        !hasOutcome && !isActive && "border-muted/40",
        hasOutcome && "border-muted/60"
      )}
      style={{
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height
      }}
    >
      <div className="flex flex-col h-full">
        {/* Character 1 */}
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-1 text-xs border-b border-border/30 flex-1 min-h-0 border-l-4 transition-all",
            match.outcome === "character1" && "bg-green-600/10 border-l-green-500",
            match.outcome === "character2" && "bg-red-600/10 border-l-red-500",
            !match.outcome && "border-l-transparent"
          )}
        >
          {match.character1 ? (
            <>
              <div className="w-5 h-5 rounded-full overflow-hidden border border-border/50 flex-shrink-0">
                <OptimizedImage
                  src={`/images/character-icons/${match.character1.id}-icon.png`}
                  alt={match.character1.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate flex-1 font-medium text-xs">{match.character1.title}</span>
              {match.outcome === "character1" && (
                <Trophy className="h-3 w-3 text-green-500 flex-shrink-0" />
              )}
              {match.outcome === "character2" && (
                <X className="h-3 w-3 text-red-500 flex-shrink-0" />
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-xs">Bye</span>
          )}
        </div>

        {/* Character 2 */}
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-1 text-xs flex-1 min-h-0 border-l-4 transition-all",
            match.outcome === "character2" && "bg-green-600/10 border-l-green-500",
            match.outcome === "character1" && "bg-red-600/10 border-l-red-500",
            !match.outcome && "border-l-transparent"
          )}
        >
          {match.character2 ? (
            <>
              <div className="w-5 h-5 rounded-full overflow-hidden border border-border/50 flex-shrink-0">
                <OptimizedImage
                  src={`/images/character-icons/${match.character2.id}-icon.png`}
                  alt={match.character2.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate flex-1 font-medium text-xs">{match.character2.title}</span>
              {match.outcome === "character2" && (
                <Trophy className="h-3 w-3 text-green-500 flex-shrink-0" />
              )}
              {match.outcome === "character1" && (
                <X className="h-3 w-3 text-red-500 flex-shrink-0" />
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-xs">Bye</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function VisualBracket({ bracket, currentMatchId }: VisualBracketProps) {
  const bracketLayout = useMemo(() => {
    return calculateBracketLayout(bracket, currentMatchId);
  }, [bracket, currentMatchId]);

  return (
    <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm w-full">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">Tournament Bracket</h2>
        </div>

        <div className="w-full overflow-x-auto overflow-y-hidden">
          <div 
            className="relative bg-card/50 rounded-lg"
            style={{ 
              width: bracketLayout.dimensions.width,
              height: bracketLayout.dimensions.height,
              minWidth: 'fit-content'
            }}
          >
            {/* Round headers */}
            {bracketLayout.rounds.map((round) => (
              <div
                key={`header-${round.id}`}
                className="absolute flex justify-center"
                style={{
                  left: round.position.x,
                  top: 8,
                  width: round.dimensions.width
                }}
              >
                <Badge 
                  variant={round.id === "finals" ? "default" : "outline"}
                  className="text-xs px-2 py-1"
                >
                  {round.name}
                </Badge>
              </div>
            ))}

            {/* Match boxes */}
            {bracketLayout.matches.map((bracketMatch) => (
              <DynamicMatchBox key={bracketMatch.id} bracketMatch={bracketMatch} />
            ))}

            {/* Connection lines */}
            <svg 
              className="absolute top-0 left-0 pointer-events-none w-full h-full"
              style={{ zIndex: 0 }}
            >
              {bracketLayout.connections.map((connection) => {
                if (connection.points.length < 2) return null;
                
                const pathData = connection.points.reduce((path, point, index) => {
                  if (index === 0) return `M ${point.x} ${point.y}`;
                  return `${path} L ${point.x} ${point.y}`;
                }, '');

                return (
                  <path
                    key={connection.id}
                    d={pathData}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-200"
                  />
                );
              })}
            </svg>

            {/* Grand Champion Display */}
            {bracket.champion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="absolute flex flex-col items-center justify-center z-10"
                style={{
                  left: bracketLayout.dimensions.width + 30,
                  top: bracketLayout.dimensions.height / 2 - 60
                }}
              >
                {/* Golden Champion Badge with glow */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.4)",
                      "0 0 30px rgba(255, 215, 0, 0.6)",
                      "0 0 20px rgba(255, 215, 0, 0.4)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-4"
                >
                  <Badge className="text-base px-6 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 font-bold shadow-lg border-2 border-yellow-300">
                    🏆 CHAMPION 🏆
                  </Badge>
                </motion.div>

                {/* Horizontal Champion Card */}
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 relative overflow-hidden shadow-2xl border-4 border-yellow-400"
                  style={{ width: '280px', height: '100px' }}
                  animate={{ 
                    borderColor: [
                      "rgb(250, 204, 21)", // yellow-400
                      "rgb(245, 158, 11)", // yellow-500  
                      "rgb(217, 119, 6)",  // yellow-600
                      "rgb(245, 158, 11)", // yellow-500
                      "rgb(250, 204, 21)"  // yellow-400
                    ],
                    boxShadow: [
                      "0 5px 20px rgba(255, 215, 0, 0.2)",
                      "0 8px 25px rgba(255, 215, 0, 0.3)",
                      "0 5px 20px rgba(255, 215, 0, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Golden background effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/60 via-yellow-300/40 to-yellow-400/60" />
                  
                  {/* Champion Portrait with crown */}
                  <motion.div 
                    className="relative z-10 flex-shrink-0"
                    animate={{ 
                      rotate: [0, 2, -2, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Crown above portrait */}
                    <motion.div
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20"
                      animate={{ 
                        y: [0, -2, 0],
                        rotate: [0, 3, -3, 0]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-lg filter drop-shadow-lg">👑</div>
                    </motion.div>

                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-yellow-400 shadow-xl bg-gradient-to-br from-yellow-100 to-yellow-200">
                      <OptimizedImage
                        src={`/images/character-icons/${bracket.champion.id}-icon.png`}
                        alt={bracket.champion.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Champion Info - Horizontal layout */}
                  <div className="relative z-10 flex flex-col justify-center gap-1 flex-1">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.03, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <Trophy className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                      <span className="font-bold text-base text-yellow-900 leading-tight">
                        {bracket.champion.title}
                      </span>
                      <Trophy className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    </motion.div>
                    
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 text-xs px-3 py-1 font-bold shadow-md border border-yellow-400 w-fit">
                      Tournament Winner
                    </Badge>
                  </div>

                  {/* Subtle golden particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${30 + (i % 2) * 40}%`
                        }}
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}