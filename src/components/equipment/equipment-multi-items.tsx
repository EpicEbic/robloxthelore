
import { MultiItem } from "@/types/wiki-types";
import { MultiItemCard } from "./multi-item-card";

interface EquipmentMultiItemsProps {
  items: MultiItem[];
}

// Define colors for each coil type
const getCoilColor = (title: string): string => {
  if (title.toLowerCase().includes('gravity')) return 'hsl(220, 70%, 50%)'; // Blue
  if (title.toLowerCase().includes('speed')) return 'hsl(0, 70%, 50%)'; // Red
  if (title.toLowerCase().includes('regeneration')) return 'hsl(120, 70%, 40%)'; // Green
  return `hsl(${(Math.random() * 360)}, 50%, 50%)`; // Fallback
};

export function EquipmentMultiItems({ items }: EquipmentMultiItemsProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => {
        const coilColor = getCoilColor(item.title);
        
        return (
          <MultiItemCard 
            key={item.id} 
            item={item} 
            coilColor={coilColor} 
          />
        );
      })}
    </div>
  );
}
