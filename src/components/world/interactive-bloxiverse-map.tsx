import { useState, useEffect, useRef } from "react";
import { BLOXIVERSE_SEGMENTS, BloxiverseSegment } from "@/data/bloxiverse-segments";
import { ROBLOXIAN_WORLDS, RobloxianWorld } from "@/data/robloxian-worlds";
import { DecorativeDots } from "./decorative-dots";
import { WorldIconRenderer } from "./world-icon-renderer";
import { SegmentPopup } from "./segment-popup";
import { WorldPopup } from "./world-popup";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { LocationContentStyles } from "@/components/location/location-content-styles";

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
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Touch/pinch gesture state
  const touchStateRef = useRef<{
    touches: Touch[];
    lastDistance: number;
    lastCenter: { x: number; y: number };
    initialZoom: number;
    initialPan: { x: number; y: number };
  } | null>(null);

  const minZoom = 0.5;
  const maxZoom = 5;
  // Use The Null Boundary as max radius (Null Zone is hidden)
  const maxRadius = BLOXIVERSE_SEGMENTS.find(seg => seg.id === 'the-null-boundary')?.endRadius || 6520;

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth zoom with wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!hasAnimated) return;

      const now = Date.now();
      const timeSinceLastWheel = now - lastWheelTime;
      lastWheelTime = now;

      // Throttle wheel events to prevent excessive updates
      if (timeSinceLastWheel < 16) return; // ~60fps

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        setIsZooming(true);
        const scaleFactor = e.deltaY > 0 ? 0.92 : 1.08;
        setZoom((prev) => {
          const next = prev * scaleFactor;
          return Math.max(minZoom, Math.min(maxZoom, next));
        });
        
        // Reset zooming state after a short delay
        setTimeout(() => {
          setIsZooming(false);
        }, 150);
        rafId = null;
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
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

  // Calculate distance between two touches
  const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate center point between two touches
  const getTouchCenter = (touch1: Touch, touch2: Touch): { x: number; y: number } => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasAnimated) return;
    
    const touches = Array.from(e.touches);
    
    if (touches.length === 2) {
      // Pinch gesture
      e.preventDefault();
      const distance = getTouchDistance(touches[0], touches[1]);
      const center = getTouchCenter(touches[0], touches[1]);
      
      touchStateRef.current = {
        touches,
        lastDistance: distance,
        lastCenter: center,
        initialZoom: zoom,
        initialPan: pan,
      };
      setIsZooming(true);
    } else if (touches.length === 1) {
      // Single touch - pan
      const touch = touches[0];
      setIsDragging(true);
      setDragMoved(false);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasAnimated) return;
    
    const touches = Array.from(e.touches);
    
    if (touches.length === 2 && touchStateRef.current) {
      // Pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(touches[0], touches[1]);
      const center = getTouchCenter(touches[0], touches[1]);
      const scale = distance / touchStateRef.current.lastDistance;
      
      const newZoom = Math.max(minZoom, Math.min(maxZoom, touchStateRef.current.initialZoom * scale));
      setZoom(newZoom);
      
      // Adjust pan to zoom towards the pinch center
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = center.x - rect.left - rect.width / 2;
        const centerY = center.y - rect.top - rect.height / 2;
        
        const zoomDelta = newZoom / touchStateRef.current.initialZoom;
        const newPanX = centerX - (centerX - touchStateRef.current.initialPan.x) * zoomDelta;
        const newPanY = centerY - (centerY - touchStateRef.current.initialPan.y) * zoomDelta;
        
        setPan({ x: newPanX, y: newPanY });
      }
      
      touchStateRef.current.lastDistance = distance;
      touchStateRef.current.lastCenter = center;
    } else if (touches.length === 1 && isDragging) {
      // Single touch pan
      const touch = touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;

      if (!dragMoved) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance > 5) {
          setDragMoved(true);
        }
      }

      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasAnimated) return;
    
    const touches = Array.from(e.touches);
    
    if (touches.length < 2) {
      touchStateRef.current = null;
      setIsZooming(false);
    }
    
    if (touches.length === 0) {
      const wasDragging = isDragging;
      setIsDragging(false);
      
      // If it was a tap (not a drag), allow click events to propagate
      // The dragMoved check in click handlers will prevent accidental clicks after dragging
      if (dragMoved) {
        setTimeout(() => setDragMoved(false), 0);
      }
    }
  };

  const handleZoomIn = () => {
    if (!hasAnimated) return;
    setIsZooming(true);
    setZoom((prev) => {
      const next = prev * 1.15;
      return Math.min(maxZoom, next);
    });
    setTimeout(() => setIsZooming(false), 300);
  };

  const handleZoomOut = () => {
    if (!hasAnimated) return;
    setIsZooming(true);
    setZoom((prev) => {
      const next = prev / 1.15;
      return Math.max(minZoom, next);
    });
    setTimeout(() => setIsZooming(false), 300);
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
      <LocationContentStyles />
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card/95 backdrop-blur-sm border-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Zoom In"
          disabled={!hasAnimated}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card/95 backdrop-blur-sm border-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Zoom Out"
          disabled={!hasAnimated}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* SVG Map */}
      <div
        ref={containerRef}
        className="w-full h-full touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: hasAnimated ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none',
          pointerEvents: hasAnimated ? 'auto' : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`${-maxRadius * 1.2} ${-maxRadius * 1.2} ${maxRadius * 2.4} ${maxRadius * 2.4}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: (isDragging || isZooming) ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: hasAnimated ? 'none' : 'expandMap 0.8s ease-out forwards',
            transformOrigin: 'center center',
          }}
        >
          {/* Decorative Dots */}
          <DecorativeDots
            segments={BLOXIVERSE_SEGMENTS}
            maxRadius={maxRadius}
            animationDelay={1000}
          />

          {/* Single Unified Gradient Definition */}
          <defs>
            <radialGradient 
              id="bloxiverse-gradient" 
              cx="0" 
              cy="0" 
              r={maxRadius}
              gradientUnits="userSpaceOnUse"
            >
              {/* Heart - White at center (0 to 480) */}
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset={`${(480 / maxRadius) * 100}%`} stopColor="#ffffff" />
              {/* Inner Circle - Light Blue (480 to 1280) */}
              <stop offset={`${(480 / maxRadius) * 100}%`} stopColor="#93c5fd" />
              <stop offset={`${(1280 / maxRadius) * 100}%`} stopColor="#93c5fd" />
              {/* Midzone - Darker Blue to Purple (1280 to 2400) */}
              <stop offset={`${(1280 / maxRadius) * 100}%`} stopColor="#3b82f6" />
              <stop offset={`${(2400 / maxRadius) * 100}%`} stopColor="#7c3aed" />
              {/* Outer Circle - Pink (2400 to 3600) */}
              <stop offset={`${(2400 / maxRadius) * 100}%`} stopColor="#ec4899" />
              <stop offset={`${(3600 / maxRadius) * 100}%`} stopColor="#ec4899" />
              {/* Banlands - Red (3600 to 4800) */}
              <stop offset={`${(3600 / maxRadius) * 100}%`} stopColor="#ef4444" />
              <stop offset={`${(4800 / maxRadius) * 100}%`} stopColor="#ef4444" />
              {/* Void - Darker Grey (4800 to 6200) */}
              <stop offset={`${(4800 / maxRadius) * 100}%`} stopColor="#4b5563" />
              <stop offset={`${(6200 / maxRadius) * 100}%`} stopColor="#4b5563" />
              {/* Null Boundary - Lighter Grey (6200 to 6520) */}
              <stop offset={`${(6200 / maxRadius) * 100}%`} stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#9ca3af" />
            </radialGradient>
            
            {/* Masks for creating rings from filled circles */}
            {BLOXIVERSE_SEGMENTS.filter(seg => seg.id !== 'the-heart' && seg.id !== 'the-null-zone').map((segment) => (
              <mask key={`mask-${segment.id}`} id={`mask-${segment.id}`}>
                <circle cx={0} cy={0} r={segment.endRadius} fill="white" />
                <circle cx={0} cy={0} r={segment.startRadius} fill="black" />
              </mask>
            ))}
            
            {/* Curved text paths for segment labels */}
            {BLOXIVERSE_SEGMENTS.filter(seg => seg.id !== 'the-heart' && seg.id !== 'the-null-zone').map((segment) => {
              // Calculate the exact center point of the ring (middle between start and end radius)
              const centerRadius = (segment.startRadius + segment.endRadius) / 2;
              // Position at the vertical center of the ring (negative Y because SVG Y increases downward)
              // Add a small offset for Null Boundary to align better with its zone
              const verticalOffset = segment.id === 'the-null-boundary' ? 20 : 0;
              const centerY = -centerRadius + verticalOffset;
              
              // Create a subtle horizontal arc path that curves slightly
              // The arc spans horizontally with a gentle upward curve
              // For a quadratic curve, to ensure the midpoint is at centerY, we need to adjust the control point
              const arcWidth = centerRadius * 0.6; // Width of the arc
              const arcHeight = centerRadius * 0.08; // Subtle curve height
              const startX = -arcWidth;
              const startY = centerY + arcHeight; // Start slightly below center
              const endX = arcWidth;
              const endY = centerY + arcHeight; // End slightly below center
              const controlX = 0;
              const controlY = centerY - arcHeight; // Control point above center
              // This creates a symmetric curve where the midpoint (at 50% offset) will be at centerY
              
              return (
                <path
                  key={`text-path-${segment.id}`}
                  id={`text-path-${segment.id}`}
                  d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                  fill="none"
                  stroke="none"
                />
              );
            })}
          </defs>

          {/* Segment Rings - Render in reverse order so inner segments are on top */}
          {[...BLOXIVERSE_SEGMENTS].filter(seg => seg.id !== 'the-null-zone').reverse().map((segment, index) => {
            const animationDelay = 600 + index * 100;
            const isHeart = segment.id === 'the-heart';

            return (
              <g key={segment.id}>
                {/* The Heart - Solid filled circle with gradient */}
                {isHeart ? (
                  <>
                    {/* Invisible hit area for Heart */}
                    <circle
                      cx={0}
                      cy={0}
                      r={segment.endRadius}
                      fill="transparent"
                      opacity={0}
                      className="cursor-pointer"
                      style={{
                        pointerEvents: 'all',
                      }}
                      onMouseEnter={(e) => {
                        const svg = e.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        pt.y = e.clientY;
                        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                        const distance = Math.sqrt(svgPt.x ** 2 + svgPt.y ** 2);
                        if (distance <= segment.endRadius) {
                          setHoveredSegment(segment.id);
                        }
                      }}
                      onMouseMove={(e) => {
                        const svg = e.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        pt.y = e.clientY;
                        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                        const distance = Math.sqrt(svgPt.x ** 2 + svgPt.y ** 2);
                        if (distance <= segment.endRadius) {
                          setHoveredSegment(segment.id);
                        } else {
                          setHoveredSegment(null);
                        }
                      }}
                      onMouseLeave={() => setHoveredSegment(null)}
                      onClick={(e) => {
                        const svg = e.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        pt.y = e.clientY;
                        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                        const distance = Math.sqrt(svgPt.x ** 2 + svgPt.y ** 2);
                        if (distance <= segment.endRadius) {
                          handleSegmentClick(segment);
                        }
                      }}
                    />
                    {/* Visible Heart */}
                    <circle
                      cx={0}
                      cy={0}
                      r={segment.endRadius}
                      fill="url(#bloxiverse-gradient)"
                      opacity={0}
                      className="segment-heart"
                      style={{
                        animation: `fadeInHeart 0.6s ease-out ${animationDelay}ms forwards`,
                        transition: 'opacity 0.2s ease, filter 0.2s ease',
                        filter: hoveredSegment === segment.id 
                          ? 'brightness(1.3) drop-shadow(0 0 25px rgba(255,255,255,0.8))' 
                          : 'drop-shadow(0 0 15px rgba(255,255,255,0.5))',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* White outline at Heart boundary */}
                    <circle
                      cx={0}
                      cy={0}
                      r={segment.endRadius}
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      opacity={0}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        animation: `fadeInSegment 0.6s ease-out ${animationDelay + 100}ms forwards`,
                        pointerEvents: 'none',
                      }}
                    />
                  </>
                ) : (
                  /* Other segments - Rings with gradient using filled circles and mask */
                  <>
                    {/* Invisible hit area - only responds to mouse events within the ring */}
                    <circle
                      cx={0}
                      cy={0}
                      r={segment.endRadius}
                      fill="transparent"
                      opacity={0}
                      className="cursor-pointer"
                      style={{
                        pointerEvents: 'all',
                      }}
                      onMouseEnter={(e) => {
                        // Calculate distance from center to determine if mouse is in this segment's ring
                        const svg = e.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        pt.y = e.clientY;
                        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                        const distance = Math.sqrt(svgPt.x ** 2 + svgPt.y ** 2);
                        if (distance >= segment.startRadius && distance <= segment.endRadius) {
                          setHoveredSegment(segment.id);
                        }
                      }}
                      onMouseMove={(e) => {
                        const svg = e.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        pt.y = e.clientY;
                        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                        const distance = Math.sqrt(svgPt.x ** 2 + svgPt.y ** 2);
                        if (distance >= segment.startRadius && distance <= segment.endRadius) {
                          setHoveredSegment(segment.id);
                        } else {
                          setHoveredSegment(null);
                        }
                      }}
                      onMouseLeave={() => setHoveredSegment(null)}
                      onClick={(e) => {
                        const svg = e.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        pt.y = e.clientY;
                        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                        const distance = Math.sqrt(svgPt.x ** 2 + svgPt.y ** 2);
                        if (distance >= segment.startRadius && distance <= segment.endRadius) {
                          handleSegmentClick(segment);
                        }
                      }}
                    />
                    {/* Visible gradient ring */}
                    <circle
                      cx={0}
                      cy={0}
                      r={segment.endRadius}
                      fill="url(#bloxiverse-gradient)"
                      mask={`url(#mask-${segment.id})`}
                      opacity={0}
                      className="segment-ring"
                      style={{
                        animation: `fadeInSegment 0.6s ease-out ${animationDelay}ms forwards`,
                        transition: 'opacity 0.2s ease, filter 0.2s ease',
                        filter: hoveredSegment === segment.id ? 'brightness(1.3) drop-shadow(0 0 20px rgba(255,255,255,0.6))' : 'none',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* White outline at segment boundary */}
                    <circle
                      cx={0}
                      cy={0}
                      r={segment.endRadius}
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      opacity={0}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        animation: `fadeInSegment 0.6s ease-out ${animationDelay + 100}ms forwards`,
                        pointerEvents: 'none',
                      }}
                    />
                  </>
                )}

                {/* Segment Label */}
                {isHeart ? (
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1a0a2e"
                    fontSize="200"
                    fontWeight="bold"
                    opacity={0}
                    style={{
                      animation: `fadeInSegment 0.6s ease-out ${animationDelay + 200}ms forwards`,
                      pointerEvents: 'none',
                    }}
                  >
                    {segment.title}
                  </text>
                ) : (
                  <text
                    fill="white"
                    fontSize="150"
                    fontWeight="bold"
                    opacity={0}
                    style={{
                      animation: `fadeInSegment 0.6s ease-out ${animationDelay + 200}ms forwards`,
                      pointerEvents: 'none',
                      textShadow: '0 10px 28px rgba(0,0,0,0.85)',
                    }}
                  >
                    <textPath
                      href={`#text-path-${segment.id}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {segment.title}
                    </textPath>
                  </text>
                )}
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

        /* Hover effects are now handled via inline styles using hoveredSegment state */

        @keyframes nullZoneWave {
          0%, 100% {
            stroke-dasharray: 50 30;
            stroke-dashoffset: 0;
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
          }
          25% {
            stroke-dasharray: 60 20;
            stroke-dashoffset: 25;
            filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.8));
          }
          50% {
            stroke-dasharray: 70 25;
            stroke-dashoffset: 50;
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.7));
          }
          75% {
            stroke-dasharray: 60 20;
            stroke-dashoffset: 25;
            filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.8));
          }
        }

        .null-zone-wave {
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
        }
      `}</style>
    </div>
  );
}

