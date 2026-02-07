import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Activity, Info, Tag } from "lucide-react";
import { InteractiveBloxianDiagram } from "@/components/bloxian-biology/interactive-bloxian-diagram";
import { BodyPart, CoreData } from "@/data/bloxian-biology/body-parts";
import { cn } from "@/lib/utils";

export default function BloxianBiologyPage() {
  const [bodyType, setBodyType] = useState<'r15' | 'r6'>('r15');
  const [showLabels, setShowLabels] = useState(false);
  const [selectedPart, setSelectedPart] = useState<BodyPart | CoreData | null>(null);

  const handleBodyPartClick = (part: BodyPart | CoreData, isCore: boolean) => {
    setSelectedPart(part);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Activity className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Bloxian Biology
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the anatomy of Bloxians with interactive diagrams. Learn about the differences between R15 and R6 body types, and discover the mysterious Core that gives life to every Bloxian.
        </p>
      </div>

      <div className="space-y-6">
        {/* Controls - Inline with diagram */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Body Type Toggle */}
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Body Type:
            </Label>
            <div className="flex gap-2">
              <Button
                variant={bodyType === 'r15' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBodyType('r15')}
                className={cn(
                  "transition-all duration-200 min-w-[100px]",
                  bodyType === 'r15' && "shadow-md"
                )}
              >
                R15
              </Button>
              <Button
                variant={bodyType === 'r6' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBodyType('r6')}
                className={cn(
                  "transition-all duration-200 min-w-[100px]",
                  bodyType === 'r6' && "shadow-md"
                )}
              >
                R6
              </Button>
            </div>
          </div>

          {/* Labels Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={setShowLabels}
            />
            <Label htmlFor="show-labels" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
              <Tag className="h-4 w-4" />
              Show Labels
            </Label>
          </div>
        </div>

        {/* Interactive Diagram */}
        <InteractiveBloxianDiagram
          bodyType={bodyType}
          showLabels={showLabels}
          onBodyPartClick={handleBodyPartClick}
        />
      </div>
    </div>
  );
}

