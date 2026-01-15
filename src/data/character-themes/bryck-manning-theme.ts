import { CharacterTheme } from '@/types/character-theme-types';

export const bryckManningTheme: CharacterTheme = {
  id: 'bryck-manning',
  name: 'Bryck Manning',
  colors: {
    primary: '#22c55e',      // Green (primary color)
    secondary: '#000000',    // Black (secondary color)
    accent: '#22c55e',       // Green (accents)
    background: '#000000',   // Black (dark background)
    surface: '#0a0a0a',      // Very dark grey
    text: '#ffffff',         // White (text)
  },
  gradients: {
    background: 'linear-gradient(135deg, #000000 0%, #0a0f0a 20%, #1a2a1a 35%, #0a0f0a 50%, #1a2a1a 65%, #0a0f0a 80%, #000000 100%)',
    card: 'linear-gradient(145deg, #0a0f0a 0%, #1a2a1a 50%, #0a0f0a 100%)',
    accent: 'linear-gradient(45deg, #22c55e 0%, #4ade80 100%)',
  },
  particles: {
    type: 'grain',
    color: '#000000',
    intensity: 0.3,
    speed: 0.6,
    count: 12, // Reduced count for faster rendering
  },
  patterns: {
    type: 'none',
    opacity: 0.1,
  },
};

