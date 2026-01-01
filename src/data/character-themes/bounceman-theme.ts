import { CharacterTheme } from '@/types/character-theme-types';

export const bouncemanTheme: CharacterTheme = {
  id: 'the-bounceman',
  name: 'Atomic Trampoline',
  colors: {
    primary: '#991b1b',      // Darker red (for titles, selections)
    secondary: '#7f1d1d',    // Very dark red
    accent: '#dc2626',       // Brighter red (highlights)
    background: '#0a0a0a',   // Almost black (dark background)
    surface: '#1a0a0a',      // Slightly lighter black with red tint
    text: '#ffffff',         // White (text overlays)
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #1a1a0a 60%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #2a1a1a 100%)',
    accent: 'linear-gradient(45deg, #dc2626 0%, #991b1b 100%)',
  },
  particles: {
    type: 'bounce',
    color: '#dc2626',        // Red particles
    intensity: 0.8,          // Slightly reduced intensity
    speed: 0.5,              // Slow scroll
    count: 80,               // More particles for polka-dot pattern
  },
  patterns: {
    type: 'geometric',
    opacity: 0.1,
  },
};

