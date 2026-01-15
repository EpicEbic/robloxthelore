import { ReactNode, useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlassPanel } from "@/components/ui/glass-panel";

export interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export interface EntryTabsProps {
  /**
   * Array of tab configurations
   */
  tabs: TabConfig[];
  
  /**
   * Currently active tab ID
   */
  activeTab: string;
  
  /**
   * Callback when tab changes
   */
  onTabChange: (tabId: string) => void;
  
  /**
   * Content to render (should be conditionally rendered based on activeTab)
   */
  children: ReactNode;
  
  /**
   * Additional className for the container
   */
  className?: string;
  
  /**
   * Whether to show icons in tabs (default: true on desktop, icons only on mobile)
   */
  showLabels?: boolean;
}

/**
 * EntryTabs - Unified tab navigation with glass styling
 * 
 * Provides consistent tab navigation for all entry types with
 * glass-morphism styling and glow effects for the active tab.
 */
export function EntryTabs({
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
  showLabels = true,
}: EntryTabsProps) {
  const isMobile = useIsMobile();

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab Navigation Bar */}
      <GlassPanel
        variant="elevated"
        glow
        glowIntensity="subtle"
        rounded="xl"
        padding="none"
        className="mb-4 overflow-hidden"
      >
        <div
          className={cn(
            "flex items-stretch",
            // Horizontal scroll on mobile
            isMobile && "overflow-x-auto scrollbar-hide",
            // Flex wrap on desktop if needed
            !isMobile && "flex-wrap"
          )}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && onTabChange(tab.id)}
                className={cn(
                  // Base styles
                  "relative flex items-center gap-2 px-4 py-3 md:px-5 md:py-4",
                  "text-sm md:text-base font-medium",
                  "transition-all duration-200",
                  "flex-shrink-0",
                  // Focus styles
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  // Disabled styles
                  tab.disabled && "opacity-50 cursor-not-allowed",
                  // Active/inactive styles
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/80",
                )}
              >
                {/* Icon */}
                <Icon
                  className={cn(
                    "w-4 h-4 md:w-5 md:h-5 transition-all duration-200",
                    isActive && "glow-icon"
                  )}
                />

                {/* Label - always show on desktop, optionally on mobile */}
                {(showLabels || !isMobile) && (
                  <span className={cn(
                    isMobile && "text-xs",
                    isActive && "glow-text-subtle"
                  )}>
                    {tab.label}
                  </span>
                )}

                {/* Active indicator - glowing underline */}
                {isActive && (
                  <div
                    className={cn(
                      "absolute bottom-0 left-2 right-2 h-0.5",
                      "bg-gradient-to-r from-transparent via-primary to-transparent",
                      "shadow-[0_0_8px_rgba(var(--glow-color-rgb),0.6)]"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </GlassPanel>

      {/* Tab Content */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={activeTab}
        className="flex-1"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * TabContent - Helper component for conditional tab content rendering
 */
export interface TabContentProps {
  tabId: string;
  activeTab: string;
  children: ReactNode;
  className?: string;
}

export function TabContent({ tabId, activeTab, children, className }: TabContentProps) {
  if (tabId !== activeTab) return null;

  return (
    <div className={cn("animate-fade-in", className)}>
      {children}
    </div>
  );
}

/**
 * useEntryTabs - Hook for managing tab state
 */
export function useEntryTabs(defaultTab: string) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return {
    activeTab,
    setActiveTab,
    isActive: (tabId: string) => activeTab === tabId,
  };
}

