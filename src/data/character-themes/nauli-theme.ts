import { CharacterTheme } from '@/types/character-theme-types';

export const nauliTheme: CharacterTheme = {
  id: 'nauli-parter',
  name: 'Pathokinesis',
  colors: {
    primary: '#16a34a',      // Darker green
    secondary: '#6b7280',    // Medium gray
    accent: '#f3f4f6',       // Light gray
    background: '#111827',   // Dark gray
    surface: '#1f2937',      // Medium gray
    text: '#f9fafb',         // White
  },
  gradients: {
    background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
    card: 'linear-gradient(145deg, #1f2937 0%, #374151 100%)',
    accent: 'linear-gradient(45deg, #16a34a 0%, #6b7280 100%)',
  },
  particles: {
    type: 'radio',
    color: '#f9fafb',
    intensity: 0.7,
    speed: 1.2,
    count: 45,
  },
  patterns: {
    type: 'organic',
    opacity: 0.12,
  },
};
