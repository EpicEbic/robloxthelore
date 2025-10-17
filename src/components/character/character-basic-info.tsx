
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
      <div className="px-4 lg:px-6 py-3 bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 min-w-0">
            <Info className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="font-medium flex-shrink-0" style={{color: 'white !important'}}>Species:</span>
            <span className="break-words hyphens-auto min-w-0" style={{color: 'white !important'}}>{species}</span>
          </div>
          
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium flex-shrink-0" style={{color: 'white !important'}}>Age:</span>
            <span className="break-words hyphens-auto min-w-0" style={{color: 'white !important'}}>{age}</span>
          </div>
          
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium flex-shrink-0" style={{color: 'white !important'}}>Alignment:</span>
            <div className="flex items-center gap-1 flex-wrap min-w-0">
              {alignment.split("/").map((align, index) => (
                <span key={index} className={`px-2 py-1 ${getAlignmentColor(align.trim())} text-white text-xs font-semibold rounded ${index > 0 ? 'ml-1' : ''} break-words`}>
                  {align}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="mb-2" />
    </>
  );
}
