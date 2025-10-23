import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { FileText, Clock3, Heart, Images } from "lucide-react";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RelationshipDisplayProps {
  status?: string;
  history?: string[];
  images?: {
    url: string;
    caption: string;
  }[];
  currentEntryId?: string;
}

export function RelationshipDisplay({ 
  status, 
  history,
  images,
  currentEntryId 
}: RelationshipDisplayProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!status && (!history || history.length === 0) && (!images || images.length === 0)) {
    return (
      <Card className="rounded-xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No relationship information available.</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Select a character to view their relationship details.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Image Carousel */}
      {images && images.length > 0 && (
        <Card className="border-0 rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Images className="h-5 w-5" />
              Relationship Gallery
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={`relationship-img-${index}`}>
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <OptimizedImage
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Caption Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                        <p className="text-white text-sm font-medium text-center">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
            
            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 p-4 bg-muted/30 flex-wrap">
                {images.map((image, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0",
                      index === current 
                        ? "border-primary scale-110 shadow-lg shadow-primary/25" 
                        : "border-border/50 opacity-60 hover:opacity-100 hover:border-primary/50"
                    )}
                  >
                    <OptimizedImage
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Status - Large Prominent Display */}
      {status && (
        <Card className="border-0 rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              <Heart className="h-7 w-7 text-primary" />
              Relationship Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Display */}
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold text-muted-foreground">
                Status
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent px-4">
                  {status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History - Detailed Information */}
      {history && history.length > 0 && (
        <Card className="border-0 rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock3 className="h-5 w-5" />
              Relationship History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="space-y-4">
                {history.map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed">
                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

