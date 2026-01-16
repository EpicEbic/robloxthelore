import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DropdownOption {
  id: string;
  label: string;
  description?: string;
}

interface EntryDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function EntryDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className
}: EntryDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const selectedOption = options.find(opt => opt.id === value);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 w-full min-w-[140px] sm:min-w-[180px]",
          "px-3 sm:px-4 py-2 sm:py-2.5",
          "rounded-xl border border-border/50",
          "bg-background/60 backdrop-blur-sm",
          "text-sm font-medium text-foreground",
          "transition-all duration-200",
          "hover:bg-background/80 hover:border-border",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          isOpen && "ring-2 ring-primary/50 border-primary/50"
        )}
      >
        <span className="truncate">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2",
            "w-full min-w-[200px] sm:min-w-[240px]",
            isMobile ? "right-0" : "right-0",
            "rounded-xl border border-border/50",
            "bg-background/95 backdrop-blur-md",
            "shadow-lg shadow-black/20",
            "overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-border/30">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Select Option
            </p>
          </div>

          {/* Options List */}
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar py-1">
            {options.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-left",
                    "transition-colors duration-150",
                    "hover:bg-primary/10",
                    isSelected && "bg-primary/15"
                  )}
                >
                  {/* Checkmark indicator */}
                  <div className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    "transition-all duration-150",
                    isSelected 
                      ? "border-primary bg-primary" 
                      : "border-border/50"
                  )}>
                    {isSelected && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>

                  {/* Option content */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {option.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

