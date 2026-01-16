import * as React from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Sparkles, Sword, Shield, Briefcase, AlertTriangle, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TechniqueAccordion, TechniqueText } from "./technique-list";
import { CombatStyleData, AbilityData } from "@/types/wiki-types";
import { useIsMobile } from "@/hooks/use-mobile";

// Tab configuration for combat style techniques
const COMBAT_STYLE_TABS = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "passives", label: "Passives", icon: Sparkles },
  { id: "offensive", label: "Offensive", icon: Sword },
  { id: "defensive", label: "Defensive", icon: Shield },
  { id: "utilitarian", label: "Utility", icon: Briefcase },
  { id: "drawbacks", label: "Drawbacks", icon: AlertTriangle }
];

// Tab configuration for ability techniques
const ABILITY_TABS = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "passives", label: "Passives", icon: Sparkles },
  { id: "offensive", label: "Offensive", icon: Sword },
  { id: "defensive", label: "Defensive", icon: Shield },
  { id: "utilitarian", label: "Utility", icon: Briefcase },
  { id: "ultimate", label: "Ultimate", icon: Zap },
  { id: "drawbacks", label: "Drawbacks", icon: AlertTriangle }
];

interface TechniqueTabsProps {
  data: CombatStyleData | AbilityData | null;
  isAbility?: boolean;
  styleName?: string;
  abilityName?: string;
  currentEntryId?: string;
  className?: string;
}

export function TechniqueTabs({
  data,
  isAbility = false,
  styleName,
  abilityName,
  currentEntryId,
  className
}: TechniqueTabsProps) {
  const tabs = isAbility ? ABILITY_TABS : COMBAT_STYLE_TABS;
  const baseName = isAbility ? (abilityName || "Ability") : (styleName || "Combat Style");
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState<string>("");

  // Filter to only show tabs that have content
  const availableTabs = React.useMemo(() => {
    if (!data) return [];
    
    return tabs.filter(tab => {
      const category = data[tab.id as keyof typeof data];
      if (!category) return false;
      
      // Check if has techniques or text
      const hasTechniques = category.techniques && category.techniques.length > 0;
      const hasText = category.text && category.text.length > 0;
      
      return hasTechniques || hasText;
    });
  }, [data, tabs]);

  // Check if we only have overview (no need for tabs)
  const onlyHasOverview = availableTabs.length === 1 && availableTabs[0].id === "overview";

  // Default to first available tab
  const defaultTab = availableTabs.length > 0 ? availableTabs[0].id : "overview";
  
  // Initialize activeTab with defaultTab when available
  React.useEffect(() => {
    if (defaultTab && !activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, activeTab]);
  
  // Generate dynamic title based on active tab
  const getDynamicTitle = React.useCallback((tabId: string): string => {
    const tabConfig = tabs.find(t => t.id === tabId);
    if (!tabConfig) return baseName;
    
    switch (tabId) {
      case "overview":
        return `${baseName} Overview`;
      case "passives":
        return `${baseName} Passives`;
      case "offensive":
        return `${baseName} Offensive Techniques`;
      case "defensive":
        return `${baseName} Defensive Techniques`;
      case "utilitarian":
        return `${baseName} Utility Techniques`;
      case "ultimate":
        return `${baseName} Ultimate`;
      case "drawbacks":
        return `${baseName} Drawbacks`;
      default:
        return `${baseName} ${tabConfig.label}`;
    }
  }, [baseName, tabs]);
  
  // Current title based on active tab
  const currentTitle = getDynamicTitle(activeTab || defaultTab);

  if (!data || availableTabs.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        <p className="text-sm">No technique data available.</p>
      </div>
    );
  }

  // If only overview, just show the content without tabs
  if (onlyHasOverview) {
    const overviewCategory = data["overview" as keyof typeof data];
    const hasText = overviewCategory?.text && overviewCategory.text.length > 0;
    
    return (
      <div
        className={cn(
          "rounded-2xl",
          "bg-card/80 backdrop-blur-sm",
          "border border-border/50",
          "overflow-hidden",
          className
        )}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b border-border/30">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {getDynamicTitle("overview")}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {hasText && (
            <TechniqueText
              text={overviewCategory!.text!}
              currentEntryId={currentEntryId}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl",
        "bg-card/80 backdrop-blur-sm",
        "border border-border/50",
        "overflow-hidden",
        className
      )}
    >
      {/* Header - Dynamic title based on active tab */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b border-border/30">
        <h3 className="text-lg sm:text-xl font-bold text-foreground">
          {currentTitle}
        </h3>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full" onValueChange={setActiveTab}>
        {/* Tab bar - centered, vertical on mobile */}
        <div className="border-b border-border/30 px-2 sm:px-4 py-2 flex justify-center">
          <TabsList 
            className={cn(
              "bg-transparent gap-1 p-1",
              // On mobile: vertical flex layout
              // On desktop: horizontal centered flex
              isMobile 
                ? "flex flex-col w-full" 
                : "inline-flex flex-wrap justify-center"
            )}
          >
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 sm:gap-2",
                    "px-3 sm:px-4 py-2 sm:py-2.5",
                    "text-xs sm:text-sm font-medium",
                    "rounded-xl",
                    "transition-all duration-200",
                    "data-[state=active]:bg-background/60 data-[state=active]:shadow-md",
                    "data-[state=active]:border data-[state=active]:border-border/50",
                    // On mobile: full width for vertical layout
                    isMobile && "w-full justify-center"
                  )}
                >
                  {/* Use icon-force-white class to override theme colors */}
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 icon-force-white" />
                  <span className="text-force-white">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Tab content */}
        <div className="p-4 sm:p-6">
          {availableTabs.map((tab) => {
            const category = data[tab.id as keyof typeof data];
            
            if (!category) return null;
            
            const hasTechniques = category.techniques && category.techniques.length > 0;
            const hasText = category.text && category.text.length > 0;

            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {hasTechniques ? (
                  <TechniqueAccordion
                    techniques={category.techniques!}
                    currentEntryId={currentEntryId}
                  />
                ) : hasText ? (
                  <TechniqueText
                    text={category.text!}
                    currentEntryId={currentEntryId}
                  />
                ) : null}
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
