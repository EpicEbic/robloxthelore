import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CharacterTheme } from '@/types/character-theme-types';
import { getComparisonParticleRates } from '@/utils/dual-theme-utils';

interface DualCharacterParticlesProps {
  leftTheme: CharacterTheme | null;
  rightTheme: CharacterTheme | null;
}

export function DualCharacterParticles({ leftTheme, rightTheme }: DualCharacterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const lastTimeRef = useRef<number>(0);
  const [opacity, setOpacity] = useState(0);
  const prevThemeIdsRef = useRef<string[]>([]);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const frameCountRef = useRef<number>(0);
  const lastFpsCheckRef = useRef<number>(0);

  // Create particle based on theme and side
  const createParticle = useCallback((theme: CharacterTheme, side: 'left' | 'right'): any => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return {
        x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0,
        color: '', life: 0, maxLife: 0, type: 'none', side
      };
    }

    const { particles } = theme;
    const baseSize = 5 + Math.random() * 3;
    const baseSpeed = particles.speed || 1;

    // Determine spawn area based on side - improved distribution
    const spawnX = side === 'left' 
      ? Math.random() * (canvas.width / 2) 
      : (canvas.width / 2) + Math.random() * (canvas.width / 2);
    
    // For better page coverage, allow some cross-over in the middle
    const crossOverChance = 0.2; // 20% chance to spawn in opposite side
    const finalSpawnX = Math.random() < crossOverChance 
      ? Math.random() * canvas.width 
      : spawnX;

    switch (particles.type) {
      case 'flow':
        return {
          x: finalSpawnX,
          y: canvas.height + Math.random() * 50,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -baseSpeed * (3.0 + Math.random() * 2.0), // Much faster upward movement
          size: baseSize,
          opacity: particles.intensity,
          color: particles.color,
          life: 0,
          maxLife: 3600 + Math.random() * 2400, // Much longer lifetime (60-100 seconds)
          type: 'flow',
          side,
          fadeStartTime: 3000 // Start fading much later
        };

      case 'radio':
        return {
          x: finalSpawnX,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: baseSize,
          opacity: particles.intensity * (0.5 + Math.random() * 0.5),
          color: particles.color,
          life: 0,
          maxLife: 200 + Math.random() * 100,
          type: 'radio',
          side
        };

      case 'speed':
        return {
          x: side === 'left' ? -50 - Math.random() * 100 : canvas.width + 50 + Math.random() * 100,
          y: Math.random() * canvas.height,
          vx: side === 'left' ? baseSpeed * (2 + Math.random() * 3) : -baseSpeed * (2 + Math.random() * 3),
          vy: (Math.random() - 0.5) * 0.5,
          size: 3 + Math.random() * 2,
          opacity: particles.intensity * (0.2 + Math.random() * 0.8),
          color: particles.color,
          life: 0,
          maxLife: 120 + Math.random() * 80,
          type: 'speed',
          side
        };

      case 'lightning':
        return {
          x: finalSpawnX,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: 20 + Math.random() * 40,
          opacity: particles.intensity * (0.9 + Math.random() * 0.1),
          color: particles.color,
          life: 0,
          maxLife: 10 + Math.random() * 15,
          type: 'lightning',
          side
        };

      case 'clock':
        return {
          x: finalSpawnX,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: 80 + Math.random() * 40,
          opacity: particles.intensity * (0.6 + Math.random() * 0.4),
          color: particles.color,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          type: 'clock',
          side
        };

      case 'sparkle':
        return {
          x: finalSpawnX,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: 6 + Math.random() * 6,
          opacity: particles.intensity * (0.8 + Math.random() * 0.2),
          color: particles.color,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          type: 'sparkle',
          side
        };

      default:
        return {
          x: finalSpawnX,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * baseSpeed,
          vy: (Math.random() - 0.5) * baseSpeed,
          size: baseSize,
          opacity: particles.intensity,
          color: particles.color,
          life: 0,
          maxLife: 100 + Math.random() * 100,
          type: 'none',
          side
        };
    }
  }, []);

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

  // Update particles
  const updateParticles = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip updates on low performance mode
    if (performanceMode === 'low' && Math.random() > 0.5) return;

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life += 1;
      
      if (particle.life >= particle.maxLife) {
        return false;
      }

      switch (particle.type) {
        case 'flow':
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Fade out in the last 2 seconds
          if (particle.life > particle.fadeStartTime) {
            const fadeProgress = (particle.life - particle.fadeStartTime) / (particle.maxLife - particle.fadeStartTime);
            particle.opacity = (1 - fadeProgress) * 0.7;
          }
          break;

        case 'radio':
          particle.opacity = 0.7 * (1 - particle.life / particle.maxLife);
          break;

        case 'speed':
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = 0.8 * (1 - particle.life / particle.maxLife);
          break;

        case 'lightning':
          particle.opacity = 0.9 * (1 - particle.life / particle.maxLife);
          break;

        case 'clock':
          particle.opacity = 0.6 * (1 - particle.life / particle.maxLife);
          break;

        case 'sparkle':
          particle.opacity = 0.8 * (1 - particle.life / particle.maxLife);
          break;

        default:
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = 0.7 * (1 - particle.life / particle.maxLife);
      }

      // Remove particles that are off-screen
      if (particle.type === 'flow') {
        if (particle.x < -50 || particle.x > canvas.width + 50 || particle.y < -100) {
          return false;
        }
      } else if (particle.type === 'speed') {
        if (particle.x < -100 || particle.x > canvas.width + 100) {
          return false;
        }
      } else if (particle.type === 'radio') {
        const expansionRadius = Math.min(particle.life * 1.6, 200);
        if (expansionRadius >= 200 || expansionRadius > Math.max(canvas.width, canvas.height) * 0.8) {
          return false;
        }
      }

      return true;
    });

    // Add new particles with enhanced rates for comparison page
    if (leftTheme) {
      const particleConfig = getComparisonParticleRates(leftTheme);
      // Adjust spawn rates based on performance mode
      const adjustedSpawnChance = performanceMode === 'high' ? particleConfig.spawnChance : 
                                 performanceMode === 'medium' ? particleConfig.spawnChance * 0.6 : 
                                 particleConfig.spawnChance * 0.3;
      const adjustedMaxParticles = performanceMode === 'high' ? particleConfig.maxParticles : 
                                  performanceMode === 'medium' ? Math.floor(particleConfig.maxParticles * 0.7) : 
                                  Math.floor(particleConfig.maxParticles * 0.4);
      
      if (Math.random() < adjustedSpawnChance && particlesRef.current.length < adjustedMaxParticles) {
        // For Caesar, create mixed particle types (flow + lightning)
        if (leftTheme.id === 'caesar-bloxwright') {
          const particleType = Math.random();
          if (particleType < 0.7) {
            // 70% flow particles
            particlesRef.current.push(createParticle({ ...leftTheme, particles: { ...leftTheme.particles, type: 'flow' } }, 'left'));
          } else {
            // 30% lightning bolts
            particlesRef.current.push(createParticle({ ...leftTheme, particles: { ...leftTheme.particles, type: 'lightning' } }, 'left'));
          }
        } else if (leftTheme.id === 'vortex-a-steele') {
          const particleType = Math.random();
          if (particleType < 0.6) {
            // 60% speed lines
            particlesRef.current.push(createParticle({ ...leftTheme, particles: { ...leftTheme.particles, type: 'speed' } }, 'left'));
          } else if (particleType < 0.8) {
            // 20% clocks
            particlesRef.current.push(createParticle({ ...leftTheme, particles: { ...leftTheme.particles, type: 'clock' } }, 'left'));
          } else {
            // 20% sparkles
            particlesRef.current.push(createParticle({ ...leftTheme, particles: { ...leftTheme.particles, type: 'sparkle' } }, 'left'));
          }
        } else {
          particlesRef.current.push(createParticle(leftTheme, 'left'));
        }
      }
    }

    if (rightTheme) {
      const particleConfig = getComparisonParticleRates(rightTheme);
      // Adjust spawn rates based on performance mode
      const adjustedSpawnChance = performanceMode === 'high' ? particleConfig.spawnChance : 
                                 performanceMode === 'medium' ? particleConfig.spawnChance * 0.6 : 
                                 particleConfig.spawnChance * 0.3;
      const adjustedMaxParticles = performanceMode === 'high' ? particleConfig.maxParticles : 
                                  performanceMode === 'medium' ? Math.floor(particleConfig.maxParticles * 0.7) : 
                                  Math.floor(particleConfig.maxParticles * 0.4);
      
      if (Math.random() < adjustedSpawnChance && particlesRef.current.length < adjustedMaxParticles) {
        // For Caesar, create mixed particle types (flow + lightning)
        if (rightTheme.id === 'caesar-bloxwright') {
          const particleType = Math.random();
          if (particleType < 0.7) {
            // 70% flow particles
            particlesRef.current.push(createParticle({ ...rightTheme, particles: { ...rightTheme.particles, type: 'flow' } }, 'right'));
          } else {
            // 30% lightning bolts
            particlesRef.current.push(createParticle({ ...rightTheme, particles: { ...rightTheme.particles, type: 'lightning' } }, 'right'));
          }
        } else if (rightTheme.id === 'vortex-a-steele') {
          const particleType = Math.random();
          if (particleType < 0.6) {
            // 60% speed lines
            particlesRef.current.push(createParticle({ ...rightTheme, particles: { ...rightTheme.particles, type: 'speed' } }, 'right'));
          } else if (particleType < 0.8) {
            // 20% clocks
            particlesRef.current.push(createParticle({ ...rightTheme, particles: { ...rightTheme.particles, type: 'clock' } }, 'right'));
          } else {
            // 20% sparkles
            particlesRef.current.push(createParticle({ ...rightTheme, particles: { ...rightTheme.particles, type: 'sparkle' } }, 'right'));
          }
        } else {
          particlesRef.current.push(createParticle(rightTheme, 'right'));
        }
      }
    }
  }, [leftTheme, rightTheme, createParticle]);

  // Render particles
  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Skip rendering on low performance mode occasionally
    if (performanceMode === 'low' && Math.random() > 0.7) return;

    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      switch (particle.type) {
        case 'flow':
          ctx.fillStyle = particle.color;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'radio':
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          const expansionRadius = Math.min(particle.life * 1.6, 200);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, expansionRadius, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case 'speed':
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.vx * 4, particle.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
          break;

        case 'lightning':
          const lifeProgress = particle.life / particle.maxLife;
          const expansionFactor = 1 + (lifeProgress * 3);
          const branchIntensity = lifeProgress;
          
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2 + (lifeProgress * 2);
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 8 + (lifeProgress * 4);
          
          const numBranches = 1 + Math.floor(branchIntensity * 5);
          for (let branch = 0; branch < numBranches; branch++) {
            const lightningLength = particle.size * expansionFactor;
            const segments = 6 + Math.floor(Math.random() * 6);
            const segmentLength = lightningLength / segments;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            
            let currentX = particle.x;
            let currentY = particle.y;
            let direction = (branch / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            
            for (let i = 0; i < segments; i++) {
              direction += (Math.random() - 0.5) * (0.5 + lifeProgress * 1.5);
              const nextX = currentX + Math.cos(direction) * segmentLength;
              const nextY = currentY + Math.sin(direction) * segmentLength;
              ctx.lineTo(nextX, nextY);
              currentX = nextX;
              currentY = nextY;
            }
            ctx.stroke();
          }
          break;

        case 'clock':
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.life * 0.1);
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color;
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 0.4, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -particle.size * 0.3);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(particle.size * 0.2, 0);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;

        case 'sparkle':
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.life * 0.2);
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color;
          ctx.lineWidth = 2;
          
          const sparkleSize = particle.size;
          ctx.beginPath();
          ctx.moveTo(-sparkleSize, 0);
          ctx.lineTo(sparkleSize, 0);
          ctx.moveTo(0, -sparkleSize);
          ctx.lineTo(0, sparkleSize);
          ctx.moveTo(-sparkleSize * 0.7, -sparkleSize * 0.7);
          ctx.lineTo(sparkleSize * 0.7, sparkleSize * 0.7);
          ctx.moveTo(-sparkleSize * 0.7, sparkleSize * 0.7);
          ctx.lineTo(sparkleSize * 0.7, -sparkleSize * 0.7);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
      }

      ctx.restore();
    });
  }, []);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    checkPerformance(currentTime);
    updateParticles(deltaTime);
    renderParticles();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles, checkPerformance]);

  // Fade transition logic
  useEffect(() => {
    const currentIds = [leftTheme?.id || '', rightTheme?.id || ''].filter(Boolean);
    const prevIds = prevThemeIdsRef.current;
    
    // Clear existing timeout
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    
    // Initial mount
    if (prevIds.length === 0 && currentIds.length > 0) {
      fadeTimeoutRef.current = setTimeout(() => setOpacity(1), 1000);
    }
    // Theme swap
    else if (prevIds.length > 0 && currentIds.length > 0 && prevIds.join() !== currentIds.join()) {
      setOpacity(0);
      fadeTimeoutRef.current = setTimeout(() => {
        particlesRef.current = [];
        setTimeout(() => setOpacity(1), 400);
      }, 600);
    }
    // Unmount
    else if (currentIds.length === 0) {
      setOpacity(0);
    }
    
    prevThemeIdsRef.current = currentIds;
    
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [leftTheme?.id, rightTheme?.id]);

  // Canvas setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  // Clear particles when themes change
  useEffect(() => {
    particlesRef.current = [];
  }, [leftTheme, rightTheme]);

  // Fallback for very low performance
  if (performanceMode === 'low' && particlesRef.current.length === 0) {
    return (
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity, transition: 'opacity 0.8s ease-in-out' }}
      >
        {/* Simple CSS-based particles for low-end devices */}
        <div className="absolute inset-0 overflow-hidden">
          {leftTheme && (
            <div 
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: leftTheme.particles.color,
                left: '20%',
                top: '30%',
                animationDelay: '0s',
                animationDuration: '2s'
              }}
            />
          )}
          {rightTheme && (
            <div 
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: rightTheme.particles.color,
                right: '20%',
                top: '70%',
                animationDelay: '1s',
                animationDuration: '2s'
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity, transition: 'opacity 0.8s ease-in-out', background: 'transparent' }}
    />
  );
}
