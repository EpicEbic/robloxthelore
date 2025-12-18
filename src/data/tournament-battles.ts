import { allCharacters } from "@/data/characters";
import { WikiEntry } from "@/types/wiki-types";

export interface BattleData {
  character1: string; // Character ID
  character2: string; // Character ID
  character1WinChance: number; // Percentage (0-100)
  character2WinChance: number; // Percentage (0-100)
  forfeitChance?: number; // Optional percentage (0-100)
  character1WinExplanation: string; // Explanation when character1 wins
  character2WinExplanation: string; // Explanation when character2 wins
  forfeitExplanation?: string; // Optional explanation for forfeit outcome
}

/**
 * Generates unique explanations for character matchups
 * Uses character names and a hash to ensure uniqueness
 */
function generateUniqueExplanations(char1Title: string, char2Title: string): {
  char1Win: string;
  char2Win: string;
} {
  // Create a hash from character names for consistent scenario selection
  const hash = (char1Title + char2Title).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Different explanation templates for variety
  const templates = [
    {
      char1: `${char1Title} demonstrates superior combat prowess, overwhelming ${char2Title} with a combination of strategic positioning and decisive strikes. ${char2Title} fought with determination but was unable to match ${char1Title}'s tactical advantage.`,
      char2: `${char2Title} utilizes exceptional agility and quick thinking to outmaneuver ${char1Title}'s attacks. Through a series of well-timed counterattacks, ${char2Title} manages to secure victory against the formidable opponent.`
    },
    {
      char1: `${char1Title} leverages raw power and unrelenting offense to break through ${char2Title}'s defenses. Despite ${char2Title}'s valiant efforts, ${char1Title}'s overwhelming force proves decisive in the end.`,
      char2: `${char2Title} capitalizes on ${char1Title}'s momentary lapse in focus, executing a perfectly timed combination that turns the tide of battle. ${char1Title} is caught off guard and unable to recover.`
    },
    {
      char1: `${char1Title} maintains superior positioning throughout the encounter, methodically dismantling ${char2Title}'s strategy. ${char2Title} struggles to adapt and ultimately falls to ${char1Title}'s calculated approach.`,
      char2: `${char2Title} finds an opening in ${char1Title}'s defense through clever feints and misdirection. The unexpected strategy catches ${char1Title} by surprise, leading to ${char2Title}'s victory.`
    },
    {
      char1: `${char1Title} overwhelms ${char2Title} with a display of raw strength and combat expertise. ${char2Title} puts up a fierce resistance but cannot overcome ${char1Title}'s superior capabilities.`,
      char2: `${char2Title} exploits ${char1Title}'s overconfidence, using precision strikes to target critical weaknesses. ${char1Title} underestimates ${char2Title}'s skill and pays the price.`
    },
    {
      char1: `${char1Title} establishes dominance early in the fight, controlling the pace and forcing ${char2Title} into defensive positions. ${char2Title}'s resilience is impressive, but ${char1Title}'s consistent pressure eventually breaks through.`,
      char2: `${char2Title} weathers ${char1Title}'s initial onslaught and finds their rhythm. As the battle progresses, ${char2Title}'s adaptability and endurance prove to be the deciding factors.`
    },
    {
      char1: `${char1Title} showcases exceptional technique and timing, landing critical blows that gradually wear down ${char2Title}. ${char2Title} fights admirably but ${char1Title}'s precision proves too much to handle.`,
      char2: `${char2Title} demonstrates remarkable composure under pressure, turning ${char1Title}'s aggressive attacks into opportunities. Through patient counterplay, ${char2Title} seizes victory.`
    },
    {
      char1: `${char1Title} combines speed and power effectively, creating openings that ${char2Title} cannot fully defend against. ${char2Title} shows great heart but ${char1Title}'s versatility wins the day.`,
      char2: `${char2Title} reads ${char1Title}'s patterns and adapts accordingly, finding ways to neutralize ${char1Title}'s advantages. ${char2Title}'s strategic thinking leads to a hard-fought victory.`
    },
    {
      char1: `${char1Title} maintains relentless pressure from start to finish, never giving ${char2Title} a chance to establish their own game plan. ${char2Title} is overwhelmed by ${char1Title}'s intensity.`,
      char2: `${char2Title} bides their time and waits for the perfect moment to strike. When ${char1Title} overextends, ${char2Title} capitalizes with a devastating counterattack that seals the win.`
    },
    {
      char1: `${char1Title} uses superior footwork and spacing to control the distance, making it difficult for ${char2Title} to mount effective offense. ${char2Title} struggles to close the gap and falls short.`,
      char2: `${char2Title} closes the distance effectively and forces ${char1Title} into close-quarters combat where ${char2Title} excels. ${char1Title} cannot escape ${char2Title}'s relentless pressure.`
    },
    {
      char1: `${char1Title} displays incredible stamina and determination, outlasting ${char2Title} in a grueling battle of attrition. ${char2Title} gives everything but ${char1Title} proves more durable.`,
      char2: `${char2Title} finds a second wind when it matters most, rallying from behind to mount an incredible comeback. ${char1Title} cannot match ${char2Title}'s late-fight surge.`
    },
    {
      char1: `${char1Title} executes a flawless game plan, neutralizing ${char2Title}'s strengths while exploiting their weaknesses. ${char2Title} cannot adjust quickly enough to ${char1Title}'s strategy.`,
      char2: `${char2Title} surprises ${char1Title} with unexpected techniques and unorthodox approaches. ${char1Title} is thrown off balance and ${char2Title} takes full advantage.`
    },
    {
      char1: `${char1Title} demonstrates superior fight IQ, making adjustments mid-battle that ${char2Title} cannot counter. ${char2Title}'s initial success is nullified by ${char1Title}'s adaptability.`,
      char2: `${char2Title} shows incredible heart and refuses to back down, pushing through ${char1Title}'s attacks to land decisive blows. ${char1Title} cannot match ${char2Title}'s determination.`
    }
  ];
  
  const selectedTemplate = templates[hash % templates.length];
  
  return {
    char1Win: selectedTemplate.char1,
    char2Win: selectedTemplate.char2
  };
}

