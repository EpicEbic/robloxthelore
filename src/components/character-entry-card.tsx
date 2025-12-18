
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { WikiEntry } from "@/contexts/wiki-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCharacterData } from "@/utils/character-utils";
import { CharacterHeader } from "@/components/character/character-header";
import { CharacterBasicInfo } from "@/components/character/character-basic-info";
import { CharacterImageCarousel } from "@/components/character/character-image-carousel";
import { CharacterContentTabs } from "@/components/character/character-content-tabs";
import { AppearanceOption, PersonalityOption } from "@/types/wiki-types";
import { motion } from "framer-motion";
 

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
  alignment?: string;
  appearance?: string;
}

// Updated interface to match the actual data structure for characters only
interface CharacterSections {
  appearance?: string | AppearanceOption[];
  personality?: string[] | PersonalityOption[];
  lifestyle?: string[] | any[]; // Updated to handle LifestyleOption[]
  history?: string[] | any[]; // Updated to handle HistoryOption[]
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
  const [currentTab, setCurrentTab] = useState('general');
  const [lifestyleHistoryView, setLifestyleHistoryView] = useState<'lifestyle' | 'history'>('lifestyle');
  const [combatView, setCombatView] = useState<'physical' | 'ability'>('physical');
  
  console.log('Character data appearances:', characterData.appearances);
  console.log('Current appearance set to:', currentAppearance);
  
  // Extract only character-specific sections
  const characterSections: CharacterSections = {
    appearance: character.sections?.appearance,
     personality: character.sections?.personality || [],
    lifestyle: character.sections?.lifestyle || [],
    history: character.sections?.history || [],
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
    <motion.div 
      layoutId={`entry-${character.id}-card`}
      className="w-full max-w-[1400px] mx-auto"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="shadow-lg border-l-4 bg-card/95 backdrop-blur-sm min-h-full flex flex-col rounded-xl" style={{
        borderLeftColor: 'var(--wiki-character)'
      }}>
        
        <div className="overflow-hidden rounded-t-xl">
          <CharacterHeader 
            title={character.title} 
            quote={characterData.quote} 
          />
          
          <CharacterBasicInfo 
            species={characterData.species}
            age={characterData.age}
            alignment={characterData.alignment}
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
            lifestyleHistoryView={lifestyleHistoryView}
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
        combatStyles={character.sections?.combatStyles || []}
        currentCombatStyle={currentCombatStyle}
        onCombatStyleChange={setCurrentCombatStyle}
            characterId={character.id}
            abilityName={character.abilityName}
            stats={character.stats as any}
            combatStats={character.sections?.combatStyles?.find(style => style.id === currentCombatStyle)?.combatStats}
            onTabChange={setCurrentTab}
            currentEntryId={character.id}
            onLifestyleHistoryViewChange={setLifestyleHistoryView}
            onCombatViewChange={setCombatView}
          />
          </div>
          
        </div>
      </Card>
    </motion.div>
  );
}
