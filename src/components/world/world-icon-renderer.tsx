import { RobloxianWorld } from "@/data/robloxian-worlds";
import { BloxiverseSegment } from "@/data/bloxiverse-segments";
import { useState } from "react";

interface WorldIconRendererProps {
  world: RobloxianWorld;
  segment: BloxiverseSegment;
  onClick: (world: RobloxianWorld) => void;
  animationDelay: number;
}

export function WorldIconRenderer({ world, segment, onClick, animationDelay }: WorldIconRendererProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Convert polar coordinates to cartesian
  const angleRad = (world.position.angle * Math.PI) / 180;
  const radius = segment.startRadius + (segment.endRadius - segment.startRadius) * world.position.distanceFromCenter;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;
  
  const iconSize = 50;
  
  return (
    <g 
      className="world-icon-group cursor-pointer"
      onClick={() => onClick(world)}
      opacity={0}
      style={{
        animation: `fadeInWorld 0.6s ease-out ${animationDelay}ms forwards`,
      }}
    >
      {/* Hover glow effect */}
      <circle
        cx={x}
        cy={y}
        r={iconSize / 2 + 4}
        fill="none"
        stroke={segment.color}
        strokeWidth="2"
        opacity="0"
        className="world-glow"
        style={{
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* World thumbnail circle */}
      <defs>
        <clipPath id={`clip-${world.id}`}>
          <circle cx={x} cy={y} r={iconSize / 2} />
        </clipPath>
      </defs>
      
      <circle
        cx={x}
        cy={y}
        r={iconSize / 2}
        fill="#2d1b4e"
        stroke={segment.color}
        strokeWidth="2"
        className="world-icon-bg"
        style={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {!imageError ? (
        <image
          href={world.thumbnail}
          x={x - iconSize / 2}
          y={y - iconSize / 2}
          width={iconSize}
          height={iconSize}
          clipPath={`url(#clip-${world.id})`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          opacity={imageLoaded ? 1 : 0}
          style={{
            transition: 'opacity 0.3s ease',
          }}
        />
      ) : (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="24"
        >
          ?
        </text>
      )}
      
      {/* World name label */}
      <text
        x={x}
        y={y + iconSize / 2 + 30}
        textAnchor="middle"
        fill="white"
        fontSize="72"
        fontWeight="700"
        className="world-name-label"
        style={{
          pointerEvents: 'none',
          textShadow: '0 8px 24px rgba(0,0,0,0.85)',
        }}
      >
        {world.name}
      </text>
      
      <style>{`
        .world-icon-group:hover .world-icon-bg {
          transform: scale(1.15);
          filter: drop-shadow(0 0 12px ${segment.color});
        }
        .world-icon-group:hover .world-glow {
          opacity: 0.6 !important;
        }
        .world-icon-group:hover .world-name-label {
          fill: ${segment.color};
        }
        .world-icon-group:active .world-icon-bg {
          transform: scale(0.95);
        }
        
        @keyframes fadeInWorld {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </g>
  );
}

