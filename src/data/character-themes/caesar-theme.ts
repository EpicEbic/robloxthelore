import { CharacterTheme } from '@/types/character-theme-types';

export const caesarTheme: CharacterTheme = {
  id: 'caesar-bloxwright',
  name: 'Electrogravitic Flow',
  colors: {
    primary: '#60a5fa',      // Light blue
    secondary: '#1e40af',    // Dark blue
    accent: '#6b7280',       // Grey
    background: '#0f172a',   // Black
    surface: '#1e293b',      // Dark blue-grey
    text: '#f1f5f9',         // Light grey
  },
  gradients: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    card: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
    accent: 'linear-gradient(45deg, #60a5fa 0%, #1e40af 100%)',
  },
  particles: {
    type: 'flow',
    color: '#60a5fa',
    intensity: 0.8,
    speed: 1.5,
    count: 60, // Double the particle count
  },
  patterns: {
    type: 'energy',
    opacity: 0.1,
  },
};
