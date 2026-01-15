import { CharacterTheme } from '@/types/character-theme-types';

export const renByteraTheme: CharacterTheme = {
  id: 'ren-bytera',
  name: 'Ren Bytera',
  colors: {
    primary: '#ffffff',      // White (primary color)
    secondary: '#6b7280',     // Grey (secondary color)
    accent: '#fbbf24',        // Yellow (accents)
    background: '#0a0a0a',   // Almost black (dark background)
    surface: '#1a1a1a',      // Dark grey
    text: '#ffffff',         // White (text)
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2a2a2a 35%, #1a1a1a 50%, #2a2a2a 65%, #1a1a1a 80%, #0a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
    accent: 'linear-gradient(45deg, #fbbf24 0%, #fcd34d 100%)',
  },
  particles: {
    type: 'none',
    color: '#ffffff',
    intensity: 0,
    speed: 0,
    count: 0,
  },
  patterns: {
    type: 'mechanical',
    opacity: 0.15,
  },
};
