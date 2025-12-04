import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ParticleSettingsContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticleSettingsContext = createContext<ParticleSettingsContextType | undefined>(undefined);

const PARTICLES_COOKIE_NAME = 'lore_particles_enabled';
const COOKIE_EXPIRY_DAYS = 365;

// Cookie helper functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const ParticleSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to true (particles enabled), unless cookie says otherwise
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(() => {
    const cookieValue = getCookie(PARTICLES_COOKIE_NAME);
    if (cookieValue === null) {
      return true; // Default enabled
    }
    return cookieValue === 'true';
  });

  useEffect(() => {
    // Save to cookie whenever it changes
    setCookie(PARTICLES_COOKIE_NAME, particlesEnabled.toString(), COOKIE_EXPIRY_DAYS);
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

