
import { Card, CardContent } from "@/components/ui/card";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface LocationOverviewTabProps {
  overview: string[];
  currentEntryId?: string;
}

export function LocationOverviewTab({ overview, currentEntryId }: LocationOverviewTabProps) {
  return (
    <Card>
      <CardContent className="prose dark:prose-invert max-w-none pt-6">
        {overview.map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed text-foreground force-text-wrap">
            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
