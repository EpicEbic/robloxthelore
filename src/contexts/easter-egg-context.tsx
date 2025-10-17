
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface EasterEggContextType {
  isMinionMode: boolean;
  minionGifUrl: string;
  isCaesarSaladMode: boolean;
  caesarSaladImageUrl: string;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

interface EasterEggProviderProps {
  children: ReactNode;
}

export function EasterEggProvider({ children }: EasterEggProviderProps) {
  const [isMinionMode, setIsMinionMode] = useState(false);
  const [isCaesarSaladMode, setIsCaesarSaladMode] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  const location = useLocation();
  const minionGifUrl = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW84Znptazc2NDJqM24yejdzOGNxcjhuejduemlxbWh2aWJwbWdpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HIL3ItbTpfhGzbeXd5/giphy.gif';
  const caesarSaladImageUrl = '/lovable-uploads/a420f003-49ae-47d8-86ae-86a7be043834.png';

  // Check if we're on Caesar's entry page
  const isOnCaesarPage = location.pathname === '/entry/caesar-bloxwright';

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = (keySequence + event.key.toLowerCase()).slice(-6);
      setKeySequence(newSequence);
      
      if (newSequence.includes('minion')) {
        setIsMinionMode(!isMinionMode);
        setKeySequence(''); // Reset sequence after activation
      } else if (newSequence.includes('salad') && isOnCaesarPage) {
        setIsCaesarSaladMode(!isCaesarSaladMode);
        setKeySequence(''); // Reset sequence after activation
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence, isMinionMode, isCaesarSaladMode, isOnCaesarPage]);

  // Reset Caesar salad mode when leaving Caesar's page
  useEffect(() => {
    if (!isOnCaesarPage && isCaesarSaladMode) {
      setIsCaesarSaladMode(false);
    }
  }, [isOnCaesarPage, isCaesarSaladMode]);

  const value = {
    isMinionMode,
    minionGifUrl,
    isCaesarSaladMode,
    caesarSaladImageUrl
  };

  return (
    <EasterEggContext.Provider value={value}>
      <div className={isMinionMode ? 'minion-mode' : ''}>
        {children}
      </div>
    </EasterEggContext.Provider>
  );
}

export function useEasterEgg() {
  const context = useContext(EasterEggContext);
  if (context === undefined) {
    throw new Error('useEasterEgg must be used within an EasterEggProvider');
  }
  return context;
}
