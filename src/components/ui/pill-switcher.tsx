import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

export interface PillOption {
  id: string;
  label: string;
}

interface PillSwitcherProps {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /**
   * Size variant for the pills
   * - sm: Compact for mobile/tight spaces
   * - md: Default size
   * - lg: Larger touch targets
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * PillSwitcher - A horizontal scrollable group of pill/toggle buttons
 * 
 * Replaces dropdown selectors with a more interactive, visible approach.
 * Shows all options at once with horizontal scrolling on overflow.
 * Uses glass-morphism styling and glow effects for active states.
 */
export function PillSwitcher({
  options,
  value,
  onChange,
  className,
  size = 'md',
}: PillSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to keep active option visible
  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const active = activeRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      
      // Check if active button is outside visible area
      if (activeRect.left < containerRect.left) {
        container.scrollTo({
          left: active.offsetLeft - 16,
          behavior: 'smooth'
        });
      } else if (activeRect.right > containerRect.right) {
        container.scrollTo({
          left: active.offsetLeft - container.clientWidth + active.clientWidth + 16,
          behavior: 'smooth'
        });
      }
    }
  }, [value]);

  // Don't render if there's only one option
  if (options.length <= 1) {
    return null;
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-5 py-2.5 text-base min-h-[44px]',
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        // Layout
        "flex gap-2 overflow-x-auto",
        // Hide scrollbar but keep functionality
        "scrollbar-hide",
        // Padding for touch scrolling
        "py-1 px-1",
        // Smooth scrolling
        "-mx-1",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.id === value;
        
        return (
          <button
            key={option.id}
            ref={isActive ? activeRef : undefined}
            onClick={() => onChange(option.id)}
            className={cn(
              // Base styles
              "rounded-full font-medium whitespace-nowrap flex-shrink-0",
              "transition-all duration-200 ease-out",
              // Size
              sizeClasses[size],
              // Glass styling
              "backdrop-blur-sm border",
              // Active vs inactive states
              isActive
                ? [
                    "bg-primary/20 border-primary/50",
                    "text-foreground",
                    "shadow-[0_0_12px_2px_rgba(var(--glow-color-rgb),0.3)]",
                    "glow-border-subtle",
                  ]
                : [
                    "bg-card/40 border-border/30",
                    "text-muted-foreground",
                    "hover:bg-card/60 hover:border-border/50",
                    "hover:text-foreground",
                  ],
              // Focus styles
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

