
import { GlassesIcon, BotIcon } from "lucide-react";

interface CharacterTriviaItemProps {
  item: string;
}

export function CharacterTriviaItem({ item }: CharacterTriviaItemProps) {
  if (item.toLowerCase().includes("glasses")) {
    return (
      <div className="flex items-center gap-2">
        <GlassesIcon className="h-5 w-5 text-muted-foreground" />
        <span>{item}</span>
      </div>
    );
  } else if (item.toLowerCase().includes("bowtie") || item.toLowerCase().includes("bow tie")) {
    return (
      <div className="flex items-center gap-2">
        <BotIcon className="h-5 w-5 text-muted-foreground" />
        <span>{item}</span>
      </div>
    );
  }
  return <div>{item}</div>;
}
