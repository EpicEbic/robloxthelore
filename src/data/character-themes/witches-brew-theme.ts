import { CharacterTheme } from '@/types/character-theme-types';

export const witchesBrewTheme: CharacterTheme = {
  id: 'witches-brew',
  name: 'Witches Brew',
  colors: {
    primary: '#22c55e',      // Green (primary color)
    secondary: '#16a34a',    // Darker green
    accent: '#fbbf24',       // Yellow (highlights)
    background: '#0a0a0a',  // Almost black (dark background)
    surface: '#1a0a0a',     // Slightly lighter black
    text: '#ffffff',        // White (text overlays)
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #1a2a1a 60%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #1a2a1a 100%)',
    accent: 'linear-gradient(45deg, #fbbf24 0%, #ffffff 100%)',
  },
  particles: {
    type: 'flow',
    color: '#22c55e',      // Green bubbles
    intensity: 0.8,
    speed: 2.0,
    count: 450,
  },
  patterns: {
    type: 'energy',
    opacity: 0.1,
  },
};

