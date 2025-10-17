import { CharacterTheme } from '@/types/character-theme-types';
import { caesarTheme } from './caesar-theme';
import { nauliTheme } from './nauli-theme';
import { vortexTheme } from './vortex-theme';

const characterThemes: Record<string, CharacterTheme> = {
  'caesar-bloxwright': caesarTheme,
  'nauli-parter': nauliTheme,
  'vortex-a-steele': vortexTheme,
};

export const getCharacterTheme = (characterId: string): CharacterTheme | null => {
  console.log('getCharacterTheme called with:', characterId);
  console.log('Available themes:', Object.keys(characterThemes));
  const theme = characterThemes[characterId] || null;
  console.log('Returning theme:', theme);
  return theme;
};

export const getAllCharacterThemes = (): CharacterTheme[] => {
  return Object.values(characterThemes);
};

export const hasCharacterTheme = (characterId: string): boolean => {
  return characterId in characterThemes;
};

// Export individual themes
export { caesarTheme, nauliTheme, vortexTheme };
