
import { Package, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface EquipmentBasicInfoProps {
  subcategory?: string;
}

export function EquipmentBasicInfo({ subcategory }: EquipmentBasicInfoProps) {
  const getSubcategoryLabel = () => {
    if (!subcategory) return null;
    return subcategory === "artifacts" ? "Artifact" : "Standard Equipment";
  };

  const getSubcategoryIcon = () => {
    return subcategory === "artifacts" ? Sparkles : Package;
  };

  const subcategoryLabel = getSubcategoryLabel();
  const SubcategoryIcon = getSubcategoryIcon();

  if (!subcategoryLabel) return null;

  return (
    <>
      <div className="bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 p-6">
          {/* Subcategory */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <SubcategoryIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-muted-foreground mb-1">Type</div>
              <div className="text-lg font-semibold break-words hyphens-auto text-white">
                {subcategoryLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="mb-4" />
    </>
  );
}

