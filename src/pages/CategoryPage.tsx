import { useParams } from "react-router-dom";
import { useWiki, CategoryType, Subcategory } from "@/contexts/wiki-context";
import { WikiEntryCard } from "@/components/wiki-entry-card";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import { getSubcategoryLabel } from "@/data/categories";
import { useMemo } from "react";
import { CategoryHero } from "@/components/category-hero";
import { useEasterEgg } from "@/contexts/easter-egg-context";

const CategoryPage = () => {
  const { categoryType, subcategory: subcategoryParam } = useParams<{ categoryType: string; subcategory?: string }>();
  const subcategory = subcategoryParam || 'all';
  
  const { getEntriesByCategory, categories } = useWiki();
  const { isEntryUnlocked } = useEasterEgg();

  // Memoize validation to avoid recalculation
  const { validatedCategoryType, validatedSubcategory } = useMemo(() => {
    const validCategoryType = categories.some(c => c.type === categoryType) 
      ? categoryType as CategoryType
      : "character";

    const validSubcategory = categories
      .find(c => c.type === validCategoryType)
      ?.subcategories.some(s => s.value === subcategory)
      ? subcategory as Subcategory
      : "all";

    return { validatedCategoryType: validCategoryType, validatedSubcategory: validSubcategory };
  }, [categoryType, subcategory, categories]);

  // Memoize entries to avoid recalculation (show all entries, locked ones will be greyed out in WikiEntryCard)
  const entries = useMemo(() => {
    return getEntriesByCategory(validatedCategoryType, validatedSubcategory);
  }, [getEntriesByCategory, validatedCategoryType, validatedSubcategory]);

  // Group entries by subcategory when viewing "All Characters"
  const groupedEntries = useMemo(() => {
    if (validatedCategoryType === "character" && validatedSubcategory === "all") {
      // Group characters by subcategory
      const grouped = entries.reduce((groups, entry) => {
        const subcategory = entry.subcategory || 'other';
        if (!groups[subcategory]) {
          groups[subcategory] = [];
        }
        groups[subcategory].push(entry);
        return groups;
      }, {} as Record<string, typeof entries>);

      // Sort groups by a logical order (same as comparison page)
      const subcategoryOrder = ['protagonist', 'neutral', 'evil', 'minor-antagonist', 'major-antagonist', 'noncanon', 'other'];
      return Object.entries(grouped).sort(([a], [b]) => {
        const indexA = subcategoryOrder.indexOf(a);
        const indexB = subcategoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
      });
    }
    return null; // Don't group for other cases
  }, [entries, validatedCategoryType, validatedSubcategory]);

  // Memoize labels to avoid recalculation
  const { categoryLabel, subcategoryLabel } = useMemo(() => {
    const catLabel = categories.find(c => c.type === validatedCategoryType)?.label || "";
    const subLabel = categories
      .find(c => c.type === validatedCategoryType)
      ?.subcategories.find(s => s.value === validatedSubcategory)?.label || "";
    
    return { categoryLabel: catLabel, subcategoryLabel: subLabel };
  }, [categories, validatedCategoryType, validatedSubcategory]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <CategoryHero 
        categoryType={validatedCategoryType}
        categoryLabel={categoryLabel}
        subcategoryLabel={subcategoryLabel}
      />

      <div className="flex justify-center mb-10">
        <SearchBar />
      </div>

      {groupedEntries ? (
        // Grouped display for "All Characters"
        <div className="space-y-8">
          {groupedEntries.map(([subcategory, subcategoryEntries]) => (
            <div key={subcategory} className="space-y-4">
              <h2 className="text-2xl font-semibold text-muted-foreground">
                {getSubcategoryLabel("character", subcategory)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategoryEntries.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className="opacity-0 animate-card-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <WikiEntryCard entry={entry} imageDelay={index * 0.1 + 0.2} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Standard display for specific subcategories
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <div 
                key={entry.id} 
                className="opacity-0 animate-card-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <WikiEntryCard entry={entry} imageDelay={index * 0.1 + 0.2} />
              </div>
            ))
          ) : (
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-6 text-center">
              <p>No entries found for this category.</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
