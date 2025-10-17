
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { WikiEntry, CategoryType } from "@/contexts/wiki-context";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";
import { memo } from "react";

interface WikiEntryCardProps {
  entry: WikiEntry;
  imageDelay?: number;
}

export const WikiEntryCard = memo(function WikiEntryCard({ entry, imageDelay = 0 }: WikiEntryCardProps) {
  const getCategoryStyle = (category: CategoryType) => {
    return `wiki-category-${category}`;
  };

  // Get the appropriate image for character entries
  const getImageUrl = () => {
    if (entry.category === "character") {
      // Use the first carousel image if available, otherwise fall back to imageUrl
      if (entry.carouselImages && entry.carouselImages.length > 0) {
        return entry.carouselImages[0].url;
      }
    }
    return entry.imageUrl;
  };

  // Get the appropriate preview text - use preview field if available, otherwise fall back to description
  const getPreviewText = () => {
    if (entry.preview) {
      return entry.preview;
    }
    
    if (entry.category === "character" && entry.sections?.personality && entry.sections.personality.length > 0) {
      // Handle both old string[] format and new PersonalityOption[] format
      const firstPersonality = entry.sections.personality[0];
      if (typeof firstPersonality === 'string') {
        return firstPersonality;
      } else if (firstPersonality && typeof firstPersonality === 'object' && 'description' in firstPersonality) {
        // For PersonalityOption, use the first description paragraph
        return firstPersonality.description[0];
      }
    }
    return entry.description;
  };

  // Get the proper subcategory label from the categories data
  const getSubcategoryLabel = () => {
    const categoryData = CATEGORIES.find(c => c.type === entry.category);
    const subcategoryData = categoryData?.subcategories.find(s => s.value === entry.subcategory);
    return subcategoryData?.label || entry.subcategory;
  };

  const imageUrl = getImageUrl();
  const previewText = getPreviewText();
  const subcategoryLabel = getSubcategoryLabel();

  return (
    <Link to={`/entry/${entry.id}`}>
      <Card className="overflow-hidden h-full group card-hover-lift card-3d border-l-4" 
        style={{ borderLeftColor: `var(--wiki-${entry.category})` }}>
        {imageUrl && (
          <div className="w-full overflow-hidden relative">
            <AspectRatio ratio={16/9} className="bg-muted/20">
              <OptimizedImage
                src={imageUrl}
                alt={entry.title}
                className="w-full h-full opacity-0 animate-image-fade-in transition-transform duration-500 group-hover:scale-110"
                style={{ animationDelay: `${imageDelay}s` }}
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )}
        <CardHeader className="pb-2 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">{entry.title}</CardTitle>
            <div className="flex items-center gap-1">
              <Badge 
                variant="outline"
                className={cn("font-normal transition-transform duration-300 group-hover:scale-105", getCategoryStyle(entry.category))}
              >
                {entry.category}
              </Badge>
              <Badge 
                variant="outline"
                className={cn("font-normal transition-transform duration-300 group-hover:scale-105", getCategoryStyle(entry.category))}
              >
                {subcategoryLabel}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-sm text-muted-foreground line-clamp-3 sm:line-clamp-2">{previewText}</p>
        </CardContent>
      </Card>
    </Link>
  );
});
