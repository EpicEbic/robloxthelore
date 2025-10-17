
import { Card } from "@/components/ui/card";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { EquipmentHeader } from "@/components/equipment/equipment-header";
import { EquipmentContentTabs } from "@/components/equipment/equipment-content-tabs";

interface EquipmentSections {
  overview: string[];
  ability: string[];
  history: string[];
  trivia: string[];
}

interface EquipmentEntryCardProps {
  equipment: WikiEntry;
}

export function EquipmentEntryCard({ equipment }: EquipmentEntryCardProps) {
  const isMobile = useIsMobile();
  
  // Extract equipment-specific sections
  const equipmentSections: EquipmentSections = {
    overview: equipment.sections?.overview || [],
    ability: equipment.sections?.ability || [], 
    history: Array.isArray(equipment.sections?.history) && typeof equipment.sections.history[0] === 'object'
      ? (equipment.sections.history as any[]).flatMap(h => h.description)
      : equipment.sections?.history || [],
    trivia: equipment.sections?.trivia || []
  };
  
  return (
    <div className="w-full max-w-[1400px] mx-auto animate-fade-in">
      <Card className="shadow-lg border-l-4 bg-card/95 backdrop-blur-sm min-h-full flex flex-col" style={{
        borderLeftColor: 'var(--wiki-equipment)'
      }}>
        
        <EquipmentHeader 
          title={equipment.title} 
          description={equipment.description}
          imageUrl={equipment.imageUrl}
          carouselImages={equipment.carouselImages}
        />
        
        {/* Main Content */}
        <div className="gap-4 p-6 flex-1">
          <EquipmentContentTabs 
            sections={equipmentSections} 
            multiItems={equipment.multiItems}
            currentEntryId={equipment.id}
          />
        </div>
      </Card>
    </div>
  );
}
