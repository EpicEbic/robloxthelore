import { CharacterTheme } from '@/types/character-theme-types';

export const bloxiverseTheme: CharacterTheme = {
  id: 'the-bloxiverse',
  name: 'The Bloxiverse',
  colors: {
    primary: '#e879f9',      // Bright fuchsia
    secondary: '#f0abfc',    // Light fuchsia
    accent: '#ffffff',       // White
    background: '#1a0a2e',   // Deep purple-black
    surface: '#2d1b4e',      // Purple-gray
    text: '#ffffff',         // White
  },
  gradients: {
    background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 25%, #4a1a5e 50%, #2d1b4e 75%, #1a0a2e 100%)',
    card: 'linear-gradient(145deg, #2d1b4e 0%, #3d2b5e 100%)',
    accent: 'linear-gradient(45deg, #e879f9 0%, #f0abfc 50%, #ffffff 100%)',
  },
  glow: {
    primary: '#e879f9',
    secondary: '#f0abfc',
    intensity: 'intense',
    blur: 16,
    spread: 4,
  },
  glass: {
    blur: 10,
    opacity: 0.16,
    borderOpacity: 0.25,
    tint: '#e879f9',
  },
  particles: {
    type: 'cosmic-wave',
    color: '#e879f9',
    intensity: 0.8,
    speed: 1.2,
    count: 30,
  },
  patterns: {
    type: 'geometric',
    opacity: 0.12,
  },
};
