
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ImageZoomDialog } from "@/components/ui/image-zoom-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CarouselImage {
  url: string;
  caption: string;
}

interface LocationImageCarouselProps {
  images: CarouselImage[];
}

export const LocationImageCarousel = memo(function LocationImageCarousel({ images }: LocationImageCarouselProps) {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!images.length) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className={isMobile ? '' : 'sticky top-4'}>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((item, index) => (
              <CarouselItem key={`${item.url}-${index}`}>
                <div className="p-1">
                  <div className="relative overflow-hidden rounded-md bg-muted/20 h-96 md:h-[500px] lg:h-[600px]">
                    <OptimizedImage
                      src={item.url}
                      alt={`Location image ${index + 1}`}
                      priority={index === 0}
                      className="w-full h-full object-cover opacity-0 animate-image-fade-in"
                      style={{ animationDelay: `${0.2 + index * 0.5}s` }}
                    />
                    <ImageZoomDialog
                      src={item.url}
                      alt={`Location image ${index + 1} - Full size`}
                    />
                  </div>
                  <div className="text-center mt-2 p-2 bg-muted/30 rounded-md animate-fade-in" style={{ animationDelay: `${0.7 + index * 0.5}s` }}>
                    <p className="text-sm break-words">{item.caption}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 top-1/3" />
              <CarouselNext className="right-2 top-1/3" />
            </>
          )}
        </Carousel>

        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((item, index) => (
              <button
                key={`thumb-${item.url}-${index}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                  index === current ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <OptimizedImage
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

