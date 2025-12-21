import { Package, Zap, History, ScrollText, Image, FileText, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { EquipmentMultiItems } from "./equipment-multi-items";
import { MultiItem, EquipmentOverviewOption, EquipmentTimelineOption } from "@/types/wiki-types";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CharacterTriviaItem } from "../character/character-trivia-item";
import { EquipmentAppearanceSwitcher } from "./equipment-appearance-switcher";
import { EquipmentTimelineSwitcher } from "./equipment-timeline-switcher";

interface EquipmentSections {
  overview?: string[] | EquipmentOverviewOption[];
  appearance?: string[] | EquipmentOverviewOption[];
  generalInformation?: string[] | EquipmentOverviewOption[];
  functionality?: string[];
  timeline?: string[] | EquipmentTimelineOption[];
  history?: string[];
  trivia?: string[];
}

interface EquipmentContentTabsProps {
  sections: EquipmentSections;
  multiItems?: MultiItem[];
  currentEntryId?: string;
  currentAppearance?: string;
  onAppearanceChange?: (appearanceId: string) => void;
  currentTimeline?: string;
  onTimelineChange?: (timelineId: string) => void;
  onTabChange?: (tab: string) => void;
}

export function EquipmentContentTabs({ 
  sections, 
  multiItems, 
  currentEntryId,
  currentAppearance: propCurrentAppearance,
  onAppearanceChange: propOnAppearanceChange,
  currentTimeline: propCurrentTimeline,
  onTimelineChange: propOnTimelineChange,
  onTabChange
}: EquipmentContentTabsProps) {
  const isMobile = useIsMobile();
  const hasMultiItems = multiItems && multiItems.length > 0;
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const contentHeightRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldAnimateLayout, setShouldAnimateLayout] = useState(false);
  
  // Use props if provided, otherwise use local state
  const [localCurrentAppearance, setLocalCurrentAppearance] = useState<string>(() => {
    if (Array.isArray(sections.appearance) && sections.appearance.length > 0 && typeof sections.appearance[0] === 'object') {
      return (sections.appearance as EquipmentOverviewOption[])[0].id;
    }
    return 'can'; // Default to 'can' for bloxy-cola
  });
  
  const [localCurrentTimeline, setLocalCurrentTimeline] = useState<string>(() => {
    if (Array.isArray(sections.timeline) && sections.timeline.length > 0 && typeof sections.timeline[0] === 'object') {
      return (sections.timeline as EquipmentTimelineOption[])[0].id;
    }
    return 'inception'; // Default to 'inception' for bloxy-cola
  });
  
  // Use prop values or local state
  const currentAppearance = propCurrentAppearance || localCurrentAppearance;
  const currentTimeline = propCurrentTimeline || localCurrentTimeline;
  const setCurrentAppearance = propOnAppearanceChange || setLocalCurrentAppearance;
  const setCurrentTimeline = propOnTimelineChange || setLocalCurrentTimeline;

  // Check which sections have content
  const hasOverview = (sections.overview && (Array.isArray(sections.overview) ? sections.overview.length > 0 : true)) ||
    (sections.appearance && sections.appearance.length > 0) ||
    (sections.generalInformation && sections.generalInformation.length > 0);
  const hasFunctionality = sections.functionality && sections.functionality.length > 0;
  const hasTimeline = (sections.timeline && (Array.isArray(sections.timeline) ? sections.timeline.length > 0 : true)) ||
    (sections.history && sections.history.length > 0);
  const hasTrivia = sections.trivia && sections.trivia.length > 0;

  // Determine default tab
  const getDefaultTab = () => {
    if (hasOverview) return "overview";
    if (hasFunctionality) return "functionality";
    if (hasTimeline) return "timeline";
    if (hasTrivia) return "trivia";
    return "overview";
  };


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
  }, []);

  // Handle tab change and preserve scroll position
  const handleTabChange = (value: string) => {
    // Save current scroll position
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (viewport) {
        scrollPositionRef.current = viewport.scrollTop;
      }
    }
    
    // Notify parent about tab change for image carousel
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



  // If we have multi-items, show only the items (no redundant main sections)
  if (hasMultiItems) {
    return (
      <div className="min-h-0 flex flex-col">
        <EquipmentMultiItems items={multiItems} currentEntryId={currentEntryId} />
      </div>
    );
  }

  // Build available tabs
  const availableTabs = [];
  if (hasOverview) availableTabs.push({ id: "overview", label: "Overview", icon: Package });
  if (hasFunctionality) availableTabs.push({ id: "functionality", label: "Functionality", icon: Zap });
  if (hasTimeline) availableTabs.push({ id: "timeline", label: "Timeline", icon: Clock });
  if (hasTrivia) availableTabs.push({ id: "trivia", label: "Trivia", icon: ScrollText });

  // For single items, show the traditional tab structure
  return (
    <div className="min-h-0 flex flex-col">
      <Tabs defaultValue={getDefaultTab()} className="w-full h-full flex flex-col" onValueChange={handleTabChange}>
        <TabsList className="mb-6 w-full flex flex-wrap justify-center lg:w-auto lg:mx-auto gap-3 p-3 h-auto rounded-xl">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex items-center gap-2 text-sm sm:text-base px-4 py-3 sm:py-4 rounded-xl whitespace-nowrap"
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        <div className="flex-1 min-h-0">
          <ScrollArea ref={scrollAreaRef} className="h-full w-full">
            <div 
              ref={contentRef}
              className="pr-4"
            >
              {hasOverview && (
                <TabsContent value="overview" className="mt-0 space-y-4">
                  {/* Display both Appearance and General Information at the same time, like character Overview */}
                  
                  {/* Appearance section - with dropdown switcher like character entries */}
                  {sections.appearance && sections.appearance.length > 0 && (
                    <motion.div 
                      layout={shouldAnimateLayout}
                      className="bg-card rounded-xl p-8 border min-w-0 min-h-[120px] relative"
                      transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                    >
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2 flex-shrink-0">
                          <Image className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                          Appearance
                        </h2>
                        {Array.isArray(sections.appearance) && typeof sections.appearance[0] === 'object' && (
                          <div className="flex-shrink-0 min-w-0 flex-1 max-w-xs">
                            <EquipmentAppearanceSwitcher
                              appearances={sections.appearance as EquipmentOverviewOption[]}
                              currentAppearance={currentAppearance}
                              onAppearanceChange={setCurrentAppearance}
                            />
                          </div>
                        )}
                      </div>
                      <motion.div 
                        layout={shouldAnimateLayout}
                        className="text-foreground/90 min-w-0 text-base"
                        transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        {(Array.isArray(sections.appearance) && typeof sections.appearance[0] === 'object'
                          ? (sections.appearance as EquipmentOverviewOption[]).find(app => app.id === currentAppearance)?.description || (sections.appearance as EquipmentOverviewOption[])[0]?.description || []
                          : sections.appearance as string[]
                        ).map((paragraph, idx) => (
                          <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* General Information section - handle both structured and simple arrays */}
                  {sections.generalInformation && sections.generalInformation.length > 0 && (
                    Array.isArray(sections.generalInformation) && typeof sections.generalInformation[0] === 'object' ? (
                      // Structured general information with subsections
                      (sections.generalInformation as EquipmentOverviewOption[]).map((infoOption) => (
                        <motion.div 
                          key={infoOption.id}
                          layout={shouldAnimateLayout}
                          className="bg-card rounded-xl p-6 border min-w-0"
                          transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                        >
                          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                            {infoOption.label}
                          </h2>
                          <motion.div 
                            layout={shouldAnimateLayout}
                            className="text-foreground/90 min-w-0 text-base"
                            transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                          >
                            {infoOption.description.map((paragraph, idx) => (
                              <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                                <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                              </p>
                            ))}
                          </motion.div>
                        </motion.div>
                      ))
                    ) : (
                      // Simple general information array
                      <motion.div 
                        layout={shouldAnimateLayout}
                        className="bg-card rounded-xl p-6 border min-w-0"
                        transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                          General Information
                        </h2>
                        <motion.div 
                          layout={shouldAnimateLayout}
                          className="text-foreground/90 min-w-0 text-base"
                          transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                        >
                          {(sections.generalInformation as string[]).map((paragraph, idx) => (
                            <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                              <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                            </p>
                          ))}
                        </motion.div>
                      </motion.div>
                    )
                  )}

                  {/* Fallback: if only main overview content exists */}
                  {sections.overview && sections.overview.length > 0 && 
                   !(sections.appearance && sections.appearance.length > 0) && 
                   !(sections.generalInformation && sections.generalInformation.length > 0) && (
                    <motion.div 
                      layout={shouldAnimateLayout}
                      className="bg-card rounded-xl p-8 border min-w-0 min-h-[120px] relative"
                      transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                    >
                      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                        Overview
                      </h2>
                      <motion.div 
                        layout={shouldAnimateLayout}
                        className="text-foreground/90 min-w-0 text-base"
                        transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                      >
                        {(sections.overview as string[]).map((paragraph, idx) => (
                          <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                          </p>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </TabsContent>
              )}
              
              {hasFunctionality && (
                <TabsContent value="functionality" className="mt-0 space-y-4">
                  <motion.div 
                    layout={shouldAnimateLayout}
                    className="bg-card rounded-xl p-6 border min-w-0"
                    transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                  >
                    <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                      Functionality
                    </h2>
                    <motion.div 
                      layout={shouldAnimateLayout}
                      className="text-foreground/90 min-w-0 text-base"
                      transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                    >
                      {sections.functionality!.map((paragraph, idx) => (
                        <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                          <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                        </p>
                      ))}
                    </motion.div>
                  </motion.div>
                </TabsContent>
              )}

              {hasTimeline && (
                <TabsContent value="timeline" className="mt-0 space-y-4">
                  {/* Timeline section - with dropdown switcher like character history */}
                  <motion.div 
                    layout={shouldAnimateLayout}
                    className="bg-card rounded-xl p-6 border min-w-0"
                    transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Clock className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                        Timeline
                      </h2>
                      {Array.isArray(sections.timeline) && typeof sections.timeline[0] === 'object' && (
                        <EquipmentTimelineSwitcher
                          timelines={sections.timeline as EquipmentTimelineOption[]}
                          currentTimeline={currentTimeline}
                          onTimelineChange={setCurrentTimeline}
                        />
                      )}
                    </div>
                    <motion.div 
                      layout={shouldAnimateLayout}
                      className="text-foreground/90 min-w-0 text-base"
                      transition={shouldAnimateLayout ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                    >
                      {(Array.isArray(sections.timeline) && typeof sections.timeline[0] === 'object'
                        ? (sections.timeline as EquipmentTimelineOption[]).find(t => t.id === currentTimeline)?.description || (sections.timeline as EquipmentTimelineOption[])[0]?.description || []
                        : sections.history || sections.timeline as string[] || []
                      ).map((paragraph, idx) => (
                        <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                          <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                        </p>
                      ))}
                    </motion.div>
                  </motion.div>
                </TabsContent>
              )}
              
              {hasTrivia && (
                <TabsContent value="trivia" className="mt-0">
                  <div className="bg-card rounded-xl p-6 border min-w-0">
                    <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      <ScrollText className="h-6 w-6 text-primary-foreground flex-shrink-0" />
                      Trivia
                    </h2>
                    <ul className="list-disc space-y-3 ml-5 text-foreground/90 min-w-0 text-base">
                      {sections.trivia!.map((item, idx) => (
                        <li key={idx} className="break-words whitespace-normal overflow-wrap-anywhere">
                          <CharacterTriviaItem item={item} currentEntryId={currentEntryId} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              )}
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
