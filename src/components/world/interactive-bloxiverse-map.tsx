import { useState, useEffect, useRef } from "react";
import { BLOXIVERSE_SEGMENTS, BloxiverseSegment } from "@/data/bloxiverse-segments";
import { ROBLOXIAN_WORLDS, RobloxianWorld } from "@/data/robloxian-worlds";
import { DecorativeDots } from "./decorative-dots";
import { WorldIconRenderer } from "./world-icon-renderer";
import { SegmentPopup } from "./segment-popup";
import { WorldPopup } from "./world-popup";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export function InteractiveBloxiverseMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSegment, setSelectedSegment] = useState<BloxiverseSegment | null>(null);
  const [selectedWorld, setSelectedWorld] = useState<RobloxianWorld | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const minZoom = 0.5;
  const maxZoom = 5;
  // Use The Null Boundary as max radius (exclude The Null Zone)
  const maxRadius = BLOXIVERSE_SEGMENTS.find(seg => seg.id === 'the-null-boundary')?.endRadius || 1600;

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent page scroll when hovering over map
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!hasAnimated) return;

      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((prev) => {
        const next = prev * scaleFactor;
        return Math.max(minZoom, Math.min(maxZoom, next));
      });
    };

    container.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventScroll);
    };
  }, [minZoom, maxZoom, hasAnimated]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasAnimated) return;
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragMoved(false);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasAnimated) return;
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      if (!dragMoved) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance > 5) {
          setDragMoved(true);
        }
      }

      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (dragMoved) {
      setTimeout(() => setDragMoved(false), 0);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (dragMoved) {
      setTimeout(() => setDragMoved(false), 0);
    }
  };

  const handleZoomIn = () => {
    if (!hasAnimated) return;
    setZoom((prev) => {
      const next = prev * 1.15;
      return Math.min(maxZoom, next);
    });
  };

  const handleZoomOut = () => {
    if (!hasAnimated) return;
    setZoom((prev) => {
      const next = prev / 1.15;
      return Math.max(minZoom, next);
    });
  };

  const handleSegmentClick = (segment: BloxiverseSegment) => {
    if (!hasAnimated) return;
    if (isDragging || dragMoved) {
      return;
    }
    setSelectedSegment(segment);
    setDragMoved(false);
  };

  const handleWorldClick = (world: RobloxianWorld) => {
    if (!hasAnimated) return;
    if (isDragging || dragMoved) {
      return;
    }
    setSelectedWorld(world);
    setDragMoved(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card/95 backdrop-blur-sm"
          title="Zoom In"
          disabled={!hasAnimated}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card/95 backdrop-blur-sm"
          title="Zoom Out"
          disabled={!hasAnimated}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* SVG Map */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: hasAnimated ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
          pointerEvents: hasAnimated ? 'auto' : 'none',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`${-maxRadius * 1.2} ${-maxRadius * 1.2} ${maxRadius * 2.4} ${maxRadius * 2.4}`}
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: hasAnimated ? 'none' : 'expandMap 0.8s ease-out forwards',
          }}
        >
          {/* Decorative Dots */}
          <DecorativeDots
            segments={BLOXIVERSE_SEGMENTS}
            maxRadius={maxRadius}
            animationDelay={1000}
          />

          {/* Segment Rings */}
          {BLOXIVERSE_SEGMENTS.filter(seg => seg.id !== 'the-null-zone').map((segment, index) => {
            const animationDelay = 600 + index * 100;
            const isHeart = segment.id === 'the-heart';

            return (
              <g key={segment.id}>
                {/* The Heart - Solid filled circle */}
                {isHeart ? (
                  <circle
                    cx={0}
                    cy={0}
                    r={segment.endRadius}
                    fill={segment.color}
                    opacity={0}
                    className="segment-heart cursor-pointer"
                    style={{
                      animation: `fadeInHeart 0.6s ease-out ${animationDelay}ms forwards`,
                      transition: 'opacity 0.2s ease',
                      filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))',
                    }}
                    onMouseEnter={() => setHoveredSegment(segment.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    onClick={() => handleSegmentClick(segment)}
                  />
                ) : (
                  /* Other segments - Rings */
                  <circle
                    cx={0}
                    cy={0}
                    r={(segment.startRadius + segment.endRadius) / 2}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={segment.endRadius - segment.startRadius}
                    opacity={0}
                    className="segment-ring cursor-pointer"
                    style={{
                      animation: `fadeInSegment 0.6s ease-out ${animationDelay}ms forwards`,
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={() => setHoveredSegment(segment.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    onClick={() => handleSegmentClick(segment)}
                  />
                )}

                {/* Segment Label */}
                <text
                  x={0}
                  y={isHeart ? 0 : -(segment.startRadius + segment.endRadius) / 2}
                  textAnchor="middle"
                  dominantBaseline={isHeart ? "middle" : "auto"}
                  fill={isHeart ? "#1a0a2e" : "white"}
                  fontSize={isHeart ? "200" : "150"}
                  fontWeight="bold"
                  opacity={0}
                  style={{
                    animation: `fadeInSegment 0.6s ease-out ${animationDelay + 200}ms forwards`,
                    pointerEvents: 'none',
                    textShadow: isHeart ? 'none' : '0 10px 28px rgba(0,0,0,0.85)',
                  }}
                >
                  {segment.title}
                </text>
              </g>
            );
          })}

          {/* Robloxian Worlds */}
          {ROBLOXIAN_WORLDS.map((world, index) => {
            const segment = BLOXIVERSE_SEGMENTS.find((s) => s.id === world.segment);
            if (!segment) return null;

            const animationDelay = 1000 + index * 50;

            return (
              <WorldIconRenderer
                key={world.id}
                world={world}
                segment={segment}
                onClick={handleWorldClick}
                animationDelay={animationDelay}
              />
            );
          })}
        </svg>
      </div>

      {/* Popups */}
      <SegmentPopup
        segment={selectedSegment}
        open={!!selectedSegment}
        onClose={() => setSelectedSegment(null)}
      />
      <WorldPopup
        world={selectedWorld}
        open={!!selectedWorld}
        onClose={() => setSelectedWorld(null)}
      />

      {/* Animation Keyframes */}
      <style>{`
        @keyframes expandMap {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInSegment {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.3;
          }
        }

        @keyframes fadeInHeart {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .segment-ring:hover {
          opacity: 0.5 !important;
        }

        .segment-heart:hover {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}

