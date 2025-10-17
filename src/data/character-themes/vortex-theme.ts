import { CharacterTheme } from '@/types/character-theme-types';

export const vortexTheme: CharacterTheme = {
  id: 'vortex-a-steele',
  name: 'Chronipulation',
  colors: {
    primary: '#eab308',      // Yellow
    secondary: '#a855f7',    // Purple
    accent: '#a855f7',       // Purple
    background: '#000000',   // Pure black
    surface: '#1a1a1a',      // Dark gray
    text: '#f1f5f9',         // Light grey
  },
  gradients: {
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
    card: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
    accent: 'linear-gradient(45deg, #eab308 0%, #a855f7 100%)',
  },
  particles: {
    type: 'speed',
    color: '#a855f7',
    intensity: 0.8,
    speed: 2.5,
    count: 45,
  },
  patterns: {
    type: 'geometric',
    opacity: 0.15,
  },
};
