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
  const [canvasSupported, setCanvasSupported] = useState<boolean>(true);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [forceFallback, setForceFallback] = useState<boolean>(false);

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
      case 'grain': {
        const width = 2 + Math.random() * 1.5;
        const height = 5 + Math.random() * 3;
        const angle = (Math.random() - 0.5) * 0.6;
        const swayPhase = 0;
        return {
          x: finalSpawnX,
          y: -20 - Math.random() * (canvas.height * 0.3),
          vx: 0,
          vy: baseSpeed * (0.6 + Math.random() * 0.6),
          size: Math.max(width, height),
          opacity: particles.intensity * (0.5 + Math.random() * 0.5),
          color: particles.color,
          life: 0,
          maxLife: 600 + Math.random() * 600,
          type: 'grain',
          side,
          angle,
          width,
          height,
          swayPhase
        };
      }
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
        // Create radio waves that emanate from random points across the screen
        // Add subtle drift so waves continue moving as they fade
        const margin = 50; // Keep some margin from screen edges
        const centerX = margin + Math.random() * (canvas.width - 2 * margin);
        const centerY = margin + Math.random() * (canvas.height - 2 * margin);
        return {
          x: centerX,
          y: centerY,
          vx: (Math.random() - 0.5) * 0.3, // gentle drift
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 3, // Match single-character system: 2-5px
          opacity: particles.intensity * (0.5 + Math.random() * 0.5),
          color: particles.color,
          life: 0,
          maxLife: 220 + Math.random() * 120, // Match single-character system: 220-340
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

    // Skip updates on low performance mode (but still allow some updates)
    if (performanceMode === 'low' && Math.random() > 0.3) return;

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life += 1;
      
      if (particle.life >= particle.maxLife) {
        return false;
      }

      switch (particle.type) {
        case 'grain': {
          // Straight downward fall
          particle.x += (particle.vx || 0);
          particle.y += Math.max(0.4, particle.vy || 0.6);
          if (particle.angle !== undefined) {
            particle.angle += (Math.random() - 0.5) * 0.01;
          }
          // Fade only in the last 20% of lifespan
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
          
          // Fade out in the last 2 seconds
          if (particle.life > particle.fadeStartTime) {
            const fadeProgress = (particle.life - particle.fadeStartTime) / (particle.maxLife - particle.fadeStartTime);
            particle.opacity = (1 - fadeProgress) * 0.7;
          }
          break;

        case 'radio':
          // Sonar-like expansion - particles stay in place but expand outward
          // No position changes, just expansion and opacity fade (match single-character system)
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
      } else if (particle.type === 'grain') {
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
    if (!ctx) {
      setCanvasSupported(false);
      return;
    }

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
          // Draw sonar-like expanding circles with radius tied to life progress (keeps expanding while fading)
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Expansion grows proportionally to lifespan to avoid stopping before fade completes
          const lifeProgressRadio = particle.life / particle.maxLife; // 0..1
          const expansionRadiusRadio = 40 + lifeProgressRadio * 260; // grows from 40px up to ~300px
          
          // Calculate distance to nearest screen edge for fade effect
          const distToLeft = particle.x;
          const distToRight = canvas.width - particle.x;
          const distToTop = particle.y;
          const distToBottom = canvas.height - particle.y;
          const minDistToEdge = Math.min(distToLeft, distToRight, distToTop, distToBottom);
          
          // Fade out as the wave approaches screen edges (match single-character system)
          const edgeFadeDistance = 100; // Start fading 100px from edge
          const edgeFade = Math.min(1, minDistToEdge / edgeFadeDistance);
          
          // Calculate opacity based on both life and edge distance (match single-character system)
          const lifeOpacity = particle.opacity * (1 - lifeProgressRadio);
          const finalOpacityRadio = lifeOpacity * edgeFade;
          
          if (finalOpacityRadio > 0.01) {
            ctx.globalAlpha = finalOpacityRadio;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, expansionRadiusRadio, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
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
      fadeTimeoutRef.current = setTimeout(() => {
        setOpacity(1);
        // Force fallback if no particles appear after 3 seconds
        setTimeout(() => {
          if (particlesRef.current.length === 0 && !forceFallback) {
            setDebugInfo('No particles spawned, forcing fallback');
            setForceFallback(true);
          }
        }, 3000);
      }, 1000);
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
  }, [leftTheme?.id, rightTheme?.id, forceFallback]);

  // Canvas setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setDebugInfo('No canvas element found');
      setForceFallback(true);
      return;
    }

    // Test canvas support
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setDebugInfo('Canvas 2D context not supported');
        setCanvasSupported(false);
        setForceFallback(true);
        return;
      }
      
      // Test basic canvas operations
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 1, 1);
      ctx.clearRect(0, 0, 1, 1);
      
      // Test if canvas is actually visible
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setDebugInfo(`Canvas has zero dimensions: ${rect.width}x${rect.height}`);
        setForceFallback(true);
        return;
      }
      
      setDebugInfo(`Canvas working: ${rect.width}x${rect.height}`);
    } catch (error) {
      setDebugInfo(`Canvas error: ${error}`);
      setCanvasSupported(false);
      setForceFallback(true);
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

  // Always show fallback if no themes or if canvas issues
  if (!leftTheme && !rightTheme) {
    return null;
  }

  // Fallback for canvas-unsupported browsers, very low performance, or forced fallback
  if (!canvasSupported || forceFallback || (performanceMode === 'low' && particlesRef.current.length === 0)) {
    return (
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity, transition: 'opacity 0.8s ease-in-out' }}
      >
        {/* Enhanced CSS-based particles for low-end devices */}
        <div className="absolute inset-0 overflow-hidden">
          {leftTheme && (
            <>
              <div 
                className="absolute w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: leftTheme.particles.color,
                  left: '20%',
                  top: '30%',
                  animationDelay: '0s',
                  animationDuration: '2s',
                  boxShadow: `0 0 15px ${leftTheme.particles.color}, 0 0 30px ${leftTheme.particles.color}`
                }}
              />
              <div 
                className="absolute w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: leftTheme.particles.color,
                  left: '30%',
                  top: '60%',
                  animationDelay: '1s',
                  animationDuration: '3s',
                  boxShadow: `0 0 10px ${leftTheme.particles.color}`
                }}
              />
              <div 
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: leftTheme.particles.color,
                  left: '15%',
                  top: '80%',
                  animationDelay: '2s',
                  animationDuration: '4s',
                  boxShadow: `0 0 8px ${leftTheme.particles.color}`
                }}
              />
            </>
          )}
          {rightTheme && (
            <>
              <div 
                className="absolute w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: rightTheme.particles.color,
                  right: '20%',
                  top: '70%',
                  animationDelay: '1s',
                  animationDuration: '2s',
                  boxShadow: `0 0 15px ${rightTheme.particles.color}, 0 0 30px ${rightTheme.particles.color}`
                }}
              />
              <div 
                className="absolute w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: rightTheme.particles.color,
                  right: '30%',
                  top: '40%',
                  animationDelay: '2s',
                  animationDuration: '3s',
                  boxShadow: `0 0 10px ${rightTheme.particles.color}`
                }}
              />
              <div 
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: rightTheme.particles.color,
                  right: '15%',
                  top: '20%',
                  animationDelay: '3s',
                  animationDuration: '4s',
                  boxShadow: `0 0 8px ${rightTheme.particles.color}`
                }}
              />
            </>
          )}
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity, transition: 'opacity 0.8s ease-in-out', background: 'transparent' }}
    />
  );
}
