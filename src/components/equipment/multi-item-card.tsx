
import { MultiItem } from "@/types/wiki-types";
import { Card } from "@/components/ui/card";
import { EquipmentImageCarousel } from "./equipment-image-carousel";
import { MultiItemHeader } from "./multi-item-header";
import { MultiItemTabs } from "./multi-item-tabs";
import { MultiItemFallback } from "./multi-item-fallback";

interface MultiItemCardProps {
  item: MultiItem;
  coilColor: string;
  currentEntryId?: string;
}

export function MultiItemCard({ item, coilColor, currentEntryId }: MultiItemCardProps) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-8" style={{
      borderLeftColor: coilColor
    }}>
      <div className="p-6">
        <MultiItemHeader item={item} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Item Image Carousel */}
          {(item.carouselImages && item.carouselImages.length > 0) && (
            <div className="lg:col-span-1">
              <EquipmentImageCarousel images={item.carouselImages} />
            </div>
          )}
          
          {/* Item Content */}
          <div className={`${(item.carouselImages && item.carouselImages.length > 0) ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            <p className="text-lg text-muted-foreground">{item.description}</p>
            
            {/* If the item has full sections, show tabs */}
            {item.sections ? (
              <MultiItemTabs item={item} coilColor={coilColor} currentEntryId={currentEntryId} />
            ) : (
              <MultiItemFallback item={item} coilColor={coilColor} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
