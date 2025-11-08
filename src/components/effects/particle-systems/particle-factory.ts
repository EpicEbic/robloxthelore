import { CharacterTheme } from '@/types/character-theme-types';
import { ParticleTypeConfig } from './particle-config';

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
  type: string;
  side: 'left' | 'right';
  angle?: number;
  width?: number;
  height?: number;
  fadeStartTime?: number; // When to start fading (in frames)
  swayPhase?: number; // phase accumulator for horizontal sway
  // Special flags for specific particle behaviors
  isVortexSpeed?: boolean;
  isRiceGrain?: boolean;
  isCaesarFlow?: boolean;
  isNauliRadio?: boolean;
}

export interface ParticleSystemConfig {
  canvas: HTMLCanvasElement;
  theme: CharacterTheme;
  side: 'left' | 'right';
  baseSpeed: number;
  performanceMode: 'high' | 'medium' | 'low';
  particleConfig: ParticleTypeConfig;
}

export class ParticleFactory {
  static createParticle(config: ParticleSystemConfig, particleType?: string): Particle | null {
    const { canvas, theme, side, baseSpeed } = config;
    const { particles } = theme;

    // Use the provided particle type or fall back to the theme's particle type
    const typeToCreate = particleType || particles.type;

    switch (typeToCreate) {
      case 'flow':
        return this.createFlowParticle(config);
      case 'grain':
        return this.createGrainParticle(config);
      case 'radio':
        return this.createRadioParticle(config);
      case 'speed':
        return this.createSpeedParticle(config);
      case 'lightning':
        return this.createLightningParticle(config);
      case 'clock':
        return this.createClockParticle(config);
      case 'sparkle':
        return this.createSparkleParticle(config);
      case 'cosmic-wave':
        return this.createCosmicWaveParticle(config);
      case 'stardust':
        return this.createStardustParticle(config);
      default:
        return null;
    }
  }

  private static createFlowParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Ensure particles spawn only on their designated side
    const spawnX = side === 'left' 
      ? Math.random() * (canvas.width / 2 - 50) + 25 // Left side with margin
      : (canvas.width / 2 + 25) + Math.random() * (canvas.width / 2 - 50); // Right side with margin

