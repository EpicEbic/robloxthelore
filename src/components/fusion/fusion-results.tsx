import { useState } from "react";
import { WikiEntry } from "@/types/wiki-types";
import { getFusionEntry } from "@/data/fusion-entries";
import { FusionInlineDisplay } from "./fusion-inline-display";
import { FusionAnimation } from "./fusion-animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap } from "lucide-react";

interface FusionResultsProps {
  entry1: WikiEntry;
  entry2: WikiEntry;
}

export function FusionResults({ entry1, entry2 }: FusionResultsProps) {
  const [showAnimation, setShowAnimation] = useState(true);
  const fusionResult = getFusionEntry(entry1.id, entry2.id);

  if (!fusionResult) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-6 w-6 text-primary" />
            Fusion Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Fusion Data Available</h3>
            <p className="text-muted-foreground">
              A fusion between <span className="font-medium">{entry1.title}</span> and{" "}
              <span className="font-medium">{entry2.title}</span> hasn't been documented yet.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back later as more fusion combinations are added!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showAnimation) {
    return (
      <div className="mt-6">
        <FusionAnimation 
          entry1={entry1}
          entry2={entry2}
          fusion={fusionResult.fusion}
          onComplete={() => setShowAnimation(false)}
        />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <FusionInlineDisplay 
        fusion={fusionResult.fusion}
        entry1Name={entry1.title}
        entry2Name={entry2.title}
      />
    </div>
  );
}