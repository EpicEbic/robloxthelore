import { FusionEntry } from "@/types/fusion-types";
import { CharacterHeader } from "@/components/character/character-header";
import { CharacterBasicInfo } from "@/components/character/character-basic-info";
import { CharacterContentTabs } from "@/components/character/character-content-tabs";
import { CharacterImageCarousel } from "@/components/character/character-image-carousel";
import { Card } from "@/components/ui/card";

interface FusionCharacterDisplayProps {
  fusion: FusionEntry;
  entry1Name: string;
  entry2Name: string;
}

export function FusionCharacterDisplay({ fusion, entry1Name, entry2Name }: FusionCharacterDisplayProps) {
  // Create character sections from fusion data
  const sections = {
    appearance: fusion.appearance.join('\n'), // Convert array to string for compatibility
    personality: fusion.personality,
    lifestyle: fusion.lifestyle,
    history: fusion.history,
    relationships: fusion.relationships,
    combat: fusion.combat,
    abilityDetails: fusion.abilityDetails,
    offensiveCapabilities: fusion.offensiveCapabilities,
    defensiveCapabilities: fusion.defensiveCapabilities,
    utilitarianCapabilities: fusion.utilitarianCapabilities,
    drawbacks: fusion.drawbacks,
    trivia: fusion.trivia
  };

  // Create carousel images from fusion images
  const carouselImages = fusion.images?.map((url, index) => ({
    url,
    caption: `${fusion.name} - Image ${index + 1}`
  })) || [];

  return (
    <Card className="w-full max-w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Column - Image Carousel */}
        <div className="w-full lg:w-2/5 flex-shrink-0">
          <div className="h-full min-h-[400px] lg:min-h-[600px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-l-lg flex items-center justify-center p-4 lg:p-8">
            {carouselImages.length > 0 ? (
              <CharacterImageCarousel 
                images={carouselImages}
              />
            ) : (
              <div className="text-center space-y-4">
                <div className="text-6xl">⚡</div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Fusion Result</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry1Name} + {entry2Name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          {fusion.quote && (
            <CharacterHeader 
              title={fusion.name}
              quote={fusion.quote}
            />
          )}

          {/* Basic Info */}
          <div className="px-4 lg:px-6 pb-4">
            <CharacterBasicInfo
              species={fusion.species}
              age={fusion.age}
              alignment={fusion.alignment}
            />
          </div>

          {/* Content Tabs */}
          <div className="flex-1 px-4 lg:px-6 pb-6 min-w-0 overflow-hidden">
            <CharacterContentTabs
              sections={sections}
              characterId={fusion.id}
              abilityName={fusion.abilityName}
              stats={fusion.stats}
              combatStats={fusion.combatStats}
              currentEntryId={fusion.id}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}