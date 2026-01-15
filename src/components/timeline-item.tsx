import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { WhatsNewEntry, ChangeCategory } from "@/types/whats-new-types";
import { ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: WhatsNewEntry;
  isLast: boolean;
  selectedCategory?: ChangeCategory | null;
}

const categoryColors: Record<ChangeCategory, string> = {
  new: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
  changes: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
  fixes: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
  removals: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
  others: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
};

const categoryLabels: Record<ChangeCategory, string> = {
  new: "New",
  changes: "Changes",
  fixes: "Fixes",
  removals: "Removals",
  others: "Others",
};

export function TimelineItem({ item, isLast, selectedCategory: globalSelectedCategory }: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedCategory, setLocalSelectedCategory] = useState<ChangeCategory | null>(null);
  
  // Use local category if no global category is set, otherwise use global
  const activeCategory = globalSelectedCategory !== undefined ? globalSelectedCategory : localSelectedCategory;
  
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Group changes by category
  const changesByCategory = useMemo(() => {
    if (!item.changes) return {};
    const grouped: Record<ChangeCategory, typeof item.changes> = {
      new: [],
      changes: [],
      fixes: [],
      removals: [],
      others: [],
    };
    item.changes.forEach(change => {
      grouped[change.category].push(change);
    });
    return grouped;
  }, [item.changes]);

  // Check if there are any changes to display
  const hasChangesToDisplay = useMemo(() => {
    if (!item.changes || item.changes.length === 0) return false;
    if (!activeCategory) return true;
    return changesByCategory[activeCategory]?.length > 0;
  }, [item.changes, activeCategory, changesByCategory]);

  // Get available categories for this entry
  const availableCategories = useMemo(() => {
    return (Object.keys(categoryLabels) as ChangeCategory[]).filter(
      category => changesByCategory[category as ChangeCategory]?.length > 0
    );
  }, [changesByCategory]);

  return (
    <div className="relative pl-8 sm:pl-12 py-4 group">
      {/* Stem and Dot */}
      <div className="flex flex-col items-center w-8 sm:w-12 absolute left-0 top-0 h-full">
        {!isLast && <div className="w-px h-full bg-border group-hover:bg-primary transition-colors duration-300" />}
      </div>
      <div className="absolute left-0 top-6 -ml-1.5 sm:-ml-1">
        <div className="w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors duration-300" />
        <div className={cn(
          "absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping-slow transition-opacity duration-300",
          isOpen ? "opacity-50" : "opacity-0 group-hover:opacity-50"
        )} />
      </div>

      {/* Content */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Card className="bg-card/80 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg cursor-pointer rounded-xl">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-xl font-bold text-left">{item.title}</CardTitle>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-sm font-mono flex-shrink-0">{formattedDate}</Badge>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-left">{item.description}</p>
                
                {item.changes && item.changes.length > 0 && availableCategories.length > 0 && (
                  <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Filter by category:</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant={activeCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (globalSelectedCategory === undefined) {
                            setLocalSelectedCategory(null);
                          }
                        }}
                        className="rounded-xl transition-all text-xs"
                      >
                        All
                      </Button>
                      {availableCategories.map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (globalSelectedCategory === undefined) {
                              setLocalSelectedCategory(activeCategory === category ? null : category);
                            }
                          }}
                          className={cn(
                            "rounded-xl transition-all border-2 text-xs",
                            activeCategory === category 
                              ? categoryColors[category] + " font-semibold" 
                              : "hover:bg-muted/50"
                          )}
                          disabled={globalSelectedCategory !== undefined}
                        >
                          {categoryLabels[category]}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {hasChangesToDisplay ? (
                  <div className="space-y-4">
                    {Object.entries(changesByCategory).map(([category, changes]) => {
                      if (changes.length === 0) return null;
                      if (activeCategory && category !== activeCategory) return null;
                      
                      return (
                        <div key={category} className="space-y-2">
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs font-semibold", categoryColors[category as ChangeCategory])}
                          >
                            {categoryLabels[category as ChangeCategory]}
                          </Badge>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 text-left">
                            {changes.map((change, index) => (
                              <li key={index}>{change.text}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : activeCategory ? (
                  <p className="text-sm text-muted-foreground italic">No changes in this category for this update.</p>
                ) : item.changes && item.changes.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No changes listed for this update.</p>
                ) : null}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}
