
import { Card } from "@/components/ui/card";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { LocationHeader } from "@/components/location/location-header";
import { LocationBasicInfo } from "@/components/location/location-basic-info";
import { LocationContentTabs } from "@/components/location/location-content-tabs";
import { LocationImageCarousel } from "@/components/location/location-image-carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

interface LocationSections {
  overview: string[];
  segments: string[];
  trivia: string[];
}

interface LocationEntryCardProps {
  location: WikiEntry;
}

export function LocationEntryCard({ location }: LocationEntryCardProps) {
  const isMobile = useIsMobile();
  
  // Extract location-specific sections
  const locationSections: LocationSections = {
    overview: location.sections?.overview || [],
    segments: location.sections?.segments || [],
    trivia: location.sections?.trivia || []
  };

  // Get the appropriate images for the carousel
  const getCarouselImages = () => {
    if (location.carouselImages && location.carouselImages.length > 0) {
      return location.carouselImages;
    }
    if (location.imageUrl) {
      return [{
        url: location.imageUrl,
        caption: `${location.title} location image`
      }];
    }
    return [];
  };

  const displayImages = getCarouselImages();
  const isBloxiverse = location.id === "the-bloxiverse";
  return (
    <div className="w-full max-w-[1400px] mx-auto animate-fade-in">
      <Card className="shadow-lg border-l-4 bg-card/95 backdrop-blur-sm min-h-full flex flex-col rounded-xl overflow-hidden" style={{
        borderLeftColor: 'var(--wiki-location)'
      }}>
        
        <LocationHeader 
          title={location.title} 
          quote={location.quote}
        />
        
        <LocationBasicInfo 
          type={location.locationType}
          size={location.locationSize}
          region={location.locationRegion}
        />
        
        {/* Main Content - Mobile: Vertical Stack, Desktop: Side by Side */}
        <div className={`gap-4 p-6 flex-1 ${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-1 lg:grid-cols-[1fr_2fr]'}`}>
          
          <div className="min-w-0 w-full">
            {isBloxiverse ? (
              <div className="h-full">
                <div className="bg-card/80 backdrop-blur-sm border border-primary/40 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold uppercase text-xs tracking-[0.35em]">
                      <Compass className="h-4 w-4" />
                      <span>World Map</span>
                    </div>
                    <h3 className="text-3xl font-bold mt-4 text-foreground">Explore the Bloxiverse</h3>
                    <p className="text-sm md:text-base text-foreground/80 mt-3 leading-relaxed">
                      Want a closer look at the Bloxiverse or to see where key locations and landmarks can be found? Try the interactive world map, a system designed for visual learners and those who want to see the layout of the cosmos for themselves.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-6">
                    <Button asChild size="lg" className="w-full gap-2">
                      <Link to="/world?from=bloxiverse">
                        <Compass className="h-5 w-5" />
                        Visit the Interactive Map
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              displayImages.length > 0 && (
                <LocationImageCarousel images={displayImages} />
              )
            )}
          </div>
          
          <div className="min-w-0 w-full">
            <LocationContentTabs 
              sections={locationSections} 
              currentEntryId={location.id}
            />
          </div>
          
        </div>
      </Card>
    </div>
  );
}