/**
 * Generates all possible character matchups with generic 50/50 outcomes
 */
function generateAllMatchups(): BattleData[] {
  const matchups: BattleData[] = [];
  
  // Generate all unique pairs (A vs B, but not B vs A)
  for (let i = 0; i < allCharacters.length; i++) {
    for (let j = i + 1; j < allCharacters.length; j++) {
      const char1 = allCharacters[i];
      const char2 = allCharacters[j];
      
      const explanations = generateUniqueExplanations(char1.title, char2.title);
      
      matchups.push({
        character1: char1.id,
        character2: char2.id,
        character1WinChance: 50,
        character2WinChance: 50,
        character1WinExplanation: explanations.char1Win,
        character2WinExplanation: explanations.char2Win,
      });
    }
  }
  
  return matchups;
}

/**
 * Predefined battle data for specific character matchups
 * Currently generates all possible matchups with 50/50 probabilities
 * Add specific matchups here to override defaults with custom probabilities
 */
export const tournamentBattles: BattleData[] = generateAllMatchups();

/**
 * Retrieves battle data for a specific matchup, or generates default data
 */
export function getBattleData(entryId1: string, entryId2: string): BattleData {
  // Try to find predefined battle data
  const battle = tournamentBattles.find(
    (b) =>
      (b.character1 === entryId1 && b.character2 === entryId2) ||
      (b.character1 === entryId2 && b.character2 === entryId1)
  );

  if (battle) {
    // Ensure character1 and character2 match the order requested
    if (battle.character1 === entryId1) {
      return battle;
    } else {
      // Swap if entryId1 is character2 in the stored data
      return {
        character1: battle.character2,
        character2: battle.character1,
        character1WinChance: battle.character2WinChance,
        character2WinChance: battle.character1WinChance,
        forfeitChance: battle.forfeitChance,
        character1WinExplanation: battle.character2WinExplanation,
        character2WinExplanation: battle.character1WinExplanation,
        forfeitExplanation: battle.forfeitExplanation,
      };
    }
  }

  // Fallback: Generate default data if somehow not found
  const char1 = allCharacters.find((c) => c.id === entryId1);
  const char2 = allCharacters.find((c) => c.id === entryId2);

  const char1Title = char1?.title || entryId1;
  const char2Title = char2?.title || entryId2;

  const explanations = generateUniqueExplanations(char1Title, char2Title);

  return {
    character1: entryId1,
    character2: entryId2,
    character1WinChance: 50,
    character2WinChance: 50,
    character1WinExplanation: explanations.char1Win,
    character2WinExplanation: explanations.char2Win,
  };
}

/**
 * Simulates a battle outcome based on probabilities
 */
export function simulateBattle(battleData: BattleData): "character1" | "character2" | "forfeit" {
  const random = Math.random() * 100;
  
  // Check forfeit first if applicable
  if (battleData.forfeitChance && random < battleData.forfeitChance) {
    return "forfeit";
  }
  
  // Adjust random value if forfeit chance exists
  const adjustedRandom = battleData.forfeitChance 
    ? (random - battleData.forfeitChance) / (100 - battleData.forfeitChance) * 100
    : random;
  
  if (adjustedRandom < battleData.character1WinChance) {
    return "character1";
  } else {
    return "character2";
  }
}
