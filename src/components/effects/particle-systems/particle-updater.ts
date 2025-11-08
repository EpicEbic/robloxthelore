import { Particle } from './particle-factory';
import { ParticleConfigManager } from './particle-config';

export class ParticleUpdater {
  static updateParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    particle.life += 1; // Count frames, not time (matches character entry system)

    switch (particle.type) {
      case 'flow':
        this.updateFlowParticle(particle, deltaTime, canvas);
        break;
      case 'grain':
        this.updateGrainParticle(particle, deltaTime, canvas);
        break;
      case 'radio':
        this.updateRadioParticle(particle, deltaTime, canvas);
        break;
      case 'speed':
        this.updateSpeedParticle(particle, deltaTime, canvas);
        break;
      case 'lightning':
        this.updateLightningParticle(particle, deltaTime, canvas);
        break;
      case 'clock':
        this.updateClockParticle(particle, deltaTime, canvas);
        break;
      case 'sparkle':
        this.updateSparkleParticle(particle, deltaTime, canvas);
        break;
      case 'cosmic-wave':
        this.updateCosmicWaveParticle(particle, deltaTime, canvas);
        break;
      case 'stardust':
        this.updateStardustParticle(particle, deltaTime, canvas);
        break;
    }
  }

  private static calculateOpacity(particle: Particle, fadeInTime: number, fadeOutTime: number, fadeStartDelay: number): number {
    // Fade in phase
    if (particle.life < fadeInTime) {
      return (particle.life / fadeInTime) * particle.opacity;
    }
    
    // Full opacity phase
    if (particle.life < fadeStartDelay) {
      return particle.opacity;
    }
    
    // Fade out phase
    const fadeOutStart = fadeStartDelay;
    const fadeOutEnd = fadeStartDelay + fadeOutTime;
    
    if (particle.life < fadeOutEnd) {
      const fadeProgress = (particle.life - fadeOutStart) / fadeOutTime;
      return particle.opacity * (1 - fadeProgress);
    }
    
    return 0; // Fully faded out
  }

  private static updateFlowParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Keep flow particles contained to their side
    if (particle.side === 'left') {
      particle.x = Math.min(particle.x, canvas.width / 2 - 20);
    } else if (particle.side === 'right') {
      particle.x = Math.max(particle.x, canvas.width / 2 + 20);
    }
    
    // Only fade in the last 2 seconds of lifespan (matches character entry system)
    if (particle.life < particle.fadeStartTime) {
      particle.opacity = 0.7; // Full opacity until fade time
    } else {
      const fadeProgress = (particle.life - particle.fadeStartTime) / (particle.maxLife - particle.fadeStartTime);
      particle.opacity = (1 - fadeProgress) * 0.7;
    }
  }

  private static updateGrainParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Straight downward fall
    particle.x += (particle.vx || 0);
    particle.y += Math.max(0.4, particle.vy);
    
    // Keep grain particles contained to their side
    if (particle.side === 'left') {
      particle.x = Math.min(particle.x, canvas.width / 2 - 20);
    } else if (particle.side === 'right') {
      particle.x = Math.max(particle.x, canvas.width / 2 + 20);
    }
    
    // Slight slow rotation wobble
    if (particle.angle !== undefined) {
      particle.angle += (Math.random() - 0.5) * 0.01;
    }
    // Fade only near end of lifespan (last 20%)
    const fadeStart = particle.maxLife * 0.8;
    if (particle.life < fadeStart) {
      particle.opacity = 0.9; // fixed high opacity for most of life
    } else {
      const fadeProgress = (particle.life - fadeStart) / (particle.maxLife - fadeStart);
      particle.opacity = Math.max(0, 1 - fadeProgress);
    }
  }

  private static updateRadioParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Sonar-like expansion - particles stay in place but expand outward
    // No position changes, just expansion and opacity fade
    particle.opacity = 0.7 * (1 - particle.life / particle.maxLife);
  }

  private static updateSpeedParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Keep speed particles contained to their side
    if (particle.side === 'left') {
      particle.x = Math.min(particle.x, canvas.width / 2 - 20);
    } else if (particle.side === 'right') {
      particle.x = Math.max(particle.x, canvas.width / 2 + 20);
    }
    
    particle.opacity = 0.8 * (1 - particle.life / particle.maxLife);
  }

  private static updateLightningParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Lightning particles stay in place and just fade
    particle.opacity = 0.9 * (1 - particle.life / particle.maxLife);
  }

  private static updateClockParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Clock particles stay in place and just fade
    particle.opacity = 0.6 * (1 - particle.life / particle.maxLife);
  }

  private static updateSparkleParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Sparkle particles stay in place and just fade
    particle.opacity = 0.8 * (1 - particle.life / particle.maxLife);
  }

  private static updateCosmicWaveParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Move particle in its direction
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Update sway phase for wave motion
    if (particle.swayPhase !== undefined) {
      particle.swayPhase += 0.02;
    }
    
    // Add gentle drift
    particle.vx += (Math.random() - 0.5) * 0.02;
    particle.vy += (Math.random() - 0.5) * 0.02;
    
    // Wrap around screen edges for continuous flow
    if (particle.x < -particle.size * 2) {
      particle.x = canvas.width + particle.size * 2;
    } else if (particle.x > canvas.width + particle.size * 2) {
      particle.x = -particle.size * 2;
    }
    
    if (particle.y < -particle.size * 2) {
      particle.y = canvas.height + particle.size * 2;
    } else if (particle.y > canvas.height + particle.size * 2) {
      particle.y = -particle.size * 2;
    }
    
    // Slow fade in at the beginning (1 second)
    if (particle.life < 60) {
      const fadeProgress = particle.life / 60;
      particle.opacity = fadeProgress * 0.3;
    } 
    // Slow fade out at the end (2 seconds)
    else if (particle.life > particle.maxLife - 120) {
      const fadeProgress = (particle.maxLife - particle.life) / 120;
      particle.opacity = fadeProgress * 0.3;
    } 
    // Full opacity in the middle
    else {
      particle.opacity = 0.3;
    }
  }

  private static updateStardustParticle(particle: Particle, deltaTime: number, canvas: HTMLCanvasElement): void {
    // Move particle quickly in its direction
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Wrap around screen edges for continuous effect
    if (particle.x < -10) {
      particle.x = canvas.width + 10;
    } else if (particle.x > canvas.width + 10) {
      particle.x = -10;
    }
    
    if (particle.y < -10) {
      particle.y = canvas.height + 10;
    } else if (particle.y > canvas.height + 10) {
      particle.y = -10;
    }
    
    // Quick fade in at the beginning (0.5 seconds)
    if (particle.life < 30) {
      const fadeProgress = particle.life / 30;
      particle.opacity = fadeProgress * 0.7;
    } 
    // Quick fade out at the end (1 second)
    else if (particle.life > particle.maxLife - 60) {
      const fadeProgress = (particle.maxLife - particle.life) / 60;
      particle.opacity = fadeProgress * 0.7;
    } 
    // Full opacity in the middle
    else {
      particle.opacity = 0.7;
    }
  }
}
