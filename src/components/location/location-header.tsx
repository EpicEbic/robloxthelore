
import { Badge } from "@/components/ui/badge";
import { EquipmentImageCarousel } from "@/components/equipment/equipment-image-carousel";
import { useParallax } from "@/hooks/use-parallax";

interface LocationHeaderProps {
  title: string;
  description: string;
  quote?: {
    text: string;
    context: string;
  };
  imageUrl?: string;
  carouselImages?: {
    url: string;
    caption: string;
  }[];
}

export function LocationHeader({
  title,
  description,
  quote,
  imageUrl,
  carouselImages = []
}: LocationHeaderProps) {
  // Get the appropriate images for the carousel
  const getCarouselImages = () => {
    if (carouselImages.length > 0) {
      return carouselImages;
    }
    if (imageUrl) {
      return [{
        url: imageUrl,
        caption: `${title} location image`
      }];
    }
    return [];
  };

  const displayImages = getCarouselImages();
  const parallaxOffset = useParallax(0.3);

  return (
    <div className="border-b relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-muted/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      
      <div className="relative p-6 lg:p-8" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        {/* Title and Description Section - Centered */}
        <div className="space-y-6 mb-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent animate-rotate-in">
              {title}
            </h1>
          </div>
          
          <p className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto text-muted-foreground animate-fade-in anim-delay-100">
            {description}
          </p>

          {quote && (
            <div className="mt-6 p-5 lg:p-6 rounded-lg border-l-4 max-w-3xl mx-auto bg-muted/40 backdrop-blur-sm border-primary/50 animate-fade-in anim-delay-200">
              <blockquote className="text-lg lg:text-xl italic text-foreground/90">
                "{quote.text}"
              </blockquote>
              {quote.context && (
                <cite className="text-sm lg:text-base mt-3 block text-muted-foreground">
                  — {quote.context}
                </cite>
              )}
            </div>
          )}
        </div>
        
        {/* Image Carousel Section - Centered with much larger size */}
        {displayImages.length > 0 && (
          <div className="w-fit max-w-4xl mx-auto animate-fade-in anim-delay-300">
            <EquipmentImageCarousel images={displayImages} />
          </div>
        )}
      </div>
    </div>
  );
}
