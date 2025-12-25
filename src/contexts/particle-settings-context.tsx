import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ParticleSettingsContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticleSettingsContext = createContext<ParticleSettingsContextType | undefined>(undefined);

const PARTICLES_STORAGE_KEY = 'lore_particles_enabled';

// localStorage helper functions
const getStoredParticlesSetting = (): boolean | null => {
  try {
    const stored = localStorage.getItem(PARTICLES_STORAGE_KEY);
    if (stored === null) {
      return null;
    }
    return stored === 'true';
  } catch (error) {
    console.error('Failed to read particles setting from localStorage:', error);
    return null;
  }
};

const setStoredParticlesSetting = (value: boolean): void => {
  try {
    localStorage.setItem(PARTICLES_STORAGE_KEY, value.toString());
  } catch (error) {
    console.error('Failed to save particles setting to localStorage:', error);
  }
};

export const ParticleSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to true (particles enabled), unless localStorage says otherwise
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(() => {
    const storedValue = getStoredParticlesSetting();
    if (storedValue === null) {
      return true; // Default enabled
    }
    return storedValue;
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    setStoredParticlesSetting(particlesEnabled);
  }, [particlesEnabled]);

  const toggleParticles = () => {
    setParticlesEnabled(prev => !prev);
  };

  return (
    <ParticleSettingsContext.Provider value={{ particlesEnabled, toggleParticles }}>
      {children}
    </ParticleSettingsContext.Provider>
  );
};

export const useParticleSettings = (): ParticleSettingsContextType => {
  const context = useContext(ParticleSettingsContext);
  if (context === undefined) {
    throw new Error('useParticleSettings must be used within a ParticleSettingsProvider');
  }
  return context;
};

