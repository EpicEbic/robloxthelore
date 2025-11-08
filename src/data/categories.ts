
import { CategoryStructure } from "@/types/wiki-types";

// Define our categories structure
export const CATEGORIES: CategoryStructure[] = [
  {
    type: "character",
    label: "Characters",
    subcategories: [
      { value: "all", label: "All Characters" },
      { value: "protagonist", label: "Protagonist" },
      { value: "neutral", label: "Deuteragonist" },
      { value: "evil", label: "Neutralist" },
      { value: "minor-antagonist", label: "Minor Antagonist" },
      { value: "major-antagonist", label: "Major Antagonist" },
      { value: "noncanon", label: "Non-Canon" }
    ]
  },
  {
    type: "equipment",
    label: "Equipment",
    subcategories: [
      { value: "all", label: "All Equipment" },
      { value: "standard", label: "Ordinary" },
      { value: "artifacts", label: "Artifacts" }
    ]
  },
  {
    type: "location",
    label: "Locations",
    subcategories: [
      { value: "all", label: "All Locations" },
      { value: "world-map", label: "World Map" },
      { value: "bloxiverse", label: "The Bloxiverse" },
      { value: "primarylocations", label: "Primary Locations" },
      { value: "secondarylocations", label: "Secondary Locations" }
    ]
  },
  {
    type: "faction",
    label: "Factions",
    subcategories: [
      { value: "all", label: "All Factions" },
      { value: "friendly", label: "Friendly" },
      { value: "neutral", label: "Neutral" },
      { value: "hostile", label: "Hostile" }
    ]
  }
];

// Utility function to get the display label for a subcategory
export function getSubcategoryLabel(category: string, subcategory: string): string {
  const categoryData = CATEGORIES.find(cat => cat.type === category);
  if (!categoryData) return subcategory;
  
  const subcategoryData = categoryData.subcategories.find(sub => sub.value === subcategory);
  return subcategoryData?.label || subcategory;
}
