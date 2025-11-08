
import { Card } from "@/components/ui/card";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { LocationHeader } from "@/components/location/location-header";
import { LocationBasicInfo } from "@/components/location/location-basic-info";
import { LocationContentTabs } from "@/components/location/location-content-tabs";
import { LocationImageCarousel } from "@/components/location/location-image-carousel";

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
            {displayImages.length > 0 && (
              <LocationImageCarousel images={displayImages} />
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
