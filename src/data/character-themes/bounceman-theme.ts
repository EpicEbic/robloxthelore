import { CharacterTheme } from '@/types/character-theme-types';

export const bouncemanTheme: CharacterTheme = {
  id: 'the-bounceman',
  name: 'Atomic Trampoline',
  colors: {
    primary: '#dc2626',      // Red (for titles, selections)
    secondary: '#991b1b',   // Dark red
    accent: '#dc2626',       // Red
    background: '#000000',   // Pure black
    surface: '#0a0a0a',      // Very dark black
    text: '#ffffff',         // White (for paragraph text)
  },
  gradients: {
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
    card: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
    accent: 'linear-gradient(45deg, #dc2626 0%, #991b1b 100%)',
  },
  particles: {
    type: 'bounce',
    color: '#dc2626',        // Brighter red for better visibility
    intensity: 1.0,          // Full intensity
    speed: 0.5,              // Slow scroll
    count: 80,                // More particles for polka-dot pattern
  },
  patterns: {
    type: 'geometric',
    opacity: 0.1,
  },
};

