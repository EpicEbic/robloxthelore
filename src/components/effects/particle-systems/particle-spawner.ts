import { CharacterTheme } from '@/types/character-theme-types';
import { Particle, ParticleSystemConfig } from './particle-factory';
import { ParticleFactory } from './particle-factory';
import { ParticleConfigManager } from './particle-config';

export class ParticleSpawner {
  static shouldSpawnParticle(
    theme: CharacterTheme,
    side: 'left' | 'right',
    currentParticles: Particle[],
    performanceMode: 'high' | 'medium' | 'low'
  ): boolean {
    if (!theme || !theme.particles) return false;

    // Determine what particle type this character should spawn
    const particleType = this.getParticleTypeForCharacter(theme);
    
    // Get configuration for the correct particle type
    const particleConfig = ParticleConfigManager.getParticleConfig(theme, particleType, performanceMode, side);
    
    // Count particles for this side only to ensure independent limits
    const sideParticles = currentParticles.filter(p => p.side === side);
    
    // Don't spawn if we're at the limit for this side
    if (sideParticles.length >= particleConfig.maxParticles) return false;
    
    // Use proper per-frame spawn chance (divide by 60 to convert from per-second to per-frame)
    const adjustedSpawnChance = particleConfig.spawnChance / 60; // Convert per-second to per-frame at 60fps
    
    // Debug logging for Vortex speed particles
    if (theme.id === 'vortex-a-steele' && particleType === 'speed') {
      console.log(`Vortex speed spawn: chance=${particleConfig.spawnChance}, adjusted=${adjustedSpawnChance}, side=${side}, particles=${sideParticles.length}/${particleConfig.maxParticles}`);
    }
    
    // Random chance to spawn based on configuration
    return Math.random() < adjustedSpawnChance;
  }

  private static getParticleTypeForCharacter(theme: CharacterTheme): string {
    // Return the primary particle type for each character
    switch (theme.id) {
      case 'caesar-bloxwright':
        return 'flow'; // Caesar primarily spawns flow particles
      case 'vortex-a-steele':
        return 'speed'; // Vortex primarily spawns speed particles
      case 'rice-farmer':
        return 'grain'; // Rice spawns grain particles
      case 'nauli-parter': // Fixed the ID to match the theme
        return 'radio'; // Nauli spawns radio particles
      case 'the-bloxiverse':
        return 'stardust'; // Bloxiverse primarily spawns stardust (with some waves)
      default:
        return theme.particles.type; // Use theme's default type
    }
  }

  static createParticleForTheme(
    theme: CharacterTheme,
    side: 'left' | 'right',
    canvas: HTMLCanvasElement,
    performanceMode: 'high' | 'medium' | 'low'
  ): Particle | null {
    if (!theme || !theme.particles) return null;

    const baseSpeed = theme.particles.speed || 1;
    
    // Get configuration for this particle type
    const particleConfig = ParticleConfigManager.getParticleConfig(theme, theme.particles.type, performanceMode, side);
    
    const config: ParticleSystemConfig = {
      canvas,
      theme,
      side,
      baseSpeed,
      performanceMode,
      particleConfig
    };

    // Apply theme-specific enhancements
    return this.applyThemeEnhancements(config);
  }

  private static applyThemeEnhancements(config: ParticleSystemConfig): Particle | null {
    const { theme } = config;
    
    // Use exact character-specific logic from character entry system
    if (theme.id === 'caesar-bloxwright') {
      const particleType = Math.random();
      if (particleType < 0.7) {
        // 70% flow particles
        const flowConfig = ParticleConfigManager.getParticleConfig(theme, 'flow', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: flowConfig }, 'flow');
      } else {
        // 30% lightning bolts
        const lightningConfig = ParticleConfigManager.getParticleConfig(theme, 'lightning', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: lightningConfig }, 'lightning');
      }
    } else if (theme.id === 'vortex-a-steele') {
      const particleType = Math.random();
      if (particleType < 0.6) {
        // 60% speed lines
        const speedConfig = ParticleConfigManager.getParticleConfig(theme, 'speed', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: speedConfig }, 'speed');
      } else if (particleType < 0.8) {
        // 20% clocks
        const clockConfig = ParticleConfigManager.getParticleConfig(theme, 'clock', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: clockConfig }, 'clock');
      } else {
        // 20% sparkles (purple circles)
        const sparkleConfig = ParticleConfigManager.getParticleConfig(theme, 'sparkle', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: sparkleConfig }, 'sparkle');
      }
    } else if (theme.id === 'the-bloxiverse') {
      const particleType = Math.random();
      if (particleType < 0.3) {
        // 30% cosmic waves
        const waveConfig = ParticleConfigManager.getParticleConfig(theme, 'cosmic-wave', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: waveConfig }, 'cosmic-wave');
      } else {
        // 70% stardust
        const stardustConfig = ParticleConfigManager.getParticleConfig(theme, 'stardust', config.performanceMode, config.side);
        return ParticleFactory.createParticle({ ...config, particleConfig: stardustConfig }, 'stardust');
      }
    } else {
      // For other characters, use their default particle type
      return ParticleFactory.createParticle(config);
    }
  }


}
