
import { MultiItem } from "@/types/wiki-types";

interface MultiItemHeaderProps {
  item: MultiItem;
}

export function MultiItemHeader({ item }: MultiItemHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <h3 className="text-3xl font-bold">{item.title}</h3>
    </div>
  );
}
