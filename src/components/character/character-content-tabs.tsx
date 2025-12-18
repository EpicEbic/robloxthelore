import { User, Home, Heart, Sword, Swords, Zap, ScrollText, Shirt, Drama, Shield, Wrench, AlertTriangle, Clock, HandMetal, HandFist, ArrowRightFromLine, BookOpen, Sparkles, Target, ShieldCheck, Briefcase } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CharacterTriviaItem } from "./character-trivia-item";
import { CharacterAppearanceSwitcher } from "./character-appearance-switcher";
import { CharacterPersonalitySwitcher } from "./character-personality-switcher";
import { CharacterLifestyleSwitcher } from "./character-lifestyle-switcher";
import { CharacterHistorySwitcher } from "./character-history-switcher";
import { CharacterCombatStyleSwitcher } from "./character-combat-style-switcher";
import { CharacterStatBarChart } from "./character-stat-bar-chart";
import { createCharacterStats, createCombatStats, CharacterStats, CombatStats } from "./character-stat-chart";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { AppearanceOption, PersonalityOption, HistoryOption, CombatStyleOption, WikiEntry } from "@/types/wiki-types";
import { RelationshipSelector } from "./relationship-selector";
import { RelationshipDisplay } from "./relationship-display";
import { sampleWikiEntries } from "@/data/sample-wiki-entries";
import { AbilityCategory } from "./ability-category";
import { CombatStyleCategory } from "./combat-style-category";

interface CharacterSections {
  appearance?: string | AppearanceOption[]; // Made optional to match the interface in character-entry-card.tsx
  personality?: string[] | PersonalityOption[];
  lifestyle?: string[];
  history?: string[];
  relationships?: string[];
  relationshipsData?: any;
  combat?: string[];
  abilities?: string[];
  abilityData?: any; // New structured ability data
  abilityDetails?: string[]; // Legacy field
  offensiveCapabilities?: string[]; // Legacy field
  defensiveCapabilities?: string[]; // Legacy field
  utilitarianCapabilities?: string[]; // Legacy field
  drawbacks?: string[]; // Legacy field
  trivia?: string[];
}

interface CharacterContentTabsProps {
  sections: CharacterSections;
  appearances?: AppearanceOption[];
  currentAppearance?: string;
  onAppearanceChange?: (appearanceId: string) => void;
  personalities?: PersonalityOption[];
  currentPersonality?: string;
  onPersonalityChange?: (personalityId: string) => void;
  lifestyles?: any[];
  currentLifestyle?: string;
  onLifestyleChange?: (lifestyleId: string) => void;
  histories?: HistoryOption[];
  currentHistory?: string;
  onHistoryChange?: (historyId: string) => void;
  combatStyles?: CombatStyleOption[];
  currentCombatStyle?: string;
  onCombatStyleChange?: (styleId: string) => void;
  characterId?: string;
  abilityName?: string;
  stats?: CharacterStats;
  combatStats?: CombatStats;
  onTabChange?: (tabValue: string) => void;
  currentEntryId?: string;
  onLifestyleHistoryViewChange?: (view: 'lifestyle' | 'history') => void;
  onCombatViewChange?: (view: 'physical' | 'ability') => void;
}

