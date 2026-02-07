import { BodyPart, CoreData } from "@/data/bloxian-biology/body-parts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BodyPartInfoPanelProps {
  part?: BodyPart | CoreData;
  isCore?: boolean;
  onClose: () => void;
}

export function BodyPartInfoPanel({ part, isCore = false, onClose }: BodyPartInfoPanelProps) {
  if (!part) return null;

  const displayName = isCore ? 'Core' : (part as BodyPart).name;
  const description = isCore ? (part as CoreData).description : (part as BodyPart).description;
  const functionText = isCore ? (part as CoreData).function : (part as BodyPart).function;
  const lore = isCore ? (part as CoreData).lore : (part as BodyPart).lore;
  const r15R6Differences = isCore ? undefined : (part as BodyPart).r15R6Differences;

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            {displayName}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Description
          </h3>
          <p className="text-foreground leading-relaxed">{description}</p>
        </div>

        <Separator />

        {/* Function */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Function
          </h3>
          <p className="text-foreground leading-relaxed">{functionText}</p>
        </div>

        {/* R15/R6 Differences (only for body parts, not Core) */}
        {!isCore && r15R6Differences && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                R15 vs R6 Differences
              </h3>
              <p className="text-foreground leading-relaxed">{r15R6Differences}</p>
            </div>
          </>
        )}

        {/* Lore */}
        {lore && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Lore
              </h3>
              <p className="text-foreground leading-relaxed italic">{lore}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

