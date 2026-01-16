
import { BookOpen, Map, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [currentSegment, setCurrentSegment] = useState('segment-0');
  const [currentTab, setCurrentTab] = useState('overview');

  // Handle segment URL parameter
  useEffect(() => {
    const segmentParam = searchParams.get('segment');
    if (segmentParam && sections.segments.length > 0) {
      // Map segment IDs to indices
      const segmentIndex = sections.segments.findIndex((seg) => {
        const titleMatch = seg.match(/^\*\*(.+?)\*\*/);
        const title = titleMatch ? titleMatch[1] : '';
        const segmentId = title.toLowerCase().replace(/\s+/g, '-');
        return segmentId === segmentParam;
      });

      if (segmentIndex !== -1) {
        setCurrentTab('segments');
        setCurrentSegment(`segment-${segmentIndex}`);
      }
    }
  }, [searchParams, sections.segments]);

  return (
    <div className="min-h-0 flex flex-col">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full h-full flex flex-col">
        <TabsList className="mb-6 w-full flex flex-wrap justify-center lg:w-auto lg:mx-auto gap-1 sm:gap-1.5 p-1.5 sm:p-2 h-auto">
          <TabsTrigger value="overview" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <Map className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Segments</span>
          </TabsTrigger>
          <TabsTrigger value="trivia" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Trivia</span>
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
