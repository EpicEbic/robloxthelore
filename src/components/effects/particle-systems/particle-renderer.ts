import { Particle } from './particle-factory';

export class ParticleRenderer {
  static renderParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    if (particle.opacity <= 0) return;

    ctx.save();
    ctx.globalAlpha = particle.opacity;

    switch (particle.type) {
      case 'flow':
        this.renderFlowParticle(ctx, particle);
        break;
      case 'grain':
        this.renderGrainParticle(ctx, particle);
        break;
      case 'radio':
        this.renderRadioParticle(ctx, particle);
        break;
      case 'speed':
        this.renderSpeedParticle(ctx, particle);
        break;
      case 'lightning':
        this.renderLightningParticle(ctx, particle);
        break;
      case 'clock':
        this.renderClockParticle(ctx, particle);
        break;
      case 'sparkle':
        this.renderSparkleParticle(ctx, particle);
        break;
    }

    ctx.restore();
  }

  private static renderFlowParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw energy orb with glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = particle.color;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add inner glow
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#93c5fd';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  private static renderGrainParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw rotated capsule (rounded rect) to represent a rice grain
    const w = particle.width || Math.max(1, particle.size * 0.35);
    const h = particle.height || Math.max(3, particle.size * 0.8);
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.angle || 0);
    ctx.fillStyle = particle.color;
    ctx.shadowColor = particle.color + '55';
    ctx.shadowBlur = 2;
    const rw = w;
    const rh = h;
    const r = Math.min(rw, rh) * 0.5;
    // Rounded rectangle path centered at 0,0
    ctx.beginPath();
    ctx.moveTo(-rw / 2 + r, -rh / 2);
    ctx.lineTo(rw / 2 - r, -rh / 2);
    ctx.quadraticCurveTo(rw / 2, -rh / 2, rw / 2, -rh / 2 + r);
    ctx.lineTo(rw / 2, rh / 2 - r);
    ctx.quadraticCurveTo(rw / 2, rh / 2, rw / 2 - r, rh / 2);
    ctx.lineTo(-rw / 2 + r, rh / 2);
    ctx.quadraticCurveTo(-rw / 2, rh / 2, -rw / 2, rh / 2 - r);
    ctx.lineTo(-rw / 2, -rh / 2);
    ctx.quadraticCurveTo(-rw / 2, -rh / 2, -rw / 2 + r, -rh / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private static renderRadioParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw sonar-like expanding circles with radius tied to life progress (keeps expanding while fading)
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 2;
    
    // Expansion grows proportionally to lifespan to avoid stopping before fade completes
    const lifeProgressRadio = particle.life / particle.maxLife; // 0..1
    const expansionRadius = 40 + lifeProgressRadio * 260; // grows from 40px up to ~300px
    
    // Calculate distance to nearest screen edge for fade effect
    const distToLeft = particle.x;
    const distToRight = ctx.canvas.width - particle.x;
    const distToTop = particle.y;
    const distToBottom = ctx.canvas.height - particle.y;
    const minDistToEdge = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    
    // Fade out as the wave approaches screen edges
    const edgeFadeDistance = 100; // Start fading 100px from edge
    const edgeFade = Math.min(1, minDistToEdge / edgeFadeDistance);
    
    // Calculate opacity based on both life and edge distance
    const lifeOpacity = particle.opacity * (1 - lifeProgressRadio);
    const finalOpacity = lifeOpacity * edgeFade;
    
    if (finalOpacity > 0.01) {
      ctx.globalAlpha = finalOpacity;
      
      // Draw the expanding circle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, expansionRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw a subtle inner ring for depth
      if (expansionRadius > 40) {
        ctx.globalAlpha = finalOpacity * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, expansionRadius - 30, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
    // No central pulse point - clean sonar effect
  }

  private static renderSpeedParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw speed lines (twice as long)
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = particle.size;
    ctx.beginPath();
    ctx.moveTo(particle.x - particle.vx * 4, particle.y); // Twice as long
    ctx.lineTo(particle.x, particle.y);
    ctx.stroke();
  }

  private static renderLightningParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw lightning that starts as a ball and expands/branches outward
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    
    // Calculate expansion based on particle life (0 = start, 1 = end)
    const lifeProgress = particle.life / particle.maxLife;
    const expansionFactor = 1 + (lifeProgress * 3); // Expand up to 4x original size
    const branchIntensity = lifeProgress; // More branches as it expands
    
    // Create illumination effect that expands with the lightning
    const illuminationRadius = particle.size * 2 * expansionFactor;
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, illuminationRadius
    );
    gradient.addColorStop(0, `${particle.color}60`); // Bright center
    gradient.addColorStop(0.3, `${particle.color}30`); // Mid glow
    gradient.addColorStop(0.7, `${particle.color}15`); // Outer glow
    gradient.addColorStop(1, `${particle.color}00`); // Transparent edge
    
    // Draw expanding illumination
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, illuminationRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw central bright ball (stronger at start, fades as it expands)
    const ballOpacity = 1 - (lifeProgress * 0.7); // Fade ball as it expands
    if (ballOpacity > 0) {
      ctx.globalAlpha = particle.opacity * ballOpacity;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw branching lightning bolts (more branches as it expands)
    ctx.globalAlpha = particle.opacity;
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 2 + (lifeProgress * 2); // Thicker as it expands
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 8 + (lifeProgress * 4);
    
    // Number of branches increases with expansion
    const numBranches = 1 + Math.floor(branchIntensity * 5); // 1-6 branches
    
    for (let branch = 0; branch < numBranches; branch++) {
      // Create jagged lightning path for each branch
      const lightningLength = particle.size * expansionFactor;
      const segments = 6 + Math.floor(Math.random() * 6);
      const segmentLength = lightningLength / segments;
      
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      
      let currentX = particle.x;
      let currentY = particle.y;
      // Each branch goes in a different direction
      let direction = (branch / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      
      for (let i = 0; i < segments; i++) {
        // Add randomness to the direction, more chaotic as it expands
        direction += (Math.random() - 0.5) * (0.5 + lifeProgress * 1.5);
        
        // Calculate next point
        const nextX = currentX + Math.cos(direction) * segmentLength;
        const nextY = currentY + Math.sin(direction) * segmentLength;
        
        ctx.lineTo(nextX, nextY);
        
        currentX = nextX;
        currentY = nextY;
      }
      
      ctx.stroke();
    }
    
    // Draw bright core on main branches
    ctx.globalAlpha = particle.opacity * 0.8;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  private static renderClockParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw spinning clock
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.life * 0.1); // Spin based on life
    ctx.strokeStyle = particle.color;
    ctx.fillStyle = particle.color;
    ctx.lineWidth = 2;
    
    // Draw clock face
    ctx.beginPath();
    ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw clock hands
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -particle.size / 3);
    ctx.moveTo(0, 0);
    ctx.lineTo(particle.size / 6, 0);
    ctx.stroke();
    
    ctx.restore();
  }

  private static renderSparkleParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
    // Draw actual sparkle shape
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.life * 0.2); // Slow rotation
    ctx.strokeStyle = particle.color;
    ctx.fillStyle = particle.color;
    ctx.lineWidth = 2;
    
    // Draw sparkle shape (4-pointed star)
    const sparkleSize = particle.size;
    ctx.beginPath();
    
    // Main cross lines
    ctx.moveTo(-sparkleSize, 0);
    ctx.lineTo(sparkleSize, 0);
    ctx.moveTo(0, -sparkleSize);
    ctx.lineTo(0, sparkleSize);
    
    // Diagonal lines
    ctx.moveTo(-sparkleSize * 0.7, -sparkleSize * 0.7);
    ctx.lineTo(sparkleSize * 0.7, sparkleSize * 0.7);
    ctx.moveTo(-sparkleSize * 0.7, sparkleSize * 0.7);
    ctx.lineTo(sparkleSize * 0.7, -sparkleSize * 0.7);
    
    ctx.stroke();
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}
