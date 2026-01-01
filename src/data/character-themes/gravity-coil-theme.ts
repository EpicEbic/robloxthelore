import { CharacterTheme } from '@/types/character-theme-types';

export const gravityCoilTheme: CharacterTheme = {
  id: 'gravity-coil',
  name: 'Gravity Coil',
  colors: {
    primary: '#3b82f6',      // Blue
    secondary: '#1e40af',   // Darker blue
    accent: '#ffffff',       // White
    background: '#1a1a1a',   // Dark grey
    surface: '#2a2a2a',      // Medium grey
    text: '#ffffff',         // White
  },
  gradients: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #1a1a2a 50%, #1a2a3a 60%, #1a1a2a 70%, #1a0a0a 100%)',
    card: 'linear-gradient(145deg, #1a0a0a 0%, #1a1a2a 50%, #2a2a3a 100%)',
    accent: 'linear-gradient(45deg, #3b82f6 0%, #60a5fa 50%, #ffffff 100%)',
  },
  particles: {
    type: 'squiggle',
    color: '#60a5fa',
    intensity: 0.7,
    speed: 0.5,
    count: 400,
    rotationSpeedMultiplier: 1.0, // Medium/standard rotation speed
    scrollDirection: 'up', // Scroll upwards
  },
  patterns: {
    type: 'energy',
    opacity: 0.15,
  },
};

