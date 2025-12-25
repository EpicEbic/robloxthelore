import { CharacterTheme } from '@/types/character-theme-types';

export const buildermanTheme: CharacterTheme = {
  id: 'builderman',
  name: 'Builderman',
  colors: {
    primary: '#f97316',      // Orange (primary color)
    secondary: '#6b7280',    // Grey (secondary color)
    accent: '#fbbf24',       // Yellow (highlights)
    background: '#0a0a0a',  // Almost black (dark background)
    surface: '#1a0a0a',     // Slightly lighter black
    text: '#ffffff',        // White (text overlays)
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 20%, #1a1a2a 35%, #2a1a0a 50%, #1a1a2a 65%, #2a1a0a 80%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #2a1a0a 50%, #1a1a2a 100%)',
    accent: 'linear-gradient(45deg, #f97316 0%, #fbbf24 50%, #1e3a8a 100%)',
  },
  particles: {
    type: 'none',
    color: '#f97316',
    intensity: 0.8,
    speed: 2.0,
    count: 0,
  },
  patterns: {
    type: 'energy',
    opacity: 0.1,
  },
};

