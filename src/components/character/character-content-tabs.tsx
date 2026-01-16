import { User, Home, Heart, Sword, Swords, Zap, ScrollText, Shirt, Drama, Shield, Wrench, AlertTriangle, Clock, HandFist, ArrowRightFromLine, BookOpen, Sparkles, Target, ShieldCheck, Briefcase, FileText, Film } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";
// Removed framer-motion - no animations needed
import { CharacterTriviaItem } from "./character-trivia-item";
import { CharacterAppearanceSwitcher } from "./character-appearance-switcher";
import { CharacterPersonalitySwitcher } from "./character-personality-switcher";
import { CharacterLifestyleSwitcher } from "./character-lifestyle-switcher";
import { CharacterHistorySwitcher } from "./character-history-switcher";
import { CharacterDevelopmentSwitcher } from "./character-development-switcher";
import { createCombatStats, CombatStats } from "./character-stat-chart";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { AppearanceOption, PersonalityOption, HistoryOption, DevelopmentOption, CombatStyleOption, WikiEntry } from "@/types/wiki-types";
import { RelationshipSelector } from "./relationship-selector";
import { RelationshipDisplay } from "./relationship-display";
import { sampleWikiEntries } from "@/data/sample-wiki-entries";
// New combat section components
import { StatsCardGrid, TechniqueTabs } from "./combat";

