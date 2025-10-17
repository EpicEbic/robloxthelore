import React, { useRef, useEffect, useCallback } from 'react';
import { CharacterTheme, Particle, ParticleType } from '@/types/character-theme-types';

interface CharacterParticlesProps {
  theme: CharacterTheme;
  className?: string;
}

export const CharacterParticles: React.FC<CharacterParticlesProps> = ({ 
  theme, 
  className = "fixed inset-0 pointer-events-none z-0" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }
  }, [theme, prefersReducedMotion]);


  // Create individual particle
  const createParticle = (theme: CharacterTheme): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return {
        x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0,
        color: '', life: 0, maxLife: 0, type: 'none'
      };
    }

    const { particles } = theme;
    const baseSize = 5 + Math.random() * 3; // Fixed base size (5-8px)
    const baseSpeed = particles.speed || 1;

    switch (particles.type) {
      case 'flow':
        // Use fixed travel distance instead of canvas-relative for consistent sizing
        const targetTravelDistance = 400 + Math.random() * 600; // 400-1000px fixed distance
        
        // Calculate required velocity to reach target in reasonable time (15-25 seconds)
        const travelTime = 15 + Math.random() * 10; // 15-25 seconds
        const requiredVelocity = targetTravelDistance / (travelTime * 60); // Convert to pixels per frame
        
        const particle = {
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 50, // Start from bottom of container
          vx: (Math.random() - 0.5) * 0.5,
          vy: -requiredVelocity, // Precise velocity to reach target distance
          size: baseSize,
          opacity: particles.intensity, // Start at full opacity
          color: particles.color,
          life: 0,
          maxLife: travelTime * 60, // Lifespan in frames (15-25 seconds)
          type: 'flow' as const,
          targetY: undefined, // No longer needed with fixed distance
          fadeStartTime: (travelTime - 2) * 60 // Start fading 2 seconds before death
        };
        
        
        return particle;

      case 'radio':
        // Create radio waves that emanate from random points across the entire screen
        // Spread them out more to cover blank spaces around cards
        const margin = 50; // Keep some margin from screen edges
        const centerX = margin + Math.random() * (canvas.width - 2 * margin);
        const centerY = margin + Math.random() * (canvas.height - 2 * margin);
        return {
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          size: 2 + Math.random() * 3,
          opacity: particles.intensity * (0.5 + Math.random() * 0.5),
          color: particles.color,
          life: 0,
          maxLife: 200 + Math.random() * 100,
          type: 'radio'
        };

      case 'speed':
        return {
          x: -50 - Math.random() * 100,
          y: Math.random() * canvas.height,
          vx: baseSpeed * (2 + Math.random() * 3),
          vy: (Math.random() - 0.5) * 0.5,
          size: 3 + Math.random() * 2, // Fixed size lines (3-5px)
          opacity: particles.intensity * (0.2 + Math.random() * 0.8),
          color: particles.color,
          life: 0,
          maxLife: 120 + Math.random() * 80, // Longer lifespan
          type: 'speed'
        };

      case 'clock':
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: 80 + Math.random() * 40, // Fixed size clocks (80-120px)
          opacity: particles.intensity * (0.6 + Math.random() * 0.4),
          color: particles.color,
          life: 0,
          maxLife: 60 + Math.random() * 40, // Brief appearance
          type: 'clock'
        };

      case 'sparkle':
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: 6 + Math.random() * 6, // Fixed size sparkles (6-12px)
          opacity: particles.intensity * (0.8 + Math.random() * 0.2),
          color: particles.color,
          life: 0,
          maxLife: 30 + Math.random() * 20, // Very brief flash
          type: 'sparkle'
        };

      case 'lightning':
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: 20 + Math.random() * 40, // Various sizes (20-60px)
          opacity: particles.intensity * (0.9 + Math.random() * 0.1),
          color: particles.color,
          life: 0,
          maxLife: 10 + Math.random() * 15, // Very brief flash
          type: 'lightning'
        };

      default:
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * baseSpeed,
          vy: (Math.random() - 0.5) * baseSpeed,
          size: baseSize,
          opacity: particles.intensity * (0.3 + Math.random() * 0.7),
          color: particles.color,
          life: 0,
          maxLife: 200 + Math.random() * 100,
          type: particles.type
        };
    }
  };

  // Update particles
  const updateParticles = useCallback((deltaTime: number, theme: CharacterTheme) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life += 1; // Count frames, not time
      
      if (particle.life >= particle.maxLife) {
        return false;
      }

      // Update position based on type
      switch (particle.type) {
        case 'flow':
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Only fade in the last 2 seconds of lifespan
          if (particle.life < particle.fadeStartTime) {
            particle.opacity = theme.particles.intensity; // Full opacity until fade time
          } else {
            const fadeProgress = (particle.life - particle.fadeStartTime) / (particle.maxLife - particle.fadeStartTime);
            particle.opacity = theme.particles.intensity * (1 - fadeProgress);
          }
          break;

        case 'radio':
          // Sonar-like expansion - particles stay in place but expand outward
          // No position changes, just expansion and opacity fade
          particle.opacity = theme.particles.intensity * (1 - particle.life / particle.maxLife);
          break;

        case 'speed':
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = theme.particles.intensity * (1 - particle.life / particle.maxLife);
          break;

        case 'clock':
          // Clock particles stay in place and just fade
          particle.opacity = theme.particles.intensity * (1 - particle.life / particle.maxLife);
          break;

        case 'sparkle':
          // Sparkle particles stay in place and just fade (no drifting)
          particle.opacity = theme.particles.intensity * (1 - particle.life / particle.maxLife);
          break;

        case 'lightning':
          // Lightning particles stay in place and just fade
          particle.opacity = theme.particles.intensity * (1 - particle.life / particle.maxLife);
          break;

        default:
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = theme.particles.intensity * (1 - particle.life / particle.maxLife);
      }

      // Handle screen edges based on particle type
      if (particle.type === 'flow') {
        // For flow particles, only remove when they go off sides or reach their target
        if (particle.x < -50 || particle.x > canvas.width + 50) {
          return false; // Remove particle if it goes off sides
        }
        // Don't remove particles that go above container - let them fade naturally
        // Particles will be removed by lifespan, not by position
      } else if (particle.type === 'radio') {
        // For radio waves, remove when they reach maximum expansion or expand beyond screen bounds
        const expansionRadius = Math.min(particle.life * 1.6, 200); // Use same fixed max as rendering
        if (expansionRadius >= 200 || expansionRadius > Math.max(canvas.width, canvas.height) * 0.8) {
          return false; // Remove particle when it reaches max size or expands too far
        }
        // Radio waves don't move, so no position wrapping needed
      } else {
        // For other particle types, wrap around screen edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
      }

      return true;
    });

    // Add new particles randomly with different spawn rates
    let spawnChance = 0.05; // Default 5% chance
    if (theme.particles.type === 'radio') {
      spawnChance = 0.024; // 2.4% chance for radio waves
    } else if (theme.particles.type === 'speed') {
      spawnChance = 0.08; // 8% chance for speed lines (more frequent)
    }
    
    const shouldAddParticle = Math.random() < spawnChance;
    if (shouldAddParticle && particlesRef.current.length < (theme.particles.count || 100)) {
      // For Caesar, create mixed particle types (flow + lightning)
      if (theme.id === 'caesar-bloxwright') {
        const particleType = Math.random();
        if (particleType < 0.7) {
          // 70% flow particles
          particlesRef.current.push(createParticle({ ...theme, particles: { ...theme.particles, type: 'flow' } }));
        } else {
          // 30% lightning bolts
          particlesRef.current.push(createParticle({ ...theme, particles: { ...theme.particles, type: 'lightning' } }));
        }
      } else if (theme.id === 'vortex-a-steele') {
        const particleType = Math.random();
        if (particleType < 0.6) {
          // 60% speed lines
          particlesRef.current.push(createParticle({ ...theme, particles: { ...theme.particles, type: 'speed' } }));
        } else if (particleType < 0.8) {
          // 20% clocks
          particlesRef.current.push(createParticle({ ...theme, particles: { ...theme.particles, type: 'clock' } }));
        } else {
          // 20% sparkles (purple circles)
          particlesRef.current.push(createParticle({ ...theme, particles: { ...theme.particles, type: 'sparkle' } }));
        }
      } else {
        particlesRef.current.push(createParticle(theme));
      }
    }
  }, [createParticle]);

  // Render particles
  const renderParticles = useCallback((theme: CharacterTheme) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particlesRef.current.length === 0) {
      return;
    }

    particlesRef.current.forEach((particle, index) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;

      switch (particle.type) {
        case 'flow':
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
          break;

        case 'radio':
          // Draw sonar-like expanding circles with fixed maximum size
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Use fixed expansion radius for consistent sizing across resolutions
          const maxExpansionRadius = 200; // Fixed maximum radius
          const expansionRadius = Math.min(particle.life * 1.6, maxExpansionRadius);
          
          // Calculate distance to nearest screen edge for fade effect
          const distToLeft = particle.x;
          const distToRight = canvas.width - particle.x;
          const distToTop = particle.y;
          const distToBottom = canvas.height - particle.y;
          const minDistToEdge = Math.min(distToLeft, distToRight, distToTop, distToBottom);
          
          // Fade out as the wave approaches screen edges
          const edgeFadeDistance = 100; // Start fading 100px from edge
          const edgeFade = Math.min(1, minDistToEdge / edgeFadeDistance);
          
          // Calculate opacity based on both life and edge distance
          const lifeOpacity = particle.opacity;
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
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, expansionRadius - 30, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
          
          // No central pulse point - clean sonar effect
          break;

        case 'speed':
          // Draw speed lines (twice as long)
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.vx * 4, particle.y); // Twice as long
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
          break;

        case 'clock':
          // Draw spinning clock
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.life * 0.1); // Spin based on life
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Draw clock face
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 0.4, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw clock hands
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -particle.size * 0.3);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(particle.size * 0.2, 0);
          ctx.stroke();
          
          // Draw center dot
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
          break;

        case 'sparkle':
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
          break;

        case 'lightning':
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
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ffffff';
          ctx.shadowBlur = 3;
          ctx.globalAlpha = particle.opacity * 0.8;
          
          // Redraw the main branch with white core
          const mainLightningLength = particle.size * expansionFactor;
          const mainSegments = 8;
          const mainSegmentLength = mainLightningLength / mainSegments;
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          
          let mainX = particle.x;
          let mainY = particle.y;
          let mainDirection = Math.random() * Math.PI * 2;
          
          for (let i = 0; i < mainSegments; i++) {
            mainDirection += (Math.random() - 0.5) * 0.6;
            
            const nextX = mainX + Math.cos(mainDirection) * mainSegmentLength;
            const nextY = mainY + Math.sin(mainDirection) * mainSegmentLength;
            
            ctx.lineTo(nextX, nextY);
            
            mainX = nextX;
            mainY = nextY;
          }
          
          ctx.stroke();
          
          ctx.restore();
          break;

        default:
          // Default circle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.restore();
    });
  }, []);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    updateParticles(deltaTime, theme);
    renderParticles(theme);

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles, theme]);

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

      const resizeCanvas = () => {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start with empty particles array - they'll spawn naturally over time
    particlesRef.current = [];
    lastTimeRef.current = performance.now();

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, animate]);

  // Clear particles when theme changes to prevent burst
  useEffect(() => {
    particlesRef.current = [];
  }, [theme]);

  if (theme.particles.type === 'none' || prefersReducedMotion()) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        opacity: theme.particles.intensity,
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};
