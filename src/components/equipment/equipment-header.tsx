
import { Badge } from "@/components/ui/badge";
import { EquipmentImageCarousel } from "./equipment-image-carousel";
import { useParallax } from "@/hooks/use-parallax";

interface EquipmentHeaderProps {
  title: string;
  description: string;
  imageUrl?: string;
  carouselImages?: {
    url: string;
    caption: string;
  }[];
}

export function EquipmentHeader({
  title,
  description,
  imageUrl,
  carouselImages = []
}: EquipmentHeaderProps) {
  // Get the appropriate images for the carousel
  const getCarouselImages = () => {
    if (carouselImages.length > 0) {
      return carouselImages;
    }
    if (imageUrl) {
      return [{
        url: imageUrl,
        caption: `${title} equipment image`
      }];
    }
    return [];
  };

  const displayImages = getCarouselImages();
  const parallaxOffset = useParallax(0.3);

  return (
    <div className="border-b bg-gradient-to-br from-card via-card/95 to-muted/30 relative overflow-hidden">
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
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in anim-delay-100">
            {description}
          </p>
        </div>
        
        {/* Image Carousel Section - Centered with much larger size */}
        {displayImages.length > 0 && (
          <div className="w-fit max-w-4xl mx-auto animate-fade-in anim-delay-200">
            <EquipmentImageCarousel images={displayImages} />
          </div>
        )}
      </div>
    </div>
  );
}
