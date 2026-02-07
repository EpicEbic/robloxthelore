import { BodyPart, CoreData } from "@/data/bloxian-biology/body-parts";
import { Button } from "@/components/ui/button";
import { X, Sparkles, BookOpen, Cog, GitCompareArrows } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BodyPartInfoPanelProps {
  part?: BodyPart | CoreData;
  isCore?: boolean;
  onClose: () => void;
}

export function BodyPartInfoPanel({ part, isCore = false, onClose }: BodyPartInfoPanelProps) {
  if (!part) return null;

  const displayName = isCore ? 'Core' : (part as BodyPart).name;
  const description = isCore ? (part as CoreData).description : (part as BodyPart).description;
  const functionText = isCore ? (part as CoreData).function : (part as BodyPart).function;
  const lore = isCore ? (part as CoreData).lore : (part as BodyPart).lore;
  const r15R6Differences = isCore ? undefined : (part as BodyPart).r15R6Differences;

  const sections = [
    { icon: BookOpen, title: 'Description', content: description },
    { icon: Cog, title: 'Function', content: functionText },
    ...(!isCore && r15R6Differences ? [{ icon: GitCompareArrows, title: 'R15 vs R6', content: r15R6Differences }] : []),
    ...(lore ? [{ icon: Sparkles, title: 'Lore', content: lore, italic: true }] : []),
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={part.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-2.5">
            {isCore && <Sparkles className="h-5 w-5 text-primary" />}
            <h3 className="text-lg font-semibold text-foreground">{displayName}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content sections */}
        <div className="p-5 space-y-4">
          {sections.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <section.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </span>
              </div>
              <p className={`text-sm leading-relaxed text-foreground/90 ${(section as any).italic ? 'italic text-foreground/70' : ''}`}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
