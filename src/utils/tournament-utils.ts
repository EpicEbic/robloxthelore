import { WikiEntry } from "@/types/wiki-types";

export type BattleOutcome = "character1" | "character2" | "forfeit";

export interface TournamentMatch {
  id: string;
  character1: WikiEntry | null;
  character2: WikiEntry | null;
  outcome?: BattleOutcome;
  winner: WikiEntry | null;
  explanation: string;
}

export interface TournamentRound {
  matches: TournamentMatch[];
  roundName: string;
  isComplete: boolean;
}

export interface TournamentBracket {
  roundOf16?: TournamentRound; // For 16 characters
  quarterfinals?: TournamentRound; // For 8 or 16 characters
  semifinals: TournamentRound; // Always present
  finals: TournamentRound;
  champion: WikiEntry | null;
  isComplete: boolean;
}

export type TournamentSize = 4 | 8 | 16;

/**
 * Validates that the tournament size is valid (4, 8, or 16)
 */
export function validateTournamentSize(size: number): size is TournamentSize {
  return size === 4 || size === 8 || size === 16;
}

/**
 * Returns bracket structure information for a given tournament size
 */
export function getBracketStructure(size: TournamentSize) {
  switch (size) {
    case 4:
      return {
        rounds: ["semifinals", "finals"],
        matchCounts: { semifinals: 2, finals: 1 },
        roundNames: { semifinals: "Semifinals", finals: "Finals" },
      };
    case 8:
      return {
        rounds: ["quarterfinals", "semifinals", "finals"],
        matchCounts: { quarterfinals: 4, semifinals: 2, finals: 1 },
        roundNames: { quarterfinals: "Quarterfinals", semifinals: "Semifinals", finals: "Finals" },
      };
    case 16:
      return {
        rounds: ["roundOf16", "quarterfinals", "semifinals", "finals"],
        matchCounts: { roundOf16: 8, quarterfinals: 4, semifinals: 2, finals: 1 },
        roundNames: { roundOf16: "Round of 16", quarterfinals: "Quarterfinals", semifinals: "Semifinals", finals: "Finals" },
      };
  }
}

/**
 * Initializes a tournament bracket based on the number of characters
 */
export function initializeBracket(characters: WikiEntry[]): TournamentBracket {
  const size = characters.length as TournamentSize;
  
  if (!validateTournamentSize(size)) {
    throw new Error(`Invalid tournament size: ${size}. Must be 4, 8, or 16.`);
  }

  const structure = getBracketStructure(size);
  const shuffled = [...characters].sort(() => Math.random() - 0.5);
  
  const bracket: TournamentBracket = {
    semifinals: { matches: [], roundName: "Semifinals", isComplete: false },
    finals: { matches: [], roundName: "Finals", isComplete: false },
    champion: null,
    isComplete: false,
  };

  // Create initial round matches based on size
  switch (size) {
    case 4: {
      // 2 Semifinals → 1 Final
      bracket.semifinals.matches = [
        createMatch("semifinals-0", shuffled[0], shuffled[1]),
        createMatch("semifinals-1", shuffled[2], shuffled[3]),
      ];
      break;
    }
    case 8: {
      // 4 Quarterfinals → 2 Semifinals → 1 Final
      bracket.quarterfinals = {
        matches: [
          createMatch("quarterfinals-0", shuffled[0], shuffled[1]),
          createMatch("quarterfinals-1", shuffled[2], shuffled[3]),
          createMatch("quarterfinals-2", shuffled[4], shuffled[5]),
          createMatch("quarterfinals-3", shuffled[6], shuffled[7]),
        ],
        roundName: "Quarterfinals",
        isComplete: false,
      };
      break;
    }
    case 16: {
      // 8 Round of 16 → 4 Quarterfinals → 2 Semifinals → 1 Final
      bracket.roundOf16 = {
        matches: [
          createMatch("roundOf16-0", shuffled[0], shuffled[1]),
          createMatch("roundOf16-1", shuffled[2], shuffled[3]),
          createMatch("roundOf16-2", shuffled[4], shuffled[5]),
          createMatch("roundOf16-3", shuffled[6], shuffled[7]),
          createMatch("roundOf16-4", shuffled[8], shuffled[9]),
          createMatch("roundOf16-5", shuffled[10], shuffled[11]),
          createMatch("roundOf16-6", shuffled[12], shuffled[13]),
          createMatch("roundOf16-7", shuffled[14], shuffled[15]),
        ],
        roundName: "Round of 16",
        isComplete: false,
      };
      break;
    }
  }

  return bracket;
}

