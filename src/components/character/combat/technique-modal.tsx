import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface TechniqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string[];
  categoryIcon?: React.ReactNode;
  categoryLabel?: string;
  currentEntryId?: string;
}

export function TechniqueModal({
  isOpen,
  onClose,
  title,
  description,
  categoryIcon,
  categoryLabel,
  currentEntryId
}: TechniqueModalProps) {
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-4">
      {/* Category badge */}
      {categoryLabel && (
        <div className="flex items-center gap-2 text-muted-foreground">
          {categoryIcon}
          <span className="text-sm font-medium">{categoryLabel}</span>
        </div>
      )}
      
      {/* Description paragraphs */}
      <div className="space-y-3 text-foreground/90">
        {description.map((paragraph, idx) => (
          <p key={idx} className="text-sm sm:text-base leading-relaxed">
            <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
          </p>
        ))}
      </div>
    </div>
  );

  // Use Sheet (slide up) on mobile, Dialog on desktop
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="bottom"
          className={cn(
            "rounded-t-2xl",
            "bg-background/95 backdrop-blur-md",
            "border-t border-border/50",
            "max-h-[85vh]",
            "p-0"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-4 pt-4 pb-2 border-b border-border/30">
              <div className="flex items-start justify-between gap-2">
                <SheetTitle className="text-lg font-semibold text-foreground pr-8">
                  {title}
                </SheetTitle>
                <SheetClose asChild>
                  <button
                    type="button"
                    className={cn(
                      "absolute right-4 top-4",
                      "w-8 h-8 rounded-full",
                      "flex items-center justify-center",
                      "bg-muted/50 hover:bg-muted",
                      "transition-colors"
                    )}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>
            </SheetHeader>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {content}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "sm:max-w-lg",
          "bg-background/95 backdrop-blur-md",
          "border border-border/50",
          "shadow-xl shadow-black/20",
          "rounded-2xl",
          "p-0 gap-0"
        )}
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-border/30">
          <div className="flex items-start justify-between gap-2">
            <DialogTitle className="text-xl font-semibold text-foreground pr-8">
              {title}
            </DialogTitle>
            <DialogClose asChild>
              <button
                type="button"
                className={cn(
                  "absolute right-4 top-4",
                  "w-8 h-8 rounded-full",
                  "flex items-center justify-center",
                  "bg-muted/50 hover:bg-muted",
                  "transition-colors"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}

