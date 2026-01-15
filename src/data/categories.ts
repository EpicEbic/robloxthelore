
import { CategoryStructure } from "@/types/wiki-types";

// Define our categories structure
export const CATEGORIES: CategoryStructure[] = [
  {
    type: "character",
    label: "Characters",
    subcategories: [
      { value: "all", label: "All Characters" },
      { value: "protagonist", label: "Protagonists" },
      { value: "neutral", label: "Deuteragonists" },
      { value: "evil", label: "Neutralists" },
      { value: "minor-antagonist", label: "Minor Antagonists" },
      { value: "major-antagonist", label: "Major Antagonists" },
      { value: "noncanon", label: "Non-Canon" }
    ]
  },
  {
    type: "equipment",
    label: "Objects",
    subcategories: [
      { value: "artifacts", label: "Artifacts" },
      { value: "standard", label: "Standard" },
      { value: "materials", label: "Materials" }
    ]
  },
  {
    type: "location",
    label: "Locations",
    subcategories: [
      { value: "all", label: "All Locations" },
      { value: "primarylocations", label: "Primary Locations" },
      { value: "secondarylocations", label: "Secondary Locations" },
      { value: "the-bloxiverse", label: "The Bloxiverse" }
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

// Utility function to get the default subcategory for a category
export function getDefaultSubcategory(categoryType: string): string {
  const categoryData = CATEGORIES.find(cat => cat.type === categoryType);
  if (!categoryData || categoryData.subcategories.length === 0) return 'all';
  
  // For equipment, return the first subcategory (artifacts)
  // For other categories, return 'all' if it exists, otherwise first subcategory
  const hasAll = categoryData.subcategories.some(sub => sub.value === 'all');
  if (hasAll) return 'all';
  return categoryData.subcategories[0].value;
}
