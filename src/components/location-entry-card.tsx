
import { Card } from "@/components/ui/card";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { LocationHeader } from "@/components/location/location-header";
import { LocationContentTabs } from "@/components/location/location-content-tabs";

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
  
  return (
    <div className="w-full max-w-[1400px] mx-auto animate-fade-in">
      <Card className="shadow-lg border-l-4 bg-card/95 backdrop-blur-sm min-h-full flex flex-col" style={{
        borderLeftColor: 'var(--wiki-location)'
      }}>
        
        <LocationHeader 
          title={location.title} 
          description={location.description}
          quote={location.quote}
          imageUrl={location.imageUrl}
          carouselImages={location.carouselImages}
        />
        
        {/* Main Content */}
        <div className="gap-4 p-6 flex-1">
          <LocationContentTabs 
            sections={locationSections} 
            currentEntryId={location.id}
          />
        </div>
      </Card>
    </div>
  );
}
