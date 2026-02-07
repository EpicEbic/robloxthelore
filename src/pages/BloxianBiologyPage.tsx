import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { InteractiveBloxianDiagram } from "@/components/bloxian-biology/interactive-bloxian-diagram";
import { BodyPartInfoPanel } from "@/components/bloxian-biology/body-part-info-panel";
import { BodyPart, CoreData } from "@/data/bloxian-biology/body-parts";
import { cn } from "@/lib/utils";

export default function BloxianBiologyPage() {
  const [bodyType, setBodyType] = useState<'r15' | 'r6'>('r15');
  const [selectedPart, setSelectedPart] = useState<BodyPart | CoreData | null>(null);
  const [isCoreSelected, setIsCoreSelected] = useState(false);

  const handlePartSelect = (part: BodyPart | CoreData, isCore: boolean) => {
    setSelectedPart(part);
    setIsCoreSelected(isCore);
  };

  const handleClose = () => {
    setSelectedPart(null);
    setIsCoreSelected(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Activity className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Bloxian Biology
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Explore the anatomy of Bloxians with interactive diagrams. Click on any body part or the Core to learn more about its function and lore.
        </p>
      </div>

      {/* Body Type Toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <Button
          variant={bodyType === 'r15' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setBodyType('r15'); handleClose(); }}
          className={cn("min-w-[80px] transition-all", bodyType === 'r15' && "shadow-md")}
        >
          R15
        </Button>
        <Button
          variant={bodyType === 'r6' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setBodyType('r6'); handleClose(); }}
          className={cn("min-w-[80px] transition-all", bodyType === 'r6' && "shadow-md")}
        >
          R6
        </Button>
      </div>

      {/* Main content: diagram + info panel side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Diagram */}
        <div className="flex justify-center">
          <div className="w-full max-w-[320px] md:max-w-[360px] rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 shadow-sm">
            <InteractiveBloxianDiagram
              bodyType={bodyType}
              onPartSelect={handlePartSelect}
            />
            <p className="text-center text-xs text-muted-foreground mt-4">
              {bodyType === 'r15' ? '15 body parts' : '6 body parts'} · Click to inspect
            </p>
          </div>
        </div>

        {/* Info panel */}
        <div className="min-h-[200px]">
          {selectedPart ? (
            <BodyPartInfoPanel
              part={selectedPart}
              isCore={isCoreSelected}
              onClose={handleClose}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-border/40 bg-muted/20 p-8 text-center h-full flex flex-col items-center justify-center min-h-[200px]">
              <Activity className="h-8 w-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                Select a body part to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
