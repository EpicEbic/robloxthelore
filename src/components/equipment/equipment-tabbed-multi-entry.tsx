import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiItem } from "@/types/wiki-types";
import { EquipmentImageCarousel } from "./equipment-image-carousel";
import { EquipmentContentTabs } from "./equipment-content-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCharacterTheme } from "@/contexts/character-theme-context";
import { getCharacterTheme } from "@/data/character-themes";

interface EquipmentTabbedMultiEntryProps {
  items: MultiItem[];
  currentEntryId?: string;
}

// Define colors for each coil type
const getCoilColor = (title: string): string => {
  if (title.toLowerCase().includes('gravity')) return 'hsl(200, 80%, 55%)'; // Sky blue
  if (title.toLowerCase().includes('speed')) return 'hsl(0, 75%, 55%)'; // Red
  if (title.toLowerCase().includes('regeneration')) return 'hsl(120, 65%, 45%)'; // Green
  return 'hsl(220, 70%, 50%)'; // Default blue
};

export function EquipmentTabbedMultiEntry({ items, currentEntryId }: EquipmentTabbedMultiEntryProps) {
  const isMobile = useIsMobile();
  const { applyTheme } = useCharacterTheme();
  const [activeTab, setActiveTab] = useState(items[0]?.id || '');
  const [currentAppearance, setCurrentAppearance] = useState<string>('default');
  const [currentTimeline, setCurrentTimeline] = useState<string>('default');
  const [currentContentTab, setCurrentContentTab] = useState<string>('overview');

  if (!items || items.length === 0) {
    return null;
  }

  const activeItem = items.find(item => item.id === activeTab) || items[0];

  // Apply theme when active tab changes
  useEffect(() => {
    const theme = getCharacterTheme(activeItem.id);
    if (theme) {
      applyTheme(theme);
    }
  }, [activeTab, activeItem.id, applyTheme]);

  // Update timeline when active item changes
  useEffect(() => {
    if (activeItem.sections?.timeline && Array.isArray(activeItem.sections.timeline) && typeof activeItem.sections.timeline[0] === 'object') {
      setCurrentTimeline(activeItem.sections.timeline[0].id);
    }
  }, [activeTab, activeItem.sections?.timeline]);

  // Convert MultiItem sections to EquipmentSections format
  const equipmentSections = {
    appearance: activeItem.sections?.appearance || [],
    generalInformation: activeItem.sections?.generalInformation || [],
    functionality: activeItem.sections?.functionality || [],
    timeline: activeItem.sections?.timeline || [],
    history: activeItem.sections?.history || [],
  };

  return (
    <div className="w-full">
      {/* Coil Selection Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="mb-6 w-auto mx-auto flex flex-wrap justify-center gap-3 p-3 h-auto rounded-xl">
          {items.map((item) => {
            const itemColor = getCoilColor(item.title);
            const isActive = activeTab === item.id;
            return (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap transition-all"
                style={isActive ? {
                  backgroundColor: itemColor,
                  color: 'white',
                } : {}}
              >
                <span className="font-medium">{item.title.replace('The ', '')}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Active Coil Content - Match standard equipment layout exactly */}
      <div className={`gap-4 ${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-1 lg:grid-cols-[1fr_2fr] items-start'}`}>
        {/* Image Carousel */}
        <div className="min-w-0 w-full" style={{ height: 'fit-content' }}>
          <EquipmentImageCarousel 
            images={activeItem.carouselImages || []}
            imageUrl={activeItem.imageUrl}
            sections={equipmentSections}
            currentAppearance={currentAppearance}
            currentTimeline={currentTimeline}
            currentTab={currentContentTab}
          />
        </div>

        {/* Content Tabs - Use EquipmentContentTabs component */}
        <div className="min-w-0 w-full">
          <EquipmentContentTabs 
            sections={equipmentSections} 
            currentEntryId={currentEntryId}
            currentAppearance={currentAppearance}
            onAppearanceChange={setCurrentAppearance}
            currentTimeline={currentTimeline}
            onTimelineChange={setCurrentTimeline}
            onTabChange={setCurrentContentTab}
          />
        </div>
      </div>
    </div>
  );
}
