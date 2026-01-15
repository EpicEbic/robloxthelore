import { CharacterTheme } from '@/types/character-theme-types';

export const speedCoilTheme: CharacterTheme = {
  id: 'speed-coil',
  name: 'Speed Coil',
  colors: {
    primary: '#ef4444',      // Red
    secondary: '#dc2626',   // Darker red
    accent: '#ffffff',       // White
    background: '#1a1a1a',   // Dark grey
    surface: '#2a2a2a',      // Medium grey
    text: '#ffffff',         // White
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #2a1a1a 50%, #3a1a1a 60%, #2a1a1a 70%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #2a1a1a 50%, #3a2a2a 100%)',
    accent: 'linear-gradient(45deg, #ef4444 0%, #f87171 50%, #ffffff 100%)',
  },
  glow: {
    primary: '#ef4444',
    secondary: '#f87171',
    intensity: 'intense',
    blur: 14,
    spread: 3,
  },
  glass: {
    blur: 8,
    opacity: 0.14,
    borderOpacity: 0.22,
    tint: '#ef4444',
  },
  particles: {
    type: 'squiggle',
    color: '#f87171',
    intensity: 0.7,
    speed: 1.2,
    count: 500,
    rotationSpeedMultiplier: 2.0,
    scrollDirection: 'left',
  },
  patterns: {
    type: 'energy',
    opacity: 0.15,
  },
};
