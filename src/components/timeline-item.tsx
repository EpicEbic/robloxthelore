import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WhatsNewEntry } from "@/types/whats-new-types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: WhatsNewEntry;
  isLast: boolean;
}

export function TimelineItem({ item, isLast }: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
          <Card className="bg-card/50 border-2 border-transparent hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg cursor-pointer">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-xl font-bold text-left">{item.title}</CardTitle>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-sm font-mono flex-shrink-0">{formattedDate}</Badge>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-left">{item.description}</p>
                
                {item.changes && item.changes.length > 0 && (
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 text-left">
                    {item.changes.map((change, index) => (
                      <li key={index}>{change}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}
