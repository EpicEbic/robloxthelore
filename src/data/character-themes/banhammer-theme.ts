import { CharacterTheme } from '@/types/character-theme-types';

export const banhammerTheme: CharacterTheme = {
  id: 'the-banhammer',
  name: 'The Banhammer',
  colors: {
    primary: '#3b82f6',      // Blue (primary color)
    secondary: '#6b7280',    // Grey (secondary color)
    accent: '#fbbf24',       // Yellow (accents)
    background: '#0a0a0a',  // Almost black (dark background)
    surface: '#1a0a0a',     // Slightly lighter black
    text: '#ffffff',        // White (text overlays)
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 20%, #1a1a2a 35%, #1a2a3a 50%, #1a1a2a 65%, #1a0a0a 80%, #0a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #1a1a2a 50%, #1a2a3a 100%)',
    accent: 'linear-gradient(45deg, #fbbf24 0%, #fcd34d 100%)',
  },
  particles: {
    type: 'none',
    color: '#3b82f6',
    intensity: 0.8,
    speed: 0,
    count: 0,
  },
  patterns: {
    type: 'energy',
    opacity: 0.1,
  },
};

