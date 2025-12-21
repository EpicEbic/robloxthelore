import { CharacterTheme } from '@/types/character-theme-types';

export const bloxyColaTheme: CharacterTheme = {
  id: 'bloxy-cola',
  name: 'Bloxy Cola',
  colors: {
    primary: '#ea580c',      // Orange (from the cans)
    secondary: '#c2410c',    // Darker orange-brown
    accent: '#fbbf24',       // Yellow-orange (glowing ring)
    background: '#0a0a0a',  // Almost black (dark background)
    surface: '#1a0a0a',     // Slightly lighter black
    text: '#ffffff',        // White (text overlays)
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #2a1a0a 60%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #2a1a0a 100%)',
    accent: 'linear-gradient(45deg, #fbbf24 0%, #ffffff 100%)',
  },
  particles: {
    type: 'flow',
    color: '#d2b48c',
    intensity: 0.8,
    speed: 2.0,
    count: 450,
  },
  patterns: {
    type: 'energy',
    opacity: 0.1,
  },
};

