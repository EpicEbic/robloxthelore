import { useState } from "react";
import { Card } from "@/components/ui/card";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { EquipmentHeader } from "@/components/equipment/equipment-header";
import { EquipmentBasicInfo } from "@/components/equipment/equipment-basic-info";
import { EquipmentImageCarousel } from "@/components/equipment/equipment-image-carousel";
import { EquipmentContentTabs } from "@/components/equipment/equipment-content-tabs";
import { EquipmentTabbedMultiEntry } from "@/components/equipment/equipment-tabbed-multi-entry";
import { EquipmentOverviewOption, EquipmentTimelineOption } from "@/types/wiki-types";
import { motion } from "framer-motion";

interface EquipmentSections {
  overview?: string[] | any[];
  appearance?: string[];
  generalInformation?: string[];
  functionality?: string[];
  timeline?: string[] | any[];
  history?: string[];
  trivia?: string[];
}

interface EquipmentEntryCardProps {
  equipment: WikiEntry;
}

export function EquipmentEntryCard({ equipment }: EquipmentEntryCardProps) {
  const isMobile = useIsMobile();
  
  // State management for appearance and timeline switching (like character entries)
  const [currentAppearance, setCurrentAppearance] = useState<string>(() => {
    if (Array.isArray(equipment.sections?.appearance) && equipment.sections.appearance.length > 0 && typeof equipment.sections.appearance[0] === 'object') {
      return (equipment.sections.appearance as EquipmentOverviewOption[])[0].id;
    }
    return 'default';
  });
  
  const [currentTimeline, setCurrentTimeline] = useState<string>(() => {
    if (Array.isArray(equipment.sections?.timeline) && equipment.sections.timeline.length > 0 && typeof equipment.sections.timeline[0] === 'object') {
      return (equipment.sections.timeline as EquipmentTimelineOption[])[0].id;
    }
    return 'default';
  });
  
  const [currentTab, setCurrentTab] = useState<string>('overview');
  
  // Check if this is a tabbed multi-entry (Coils of Power)
  const isTabbedMultiEntry = equipment.id === "coils-of-power" && equipment.multiItems && equipment.multiItems.length > 0;
  
  // Extract equipment-specific sections
  const equipmentSections: EquipmentSections = {
    overview: equipment.sections?.overview || [],
    appearance: equipment.sections?.appearance || [],
    generalInformation: equipment.sections?.generalInformation || [],
    functionality: equipment.sections?.functionality || [],
    timeline: equipment.sections?.timeline || [],
    history: Array.isArray(equipment.sections?.history) && typeof equipment.sections.history[0] === 'object'
      ? (equipment.sections.history as any[]).flatMap(h => h.description)
      : equipment.sections?.history || [],
    trivia: equipment.sections?.trivia || []
  };
  
  return (
    <div
      className="w-full max-w-[1400px] mx-auto"
    >
      <Card className="shadow-lg border-l-4 bg-card/95 backdrop-blur-sm min-h-full flex flex-col rounded-xl" style={{
        borderLeftColor: 'var(--wiki-equipment)'
      }}>
        
        <div className="overflow-hidden rounded-t-xl">
          <EquipmentHeader 
            title={equipment.title} 
            quote={equipment.quote}
          />
          
          <EquipmentBasicInfo 
            subcategory={equipment.subcategory}
          />
        </div>
        
        {/* Tabbed Multi-Entry Layout (Coils of Power) */}
        {isTabbedMultiEntry ? (
          <div className="p-6 flex-1">
            <EquipmentTabbedMultiEntry 
              items={equipment.multiItems}
              currentEntryId={equipment.id}
            />
          </div>
        ) : (
          /* Standard Equipment Layout */
          <div 
            className={`gap-4 p-6 flex-1 ${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-1 lg:grid-cols-[1fr_2fr] items-start'}`}
          >
            
            <div className="min-w-0 w-full" style={{ height: 'fit-content' }}>
              <EquipmentImageCarousel 
                images={equipment.carouselImages || []}
                imageUrl={equipment.imageUrl}
                sections={equipmentSections}
                currentAppearance={currentAppearance}
                currentTimeline={currentTimeline}
                currentTab={currentTab}
              />
            </div>
            
            <div 
              className="min-w-0 w-full"
            >
              <EquipmentContentTabs 
                sections={equipmentSections} 
                multiItems={equipment.multiItems}
                currentEntryId={equipment.id}
                currentAppearance={currentAppearance}
                onAppearanceChange={setCurrentAppearance}
                currentTimeline={currentTimeline}
                onTimelineChange={setCurrentTimeline}
                onTabChange={setCurrentTab}
              />
            </div>
            
          </div>
        )}
      </Card>
    </div>
  );
}
