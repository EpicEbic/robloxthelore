
import { GlassesIcon, BotIcon } from "lucide-react";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface CharacterTriviaItemProps {
  item: string;
  currentEntryId?: string;
}

export function CharacterTriviaItem({ item, currentEntryId }: CharacterTriviaItemProps) {
  if (item.toLowerCase().includes("glasses")) {
    return (
      <div className="flex items-center gap-2 break-words whitespace-normal overflow-wrap-anywhere">
        <GlassesIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <span className="break-words whitespace-normal overflow-wrap-anywhere">
          <AutoLinkedText text={item} currentEntryId={currentEntryId} />
        </span>
      </div>
    );
  } else if (item.toLowerCase().includes("bowtie") || item.toLowerCase().includes("bow tie")) {
    return (
      <div className="flex items-center gap-2 break-words whitespace-normal overflow-wrap-anywhere">
        <BotIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <span className="break-words whitespace-normal overflow-wrap-anywhere">
          <AutoLinkedText text={item} currentEntryId={currentEntryId} />
        </span>
      </div>
    );
  }
  return (
    <div className="break-words whitespace-normal overflow-wrap-anywhere">
      <AutoLinkedText text={item} currentEntryId={currentEntryId} />
    </div>
  );
}
