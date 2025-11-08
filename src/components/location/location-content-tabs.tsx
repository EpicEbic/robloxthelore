
import { BookOpen, Map, Lightbulb } from "lucide-react";
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
    <div className="min-h-0 flex flex-col">
      <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
        <TabsList className="mb-6 w-full flex flex-wrap justify-center lg:w-auto lg:mx-auto gap-3 p-3 h-auto rounded-xl">
          <TabsTrigger value="overview" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <BookOpen className="h-5 w-5 flex-shrink-0" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <Map className="h-5 w-5 flex-shrink-0" />
            <span>Segments</span>
          </TabsTrigger>
          <TabsTrigger value="trivia" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <Lightbulb className="h-5 w-5 flex-shrink-0" />
            <span>Trivia</span>
          </TabsTrigger>
        </TabsList>
        
        <LocationContentStyles />
        
        <TabsContent value="overview" className="space-y-4 mt-0 flex-1">
          <LocationOverviewTab overview={sections.overview} currentEntryId={currentEntryId} />
        </TabsContent>
        
        <TabsContent value="segments" className="space-y-4 mt-0 flex-1">
          <LocationSegmentsTab 
            segments={sections.segments}
            currentSegment={currentSegment}
            onSegmentChange={setCurrentSegment}
          />
        </TabsContent>
        
        <TabsContent value="trivia" className="space-y-4 mt-0 flex-1">
          <LocationTriviaTab trivia={sections.trivia} currentEntryId={currentEntryId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