interface CharacterSections {
  overview?: string[]; // Plot relevance and simple information
  appearance?: string | AppearanceOption[]; // Made optional to match the interface in character-entry-card.tsx
  personality?: string[] | PersonalityOption[];
  lifestyle?: string[];
  history?: string[]; // Major events/backstory
  development?: string[]; // Per-episode character information
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
  developments?: DevelopmentOption[];
  currentDevelopment?: string;
  onDevelopmentChange?: (developmentId: string) => void;
  combatStyles?: CombatStyleOption[];
  currentCombatStyle?: string;
  onCombatStyleChange?: (styleId: string) => void;
  characterId?: string;
  abilityName?: string;
  combatStats?: CombatStats;
  onTabChange?: (tabValue: string) => void;
  currentEntryId?: string;
  onTimelineViewChange?: (view: 'development' | 'history') => void;
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
  developments = [],
  currentDevelopment = 'default',
  onDevelopmentChange,
  combatStyles = [],
  currentCombatStyle = 'standard',
  onCombatStyleChange,
  characterId,
  abilityName,
  combatStats,
  onTabChange,
  currentEntryId,
  onTimelineViewChange,
  onCombatViewChange
}: CharacterContentTabsProps) {
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  // Disabled layout animations - always false
  const shouldAnimateLayout = false;

  // State for Physical/Ability switcher
  const [combatView, setCombatView] = useState<'physical' | 'ability'>('physical');
  const [displayCombatView, setDisplayCombatView] = useState<'physical' | 'ability'>('physical');
  const [isCombatFading, setIsCombatFading] = useState(false);
  const combatFadeTimeoutRef = useRef<number | null>(null);

  // State for Profile view switcher (Overview, Appearance, Personality, Lifestyle)
  const [profileView, setProfileView] = useState<'overview' | 'appearance' | 'personality' | 'lifestyle'>('overview');
  const [displayProfileView, setDisplayProfileView] = useState<'overview' | 'appearance' | 'personality' | 'lifestyle'>('overview');
  const [isProfileFading, setIsProfileFading] = useState(false);
  const profileFadeTimeoutRef = useRef<number | null>(null);

  // State for Development/History switcher in Timeline tab
  const [timelineView, setTimelineView] = useState<'development' | 'history'>('development');
  const [displayTimelineView, setDisplayTimelineView] = useState<'development' | 'history'>('development');
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

  // Set default profile view based on available content (only on mount)
  useEffect(() => {
    if (sections.overview && sections.overview.length > 0) {
      setProfileView('overview');
      setDisplayProfileView('overview');
    } else if (appearances.length > 0 || sections.appearance) {
      setProfileView('appearance');
      setDisplayProfileView('appearance');
    } else if (personalities.length > 0 || sections.personality) {
      setProfileView('personality');
      setDisplayProfileView('personality');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Force physical view when character has no abilities
  useEffect(() => {
    if (!hasAbilities && combatView === 'ability') {
      setCombatView('physical');
      setDisplayCombatView('physical');
    }
  }, [hasAbilities, combatView]);

  // ResizeObserver completely removed - was causing stretching effect

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

  // Get current development description
  const getCurrentDevelopmentDescription = () => {
    // For simple string array development, just return the sections.development
    if (Array.isArray(sections.development) && sections.development.length > 0 && typeof sections.development[0] === 'string') {
      return sections.development as string[];
    }
    // For dropdown-based development (episode selection)
    if (developments && developments.length > 0) {
      const current = developments.find(dev => dev.id === currentDevelopment);
      return current?.description || developments[0]?.description || [];
    }
    return sections.development || [];
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

  const handleTabChange = (value: string) => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (viewport) {
        scrollPositionRef.current = viewport.scrollTop;
      }
    }
    onTabChange?.(value);
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
        <TabsList className="mb-6 w-full flex flex-wrap justify-center lg:w-auto lg:mx-auto gap-1 sm:gap-1.5 p-1.5 sm:p-2 h-auto">
          <TabsTrigger value="general" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <User className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <ArrowRightFromLine className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="relationships" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Relationships</span>
          </TabsTrigger>
          <TabsTrigger value="combat" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <Swords className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Combat</span>
          </TabsTrigger>
          <TabsTrigger value="trivia" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5">
            <ScrollText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="hidden sm:inline">Trivia</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 min-h-0">
          <ScrollArea ref={scrollAreaRef} className="h-full w-full">
            <div 
              ref={contentRef}
              className="pr-4"
              style={{ transition: 'none' }}
            >
              <TabsContent value="general" className="mt-0 space-y-4">
                {/* Profile View Switcher Buttons */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      variant={profileView === 'overview' ? 'default' : 'outline'}
                      onClick={() => {
                        if (profileView === 'overview') return;
                        setIsProfileFading(true);
                        profileFadeTimeoutRef.current && window.clearTimeout(profileFadeTimeoutRef.current);
                        profileFadeTimeoutRef.current = window.setTimeout(() => {
                          setDisplayProfileView('overview');
                          setProfileView('overview');
                          setIsProfileFading(false);
                        }, 180);
                      }}
                      className="flex items-center gap-2 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Overview</span>
                    </Button>
                    <Button
                      variant={profileView === 'appearance' ? 'default' : 'outline'}
                      onClick={() => {
                        if (profileView === 'appearance') return;
                        setIsProfileFading(true);
                        profileFadeTimeoutRef.current && window.clearTimeout(profileFadeTimeoutRef.current);
                        profileFadeTimeoutRef.current = window.setTimeout(() => {
                          setDisplayProfileView('appearance');
                          setProfileView('appearance');
                          setIsProfileFading(false);
                        }, 180);
                      }}
                      className="flex items-center gap-2 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      <Shirt className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Appearance</span>
                    </Button>
                    <Button
                      variant={profileView === 'personality' ? 'default' : 'outline'}
                      onClick={() => {
                        if (profileView === 'personality') return;
                        setIsProfileFading(true);
                        profileFadeTimeoutRef.current && window.clearTimeout(profileFadeTimeoutRef.current);
                        profileFadeTimeoutRef.current = window.setTimeout(() => {
                          setDisplayProfileView('personality');
                          setProfileView('personality');
                          setIsProfileFading(false);
                        }, 180);
                      }}
                      className="flex items-center gap-2 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      <Drama className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Personality</span>
                    </Button>
                    <Button
                      variant={profileView === 'lifestyle' ? 'default' : 'outline'}
                      onClick={() => {
                        if (profileView === 'lifestyle') return;
                        setIsProfileFading(true);
                        profileFadeTimeoutRef.current && window.clearTimeout(profileFadeTimeoutRef.current);
                        profileFadeTimeoutRef.current = window.setTimeout(() => {
                          setDisplayProfileView('lifestyle');
                          setProfileView('lifestyle');
                          setIsProfileFading(false);
                        }, 180);
                      }}
                      className="flex items-center gap-2 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Lifestyle</span>
                    </Button>
                  </div>
                </div>

                {/* Content with fade transition */}
                <div style={{ opacity: isProfileFading ? 0 : 1, transition: 'opacity 200ms ease' }}>
                  {displayProfileView === 'overview' && sections.overview && sections.overview.length > 0 && (
                    <div 
                      className="bg-card rounded-xl p-8 border min-w-0 min-h-[120px] relative"
                      style={{ transition: 'none' }}
                    >
                      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                        <FileText className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                        Overview
                      </h2>
                      <div 
                        className="text-foreground/90 min-w-0 text-base"
                      >
                        {sections.overview.map((paragraph, idx) => (
                          <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayProfileView === 'appearance' && (
                    <div 
                      className="bg-card rounded-xl p-8 border min-w-0 min-h-[120px] relative"
                      style={{ transition: 'none' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Shirt className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                          Appearance
                        </h2>
                        {appearances.length > 1 && onAppearanceChange && (
                          <CharacterAppearanceSwitcher
                            appearances={appearances}
                            currentAppearance={currentAppearance}
                            onAppearanceChange={onAppearanceChange}
                          />
                        )}
                      </div>
                      <div 
                        className="text-foreground/90 min-w-0 text-base"
                      >
                        {getCurrentAppearanceDescription().map((paragraph, idx) => (
                          <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayProfileView === 'personality' && (
                    <div 
                      className="bg-card rounded-xl p-6 border min-w-0"
                      style={{ transition: 'none' }}
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
                      <div 
                        className="text-foreground/90 min-w-0 text-base"
                      >
                        {getCurrentPersonalityDescription().map((paragraph, idx) => (
                          <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayProfileView === 'lifestyle' && (
                    <div 
                      className="bg-card rounded-xl p-6 border min-w-0"
                      style={{ transition: 'none' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Home className="h-6 w-6 text-primary-foreground flex-shrink-0" />
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
                      <div 
                        className="text-foreground/90 min-w-0 text-base"
                      >
                        {getCurrentLifestyleDescription().map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-left break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-0 space-y-4">
                {/* Development/History Switcher Buttons */}
                {((sections.history && Array.isArray(sections.history) && sections.history.length > 0) || 
                  (sections.development && Array.isArray(sections.development) && sections.development.length > 0) ||
                  (developments && developments.length > 0)) && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex gap-2">
                      <Button
                        variant={timelineView === 'development' ? 'default' : 'outline'}
                        onClick={() => {
                          if (timelineView === 'development') return;
                          setIsTimelineFading(true);
                          timelineFadeTimeoutRef.current && window.clearTimeout(timelineFadeTimeoutRef.current);
                          timelineFadeTimeoutRef.current = window.setTimeout(() => {
                            setDisplayTimelineView('development');
                            setTimelineView('development');
                            onTimelineViewChange?.('development');
                            setIsTimelineFading(false);
                          }, 180);
                        }}
                        className="flex items-center gap-2 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2"
                      >
                        <Film className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">Development</span>
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
                            onTimelineViewChange?.('history');
                            setIsTimelineFading(false);
                          }, 180);
                        }}
                        className="flex items-center gap-2 rounded-xl text-sm sm:text-base px-3 sm:px-4 py-2"
                      >
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">History</span>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Content with fade transition */}
                <div style={{ opacity: isTimelineFading ? 0 : 1, transition: 'opacity 200ms ease' }}>
                  {displayTimelineView === 'development' && (
                    <div 
                      className="bg-card rounded-xl p-6 border min-w-0"
                      style={{ transition: 'none' }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Film className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                          Development
                        </h2>
                        {developments.length > 1 && onDevelopmentChange && (
                          <CharacterDevelopmentSwitcher 
                            developments={developments}
                            currentDevelopment={currentDevelopment}
                            onDevelopmentChange={onDevelopmentChange}
                          />
                        )}
                      </div>
                      <div 
                        className="text-foreground/90 min-w-0 text-base"
                      >
                        {getCurrentDevelopmentDescription().length > 0 ? (
                          getCurrentDevelopmentDescription().map((paragraph, idx) => (
                            <p key={idx} className="mb-4 text-left break-words whitespace-normal overflow-wrap-anywhere">
                              <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                            </p>
                          ))
                        ) : (
                          <p className="text-muted-foreground italic">No development information available yet.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {displayTimelineView === 'history' && (
                    <div 
                      className="bg-card rounded-xl p-6 border min-w-0"
                      style={{ transition: 'none' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Clock className="h-6 w-6 text-primary-foreground flex-shrink-0" />
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
                      <div 
                        className="text-foreground/90 min-w-0 text-base"
                      >
                        {getCurrentHistoryDescription().length > 0 ? (
                          getCurrentHistoryDescription().map((paragraph, idx) => (
                            <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                              <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                            </p>
                          ))
                        ) : (
                          <p className="text-muted-foreground italic">No history information available yet.</p>
                        )}
                      </div>
                    </div>
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
                    <div className="space-y-4">
                      {/* Physical Stats Card Grid */}
                      <StatsCardGrid
                        stats={getCurrentCombatStats() || createCombatStats("A", "A", "A", "A", "A")}
                        isPhysical={true}
                        combatStyles={combatStyles}
                        currentCombatStyle={currentCombatStyle}
                        onCombatStyleChange={onCombatStyleChange}
                      />
                      
                      {/* Combat Style Techniques */}
                      {(() => {
                        const currentCombatStyleData = combatStyles.find(s => s.id === currentCombatStyle)?.combatStyleData;
                        const styleName = combatStyles.find(s => s.id === currentCombatStyle)?.label;
                        
                        if (currentCombatStyleData) {
                          return (
                            <TechniqueTabs
                              data={currentCombatStyleData}
                              isAbility={false}
                              styleName={styleName}
                              currentEntryId={currentEntryId}
                            />
                          );
                        }
                        
                        // Fallback: Show legacy description if no structured data
                        const description = getCurrentCombatStyleDescription();
                        if (description && description.length > 0) {
                          return (
                            <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-4 sm:p-6">
                              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <HandFist className="h-5 w-5" />
                                {styleName || "Combat Style"}
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {description.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        
                        return null;
                      })()}
                    </div>
                  )}

                  {hasAbilities && displayCombatView === 'ability' && (
                    <div className="space-y-4">
                      {/* Ability Techniques */}
                      {sections.abilityData ? (
                        <TechniqueTabs
                          data={sections.abilityData}
                          isAbility={true}
                          abilityName={abilityName}
                          currentEntryId={currentEntryId}
                        />
                      ) : (
                        // Legacy fallback for unstructured ability data
                        <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-4 sm:p-6 space-y-4">
                          {sections.abilities && sections.abilities.length > 0 && (
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Ability Details
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {sections.abilities.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.abilityDetails && sections.abilityDetails.length > 0 && (
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                <ScrollText className="h-5 w-5" />
                                Ability Details
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {sections.abilityDetails.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.offensiveCapabilities && sections.offensiveCapabilities.length > 0 && (
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                <Sword className="h-5 w-5" />
                                Offensive Capabilities
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {sections.offensiveCapabilities.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.defensiveCapabilities && sections.defensiveCapabilities.length > 0 && (
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Defensive Capabilities
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {sections.defensiveCapabilities.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.utilitarianCapabilities && sections.utilitarianCapabilities.length > 0 && (
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                <Wrench className="h-5 w-5" />
                                Utilitarian Capabilities
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {sections.utilitarianCapabilities.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sections.drawbacks && sections.drawbacks.length > 0 && (
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Drawbacks
                              </h3>
                              <div className="text-foreground/90 space-y-3">
                                {sections.drawbacks.map((paragraph, idx) => (
                                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
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
                        <CharacterTriviaItem item={item} currentEntryId={currentEntryId} />
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
