import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { CharacterTheme } from '@/types/character-theme-types';
import { generateClashGradients, generateThemeVariables } from '@/utils/dual-theme-utils';

interface DualThemeContextType {
  leftTheme: CharacterTheme | null;
  rightTheme: CharacterTheme | null;
  setLeftTheme: (theme: CharacterTheme | null) => void;
  setRightTheme: (theme: CharacterTheme | null) => void;
  applyDualTheme: (leftTheme: CharacterTheme | null, rightTheme: CharacterTheme | null) => void;
  resetDualTheme: () => void;
}

const DualThemeContext = createContext<DualThemeContextType | undefined>(undefined);

interface DualThemeProviderProps {
  children: ReactNode;
}

export const DualThemeProvider: React.FC<DualThemeProviderProps> = ({ children }) => {
  const [leftTheme, setLeftTheme] = useState<CharacterTheme | null>(null);
  const [rightTheme, setRightTheme] = useState<CharacterTheme | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const prevThemeIdsRef = useRef<{left: string | null, right: string | null}>({left: null, right: null});

  const applyDualTheme = (left: CharacterTheme | null, right: CharacterTheme | null) => {
    const root = document.documentElement;
    
    // Store current theme IDs before changes
    const currentThemeIds = {
      left: left?.id || null,
      right: right?.id || null
    };
    const prevThemeIds = prevThemeIdsRef.current;
    
    // Clear existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    // Detect if this is theme change vs initial load
    const isInitialLoad = prevThemeIds.left === null && prevThemeIds.right === null;
    const isThemeSwap = !isInitialLoad && (prevThemeIds.left !== currentThemeIds.left || prevThemeIds.right !== currentThemeIds.right);
    
    const applyThemeVariables = () => {
      // Clear existing dual theme variables
      const dualThemeVars = [
        '--left-primary', '--left-secondary', '--left-accent', '--left-background', '--left-surface', '--left-text',
        '--right-primary', '--right-secondary', '--right-accent', '--right-background', '--right-surface', '--right-text',
        '--left-gradient-background', '--left-gradient-card', '--left-gradient-accent',
        '--right-gradient-background', '--right-gradient-card', '--right-gradient-accent',
        '--clash-gradient-background', '--clash-gradient-card', '--clash-gradient-accent',
        '--clash-gradient-pageBackground', '--clash-gradient-diagonalClash', '--clash-gradient-verticalBlend'
      ];
      
      dualThemeVars.forEach(varName => {
        root.style.removeProperty(varName);
      });
      
      // Remove existing dual theme classes
      document.body.className = document.body.className.replace(/dual-theme-\w+/g, '');
      
      if (left && right) {
        // Apply left theme variables
        Object.entries(left.colors).forEach(([key, value]) => {
          root.style.setProperty(`--left-${key}`, value);
        });
        Object.entries(left.gradients).forEach(([key, value]) => {
          root.style.setProperty(`--left-gradient-${key}`, value);
        });
        
        // Apply right theme variables
        Object.entries(right.colors).forEach(([key, value]) => {
          root.style.setProperty(`--right-${key}`, value);
        });
        Object.entries(right.gradients).forEach(([key, value]) => {
          root.style.setProperty(`--right-gradient-${key}`, value);
        });
        
        // Generate dynamic clash gradients using utility function
        const clashGradients = generateClashGradients(left, right);
        
        Object.entries(clashGradients).forEach(([key, value]) => {
          root.style.setProperty(`--clash-gradient-${key}`, value);
        });
        
        // Add dual theme class
        document.body.classList.add('dual-theme-active');
      } else if (left) {
        // Only left theme
        Object.entries(left.colors).forEach(([key, value]) => {
          root.style.setProperty(`--left-${key}`, value);
        });
        Object.entries(left.gradients).forEach(([key, value]) => {
          root.style.setProperty(`--left-gradient-${key}`, value);
        });
        document.body.classList.add('dual-theme-left-only');
      } else if (right) {
        // Only right theme
        Object.entries(right.colors).forEach(([key, value]) => {
          root.style.setProperty(`--right-${key}`, value);
        });
        Object.entries(right.gradients).forEach(([key, value]) => {
          root.style.setProperty(`--right-gradient-${key}`, value);
        });
        document.body.classList.add('dual-theme-right-only');
      }
    };
    
    if (isInitialLoad) {
      // Initial load - apply theme variables immediately, then fade in after delay
      applyThemeVariables();
      const timeout = setTimeout(() => {
        document.body.classList.add('dual-theme-fade-in');
      }, 1000);
      timeoutRefs.current.push(timeout);
    } else if (isThemeSwap) {
      // Theme swap - fade out, apply new theme, fade in
      document.body.classList.add('dual-theme-fade-out');
      const timeout1 = setTimeout(() => {
        applyThemeVariables();
        document.body.classList.add('dual-theme-fade-in');
        const timeout2 = setTimeout(() => {
          document.body.classList.remove('dual-theme-fade-in');
        }, 800);
        timeoutRefs.current.push(timeout2);
      }, 600);
      timeoutRefs.current.push(timeout1);
    } else {
      // No theme change, just apply variables
      applyThemeVariables();
    }
    
    // Update previous theme IDs
    prevThemeIdsRef.current = currentThemeIds;
    
    setLeftTheme(left);
    setRightTheme(right);
  };

  const resetDualTheme = () => {
    const root = document.documentElement;
    
    // Clear existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    // Add fade-out class
    document.body.classList.add('dual-theme-fade-out');
    
    const timeout = setTimeout(() => {
      // Remove all dual theme variables
      const dualThemeVars = [
        '--left-primary', '--left-secondary', '--left-accent', '--left-background', '--left-surface', '--left-text',
        '--right-primary', '--right-secondary', '--right-accent', '--right-background', '--right-surface', '--right-text',
        '--left-gradient-background', '--left-gradient-card', '--left-gradient-accent',
        '--right-gradient-background', '--right-gradient-card', '--right-gradient-accent',
        '--clash-gradient-background', '--clash-gradient-card', '--clash-gradient-accent',
        '--clash-gradient-pageBackground', '--clash-gradient-diagonalClash', '--clash-gradient-verticalBlend'
      ];
      
      dualThemeVars.forEach(varName => {
        root.style.removeProperty(varName);
      });
      
      // Remove dual theme classes
      document.body.className = document.body.className.replace(/dual-theme-\w+/g, '');
      
      // Clear previous theme IDs
      prevThemeIdsRef.current = {left: null, right: null};
    }, 600);
    
    timeoutRefs.current.push(timeout);
    
    setLeftTheme(null);
    setRightTheme(null);
  };

  const value: DualThemeContextType = {
    leftTheme,
    rightTheme,
    setLeftTheme,
    setRightTheme,
    applyDualTheme,
    resetDualTheme,
  };

  // Cleanup timeouts and theme classes on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      
      // Remove all dual theme classes and variables
      const root = document.documentElement;
      const dualThemeVars = [
        '--left-primary', '--left-secondary', '--left-accent', '--left-background', '--left-surface', '--left-text',
        '--right-primary', '--right-secondary', '--right-accent', '--right-background', '--right-surface', '--right-text',
        '--left-gradient-background', '--left-gradient-card', '--left-gradient-accent',
        '--right-gradient-background', '--right-gradient-card', '--right-gradient-accent',
        '--clash-gradient-background', '--clash-gradient-card', '--clash-gradient-accent',
        '--clash-gradient-pageBackground', '--clash-gradient-diagonalClash', '--clash-gradient-verticalBlend'
      ];
      
      dualThemeVars.forEach(varName => {
        root.style.removeProperty(varName);
      });
      
      // Remove dual theme classes
      document.body.className = document.body.className.replace(/dual-theme-\w+/g, '');
      
      // Reset state
      setLeftTheme(null);
      setRightTheme(null);
      prevThemeIdsRef.current = {left: null, right: null};
    };
  }, []);

  return (
    <DualThemeContext.Provider value={value}>
      {children}
    </DualThemeContext.Provider>
  );
};

export const useDualTheme = (): DualThemeContextType => {
  const context = useContext(DualThemeContext);
  if (context === undefined) {
    throw new Error('useDualTheme must be used within a DualThemeProvider');
  }
  return context;
};
