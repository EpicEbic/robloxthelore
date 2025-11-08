import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CharacterTheme } from '@/types/character-theme-types';

interface LocationThemeContextType {
  currentTheme: CharacterTheme | null;
  setCurrentTheme: (theme: CharacterTheme | null) => void;
  applyTheme: (theme: CharacterTheme) => void;
  resetTheme: () => void;
}

const LocationThemeContext = createContext<LocationThemeContextType | undefined>(undefined);

interface LocationThemeProviderProps {
  children: ReactNode;
  locationId?: string;
}

export const LocationThemeProvider: React.FC<LocationThemeProviderProps> = ({ 
  children, 
  locationId 
}) => {
  const [currentTheme, setCurrentTheme] = useState<CharacterTheme | null>(null);
  
  console.log('LocationThemeProvider rendered with locationId:', locationId);

  const applyTheme = (theme: CharacterTheme) => {
    console.log('Applying location theme:', theme);
    const root = document.documentElement;
    
    // Apply color variables (using character- prefix for compatibility)
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--character-${key}`, value);
      console.log(`Set --character-${key}: ${value}`);
    });
    
    // Apply gradient variables
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--character-gradient-${key}`, value);
      console.log(`Set --character-gradient-${key}: ${value}`);
    });
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/character-theme-[\w-]+/g, '');
    document.body.classList.add(`character-theme-${theme.id}`);
    console.log('Added body class:', `character-theme-${theme.id}`);
    
    setCurrentTheme(theme);
  };

  const resetTheme = () => {
    const root = document.documentElement;
    
    // Remove character-specific CSS variables
    const characterVars = [
      '--character-primary',
      '--character-secondary', 
      '--character-accent',
      '--character-background',
      '--character-surface',
      '--character-text',
      '--character-gradient-background',
      '--character-gradient-card',
      '--character-gradient-accent'
    ];
    
    characterVars.forEach(varName => {
      root.style.removeProperty(varName);
    });
    
    // Remove theme class from body
    document.body.className = document.body.className.replace(/character-theme-[\w-]+/g, '');
    
    setCurrentTheme(null);
  };

  // Load theme when locationId changes
  useEffect(() => {
    console.log('LocationThemeProvider: locationId changed to:', locationId);
    if (locationId) {
      // Dynamic import to avoid circular dependencies
      import('@/data/location-themes').then(({ getLocationTheme }) => {
        const theme = getLocationTheme(locationId);
        console.log('Loaded theme for', locationId, ':', theme);
        if (theme) {
          applyTheme(theme);
        } else {
          console.log('No theme found for', locationId, ', resetting theme');
          resetTheme();
        }
      });
    } else {
      console.log('No locationId, resetting theme');
      resetTheme();
    }

    // Cleanup on unmount
    return () => {
      resetTheme();
    };
  }, [locationId]);

  const value: LocationThemeContextType = {
    currentTheme,
    setCurrentTheme,
    applyTheme,
    resetTheme,
  };

  return (
    <LocationThemeContext.Provider value={value}>
      {children}
    </LocationThemeContext.Provider>
  );
};

export const useLocationTheme = (): LocationThemeContextType => {
  const context = useContext(LocationThemeContext);
  if (context === undefined) {
    // Return a default context if not within provider
    return {
      currentTheme: null,
      setCurrentTheme: () => {},
      applyTheme: () => {},
      resetTheme: () => {},
    };
  }
  return context;
};

