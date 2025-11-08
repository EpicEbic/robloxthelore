
import { MapPin, Layers, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface LocationBasicInfoProps {
  type?: string;
  size?: string;
  region?: string;
}

export function LocationBasicInfo({ type = "Unknown", size = "Unknown", region = "Unknown" }: LocationBasicInfoProps) {
  return (
    <>
      <div className="bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 p-6">
          {/* Type */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Type</div>
              <div className="text-lg font-semibold break-words hyphens-auto text-white">
                {type}
              </div>
            </div>
          </div>
          
          {/* Size */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Size</div>
              <div className="text-lg font-semibold break-words hyphens-auto text-white">
                {size}
              </div>
            </div>
          </div>
          
          {/* Region */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Region</div>
              <div className="text-lg font-semibold break-words hyphens-auto text-white">
                {region}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="mb-4" />
    </>
  );
}

