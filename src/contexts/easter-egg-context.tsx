
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SecretPhraseIndicator } from '@/components/secret-phrase-indicator';

interface EasterEggContextType {
  isMinionMode: boolean;
  minionGifUrl: string;
  isCaesarSaladMode: boolean;
  caesarSaladImageUrl: string;
  unlockedEntries: Set<string>;
  unlockEntry: (entryId: string) => void;
  isEntryUnlocked: (entryId: string) => boolean;
  isTournamentUnlocked: boolean;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

interface EasterEggProviderProps {
  children: ReactNode;
}

// List of locked entry IDs
const LOCKED_ENTRIES = [
  'ren-bytera',
  'bloxxanne-whelder',
  'spawnboy',
  'charles-studson',
  'bryck-manning',
  'the-reckoner',
  'the-breadwinner'
];

// Valid secret phrases to track (with page restrictions)
const ALL_PHRASES = ['minion', 'whybother', 'salad', 'unlock'];

export function EasterEggProvider({ children }: EasterEggProviderProps) {
  const [isMinionMode, setIsMinionMode] = useState(false);
  const [isCaesarSaladMode, setIsCaesarSaladMode] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  const [unlockedEntries, setUnlockedEntries] = useState<Set<string>>(new Set());
  const [isTournamentUnlocked, setIsTournamentUnlocked] = useState(false);
  
  // Typing indicator state
  const [typingText, setTypingText] = useState('');
  const [isTypingError, setIsTypingError] = useState(false);
  const [isTypingVisible, setIsTypingVisible] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const minionGifUrl = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW84Znptazc2NDJqM24yejdzOGNxcjhuejduemlxbWh2aWJwbWdpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HIL3ItbTpfhGzbeXd5/giphy.gif';
  const caesarSaladImageUrl = '/lovable-uploads/a420f003-49ae-47d8-86ae-86a7be043834.png';

  // Check if we're on Caesar's entry page
  const isOnCaesarPage = location.pathname === '/entry/caesar-bloxwright';

  // Get valid phrases based on current page (for checking if phrase can be typed)
  const getValidPhrases = (): string[] => {
    // Allow typing all phrases, but activation will be page-specific
    return ALL_PHRASES;
  };

  // Check if a character matches any valid phrase (allows typing all phrases)
  const checkCharacterMatch = (currentText: string, newChar: string): boolean => {
    const validPhrases = getValidPhrases();
    // If we have existing text, check if adding the new char continues a valid phrase
    if (currentText) {
      const newText = currentText + newChar;
      return validPhrases.some(phrase => phrase.startsWith(newText));
    }
    // If we're starting fresh, check if the new char could start any valid phrase
    return validPhrases.some(phrase => phrase.startsWith(newChar));
  };

  // Reset typing indicator after timeout
  const resetTypingIndicator = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTypingVisible(false);
      setTypingText('');
      setIsTypingError(false);
    }, 5000);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only track alphanumeric characters
      const key = event.key.toLowerCase();
      if (!/^[a-z0-9]$/.test(key)) {
        return;
      }
      
      // Check if this character matches any valid phrase
      const matches = checkCharacterMatch(typingText, key);
      
      if (matches) {
        // Valid character - update typing indicator
        const newTypingText = typingText + key;
        setTypingText(newTypingText);
        setIsTypingError(false);
        setIsTypingVisible(true);
        resetTypingIndicator();
        
        // Check if we completed a phrase
        if (newTypingText === 'minion') {
          setIsMinionMode(!isMinionMode);
          setTypingText('');
          setIsTypingVisible(false);
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
        } else if (newTypingText === 'whybother') {
          navigate('/whybother');
          setTypingText('');
          setIsTypingVisible(false);
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
        } else if (newTypingText === 'salad') {
          if (isOnCaesarPage) {
            setIsCaesarSaladMode(!isCaesarSaladMode);
            setTypingText('');
            setIsTypingVisible(false);
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }
          } else {
            // Show error if not on Caesar's page
            setIsTypingError(true);
            setTimeout(() => {
              setTypingText('');
              setIsTypingError(false);
              setIsTypingVisible(false);
            }, 1000);
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }
          }
        } else if (newTypingText === 'unlock') {
          // Unlock all locked entries
          setUnlockedEntries(new Set(LOCKED_ENTRIES));
          // Unlock Tournament feature
          setIsTournamentUnlocked(true);
          setTypingText('');
          setIsTypingVisible(false);
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
        }
      } else {
        // Invalid character - show error with the incorrect character, then reset
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        
        setIsTypingError(true);
        setTypingText(key.toUpperCase()); // Show the incorrect character
        setIsTypingVisible(true);
        
        // Clear error state and hide after showing it briefly
        setTimeout(() => {
          setTypingText('');
          setIsTypingError(false);
          setIsTypingVisible(false);
        }, 300);
      }
      
      // Continue with existing sequence tracking for other phrases
      const newSequence = (keySequence + key).slice(-10);
      setKeySequence(newSequence);
      
      if (newSequence.includes('salad') && isOnCaesarPage) {
        setIsCaesarSaladMode(!isCaesarSaladMode);
        setKeySequence(''); // Reset sequence after activation
      } else if (newSequence.includes('unlock')) {
        // Unlock all locked entries
        setUnlockedEntries(new Set(LOCKED_ENTRIES));
        // Unlock Tournament feature
        setIsTournamentUnlocked(true);
        setKeySequence(''); // Reset sequence after activation
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
    }, [keySequence, isMinionMode, isCaesarSaladMode, isOnCaesarPage, navigate, typingText, location.pathname]);

  // Reset Caesar salad mode when leaving Caesar's page
  useEffect(() => {
    if (!isOnCaesarPage && isCaesarSaladMode) {
      setIsCaesarSaladMode(false);
    }
  }, [isOnCaesarPage, isCaesarSaladMode]);

  const unlockEntry = (entryId: string) => {
    setUnlockedEntries(prev => new Set([...prev, entryId]));
  };

  const isEntryUnlocked = (entryId: string) => {
    // If entry is not in locked list, it's always unlocked
    if (!LOCKED_ENTRIES.includes(entryId)) {
      return true;
    }
    // Otherwise, check if it's in the unlocked set
    return unlockedEntries.has(entryId);
  };

  const value = {
    isMinionMode,
    minionGifUrl,
    isCaesarSaladMode,
    caesarSaladImageUrl,
    unlockedEntries,
    unlockEntry,
    isEntryUnlocked,
    isTournamentUnlocked
  };

  return (
    <EasterEggContext.Provider value={value}>
      <div className={isMinionMode ? 'minion-mode' : ''}>
        <SecretPhraseIndicator
          text={typingText.toUpperCase()}
          isError={isTypingError}
          isVisible={isTypingVisible}
        />
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
