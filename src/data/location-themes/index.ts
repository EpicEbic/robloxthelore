import { CharacterTheme } from '@/types/character-theme-types';
import { bloxiverseTheme } from './bloxiverse-theme';

const locationThemes: Record<string, CharacterTheme> = {
  'the-bloxiverse': bloxiverseTheme,
};

export const getLocationTheme = (locationId: string): CharacterTheme | null => {
  const theme = locationThemes[locationId] || null;
  return theme;
};

export const getAllLocationThemes = (): CharacterTheme[] => {
  return Object.values(locationThemes);
};

export const hasLocationTheme = (locationId: string): boolean => {
  return locationId in locationThemes;
};

// Export individual themes
export { bloxiverseTheme };

