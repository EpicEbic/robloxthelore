
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { WikiEntry, CategoryType } from "@/contexts/wiki-context";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";
import { memo } from "react";
import { motion } from "framer-motion";
import { getAlignmentColor } from "@/utils/character-utils";
import { useEasterEgg } from "@/contexts/easter-egg-context";
 

interface WikiEntryCardProps {
  entry: WikiEntry;
  imageDelay?: number;
}

export const WikiEntryCard = memo(function WikiEntryCard({ entry, imageDelay = 0 }: WikiEntryCardProps) {
  const { isEntryUnlocked } = useEasterEgg();
  const isLocked = !isEntryUnlocked(entry.id);

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

  // Alignment tokens styled like entry pages
  const renderAlignment = () => {
    if (!entry.alignment) return null;
    return (
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {entry.alignment.split("/").map((align, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 ${getAlignmentColor(align.trim())} text-white text-sm font-semibold rounded-full shadow-sm`}
          >
            {align.trim()}
          </span>
        ))}
      </div>
    );
  };

  const imageUrl = getImageUrl();
  const previewText = getPreviewText();
  // Unified layout for all entries
  const cardContent = (
    <motion.div layoutId={`entry-${entry.id}-card`} className="h-full">
      <Card className={cn(
        "overflow-hidden h-full group border-l-4 rounded-xl",
        isLocked ? "opacity-50 grayscale cursor-not-allowed" : "card-hover-character"
      )} 
        style={{ borderLeftColor: `var(--wiki-${entry.category})` }}>
          {imageUrl && (
            <div className="w-full overflow-hidden relative">
              <AspectRatio ratio={1} className="bg-muted/20">
                <OptimizedImage
                  src={imageUrl}
                  alt={entry.title}
                  className="w-full h-full opacity-0 animate-image-fade-in transition-transform duration-500 object-cover"
                  style={{ animationDelay: `${imageDelay}s` }}
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          )}
          <CardContent className="p-4 text-center space-y-3">
            <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
              {entry.title}
            </h3>
            {previewText && (
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {previewText}
              </p>
            )}
            {renderAlignment()}
          </CardContent>
        </Card>
      </motion.div>
  );

  if (isLocked) {
    return cardContent;
  }

  return (
    <Link to={`/entry/${entry.id}`}>
      {cardContent}
    </Link>
  );
});
