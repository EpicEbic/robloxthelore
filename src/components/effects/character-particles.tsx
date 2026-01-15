import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CharacterTheme, Particle, ParticleType } from '@/types/character-theme-types';
import { useParticleSettings } from '@/contexts/particle-settings-context';

interface CharacterParticlesProps {
  theme: CharacterTheme;
  className?: string;
}

export const CharacterParticles: React.FC<CharacterParticlesProps> = ({ 
  theme, 
  className = "fixed inset-0 pointer-events-none z-0" 
}) => {
  const { particlesEnabled } = useParticleSettings();
  
  // Early return if particles are disabled (unless it's a pattern-only theme like Builderman, Ren, or Bryck)
  if (!particlesEnabled && theme.particles.type !== 'none' && theme.id !== 'builderman' && theme.id !== 'ren-bytera' && theme.id !== 'bryck-manning') {
    return null;
  }
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const scrollOffsetRef = useRef<number>(0); // For bounce pattern scrolling
  const spiralScrollOffsetRef = useRef<number>(0); // Separate scroll offset for spirals (never resets)
  const rotationTimeRef = useRef<number>(0); // Continuous rotation time for spirals
  const renHexGridOffsetRef = useRef<number>(0); // Scroll offset for Ren's hexagon grid (never resets)
  const bryckBarOffsetRef = useRef<number>(0); // Scroll offset for Bryck's bars (never resets)
  const [opacity, setOpacity] = useState(0);
  const prevThemeIdRef = useRef<string>('');
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const frameCountRef = useRef<number>(0);
  const lastFpsCheckRef = useRef<number>(0);
  const [canvasSupported, setCanvasSupported] = useState<boolean>(true);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  const [forceFallback, setForceFallback] = useState<boolean>(false);

  // Actively check if canvas becomes ready (runs on every render)
  useEffect(() => {
    if (canvasRef.current && !canvasReady) {
      try {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          // Test basic canvas operations
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, 1, 1);
          ctx.clearRect(0, 0, 1, 1);
          
          setCanvasReady(true);
          setCanvasSupported(true);
        } else {
          setCanvasSupported(false);
          setForceFallback(true);
        }
      } catch (error) {
        setCanvasSupported(false);
        setForceFallback(true);
      }
    }
  }); // No dependencies - runs on every render!

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
      case 'grain': {
        // For Bryck: horizontal black bars that scroll down
        if (theme.id === 'bryck-manning') {
          const barWidth = canvas.width; // Full width of canvas
          const barHeight = 25; // Fixed height for all bars
          // Distribute bars evenly across the page height and above
          const spacing = (canvas.height * 2) / particles.count; // Space across 2x canvas height
          const currentIndex = particlesRef.current.filter(p => p.type === 'grain').length;
          const baseY = -canvas.height * 1.5; // Start well above view
          const offsetY = spacing * currentIndex; // Evenly spaced vertically
          
          return {
            x: 0, // Start at left edge
            y: baseY + offsetY, // Evenly spaced vertically
            vx: 0, // No horizontal movement
            vy: baseSpeed * 0.6, // Same speed for all bars
            size: Math.max(barWidth, barHeight),
            opacity: 0.3, // Semi-transparent (consistent opacity)
            color: particles.color,
            life: 0,
            maxLife: 1200, // Consistent lifespan
            type: 'grain',
            width: barWidth,
            height: barHeight,
            angle: 0, // No rotation for bars
            swayPhase: 0
          };
        }
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
        // For bloxy-cola and witches-brew: bubbles shoot straight up with minimal drift
        if (theme.id === 'bloxy-cola' || theme.id === 'witches-brew') {
          const travelTime = 2.5 + Math.random() * 3; // 2.5-5.5 seconds (varying speeds)
          const speedVariation = 0.8 + Math.random() * 0.4; // 0.8x to 1.2x speed multiplier
          const requiredVelocity = (canvas.height / (travelTime * 60)) * speedVariation; // Varied velocity
          
          return {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 30,
            vx: (Math.random() - 0.5) * 0.05, // Extremely minimal horizontal movement
            vy: -requiredVelocity, // Varying upward speed
            size: 5 + Math.random() * 3, // 5-8px bubbles (less size variation)
            opacity: particles.intensity,
            color: particles.color,
            life: 0,
            maxLife: travelTime * 60, // Varying lifespan (2.5-5.5 seconds)
            type: 'flow' as const,
            fadeStartTime: (travelTime - 0.3) * 60 // Start fading 0.3 seconds before death (right at top)
          };
        } else {
          // Original flow particle logic for other themes
          const targetTravelDistance = 400 + Math.random() * 600;
          const travelTime = 15 + Math.random() * 10;
          const requiredVelocity = targetTravelDistance / (travelTime * 60);
          
          const particle = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -requiredVelocity,
            size: baseSize,
            opacity: particles.intensity,
            color: particles.color,
            life: 0,
            maxLife: travelTime * 60,
            type: 'flow' as const,
            targetY: undefined,
            fadeStartTime: (travelTime - 2) * 60
          };
          
          return particle;
        }

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

      case 'cosmic-wave': {
        // Random colors: purple, pink, and blue shades
        const colors = [
          '#e879f9', '#f0abfc', '#c084fc', '#a855f7', '#d946ef',
          '#ec4899', '#8b5cf6', '#6366f1', '#3b82f6', '#60a5fa'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.0, // -0.5 to 0.5
          vy: (Math.random() - 0.5) * 0.6, // -0.3 to 0.3
          size: 100 + Math.random() * 100, // 100-200px (twice as large)
          opacity: particles.intensity * (0.2 + Math.random() * 0.2), // 0.2-0.4
          color: randomColor,
          life: 0,
          maxLife: 600 + Math.random() * 300, // 10-15 seconds
          type: 'cosmic-wave',
          swayPhase: Math.random() * Math.PI * 2
        };
      }

      case 'shooting-star': {
        // Shooting stars always spawn from edges and shoot across
        const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let startX, startY, vx, vy;
        
        switch (side) {
          case 0: // Top
            startX = Math.random() * canvas.width;
            startY = -20;
            vx = (Math.random() - 0.5) * 8;
            vy = 8 + Math.random() * 4;
            break;
          case 1: // Right
            startX = canvas.width + 20;
            startY = Math.random() * canvas.height;
            vx = -(8 + Math.random() * 4);
            vy = (Math.random() - 0.5) * 8;
            break;
          case 2: // Bottom
            startX = Math.random() * canvas.width;
            startY = canvas.height + 20;
            vx = (Math.random() - 0.5) * 8;
            vy = -(8 + Math.random() * 4);
            break;
          default: // Left
            startX = -20;
            startY = Math.random() * canvas.height;
            vx = 8 + Math.random() * 4;
            vy = (Math.random() - 0.5) * 8;
            break;
        }
        
        return {
          x: startX,
          y: startY,
          vx: vx,
          vy: vy,
          size: 3 + Math.random() * 2, // 3-5px
          opacity: particles.intensity * (0.8 + Math.random() * 0.2), // 0.8-1.0
          color: '#ffffff', // Always white
          life: 0,
          maxLife: 180 + Math.random() * 120, // 3-5 seconds
          type: 'shooting-star'
        };
      }

      case 'stardust': {
        // Random colors: purple, pink, blue, and white
        const colors = [
          '#e879f9', '#f0abfc', '#c084fc', '#a855f7', '#d946ef',
          '#ec4899', '#8b5cf6', '#6366f1', '#3b82f6', '#60a5fa', '#ffffff'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 5.0, // -2.5 to 2.5
          vy: (Math.random() - 0.5) * 5.0, // -2.5 to 2.5
          size: 1 + Math.random() * 2, // 1-3px
          opacity: particles.intensity * (0.4 + Math.random() * 0.4), // 0.4-0.8
          color: randomColor,
          life: 0,
          maxLife: 120 + Math.random() * 120, // 2-4 seconds
          type: 'stardust'
        };
      }

      case 'bounce': {
        // Polka-dot pattern: create a full grid that will scroll continuously
        const gridSpacing = 80; // Spacing between dots
        const dotSize = 8; // Fixed size for symmetry
        const speed = particles.speed || 0.5;
        
        // Calculate grid dimensions
        const gridCols = Math.ceil(canvas.width / gridSpacing) + 2; // Extra columns for seamless wrap
        const gridRows = Math.ceil(canvas.height / gridSpacing) + 4; // Extra rows for seamless scroll
        
        // Create particles in a complete grid pattern
        const gridX = Math.floor(Math.random() * gridCols);
        const gridY = Math.floor(Math.random() * gridRows);
        
        return {
          x: (gridX * gridSpacing) + (gridSpacing / 2),
          y: (gridY * gridSpacing) + (gridSpacing / 2),
          vx: 0, // No horizontal movement
          vy: speed, // Slow downward scroll
          size: dotSize,
          opacity: particles.intensity * 0.7,
          color: particles.color || '#991b1b', // Dark red
          life: 0,
          maxLife: 100000, // Very long lifespan - pattern should persist
          type: 'bounce'
        };
      }

      case 'bubble':
        // Soda bubbles: simpler approach - start from bottom, rise quickly
        return {
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 20, // Start from bottom
          vx: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
          vy: -(2 + Math.random() * 2), // Fast upward movement
          size: 4 + Math.random() * 6, // 4-10px bubbles
          opacity: particles.intensity, // Start at full opacity
          color: '#ffffff',
          life: 0,
          maxLife: 180 + Math.random() * 120, // 3-5 seconds (shorter)
          type: 'bubble' as const
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
    // Skip particle updates for bounce and squiggle types - they're rendered as patterns
    if (theme.particles.type === 'bounce' || theme.particles.type === 'squiggle') {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      return; // Don't update if canvas isn't ready
    }

    // Skip updates on low performance mode (but still allow some updates)
    if (performanceMode === 'low' && Math.random() > 0.3) {
      return;
    }

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life += 1; // Count frames, not time
      
      if (particle.life >= particle.maxLife) {
        return false;
      }

      // Update position based on type
      switch (particle.type) {
        case 'grain': {
          // For Bryck: maintain semi-transparent opacity, no fading
          if (theme.id === 'bryck-manning') {
            particle.x += (particle.vx || 0);
            particle.y += Math.max(0.4, particle.vy);
            // Keep consistent semi-transparent opacity throughout life
            particle.opacity = 0.3;
            break;
          }
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

        case 'cosmic-wave':
          // Move particle gently
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Update sway phase
          if (particle.swayPhase !== undefined) {
            particle.swayPhase += 0.02;
          }
          
          // Add gentle drift
          particle.vx += (Math.random() - 0.5) * 0.02;
          particle.vy += (Math.random() - 0.5) * 0.02;
          
          // Slow fade in/out
          if (particle.life < 60) {
            particle.opacity = (particle.life / 60) * 0.3;
          } else if (particle.life > particle.maxLife - 120) {
            particle.opacity = ((particle.maxLife - particle.life) / 120) * 0.3;
          } else {
            particle.opacity = 0.3;
          }
          break;

        case 'stardust':
          // Move particle quickly
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Quick fade in/out
          if (particle.life < 30) {
            particle.opacity = (particle.life / 30) * 0.7;
          } else if (particle.life > particle.maxLife - 60) {
            particle.opacity = ((particle.maxLife - particle.life) / 60) * 0.7;
          } else {
            particle.opacity = 0.7;
          }
          break;

        case 'shooting-star':
          // Move very quickly across screen
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Quick fade in at start, maintain brightness, then fade out
          if (particle.life < 20) {
            particle.opacity = (particle.life / 20) * 0.9;
          } else if (particle.life > particle.maxLife - 40) {
            particle.opacity = ((particle.maxLife - particle.life) / 40) * 0.9;
          } else {
            particle.opacity = 0.9;
          }
          break;

        case 'bounce':
          // Polka-dot pattern: continuous downward scroll
          particle.y += particle.vy;
          
          // Maintain consistent opacity (no fading)
          particle.opacity = particles.intensity * 0.7;
          break;

        case 'bubble':
          // Simple bubble movement and fading
          particle.x += particle.vx;
          particle.y += particle.vy;
          // Simple fade over lifespan
          particle.opacity = particles.intensity * (1 - particle.life / particle.maxLife);
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
      } else if (particle.type === 'cosmic-wave' || particle.type === 'stardust') {
        // Wrap around screen edges
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
      } else if (particle.type === 'shooting-star') {
        // Remove shooting stars when they go off screen
        // No wrapping - they should disappear
      } else if (particle.type === 'bounce') {
        // Wrap to top when scrolling past bottom, maintaining exact grid position
        const gridSpacing = 80;
        if (particle.y > canvas.height + gridSpacing) {
          // Calculate which grid row this particle belongs to
          const gridY = Math.floor((particle.y - (gridSpacing / 2)) / gridSpacing);
          const gridRows = Math.ceil(canvas.height / gridSpacing) + 4;
          // Wrap to equivalent position at top
          const newGridY = gridY - gridRows;
          particle.y = (newGridY * gridSpacing) + (gridSpacing / 2);
        }
        // Also handle wrapping from top (for particles starting above)
        if (particle.y < -gridSpacing) {
          const gridY = Math.floor((particle.y - (gridSpacing / 2)) / gridSpacing);
          const gridRows = Math.ceil(canvas.height / gridSpacing) + 4;
          const newGridY = gridY + gridRows;
          particle.y = (newGridY * gridSpacing) + (gridSpacing / 2);
        }
      } else if (particle.type === 'bubble') {
        // Bubbles: remove when they go off screen or reach top
        if (particle.x < -50 || particle.x > canvas.width + 50 || particle.y < -50) {
          return false; // Remove bubble
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
    let spawnChance = 0.05; // Default 5% chance
    if (theme.particles.type === 'radio') {
      spawnChance = 0.024; // 2.4% chance for radio waves
    } else if (theme.particles.type === 'speed') {
      spawnChance = 0.08; // 8% chance for speed lines (more frequent)
    } else if (theme.particles.type === 'grain') {
      spawnChance = 0.12; // slightly higher to reach desired count smoothly
    } else if (theme.particles.type === 'cosmic-wave') {
      spawnChance = 0.15; // 15% chance for cosmic effects (high spawn for stardust)
    } else if (theme.particles.type === 'stardust') {
      spawnChance = 0.15; // 15% chance for cosmic effects
    } else if (theme.particles.type === 'bubble') {
      spawnChance = 0.15; // 15% chance for bubbles (higher spawn rate)
    } else if (theme.particles.type === 'hammer') {
      spawnChance = 0.08; // 8% chance for hammers (moderate spawn rate)
    } else if (theme.particles.type === 'bounce') {
      // Higher spawn rate initially to fill the grid, then maintain
      const currentBounceCount = particlesRef.current.filter(p => p.type === 'bounce').length;
      const gridSpacing = 80;
      const expectedCols = Math.ceil(canvas.width / gridSpacing) + 2;
      const expectedRows = Math.ceil(canvas.height / gridSpacing) + 4;
      const targetCount = expectedCols * expectedRows;
      
      if (currentBounceCount < targetCount) {
        spawnChance = 0.3; // High spawn rate to fill grid quickly
      } else {
        spawnChance = 0.05; // Lower rate to maintain pattern
      }
    }
    
    // Adjust spawn rates based on performance mode
    const adjustedSpawnChance = performanceMode === 'high' ? spawnChance : 
                               performanceMode === 'medium' ? spawnChance * 0.6 : 
                               spawnChance * 0.3;
    const maxParticles = theme.particles.count || 100;
    const adjustedMaxParticles = performanceMode === 'high' ? maxParticles : 
                                performanceMode === 'medium' ? Math.floor(maxParticles * 0.7) : 
                                Math.floor(maxParticles * 0.4);
    
    // Skip particle spawning for bounce and squiggle types - they're rendered as patterns
    if (theme.particles.type === 'bounce' || theme.particles.type === 'squiggle') {
      return;
    }
    
    if (Math.random() < adjustedSpawnChance && particlesRef.current.length < adjustedMaxParticles) {
      // For The Bloxiverse, create mixed particle types (cosmic waves + stardust + shooting stars)
      if (theme.id === 'the-bloxiverse') {
        const particleType = Math.random();
        if (particleType < 0.2) {
          // 20% cosmic waves
          const waveParticle = createParticle({ ...theme, particles: { ...theme.particles, type: 'cosmic-wave' } });
          particlesRef.current.push(waveParticle);
        } else if (particleType < 0.35) {
          // 15% shooting stars
          const shootingStarParticle = createParticle({ ...theme, particles: { ...theme.particles, type: 'shooting-star' } });
          particlesRef.current.push(shootingStarParticle);
        } else {
          // 65% stardust
          const stardustParticle = createParticle({ ...theme, particles: { ...theme.particles, type: 'stardust' } });
          particlesRef.current.push(stardustParticle);
        }
      }
      // For Caesar, create mixed particle types (flow + lightning)
      else if (theme.id === 'caesar-bloxwright') {
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
        setCanvasSupported(false);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Special rendering for bounce pattern - draw repeating polka-dot pattern
    if (theme.particles.type === 'bounce') {
      const gridSpacing = 80;
      const dotSize = 16; // Doubled from 8 to 16
      const speed = theme.particles.speed || 0.5;
      const color = theme.particles.color || '#dc2626';
      const opacity = theme.particles.intensity * 0.7;
      
      // Update scroll offset
      scrollOffsetRef.current += speed;
      if (scrollOffsetRef.current >= gridSpacing) {
        scrollOffsetRef.current -= gridSpacing;
      }
      
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      
      // Draw dots in a repeating grid pattern
      const cols = Math.ceil(canvas.width / gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / gridSpacing) + 2;
      
      for (let col = 0; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = (col * gridSpacing) + (gridSpacing / 2);
          const y = (row * gridSpacing) + (gridSpacing / 2) - scrollOffsetRef.current;
          
          // Only draw if visible on canvas
          if (y > -dotSize && y < canvas.height + dotSize) {
            ctx.beginPath();
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      return; // Skip particle rendering for bounce type
    }

    // Special rendering for squiggle pattern - draw scrolling spirals
    if (theme.particles.type === 'squiggle') {
      const spiralSpacing = 150;
      const spiralSize = 60; // Radius of each spiral
      const color = theme.particles.color || '#ffffff';
      const opacity = theme.particles.intensity * 0.7;
      const rotationSpeedMultiplier = theme.particles.rotationSpeedMultiplier ?? 1.0;
      const scrollDirection = theme.particles.scrollDirection || 'down';
      
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      // Draw multiple spirals in a grid pattern with extra for seamless wrapping
      const cols = Math.ceil(canvas.width / spiralSpacing) + 2;
      const rows = Math.ceil(canvas.height / spiralSpacing) + 2;
      
      // Use modulo for seamless wrapping - never reset the offset, just wrap the calculation
      const wrappedOffset = spiralScrollOffsetRef.current % spiralSpacing;
      
      // Calculate which cell in the infinite grid corresponds to the edge of the visible area
      // This lets us track each spiral's true identity in the infinite pattern
      const scrolledCells = Math.floor(spiralScrollOffsetRef.current / spiralSpacing);
      
      // Determine if scrolling horizontally or vertically
      const isHorizontal = scrollDirection === 'left' || scrollDirection === 'right';
      const isReversed = scrollDirection === 'up' || scrollDirection === 'left';
      
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          let centerX: number;
          let centerY: number;
          let gridCol: number;
          let gridRow: number;
          
          if (isHorizontal) {
            // Horizontal scrolling: offset X position
            if (isReversed) {
              // Left: spirals move from right to left (X decreases)
              centerX = (col * spiralSpacing) + (spiralSpacing / 2) - wrappedOffset;
            } else {
              // Right: spirals move from left to right (X increases)
              centerX = (col * spiralSpacing) + (spiralSpacing / 2) + wrappedOffset;
            }
            centerY = (row * spiralSpacing) + (spiralSpacing / 2);
            gridCol = isReversed ? col + scrolledCells : col - scrolledCells;
            gridRow = row;
          } else {
            // Vertical scrolling: offset Y position
            centerX = (col * spiralSpacing) + (spiralSpacing / 2);
            if (isReversed) {
              // Up: spirals move from bottom to top (Y decreases)
              centerY = (row * spiralSpacing) + (spiralSpacing / 2) - wrappedOffset;
            } else {
              // Down: spirals move from top to bottom (Y increases)
              centerY = (row * spiralSpacing) + (spiralSpacing / 2) + wrappedOffset;
            }
            gridCol = col;
            gridRow = isReversed ? row + scrolledCells : row - scrolledCells;
          }
          
          // Only draw if visible on canvas
          const isVisible = centerX > -spiralSize && centerX < canvas.width + spiralSize &&
                           centerY > -spiralSize && centerY < canvas.height + spiralSize;
          
          if (isVisible) {
            // Use the grid identity (not screen position) for rotation properties
            // This ensures each spiral maintains consistent rotation as it scrolls
            const patternCol = ((gridCol % 5) + 5) % 5;
            const patternRow = ((gridRow % 5) + 5) % 5;
            const baseRotationSpeed = 0.3 + ((patternCol + patternRow) % 5) * 0.15; // Different speeds: 0.3 to 0.9
            const rotationSpeed = baseRotationSpeed * rotationSpeedMultiplier;
            
            // Each spiral has a unique base rotation offset based on its grid identity
            const baseRotationOffset = (gridCol * 0.7 + gridRow * 1.3) * Math.PI; // Unique offset per spiral
            // Calculate dynamic rotation continuously - don't use modulo to avoid visual jumps
            const dynamicRotation = rotationTimeRef.current * rotationSpeed * Math.PI * 2;
            const rotation = baseRotationOffset + dynamicRotation; // Combined: unique starting angle + continuous rotation
            
            ctx.beginPath();
            
            // Draw spiral (Archimedean spiral) with rotation
            const turns = 2; // Number of full rotations
            const points = 100; // Number of points in the spiral
            
            for (let i = 0; i <= points; i++) {
              const t = (i / points) * turns * Math.PI * 2 + rotation;
              const radius = (i / points) * spiralSize;
              const x = centerX + Math.cos(t) * radius;
              const y = centerY + Math.sin(t) * radius;
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            
            ctx.stroke();
          }
        }
      }
      
      return; // Skip particle rendering for squiggle type
    }

    // Special rendering for Builderman blueprint grid pattern
    if (theme.id === 'builderman') {
      const mainGridSpacing = 100;
      const secondaryGridSpacing = 20;
      const fineGridSpacing = 5;
      const speed = 0.5; // Scroll speed
      
      // Update scroll offset
      scrollOffsetRef.current += speed;
      if (scrollOffsetRef.current >= mainGridSpacing) {
        scrollOffsetRef.current -= mainGridSpacing;
      }
      
      const offsetX = scrollOffsetRef.current;
      const offsetY = scrollOffsetRef.current;
      
      // Draw fine grid lines (dark blue) - 5px spacing
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.05)';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      
      // Vertical fine lines
      for (let x = -fineGridSpacing; x < canvas.width + fineGridSpacing; x += fineGridSpacing) {
        const drawX = x - (offsetX % fineGridSpacing);
        if (drawX >= -fineGridSpacing && drawX <= canvas.width + fineGridSpacing) {
          ctx.beginPath();
          ctx.moveTo(drawX, 0);
          ctx.lineTo(drawX, canvas.height);
          ctx.stroke();
        }
      }
      
      // Horizontal fine lines
      for (let y = -fineGridSpacing; y < canvas.height + fineGridSpacing; y += fineGridSpacing) {
        const drawY = y - (offsetY % fineGridSpacing);
        if (drawY >= -fineGridSpacing && drawY <= canvas.height + fineGridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(canvas.width, drawY);
          ctx.stroke();
        }
      }
      
      // Draw secondary grid lines (grey) - 20px spacing
      ctx.strokeStyle = 'rgba(107, 114, 128, 0.08)';
      ctx.lineWidth = 1;
      
      // Vertical secondary lines
      for (let x = -secondaryGridSpacing; x < canvas.width + secondaryGridSpacing; x += secondaryGridSpacing) {
        const drawX = x - (offsetX % secondaryGridSpacing);
        if (drawX >= -secondaryGridSpacing && drawX <= canvas.width + secondaryGridSpacing) {
          ctx.beginPath();
          ctx.moveTo(drawX, 0);
          ctx.lineTo(drawX, canvas.height);
          ctx.stroke();
        }
      }
      
      // Horizontal secondary lines
      for (let y = -secondaryGridSpacing; y < canvas.height + secondaryGridSpacing; y += secondaryGridSpacing) {
        const drawY = y - (offsetY % secondaryGridSpacing);
        if (drawY >= -secondaryGridSpacing && drawY <= canvas.height + secondaryGridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(canvas.width, drawY);
          ctx.stroke();
        }
      }
      
      // Draw main grid lines (orange) - 100px spacing
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.15)';
      ctx.lineWidth = 1;
      
      // Vertical main lines
      for (let x = -mainGridSpacing; x < canvas.width + mainGridSpacing; x += mainGridSpacing) {
        const drawX = x - (offsetX % mainGridSpacing);
        if (drawX >= -mainGridSpacing && drawX <= canvas.width + mainGridSpacing) {
          ctx.beginPath();
          ctx.moveTo(drawX, 0);
          ctx.lineTo(drawX, canvas.height);
          ctx.stroke();
        }
      }
      
      // Horizontal main lines
      for (let y = -mainGridSpacing; y < canvas.height + mainGridSpacing; y += mainGridSpacing) {
        const drawY = y - (offsetY % mainGridSpacing);
        if (drawY >= -mainGridSpacing && drawY <= canvas.height + mainGridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(canvas.width, drawY);
          ctx.stroke();
        }
      }
      
      ctx.globalAlpha = 1;
      return; // Skip particle rendering for Builderman
    }

    // Special rendering for Bryck Manning horizontal bars (seamless looping)
    if (theme.id === 'bryck-manning' && theme.particles.type === 'grain') {
      // Ensure canvas is properly sized
      if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
      }
      
      const barHeight = 30; // Reduced by half (60 / 2)
      const barSpacing = canvas.height / theme.particles.count; // Even spacing
      
      // Seamless looping: bars scroll off bottom and reload at top
      const wrappedBarOffsetY = bryckBarOffsetRef.current % barSpacing;
      const scrolledBarCellsY = Math.floor(bryckBarOffsetRef.current / barSpacing);
      
      ctx.save();
      ctx.globalAlpha = 0.3; // Semi-transparent
      ctx.fillStyle = theme.particles.color;
      
      // Draw bars covering visible area plus extra for seamless wrap
      const barsToDraw = Math.ceil(canvas.height / barSpacing) + 2;
      
      for (let i = -1; i < barsToDraw; i++) {
        const y = (i * barSpacing) - wrappedBarOffsetY;
        
        // Only draw if visible
        if (y > -barHeight && y < canvas.height + barHeight) {
          ctx.fillRect(0, y - barHeight / 2, canvas.width, barHeight);
        }
      }
      
      ctx.restore();
      return; // Skip particle rendering for bar pattern
    }

    // Special rendering for Ren Bytera hexagon grid pattern
    if (theme.id === 'ren-bytera' && theme.patterns && theme.patterns.type === 'mechanical') {
      // Ensure canvas is properly sized
      if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
      }
      
      const hexGridOpacity = 0.25; // Base opacity
      const baseHexRadius = 20; // Base radius
      const hexSpacingX = baseHexRadius * 4; // Horizontal spacing (heavily increased to prevent overlap)
      const hexSpacingY = baseHexRadius * Math.sqrt(3) * 2; // Vertical spacing for hexagonal tiling (heavily increased to prevent overlap)
      
      // Seamless looping: pattern loops from top to bottom
      // Create a fixed pattern that repeats at canvas height
      // The offset continuously increases, and we use modulo to wrap positions seamlessly
      const gridSpacing = hexSpacingY; // Use vertical spacing as base for wrapping
      const wrappedHexOffsetY = renHexGridOffsetRef.current % gridSpacing;
      
      // Calculate how many full grid cells we've scrolled (for maintaining grid identity)
      const scrolledHexCellsY = Math.floor(renHexGridOffsetRef.current / gridSpacing);
      
      ctx.save();
      
      // Large buffer zones to ensure hexagons teleport off-screen, never visible during transition
      const bufferSize = canvas.height * 2; // Large buffer above and below
      
      // Calculate how many rows we need to cover visible area + buffers
      const totalHeight = canvas.height + bufferSize * 2;
      const hexCols = Math.ceil(canvas.width / hexSpacingX) + 3;
      const hexRows = Math.ceil(totalHeight / hexSpacingY) + 4; // Enough rows to cover total height
      
      // Use current time for random flickering
      const currentTime = Date.now() * 0.001; // Time in seconds
      
      // Pattern height for seamless looping - use canvas height as the repeat point
      // Hexagons will wrap when fully off-screen (both top and bottom)
      const patternHeight = canvas.height;
      // Calculate how many rows fit in the pattern height for wrapping grid identity
      const patternRows = Math.ceil(patternHeight / hexSpacingY);
      
      for (let col = -2; col < hexCols; col++) {
        for (let row = -2; row < hexRows; row++) {
          // Calculate the true grid identity for this hexagon
          // Wrap gridRow to ensure the pattern repeats seamlessly
          const gridCol = col;
          const rawGridRow = row + scrolledHexCellsY; // Add scrolled cells to maintain identity
          const gridRow = ((rawGridRow % patternRows) + patternRows) % patternRows; // Wrap to create seamless loop
          
          // Use grid identity to determine properties (consistent across frames)
          const hexSeed = (gridCol * 73856093) ^ (gridRow * 19349663); // Hash for consistency
          
          // Glow is independent of flickering - most hexagons have some level of natural glow
          // Glow intensity varies from very strong to faint
          const glowSeed = (hexSeed * 13) % 100; // 0-99 for glow variation
          const hasGlow = glowSeed < 85; // ~85% of hexagons have some glow
          
          // Glow intensity varies from very strong (3.0) to faint (0.3)
          // Create a smooth distribution across the range
          let glowIntensity = 0;
          if (hasGlow) {
            if (glowSeed < 10) {
              // Very strong glow (~10%)
              glowIntensity = 2.5 + (glowSeed / 10) * 0.5; // 2.5 to 3.0
            } else if (glowSeed < 25) {
              // Strong glow (~15%)
              glowIntensity = 1.8 + ((glowSeed - 10) / 15) * 0.7; // 1.8 to 2.5
            } else if (glowSeed < 45) {
              // Moderate glow (~20%)
              glowIntensity = 1.2 + ((glowSeed - 25) / 20) * 0.6; // 1.2 to 1.8
            } else if (glowSeed < 65) {
              // Light glow (~20%)
              glowIntensity = 0.7 + ((glowSeed - 45) / 20) * 0.5; // 0.7 to 1.2
            } else {
              // Faint glow (~20%)
              glowIntensity = 0.3 + ((glowSeed - 65) / 20) * 0.4; // 0.3 to 0.7
            }
          }
          
          // Size variation: 0.85x to 1.15x (reduced range to prevent overlap)
          const sizeVariation = 0.85 + ((hexSeed % 5) / 5) * 0.3;
          const currentHexRadius = baseHexRadius * sizeVariation;
          
          // Neon sign-like flickering: some hexagons flicker (independent of glow)
          // Each hexagon has a unique flicker timing and pattern based on its seed
          const flickerSeed = (hexSeed * 17) % 1000; // Unique flicker pattern per hexagon
          const flickerType = flickerSeed % 5; // Different flicker types (0-4)
          const shouldFlicker = flickerType < 3; // ~60% of hexagons flicker
          
          let flickerAmount = 0;
          if (shouldFlicker) {
            // Create neon sign-like flicker patterns
            const flickerPhase = (flickerSeed * 0.1) % (Math.PI * 2); // Unique phase offset
            const flickerSpeed = 2 + (flickerType * 0.5); // Different speeds for variety
            
            if (flickerType === 0) {
              // Quick rhythmic flicker (like a neon sign with a loose connection)
              const flickerWave = Math.sin(currentTime * flickerSpeed * 3 + flickerPhase);
              flickerAmount = flickerWave > 0.7 ? (flickerWave - 0.7) * 0.4 : 0; // Sharp flicker
            } else if (flickerType === 1) {
              // Slow pulsing flicker (like a neon sign warming up)
              const flickerWave = (Math.sin(currentTime * flickerSpeed + flickerPhase) + 1) / 2;
              flickerAmount = (flickerWave > 0.5 ? flickerWave : 0.5) * 0.3 - 0.15; // Pulsing effect
            } else {
              // Random occasional flicker (like a neon sign with intermittent issues)
              const flickerCycle = (currentTime * flickerSpeed * 0.5 + flickerPhase) % 4;
              if (flickerCycle > 3.5) {
                const flickerIntensity = (flickerCycle - 3.5) * 2; // Quick flicker
                flickerAmount = Math.sin(flickerIntensity * Math.PI) * 0.25;
              }
            }
          }
          
          const hexOpacity = Math.max(0.15, Math.min(0.5, hexGridOpacity + flickerAmount));
          
          // Calculate position with seamless looping
          // Use gridRow for hexagonal tiling offset to maintain consistency
          const x = (col * hexSpacingX) + (gridRow % 2 === 0 ? 0 : hexSpacingX * 0.5);
          // Calculate Y position: start from buffer zone above, scroll down
          // Position hexagons to cover the entire range including buffers
          let y = (row * hexSpacingY) - wrappedHexOffsetY - bufferSize;
          
          // Wrap hexagons that scroll off the bottom - teleport them to top (off-screen)
          // Only wrap when fully off-screen below the visible area
          if (y >= canvas.height + bufferSize) {
            // Teleport from bottom to top (off-screen, in the negative buffer zone)
            y -= totalHeight;
          }
          
          // Only draw if visible (within the visible canvas area: 0 to canvas.height)
          // Allow a small margin for partial visibility at edges
          const margin = currentHexRadius * 2;
          if (x > -margin && x < canvas.width + margin && 
              y > -margin && y < canvas.height + margin) {
            
            ctx.save();
            ctx.globalAlpha = hexOpacity;
            
            // Add glow effect with varying intensities (independent of flickering)
            if (hasGlow && glowIntensity > 0) {
              ctx.shadowBlur = 10 * glowIntensity; // Scale blur based on intensity
              ctx.shadowColor = '#22c55e';
              // Vary stroke color based on glow intensity for more visual variety
              if (glowIntensity >= 2.0) {
                ctx.strokeStyle = '#4ade80'; // Very bright green for strong glow
              } else if (glowIntensity >= 1.5) {
                ctx.strokeStyle = '#34d399'; // Bright green for moderate-strong glow
              } else if (glowIntensity >= 1.0) {
                ctx.strokeStyle = '#22c55e'; // Standard green for moderate glow
              } else if (glowIntensity >= 0.5) {
                ctx.strokeStyle = '#16a34a'; // Slightly darker green for light glow
              } else {
                ctx.strokeStyle = '#15803d'; // Darker green for faint glow
              }
            } else {
              ctx.shadowBlur = 0;
              ctx.strokeStyle = '#22c55e';
            }
            ctx.lineWidth = 2;
            
            // Draw hexagon
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const hexX = x + Math.cos(angle) * currentHexRadius;
              const hexY = y + Math.sin(angle) * currentHexRadius;
              if (i === 0) {
                ctx.moveTo(hexX, hexY);
              } else {
                ctx.lineTo(hexX, hexY);
              }
            }
            ctx.closePath();
            ctx.stroke();
            
            ctx.restore();
          }
        }
      }
      
      ctx.restore();
      return; // Skip particle rendering for hexagon grid pattern
    }

    // Skip rendering on low performance mode occasionally
    if (performanceMode === 'low' && Math.random() > 0.7) {
      return;
    }

    // Filter out any bounce and squiggle particles - they should only be rendered via pattern rendering
    const particlesToRender = particlesRef.current.filter(p => p.type !== 'bounce' && p.type !== 'squiggle');

    particlesToRender.forEach((particle, index) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;

      switch (particle.type) {
        case 'grain': {
          // For Bryck: draw horizontal black bars
          if (theme.id === 'bryck-manning') {
            const canvas = canvasRef.current;
            if (!canvas) break;
            const barWidth = canvas.width; // Full width
            const barHeight = particle.height || 25; // Small height
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            // Draw horizontal bar (rectangle) spanning full width
            ctx.fillRect(
              0, // Start at left edge
              particle.y - barHeight / 2, // Center vertically on particle position
              barWidth,
              barHeight
            );
            ctx.restore();
            break;
          }
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
          // Check if this is bloxy-cola or witches-brew theme for hollow bubbles
          if (theme.id === 'bloxy-cola' || theme.id === 'witches-brew') {
            // Draw hollow bubble (light brown for bloxy-cola, green for witches-brew)
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.stroke();
            
            // Add small highlight
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(
              particle.x - particle.size * 0.3,
              particle.y - particle.size * 0.3,
              particle.size * 0.2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            // Original flow particle rendering for other themes
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

        case 'cosmic-wave': {
          ctx.save();
          
          // Draw multiple concentric rippling waves
          const numRipples = 3;
          const time = particle.life * 0.05;
          
          for (let i = 0; i < numRipples; i++) {
            const ripplePhase = (i / numRipples) * Math.PI * 2;
            const rippleSize = particle.size * (1 + i * 0.4);
            const rippleOpacity = particle.opacity * (1 - i * 0.3);
            
            // Create gradient for each ripple
            const gradient = ctx.createRadialGradient(
              particle.x,
              particle.y,
              0,
              particle.x,
              particle.y,
              rippleSize
            );
            
            // Use particle's assigned color with transparency
            gradient.addColorStop(0, particle.color + Math.floor(rippleOpacity * 100).toString(16).padStart(2, '0'));
            gradient.addColorStop(0.6, particle.color + Math.floor(rippleOpacity * 60).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, particle.color + '00');
            
            ctx.fillStyle = gradient;
            ctx.globalAlpha = rippleOpacity;
            
            // Add pulsing glow
            ctx.shadowBlur = 40;
            ctx.shadowColor = particle.color;
            
            // Draw wavy, organic shape
            ctx.beginPath();
            const points = 8;
            for (let j = 0; j <= points; j++) {
              const angle = (j / points) * Math.PI * 2;
              const wave = Math.sin(angle * 3 + time + ripplePhase) * 0.3;
              const radius = rippleSize * (1 + wave);
              const x = particle.x + Math.cos(angle) * radius;
              const y = particle.y + Math.sin(angle) * radius * 0.7; // Elongate vertically
              
              if (j === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
          }
          
          ctx.restore();
          break;
        }

        case 'stardust': {
          ctx.save();
          
          // Add glow effect
          ctx.shadowBlur = 8;
          ctx.shadowColor = particle.color;
          
          // Draw small circular particle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add motion trail
          const trailLength = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy) * 3;
          if (trailLength > 0) {
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              particle.x - particle.vx * 3,
              particle.y - particle.vy * 3
            );
            
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, particle.color + '00');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.size * 0.8;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x - particle.vx * 2, particle.y - particle.vy * 2);
            ctx.stroke();
          }
          
          ctx.restore();
          break;
        }

        case 'shooting-star': {
          ctx.save();
          
          // Bright white glow
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ffffff';
          
          // Draw bright core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add long trailing streak
          const trailLength = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (trailLength > 0) {
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              particle.x - particle.vx * 8,
              particle.y - particle.vy * 8
            );
            
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, '#ffffff99');
            gradient.addColorStop(0.7, '#ffffff44');
            gradient.addColorStop(1, '#ffffff00');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.size * 1.5;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x - particle.vx * 6, particle.y - particle.vy * 6);
            ctx.stroke();
            
            // Add secondary fainter trail
            ctx.globalAlpha = 0.5;
            ctx.lineWidth = particle.size * 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x - particle.vx * 8, particle.y - particle.vy * 8);
            ctx.stroke();
          }
          
          ctx.restore();
          break;
        }

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

        case 'bounce':
          // Draw polka-dot: simple dark red circle
          ctx.globalAlpha = particle.opacity;
          ctx.shadowBlur = 0; // No shadow for cleaner polka-dot look
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'bubble':
          // Draw EXACTLY like flow particles for testing
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ffffff';
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add inner glow
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          break;

        default:
          // Default circle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.restore();
    });
  }, [performanceMode, theme]);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) {
      return;
    }

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;
    
    // Update continuous rotation time for spirals (always increment, never reset)
    // Don't use modulo here - let it grow continuously to maintain smooth rotation
    rotationTimeRef.current += deltaTime * 0.001; // Increment in seconds
    
    // Update spiral scroll offset continuously (frame-rate independent, never resets)
    // Don't use modulo here - let it grow continuously, use modulo only in rendering
    if (theme.particles.type === 'squiggle') {
      const scrollSpeed = (theme.particles.speed || 0.5) * (deltaTime / 16.67); // Normalize to 60fps
      spiralScrollOffsetRef.current += scrollSpeed;
    }
    
    // Update Ren Bytera hexagon grid scroll offset continuously (frame-rate independent, never resets)
    // Don't use modulo here - let it grow continuously, use modulo only in rendering
    if (theme.id === 'ren-bytera' && theme.patterns && theme.patterns.type === 'mechanical') {
      const hexGridScrollSpeed = (0.3 * deltaTime) / 16.67; // Normalize to 60fps (scrolls downward)
      renHexGridOffsetRef.current += hexGridScrollSpeed;
    }
    
    // Update Bryck Manning bar scroll offset continuously (frame-rate independent, never resets)
    // Don't use modulo here - let it grow continuously, use modulo only in rendering
    if (theme.id === 'bryck-manning' && theme.particles.type === 'grain') {
      const barScrollSpeed = ((theme.particles.speed || 0.6) * deltaTime) / 16.67; // Normalize to 60fps (scrolls downward)
      bryckBarOffsetRef.current += barScrollSpeed;
    }

    checkPerformance(currentTime);
    updateParticles(deltaTime);
    renderParticles();

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles, checkPerformance, theme.particles.type]);

  // Fade transition logic
  useEffect(() => {
    const currentId = theme.id || '';
    const prevId = prevThemeIdRef.current;
    
    // Clear existing timeout
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }
    
    // Initial mount
    if (!prevId && currentId) {
      fadeTimeoutRef.current = setTimeout(() => {
        setOpacity(1);
        // Force fallback if no particles appear after 3 seconds
        // Skip this check for bounce, squiggle types, Builderman, Ren, and Bryck since they use pattern rendering, not individual particles
        if (theme.particles.type === 'bounce' || theme.particles.type === 'squiggle' || theme.id === 'builderman' || theme.id === 'ren-bytera' || theme.id === 'bryck-manning') {
          return;
        }
        setTimeout(() => {
          if (particlesRef.current.length === 0 && !forceFallback && theme.particles.type !== 'bounce' && theme.particles.type !== 'squiggle' && theme.id !== 'builderman') {
            setForceFallback(true);
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
    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Don't set forceFallback - just wait for next render
    }

    // Test canvas support
    try {
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setCanvasSupported(false);
        setForceFallback(true);
        return;
      }
      
      // Test basic canvas operations
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 1, 1);
      ctx.clearRect(0, 0, 1, 1);
      
      setCanvasReady(true);
      
      // Bounce type uses pattern rendering, not individual particles
      // Clear any existing bounce and squiggle particles that might have been created
      if (theme.particles.type === 'bounce' || theme.particles.type === 'squiggle') {
        particlesRef.current = particlesRef.current.filter(p => p.type !== 'bounce' && p.type !== 'squiggle');
      }
    } catch (error) {
      setCanvasSupported(false);
      setCanvasReady(false);
      setForceFallback(true);
      return;
    }

    const setCanvasSize = () => {
      // Use viewport size for fixed positioning
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Test if canvas is actually visible after resize
      const rect = canvas.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) {
        setForceFallback(true);
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize particle array and time
    if (particlesRef.current.length === 0) {
      lastTimeRef.current = performance.now();
    }
    
    
    // Bounce and squiggle types use pattern rendering, not individual particles
    // Clear any existing bounce and squiggle particles that might have been created
    if (theme.particles.type === 'bounce' || theme.particles.type === 'squiggle') {
      particlesRef.current = particlesRef.current.filter(p => p.type !== 'bounce' && p.type !== 'squiggle');
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [theme]);

  // Manage animation lifecycle separately
  useEffect(() => {
    if (!canvasReady || !canvasRef.current || !canvasSupported) {
      return;
    }
    
    const frameId = requestAnimationFrame(animate);
    animationRef.current = frameId;
    
    // Force fallback if no particles appear after 3 seconds
    // Skip this check for bounce and squiggle types since they use pattern rendering, not individual particles
    // Also skip for Ren since it uses pattern rendering
    let fallbackTimeout: NodeJS.Timeout | undefined;
    if (theme.particles.type !== 'bounce' && theme.particles.type !== 'squiggle' && theme.id !== 'builderman' && theme.id !== 'ren-bytera') {
      fallbackTimeout = setTimeout(() => {
        if (particlesRef.current.length === 0 && !forceFallback) {
          setForceFallback(true);
        }
      }, 3000);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
    };
  }, [animate, canvasSupported, canvasReady, theme.id, theme.particles.type, forceFallback]);

  // Clear particles when theme changes to prevent burst
  useEffect(() => {
    particlesRef.current = [];
    setCanvasReady(false); // Reset so INIT can run again
  }, [theme.id]);


  // Allow rendering for Builderman even with 'none' particles type since we render blueprint grid pattern
  // Also allow rendering for bounce and squiggle types since they use pattern rendering
  // Allow rendering for Ren Bytera and Builderman since they render patterns
  if (theme.particles.type === 'none' && theme.id !== 'builderman' && theme.id !== 'ren-bytera' && theme.particles.type !== 'bounce' && theme.particles.type !== 'squiggle') {
    return null;
  }

  // Fallback for canvas-unsupported browsers, very low performance, or forced fallback
  // Skip fallback check for bounce, squiggle types and Builderman since they use pattern rendering, not individual particles
  if (!canvasSupported || forceFallback || (performanceMode === 'low' && particlesRef.current.length === 0 && theme.particles.type !== 'bounce' && theme.particles.type !== 'squiggle' && theme.id !== 'builderman' && theme.id !== 'ren-bytera')) {
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
