
import { Card, CardContent } from "@/components/ui/card";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface LocationTriviaTabProps {
  trivia: string[];
  currentEntryId?: string;
}

export function LocationTriviaTab({ trivia, currentEntryId }: LocationTriviaTabProps) {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl p-6 border min-w-0">
        <ul className="space-y-3">
          {trivia.map((item, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border-l-4 border-primary/30">
              <span className="text-primary font-bold text-lg flex-shrink-0">•</span>
              <span className="leading-relaxed text-base text-foreground/90 force-text-wrap">
                <AutoLinkedText text={item} currentEntryId={currentEntryId} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
