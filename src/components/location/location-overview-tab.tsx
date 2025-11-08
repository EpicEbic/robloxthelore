
import { Card, CardContent } from "@/components/ui/card";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface LocationOverviewTabProps {
  overview: string[];
  currentEntryId?: string;
}

export function LocationOverviewTab({ overview, currentEntryId }: LocationOverviewTabProps) {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl p-6 border min-w-0">
        <div className="space-y-4">
          {overview.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-base text-foreground/90 force-text-wrap">
              <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
