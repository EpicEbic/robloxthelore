import { useEffect } from 'react';
import { CharacterTheme } from '@/types/character-theme-types';

/**
 * Converts a hex color to RGB components
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '255, 255, 255'; // Fallback to white
}

/**
 * useThemeStyles - Applies theme's glow and glass settings as CSS variables
 * 
 * This hook takes a CharacterTheme and applies its glow/glass configuration
 * to the document root as CSS custom properties, enabling the glass-morphism
 * and glow utilities to respond to the current theme.
 */
export function useThemeStyles(theme: CharacterTheme | null | undefined) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Apply glow variables
    if (theme.glow) {
      root.style.setProperty('--glow-color', theme.glow.primary);
      root.style.setProperty('--glow-color-rgb', hexToRgb(theme.glow.primary));
      root.style.setProperty('--glow-secondary', theme.glow.secondary);
      root.style.setProperty('--glow-secondary-rgb', hexToRgb(theme.glow.secondary));
      root.style.setProperty('--glow-blur', `${theme.glow.blur}px`);
      root.style.setProperty('--glow-spread', `${theme.glow.spread}px`);
      
      // Set intensity-based opacity
      const opacityMap = {
        subtle: '0.3',
        moderate: '0.4',
        intense: '0.55',
      };
      root.style.setProperty('--glow-opacity', opacityMap[theme.glow.intensity]);
    } else {
      // Use primary color as fallback for glow
      root.style.setProperty('--glow-color', theme.colors.primary);
      root.style.setProperty('--glow-color-rgb', hexToRgb(theme.colors.primary));
      root.style.setProperty('--glow-secondary', theme.colors.accent);
      root.style.setProperty('--glow-secondary-rgb', hexToRgb(theme.colors.accent));
      root.style.setProperty('--glow-blur', '12px');
      root.style.setProperty('--glow-spread', '2px');
      root.style.setProperty('--glow-opacity', '0.4');
    }

    // Apply glass variables
    if (theme.glass) {
      root.style.setProperty('--glass-blur', `${theme.glass.blur}px`);
      root.style.setProperty('--glass-bg-opacity', theme.glass.opacity.toString());
      root.style.setProperty('--glass-border-opacity', theme.glass.borderOpacity.toString());
      root.style.setProperty('--glass-tint', theme.glass.tint);
      root.style.setProperty('--glass-tint-rgb', hexToRgb(theme.glass.tint));
    } else {
      // Use surface color as fallback for glass tint
      root.style.setProperty('--glass-blur', '8px');
      root.style.setProperty('--glass-bg-opacity', '0.15');
      root.style.setProperty('--glass-border-opacity', '0.2');
      root.style.setProperty('--glass-tint', theme.colors.surface);
      root.style.setProperty('--glass-tint-rgb', hexToRgb(theme.colors.surface));
    }

    // Cleanup function to reset variables when unmounting
    return () => {
      // Reset to defaults when theme is removed
      root.style.removeProperty('--glow-color');
      root.style.removeProperty('--glow-color-rgb');
      root.style.removeProperty('--glow-secondary');
      root.style.removeProperty('--glow-secondary-rgb');
      root.style.removeProperty('--glow-blur');
      root.style.removeProperty('--glow-spread');
      root.style.removeProperty('--glow-opacity');
      root.style.removeProperty('--glass-blur');
      root.style.removeProperty('--glass-bg-opacity');
      root.style.removeProperty('--glass-border-opacity');
      root.style.removeProperty('--glass-tint');
      root.style.removeProperty('--glass-tint-rgb');
    };
  }, [theme]);
}

/**
 * getThemeStyleVars - Returns CSS variable object for inline styling
 * 
 * Use this when you need to apply theme styles to a specific element
 * rather than the document root.
 */
export function getThemeStyleVars(theme: CharacterTheme): React.CSSProperties {
  const glowOpacityMap = {
    subtle: 0.3,
    moderate: 0.4,
    intense: 0.55,
  };

  return {
    '--glow-color': theme.glow?.primary || theme.colors.primary,
    '--glow-color-rgb': hexToRgb(theme.glow?.primary || theme.colors.primary),
    '--glow-secondary': theme.glow?.secondary || theme.colors.accent,
    '--glow-secondary-rgb': hexToRgb(theme.glow?.secondary || theme.colors.accent),
    '--glow-blur': `${theme.glow?.blur || 12}px`,
    '--glow-spread': `${theme.glow?.spread || 2}px`,
    '--glow-opacity': glowOpacityMap[theme.glow?.intensity || 'moderate'].toString(),
    '--glass-blur': `${theme.glass?.blur || 8}px`,
    '--glass-bg-opacity': (theme.glass?.opacity || 0.15).toString(),
    '--glass-border-opacity': (theme.glass?.borderOpacity || 0.2).toString(),
    '--glass-tint': theme.glass?.tint || theme.colors.surface,
    '--glass-tint-rgb': hexToRgb(theme.glass?.tint || theme.colors.surface),
  } as React.CSSProperties;
}

