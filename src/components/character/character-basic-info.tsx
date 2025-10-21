
import { Info, Calendar, Scale } from "lucide-react";
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
      <div className="bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 p-6">
          {/* Species */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Species</div>
              <div className="text-lg font-semibold break-words hyphens-auto text-white">
                {species}
              </div>
            </div>
          </div>
          
          {/* Age */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Age</div>
              <div className="text-lg font-semibold break-words hyphens-auto text-white">
                {age}
              </div>
            </div>
          </div>
          
          {/* Alignment */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-2">Alignment</div>
              <div className="flex items-center gap-2 flex-wrap">
                {alignment.split("/").map((align, index) => (
                  <span key={index} className={`px-3 py-1.5 ${getAlignmentColor(align.trim())} text-white text-sm font-semibold rounded-full shadow-sm break-words`}>
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
