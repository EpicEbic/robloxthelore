
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LocationContentStyles } from "./location-content-styles";
import { LocationOverviewTab } from "./location-overview-tab";
import { LocationSegmentsTab } from "./location-segments-tab";
import { LocationTriviaTab } from "./location-trivia-tab";

interface LocationSections {
  overview: string[];
  segments: string[];
  trivia: string[];
}

interface LocationContentTabsProps {
  sections: LocationSections;
  currentEntryId?: string;
}

export function LocationContentTabs({ sections, currentEntryId }: LocationContentTabsProps) {
  const [currentSegment, setCurrentSegment] = useState('segment-0');

  return (
    <div className="relative bg-background">
      <LocationContentStyles />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">General</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="trivia">Trivia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <LocationOverviewTab overview={sections.overview} currentEntryId={currentEntryId} />
        </TabsContent>
        
        <TabsContent value="segments" className="space-y-4">
          <LocationSegmentsTab 
            segments={sections.segments}
            currentSegment={currentSegment}
            onSegmentChange={setCurrentSegment}
          />
        </TabsContent>
        
        <TabsContent value="trivia" className="space-y-4">
          <LocationTriviaTab trivia={sections.trivia} currentEntryId={currentEntryId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
