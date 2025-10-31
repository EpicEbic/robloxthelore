import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  currentCombatStyle?: string;
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
  isPhysicalStats = false,
  currentCombatStyle
}: CharacterStatRadarChartProps) {
  const isCombat = isCombatStats(stats);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  const numStats = isCombat ? 15 : 4;
  
  // ============================================================================
  // REBUILT ANGLE SYSTEM - Simple and clear
  // ============================================================================
  // In SVG: 0° = right (3 o'clock), 90° = down (6 o'clock), 180° = left (9 o'clock), 270° = up (12 o'clock)
  // Clock to radians: 12 o'clock should be 270° (up), 3 o'clock = 0° (right)
  // Formula: angle = (12 - hour) * 30° then convert to radians
  // ============================================================================
  
  const clockToRadians = (clockHour: number): number => {
    // In SVG: 0° = right (3 o'clock), 90° = down (6 o'clock), 180° = left (9 o'clock), 270° = up (12 o'clock)
    // Convert clock hour to standard angle where 12=0°, then map to SVG
    // Standard: 12=0°, 3=270° (90° clockwise), 6=180°, 9=90°
    // SVG: 12=270°, 3=0°, 6=90°, 9=180°
    // Conversion: SVG = (270 - standard) mod 360
    // Standard = (12 - hour) * 30, but accounting for 12 being 0
    const standardHour = clockHour === 12 ? 0 : clockHour;
    const standardAngle = (12 - standardHour) * 30;
    let degrees = (270 - standardAngle) % 360;
    if (degrees < 0) degrees += 360;
    return (degrees * Math.PI) / 180;
  };
  
  // Define the exact 15 subcategory positions - grouped by category, closely-knit
  // Each category's 3 subcategories are clustered around the main category position
  // Main categories are evenly spaced (72° = 2.4 hours apart) to prevent flat bottom
  const SUBCATEGORY_CLOCK_POSITIONS = [
    // Strength - clustered around 12:00 (top)
    11.4,   // 0: Penetration (left of center)
    12.0,   // 1: Strength (center at top)
    12.6,   // 2: Intensity (right of center)
    // Agility - clustered around 2.4 hours (72° clockwise from top)
    1.8,    // 3: Swiftness (left of center)
    2.4,    // 4: Endurance (center)
    3.0,    // 5: Flexibility (right of center)
    // Precision - clustered around 4.8 hours (144° clockwise from top)
    4.2,    // 6: Accuracy (left of center)
    4.8,    // 7: Reactivity (center)
    5.4,    // 8: Dexterity (right of center)
    // Intelligence - clustered around 7.2 hours (216° clockwise from top)
    6.6,    // 9: Tactility (left of center)
    7.2,    // 10: Wisdom (center)
    7.8,    // 11: Stability (right of center)
    // Durability - clustered around 9.6 hours (288° clockwise from top)
    9.0,    // 12: Vitality (left of center)
    9.6,    // 13: Toughness (center)
    10.2    // 14: Resistance (right of center)
  ];
  
  // Main category label positions - evenly spaced (72° apart = 2.4 hours)
  const MAIN_CATEGORY_CLOCK_POSITIONS = [12.0, 2.4, 4.8, 7.2, 9.6]; // Strength, Agility, Precision, Intelligence, Durability
  
  // Divider positions - placed halfway between each pair of main categories
  const DIVIDER_CLOCK_POSITIONS = [
    1.2,    // Between Strength (12.0) and Agility (2.4)
    3.6,    // Between Agility (2.4) and Precision (4.8)
    6.0,    // Between Precision (4.8) and Intelligence (7.2)
    8.4,    // Between Intelligence (7.2) and Durability (9.6)
    10.8    // Between Durability (9.6) and Strength (12.0)
  ];
  
  // Reorganize physicalSubcategories to match the category-grouped order
  const reorderedPhysicalSubcategories = [
    // Strength (Offense) - indices 0-2
    { key: 'penetration', label: 'Penetration', category: 'Strength', stat: 'strength' },
    { key: 'strength', label: 'Strength', category: 'Strength', stat: 'strength' },
    { key: 'intensity', label: 'Intensity', category: 'Strength', stat: 'strength' },
    // Agility - indices 3-5
    { key: 'swiftness', label: 'Swiftness', category: 'Agility', stat: 'agility' },
    { key: 'endurance', label: 'Endurance', category: 'Agility', stat: 'agility' },
    { key: 'flexibility', label: 'Flexibility', category: 'Agility', stat: 'agility' },
    // Precision - indices 6-8
    { key: 'accuracy', label: 'Accuracy', category: 'Precision', stat: 'precision' },
    { key: 'reactivity', label: 'Reactivity', category: 'Precision', stat: 'precision' },
    { key: 'dexterity', label: 'Dexterity', category: 'Precision', stat: 'precision' },
    // Intelligence - indices 9-11
    { key: 'tactility', label: 'Tactility', category: 'Intelligence', stat: 'intelligence' },
    { key: 'wisdom', label: 'Wisdom', category: 'Intelligence', stat: 'intelligence' },
    { key: 'stability', label: 'Stability', category: 'Intelligence', stat: 'intelligence' },
    // Durability (Defense) - indices 12-14
    { key: 'vitality', label: 'Vitality', category: 'Durability', stat: 'durability' },
    { key: 'toughness', label: 'Toughness', category: 'Durability', stat: 'durability' },
    { key: 'resistance', label: 'Resistance', category: 'Durability', stat: 'durability' }
  ];
  
  // Get stat entries
  const statEntries: Array<{ key: string; label: string; stat: StatGrade; category?: string }> = isCombat 
    ? reorderedPhysicalSubcategories.map(subcat => {
        // Check for subcategory-specific stat first, then fall back to main category stat
        const subcategoryStats = (stats as any).subcategories;
        const subcategoryStat = subcategoryStats?.[subcat.key as keyof typeof subcategoryStats];
        const mainCategoryStat = stats[subcat.stat as keyof CombatStats];
        
        const statValue = subcategoryStat || mainCategoryStat;
        
        if (!statValue) {
          console.error(`Missing stat value for ${subcat.stat}`, stats);
        }
        return {
          key: subcat.key,
          label: subcat.label,
          category: subcat.category,
          stat: statValue || { label: 'F', value: 0 }
        };
      })
    : [
        { key: 'offense', label: 'Offense', stat: stats.offense },
        { key: 'defense', label: 'Defense', stat: stats.defense },
        { key: 'utility', label: 'Utility', stat: stats.utility },
        { key: 'potential', label: 'Potential', stat: stats.potential }
      ];
  
  // Simple angle function - just use the predefined positions
  const getSubcategoryAngle = (index: number): number => {
    if (!isCombat) {
      return (index * (2 * Math.PI) / numStats) - Math.PI / 2;
    }
    if (index >= SUBCATEGORY_CLOCK_POSITIONS.length) {
      console.error(`Index ${index} out of range for subcategory positions`);
      return 0;
    }
    return clockToRadians(SUBCATEGORY_CLOCK_POSITIONS[index]);
  };
  
  // Get main category angle
  const getMainCategoryAngle = (categoryIndex: number): number => {
    if (!isCombat) return 0;
    if (categoryIndex >= MAIN_CATEGORY_CLOCK_POSITIONS.length) return 0;
    return clockToRadians(MAIN_CATEGORY_CLOCK_POSITIONS[categoryIndex]);
  };
  
  const angleStep = (2 * Math.PI) / numStats; // Keep for backward compatibility where needed
  // Increased viewBox to 920x920 to accommodate larger chart radius and category labels with background rectangles
  const centerX = isCombat ? 460 : 240; // Center of 920x920 viewBox for combat stats
  const centerY = isCombat ? 460 : 240;
  const maxRadius = isCombat ? 200 : 160; // Increased from 160 to 200 for combat stats to reduce clustering
  // Adjust label distance to prevent cut-off and account for larger viewBox
  // Ensure enough space for longest labels (e.g., "Intelligence", "Penetration")
  // Increase spacing to prevent overlap between subcategory and main category labels
  // Adjust label distances proportionally to the increased radius
  const labelDistance = isCombat ? 255 : 200; // Subcategory labels - increased proportionally (205 * 200/160)
  const categoryLabelDistance = isCombat ? 390 : 0; // Distance for main category labels - increased proportionally (310 * 200/160)
  
  // Special handling for Strength - positioned closer to center
  const getCategoryLabelDistance = (categoryIndex: number): number => {
    if (!isCombat) return 0;
    // Strength (index 0) is closer to center
    // Adjusted proportionally: 247 * 200/160 = ~309
    if (categoryIndex === 0) return 309; // Closer than default 390
    return categoryLabelDistance;
  };

  // Calculate points for the filled area
  const calculatePoint = (value: number, index: number) => {
    const angle = getSubcategoryAngle(index);
    // Ensure angle is valid
    if (isNaN(angle) || !isFinite(angle)) {
      console.error(`Invalid angle for index ${index}:`, angle);
      return { x: centerX, y: centerY };
    }
    const radius = (value / 7) * maxRadius; // Max value is 7 (Ø)
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  // Calculate label positions
  const calculateLabelPoint = (index: number) => {
    const angle = getSubcategoryAngle(index);
    return {
      x: centerX + labelDistance * Math.cos(angle),
      y: centerY + labelDistance * Math.sin(angle)
    };
  };

  // Create path for the filled area
  const dataPoints = statEntries.map((entry, index) => {
    const value = GRADE_VALUES[entry.stat.label];
    if (isNaN(value) || value === undefined) {
      console.warn(`Invalid stat value for entry ${index}:`, entry);
      return calculatePoint(0, index);
    }
    return calculatePoint(value, index);
  });
  
  // Verify all data points are valid
  const hasInvalidPoints = dataPoints.some(p => isNaN(p.x) || isNaN(p.y) || !isFinite(p.x) || !isFinite(p.y));
  if (hasInvalidPoints) {
    console.error('Invalid data points detected:', dataPoints);
  }
  
  const dataPath = dataPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Create grid circles - one for each grade level (F through Ø)
  // Using non-linear spacing to spread out lower values better for readability
  // Inner circles (low values) are more spread out, outer circles more evenly spaced
  // This helps when many low-tier stats cluster together
  const gridLevels = [
    0.18,  // F to E - more spread
    0.32,  // E to D - more spread
    0.45,  // D to C - more spread
    0.58,  // C to B - slightly less spread
    0.71,  // B to A - slightly less spread
    0.85,  // A to S - slightly less spread
    1.0    // S to Ø - full radius
  ];

  // Check if current combat style should pulse between white and purple
  const shouldPulse = isPhysicalStats && 
    (currentCombatStyle === "chronipulation-mag-num" || 
     currentCombatStyle === "chronipulation-amplification-gauntlet");

  // Get color class
  const getChartColorClass = () => {
    if (isPhysicalStats) {
      return shouldPulse 
        ? "stat-chart-physical-white stat-chart-pulse-purple" 
        : "stat-chart-physical-white";
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
          maxWidth: isCombat ? 'min(920px, 95vw)' : 'min(540px, 95vw)',
          width: '100%'
        }}
      >
        <div className={`flex items-center justify-center gap-2 mb-6 ${shouldPulse ? 'pulse-container' : ''}`}>
          <h3 
            className={`text-xl font-bold text-center stat-chart-title ${isPhysicalStats ? 'physical-stats-title' : ''}`}
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.025em',
              ...(shouldPulse ? {
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.3)'
              } : (isPhysicalStats ? {
                color: '#ffffff',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.3)'
              } : (characterId === "vortex-a-steele" ? {
                color: '#a855f7'
              } : {})))
            }}
          >
            {isPhysicalStats ? "Physical Statistics" : (abilityName ? `${abilityName} Statistics` : "Ability Statistics")}
          </h3>
          {isPhysicalStats && (
            <TooltipProvider>
              <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                <TooltipTrigger asChild>
                  <button 
                    className="flex-shrink-0 hover:opacity-80 transition-opacity no-pulse"
                    aria-label="Physical statistics information"
                    onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  >
                    <HelpCircle 
                      className="h-5 w-5 no-pulse"
                      style={{
                      color: '#ffffff',
                      stroke: '#ffffff',
                      fill: 'none',
                      filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))',
                      animation: 'none'
                    }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-md">
                  <p className="text-sm leading-relaxed">
                    By default, physical statistics do <strong>NOT</strong> account for the ability of a character if they have one. This is only their raw physical potential!
                    
                    <br /><br />
                    
                    Certain scenarios or combat styles that incorporate a character's ability may make this incorrect, please be aware!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-6">
          {/* SVG Radar Chart */}
          <svg 
            viewBox={isCombat ? "0 0 920 920" : "0 0 480 480"}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            style={{ 
              maxWidth: isCombat ? 'min(920px, 95vw)' : 'min(480px, 90vw)',
              maxHeight: isCombat ? 'min(920px, 95vw)' : 'min(480px, 90vw)'
            }}
          >
            {/* Grid circles */}
            {gridLevels.map((level, i) => (
              <React.Fragment key={`grid-${i}`}>
                {isCombat ? (
                  // Polygon for combat stats (15 points)
                  <polygon
                    points={statEntries.map((_, index) => {
                      const angle = getSubcategoryAngle(index);
                      if (isNaN(angle) || !isFinite(angle)) {
                        console.error(`Invalid grid angle for index ${index}:`, angle);
                        return `${centerX},${centerY}`;
                      }
                      const radius = maxRadius * level;
                      const x = centerX + radius * Math.cos(angle);
                      const y = centerY + radius * Math.sin(angle);
                      if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
                        console.error(`Invalid grid point for index ${index}:`, { x, y, angle, radius, level });
                        return `${centerX},${centerY}`;
                      }
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className={shouldPulse ? "stat-radar-grid" : "stat-radar-grid opacity-20"}
                    style={shouldPulse ? {} : (isPhysicalStats ? { stroke: '#ffffff' } : (characterId === "vortex-a-steele" && !isPhysicalStats ? { stroke: '#a855f7' } : {}))}
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
                    className={shouldPulse ? "stat-radar-grid" : "stat-radar-grid opacity-20"}
                    style={shouldPulse ? {} : (isPhysicalStats ? { stroke: '#ffffff' } : (characterId === "vortex-a-steele" && !isPhysicalStats ? { stroke: '#a855f7' } : {}))}
                  />
                )}
              </React.Fragment>
            ))}

            {/* Axis lines */}
            {statEntries.map((_, i) => {
              const angle = getSubcategoryAngle(i);
              const endX = centerX + maxRadius * Math.cos(angle);
              const endY = centerY + maxRadius * Math.sin(angle);
              return (
                <line
                  key={`axis-${i}`}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="currentColor"
                  strokeWidth="1"
                  className={shouldPulse ? "stat-radar-grid" : "stat-radar-grid opacity-20"}
                  style={shouldPulse ? {} : (isPhysicalStats ? { stroke: '#ffffff' } : (characterId === "vortex-a-steele" && !isPhysicalStats ? { stroke: '#a855f7' } : {}))}
                />
              );
            })}

            {/* Category dividers */}
            {isCombat && DIVIDER_CLOCK_POSITIONS.map((clockPos, dividerIndex) => {
              const dividerAngle = clockToRadians(clockPos);
              const startRadius = maxRadius * 0.05;
              const endRadius = maxRadius * 1.2;
              const startX = centerX + startRadius * Math.cos(dividerAngle);
              const startY = centerY + startRadius * Math.sin(dividerAngle);
              const endX = centerX + endRadius * Math.cos(dividerAngle);
              const endY = centerY + endRadius * Math.sin(dividerAngle);
              
              return (
                <line
                  key={`divider-${dividerIndex}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="12 6"
                  opacity="0.75"
                  className="category-divider"
                  style={isPhysicalStats ? { stroke: '#ffffff' } : {}}
                />
              );
            })}

            {/* Data area */}
            <path
              d={dataPath}
              fill="currentColor"
              className={shouldPulse ? "stat-radar-area" : "stat-radar-area opacity-40"}
              style={shouldPulse ? {} : (isPhysicalStats ? { fill: '#ffffff' } : {})}
            />
            <path
              d={dataPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="stat-radar-area"
              style={shouldPulse ? {} : (isPhysicalStats ? { stroke: '#ffffff' } : {})}
            />

            {/* Data points */}
            {dataPoints.map((point, i) => (
              <circle
                key={`point-${i}`}
                cx={point.x}
                cy={point.y}
                r="6"
                fill={isPhysicalStats ? '#ffffff' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '#a855f7' : 'currentColor')}
                className="stat-radar-point"
                style={shouldPulse ? {} : (isPhysicalStats ? { fill: '#ffffff' } : (characterId === "vortex-a-steele" && !isPhysicalStats ? { fill: '#a855f7' } : {}))}
              />
            ))}

            {/* Main category labels (positioned at specified clock positions) */}
            {isCombat && MAIN_CATEGORY_CLOCK_POSITIONS.map((clockPos, categoryIndex) => {
              const categoryNames = ['Strength', 'Agility', 'Precision', 'Intelligence', 'Durability'];
              const categoryAngle = clockToRadians(clockPos);
              const distance = getCategoryLabelDistance(categoryIndex);
              const categoryLabelPos = {
                x: centerX + distance * Math.cos(categoryAngle),
                y: centerY + distance * Math.sin(categoryAngle)
              };
              
              // Background rounded rectangle dimensions for visual indicator
              // Increased width to accommodate longer words like "Intelligence" and "Durability"
              const bgWidth = 140; // Width (2 * horizontal radius)
              const bgHeight = 36; // Height (2 * vertical radius)
              const cornerRadius = 8; // Smooth corner radius
              
              return (
                <g key={`category-group-${categoryIndex}`}>
                  {/* Background rounded rectangle as visual indicator */}
                  <rect
                    x={categoryLabelPos.x - bgWidth / 2}
                    y={categoryLabelPos.y - bgHeight / 2}
                    width={bgWidth}
                    height={bgHeight}
                    rx={cornerRadius}
                    ry={cornerRadius}
                    fill="rgba(0, 0, 0, 0.4)"
                    stroke={isPhysicalStats ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  {/* Category label text */}
                  <text
                    x={categoryLabelPos.x}
                    y={categoryLabelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-base font-extrabold"
                    fill={shouldPulse ? 'currentColor' : (isPhysicalStats ? '#ffffff' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '#a855f7' : 'currentColor'))}
                    stroke={shouldPulse ? undefined : (isPhysicalStats ? 'rgba(0, 0, 0, 0.6)' : undefined)}
                    strokeWidth={shouldPulse ? undefined : (isPhysicalStats ? '1.5' : undefined)}
                    paintOrder={shouldPulse ? undefined : (isPhysicalStats ? 'stroke fill' : undefined)}
                    style={shouldPulse ? {
                      fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                      fontWeight: '900',
                      letterSpacing: '0.04em',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                    } : (isPhysicalStats ? { 
                      fill: '#ffffff',
                      fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                      fontWeight: '900',
                      letterSpacing: '0.04em',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                    } : (characterId === "vortex-a-steele" && !isPhysicalStats ? {
                      fill: '#a855f7',
                      stroke: 'none',
                      color: '#a855f7',
                      fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                      fontWeight: '900',
                      letterSpacing: '0.04em'
                    } : {
                      fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                      fontWeight: '900',
                      letterSpacing: '0.04em'
                    }))}
                  >
                    {categoryNames[categoryIndex]}
                  </text>
                </g>
              );
            })}

            {/* Subcategory labels */}
            {statEntries.map((entry, index) => {
              const labelPos = calculateLabelPoint(index);
              const dataPoint = dataPoints[index];
              
              return (
                <g key={`label-${index}`}>
                  {/* Subcategory name */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-semibold"
                    fill={shouldPulse ? 'currentColor' : (isPhysicalStats ? '#ffffff' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '#a855f7' : 'currentColor'))}
                    stroke={shouldPulse ? undefined : (isPhysicalStats ? 'rgba(0, 0, 0, 0.4)' : (characterId === "vortex-a-steele" && !isPhysicalStats ? 'none' : undefined))}
                    strokeWidth={shouldPulse ? undefined : (isPhysicalStats ? '0.6' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '0' : undefined))}
                    paintOrder={shouldPulse ? undefined : (isPhysicalStats ? 'stroke fill' : undefined)}
                    style={shouldPulse ? {
                      fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)',
                      fontWeight: '600',
                      letterSpacing: '0.015em',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    } : (isPhysicalStats ? { 
                      fill: '#ffffff',
                      fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)',
                      fontWeight: '600',
                      letterSpacing: '0.015em',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    } : (characterId === "vortex-a-steele" && !isPhysicalStats ? {
                      fill: '#a855f7',
                      stroke: 'none',
                      color: '#a855f7',
                      fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)',
                      fontWeight: '600',
                      letterSpacing: '0.015em'
                    } : {
                      fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)',
                      fontWeight: '600',
                      letterSpacing: '0.015em'
                    }))}
                  >
                    {entry.label}
                  </text>
                  
                  {/* Grade label near the data point */}
                  <text
                    x={dataPoint.x}
                    y={dataPoint.y - 12}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold"
                    fill={shouldPulse ? 'currentColor' : '#ffffff'}
                    stroke={shouldPulse ? undefined : (isPhysicalStats ? 'rgba(0, 0, 0, 0.3)' : undefined)}
                    strokeWidth={shouldPulse ? undefined : (isPhysicalStats ? '0.5' : undefined)}
                    paintOrder={shouldPulse ? undefined : (isPhysicalStats ? 'stroke fill' : undefined)}
                    style={shouldPulse ? {
                      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                      fontWeight: '800',
                      letterSpacing: '0.025em',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    } : (isPhysicalStats ? { 
                      fill: '#ffffff',
                      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                      fontWeight: '800',
                      letterSpacing: '0.025em',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    } : {
                      fill: '#ffffff',
                      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                      fontWeight: '800',
                      letterSpacing: '0.025em'
                    })}
                  >
                    {entry.stat.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Statistics Information Segment */}
          <div className="flex flex-col items-center gap-4 w-full px-4 py-4">
            <p 
              className="text-center text-sm"
              style={{
                color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : (characterId === "vortex-a-steele" && !isPhysicalStats ? '#a855f7' : undefined)),
                textShadow: isPhysicalStats ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5)' : undefined
              }}
            >
              Curious about the meaning of a specific grade or statistic? Click the button to visit the Statistics page to learn more!
            </p>
            <Link to="/statistics">
              <Button 
                variant="outline"
                className="font-medium"
                style={{
                  color: shouldPulse ? undefined : (isPhysicalStats ? '#ffffff' : undefined),
                  borderColor: shouldPulse ? undefined : (isPhysicalStats ? 'rgba(255, 255, 255, 0.3)' : undefined),
                }}
              >
                Visit Statistics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

