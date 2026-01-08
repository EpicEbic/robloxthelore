import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { WikiEntry, CategoryType, Subcategory, CategoryStructure } from "@/types/wiki-types";
import { CATEGORIES } from "@/data/categories";
import { sampleWikiEntries } from "@/data/sample-wiki-entries";
import { usePart } from "./part-context";

// Context interface
interface WikiContextType {
  entries: WikiEntry[];
  addEntry: (entry: Omit<WikiEntry, "id" | "lastUpdated">) => void;
  updateEntry: (entry: WikiEntry) => void;
  deleteEntry: (id: string) => void;
  getEntriesByCategory: (category: CategoryType, subcategory?: Subcategory) => WikiEntry[];
  getEntryById: (id: string) => WikiEntry | undefined;
  searchEntries: (query: string) => WikiEntry[];
  categories: CategoryStructure[];
}

const WikiContext = createContext<WikiContextType | undefined>(undefined);

export const WikiProvider = ({ children }: { children: ReactNode }) => {
  console.log("WikiProvider rendering...");
  const [allEntries, setAllEntries] = useState<WikiEntry[]>(sampleWikiEntries);
  
  // Get current part from PartContext (PartProvider should wrap this)
  const { currentPart } = usePart();
  
  // Filter entries by current part
  const entries = useMemo(() => {
    return allEntries.filter(entry => {
      const entryPart = entry.part || "TEMP";
      
      // Explicitly exclude Part 1 entries from TEMP view
      if (currentPart === "TEMP" && entryPart === "Part 1") {
        return false;
      }
      
      // Only show entries that match the current part
      return entryPart === currentPart;
    });
  }, [allEntries, currentPart]);

  const addEntry = (entryData: Omit<WikiEntry, "id" | "lastUpdated">) => {
    const newEntry: WikiEntry = {
      ...entryData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setAllEntries([...allEntries, newEntry]);
  };

  const updateEntry = (updatedEntry: WikiEntry) => {
    setAllEntries(allEntries.map(entry => 
      entry.id === updatedEntry.id 
        ? { ...updatedEntry, lastUpdated: new Date().toISOString().split('T')[0] } 
        : entry
    ));
  };

  const deleteEntry = (id: string) => {
    setAllEntries(allEntries.filter(entry => entry.id !== id));
  };

  const getEntriesByCategory = (category: CategoryType, subcategory?: Subcategory) => {
    return entries.filter(entry => 
      // The Reckoner should now be displayable if it matches the category/subcategory filter
      entry.category === category && 
      (subcategory ? entry.subcategory === subcategory || subcategory === "all" : true)
    );
  };

  const getEntryById = (id: string) => {
    // Search in allEntries to allow access to entries from any part via direct link
    return allEntries.find(entry => entry.id === id);
  };

  const searchEntries = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    return entries.filter(entry => 
      // Exclude The Reckoner from search results
      entry.id !== "the-reckoner" &&
      (entry.title.toLowerCase().includes(normalizedQuery) || 
      entry.description.toLowerCase().includes(normalizedQuery) ||
      entry.content.toLowerCase().includes(normalizedQuery))
    );
  };

  const contextValue = { 
    entries, 
    addEntry, 
    updateEntry, 
    deleteEntry, 
    getEntriesByCategory,
    getEntryById,
    searchEntries,
    categories: CATEGORIES
  };

  console.log("WikiProvider context value:", contextValue);

  return (
    <WikiContext.Provider value={contextValue}>
      {children}
    </WikiContext.Provider>
  );
};

export const useWiki = () => {
  console.log("useWiki called...");
  const context = useContext(WikiContext);
  console.log("useWiki context:", context);
  if (!context) {
    console.error("useWiki must be used within a WikiProvider - context is undefined");
    throw new Error("useWiki must be used within a WikiProvider");
  }
  return context;
};

// Re-export types for backward compatibility
export type { CategoryType, Subcategory, WikiEntry, CategoryStructure } from "@/types/wiki-types";
