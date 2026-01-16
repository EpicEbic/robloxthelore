import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Part = "Part 1" | "TEMP";

interface PartContextType {
  currentPart: Part;
  setCurrentPart: (part: Part) => void;
  availableParts: Part[];
}

const PartContext = createContext<PartContextType | undefined>(undefined);

const STORAGE_KEY = "lore-current-part";
const DEFAULT_PART: Part = "Part 1";

export const PartProvider = ({ children }: { children: ReactNode }) => {
  const [currentPart, setCurrentPartState] = useState<Part>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "Part 1" || saved === "TEMP") {
      return saved as Part;
    }
    return DEFAULT_PART;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentPart);
  }, [currentPart]);

  const setCurrentPart = (part: Part) => {
    setCurrentPartState(part);
  };

  const availableParts: Part[] = ["Part 1", "TEMP"];

  return (
    <PartContext.Provider value={{ currentPart, setCurrentPart, availableParts }}>
      {children}
    </PartContext.Provider>
  );
};

export const usePart = () => {
  const context = useContext(PartContext);
  if (!context) {
    throw new Error("usePart must be used within a PartProvider");
  }
  return context;
};

