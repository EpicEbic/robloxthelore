import { FusionEntry } from "@/types/fusion-types";
import { CharacterImageCarousel } from "@/components/character/character-image-carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface FusionInlineDisplayProps {
  fusion: FusionEntry;
  entry1Name: string;
  entry2Name: string;
}

export function FusionInlineDisplay({ fusion, entry1Name, entry2Name }: FusionInlineDisplayProps) {
  // Create carousel images from fusion images
  const carouselImages = fusion.images?.map((url, index) => ({
    url,
    caption: `${fusion.name} - Image ${index + 1}`
  })) || [];

  return (
    <Card className="mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-primary" />
          {fusion.name}
        </CardTitle>
        <p className="text-muted-foreground">
          Fusion of {entry1Name} and {entry2Name}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          {fusion.description}
        </p>
        
        {carouselImages.length > 0 && (
          <div className="w-full max-w-md mx-auto">
            <CharacterImageCarousel 
              images={carouselImages}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}