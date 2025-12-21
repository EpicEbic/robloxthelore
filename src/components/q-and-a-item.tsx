import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { QandAEntry } from "@/types/whats-new-types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QandAItemProps {
  item: QandAEntry;
  isLast: boolean;
}

export function QandAItem({ item, isLast }: QandAItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative pl-8 sm:pl-12 py-4 group">
      {/* Stem and Dot */}
      <div className="flex flex-col items-center w-8 sm:w-12 absolute left-0 top-0 h-full">
        {!isLast && <div className="w-px h-full bg-border group-hover:bg-primary transition-colors duration-300" />}
      </div>
      <div className="absolute left-0 top-6 -ml-1.5 sm:-ml-1">
        <div className="w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors duration-300" />
        <div className={cn(
          "absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping-slow transition-opacity duration-300",
          isOpen ? "opacity-50" : "opacity-0 group-hover:opacity-50"
        )} />
      </div>

      {/* Content */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Card className="bg-card/50 border-2 border-transparent transition-all duration-300 shadow-lg cursor-pointer">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-xl font-bold text-left">{item.question}</CardTitle>
                <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {item.answer && item.answer.length > 0 && (
                  <div className="space-y-3 text-left">
                    {item.answer.map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}

