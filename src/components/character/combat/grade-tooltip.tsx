import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

// Import from the unified stats system
import { 
  GradeLabel, 
  GRADE_COLORS, 
  getStatDescription 
} from "@/lib/stats";

interface GradeTooltipProps {
  grade: GradeLabel;
  statKey: string;
  children?: React.ReactNode;
  className?: string;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

export function GradeTooltip({
  grade,
  statKey,
  children,
  className,
  showBadge = true,
  size = "md"
}: GradeTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  // Use the unified stats system for description lookup
  const description = getStatDescription(statKey, grade);
  const gradeColor = GRADE_COLORS[grade];
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 min-w-[20px]",
    md: "text-sm px-2 py-1 min-w-[24px]",
    lg: "text-base px-3 py-1.5 min-w-[28px]"
  };

  const badgeContent = (
    <span
      className={cn(
        "inline-flex items-center justify-center font-bold rounded-lg text-white shadow-sm",
        gradeColor?.bg || "bg-gray-600",
        sizeClasses[size],
        className
      )}
    >
      {grade}
    </span>
  );

  // On mobile, use click to toggle; on desktop, use hover
  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleClick}
            className="cursor-help focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
          >
            {showBadge ? badgeContent : children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className={cn(
            "max-w-[280px] sm:max-w-[320px] p-3",
            "bg-background/95 backdrop-blur-md",
            "border border-border/50",
            "shadow-lg shadow-black/20",
            "z-[100]"
          )}
          sideOffset={8}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-bold text-sm px-2 py-0.5 rounded text-white",
                  gradeColor?.bg || "bg-gray-600"
                )}
              >
                Grade {grade}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {statKey.replace(/-/g, " ")}
              </span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Simple grade badge without tooltip
export function GradeBadge({
  grade,
  size = "md",
  className,
  rounded = false
}: {
  grade: GradeLabel;
  size?: "sm" | "md" | "lg";
  className?: string;
  rounded?: boolean;
}) {
  const gradeColor = GRADE_COLORS[grade];
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 min-w-[20px]",
    md: "text-sm px-2 py-1 min-w-[24px]",
    lg: "text-base px-3 py-1.5 min-w-[28px]"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-bold text-white shadow-sm",
        rounded ? "rounded-full" : "rounded-lg",
        gradeColor?.bg || "bg-gray-600",
        sizeClasses[size],
        className
      )}
    >
      {grade}
    </span>
  );
}
