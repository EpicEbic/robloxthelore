import { ParticleConfigManager } from './particle-config';

/**
 * Utility class for easily adjusting particle parameters
 * This makes it simple to fine-tune particle behavior without diving into the configuration
 */
export class ParticleAdjuster {
  // Easy methods for adjusting spawn rates
  static increaseSpawnRate(particleType: string, multiplier: number = 1.5): void {
    ParticleConfigManager.adjustSpawnRate(particleType, multiplier);
  }

  static decreaseSpawnRate(particleType: string, multiplier: number = 0.5): void {
    ParticleConfigManager.adjustSpawnRate(particleType, multiplier);
  }

  // Easy methods for adjusting particle counts
  static increaseParticleCount(particleType: string, multiplier: number = 1.5): void {
    ParticleConfigManager.adjustMaxParticles(particleType, multiplier);
  }

  static decreaseParticleCount(particleType: string, multiplier: number = 0.5): void {
    ParticleConfigManager.adjustMaxParticles(particleType, multiplier);
  }

  // Easy methods for adjusting velocity
  static increaseSpeed(particleType: string, xMultiplier: number = 1.5, yMultiplier: number = 1.5): void {
    ParticleConfigManager.adjustVelocity(particleType, xMultiplier, yMultiplier);
  }

  static decreaseSpeed(particleType: string, xMultiplier: number = 0.5, yMultiplier: number = 0.5): void {
    ParticleConfigManager.adjustVelocity(particleType, xMultiplier, yMultiplier);
  }

  // Easy methods for adjusting fade timing
  static makeFadeFaster(particleType: string, fadeInTime: number = 0, fadeOutTime: number = 30, fadeStartDelay: number = 0): void {
    ParticleConfigManager.adjustFadeTiming(particleType, fadeInTime, fadeOutTime, fadeStartDelay);
  }

  static makeFadeSlower(particleType: string, fadeInTime: number = 30, fadeOutTime: number = 120, fadeStartDelay: number = 0): void {
    ParticleConfigManager.adjustFadeTiming(particleType, fadeInTime, fadeOutTime, fadeStartDelay);
  }

  // Preset configurations for common adjustments
  static makeParticlesMoreIntense(particleType: string): void {
    this.increaseSpawnRate(particleType, 2.0);
    this.increaseParticleCount(particleType, 1.5);
    this.increaseSpeed(particleType, 1.3, 1.3);
  }

  static makeParticlesMoreSubtle(particleType: string): void {
    this.decreaseSpawnRate(particleType, 0.5);
    this.decreaseParticleCount(particleType, 0.7);
    this.decreaseSpeed(particleType, 0.8, 0.8);
  }

  static makeParticlesFaster(particleType: string): void {
    this.increaseSpeed(particleType, 2.0, 2.0);
    this.makeFadeFaster(particleType);
  }

  static makeParticlesSlower(particleType: string): void {
    this.decreaseSpeed(particleType, 0.5, 0.5);
    this.makeFadeSlower(particleType);
  }

  // Character-specific adjustments
  static enhanceRiceParticles(): void {
    this.makeParticlesMoreIntense('grain');
    this.increaseSpeed('grain', 1.0, 2.0); // Faster falling
  }

  static enhanceVortexParticles(): void {
    this.makeParticlesMoreIntense('speed');
    this.increaseSpeed('speed', 2.0, 1.0); // Faster horizontal movement
  }

  static enhanceVortexSpeedLinesDramatically(): void {
    // Drastically increase Vortex's speed line particles
    this.increaseSpawnRate('speed', 3.0); // 3x spawn rate
    this.increaseParticleCount('speed', 2.5); // 2.5x particle count
    this.increaseSpeed('speed', 1.5, 1.0); // 1.5x horizontal speed, normal vertical
  }

  static enhanceCaesarParticles(): void {
    this.makeParticlesMoreIntense('flow');
    this.increaseSpeed('flow', 1.2, 1.2); // Slightly faster movement
  }

  static enhanceNauliParticles(): void {
    this.makeParticlesMoreIntense('radio');
    this.increaseSpeed('radio', 1.5, 1.5); // Faster radio waves
  }
}
