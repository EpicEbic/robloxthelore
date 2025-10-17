
import { MultiItem } from "@/types/wiki-types";
import { Zap, Scroll } from "lucide-react";

interface MultiItemFallbackProps {
  item: MultiItem;
  coilColor: string;
}

export function MultiItemFallback({ item, coilColor }: MultiItemFallbackProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5" style={{ color: coilColor }} />
          Abilities
        </h4>
        <ul className="space-y-2">
          {item.abilities.map((ability, abilityIndex) => (
            <li key={abilityIndex} className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: coilColor }} />
              <span className="text-sm">{ability}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Scroll className="h-5 w-5" style={{ color: coilColor }} />
          Lore
        </h4>
        <p className="text-sm text-muted-foreground italic border-l-2 pl-4" style={{ borderLeftColor: coilColor }}>
          {item.lore}
        </p>
      </div>
    </div>
  );
}
