import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Glass-morphism container
      "inline-flex items-center justify-center",
      "backdrop-blur-md bg-background/40",
      "border border-border/40",
      "rounded-2xl p-1.5",
      // Subtle glow effect
      "shadow-[0_0_20px_rgba(var(--glow-color-rgb),0.1)]",
      // Smooth transitions
      "transition-all duration-300",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      "relative inline-flex items-center justify-center gap-2",
      "whitespace-nowrap rounded-xl px-4 py-2.5",
      "text-sm font-medium",
      // Text color states
      "text-muted-foreground/70",
      // Transitions
      "transition-all duration-300 ease-out",
      // Focus styles
      "ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
      // Disabled styles
      "disabled:pointer-events-none disabled:opacity-50",
      // Hover styles (inactive)
      "hover:text-foreground/80 hover:bg-foreground/5",
      // Active state styles
      "data-[state=active]:text-foreground",
      "data-[state=active]:bg-gradient-to-b data-[state=active]:from-background/80 data-[state=active]:to-background/60",
      "data-[state=active]:border data-[state=active]:border-border/50",
      "data-[state=active]:shadow-[0_0_12px_rgba(var(--glow-color-rgb),0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
      // Icon styling
      "[&>svg]:transition-all [&>svg]:duration-300",
      "data-[state=active]:[&>svg]:drop-shadow-[0_0_4px_rgba(var(--glow-color-rgb),0.5)]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-up",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
