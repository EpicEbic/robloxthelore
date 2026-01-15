import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type EntryType = 'character' | 'equipment' | 'location';

export interface EntryHeaderProps {
  /**
   * The title/name of the entry
   */
  title: string;
  
  /**
   * Optional quote with context
   */
  quote?: {
    text: string;
    context?: string;
  };
  
  /**
   * The type of entry - affects styling accents
   */
  entryType?: EntryType;
  
  /**
   * Whether to show the separator at the bottom
   */
  showSeparator?: boolean;
  
  /**
   * Additional className for customization
   */
  className?: string;
}

/**
 * EntryHeader - Unified header component for all entry types
 * 
 * Displays the entry title with optional quote in a glass-styled container
 * with subtle glow effects that respond to the current theme.
 */
export function EntryHeader({
  title,
  quote,
  entryType = 'character',
  showSeparator = true,
  className,
}: EntryHeaderProps) {
  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-10 relative overflow-hidden",
          // Glass background with gradient
          "bg-gradient-to-br from-card via-card/95 to-muted/30",
          // Glass blur effect
          "backdrop-blur-sm",
          className
        )}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        
        {/* Subtle glow at the top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--glow-color-rgb),0.3)] to-transparent" />
        
        <div className="relative p-6 lg:p-8 pb-4">
          {/* Title with gradient text and subtle glow */}
          <h1 
            className={cn(
              "text-3xl lg:text-5xl font-bold mb-4 break-words hyphens-auto",
              "bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent",
              "glow-text-subtle",
              "animate-rotate-in"
            )}
          >
            {title}
          </h1>
          
          {/* Quote block with glass styling */}
          {quote && (
            <div 
              className={cn(
                "mt-6 p-4 lg:p-6 rounded-xl",
                // Glass styling
                "glass-panel",
                // Left accent border with glow
                "border-l-4 border-primary/60",
                "glow-border-subtle",
                // Typography
                "italic",
                // Animation
                "animate-fade-in anim-delay-100"
              )}
            >
              <p className="text-lg lg:text-xl text-foreground/90 break-words hyphens-auto leading-relaxed">
                "{quote.text}"
              </p>
              {quote.context && (
                <p className="text-sm lg:text-base text-muted-foreground mt-3 break-words hyphens-auto">
                  — {quote.context}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showSeparator && (
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </>
  );
}

