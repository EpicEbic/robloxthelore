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
import { gravityCoilTheme } from './gravity-coil-theme';
import { speedCoilTheme } from './speed-coil-theme';
import { regenerationCoilTheme } from './regeneration-coil-theme';
import { coilsOfPowerTheme } from './coils-of-power-theme';
import { renByteraTheme } from './ren-bytera-theme';
import { bryckManningTheme } from './bryck-manning-theme';

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
  'gravity-coil': gravityCoilTheme,
  'speed-coil': speedCoilTheme,
  'regeneration-coil': regenerationCoilTheme,
  'coils-of-power': coilsOfPowerTheme,
  'ren-bytera': renByteraTheme,
  'bryck-manning': bryckManningTheme,
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
export { caesarTheme, nauliTheme, vortexTheme, riceFarmerTheme, bouncemanTheme, bloxyColaTheme, witchesBrewTheme, buildermanTheme, banhammerTheme, gravityCoilTheme, speedCoilTheme, regenerationCoilTheme, coilsOfPowerTheme, renByteraTheme, bryckManningTheme };