    // Use configuration for velocity ranges
    const vx = particleConfig.baseVelocity.x[0] + Math.random() * (particleConfig.baseVelocity.x[1] - particleConfig.baseVelocity.x[0]);
    const vy = particleConfig.baseVelocity.y[0] + Math.random() * (particleConfig.baseVelocity.y[1] - particleConfig.baseVelocity.y[0]);

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    return {
      x: spawnX,
      y: canvas.height + Math.random() * 50, // Start from bottom of container
      vx: vx,
      vy: vy,
      size: size,
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'flow',
      side,
      fadeStartTime: particleConfig.fadeStartDelay,
      isCaesarFlow: theme.id === 'caesar-bloxwright'
    };
  }

  private static createGrainParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Use configuration for velocity ranges
    const vx = particleConfig.baseVelocity.x[0] + Math.random() * (particleConfig.baseVelocity.x[1] - particleConfig.baseVelocity.x[0]);
    const vy = particleConfig.baseVelocity.y[0] + Math.random() * (particleConfig.baseVelocity.y[1] - particleConfig.baseVelocity.y[0]);

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    // Grain-specific properties
    const width = 2 + Math.random() * 1.5; // 2-3.5px
    const height = 5 + Math.random() * 3; // 5-8px
    const angle = (Math.random() - 0.5) * 0.6; // ~-17 to 17 degrees
    const swayPhase = 0;

    // Ensure particles spawn only on their designated side
    const spawnX = side === 'left' 
      ? Math.random() * (canvas.width / 2 - 50) + 25 // Left side with margin
      : (canvas.width / 2 + 25) + Math.random() * (canvas.width / 2 - 50); // Right side with margin

    return {
      x: spawnX,
      y: -20 - Math.random() * canvas.height * 0.3, // some start above view for stagger
      vx: vx,
      vy: vy,
      size: Math.max(width, height),
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'grain',
      side,
      angle,
      width,
      height,
      swayPhase,
      fadeStartTime: particleConfig.fadeStartDelay,
      isRiceGrain: theme.id === 'rice-farmer'
    };
  }

  private static createRadioParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Use configuration for velocity ranges
    const vx = particleConfig.baseVelocity.x[0] + Math.random() * (particleConfig.baseVelocity.x[1] - particleConfig.baseVelocity.x[0]);
    const vy = particleConfig.baseVelocity.y[0] + Math.random() * (particleConfig.baseVelocity.y[1] - particleConfig.baseVelocity.y[0]);

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    // Ensure particles spawn only on their designated side
    const margin = 50; // Keep some margin from screen edges
    const sideWidth = canvas.width / 2 - margin;
    const centerX = side === 'left' 
      ? margin + Math.random() * sideWidth // Left side
      : (canvas.width / 2) + margin + Math.random() * sideWidth; // Right side
    const centerY = margin + Math.random() * (canvas.height - 2 * margin);

    return {
      x: centerX,
      y: centerY,
      vx: vx,
      vy: vy,
      size: size,
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'radio',
      side,
      isNauliRadio: theme.id === 'nauli-ahmed'
    };
  }

  private static createSpeedParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Use configuration for velocity ranges, but adjust direction based on side
    const baseVx = particleConfig.baseVelocity.x[0] + Math.random() * (particleConfig.baseVelocity.x[1] - particleConfig.baseVelocity.x[0]);
    const vx = side === 'left' ? baseVx : -baseVx; // Left side moves right, right side moves left
    const vy = particleConfig.baseVelocity.y[0] + Math.random() * (particleConfig.baseVelocity.y[1] - particleConfig.baseVelocity.y[0]);

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    // Speed particles spawn from the edge of their designated side
    const spawnX = side === 'left' 
      ? -50 - Math.random() * 100 // Left side - spawn from left edge
      : canvas.width + 50 + Math.random() * 100; // Right side - spawn from right edge

    const particle: Particle = {
      x: spawnX,
      y: Math.random() * canvas.height,
      vx: vx,
      vy: vy,
      size: size,
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'speed',
      side
    };

    // Mark Vortex speed particles for special handling
    if (theme.id === 'vortex-a-steele') {
      particle.isVortexSpeed = true;
    }

    return particle;
  }

  private static createLightningParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    // Ensure particles spawn only on their designated side
    const spawnX = side === 'left' 
      ? Math.random() * (canvas.width / 2 - 50) + 25 // Left side with margin
      : (canvas.width / 2 + 25) + Math.random() * (canvas.width / 2 - 50); // Right side with margin

    return {
      x: spawnX,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: size,
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'lightning',
      side
    };
  }

  private static createClockParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    // Ensure particles spawn only on their designated side
    const spawnX = side === 'left' 
      ? Math.random() * (canvas.width / 2 - 50) + 25 // Left side with margin
      : (canvas.width / 2 + 25) + Math.random() * (canvas.width / 2 - 50); // Right side with margin

    return {
      x: spawnX,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: size,
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'clock',
      side
    };
  }

  private static createSparkleParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, baseSpeed, particleConfig } = config;
    const { particles } = theme;

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    // Ensure particles spawn only on their designated side
    const spawnX = side === 'left' 
      ? Math.random() * (canvas.width / 2 - 50) + 25 // Left side with margin
      : (canvas.width / 2 + 25) + Math.random() * (canvas.width / 2 - 50); // Right side with margin

    return {
      x: spawnX,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: size,
      opacity: opacity * particles.intensity,
      color: particles.color,
      life: 0,
      maxLife: maxLife,
      type: 'sparkle',
      side
    };
  }

  private static createCosmicWaveParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, particleConfig } = config;
    const { particles } = theme;

    // Random colors: purple, pink, and blue shades
    const colors = [
      '#e879f9', // Bright fuchsia
      '#f0abfc', // Light fuchsia  
      '#c084fc', // Purple
      '#a855f7', // Deeper purple
      '#d946ef', // Magenta
      '#ec4899', // Hot pink
      '#8b5cf6', // Violet
      '#6366f1', // Indigo
      '#3b82f6', // Blue
      '#60a5fa', // Light blue
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Spawn anywhere in the canvas for full coverage
    const spawnX = Math.random() * canvas.width;
    const spawnY = Math.random() * canvas.height;

    // Use configuration for velocity ranges
    const vx = particleConfig.baseVelocity.x[0] + Math.random() * (particleConfig.baseVelocity.x[1] - particleConfig.baseVelocity.x[0]);
    const vy = particleConfig.baseVelocity.y[0] + Math.random() * (particleConfig.baseVelocity.y[1] - particleConfig.baseVelocity.y[0]);

    // Use configuration for size range
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    return {
      x: spawnX,
      y: spawnY,
      vx: vx,
      vy: vy,
      size: size,
      opacity: opacity * particles.intensity,
      color: randomColor,
      life: 0,
      maxLife: maxLife,
      type: 'cosmic-wave',
      side,
      fadeStartTime: particleConfig.fadeStartDelay,
      swayPhase: Math.random() * Math.PI * 2 // Random starting phase for wave motion
    };
  }

  private static createStardustParticle(config: ParticleSystemConfig): Particle {
    const { canvas, theme, side, particleConfig } = config;
    const { particles } = theme;

    // Random colors: purple, pink, and blue shades for stardust
    const colors = [
      '#e879f9', // Bright fuchsia
      '#f0abfc', // Light fuchsia  
      '#c084fc', // Purple
      '#a855f7', // Deeper purple
      '#d946ef', // Magenta
      '#ec4899', // Hot pink
      '#8b5cf6', // Violet
      '#6366f1', // Indigo
      '#3b82f6', // Blue
      '#60a5fa', // Light blue
      '#ffffff', // White for extra sparkle
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Spawn anywhere in the canvas
    const spawnX = Math.random() * canvas.width;
    const spawnY = Math.random() * canvas.height;

    // Use configuration for velocity ranges - fast streaking particles
    const vx = particleConfig.baseVelocity.x[0] + Math.random() * (particleConfig.baseVelocity.x[1] - particleConfig.baseVelocity.x[0]);
    const vy = particleConfig.baseVelocity.y[0] + Math.random() * (particleConfig.baseVelocity.y[1] - particleConfig.baseVelocity.y[0]);

    // Use configuration for size range - tiny particles
    const size = particleConfig.sizeRange[0] + Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]);

    // Use configuration for life range
    const maxLife = particleConfig.lifeRange[0] + Math.random() * (particleConfig.lifeRange[1] - particleConfig.lifeRange[0]);

    // Use configuration for opacity range
    const opacity = particleConfig.opacityRange[0] + Math.random() * (particleConfig.opacityRange[1] - particleConfig.opacityRange[0]);

    return {
      x: spawnX,
      y: spawnY,
      vx: vx,
      vy: vy,
      size: size,
      opacity: opacity * particles.intensity,
      color: randomColor,
      life: 0,
      maxLife: maxLife,
      type: 'stardust',
      side
    };
  }
}
