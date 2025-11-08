import { useEffect, useState } from "react";

interface DecorativeDotsProps {
  segments: Array<{ id: string; startRadius: number; endRadius: number }>;
  maxRadius: number;
  animationDelay?: number;
}

interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
}

// Seeded random number generator for consistency
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// Check if two dots overlap
function dotsOverlap(dot1: Dot, dot2: Dot, minDistance: number): boolean {
  const dx = dot1.x - dot2.x;
  const dy = dot1.y - dot2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const totalRadius = dot1.size + dot2.size + minDistance;
  return distance < totalRadius;
}

// Generate dots with collision detection based on segment distribution
function generateDistributedDots(
  segments: Array<{ id: string; startRadius: number; endRadius: number }>,
  rng: SeededRandom,
  minDistance: number = 8
): Dot[] {
  const dots: Dot[] = [];
  const maxAttempts = 50; // Maximum attempts per dot to prevent infinite loops
  
  // Define dot counts per segment based on lore
  const segmentDotCounts: Record<string, number> = {
    'the-heart': 0, // No worlds in the Heart
    'the-inner-circle': 800, // Densely packed
    'the-midzone': 1400, // Heavily populated, but spread out
    'the-outer-circle': 320, // Sparse, occasional worlds
    'the-banlands': 60, // Extremely rare
    'the-void': 0, // No worlds can exist here
    'the-null-boundary': 0, // No worlds
    'the-null-zone': 0, // Does not exist
  };

  // Define size ranges per segment for visual variety
  const segmentSizeRanges: Record<string, [number, number]> = {
    'the-inner-circle': [1.8, 3.2],
    'the-midzone': [2.0, 3.8],
    'the-outer-circle': [2.4, 4.2],
    'the-banlands': [2.8, 4.6],
  };

  let dotId = 0;

  segments.forEach(segment => {
    const count = segmentDotCounts[segment.id] || 0;
    
    for (let i = 0; i < count; i++) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < maxAttempts) {
        // Generate random angle
        const angle = rng.next() * Math.PI * 2;
        
        // Generate radius within segment bounds
        // For Midzone, weight toward Inner Circle border
        let radius: number;
        if (segment.id === 'the-midzone') {
          // Use exponential distribution to cluster near inner edge
          const t = Math.pow(rng.next(), 2); // Square to weight toward 0
          radius = segment.startRadius + t * (segment.endRadius - segment.startRadius);
        } else if (segment.id === 'the-inner-circle') {
          // Evenly distributed but dense
          radius = segment.startRadius + rng.next() * (segment.endRadius - segment.startRadius);
        } else {
          // Sparse segments - more random
          radius = segment.startRadius + rng.next() * (segment.endRadius - segment.startRadius);
        }
        
        // Convert polar to cartesian
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        // Random size and opacity
        const sizeRange = segmentSizeRanges[segment.id] || [2.0, 3.5];
        const size = sizeRange[0] + rng.next() * (sizeRange[1] - sizeRange[0]);
        const opacity = 0.4 + rng.next() * 0.4; // 0.4-0.8 for better visibility

        const newDot: Dot = { x, y, size, opacity, id: dotId };

        // Check if this dot overlaps with any existing dots
        const overlaps = dots.some(existingDot => 
          dotsOverlap(newDot, existingDot, minDistance)
        );

        if (!overlaps) {
          dots.push(newDot);
          dotId++;
          placed = true;
        }

        attempts++;
      }
    }
  });

  return dots;
}

export function DecorativeDots({ 
  segments,
  maxRadius,
  animationDelay = 1000 
}: DecorativeDotsProps) {
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rng = new SeededRandom(42);
    const dots = generateDistributedDots(segments, rng);
    const viewSize = maxRadius * 2.4;
    const offset = maxRadius * 1.2;
    const targetTextureSize = Math.min(4096, Math.max(1024, Math.ceil(viewSize / 4)));
    const scaleFactor = targetTextureSize / viewSize;
    const deviceScale = window.devicePixelRatio || 1;

    const canvasSize = Math.ceil(viewSize * scaleFactor);
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize * deviceScale;
    canvas.height = canvasSize * deviceScale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(deviceScale, deviceScale);
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    dots.forEach(dot => {
      const drawX = (dot.x + offset) * scaleFactor;
      const drawY = (dot.y + offset) * scaleFactor;
      const drawSize = Math.max(1.2, dot.size * scaleFactor * 2.5);
      ctx.beginPath();
      ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
      const alpha = Math.min(1, dot.opacity + 0.15);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });

    const url = canvas.toDataURL('image/png');
    setTextureUrl(url);

    return () => {
      setTextureUrl(null);
    };
  }, [segments, maxRadius]);

  if (!textureUrl) {
    return null;
  }

  const dimension = maxRadius * 2.4;
  const position = -maxRadius * 1.2;

  return (
    <>
      <image
        href={textureUrl}
        x={position}
        y={position}
        width={dimension}
        height={dimension}
        opacity={0}
        style={{
          animation: `fadeInDotTexture 0.8s ease-out ${animationDelay}ms forwards`,
        }}
      />
      <style>{`
        @keyframes fadeInDotTexture {
          from { opacity: 0; }
          to { opacity: 0.65; }
        }
      `}</style>
    </>
  );
}

