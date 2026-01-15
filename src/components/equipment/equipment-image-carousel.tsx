import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ImageZoomDialog } from "@/components/ui/image-zoom-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo, useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { CharacterCarouselItem } from "../character/character-carousel-item";
import { EquipmentOverviewOption, EquipmentTimelineOption } from "@/types/wiki-types";

interface CarouselImage {
  url: string;
  caption: string;
}

interface EquipmentImageCarouselProps {
  images: CarouselImage[];
  imageUrl?: string;
  sections?: any;
  currentAppearance?: string;
  currentTimeline?: string; 
  currentTab?: string;
}

export const EquipmentImageCarousel = memo(function EquipmentImageCarousel({ 
  images, 
  imageUrl,
  sections = {},
  currentAppearance = 'can',
  currentTimeline = 'inception',
  currentTab = 'overview'
}: EquipmentImageCarouselProps) {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Get the appropriate images based on current tab and appearance/timeline
  const getDisplayImages = () => {
    // Always prioritize appearance-specific images if they exist (regardless of tab)
    // This ensures Can/Bottle images are always shown for Bloxy Cola
    if (Array.isArray(sections.appearance) && typeof sections.appearance[0] === 'object') {
      const currentAppearanceData = (sections.appearance as EquipmentOverviewOption[]).find(app => app.id === currentAppearance);
      if (currentAppearanceData?.images && currentAppearanceData.images.length > 0) {
        return currentAppearanceData.images;
      }
    }
    
    // When on timeline tab, check timeline-specific images (only if no appearance images)
    if (currentTab === 'timeline' && Array.isArray(sections.timeline) && typeof sections.timeline[0] === 'object') {
      const currentTimelineData = (sections.timeline as EquipmentTimelineOption[]).find(t => t.id === currentTimeline);
      if (currentTimelineData?.images && currentTimelineData.images.length > 0) {
        return currentTimelineData.images;
      }
    }
    
    // Fallback to main carousel images
    if (images.length > 0) {
      return images;
    }
    if (imageUrl) {
      return [{
        url: imageUrl,
        caption: "Equipment image"
      }];
    }
    return [];
  };
  
  const displayImages = useMemo(() => getDisplayImages(), [images, imageUrl, sections, currentAppearance, currentTimeline, currentTab]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!displayImages.length) return null;

  return (
    <div className="space-y-4 animate-fade-in w-full max-w-full">
      <div 
        className={isMobile ? 'w-full' : 'w-full self-start z-10'}
        style={!isMobile ? { 
          position: 'sticky', 
          top: '1rem',
          alignSelf: 'flex-start',
          willChange: 'transform'
        } : undefined}
      >
        <div className="overflow-hidden">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {displayImages.map((item, index) => (
                <CharacterCarouselItem
                  key={`${item.url}-${index}`}
                  item={item}
                  index={index}
                  currentAppearance="default"
                  hoveredIndex={null}
                  isPermanentlyChanged={false}
                  isGlitching={false}
                  isSpecialEffectPage={() => false}
                  onThirdImageClick={() => {}}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              ))}
            </CarouselContent>
            {displayImages.length > 1 && (
              <>
                <CarouselPrevious className="left-2 top-1/3 backdrop-blur-md bg-card/60 border-border/50 hover:bg-card/80 shadow-lg" />
                <CarouselNext className="right-2 top-1/3 backdrop-blur-md bg-card/60 border-border/50 hover:bg-card/80 shadow-lg" />
              </>
            )}
          </Carousel>
        </div>
        
        {displayImages.length > 1 && (
          <div className="mt-4 space-y-3">
            {/* Progress bars */}
            <div className="flex justify-center gap-1.5 px-4">
              {displayImages.map((_, index) => (
                <button
                  key={`progress-${index}`}
                  onClick={() => api?.scrollTo(index)}
                  className="flex-1 max-w-16 h-1 rounded-full overflow-hidden bg-border/30 backdrop-blur-sm transition-all duration-200 hover:bg-border/50"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      index === current
                        ? "w-full bg-primary shadow-[0_0_8px_rgba(var(--glow-color-rgb),0.5)]"
                        : "w-0 bg-primary/50"
                    )}
                  />
                </button>
              ))}
            </div>
            
            {/* Thumbnails with glass styling */}
            <div className="flex justify-center gap-2 flex-wrap max-w-full overflow-visible py-2">
              {displayImages.map((item, index) => (
                <button
                  key={`thumb-${item.url}-${index}`}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0",
                    "backdrop-blur-sm border-2",
                    index === current 
                      ? "border-primary scale-110 shadow-[0_0_16px_rgba(var(--glow-color-rgb),0.4)] ring-2 ring-primary/30" 
                      : "border-border/30 opacity-60 hover:opacity-100 hover:border-primary/50 hover:scale-105"
                  )}
                >
                  <OptimizedImage
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
