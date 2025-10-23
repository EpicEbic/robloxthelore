import React, { useRef, useEffect, useCallback, useState } from 'react';
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
  const [opacity, setOpacity] = useState(0);
  const prevThemeIdRef = useRef<string>('');
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const frameCountRef = useRef<number>(0);
  const lastFpsCheckRef = useRef<number>(0);
  const [canvasSupported, setCanvasSupported] = useState<boolean>(true);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [forceFallback, setForceFallback] = useState<boolean>(false);

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

  // Performance monitoring
  const checkPerformance = useCallback((currentTime: number) => {
    frameCountRef.current++;
    
    if (currentTime - lastFpsCheckRef.current >= 1000) { // Check every second
      const fps = frameCountRef.current;
      frameCountRef.current = 0;
      lastFpsCheckRef.current = currentTime;
      
      if (fps < 30 && performanceMode === 'high') {
        setPerformanceMode('medium');
      } else if (fps < 20 && performanceMode === 'medium') {
        setPerformanceMode('low');
      } else if (fps > 50 && performanceMode === 'low') {
        setPerformanceMode('medium');
      } else if (fps > 55 && performanceMode === 'medium') {
        setPerformanceMode('high');
      }
    }
  }, [performanceMode]);

  // Create individual particle
  const createParticle = useCallback((theme: CharacterTheme): Particle => {
    console.log('[createParticle] Called for theme:', theme.id, 'type:', theme.particles?.type);
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('[createParticle] Canvas is null!');
      return {
        x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0,
        color: '', life: 0, maxLife: 0, type: 'none'
      };
    }

    const { particles } = theme;
    console.log('[createParticle] Canvas size:', canvas.width, 'x', canvas.height, 'Particle config:', particles);
    const baseSize = 5 + Math.random() * 3; // Fixed base size (5-8px)
    const baseSpeed = particles.speed || 1;

    switch (particles.type) {
      case 'grain': {
        // Falling rice grain: small capsule with slight rotation and sway
        const width = 2 + Math.random() * 1.5; // 2-3.5px
        const height = 5 + Math.random() * 3; // 5-8px
        const angle = (Math.random() - 0.5) * 0.6; // ~-17 to 17 degrees
        const swayPhase = 0;
        return {
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * canvas.height * 0.3, // some start above view for stagger
          vx: 0, // fall straight down
          vy: baseSpeed * (0.6 + Math.random() * 0.6), // 0.6x..1.2x
          size: Math.max(width, height),
          opacity: particles.intensity * (0.5 + Math.random() * 0.5),
          color: particles.color,
          life: 0,
          maxLife: 600 + Math.random() * 600, // 10-20s
          type: 'grain',
          angle,
          width,
          height,
          swayPhase
        };
      }
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
        // Add subtle drift so waves continue moving as they fade
        const margin = 50; // Keep some margin from screen edges
        const centerX = margin + Math.random() * (canvas.width - 2 * margin);
        const centerY = margin + Math.random() * (canvas.height - 2 * margin);
        return {
          x: centerX,
          y: centerY,
          vx: (Math.random() - 0.5) * 0.3, // gentle drift
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 3,
          opacity: particles.intensity * (0.5 + Math.random() * 0.5),
          color: particles.color,
          life: 0,
          maxLife: 220 + Math.random() * 120,
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
  }, []);

  // Update particles
  const updateParticles = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('[updateParticles] Canvas is null!');
      return;
    }

    // Skip updates on low performance mode (but still allow some updates)
    if (performanceMode === 'low' && Math.random() > 0.3) {
      console.log('[updateParticles] Skipped due to low performance mode');
      return;
    }

    console.log('[updateParticles] Running. Current particle count:', particlesRef.current.length, 'Theme:', theme?.id);

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life += 1; // Count frames, not time
      
      if (particle.life >= particle.maxLife) {
        return false;
      }

      // Update position based on type
      switch (particle.type) {
        case 'grain': {
          // Straight downward fall
          particle.x += (particle.vx || 0);
          particle.y += Math.max(0.4, particle.vy);
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
          break;
        }
        case 'flow':
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Only fade in the last 2 seconds of lifespan
          if (particle.life < particle.fadeStartTime) {
            particle.opacity = 0.7; // Full opacity until fade time
          } else {
            const fadeProgress = (particle.life - particle.fadeStartTime) / (particle.maxLife - particle.fadeStartTime);
            particle.opacity = (1 - fadeProgress) * 0.7;
          }
          break;

        case 'radio':
          // Sonar-like expansion - particles stay in place but expand outward
          // No position changes, just expansion and opacity fade
          particle.opacity = 0.7 * (1 - particle.life / particle.maxLife);
          break;

        case 'speed':
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = 0.8 * (1 - particle.life / particle.maxLife);
          break;

        case 'clock':
          // Clock particles stay in place and just fade
          particle.opacity = 0.6 * (1 - particle.life / particle.maxLife);
          break;

        case 'sparkle':
          // Sparkle particles stay in place and just fade (no drifting)
          particle.opacity = 0.8 * (1 - particle.life / particle.maxLife);
          break;

        case 'lightning':
          // Lightning particles stay in place and just fade
          particle.opacity = 0.9 * (1 - particle.life / particle.maxLife);
          break;

        default:
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = 0.7 * (1 - particle.life / particle.maxLife);
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
        // Radio waves: allow full life-based fade-out and keep drifting
        particle.x += particle.vx;
        particle.y += particle.vy;
        // No wrapping; let them drift off slightly if needed
      } else if (particle.type === 'grain') {
        // Wrap to top when falling past bottom, randomize x and properties a bit
        if (particle.y > canvas.height + 30) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
          particle.life = 0;
          particle.vx = 0;
          particle.vy = 0.6 + Math.random() * 0.6;
          particle.opacity = 0.6 + Math.random() * 0.4;
          particle.angle = (Math.random() - 0.5) * 0.6;
          particle.width = 2 + Math.random() * 1.5;
          particle.height = 5 + Math.random() * 3;
        }
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
    console.log('[updateParticles] Checking spawn conditions. Theme type:', theme.particles?.type);
    
    let spawnChance = 0.05; // Default 5% chance
    if (theme.particles.type === 'radio') {
      spawnChance = 0.024; // 2.4% chance for radio waves
    } else if (theme.particles.type === 'speed') {
      spawnChance = 0.08; // 8% chance for speed lines (more frequent)
    } else if (theme.particles.type === 'grain') {
      spawnChance = 0.12; // slightly higher to reach desired count smoothly
    }
    
    console.log('[updateParticles] Base spawn chance:', spawnChance, 'for type:', theme.particles.type);
    
    // Adjust spawn rates based on performance mode
    const adjustedSpawnChance = performanceMode === 'high' ? spawnChance : 
                               performanceMode === 'medium' ? spawnChance * 0.6 : 
                               spawnChance * 0.3;
    const maxParticles = theme.particles.count || 100;
    const adjustedMaxParticles = performanceMode === 'high' ? maxParticles : 
                                performanceMode === 'medium' ? Math.floor(maxParticles * 0.7) : 
                                Math.floor(maxParticles * 0.4);
    
    console.log('[updateParticles] Performance mode:', performanceMode);
    console.log('[updateParticles] Adjusted spawn chance:', adjustedSpawnChance, 'Max particles:', adjustedMaxParticles);
    
    const randomValue = Math.random();
    const shouldAddParticle = randomValue < adjustedSpawnChance;
    const hasRoom = particlesRef.current.length < adjustedMaxParticles;
    
    console.log('[updateParticles] Random value:', randomValue, 'Should spawn:', shouldAddParticle, 'Has room:', hasRoom, '(current:', particlesRef.current.length, '/', adjustedMaxParticles + ')');
    
    if (shouldAddParticle && hasRoom) {
      console.log('[CharacterParticles] ✓ SPAWNING PARTICLE! Current count:', particlesRef.current.length, 'Max:', adjustedMaxParticles);
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
  }, [theme, createParticle, performanceMode]);

  // Render particles
  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      console.error('[renderParticles] Canvas or context is null!');
      setCanvasSupported(false);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Skip rendering on low performance mode occasionally
    if (performanceMode === 'low' && Math.random() > 0.7) {
      console.log('[renderParticles] Skipped due to low performance');
      return;
    }

    if (particlesRef.current.length > 0) {
      console.log('[renderParticles] Rendering', particlesRef.current.length, 'particles');
    }

    particlesRef.current.forEach((particle, index) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;

      switch (particle.type) {
        case 'grain': {
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
          ctx.lineTo(-rw / 2, -rh / 2 + r);
          ctx.quadraticCurveTo(-rw / 2, -rh / 2, -rw / 2 + r, -rh / 2);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          break;
        }
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
          // Draw sonar-like expanding circles with radius tied to life progress (keeps expanding while fading)
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Expansion grows proportionally to lifespan to avoid stopping before fade completes
          const lifeProgressRadio = particle.life / particle.maxLife; // 0..1
          const expansionRadius = 40 + lifeProgressRadio * 260; // grows from 40px up to ~300px
          
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
  }, [performanceMode]);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) {
      console.error('[animate] Canvas ref is null!');
      return;
    }

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Log every 60 frames (~1 second) to avoid spam
    if (Math.floor(currentTime / 1000) !== Math.floor((currentTime - deltaTime) / 1000)) {
      console.log('[animate] Running. Particle count:', particlesRef.current.length, 'FPS check time:', currentTime);
    }

    checkPerformance(currentTime);
    updateParticles(deltaTime);
    renderParticles();

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles, checkPerformance]);

  // Fade transition logic
  useEffect(() => {
    console.log('═══ [FADE useEffect] START ═══');
    const currentId = theme.id || '';
    const prevId = prevThemeIdRef.current;
    console.log('[FADE] Current ID:', currentId, 'Previous ID:', prevId);
    
    // Clear existing timeout
    if (fadeTimeoutRef.current) {
      console.log('[FADE] Clearing existing fade timeout');
      clearTimeout(fadeTimeoutRef.current);
    }
    
    // Initial mount
    if (!prevId && currentId) {
      console.log('[FADE] ✓ Initial mount detected for:', currentId);
      console.log('[FADE] Will fade in after 1 second...');
      fadeTimeoutRef.current = setTimeout(() => {
        console.log('[FADE] ✓✓✓ Fading in particles! ✓✓✓');
        console.log('[FADE] Canvas supported:', canvasSupported);
        console.log('[FADE] Setting opacity to 1');
        setOpacity(1);
        // Force fallback if no particles appear after 3 seconds
        setTimeout(() => {
          const count = particlesRef.current.length;
          console.log('[FADE] 3s fallback check - particle count:', count);
          if (count === 0 && !forceFallback) {
            console.warn('[FADE] ⚠️ No particles spawned after 3s, forcing CSS fallback');
            setDebugInfo('No particles spawned, forcing fallback');
            setForceFallback(true);
          } else {
            console.log('[FADE] ✓ Particles spawned successfully:', count);
          }
        }, 3000);
      }, 1000);
    }
    // Theme swap
    else if (prevId && currentId && prevId !== currentId) {
      setOpacity(0);
      fadeTimeoutRef.current = setTimeout(() => {
        particlesRef.current = [];
        setTimeout(() => setOpacity(1), 400);
      }, 600);
    }
    // Unmount
    else if (!currentId) {
      setOpacity(0);
    }
    
    prevThemeIdRef.current = currentId;
    
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [theme.id, forceFallback]);

  // Initialize canvas and particles
  useEffect(() => {
    console.log('═══ [INIT useEffect] START ═══');
    console.log('[INIT] Theme ID:', theme?.id);
    console.log('[INIT] Canvas ref current:', canvasRef.current);
    
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('[INIT] ⚠️ Canvas ref not ready yet, will retry on next render...');
      return; // Don't set forceFallback - just wait for next render
    }

    console.log('[INIT] ✓ Canvas ref found!');

    // Test canvas support
    try {
      const ctx = canvas.getContext('2d');
      console.log('[INIT] Canvas 2D context:', ctx ? '✓ Found' : '✗ Not found');
      
      if (!ctx) {
        console.error('[INIT] ✗ Canvas 2D context not supported');
        setDebugInfo('Canvas 2D context not supported');
        setCanvasSupported(false);
        setForceFallback(true);
        return;
      }
      
      // Test basic canvas operations
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 1, 1);
      ctx.clearRect(0, 0, 1, 1);
      
      console.log('[INIT] ✓ Canvas operations test passed');
      console.log('[INIT] ✓✓✓ Canvas initialized successfully! ✓✓✓');
      setDebugInfo('Canvas working');
    } catch (error) {
      console.error('[INIT] ✗✗✗ Canvas error:', error);
      setDebugInfo(`Canvas error: ${error}`);
      setCanvasSupported(false);
      setForceFallback(true);
      return;
    }

    const setCanvasSize = () => {
      // Use viewport size for fixed positioning
      const width = window.innerWidth;
      const height = window.innerHeight;
      console.log('[INIT] Setting canvas size:', width, 'x', height);
      canvas.width = width;
      canvas.height = height;
      
      // Test if canvas is actually visible after resize
      const rect = canvas.getBoundingClientRect();
      console.log('[INIT] Canvas bounding rect:', rect.width, 'x', rect.height);
      
      if (rect.width === 0 || rect.height === 0) {
        console.error('[INIT] ✗ Canvas has zero dimensions!', rect.width, 'x', rect.height);
        setDebugInfo(`Canvas has zero dimensions: ${rect.width}x${rect.height}`);
        setForceFallback(true);
      } else {
        console.log('[INIT] ✓ Canvas has valid dimensions');
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize particle array and time
    console.log('[INIT] Current particle count:', particlesRef.current.length);
    if (particlesRef.current.length === 0) {
      lastTimeRef.current = performance.now();
      console.log('[INIT] ✓ Initialized lastTimeRef:', lastTimeRef.current);
    }

    console.log('═══ [INIT useEffect] COMPLETE ═══');

    return () => {
      console.log('[INIT] Cleanup: removing resize listener');
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [theme]);

  // Manage animation lifecycle separately
  useEffect(() => {
    console.log('═══ [ANIMATION useEffect] START ═══');
    console.log('[ANIMATION] Canvas ref:', canvasRef.current);
    console.log('[ANIMATION] Canvas supported:', canvasSupported);
    console.log('[ANIMATION] Theme ID:', theme.id);
    console.log('[ANIMATION] Animate function:', typeof animate);
    
    if (!canvasRef.current) {
      console.error('[ANIMATION] ✗ No canvas ref, cannot start animation');
      return;
    }
    
    if (!canvasSupported) {
      console.error('[ANIMATION] ✗ Canvas not supported, cannot start animation');
      return;
    }
    
    console.log('[ANIMATION] ✓✓✓ Starting animation loop! ✓✓✓');
    const frameId = requestAnimationFrame(animate);
    animationRef.current = frameId;
    console.log('[ANIMATION] Animation frame ID:', frameId);
    
    // Force fallback if no particles appear after 3 seconds
    const fallbackTimeout = setTimeout(() => {
      const count = particlesRef.current.length;
      console.log('[ANIMATION] 3s check - particle count:', count);
      if (count === 0 && !forceFallback) {
        console.warn('[ANIMATION] ⚠️ No particles spawned in 3s, forcing fallback');
        setDebugInfo('No particles spawned, forcing fallback');
        setForceFallback(true);
      } else {
        console.log('[ANIMATION] ✓ Particles are spawning normally');
      }
    }, 3000);

    console.log('═══ [ANIMATION useEffect] COMPLETE ═══');

    return () => {
      console.log('[ANIMATION] Cleanup: stopping animation');
      if (animationRef.current) {
        console.log('[ANIMATION] Cancelling animation frame:', animationRef.current);
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      clearTimeout(fallbackTimeout);
    };
  }, [animate, canvasSupported, theme.id, forceFallback]);

  // Clear particles when theme changes to prevent burst
  useEffect(() => {
    particlesRef.current = [];
  }, [theme]);

  if (theme.particles.type === 'none' || prefersReducedMotion()) {
    return null;
  }

  // Fallback for canvas-unsupported browsers, very low performance, or forced fallback
  if (!canvasSupported || forceFallback || (performanceMode === 'low' && particlesRef.current.length === 0)) {
    console.log('[CharacterParticles] Using CSS fallback. Reason:', { canvasSupported, forceFallback, performanceMode, particleCount: particlesRef.current.length });
    return (
      <div 
        className={className}
        style={{ opacity, transition: 'opacity 0.8s ease-in-out' }}
      >
        {/* Enhanced CSS-based particles for low-end devices */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.particles.color,
              left: '20%',
              top: '30%',
              animationDelay: '0s',
              animationDuration: '2s',
              boxShadow: `0 0 15px ${theme.particles.color}, 0 0 30px ${theme.particles.color}`
            }}
          />
          <div 
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.particles.color,
              left: '60%',
              top: '60%',
              animationDelay: '1s',
              animationDuration: '3s',
              boxShadow: `0 0 10px ${theme.particles.color}`
            }}
          />
          <div 
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.particles.color,
              left: '40%',
              top: '80%',
              animationDelay: '2s',
              animationDuration: '4s',
              boxShadow: `0 0 8px ${theme.particles.color}`
            }}
          />
          <div 
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.particles.color,
              right: '30%',
              top: '20%',
              animationDelay: '1.5s',
              animationDuration: '2.5s',
              boxShadow: `0 0 12px ${theme.particles.color}`
            }}
          />
        </div>
        
        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <div 
            className="absolute top-2 left-2 text-xs text-white bg-black bg-opacity-50 p-1 rounded"
            style={{ zIndex: 1000 }}
          >
            {debugInfo}
          </div>
        )}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        opacity, 
        transition: 'opacity 0.8s ease-in-out', 
        background: 'transparent'
      }}
    />
  );
};
