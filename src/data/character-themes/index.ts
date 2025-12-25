import { CharacterTheme } from '@/types/character-theme-types';
import { caesarTheme } from './caesar-theme';
import { nauliTheme } from './nauli-theme';
import { vortexTheme } from './vortex-theme';
import { riceFarmerTheme } from './rice-farmer-theme';
import { bouncemanTheme } from './bounceman-theme';
import { bloxyColaTheme } from './bloxy-cola-theme';
import { witchesBrewTheme } from './witches-brew-theme';
import { buildermanTheme } from './builderman-theme';
import { banhammerTheme } from './banhammer-theme';

const characterThemes: Record<string, CharacterTheme> = {
  'caesar-bloxwright': caesarTheme,
  'nauli-parter': nauliTheme,
  'vortex-a-steele': vortexTheme,
  'rice-farmer': riceFarmerTheme,
  'the-bounceman': bouncemanTheme,
  'bloxy-cola': bloxyColaTheme,
  'witches-brew': witchesBrewTheme,
  'builderman': buildermanTheme,
  'the-banhammer': banhammerTheme,
};

export const getCharacterTheme = (characterId: string): CharacterTheme | null => {
  const theme = characterThemes[characterId] || null;
  return theme;
};

export const getAllCharacterThemes = (): CharacterTheme[] => {
  return Object.values(characterThemes);
};

export const hasCharacterTheme = (characterId: string): boolean => {
  return characterId in characterThemes;
};

// Export individual themes
export { caesarTheme, nauliTheme, vortexTheme, riceFarmerTheme, bouncemanTheme, bloxyColaTheme, witchesBrewTheme, buildermanTheme, banhammerTheme };
