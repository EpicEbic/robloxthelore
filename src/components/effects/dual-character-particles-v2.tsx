import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CharacterTheme } from '@/types/character-theme-types';
import { Particle } from './particle-systems/particle-factory';
import { ParticleUpdater } from './particle-systems/particle-updater';
import { ParticleRenderer } from './particle-systems/particle-renderer';
import { ParticleSpawner } from './particle-systems/particle-spawner';

interface DualCharacterParticlesProps {
  leftTheme: CharacterTheme | null;
  rightTheme: CharacterTheme | null;
}

export function DualCharacterParticles({ leftTheme, rightTheme }: DualCharacterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
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

  // Initialize canvas and check support
  useEffect(() => {
    if (canvasRef.current) {
      try {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
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
  }, []);

  // Handle theme changes with smooth transitions
  useEffect(() => {
    const currentThemeIds = [leftTheme?.id || '', rightTheme?.id || ''];
    const prevThemeIds = prevThemeIdsRef.current;

    if (JSON.stringify(currentThemeIds) !== JSON.stringify(prevThemeIds)) {
      // Clear existing particles when themes change
      particlesRef.current = [];
      
      // Fade in new particles
      if (currentThemeIds.some(id => id !== '')) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
      
      prevThemeIdsRef.current = currentThemeIds;
    }
  }, [leftTheme, rightTheme]);

  // Performance monitoring and adjustment
  useEffect(() => {
    const checkPerformance = () => {
      frameCountRef.current++;
      const now = Date.now();
      
      if (now - lastFpsCheckRef.current >= 1000) {
        const fps = frameCountRef.current;
        frameCountRef.current = 0;
        lastFpsCheckRef.current = now;
        
        if (fps < 30) {
          setPerformanceMode('low');
        } else if (fps < 45) {
          setPerformanceMode('medium');
        } else {
          setPerformanceMode('high');
        }
      }
    };

    const interval = setInterval(checkPerformance, 1000);
    return () => clearInterval(interval);
  }, []);

  // Main animation loop
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current || !canvasSupported || forceFallback) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update canvas size if needed
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Spawn new particles
    if (leftTheme && leftTheme.particles) {
      if (ParticleSpawner.shouldSpawnParticle(leftTheme, 'left', particlesRef.current, performanceMode)) {
        const newParticle = ParticleSpawner.createParticleForTheme(
          leftTheme,
          'left',
          canvas,
          performanceMode
        );
        if (newParticle) {
          particlesRef.current.push(newParticle);
        }
      }
    }

    if (rightTheme && rightTheme.particles) {
      if (ParticleSpawner.shouldSpawnParticle(rightTheme, 'right', particlesRef.current, performanceMode)) {
        const newParticle = ParticleSpawner.createParticleForTheme(
          rightTheme,
          'right',
          canvas,
          performanceMode
        );
        if (newParticle) {
          particlesRef.current.push(newParticle);
        }
      }
    }

    // Update and render particles
    particlesRef.current = particlesRef.current.filter(particle => {
      if (particle.life >= particle.maxLife) {
        return false;
      }

      ParticleUpdater.updateParticle(particle, deltaTime, canvas);
      ParticleRenderer.renderParticle(ctx, particle);
      return true;
    });

    // Debug info (hidden for cleaner UI)
    // const leftParticles = particlesRef.current.filter(p => p.side === 'left').length;
    // const rightParticles = particlesRef.current.filter(p => p.side === 'right').length;
    // const leftSpeedParticles = particlesRef.current.filter(p => p.side === 'left' && p.type === 'speed').length;
    // const rightSpeedParticles = particlesRef.current.filter(p => p.side === 'right' && p.type === 'speed').length;
    // setDebugInfo(`Left: ${leftParticles} (${leftSpeedParticles} speed), Right: ${rightParticles} (${rightSpeedParticles} speed), Total: ${particlesRef.current.length}, Mode: ${performanceMode}, FPS: ${Math.round(1000 / deltaTime)}`);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [leftTheme, rightTheme, performanceMode, canvasSupported, forceFallback]);

  // Start animation loop
  useEffect(() => {
    if (canvasSupported && !forceFallback) {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, canvasSupported, forceFallback]);

  // Fallback for unsupported canvas
  if (!canvasSupported || forceFallback) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="text-muted-foreground/50 text-sm">
          Particle effects not supported in this browser
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: opacity,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      {/* Debug info hidden for cleaner UI */}
      {/* {debugInfo && (
        <div className="absolute top-4 left-4 text-xs text-muted-foreground/50">
          {debugInfo}
        </div>
      )} */}
    </div>
  );
}
