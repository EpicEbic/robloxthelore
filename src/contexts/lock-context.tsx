import { createContext, useContext, useState, ReactNode } from "react";

interface LockContextType {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export const LockProvider = ({ children }: { children: ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(true); // TEMPORARILY DISABLED FOR DEVELOPMENT

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

