import { CharacterTheme } from '@/types/character-theme-types';

export const riceFarmerTheme: CharacterTheme = {
  id: 'rice-farmer',
  name: 'Rice Farmer',
  colors: {
    primary: '#8a6746',
    secondary: '#f5ecd9',
    accent: '#3a7ca5',
    background: '#0f0d0a',
    surface: '#221a14',
    text: '#f5ecd9',
  },
  gradients: {
    background: 'linear-gradient(180deg, #221a14 0%, #0f0d0a 100%)',
    card: 'linear-gradient(180deg, rgba(138,103,70,0.12) 0%, rgba(15,13,10,0.6) 100%)',
    accent: 'linear-gradient(90deg, #3a7ca5 0%, #7a5a3a 100%)',
  },
  particles: {
    type: 'grain',
    color: '#fffaf0',
    intensity: 0.8,
    speed: 0.6,
    count: 150,
  },
  patterns: {
    type: 'organic',
    opacity: 0.08,
  },
};

