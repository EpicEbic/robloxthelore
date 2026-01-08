import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LockContextType {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

const STORAGE_KEY = "lore-unlock-status";

export const LockProvider = ({ children }: { children: ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isUnlocked.toString());
  }, [isUnlocked]);

  const unlock = () => {
    setIsUnlocked(true);
  };

  const lock = () => {
    setIsUnlocked(false);
  };

  return (
    <LockContext.Provider value={{ isUnlocked, unlock, lock }}>
      {children}
    </LockContext.Provider>
  );
};

export const useLock = () => {
  const context = useContext(LockContext);
  if (!context) {
    throw new Error("useLock must be used within a LockProvider");
  }
  return context;
};

