import * as React from "react";
import { cn } from "@/lib/utils";
import { Sword, Shield, Zap, Target, Brain, Flame, Sparkles, X } from "lucide-react";
import { GradeBadge } from "./grade-tooltip";
import { AnimatePresence, motion } from "framer-motion";

// Import from the new unified stats system
import { 
  GradeLabel, 
  GRADE_COLORS, 
  GRADE_VALUES,
  getStatDescription,
  getStatDefinition,
  ABILITY_STAT_DESCRIPTIONS
} from "@/lib/stats";

// Icon mapping for stat categories
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  strength: Sword,
  durability: Shield,
  agility: Zap,
  precision: Target,
  intelligence: Brain,
  offense: Flame,
  defense: Shield,
  utility: Sparkles,
  potential: Zap
};

interface SubstatData {
  key: string;
  label: string;
  grade: GradeLabel;
  description?: string;
}

interface StatCardProps {
  categoryKey: string;
  categoryLabel: string;
  categoryDescription?: string;
  mainGrade: GradeLabel;
  substats: SubstatData[];
  className?: string;
  isAbility?: boolean;
}

export function StatCard({
  categoryKey,
  categoryLabel,
  categoryDescription,
  mainGrade,
  substats,
  className,
  isAbility = false
}: StatCardProps) {
  const Icon = CATEGORY_ICONS[categoryKey] || Sword;
  const [expandedStat, setExpandedStat] = React.useState<SubstatData | null>(null);

  const handleGradeClick = (substat: SubstatData) => {
    setExpandedStat(expandedStat?.key === substat.key ? null : substat);
  };

  const closeExpanded = () => {
    setExpandedStat(null);
  };

  // Determine the stat domain based on isAbility prop
  const domain = isAbility ? "ability" : "physical";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-background/40 backdrop-blur-md",
        "border border-border/50",
        "shadow-lg",
        "p-4",
        "transition-all duration-200",
        "hover:border-border hover:shadow-xl",
        "min-h-[180px]",
        className
      )}
    >
      {/* Expanded stat overlay */}
      <AnimatePresence>
        {expandedStat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute inset-0 z-10",
              "rounded-xl overflow-hidden",
              "flex flex-col"
            )}
          >
            {/* Background with grade-based gradient */}
            <div 
              className={cn(
                "absolute inset-0",
                "bg-gradient-to-br from-background/95 via-background/90 to-background/85",
                "backdrop-blur-md"
              )}
            />
            
            {/* Content */}
            <div className="relative z-10 p-4 flex flex-col h-full">
              {/* Header with stat name and grade */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GradeBadge grade={expandedStat.grade} size="md" rounded />
                  <h4 className="font-bold text-base text-foreground capitalize">
                    {expandedStat.label}
                  </h4>
                </div>
                <button
                  onClick={closeExpanded}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20",
                    "transition-colors duration-200",
                    "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-border/50 mb-2" />
              
              {/* Stat Definition (what it measures) */}
              {expandedStat.description && (
                <>
                  <p className="text-xs text-muted-foreground italic mb-2">
                    {expandedStat.description}
                  </p>
                  <div className="h-px bg-border/50 mb-2" />
                </>
              )}
              
              {/* Grade-specific Description - uses the new unified stats system */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {getStatDescription(expandedStat.key, expandedStat.grade, domain)}
                </p>
              </div>
              
              {/* Footer hint */}
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Click × to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Icon, Label, and Main Grade */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-white/10",
              "border border-white/5"
            )}
          >
            {/* Use icon-force-white class to override theme colors */}
            <Icon className="w-4 h-4 icon-force-white" />
          </div>
          <div>
            {/* Use text-force-white class to override theme colors */}
            <h4 className="font-semibold text-sm text-force-white">
              {categoryLabel}
            </h4>
          </div>
        </div>
        
        {/* Main Grade Badge */}
        <GradeBadge grade={mainGrade} size="md" rounded />
      </div>

      {/* Category Description (optional) */}
      {categoryDescription && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {categoryDescription}
        </p>
      )}

      {/* Subcategory Mini-Grid */}
      <div className={cn(
        "grid gap-2",
        substats.length === 4 ? "grid-cols-2" : "grid-cols-3",
        substats.length <= 3 && "grid-cols-3"
      )}>
        {substats.map((substat) => (
          <SubstatMiniBar
            key={substat.key}
            statKey={substat.key}
            label={substat.label}
            grade={substat.grade}
            isAbility={isAbility}
            onClick={() => handleGradeClick(substat)}
          />
        ))}
      </div>
    </div>
  );
}

