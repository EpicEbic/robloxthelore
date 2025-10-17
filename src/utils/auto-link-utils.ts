import { WikiEntry } from "@/types/wiki-types";

export interface LinkMatch {
  text: string;
  entryId: string;
  startIndex: number;
  endIndex: number;
}

// Whitelist of common words that should NOT be auto-linked
const LINK_WHITELIST = new Set([
  // Common words
  'power', 'powers', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among',
  'against', 'within', 'without', 'upon', 'beneath', 'beside', 'behind', 'beyond', 'across', 'around', 'near',
  'far', 'over', 'under', 'down', 'out', 'off', 'away', 'back', 'here', 'there', 'where', 'when', 'why', 'how',
  
  // Action words
  'use', 'used', 'using', 'make', 'made', 'making', 'get', 'got', 'getting', 'take', 'took', 'taking',
  'give', 'gave', 'giving', 'go', 'went', 'going', 'come', 'came', 'coming', 'see', 'saw', 'seeing',
  'know', 'knew', 'knowing', 'think', 'thought', 'thinking', 'say', 'said', 'saying', 'tell', 'told', 'telling',
  
  // Descriptive words
  'good', 'bad', 'great', 'small', 'large', 'big', 'little', 'old', 'new', 'long', 'short', 'high', 'low',
  'strong', 'weak', 'fast', 'slow', 'hot', 'cold', 'warm', 'cool', 'light', 'dark', 'bright', 'heavy',
  'easy', 'hard', 'soft', 'loud', 'quiet', 'clean', 'dirty', 'safe', 'dangerous', 'happy', 'sad',
  
  // Time words
  'time', 'day', 'night', 'morning', 'afternoon', 'evening', 'week', 'month', 'year', 'hour', 'minute',
  'second', 'moment', 'today', 'tomorrow', 'yesterday', 'now', 'then', 'soon', 'late', 'early',
  
  // Place words
  'place', 'area', 'location', 'spot', 'site', 'position', 'room', 'house', 'building', 'city', 'town',
  'country', 'world', 'earth', 'space', 'ground', 'floor', 'wall', 'door', 'window', 'way', 'path',
  
  // People words
  'person', 'people', 'man', 'woman', 'boy', 'girl', 'child', 'adult', 'friend', 'family', 'group',
  'team', 'member', 'leader', 'boss', 'worker', 'student', 'teacher', 'player', 'user', 'farmer',
  
  // Gaming/generic terms
  'game', 'level', 'stage', 'round', 'turn', 'move', 'action', 'attack', 'defense', 'skill', 'ability',
  'item', 'weapon', 'tool', 'equipment', 'gear', 'stuff', 'thing', 'object', 'piece', 'part',
  'system', 'method', 'process', 'way', 'means', 'form', 'type', 'kind', 'sort', 'style',
  
  // Numbers and quantities
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'first', 'second',
  'third', 'last', 'next', 'many', 'few', 'some', 'all', 'most', 'more', 'less', 'much', 'little',
  'enough', 'several', 'various', 'different', 'same', 'other', 'another', 'each', 'every',
  
  // Common verbs
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall',
  
  // Roblox-specific common terms (but generic)
  'roblox', 'game', 'player', 'character', 'avatar', 'script', 'gui', 'ui', 'spawn', 'respawn',
  'teleport', 'chat', 'friend', 'group', 'server', 'client', 'admin', 'moderator', 'developer'
]);

// Special character names that should be allowed despite being short
const ALLOWED_SHORT_NAMES = new Set(['ren']);

// Entries that should only be linked by their full title, not individual words
const FULL_TITLE_ONLY = new Set(['bloxy cola']);

/**
 * Check if a word should be excluded from auto-linking
 */
function shouldExcludeFromLinking(word: string): boolean {
  const normalizedWord = word.toLowerCase().trim();
  
  // Check against whitelist
  if (LINK_WHITELIST.has(normalizedWord)) {
    return true;
  }
  
  // Allow special short character names
  if (ALLOWED_SHORT_NAMES.has(normalizedWord)) {
    return false;
  }
  
  // Exclude very short words (3 characters or less)
  if (normalizedWord.length <= 3) {
    return true;
  }
  
  // Exclude words that are just numbers
  if (/^\d+$/.test(normalizedWord)) {
    return true;
  }
  
  return false;
}

