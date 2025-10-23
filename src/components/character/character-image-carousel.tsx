
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSpecialImageEffects } from "@/hooks/use-special-image-effects";
import { getImagesForAppearance } from "@/utils/character-utils";
import { CombatStyle, AppearanceOption, LifestyleOption } from "@/types/wiki-types";
import { memo, useState, useEffect } from "react";
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
  
  const displayImages = getDisplayImages();

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
      <div className={isMobile ? 'w-full' : 'sticky top-4 w-full'}>
        <div className="overflow-hidden">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {displayImages.map((item, index) => (
                <CharacterCarouselItem
                  key={`${currentAppearance}-${currentCombatStyle}-${currentLifestyle}-${currentHistory}-${lifestyleHistoryView}-${combatView}-${item.url}-${index}`}
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
                <CarouselPrevious className="left-2 top-1/3" />
                <CarouselNext className="right-2 top-1/3" />
              </>
            )}
          </Carousel>
        </div>
        
        {displayImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 flex-wrap max-w-full overflow-visible py-2">
            {displayImages.map((item, index) => (
              <button
                key={`thumb-${item.url}-${index}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0",
                  index === current 
                    ? "border-primary scale-110 shadow-lg shadow-primary/25" 
                    : "border-border/50 opacity-60 hover:opacity-100 hover:border-primary/50"
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
        )}
      </div>
    </div>
  );
});
