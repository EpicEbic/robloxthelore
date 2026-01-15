import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the glass panel
   * - default: Standard glass blur with subtle transparency
   * - elevated: Stronger blur with shadow, for overlays and popups
   * - inset: Lighter blur for nested content
   */
  variant?: 'default' | 'elevated' | 'inset';
  
  /**
   * Whether to show a glowing border
   */
  glow?: boolean;
  
  /**
   * Intensity of the glow effect
   */
  glowIntensity?: 'subtle' | 'normal' | 'strong';
  
  /**
   * Whether to apply rounded corners
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /**
   * Padding preset
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'glass-panel',
  elevated: 'glass-panel-elevated',
  inset: 'glass-panel-inset',
};

const glowClasses = {
  subtle: 'glow-border-subtle',
  normal: 'glow-border',
  strong: 'glow-border glow-pulse',
};

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-5',
  lg: 'p-5 md:p-6 lg:p-8',
};

/**
 * GlassPanel - A reusable glass-morphism container component
 * 
 * Used across all entry types (Character, Equipment, Location) for
 * consistent visual styling with subtle blur and optional glow effects.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      variant = 'default',
      glow = false,
      glowIntensity = 'normal',
      rounded = 'lg',
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass styling
          variantClasses[variant],
          // Rounded corners
          roundedClasses[rounded],
          // Padding
          paddingClasses[padding],
          // Optional glow
          glow && glowClasses[glowIntensity],
          // Smooth transitions
          'transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

/**
 * GlassCard - A variant of GlassPanel with card-like behavior
 * Includes hover effects and is optimized for clickable/interactive content
 */
export interface GlassCardProps extends GlassPanelProps {
  hoverable?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverable = true, glow, ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        variant="elevated"
        glow={glow}
        className={cn(
          hoverable && 'hover:scale-[1.01] hover:shadow-lg cursor-pointer',
          hoverable && glow && 'glow-interactive',
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = 'GlassCard';

/**
 * GlassDivider - A subtle divider with glass styling
 */
export function GlassDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-px w-full',
        'bg-gradient-to-r from-transparent via-[rgba(var(--glow-color-rgb),0.3)] to-transparent',
        className
      )}
    />
  );
}

