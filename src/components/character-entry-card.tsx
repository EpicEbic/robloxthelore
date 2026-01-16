
import { useState } from "react";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCharacterData } from "@/utils/character-utils";
import { EntryHeader, EntryInfoBar } from "@/components/entry";
import { CharacterImageCarousel } from "@/components/character/character-image-carousel";
import { CharacterContentTabs } from "@/components/character/character-content-tabs";
import { AppearanceOption, PersonalityOption, DevelopmentOption } from "@/types/wiki-types";
import { GlassPanel } from "@/components/ui/glass-panel";
 

// Keeping the interface for backwards compatibility
export interface CharacterInfo {
  id: string;
  name: string;
  quote?: {
    text: string;
    context?: string;
  };
  overview: string;
  personality: string;
  lifestyle: string;
  combatStyle?: string;
  abilities?: string;
  trivia?: string[];
  images?: {
    url: string;
    alt: string;
    caption: string;
  }[];
  image?: string; // Keep for backwards compatibility
  species?: string;
  age?: number | string;
  height?: string;
  status?: string;
  alignment?: string;
  appearance?: string;
}

// Updated interface to match the actual data structure for characters only
interface CharacterSections {
  appearance?: string | AppearanceOption[];
  personality?: string[] | PersonalityOption[];
  lifestyle?: string[] | any[]; // Updated to handle LifestyleOption[]
  history?: string[] | any[]; // Updated to handle HistoryOption[]
  development?: string[] | any[]; // Per-episode character information
  relationships?: string[];
  relationshipsData?: any;
  combat?: string[];
  abilities?: string[];
  abilityData?: any;
  abilityDetails?: string[];
  offensiveCapabilities?: string[];
  defensiveCapabilities?: string[];
  utilitarianCapabilities?: string[];
  drawbacks?: string[];
  trivia?: string[];
}

interface CharacterEntryCardProps {
  character: WikiEntry;
}

