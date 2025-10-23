import { CharacterTheme } from '@/types/character-theme-types';

/**
 * Utility functions for dual theme system
 * Makes it easy to expand for future characters
 */

export interface DualThemeConfig {
  leftTheme: CharacterTheme | null;
  rightTheme: CharacterTheme | null;
}

/**
 * Generate dynamic gradient combinations for any two character themes
 */
export const generateClashGradients = (left: CharacterTheme, right: CharacterTheme) => {
  // Brighten colors for more dramatic effect
  const brightenColor = (color: string, amount: number = 0.3) => {
    // Simple brightening by reducing darkness
    return color.replace(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i, (match, r, g, b) => {
      const newR = Math.min(255, parseInt(r, 16) + Math.floor(255 * amount));
      const newG = Math.min(255, parseInt(g, 16) + Math.floor(255 * amount));
      const newB = Math.min(255, parseInt(b, 16) + Math.floor(255 * amount));
      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    });
  };

  const leftBright = brightenColor(left.colors.primary, 0.4);
  const rightBright = brightenColor(right.colors.primary, 0.4);
  const leftSecondaryBright = brightenColor(left.colors.secondary, 0.3);
  const rightSecondaryBright = brightenColor(right.colors.secondary, 0.3);

  return {
    // Basic clash gradients - much brighter
    background: `linear-gradient(135deg, ${brightenColor(left.colors.background, 0.2)} 0%, ${brightenColor(right.colors.background, 0.2)} 100%)`,
    card: `linear-gradient(145deg, ${brightenColor(left.colors.surface, 0.2)} 0%, ${brightenColor(right.colors.surface, 0.2)} 100%)`,
    accent: `linear-gradient(45deg, ${leftBright} 0%, ${rightBright} 100%)`,
    
    // Enhanced dramatic gradients - sharp split in middle
    pageBackground: `linear-gradient(90deg, ${brightenColor(left.colors.background, 0.2)} 0%, ${brightenColor(left.colors.background, 0.2)} 50%, ${brightenColor(right.colors.background, 0.2)} 50%, ${brightenColor(right.colors.background, 0.2)} 100%)`,
    diagonalClash: `linear-gradient(45deg, ${leftBright} 0%, ${leftSecondaryBright} 49%, ${rightSecondaryBright} 51%, ${rightBright} 100%)`,
    verticalBlend: `linear-gradient(180deg, ${brightenColor(left.colors.background, 0.2)} 0%, ${brightenColor(left.colors.surface, 0.3)} 49%, ${brightenColor(right.colors.surface, 0.3)} 51%, ${brightenColor(right.colors.background, 0.2)} 100%)`,
    
    // Advanced mixing gradients - much brighter
    radialClash: `radial-gradient(ellipse at center, ${leftBright} 0%, ${rightBright} 100%)`,
    spiralMix: `conic-gradient(from 0deg, ${leftBright} 0deg, ${leftSecondaryBright} 90deg, ${rightSecondaryBright} 180deg, ${rightBright} 270deg, ${leftBright} 360deg)`,
    waveBlend: `linear-gradient(45deg, ${brightenColor(left.colors.background, 0.2)} 0%, ${leftBright} 25%, ${rightBright} 75%, ${brightenColor(right.colors.background, 0.2)} 100%)`
  };
};

/**
 * Generate character-specific CSS class names
 * Automatically handles any character ID for easy expansion
 */
export const getCharacterThemeClasses = (characterId: string, side: 'left' | 'right') => {
  return {
    base: `character-theme-${characterId}-${side}`,
    dual: `dual-theme-${side}`,
    slot: `comparison-slot-${side}`
  };
};

/**
 * Calculate particle spawn rates based on character theme
 * Quadrupled for comparison page emphasis
 */
