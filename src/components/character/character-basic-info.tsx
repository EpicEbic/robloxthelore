
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getAlignmentColor } from "@/utils/character-utils";

interface CharacterBasicInfoProps {
  species: string;
  age: number | string;
  alignment: string;
}

export function CharacterBasicInfo({ species, age, alignment }: CharacterBasicInfoProps) {
  return (
    <>
      <div className="px-6 lg:px-8 py-6 bg-muted/20 rounded-lg border border-border/50">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
          {/* Species */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Info className="h-5 w-5 text-primary flex-shrink-0" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Species</div>
              <div className="text-lg font-semibold break-words hyphens-auto" style={{color: 'white !important'}}>
                {species}
              </div>
            </div>
          </div>
          
          {/* Age */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-primary font-bold text-lg">#</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Age</div>
              <div className="text-lg font-semibold break-words hyphens-auto" style={{color: 'white !important'}}>
                {age}
              </div>
            </div>
          </div>
          
          {/* Alignment */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-primary font-bold text-lg">⚖</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-2">Alignment</div>
              <div className="flex items-center gap-2 flex-wrap">
                {alignment.split("/").map((align, index) => (
                  <span key={index} className={`px-3 py-1.5 ${getAlignmentColor(align.trim())} text-white text-sm font-semibold rounded-md shadow-sm ${index > 0 ? 'ml-0' : ''} break-words`}>
                    {align}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="mb-4" />
    </>
  );
}
