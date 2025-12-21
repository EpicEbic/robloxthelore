import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWiki } from "@/contexts/wiki-context";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { WikiEntry } from "@/types/wiki-types";
import { CharacterSelector } from "@/components/tournament/character-selector";
import { VisualBracket } from "@/components/tournament/visual-bracket";
import { BattleMatch } from "@/components/tournament/battle-match";
import { ModeSelector } from "@/components/tournament/mode-selector";
import { 
  initializeBracket, 
  TournamentBracket as TournamentBracketType,
  findNextMatch,
  advanceRound,
  isRoundComplete,
  BattleOutcome
} from "@/utils/tournament-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function TournamentPage() {
  const { entries } = useWiki();
  const { isTournamentUnlocked } = useEasterEgg();
  const navigate = useNavigate();
  const [selectedCharacters, setSelectedCharacters] = useState<WikiEntry[]>([]);
  const [bracket, setBracket] = useState<TournamentBracketType | null>(null);
  const [tournamentMode, setTournamentMode] = useState<"automatic" | "manual">("manual");
  const [currentMatch, setCurrentMatch] = useState<{ roundName: keyof TournamentBracketType; matchIndex: number } | null>(null);
  const [showModeSelector, setShowModeSelector] = useState(false);

  // Filter for only characters
  const availableCharacters = entries.filter(
    (entry) => entry.category === "character"
  );

  const handleStartTournament = () => {
    if (selectedCharacters.length === 0) return;
    
    // Show mode selector before starting
    setShowModeSelector(true);
  };

  const handleModeConfirm = () => {
    if (selectedCharacters.length === 0) return;
    
    const newBracket = initializeBracket(selectedCharacters);
    setBracket(newBracket);
    setShowModeSelector(false);
    
    // Find first match
    const firstMatch = findNextMatch(newBracket);
    setCurrentMatch(firstMatch);
  };

  const handleMatchOutcome = (
    roundName: keyof TournamentBracketType,
    matchIndex: number,
    outcome: BattleOutcome,
    explanation: string
  ) => {
    if (!bracket) return;

    const updatedBracket = { ...bracket };
    const round = updatedBracket[roundName];
    if (!round || typeof round === 'boolean' || !('matches' in round)) return;

    const match = round.matches[matchIndex];
    match.outcome = outcome;
    match.explanation = explanation;
    
    // Set winner
    if (outcome === "forfeit") {
      match.winner = null;
    } else if (outcome === "character1") {
      match.winner = match.character1;
    } else {
      match.winner = match.character2;
    }

    // Check if round is complete
    if (isRoundComplete(round)) {
      round.isComplete = true;
      
      // Advance to next round
      const nextRound = advanceRound(updatedBracket, roundName);
      if (nextRound) {
        // Determine which round to update
        if (roundName === "roundOf16") {
          updatedBracket.quarterfinals = nextRound;
        } else if (roundName === "quarterfinals") {
          updatedBracket.semifinals = nextRound;
        } else if (roundName === "semifinals") {
          updatedBracket.finals = nextRound;
        }
      }
    }

    // Check if tournament is complete
    if (roundName === "finals" && match.outcome) {
      if (match.outcome === "forfeit") {
        updatedBracket.champion = null;
      } else {
        updatedBracket.champion = match.winner;
      }
      updatedBracket.isComplete = true;
    }

    // Clear current match - user will press "Next Fight" to continue
    setCurrentMatch(null);
    setBracket(updatedBracket);
  };

  const handleNextFight = () => {
    if (!bracket) return;
    
    const nextMatch = findNextMatch(bracket);
    setCurrentMatch(nextMatch);
  };

  const handleReset = () => {
    setSelectedCharacters([]);
    setBracket(null);
    setCurrentMatch(null);
    setShowModeSelector(false);
    setTournamentMode("manual");
  };

  // Check if tournament is unlocked
  if (!isTournamentUnlocked) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tournament Locked</h1>
        <p className="mb-6">The Tournament feature is currently locked and cannot be accessed.</p>
        <Button onClick={() => navigate("/")} variant="default">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Tournament</h1>
        <p className="text-muted-foreground">
          Select 4, 8, or 16 characters to compete in a single-elimination tournament
        </p>
      </div>

      {showModeSelector && !bracket ? (
        <div className="space-y-4">
          <ModeSelector mode={tournamentMode} onModeChange={setTournamentMode} />
          <div className="flex justify-center gap-4">
            <Button onClick={() => setShowModeSelector(false)} variant="outline">
              Back
            </Button>
            <Button onClick={handleModeConfirm} className="min-w-[150px]">
              Start Tournament
            </Button>
          </div>
        </div>
      ) : !bracket ? (
        <CharacterSelector
          availableCharacters={availableCharacters}
          selectedCharacters={selectedCharacters}
          onSelectionChange={setSelectedCharacters}
          onStartTournament={handleStartTournament}
        />
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="text-sm text-muted-foreground">
              Mode: <span className="font-medium capitalize">{tournamentMode}</span>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Reset Tournament
            </button>
          </motion.div>

          {/* Current Battle */}
          <AnimatePresence mode="wait">
            {currentMatch && bracket && (() => {
              const round = bracket[currentMatch.roundName];
              if (!round || typeof round === 'boolean' || !('matches' in round)) return null;
              const match = round.matches[currentMatch.matchIndex];
              if (!match) return null;

              return (
                <motion.div 
                  key={`battle-${currentMatch.roundName}-${currentMatch.matchIndex}`}
                  className="space-y-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold">{round.roundName}</h2>
                        <p className="text-sm text-muted-foreground">
                          Match {currentMatch.matchIndex + 1} of {round.matches.length}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <BattleMatch
                    match={match}
                    onOutcome={(outcome, explanation) => 
                      handleMatchOutcome(currentMatch.roundName, currentMatch.matchIndex, outcome, explanation)
                    }
                    mode={tournamentMode}
                  />
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Battle Result Display */}
          <AnimatePresence mode="wait">
            {!currentMatch && bracket && (() => {
              // Find the most recently completed match to show its result
              const roundOrder: (keyof TournamentBracketType)[] = ["roundOf16", "quarterfinals", "semifinals", "finals"];
              
              for (let i = roundOrder.length - 1; i >= 0; i--) {
                const roundName = roundOrder[i];
                const round = bracket[roundName];
                if (!round || typeof round === 'boolean' || !('matches' in round)) continue;
                
                // Find the last completed match in this round
                for (let j = round.matches.length - 1; j >= 0; j--) {
                  const match = round.matches[j];
                  if (match.outcome && match.explanation) {
                    return (
                      <motion.div
                        key={`result-${roundName}-${j}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Card className="border-primary/50">
                          <CardContent className="p-6 space-y-4">
                            <div className="text-center space-y-2">
                              <h2 className="text-xl font-bold">Battle Result</h2>
                              <p className="text-sm text-muted-foreground">{round.roundName}</p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                              {match.character1 && (
                                <div className="flex flex-col items-center">
                                  <div className={cn(
                                    "w-16 h-16 rounded-full overflow-hidden border-4",
                                    match.outcome === "character1" ? "border-green-500" : "border-muted opacity-50"
                                  )}>
                                    <OptimizedImage
                                      src={`/images/character-icons/${match.character1.id}-icon.png`}
                                      alt={match.character1.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className={cn(
                                    "text-sm font-medium mt-2",
                                    match.outcome === "character1" && "font-bold text-green-600 dark:text-green-400"
                                  )}>
                                    {match.character1.title}
                                  </span>
                                </div>
                              )}
                              <span className="text-2xl font-bold">VS</span>
                              {match.character2 && (
                                <div className="flex flex-col items-center">
                                  <div className={cn(
                                    "w-16 h-16 rounded-full overflow-hidden border-4",
                                    match.outcome === "character2" ? "border-green-500" : "border-muted opacity-50"
                                  )}>
                                    <OptimizedImage
                                      src={`/images/character-icons/${match.character2.id}-icon.png`}
                                      alt={match.character2.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className={cn(
                                    "text-sm font-medium mt-2",
                                    match.outcome === "character2" && "font-bold text-green-600 dark:text-green-400"
                                  )}>
                                    {match.character2.title}
                                  </span>
                                </div>
                              )}
                            </div>
                            {match.outcome === "forfeit" ? (
                              <div className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <p className="font-medium text-yellow-600 dark:text-yellow-400 mb-2">Forfeit</p>
                                <p className="text-sm">{match.explanation}</p>
                              </div>
                            ) : (
                              <div className="text-center p-4 rounded-lg bg-card border">
                                <p className="font-medium mb-2">
                                  Winner: {match.winner?.title}
                                </p>
                                <p className="text-sm text-muted-foreground">{match.explanation}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  }
                }
              }
              return null;
            })()}
          </AnimatePresence>

          {/* Next Fight Button (when no current match but tournament not complete) */}
          <AnimatePresence>
            {!currentMatch && !bracket.isComplete && (
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button onClick={handleNextFight} size="lg">
                  Next Fight
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tournament Complete */}
          <AnimatePresence>
            {bracket.isComplete && bracket.champion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="border-primary">
                  <CardContent className="p-6 text-center space-y-4">
                    <h2 className="text-2xl font-bold">Tournament Complete!</h2>
                    <p className="text-lg">Champion: {bracket.champion.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bracket Display - Smooth slide-in */}
          <AnimatePresence mode="wait">
            <motion.div
              key="tournament-bracket"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.2
              }}
            >
              <VisualBracket bracket={bracket} currentMatchId={currentMatch ? `${currentMatch.roundName}-${currentMatch.matchIndex}` : undefined} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
