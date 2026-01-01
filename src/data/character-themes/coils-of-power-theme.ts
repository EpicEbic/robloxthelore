import { CharacterTheme } from '@/types/character-theme-types';
import { gravityCoilTheme } from './gravity-coil-theme';

// The Coils of Power uses the Gravity Coil theme as the default
// Individual coil themes are applied when switching between coils
export const coilsOfPowerTheme: CharacterTheme = {
  ...gravityCoilTheme,
  id: 'coils-of-power',
  name: 'Coils of Power',
};