export function CharacterEntryCard({ character }: CharacterEntryCardProps) {
  const isMobile = useIsMobile();
  const characterData = getCharacterData(character);


  // Set default appearance - use "formless" for The Reckoner, otherwise use first appearance
  const getDefaultAppearance = () => {
    if (character.id === 'the-reckoner') {
      // Always default to "formless" for The Reckoner
      return 'formless';
    }
    // For other characters, use the first appearance if available
    return characterData.appearances.length > 0 ? characterData.appearances[0].id : 'default';
  };
  
  const [currentAppearance, setCurrentAppearance] = useState(getDefaultAppearance());
  const [currentPersonality, setCurrentPersonality] = useState(() => {
    if (Array.isArray(character.sections?.personality) && character.sections.personality.length > 0) {
      const firstPersonality = character.sections.personality[0];
      if (typeof firstPersonality === 'object' && 'id' in firstPersonality) {
        return firstPersonality.id;
      }
    }
    return 'uncoiled'; // Default to uncoiled for Bryck Manning
  });
  const [currentHistory, setCurrentHistory] = useState(() => {
    if (Array.isArray(character.sections?.history) && character.sections.history.length > 0) {
      const firstHistory = character.sections.history[0];
      if (typeof firstHistory === 'object' && 'id' in firstHistory) {
        return firstHistory.id;
      }
    }
    return 'pre-arrest'; // Default to pre-arrest for Bryck Manning
  });
  const [currentLifestyle, setCurrentLifestyle] = useState(() => {
    // For Bryck Manning, default to pre-arrest lifestyle
    if (character.id === 'bryck-manning') {
      return 'pre-arrest';
    }
    return 'default';
  });
  const [currentCombatStyle, setCurrentCombatStyle] = useState(() => {
    if (Array.isArray(character.sections?.combatStyles) && character.sections.combatStyles.length > 0) {
      return character.sections.combatStyles[0].id;
    }
    return 'standard';
  });
  const [currentDevelopment, setCurrentDevelopment] = useState(() => {
    if (Array.isArray(character.sections?.development) && character.sections.development.length > 0) {
      const firstDevelopment = character.sections.development[0];
      if (typeof firstDevelopment === 'object' && 'id' in firstDevelopment) {
        return firstDevelopment.id;
      }
    }
    return 'default';
  });
  const [currentTab, setCurrentTab] = useState('general');
  const [timelineView, setTimelineView] = useState<'development' | 'history'>('development');
  const [combatView, setCombatView] = useState<'physical' | 'ability'>('physical');
  // Extract only character-specific sections
  const characterSections: CharacterSections = {
    overview: character.sections?.overview || [],
    appearance: character.sections?.appearance,
    personality: character.sections?.personality || [],
    lifestyle: character.sections?.lifestyle || [],
    history: character.sections?.history || [],
    development: character.sections?.development || [],
    relationships: character.sections?.relationships || [],
    relationshipsData: character.sections?.relationshipsData,
    combat: character.sections?.combat || [],
    abilities: character.sections?.abilities || [],
    abilityData: character.sections?.abilityData,
    abilityDetails: character.sections?.abilityDetails || [],
    offensiveCapabilities: character.sections?.offensiveCapabilities || [],
    defensiveCapabilities: character.sections?.defensiveCapabilities || [],
    utilitarianCapabilities: character.sections?.utilitarianCapabilities || [],
    drawbacks: character.sections?.drawbacks || [],
    trivia: character.sections?.trivia || []
  };
  
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      {/* Main Entry Card with Glass Styling */}
      <GlassPanel
        variant="elevated"
        glow
        glowIntensity="subtle"
        rounded="xl"
        padding="none"
        className="min-h-full flex flex-col"
      >
        {/* Header Section */}
        <div className="rounded-t-xl overflow-hidden">
          <EntryHeader 
            title={character.title} 
            quote={characterData.quote}
            entryType="character"
          />
          
          <EntryInfoBar
            entryType="character"
            species={characterData.species}
            age={characterData.age}
            height={characterData.height}
            status={characterData.status}
            alignment={characterData.alignment}
            archetypeId={characterData.archetype}
          />
        </div>
        
        {/* Main Content - Mobile: Vertical Stack, Desktop: Side by Side */}
        <div 
          className={`gap-4 p-6 flex-1 ${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-1 lg:grid-cols-[1fr_2fr] items-start'}`}
        >
          
          <div className="min-w-0 w-full" style={{ height: 'fit-content' }}>
            <CharacterImageCarousel 
              images={character.carouselImages || []}
              appearances={characterData.appearances}
              currentAppearance={currentAppearance}
              combatStyles={character.sections?.combatStyles as any}
              currentCombatStyle={currentCombatStyle}
              currentTab={currentTab}
              abilityImages={character.abilityCarouselImages}
              lifestyles={Array.isArray(character.sections?.lifestyle) && typeof character.sections.lifestyle[0] === 'object' ? character.sections.lifestyle as any[] : []}
              currentLifestyle={currentLifestyle}
              histories={Array.isArray(character.sections?.history) && typeof character.sections.history[0] === 'object' ? character.sections.history as any[] : []}
              currentHistory={currentHistory}
              timelineView={timelineView}
              combatView={combatView}
            />
          </div>
          
          <div 
            className="min-w-0 w-full"
          >
            <CharacterContentTabs 
              sections={characterSections} 
              appearances={characterData.appearances}
              currentAppearance={currentAppearance}
              onAppearanceChange={setCurrentAppearance}
              personalities={Array.isArray(character.sections?.personality) && typeof character.sections.personality[0] === 'object' ? character.sections.personality as PersonalityOption[] : []}
              currentPersonality={currentPersonality}
              onPersonalityChange={setCurrentPersonality}
              lifestyles={Array.isArray(character.sections?.lifestyle) && typeof character.sections.lifestyle[0] === 'object' ? character.sections.lifestyle as any[] : []}
              currentLifestyle={currentLifestyle}
              onLifestyleChange={setCurrentLifestyle}
              histories={Array.isArray(character.sections?.history) && typeof character.sections.history[0] === 'object' ? character.sections.history as any[] : []}
              currentHistory={currentHistory}
              onHistoryChange={setCurrentHistory}
              developments={Array.isArray(character.sections?.development) && typeof character.sections.development[0] === 'object' ? character.sections.development as DevelopmentOption[] : []}
              currentDevelopment={currentDevelopment}
              onDevelopmentChange={setCurrentDevelopment}
              combatStyles={character.sections?.combatStyles || []}
              currentCombatStyle={currentCombatStyle}
              onCombatStyleChange={setCurrentCombatStyle}
              characterId={character.id}
              abilityName={character.abilityName}
              stats={character.stats as any}
              combatStats={character.sections?.combatStyles?.find(style => style.id === currentCombatStyle)?.combatStats}
              onTabChange={setCurrentTab}
              currentEntryId={character.id}
              onTimelineViewChange={setTimelineView}
              onCombatViewChange={setCombatView}
            />
          </div>
          
        </div>
      </GlassPanel>
    </div>
  );
}
