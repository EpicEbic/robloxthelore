// Glow intensity levels
export type GlowIntensity = 'subtle' | 'moderate' | 'intense';

// Glow configuration for theme
export interface GlowConfig {
  primary: string;      // Main glow color (usually matches theme primary)
  secondary: string;    // Secondary glow for accents
  intensity: GlowIntensity;
  blur: number;         // Blur radius in px (8-16)
  spread: number;       // Spread radius in px (1-4)
}

// Glass-morphism settings
export interface GlassConfig {
  blur: number;         // Backdrop blur in px (4-12 for subtle)
  opacity: number;      // Background opacity (0.1-0.3)
  borderOpacity: number; // Border opacity (0.1-0.3)
  tint: string;         // Tint color for glass panels
}

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
  // NEW: Glow configuration (optional for backwards compatibility)
  glow?: GlowConfig;
  // NEW: Glass-morphism settings (optional for backwards compatibility)
  glass?: GlassConfig;
  particles: {
    type: 'flow' | 'sparkle' | 'wave' | 'orb' | 'radio' | 'speed' | 'clock' | 'lightning' | 'grain' | 'cosmic-wave' | 'stardust' | 'shooting-star' | 'bounce' | 'bubble' | 'squiggle' | 'none';
    color: string;
    intensity: number;
    speed: number;
    count: number;
    rotationSpeedMultiplier?: number; // Multiplier for spiral rotation speed (default 1.0)
    scrollDirection?: 'up' | 'down' | 'left' | 'right'; // Scroll direction for spiral patterns (default 'down')
  };
  patterns: {
    type: 'geometric' | 'organic' | 'energy' | 'mechanical' | 'none';
    opacity: number;
  };
}

// Default glow config generator based on theme colors
export function createDefaultGlow(primaryColor: string, accentColor: string): GlowConfig {
  return {
    primary: primaryColor,
    secondary: accentColor,
    intensity: 'moderate',
    blur: 12,
    spread: 2,
  };
}

// Default glass config generator
export function createDefaultGlass(tintColor: string): GlassConfig {
  return {
    blur: 8,
    opacity: 0.15,
    borderOpacity: 0.2,
    tint: tintColor,
  };
}

export type ParticleType = 'flow' | 'sparkle' | 'wave' | 'orb' | 'radio' | 'speed' | 'clock' | 'lightning' | 'grain' | 'cosmic-wave' | 'stardust' | 'shooting-star' | 'bounce' | 'bubble' | 'squiggle' | 'none';
export type PatternType = 'geometric' | 'organic' | 'energy' | 'mechanical' | 'none';

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
