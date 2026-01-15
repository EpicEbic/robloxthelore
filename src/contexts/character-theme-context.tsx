import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CharacterTheme } from '@/types/character-theme-types';

interface CharacterThemeContextType {
  currentTheme: CharacterTheme | null;
  setCurrentTheme: (theme: CharacterTheme | null) => void;
  applyTheme: (theme: CharacterTheme) => void;
  resetTheme: () => void;
}

const CharacterThemeContext = createContext<CharacterThemeContextType | undefined>(undefined);

interface CharacterThemeProviderProps {
  children: ReactNode;
  characterId?: string;
}

export const CharacterThemeProvider: React.FC<CharacterThemeProviderProps> = ({ 
  children, 
  characterId 
}) => {
  const [currentTheme, setCurrentTheme] = useState<CharacterTheme | null>(null);

  const applyTheme = (theme: CharacterTheme) => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--character-${key}`, value);
    });
    
    // Apply gradient variables
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--character-gradient-${key}`, value);
    });
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/character-theme-[a-z0-9-]+/g, '').trim();
    document.body.classList.add(`character-theme-${theme.id}`);
    
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
    document.body.className = document.body.className.replace(/character-theme-[a-z0-9-]+/g, '').trim();
    
    setCurrentTheme(null);
  };

  // Load theme when characterId changes
  useEffect(() => {
    if (characterId) {
      // Dynamic import to avoid circular dependencies
      import('@/data/character-themes').then(({ getCharacterTheme }) => {
        const theme = getCharacterTheme(characterId);
        if (theme) {
          applyTheme(theme);
        } else {
          resetTheme();
        }
      });
    } else {
      resetTheme();
    }

    // Cleanup on unmount
    return () => {
      resetTheme();
    };
  }, [characterId]);

  const value: CharacterThemeContextType = {
    currentTheme,
    setCurrentTheme,
    applyTheme,
    resetTheme,
  };

  return (
    <CharacterThemeContext.Provider value={value}>
      {children}
    </CharacterThemeContext.Provider>
  );
};

export const useCharacterTheme = (): CharacterThemeContextType => {
  const context = useContext(CharacterThemeContext);
  if (context === undefined) {
    // Return a default context if not within provider (to allow conditional usage)
    return {
      currentTheme: null,
      setCurrentTheme: () => {},
      applyTheme: () => {},
      resetTheme: () => {},
    };
  }
  return context;
};
