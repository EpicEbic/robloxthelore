import { CharacterTheme } from '@/types/character-theme-types';

export interface ParticleTypeConfig {
  // Spawn settings
  spawnChance: number;
  maxParticles: number;
  
  // Timing settings
  fadeInTime?: number; // Frames to fade in (0 = instant)
  fadeOutTime?: number; // Frames to fade out (0 = instant)
  fadeStartDelay?: number; // Frames before fade out starts
  
  // Movement settings
  baseVelocity: {
    x: [number, number]; // [min, max] range
    y: [number, number]; // [min, max] range
  };
  
  // Size settings
  sizeRange: [number, number]; // [min, max] range
  
  // Opacity settings
  opacityRange: [number, number]; // [min, max] range
  
  // Lifecycle settings
  lifeRange: [number, number]; // [min, max] lifespan in frames
  
  // Special behavior flags
  wrapAround?: boolean; // Whether particles wrap around screen edges
  gravity?: number; // Gravity effect (positive = down)
  drift?: number; // Random drift amount
}

export interface ParticleSystemConfig {
  // Global settings
  performanceMode: 'high' | 'medium' | 'low';
  side: 'left' | 'right';
  
  // Particle type configurations
  flow: ParticleTypeConfig;
  grain: ParticleTypeConfig;
  radio: ParticleTypeConfig;
  speed: ParticleTypeConfig;
  lightning: ParticleTypeConfig;
  clock: ParticleTypeConfig;
  sparkle: ParticleTypeConfig;
  'cosmic-wave': ParticleTypeConfig;
  stardust: ParticleTypeConfig;
}

export class ParticleConfigManager {
  private static defaultConfig: ParticleSystemConfig = {
    performanceMode: 'high',
    side: 'left',
    
    flow: {
      spawnChance: 0.8, // Higher spawn chance for consistent spawning
      maxParticles: 100,
      fadeInTime: 0,
      fadeOutTime: 120, // 2 seconds at 60fps
      fadeStartDelay: 0,
      baseVelocity: { x: [-0.5, 0.5], y: [-2, -0.5] },
      sizeRange: [5, 8],
      opacityRange: [0.7, 1.0],
      lifeRange: [900, 1500], // 15-25 seconds at 60fps
      wrapAround: false,
      gravity: 0,
      drift: 0.5
    },
    
    grain: {
      spawnChance: 2.0, // Higher spawn chance for consistent spawning
      maxParticles: 150,
      fadeInTime: 0,
      fadeOutTime: 120, // 2 seconds
      fadeStartDelay: 480, // Start fading at 80% of life
      baseVelocity: { x: [0, 0], y: [0.6, 1.2] },
      sizeRange: [2, 8],
      opacityRange: [0.5, 1.0],
      lifeRange: [600, 1200], // 10-20 seconds
      wrapAround: true,
      gravity: 0.4,
      drift: 0
    },
    
    radio: {
      spawnChance: 0.4, // Higher spawn chance for consistent spawning
      maxParticles: 50,
      fadeInTime: 0,
      fadeOutTime: 200, // Gradual fade
      fadeStartDelay: 0,
      baseVelocity: { x: [-0.3, 0.3], y: [-0.3, 0.3] },
      sizeRange: [2, 5],
      opacityRange: [0.5, 1.0],
      lifeRange: [220, 340],
      wrapAround: false,
      gravity: 0,
      drift: 0.3
    },
    
    speed: {
      spawnChance: 5.0, // Much higher base spawn chance for consistent spawning
      maxParticles: 80,
      fadeInTime: 0,
      fadeOutTime: 60, // 1 second
      fadeStartDelay: 0,
      baseVelocity: { x: [2, 5], y: [-0.5, 0.5] }, // Rightward movement
      sizeRange: [3, 5],
      opacityRange: [0.2, 1.0],
      lifeRange: [120, 200],
      wrapAround: false,
      gravity: 0,
      drift: 0.5
    },
    
    lightning: {
      spawnChance: 0.8, // Higher spawn chance for consistent spawning
      maxParticles: 30,
      fadeInTime: 0,
      fadeOutTime: 15, // Very quick fade
      fadeStartDelay: 0,
      baseVelocity: { x: [0, 0], y: [0, 0] },
      sizeRange: [20, 60],
      opacityRange: [0.9, 1.0],
      lifeRange: [10, 25],
      wrapAround: false,
      gravity: 0,
      drift: 0
    },
    
    clock: {
      spawnChance: 0.8, // Higher spawn chance for consistent spawning
      maxParticles: 20,
      fadeInTime: 0,
      fadeOutTime: 40, // Quick fade
      fadeStartDelay: 0,
      baseVelocity: { x: [0, 0], y: [0, 0] },
      sizeRange: [80, 120],
      opacityRange: [0.6, 1.0],
      lifeRange: [60, 100],
      wrapAround: false,
      gravity: 0,
      drift: 0
    },
    
    sparkle: {
      spawnChance: 0.8, // Higher spawn chance for consistent spawning
      maxParticles: 25,
      fadeInTime: 0,
      fadeOutTime: 30, // Quick fade
      fadeStartDelay: 0,
      baseVelocity: { x: [0, 0], y: [0, 0] },
      sizeRange: [6, 12],
      opacityRange: [0.8, 1.0],
      lifeRange: [30, 50],
      wrapAround: false,
      gravity: 0,
      drift: 0
    },
    
    'cosmic-wave': {
      spawnChance: 0.4, // Gentle, consistent spawning
      maxParticles: 20,
      fadeInTime: 60, // Slow fade in over 1 second
      fadeOutTime: 120, // Slow fade out over 2 seconds
      fadeStartDelay: 0,
      baseVelocity: { x: [-0.5, 0.5], y: [-0.3, 0.3] }, // Gentle flow
      sizeRange: [50, 100], // Large wave particles
      opacityRange: [0.2, 0.4], // Very transparent for subtle effect
      lifeRange: [600, 900], // 10-15 seconds - long-lived
      wrapAround: true, // Wrap around to create continuous flow
      gravity: 0,
      drift: 0.15 // Gentle drift for organic movement
    },
    
    stardust: {
      spawnChance: 2.0, // High spawn rate for numerous particles
      maxParticles: 80,
      fadeInTime: 30, // Quick fade in
      fadeOutTime: 60, // Quick fade out
      fadeStartDelay: 0,
      baseVelocity: { x: [-2.5, 2.5], y: [-2.5, 2.5] }, // Fast flying particles
      sizeRange: [1, 3], // Tiny particles
      opacityRange: [0.4, 0.8], // Visible but not too bright
      lifeRange: [120, 240], // 2-4 seconds - short-lived
      wrapAround: true, // Wrap around for continuous effect
      gravity: 0,
      drift: 0.1 // Slight drift
    }
  };

