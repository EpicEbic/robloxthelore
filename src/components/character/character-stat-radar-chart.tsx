import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatGrade {
  label: "Ø" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
  value: number; // 0-7 for easier programming
}

interface CharacterStats {
  offense: StatGrade;
  defense: StatGrade;
  utility: StatGrade;
  potential: StatGrade;
}

interface CombatStats {
  strength: StatGrade;
  durability: StatGrade;
  agility: StatGrade;
  precision: StatGrade;
  intelligence: StatGrade;
}

interface CharacterStatRadarChartProps {
  stats: CharacterStats | CombatStats;
  characterId?: string;
  abilityName?: string;
  className?: string;
  isPhysicalStats?: boolean;
}

const GRADE_VALUES = {
  "F": 0,
  "E": 1,
  "D": 2,
  "C": 3,
  "B": 4,
  "A": 5,
  "S": 6,
  "Ø": 7
} as const;

// Check if stats is CombatStats (5 stats) or CharacterStats (4 stats)
function isCombatStats(stats: CharacterStats | CombatStats): stats is CombatStats {
  return 'strength' in stats;
}

export function CharacterStatRadarChart({ 
  stats, 
  characterId, 
  abilityName, 
  className,
  isPhysicalStats = false 
}: CharacterStatRadarChartProps) {
  const isCombat = isCombatStats(stats);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  // Get stat entries
  const statEntries = isCombat 
    ? [
        { key: 'strength', label: 'Strength', stat: stats.strength },
        { key: 'durability', label: 'Durability', stat: stats.durability },
        { key: 'agility', label: 'Agility', stat: stats.agility },
        { key: 'precision', label: 'Precision', stat: stats.precision },
        { key: 'intelligence', label: 'Intelligence', stat: stats.intelligence }
      ]
    : [
        { key: 'offense', label: 'Offense', stat: stats.offense },
        { key: 'defense', label: 'Defense', stat: stats.defense },
        { key: 'utility', label: 'Utility', stat: stats.utility },
        { key: 'potential', label: 'Potential', stat: stats.potential }
      ];

  const numStats = statEntries.length;
  const angleStep = (2 * Math.PI) / numStats;
  const centerX = 240;
  const centerY = 240;
  const maxRadius = 160;
  const labelDistance = 200;

  // Calculate points for the filled area
  const calculatePoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const radius = (value / 7) * maxRadius; // Max value is 7 (Ø)
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  // Calculate label positions
  const calculateLabelPoint = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: centerX + labelDistance * Math.cos(angle),
      y: centerY + labelDistance * Math.sin(angle)
    };
  };

  // Create path for the filled area
  const dataPoints = statEntries.map((entry, index) => 
    calculatePoint(GRADE_VALUES[entry.stat.label], index)
  );
  const dataPath = dataPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Create grid circles
  const gridLevels = [0.25, 0.5, 0.75, 1];
  
  // Create axis lines
  const axisLines = statEntries.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const endX = centerX + maxRadius * Math.cos(angle);
    const endY = centerY + maxRadius * Math.sin(angle);
    return { x1: centerX, y1: centerY, x2: endX, y2: endY };
  });

  // Get color class
  const getChartColorClass = () => {
    if (isPhysicalStats) {
      return "stat-chart-physical-white";
    }
    if (characterId === "vortex-a-steele") {
      return "stat-chart-vortex";
    }
    if (characterId === "caesar-bloxwright") {
      return "stat-chart-caesar";
    }
    return "stat-chart-default";
  };

  return (
    <div className={cn("flex justify-center items-center p-4", className)}>
      <div 
        className={cn(
          "bg-card/80 backdrop-blur-sm rounded-2xl p-6 border stat-chart-container",
          getChartColorClass()
        )}
        style={{ 
          maxWidth: 'min(540px, 95vw)',
          width: '100%'
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <h3 
            className={`text-xl font-bold text-center stat-chart-title ${isPhysicalStats ? 'physical-stats-title' : ''}`}
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.025em',
              ...(isPhysicalStats && {
                color: '#ffffff !important',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.3)'
              })
            }}
          >
            {isPhysicalStats ? "Physical Statistics" : (abilityName ? `${abilityName} Statistics` : "Ability Statistics")}
          </h3>
          {isPhysicalStats && (
            <TooltipProvider>
              <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                <TooltipTrigger asChild>
                  <button 
                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    aria-label="Physical statistics information"
                    onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  >
                    <HelpCircle 
                      className="h-5 w-5"
                      style={{
                        color: '#ffffff',
                        filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))'
                      }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    The physical statistics does <strong>NOT</strong> account for any abilities a character may have, this is exclusively their raw, physical potential!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-6">
          {/* SVG Radar Chart */}
          <svg 
            viewBox="0 0 480 480" 
            className="w-full h-auto"
            style={{ 
              maxWidth: 'min(480px, 90vw)',
              maxHeight: 'min(480px, 90vw)'
            }}
          >
            {/* Grid circles */}
            {gridLevels.map((level, i) => (
              <React.Fragment key={`grid-${i}`}>
                {isCombat ? (
                  // Pentagon for combat stats
                  <polygon
                    points={statEntries.map((_, index) => {
                      const angle = index * angleStep - Math.PI / 2;
                      const radius = maxRadius * level;
                      const x = centerX + radius * Math.cos(angle);
                      const y = centerY + radius * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="stat-radar-grid opacity-20"
                    style={isPhysicalStats ? { stroke: '#ffffff' } : {}}
                  />
                ) : (
                  // Square for ability stats (4 points)
                  <polygon
                    points={statEntries.map((_, index) => {
                      const angle = index * angleStep - Math.PI / 2;
                      const radius = maxRadius * level;
                      const x = centerX + radius * Math.cos(angle);
                      const y = centerY + radius * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="stat-radar-grid opacity-20"
                    style={isPhysicalStats ? { stroke: '#ffffff' } : {}}
                  />
                )}
              </React.Fragment>
            ))}

            {/* Axis lines */}
            {axisLines.map((line, i) => (
              <line
                key={`axis-${i}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="currentColor"
                strokeWidth="1"
                className="stat-radar-grid opacity-20"
                style={isPhysicalStats ? { stroke: '#ffffff' } : {}}
              />
            ))}

            {/* Data area */}
            <path
              d={dataPath}
              fill="currentColor"
              className="stat-radar-area opacity-40"
              style={isPhysicalStats ? { fill: '#ffffff' } : {}}
            />
            <path
              d={dataPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="stat-radar-area"
              style={isPhysicalStats ? { stroke: '#ffffff' } : {}}
            />

            {/* Data points */}
            {dataPoints.map((point, i) => (
              <circle
                key={`point-${i}`}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="currentColor"
                className="stat-radar-point"
                style={isPhysicalStats ? { fill: '#ffffff' } : {}}
              />
            ))}

            {/* Labels */}
            {statEntries.map((entry, index) => {
              const labelPos = calculateLabelPoint(index);
              const dataPoint = dataPoints[index];
              const gradeValue = GRADE_VALUES[entry.stat.label];
              
              return (
                <g key={`label-${index}`}>
                  {/* Stat name */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold"
                    fill="currentColor"
                    stroke={isPhysicalStats ? 'rgba(0, 0, 0, 0.3)' : undefined}
                    strokeWidth={isPhysicalStats ? '0.5' : undefined}
                    paintOrder={isPhysicalStats ? 'stroke fill' : undefined}
                    style={isPhysicalStats ? { 
                      fill: '#ffffff',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: '700',
                      letterSpacing: '0.02em',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    } : {
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: '700',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {entry.label}
                  </text>
                  
                  {/* Grade label near the data point */}
                  <text
                    x={dataPoint.x}
                    y={dataPoint.y - 15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-bold"
                    fill="currentColor"
                    stroke={isPhysicalStats ? 'rgba(0, 0, 0, 0.3)' : undefined}
                    strokeWidth={isPhysicalStats ? '0.5' : undefined}
                    paintOrder={isPhysicalStats ? 'stroke fill' : undefined}
                    style={isPhysicalStats ? { 
                      fill: '#ffffff',
                      fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
                      fontWeight: '800',
                      letterSpacing: '0.03em',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    } : {
                      fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
                      fontWeight: '800',
                      letterSpacing: '0.03em'
                    }}
                  >
                    {entry.stat.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center w-full px-4"
            style={isPhysicalStats ? { color: '#ffffff' } : {}}
          >
            {['Ø = Omnipotent', 'S = Supreme', 'A = Amazing', 'B = Better', 'C = Competent', 'D = Deficient', 'E = Egregious', 'F = Failing'].map((label) => (
              <span 
                key={label}
                className="font-medium"
                style={{
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
                  letterSpacing: '0.01em',
                  color: isPhysicalStats ? '#ffffff' : undefined,
                  textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

