
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSpecialImageEffects } from "@/hooks/use-special-image-effects";
import { getImagesForAppearance } from "@/utils/character-utils";
import { CombatStyle, AppearanceOption, LifestyleOption } from "@/types/wiki-types";
import { memo, useState, useEffect, useMemo, useRef } from "react";
import { CharacterCarouselItem } from "./character-carousel-item";
import { OptimizedImage } from "../ui/optimized-image";
import { cn } from "@/lib/utils";

interface CarouselImage {
  url: string;
  caption: string;
}

interface CharacterImageCarouselProps {
  images: CarouselImage[];
  appearances?: AppearanceOption[];
  currentAppearance?: string;
  combatStyles?: CombatStyle[];
  currentCombatStyle?: string;
  currentTab?: string;
  abilityImages?: CarouselImage[];
  lifestyles?: LifestyleOption[];
  currentLifestyle?: string;
  histories?: any[];
  currentHistory?: string;
  lifestyleHistoryView?: 'lifestyle' | 'history';
  combatView?: 'physical' | 'ability';
}

export const CharacterImageCarousel = memo(function CharacterImageCarousel({ 
  images, 
  appearances = [], 
  currentAppearance = 'default',
  combatStyles,
  currentCombatStyle,
  currentTab,
  abilityImages = [],
  lifestyles = [],
  currentLifestyle = 'default',
  histories = [],
  currentHistory = 'default',
  lifestyleHistoryView = 'lifestyle',
  combatView = 'physical'
}: CharacterImageCarouselProps) {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const previousImagesRef = useRef<string>('');

  const {
    hoveredIndex,
    isPermanentlyChanged,
    isGlitching,
    isSpecialEffectPage,
    handleThirdImageClick,
    handleMouseEnter,
    handleMouseLeave
  } = useSpecialImageEffects();
  
  // Get the appropriate images based on current tab, combat style or appearance
  const getDisplayImages = () => {
    // When on combat tab, check if viewing ability or physical
    if (currentTab === 'combat') {
      if (combatView === 'ability' && abilityImages.length > 0) {
        // Show ability images when viewing ability section
        return abilityImages;
      } else if (combatView === 'physical' && combatStyles && combatStyles.length > 0 && currentCombatStyle) {
        // Show combat style images when viewing physical section
        const currentStyle = combatStyles.find(style => style.id === currentCombatStyle);
        if (currentStyle?.images && currentStyle.images.length > 0) {
          return currentStyle.images;
        }
      }
    }
    // Use lifestyle or history images when on the timeline tab
    if (currentTab === 'timeline') {
      if (lifestyleHistoryView === 'lifestyle' && lifestyles && lifestyles.length > 0 && currentLifestyle) {
        const currentLife = lifestyles.find(life => life.id === currentLifestyle);
        if (currentLife?.images && currentLife.images.length > 0) {
          return currentLife.images;
        }
      } else if (lifestyleHistoryView === 'history' && histories && histories.length > 0 && currentHistory) {
        const currentHist = histories.find(hist => hist.id === currentHistory);
        if (currentHist?.images && currentHist.images.length > 0) {
          return currentHist.images;
        }
      }
    }
    // For all other tabs, use appearance-based images
    return getImagesForAppearance(appearances, currentAppearance, images);
  };
  
  // Create stable keys for complex dependencies to properly memoize
  const abilityImagesKey = useMemo(() => abilityImages.map(img => img.url).join('|'), [abilityImages]);
  const imagesKey = useMemo(() => images.map(img => img.url).join('|'), [images]);
  const appearancesKey = useMemo(() => {
    if (!appearances || appearances.length === 0) return '';
    return appearances.map(app => `${app.id}:${app.images?.map(img => img.url).join(',') || ''}`).join('|');
  }, [appearances]);
  const combatStylesKey = useMemo(() => {
    if (!combatStyles || combatStyles.length === 0) return '';
    return combatStyles.map(style => `${style.id}:${style.images?.map(img => img.url).join(',') || ''}`).join('|');
  }, [combatStyles]);
  const lifestylesKey = useMemo(() => {
    if (!lifestyles || lifestyles.length === 0) return '';
    return lifestyles.map(life => `${life.id}:${life.images?.map(img => img.url).join(',') || ''}`).join('|');
  }, [lifestyles]);
  const historiesKey = useMemo(() => {
    if (!histories || histories.length === 0) return '';
    return histories.map(hist => `${hist.id}:${hist.images?.map(img => img.url).join(',') || ''}`).join('|');
  }, [histories]);

  // Memoize display images and only recalculate when dependencies actually change
  const displayImages = useMemo(() => {
    return getDisplayImages();
  }, [
    currentTab,
    combatView,
    abilityImagesKey,
    combatStylesKey,
    currentCombatStyle,
    lifestyleHistoryView,
    lifestylesKey,
    currentLifestyle,
    historiesKey,
    currentHistory,
    appearancesKey,
    currentAppearance,
    imagesKey
  ]);

  // Create a stable key based on image URLs to detect actual changes
  const displayImagesKey = useMemo(() => {
    return displayImages.map(img => img.url).join('|');
  }, [displayImages]);

  // Only reset carousel position if images actually changed
  useEffect(() => {
    if (displayImagesKey !== previousImagesRef.current && api) {
      // Images changed, reset to first image
      api.scrollTo(0);
      setCurrent(0);
      previousImagesRef.current = displayImagesKey;
    } else if (displayImagesKey === previousImagesRef.current) {
      // Images are the same, preserve current position
      previousImagesRef.current = displayImagesKey;
    }
  }, [displayImagesKey, api]);

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
                  currentAppearance={currentAppearance}
                  hoveredIndex={hoveredIndex}
                  isPermanentlyChanged={isPermanentlyChanged}
                  isGlitching={isGlitching}
                  isSpecialEffectPage={isSpecialEffectPage}
                  onThirdImageClick={handleThirdImageClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