  static getConfig(theme: CharacterTheme, performanceMode: 'high' | 'medium' | 'low', side: 'left' | 'right'): ParticleSystemConfig {
    // Deep clone the default config to avoid modifying the original
    const config = JSON.parse(JSON.stringify(this.defaultConfig));
    config.performanceMode = performanceMode;
    config.side = side;
    
    // Apply performance mode adjustments
    this.applyPerformanceMode(config, performanceMode);
    
    // Apply character-specific adjustments
    this.applyCharacterAdjustments(config, theme);
    
    return config;
  }

  private static applyPerformanceMode(config: ParticleSystemConfig, mode: 'high' | 'medium' | 'low'): void {
    const multiplier = mode === 'high' ? 1 : mode === 'medium' ? 0.7 : 0.4;
    
    // Apply performance mode adjustments to all particle types
    Object.values(config).forEach(particleConfig => {
      if (typeof particleConfig === 'object' && 'spawnChance' in particleConfig) {
        particleConfig.spawnChance *= multiplier;
        particleConfig.maxParticles = Math.floor(particleConfig.maxParticles * multiplier);
      }
    });
  }

  private static applyCharacterAdjustments(config: ParticleSystemConfig, theme: CharacterTheme): void {
    switch (theme.id) {
      case 'caesar-bloxwright':
        // Caesar gets enhanced flow particles
        config.flow.spawnChance *= 1.5;
        config.flow.maxParticles = Math.floor(config.flow.maxParticles * 1.2);
        break;
        
      case 'rice-farmer':
        // Rice gets enhanced grain particles
        config.grain.spawnChance *= 2.0;
        config.grain.maxParticles = Math.floor(config.grain.maxParticles * 1.5);
        break;
        
      case 'vortex-a-steele':
        // Vortex gets drastically enhanced speed particles
        config.speed.spawnChance *= 5.0; // Even more drastically increase spawn rate
        config.speed.maxParticles = Math.floor(config.speed.maxParticles * 3.0); // Much higher particle count
        // Increase velocity for speed particles
        config.speed.baseVelocity.x[0] *= 1.5; // Increase minimum velocity
        config.speed.baseVelocity.x[1] *= 1.5; // Increase maximum velocity
        
        // Reduce clock particle spawn rate to 25% of original
        config.clock.spawnChance *= 0.25; // Reduce clock spawn rate to 25%
        break;
        
      case 'nauli-ahmed':
        // Nauli gets enhanced radio particles
        config.radio.spawnChance *= 1.5;
        config.radio.maxParticles = Math.floor(config.radio.maxParticles * 1.2);
        break;
    }
  }

  static getParticleConfig(theme: CharacterTheme, particleType: string, performanceMode: 'high' | 'medium' | 'low', side: 'left' | 'right'): ParticleTypeConfig {
    const config = this.getConfig(theme, performanceMode, side);
    return config[particleType as keyof ParticleSystemConfig] as ParticleTypeConfig;
  }

  // Utility methods for easy parameter adjustment
  static adjustSpawnRate(particleType: string, multiplier: number): void {
    if (this.defaultConfig[particleType as keyof ParticleSystemConfig]) {
      const config = this.defaultConfig[particleType as keyof ParticleSystemConfig] as ParticleTypeConfig;
      config.spawnChance *= multiplier;
    }
  }

  static adjustMaxParticles(particleType: string, multiplier: number): void {
    if (this.defaultConfig[particleType as keyof ParticleSystemConfig]) {
      const config = this.defaultConfig[particleType as keyof ParticleSystemConfig] as ParticleTypeConfig;
      config.maxParticles = Math.floor(config.maxParticles * multiplier);
    }
  }

  static adjustVelocity(particleType: string, xMultiplier: number, yMultiplier: number): void {
    if (this.defaultConfig[particleType as keyof ParticleSystemConfig]) {
      const config = this.defaultConfig[particleType as keyof ParticleSystemConfig] as ParticleTypeConfig;
      config.baseVelocity.x[0] *= xMultiplier;
      config.baseVelocity.x[1] *= xMultiplier;
      config.baseVelocity.y[0] *= yMultiplier;
      config.baseVelocity.y[1] *= yMultiplier;
    }
  }

  static adjustFadeTiming(particleType: string, fadeInTime: number, fadeOutTime: number, fadeStartDelay: number): void {
    if (this.defaultConfig[particleType as keyof ParticleSystemConfig]) {
      const config = this.defaultConfig[particleType as keyof ParticleSystemConfig] as ParticleTypeConfig;
      config.fadeInTime = fadeInTime;
      config.fadeOutTime = fadeOutTime;
      config.fadeStartDelay = fadeStartDelay;
    }
  }
}
