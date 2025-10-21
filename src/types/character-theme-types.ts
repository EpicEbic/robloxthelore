export interface CharacterTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  gradients: {
    background: string;
    card: string;
    accent: string;
  };
  particles: {
    type: 'flow' | 'sparkle' | 'wave' | 'orb' | 'radio' | 'speed' | 'clock' | 'lightning' | 'grain' | 'none';
    color: string;
    intensity: number;
    speed: number;
    count: number;
  };
  patterns: {
    type: 'geometric' | 'organic' | 'energy' | 'none';
    opacity: number;
  };
}

export type ParticleType = 'flow' | 'sparkle' | 'wave' | 'orb' | 'radio' | 'speed' | 'clock' | 'lightning' | 'grain' | 'none';
export type PatternType = 'geometric' | 'organic' | 'energy' | 'none';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: ParticleType;
  targetY?: number; // Target position for flow particles
  fadeStartTime?: number; // When to start fading (in frames)
  // Optional fields used by specific particle implementations
  angle?: number; // rotation in radians for grain or rotated shapes
  width?: number; // visual width for non-circular particles (e.g., grain capsule)
  height?: number; // visual height for non-circular particles
  swayPhase?: number; // phase accumulator for horizontal sway
}

export interface ThemeTransition {
  duration: number;
  easing: string;
}