export function CharacterContentTabs({ 
  sections, 
  appearances = [], 
  currentAppearance = 'default',
  onAppearanceChange,
  personalities = [],
  currentPersonality = 'default', 
  onPersonalityChange,
  lifestyles = [],
  currentLifestyle = 'default',
  onLifestyleChange,
  histories = [],
  currentHistory = 'pre-arrest',
  onHistoryChange,
  combatStyles = [],
  currentCombatStyle = 'standard',
  onCombatStyleChange,
  characterId,
  abilityName,
  stats,
  combatStats,
  onTabChange,
  currentEntryId,
  onLifestyleHistoryViewChange,
  onCombatViewChange
}: CharacterContentTabsProps) {
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const contentHeightRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldAnimateLayout, setShouldAnimateLayout] = useState(false);

  // State for Physical/Ability switcher
  const [combatView, setCombatView] = useState<'physical' | 'ability'>('physical');
  const [displayCombatView, setDisplayCombatView] = useState<'physical' | 'ability'>('physical');
  const [isCombatFading, setIsCombatFading] = useState(false);
  const combatFadeTimeoutRef = useRef<number | null>(null);

  // State for Lifestyle/History switcher in Timeline tab
  const [timelineView, setTimelineView] = useState<'lifestyle' | 'history'>('lifestyle');
  const [displayTimelineView, setDisplayTimelineView] = useState<'lifestyle' | 'history'>('lifestyle');
  const [isTimelineFading, setIsTimelineFading] = useState(false);
  const timelineFadeTimeoutRef = useRef<number | null>(null);

  // State for selected relationship
  const [selectedRelationship, setSelectedRelationship] = useState<WikiEntry | null>(null);

  // Check if abilities section has content
  const hasAbilities = (sections.abilities && sections.abilities.length > 0) ||
    (sections.abilityData) ||
    (sections.abilityDetails && sections.abilityDetails.length > 0) ||
    (sections.offensiveCapabilities && sections.offensiveCapabilities.length > 0) ||
    (sections.defensiveCapabilities && sections.defensiveCapabilities.length > 0) ||
    (sections.utilitarianCapabilities && sections.utilitarianCapabilities.length > 0) ||
    (sections.drawbacks && sections.drawbacks.length > 0);

  // Force physical view when character has no abilities
  useEffect(() => {
    if (!hasAbilities && combatView === 'ability') {
      setCombatView('physical');
      setDisplayCombatView('physical');
    }
  }, [hasAbilities, combatView]);

  // Track content height changes and only animate when height actually changes
  useEffect(() => {
    if (!contentRef.current) return;
    
    let timeoutId: number | undefined;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        const oldHeight = contentHeightRef.current;
        
        // Only animate if height changes by more than 10px (threshold to avoid minor jitter)
        if (oldHeight > 0 && Math.abs(newHeight - oldHeight) > 10) {
          setShouldAnimateLayout(true);
          // Reset after animation completes
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => setShouldAnimateLayout(false), 600);
        } else if (oldHeight === 0) {
          // Initial measurement, don't animate
          contentHeightRef.current = newHeight;
        } else {
          // Height stayed roughly the same, don't animate
          setShouldAnimateLayout(false);
        }
        
        contentHeightRef.current = newHeight;
      }
    });
    
    observer.observe(contentRef.current);
    
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentAppearance, currentPersonality, currentLifestyle, currentHistory, currentCombatStyle, displayCombatView, displayTimelineView]);

  // Get current appearance description
  const getCurrentAppearanceDescription = () => {
    if (appearances.length > 0) {
      const current = appearances.find(app => app.id === currentAppearance);
      const description = current?.description || appearances[0].description;
      
      // Handle both string and string array formats
      if (Array.isArray(description)) {
        return description;
      }
      return [description];
    }
    return typeof sections.appearance === 'string' ? [sections.appearance] : [''];
  };

  // Get current personality description
  const getCurrentPersonalityDescription = () => {
    if (personalities.length > 0) {
      const current = personalities.find(pers => pers.id === currentPersonality);
      return current?.description || personalities[0].description;
    }
    if (Array.isArray(sections.personality)) {
      // Handle both old string[] format and new PersonalityOption[] format
      const firstPersonality = sections.personality[0];
      if (typeof firstPersonality === 'string') {
        return sections.personality as string[];
      } else if (firstPersonality && typeof firstPersonality === 'object' && 'description' in firstPersonality) {
        return firstPersonality.description;
      }
    }
    return [];
  };

  // Get current lifestyle description
  const getCurrentLifestyleDescription = () => {
    if (lifestyles && lifestyles.length > 0) {
      const current = lifestyles.find(life => life.id === currentLifestyle);
      return current?.description || lifestyles[0]?.description || [];
    }
    if (Array.isArray(sections.lifestyle)) {
      return sections.lifestyle as string[];
    }
    return [];
  };

  // Get current history description
  const getCurrentHistoryDescription = () => {
    // For simple string array history (like Bryck Manning), just return the sections.history
    if (Array.isArray(sections.history) && sections.history.length > 0 && typeof sections.history[0] === 'string') {
      return sections.history as string[];
    }
    // For dropdown-based history (other characters)
    if (histories && histories.length > 0) {
      const current = histories.find(hist => hist.id === currentHistory);
      return current?.description || histories[0]?.description || [];
    }
    return sections.history || [];
  };

  const getCurrentCombatStyleDescription = () => {
    if (combatStyles.length > 0) {
      const current = combatStyles.find(style => style.id === currentCombatStyle);
      return current?.description || combatStyles[0].description;
    }
    return sections.combat || [];
  };

  const getCurrentCombatStats = () => {
    if (combatStyles.length > 0) {
      const current = combatStyles.find(style => style.id === currentCombatStyle);
      if (current?.combatStats) {
        // combatStats is already in the correct {strength: {label, value}} format from createCombatStats()
        return current.combatStats;
      }
    }
    return combatStats;
  };

  // Handle tab change and preserve scroll position
  const handleTabChange = (value: string) => {
    // Save current scroll position
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (viewport) {
        scrollPositionRef.current = viewport.scrollTop;
      }
    }
    
    // Call the original onTabChange if provided
    onTabChange?.(value);
    
    // Restore scroll position after content renders
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollAreaRef.current) {
          const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
          if (viewport) {
            viewport.scrollTop = scrollPositionRef.current;
          }
        }
      });
    });
  };

  return (
    <div className="min-h-0 flex flex-col">
      <Tabs defaultValue="general" className="w-full h-full flex flex-col" onValueChange={handleTabChange}>
        <TabsList className="mb-6 w-full flex flex-wrap justify-center lg:w-auto lg:mx-auto gap-3 p-3 h-auto rounded-xl">
          <TabsTrigger value="general" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <User className="h-5 w-5 flex-shrink-0" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <ArrowRightFromLine className="h-5 w-5 flex-shrink-0" />
            <span>Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="relationships" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <Heart className="h-5 w-5 flex-shrink-0" />
            <span>Relationships</span>
          </TabsTrigger>
          <TabsTrigger value="combat" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <Swords className="h-5 w-5 flex-shrink-0" />
            <span>Combat</span>
          </TabsTrigger>
          <TabsTrigger value="trivia" className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap">
            <ScrollText className="h-5 w-5 flex-shrink-0" />
            <span>Trivia</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 min-h-0">
          <ScrollArea ref={scrollAreaRef} className="h-full w-full">
            <div 
              ref={contentRef}
              className="pr-4"
            >
              <TabsContent value="general" className="space-y-4 mt-0">
                <motion.div 
                  layout={shouldAnimateLayout}
                  className="bg-card rounded-xl p-8 border min-w-0 min-h-[120px] relative"
                  transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                >
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 flex-shrink-0">
                      <Shirt className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                      Appearance
                    </h2>
                    <div className="flex-shrink-0 min-w-0 flex-1 max-w-xs">
                      <CharacterAppearanceSwitcher
                        appearances={appearances}
                        currentAppearance={currentAppearance}
                        onAppearanceChange={onAppearanceChange || (() => {})}
                      />
                    </div>
                  </div>
                  <motion.div 
                    layout={shouldAnimateLayout}
                    className="text-foreground/90 min-w-0 text-base"
                    transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                  >
                    {getCurrentAppearanceDescription().map((paragraph, idx) => (
                      <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                        <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                      </p>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div 
                  layout={shouldAnimateLayout}
                  className="bg-card rounded-xl p-6 border min-w-0"
                  transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <Drama className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                      Personality
                    </h2>
                    {personalities.length > 0 && onPersonalityChange && (
                      <CharacterPersonalitySwitcher
                        personalities={personalities}
                        currentPersonality={currentPersonality}
                        onPersonalityChange={onPersonalityChange}
                      />
                    )}
                  </div>
                  <motion.div 
                    layout={shouldAnimateLayout}
                    className="text-foreground/90 min-w-0 text-base"
                    transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                  >
                    {getCurrentPersonalityDescription().map((paragraph, idx) => (
                      <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                        <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                      </p>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-0 space-y-4">
                {/* Lifestyle/History Switcher Buttons */}
                {sections.history && Array.isArray(sections.history) && sections.history.length > 0 && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex gap-2">
                      <Button
                        variant={timelineView === 'lifestyle' ? 'default' : 'outline'}
                        onClick={() => {
                          if (timelineView === 'lifestyle') return;
                          setIsTimelineFading(true);
                          timelineFadeTimeoutRef.current && window.clearTimeout(timelineFadeTimeoutRef.current);
                          timelineFadeTimeoutRef.current = window.setTimeout(() => {
                            setDisplayTimelineView('lifestyle');
                            setTimelineView('lifestyle');
                            onLifestyleHistoryViewChange?.('lifestyle');
                            setIsTimelineFading(false);
                          }, 180);
                        }}
                        className="flex items-center gap-2 rounded-xl text-base px-4 py-2"
                      >
                        <Home className="h-5 w-5" />
                        Lifestyle
                      </Button>
                      <Button
                        variant={timelineView === 'history' ? 'default' : 'outline'}
                        onClick={() => {
                          if (timelineView === 'history') return;
                          setIsTimelineFading(true);
                          timelineFadeTimeoutRef.current && window.clearTimeout(timelineFadeTimeoutRef.current);
                          timelineFadeTimeoutRef.current = window.setTimeout(() => {
                            setDisplayTimelineView('history');
                            setTimelineView('history');
                            onLifestyleHistoryViewChange?.('history');
                            setIsTimelineFading(false);
                          }, 180);
                        }}
                        className="flex items-center gap-2 rounded-xl text-base px-4 py-2"
                      >
                        <Clock className="h-5 w-5" />
                        History
                      </Button>
                    </div>
                  </div>
                )}

                {/* Content with fade transition */}
                <div style={{ opacity: isTimelineFading ? 0 : 1, transition: 'opacity 200ms ease' }}>
                  {displayTimelineView === 'lifestyle' && (
                    <motion.div 
                      layout={shouldAnimateLayout}
                      className="bg-card rounded-xl p-6 border min-w-0"
                      transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Home className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                          Lifestyle
                        </h2>
                        {lifestyles.length > 1 && onLifestyleChange && (
                          <CharacterLifestyleSwitcher 
                            lifestyles={lifestyles}
                            currentLifestyle={currentLifestyle}
                            onLifestyleChange={onLifestyleChange}
                          />
                        )}
                      </div>
                      <motion.div 
                        layout={shouldAnimateLayout}
                        className="text-foreground/90 min-w-0 text-base"
                        transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        {getCurrentLifestyleDescription().map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-left break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {sections.history && Array.isArray(sections.history) && sections.history.length > 0 && displayTimelineView === 'history' && (
                    <motion.div 
                      layout={shouldAnimateLayout}
                      className="bg-card rounded-xl p-6 border min-w-0"
                      transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Clock className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                          History
                        </h2>
                        {histories.length > 1 && onHistoryChange && (
                          <CharacterHistorySwitcher
                            histories={histories}
                            currentHistory={currentHistory}
                            onHistoryChange={onHistoryChange}
                          />
                        )}
                      </div>
                      <motion.div 
                        layout={shouldAnimateLayout}
                        className="text-foreground/90 min-w-0 text-base"
                        transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        {getCurrentHistoryDescription().map((paragraph, idx) => (
                          <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="relationships" className="mt-0 space-y-4">
                {sections.relationshipsData && currentEntryId ? (
                  <div className="space-y-4">
                    <div className="bg-card rounded-xl p-6 border min-w-0">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Heart className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                        Relationships
                      </h2>
                      <RelationshipSelector
                        currentCharacter={sampleWikiEntries.find(e => e.id === currentEntryId)!}
                        availableCharacterIds={Object.keys(sections.relationshipsData)}
                        selectedCharacter={selectedRelationship}
                        onSelectCharacter={setSelectedRelationship}
                        allCharacters={sampleWikiEntries}
                        relationshipsData={sections.relationshipsData}
                      />
                    </div>
                    
                    {selectedRelationship && (
                      <RelationshipDisplay
                        status={sections.relationshipsData[selectedRelationship.id]?.status}
                        history={sections.relationshipsData[selectedRelationship.id]?.history}
                        images={sections.relationshipsData[selectedRelationship.id]?.images}
                        currentEntryId={currentEntryId}
                      />
                    )}
                  </div>
                ) : (
                  <div className="bg-card rounded-xl p-6 border min-w-0">
                    <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                      Relationships
                    </h2>
                    <div className="text-foreground/90 min-w-0 text-base">
                      {sections.relationships?.map((paragraph, idx) => (
                        <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                          <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="combat" className="mt-0 space-y-4">
                {/* Physical/Ability Switcher Buttons */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex gap-2">
                    <Button
                      variant={combatView === 'physical' ? 'default' : 'outline'}
                      onClick={() => {
                        if (combatView === 'physical') return;
                        setIsCombatFading(true);
                        combatFadeTimeoutRef.current && window.clearTimeout(combatFadeTimeoutRef.current);
                        combatFadeTimeoutRef.current = window.setTimeout(() => {
                          setDisplayCombatView('physical');
                          setCombatView('physical');
                          onCombatViewChange?.('physical');
                          setIsCombatFading(false);
                        }, 180);
                      }}
                      className="flex items-center gap-2 rounded-xl text-base px-4 py-2"
                    >
                      <HandFist className="h-5 w-5" />
                      Physical
                    </Button>
                    {hasAbilities && (
                      <Button
                        variant={combatView === 'ability' ? 'default' : 'outline'}
                        onClick={() => {
                          if (combatView === 'ability') return;
                          setIsCombatFading(true);
                          combatFadeTimeoutRef.current && window.clearTimeout(combatFadeTimeoutRef.current);
                          combatFadeTimeoutRef.current = window.setTimeout(() => {
                            setDisplayCombatView('ability');
                            setCombatView('ability');
                            onCombatViewChange?.('ability');
                            setIsCombatFading(false);
                          }, 180);
                        }}
                        className="flex items-center gap-2 rounded-xl text-base px-4 py-2"
                      >
                        <Zap className="h-5 w-5" />
                        Ability
                      </Button>
                    )}
                  </div>
                </div>

                {/* Content with fade transition */}
                <div style={{ opacity: isCombatFading ? 0 : 1, transition: 'opacity 200ms ease' }}>
                  {displayCombatView === 'physical' && (
                    <>
                      {/* Combat Stat Chart */}
                      <CharacterStatBarChart 
                        stats={getCurrentCombatStats() || createCombatStats("A", "A", "A", "A", "A")} 
                        characterId={characterId}
                        abilityName="Physical"
                        isPhysicalStats={true}
                        className="mb-4"
                        currentCombatStyle={currentCombatStyle}
                        combatStyles={combatStyles}
                        onCombatStyleChange={onCombatStyleChange}
                      />
                      
                      {/* Combat Style Categories */}
                      {(() => {
                        const currentCombatStyleData = combatStyles.find(s => s.id === currentCombatStyle)?.combatStyleData;
                        
                        if (currentCombatStyleData) {
                          return (
                            <motion.div 
                              layout={shouldAnimateLayout}
                              className="bg-card rounded-xl p-6 border min-w-0 relative"
                              transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                            >
                              <div className="flex items-center justify-between mb-4 gap-4">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                  <HandFist className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                                  {combatStyles.find(s => s.id === currentCombatStyle)?.label || "Combat Style"}
                                </h2>
                              </div>
                              
                              <div className="space-y-4">
                                <CombatStyleCategory
                                  title={`${combatStyles.find(s => s.id === currentCombatStyle)?.label || "Combat Style"} Overview`}
                                  icon={BookOpen}
                                  category={currentCombatStyleData.overview}
                                  currentEntryId={currentEntryId}
                                />
                                
                                <CombatStyleCategory
                                  title="Passives"
                                  icon={Sparkles}
                                  category={currentCombatStyleData.passives}
                                  currentEntryId={currentEntryId}
                                />
                                
                                <CombatStyleCategory
                                  title="Offensive Techniques"
                                  icon={Sword}
                                  category={currentCombatStyleData.offensive}
                                  currentEntryId={currentEntryId}
                                />
                                
                                <CombatStyleCategory
                                  title="Defensive Techniques"
                                  icon={ShieldCheck}
                                  category={currentCombatStyleData.defensive}
                                  currentEntryId={currentEntryId}
                                />
                                
                                <CombatStyleCategory
                                  title="Utilitarian Techniques"
                                  icon={Briefcase}
                                  category={currentCombatStyleData.utilitarian}
                                  currentEntryId={currentEntryId}
                                />
                                
                                <CombatStyleCategory
                                  title="Drawbacks"
                                  icon={AlertTriangle}
                                  category={currentCombatStyleData.drawbacks}
                                  currentEntryId={currentEntryId}
                                />
                              </div>
                            </motion.div>
                          );
                        }
                        
                        // Fallback to old description format
                        return (
                          <motion.div 
                            layout={shouldAnimateLayout}
                            className="bg-card rounded-xl p-6 border min-w-0 relative"
                            transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                          >
                            <div className="flex items-start justify-between mb-4 gap-4">
                              <h2 className="text-2xl font-semibold flex items-center gap-2 flex-shrink-0">
                                <HandFist className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                                Combat Style
                              </h2>
                              <div className="flex-shrink-0 min-w-0 flex-1 max-w-xs">
                                <CharacterCombatStyleSwitcher
                                  combatStyles={combatStyles || []}
                                  currentStyle={currentCombatStyle}
                                  onStyleChange={onCombatStyleChange || (() => {})}
                                />
                              </div>
                            </div>
                            <motion.div 
                              layout={shouldAnimateLayout}
                              className="text-foreground/90 min-w-0 text-base"
                              transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                            >
                              {getCurrentCombatStyleDescription().map((paragraph, idx) => (
                                <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                  <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                </p>
                              ))}
                            </motion.div>
                          </motion.div>
                        );
                      })()}
                    </>
                  )}

                  {hasAbilities && displayCombatView === 'ability' && (
                    <div className="space-y-4">
                      {/* Ability Stat Chart */}
                      <CharacterStatBarChart 
                        stats={stats || createCharacterStats("A", "A", "A", "A")} 
                        characterId={characterId}
                        abilityName={abilityName}
                        isPhysicalStats={false}
                        className="mb-4"
                      />
                      
                      {/* New Structured Ability Layout */}
                      {sections.abilityData ? (
                        <div className="bg-card rounded-xl p-6 border min-w-0 relative">
                          <div className="space-y-4">
                            <AbilityCategory
                              title="Overview"
                              icon={BookOpen}
                              category={sections.abilityData.overview}
                              currentEntryId={currentEntryId}
                            />
                            
                            <AbilityCategory
                              title="Passives"
                              icon={Sparkles}
                              category={sections.abilityData.passives}
                              currentEntryId={currentEntryId}
                            />
                            
                            <AbilityCategory
                              title="Offensive Techniques"
                              icon={Target}
                              category={sections.abilityData.offensive}
                              currentEntryId={currentEntryId}
                            />
                            
                            <AbilityCategory
                              title="Defensive Techniques"
                              icon={ShieldCheck}
                              category={sections.abilityData.defensive}
                              currentEntryId={currentEntryId}
                            />
                            
                            <AbilityCategory
                              title="Utilitarian Techniques"
                              icon={Briefcase}
                              category={sections.abilityData.utilitarian}
                              currentEntryId={currentEntryId}
                            />
                            
                            <AbilityCategory
                              title="Drawbacks"
                              icon={AlertTriangle}
                              category={sections.abilityData.drawbacks}
                              currentEntryId={currentEntryId}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Legacy Abilities Section - fallback for existing data */}
                          {sections.abilities && sections.abilities.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border min-w-0">
                              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <Zap className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                                Ability Details
                              </h2>
                              <div className="text-foreground/90 min-w-0 text-base">
                                {sections.abilities?.map((paragraph, idx) => (
                                  <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.abilityDetails && sections.abilityDetails.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border min-w-0">
                              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <ScrollText className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                                Ability Details
                              </h2>
                              <div className="text-foreground/90 min-w-0 text-base">
                                {sections.abilityDetails?.map((paragraph, idx) => (
                                  <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.offensiveCapabilities && sections.offensiveCapabilities.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border min-w-0">
                              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <Sword className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                                Offensive Capabilities
                              </h2>
                              <div className="text-foreground/90 min-w-0 text-base">
                                {sections.offensiveCapabilities?.map((paragraph, idx) => (
                                  <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.defensiveCapabilities && sections.defensiveCapabilities.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border min-w-0">
                              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <Shield className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                                Defensive Capabilities
                              </h2>
                              <div className="text-foreground/90 min-w-0 text-base">
                                {sections.defensiveCapabilities?.map((paragraph, idx) => (
                                  <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.utilitarianCapabilities && sections.utilitarianCapabilities.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border min-w-0">
                              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <Wrench className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                                Utilitarian Capabilities
                              </h2>
                              <div className="text-foreground/90 min-w-0 text-base">
                                {sections.utilitarianCapabilities?.map((paragraph, idx) => (
                                  <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.drawbacks && sections.drawbacks.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border min-w-0">
                              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                                Drawbacks
                              </h2>
                              <div className="text-foreground/90 min-w-0 text-base">
                                {sections.drawbacks?.map((paragraph, idx) => (
                                  <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="trivia" className="mt-0">
                <div className="bg-card rounded-xl p-6 border min-w-0">
                  <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                    <ScrollText className="h-6 w-6 text-primary-foreground flex-shrink-0 " />
                    Trivia
                  </h2>
                  <ul className="list-disc space-y-3 ml-5 text-foreground/90 min-w-0">
                    {sections.trivia?.map((item, idx) => (
                      <li key={idx} className="break-words whitespace-normal overflow-wrap-anywhere">
                        <CharacterTriviaItem item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