/**
 * Finds potential keyword matches in text based on entry titles
 */
export function findKeywordMatches(
  text: string, 
  entries: WikiEntry[], 
  currentEntryId?: string
): LinkMatch[] {
  const matches: LinkMatch[] = [];
  
  // Create a list of potential keywords from entry titles
  const keywords = entries
    .filter(entry => entry.id !== currentEntryId) // Don't link to self
    .map(entry => ({
      title: entry.title,
      id: entry.id,
      // Also include variations like "Caesar Bloxwright" -> "Caesar"
      variations: extractKeywordVariations(entry.title)
    }))
    .flatMap(entry => 
      entry.variations
        .filter(variation => !shouldExcludeFromLinking(variation)) // Apply whitelist filter
        .map(variation => ({
          keyword: variation,
          entryId: entry.id,
          originalTitle: entry.title
        }))
    );

  // Sort by length (longest first) to prioritize longer matches
  keywords.sort((a, b) => b.keyword.length - a.keyword.length);

  // Find matches in text
  const textLower = text.toLowerCase();
  const usedRanges: Array<{ start: number; end: number }> = [];

  for (const { keyword, entryId } of keywords) {
    const keywordLower = keyword.toLowerCase();
    let searchIndex = 0;

    while (true) {
      const index = textLower.indexOf(keywordLower, searchIndex);
      if (index === -1) break;

      const endIndex = index + keyword.length;

      // Check if this range overlaps with existing matches
      const overlaps = usedRanges.some(range => 
        (index >= range.start && index < range.end) ||
        (endIndex > range.start && endIndex <= range.end) ||
        (index <= range.start && endIndex >= range.end)
      );

      // Check if it's a whole word (not part of another word)
      const beforeChar = index > 0 ? text[index - 1] : ' ';
      const afterChar = endIndex < text.length ? text[endIndex] : ' ';
      const isWholeWord = /\W/.test(beforeChar) && /\W/.test(afterChar);

      if (!overlaps && isWholeWord) {
        matches.push({
          text: text.substring(index, endIndex),
          entryId,
          startIndex: index,
          endIndex
        });
        usedRanges.push({ start: index, end: endIndex });
      }

      searchIndex = index + 1;
    }
  }

  // Sort matches by start index
  return matches.sort((a, b) => a.startIndex - b.startIndex);
}

/**
 * Extract keyword variations from a title
 * e.g., "Caesar Bloxwright" -> ["Caesar Bloxwright", "Caesar", "Bloxwright"]
 */
function extractKeywordVariations(title: string): string[] {
  const variations = [title];
  
  // Check if this title should only be linked as a complete phrase
  if (FULL_TITLE_ONLY.has(title.toLowerCase())) {
    return variations; // Only return the full title
  }
  
  // Split by spaces and add individual words (if not excluded)
  const words = title.split(/\s+/)
    .filter(word => !shouldExcludeFromLinking(word));
  variations.push(...words);
  
  // Remove "The" prefix variations
  if (title.startsWith("The ")) {
    variations.push(title.substring(4));
  }
  
  return [...new Set(variations)]; // Remove duplicates
}

/**
 * Split text into segments with link information
 */
export interface TextSegment {
  text: string;
  isLink: boolean;
  entryId?: string;
}

export function segmentTextWithLinks(
  text: string, 
  entries: WikiEntry[], 
  currentEntryId?: string
): TextSegment[] {
  const matches = findKeywordMatches(text, entries, currentEntryId);
  
  if (matches.length === 0) {
    return [{ text, isLink: false }];
  }

  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const match of matches) {
    // Add text before the match
    if (match.startIndex > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, match.startIndex),
        isLink: false
      });
    }

    // Add the matched link
    segments.push({
      text: match.text,
      isLink: true,
      entryId: match.entryId
    });

    lastIndex = match.endIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.substring(lastIndex),
      isLink: false
    });
  }

  return segments;
}