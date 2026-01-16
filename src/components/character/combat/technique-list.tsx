import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { AnimatePresence, motion } from "framer-motion";

interface Technique {
  id: string;
  title: string;
  description: string[];
}

interface TechniqueAccordionProps {
  techniques: Technique[];
  currentEntryId?: string;
  className?: string;
  emptyMessage?: string;
}

export function TechniqueAccordion({
  techniques,
  currentEntryId,
  className,
  emptyMessage = "No techniques available."
}: TechniqueAccordionProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!techniques || techniques.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {techniques.map((technique) => (
        <TechniqueAccordionItem
          key={technique.id}
          technique={technique}
          isExpanded={expandedId === technique.id}
          onToggle={() => toggleExpanded(technique.id)}
          currentEntryId={currentEntryId}
        />
      ))}
    </div>
  );
}

interface TechniqueAccordionItemProps {
  technique: Technique;
  isExpanded: boolean;
  onToggle: () => void;
  currentEntryId?: string;
}

function TechniqueAccordionItem({ 
  technique, 
  isExpanded, 
  onToggle, 
  currentEntryId 
}: TechniqueAccordionItemProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-background/40 backdrop-blur-sm",
        "border border-border/50",
        "transition-all duration-200",
        isExpanded && "border-border shadow-md"
      )}
    >
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full text-left",
          "flex items-center justify-between gap-3",
          "px-4 py-3",
          "transition-colors duration-200",
          "hover:bg-background/60",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset",
          "group"
        )}
      >
        <h4 className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
          {technique.title}
        </h4>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown 
            className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" 
          />
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-border/30">
              <div className="space-y-3 text-foreground/90">
                {technique.description.map((paragraph, idx) => (
                  <p key={idx} className="text-sm leading-relaxed">
                    <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Text-only display for categories without techniques (e.g., Overview)
interface TechniqueTextProps {
  text: string[];
  currentEntryId?: string;
  className?: string;
}

export function TechniqueText({ text, currentEntryId, className }: TechniqueTextProps) {
  if (!text || text.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3 text-foreground/90", className)}>
      {text.map((paragraph, idx) => (
        <p key={idx} className="text-sm sm:text-base leading-relaxed">
          <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
        </p>
      ))}
    </div>
  );
}

// Legacy export for backwards compatibility (if anything still uses TechniqueList)
export const TechniqueList = TechniqueAccordion;