// Mini bar for each substat
interface SubstatMiniBarProps {
  statKey: string;
  label: string;
  grade: GradeLabel;
  isAbility?: boolean;
  onClick?: () => void;
}

function SubstatMiniBar({ statKey, label, grade, isAbility, onClick }: SubstatMiniBarProps) {
  const gradeColor = GRADE_COLORS[grade];
  const gradeValue = GRADE_VALUES[grade];
  const barWidth = `${Math.max((gradeValue / 7) * 100, 5)}%`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground truncate flex-1">
          {label}
        </span>
        {/* Clickable grade badge */}
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full",
            "transition-transform hover:scale-110 active:scale-95"
          )}
        >
          <GradeBadge grade={grade} size="sm" rounded />
        </button>
      </div>
      
      {/* Mini progress bar */}
      <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            gradeColor?.bg || "bg-gray-600"
          )}
          style={{ width: barWidth }}
        />
      </div>
    </div>
  );
}

// Potential card (single stat, no subcategories)
interface PotentialCardProps {
  grade: GradeLabel;
  className?: string;
}

export function PotentialCard({ grade, className }: PotentialCardProps) {
  const gradeColor = GRADE_COLORS[grade];
  const gradeValue = GRADE_VALUES[grade];
  const barWidth = `${Math.max((gradeValue / 7) * 100, 5)}%`;
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Use the new unified stats system for potential description
  const gradeDescription = getStatDescription("potential", grade, "ability");
  const statDefinition = getStatDefinition("potential", "ability");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-background/40 backdrop-blur-md",
        "border border-border/50",
        "shadow-lg",
        "p-4",
        "transition-all duration-200",
        "hover:border-border hover:shadow-xl",
        "min-h-[180px]",
        className
      )}
    >
      {/* Expanded overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute inset-0 z-10",
              "rounded-xl overflow-hidden",
              "flex flex-col"
            )}
          >
            <div 
              className={cn(
                "absolute inset-0",
                "bg-gradient-to-br from-background/95 via-background/90 to-background/85",
                "backdrop-blur-md"
              )}
            />
            
            <div className="relative z-10 p-4 flex flex-col h-full">
              {/* Header with stat name and grade */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GradeBadge grade={grade} size="md" rounded />
                  <h4 className="font-bold text-base text-foreground">
                    Potential
                  </h4>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20",
                    "transition-colors duration-200",
                    "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-border/50 mb-2" />
              
              {/* Stat Definition */}
              <p className="text-xs text-muted-foreground italic mb-2">
                {statDefinition}
              </p>
              
              {/* Divider */}
              <div className="h-px bg-border/50 mb-2" />
              
              {/* Grade-specific Description */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {gradeDescription}
                </p>
              </div>
              
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Click × to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-white/10",
              "border border-white/5"
            )}
          >
            <Sparkles className="w-4 h-4 icon-force-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-force-white">
              Potential
            </h4>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className={cn(
            "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full",
            "transition-transform hover:scale-110 active:scale-95"
          )}
        >
          <GradeBadge grade={grade} size="md" rounded />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-3">
        {statDefinition}
      </p>

      {/* Full-width progress bar */}
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            gradeColor?.bg || "bg-gray-600"
          )}
          style={{ width: barWidth }}
        />
      </div>
    </div>
  );
}
