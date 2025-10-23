import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock3, Heart } from "lucide-react";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface RelationshipDisplayProps {
  status?: string;
  history?: string[];
  currentEntryId?: string;
}

export function RelationshipDisplay({ 
  status, 
  history,
  currentEntryId 
}: RelationshipDisplayProps) {
  if (!status && (!history || history.length === 0)) {
    return (
      <Card className="rounded-xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No relationship information available.</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Select a character to view their relationship details.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status - Large Prominent Display */}
      {status && (
        <Card className="border-0 rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              <Heart className="h-7 w-7 text-primary" />
              Relationship Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Display */}
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold text-muted-foreground">
                Status
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent px-4">
                  {status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History - Detailed Information */}
      {history && history.length > 0 && (
        <Card className="border-0 rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock3 className="h-5 w-5" />
              Relationship History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="space-y-4">
                {history.map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed">
                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

