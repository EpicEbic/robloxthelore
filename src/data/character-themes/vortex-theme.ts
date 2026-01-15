import { CharacterTheme } from '@/types/character-theme-types';

export const vortexTheme: CharacterTheme = {
  id: 'vortex-a-steele',
  name: 'Chronipulation',
  colors: {
    primary: '#a855f7',      // Purple
    secondary: '#a855f7',    // Purple
    accent: '#a855f7',       // Purple
    background: '#000000',   // Pure black
    surface: '#1a1a1a',      // Dark gray
    text: '#f1f5f9',         // Light grey
  },
  gradients: {
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
    card: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
    accent: 'linear-gradient(45deg, #a855f7 0%, #9333ea 100%)',
  },
  glow: {
    primary: '#a855f7',
    secondary: '#9333ea',
    intensity: 'moderate',
    blur: 14,
    spread: 3,
  },
  glass: {
    blur: 10,
    opacity: 0.12,
    borderOpacity: 0.25,
    tint: '#a855f7',
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
