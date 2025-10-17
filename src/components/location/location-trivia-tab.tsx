
import { Card, CardContent } from "@/components/ui/card";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface LocationTriviaTabProps {
  trivia: string[];
  currentEntryId?: string;
}

export function LocationTriviaTab({ trivia, currentEntryId }: LocationTriviaTabProps) {
  return (
    <Card className="cosmic-card">
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {trivia.map((item, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border-l-4 border-purple-400/30">
              <span className="text-purple-400 font-bold text-lg flex-shrink-0">•</span>
              <span className="leading-relaxed text-slate-200 force-text-wrap">
                <AutoLinkedText text={item} currentEntryId={currentEntryId} />
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