export const getComparisonParticleRates = (theme: CharacterTheme) => {
  const baseRates = {
    radio: 0.012,
    flow: 0.025,
    speed: 0.08,
    lightning: 0.025,
    clock: 0.025,
    sparkle: 0.025,
    default: 0.025
  };
  
  const particleType = theme.particles.type;
  const baseRate = baseRates[particleType] || baseRates.default;
  
  return {
    spawnChance: baseRate * 8, // Octupled for dramatic page-filling effect
    maxParticles: 500, // Much higher limit to fill the page
    intensity: theme.particles.intensity * 2.0, // Double intensity for brightness
    distribution: 'full-page' // Ensure particles fill entire page
  };
};

/**
 * Generate position-aware theme configuration
 * Ensures theming works regardless of character placement
 */
export const createPositionAwareTheme = (config: DualThemeConfig) => {
  const { leftTheme, rightTheme } = config;
  
  if (!leftTheme && !rightTheme) {
    return { left: null, right: null, clash: null };
  }
  
  if (leftTheme && rightTheme) {
    return {
      left: leftTheme,
      right: rightTheme,
      clash: generateClashGradients(leftTheme, rightTheme)
    };
  }
  
  // Single theme scenarios
  const singleTheme = leftTheme || rightTheme;
  const side = leftTheme ? 'left' : 'right';
  
  return {
    left: side === 'left' ? singleTheme : null,
    right: side === 'right' ? singleTheme : null,
    clash: null
  };
};

/**
 * Get theme intensity multiplier based on number of characters
 */
export const getThemeIntensity = (leftTheme: CharacterTheme | null, rightTheme: CharacterTheme | null) => {
  if (leftTheme && rightTheme) {
    return 1.5; // Full dual theme intensity
  } else if (leftTheme || rightTheme) {
    return 1.0; // Single theme intensity
  }
  return 0.5; // Default theme intensity
};

/**
 * Generate modular CSS variables for any character combination
 */
export const generateThemeVariables = (config: DualThemeConfig) => {
  const { leftTheme, rightTheme } = config;
  const variables: Record<string, string> = {};
  
  if (leftTheme) {
    Object.entries(leftTheme.colors).forEach(([key, value]) => {
      variables[`--left-${key}`] = value;
    });
    Object.entries(leftTheme.gradients).forEach(([key, value]) => {
      variables[`--left-gradient-${key}`] = value;
    });
  }
  
  if (rightTheme) {
    Object.entries(rightTheme.colors).forEach(([key, value]) => {
      variables[`--right-${key}`] = value;
    });
    Object.entries(rightTheme.gradients).forEach(([key, value]) => {
      variables[`--right-gradient-${key}`] = value;
    });
  }
  
  if (leftTheme && rightTheme) {
    const clashGradients = generateClashGradients(leftTheme, rightTheme);
    Object.entries(clashGradients).forEach(([key, value]) => {
      variables[`--clash-gradient-${key}`] = value;
    });
  }
  
  return variables;
};

/**
 * Validate character theme compatibility
 * Useful for ensuring themes work well together
 */
export const validateThemeCompatibility = (left: CharacterTheme, right: CharacterTheme) => {
  const warnings: string[] = [];
  
  // Check for similar colors that might blend too much
  if (left.colors.primary === right.colors.primary) {
    warnings.push('Both characters have identical primary colors - clash effect may be minimal');
  }
  
  // Check for high contrast combinations
  const leftLuminance = getLuminance(left.colors.primary);
  const rightLuminance = getLuminance(right.colors.primary);
  const contrast = Math.abs(leftLuminance - rightLuminance);
  
  if (contrast < 0.3) {
    warnings.push('Low contrast between character themes - consider adjusting colors');
  }
  
  return {
    compatible: warnings.length === 0,
    warnings
  };
};

/**
 * Calculate relative luminance of a color
 */
const getLuminance = (color: string): number => {
  // Simple luminance calculation for hex colors
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  return 0.299 * r + 0.587 * g + 0.114 * b;
};