/**
 * Creates a match object
 */
function createMatch(id: string, char1: WikiEntry | null, char2: WikiEntry | null): TournamentMatch {
  return {
    id,
    character1: char1,
    character2: char2,
    winner: null,
    explanation: "",
  };
}

/**
 * Checks if a round is complete (all matches have outcomes)
 */
export function isRoundComplete(round: TournamentRound): boolean {
  return round.matches.every(match => match.outcome !== undefined);
}

/**
 * Finds the next match that needs to be fought (top to bottom, left to right)
 */
export function findNextMatch(bracket: TournamentBracket): { roundName: keyof TournamentBracket; matchIndex: number } | null {
  // Check rounds in order: roundOf16 → quarterfinals → semifinals → finals
  const roundOrder: (keyof TournamentBracket)[] = ["roundOf16", "quarterfinals", "semifinals", "finals"];
  
  for (const roundName of roundOrder) {
    const round = bracket[roundName];
    if (!round || round.isComplete) continue;
    
    // Find first match without outcome
    for (let i = 0; i < round.matches.length; i++) {
      if (round.matches[i].outcome === undefined) {
        return { roundName, matchIndex: i };
      }
    }
  }
  
  return null;
}

/**
 * Advances winners from one round to the next
 */
export function advanceRound(
  bracket: TournamentBracket,
  currentRoundName: keyof TournamentBracket
): TournamentRound | null {
  const currentRound = bracket[currentRoundName];
  
  if (!currentRound || !isRoundComplete(currentRound)) {
    return null;
  }

  // Collect winners, handling forfeits
  const winners: (WikiEntry | null)[] = [];
  for (const match of currentRound.matches) {
    if (match.outcome === "forfeit") {
      winners.push(null);
    } else if (match.outcome === "character1") {
      winners.push(match.character1);
    } else if (match.outcome === "character2") {
      winners.push(match.character2);
    }
  }

  const validWinners = winners.filter((w) => w !== null) as WikiEntry[];

  // Determine next round based on current round
  if (currentRoundName === "roundOf16") {
    // Round of 16 → Quarterfinals (4 matches)
    return {
      matches: pairWinners(validWinners, "quarterfinals"),
      roundName: "Quarterfinals",
      isComplete: false,
    };
  } else if (currentRoundName === "quarterfinals") {
    // Quarterfinals → Semifinals
    return {
      matches: pairWinners(validWinners, "semifinals"),
      roundName: "Semifinals",
      isComplete: false,
    };
  } else if (currentRoundName === "semifinals") {
    // Semifinals → Finals
    // Handle forfeit logic: if one match forfeited, other winner advances alone
    if (validWinners.length === 1) {
      return {
        matches: [createMatch("finals-0", validWinners[0], null)],
        roundName: "Finals",
        isComplete: false,
      };
    } else {
      return {
        matches: pairWinners(validWinners, "finals"),
        roundName: "Finals",
        isComplete: false,
      };
    }
  }

  return null;
}

/**
 * Pairs winners into matches for the next round
 */
function pairWinners(winners: WikiEntry[], roundPrefix: string): TournamentMatch[] {
  const matches: TournamentMatch[] = [];
  for (let i = 0; i < winners.length; i += 2) {
    if (i + 1 < winners.length) {
      matches.push(createMatch(`${roundPrefix}-${matches.length}`, winners[i], winners[i + 1]));
    } else {
      // Odd number - create match with bye
      matches.push(createMatch(`${roundPrefix}-${matches.length}`, winners[i], null));
    }
  }
  return matches;
}
