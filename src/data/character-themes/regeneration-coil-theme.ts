import { CharacterTheme } from '@/types/character-theme-types';

export const regenerationCoilTheme: CharacterTheme = {
  id: 'regeneration-coil',
  name: 'Regeneration Coil',
  colors: {
    primary: '#22c55e',      // Green
    secondary: '#16a34a',    // Darker green
    accent: '#ffffff',       // White
    background: '#1a1a1a',   // Dark grey
    surface: '#2a2a2a',      // Medium grey
    text: '#ffffff',         // White
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #1a2a1a 50%, #1a3a1a 60%, #1a2a1a 70%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #1a2a1a 50%, #2a3a2a 100%)',
    accent: 'linear-gradient(45deg, #22c55e 0%, #4ade80 50%, #ffffff 100%)',
  },
  particles: {
    type: 'squiggle',
    color: '#4ade80',
    intensity: 0.6,
    speed: 0.3,
    count: 350,
    rotationSpeedMultiplier: 0.4, // Slower/gentle rotation speed
    scrollDirection: 'down', // Scroll downwards
  },
  patterns: {
    type: 'organic',
    opacity: 0.12,
  },
};

