import { Eye, Zap, History, Lightbulb, ScrollText, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { EquipmentMultiItems } from "./equipment-multi-items";
import { MultiItem } from "@/types/wiki-types";

interface EquipmentSections {
  overview: string[];
  ability: string[];
  history: string[];
  trivia: string[];
}

interface EquipmentContentTabsProps {
  sections: EquipmentSections;
  multiItems?: MultiItem[];
  currentEntryId?: string;
}

export function EquipmentContentTabs({ sections, multiItems, currentEntryId }: EquipmentContentTabsProps) {
  const isMobile = useIsMobile();
  const hasMultiItems = multiItems && multiItems.length > 0;

  // If we have multi-items, show only the items (no redundant main sections)
  if (hasMultiItems) {
    return (
      <div className="min-h-0 flex flex-col">
        <EquipmentMultiItems items={multiItems} />
      </div>
    );
  }

  // For single items, show the traditional tab structure
  return (
    <div className="min-h-0 flex flex-col">
      <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
        <TabsList className={`mb-6 w-full ${isMobile ? 'grid grid-cols-2 h-auto gap-3 p-3' : 'justify-start'} flex-shrink-0`}>
          <TabsTrigger value="overview" className={`flex items-center gap-2 ${isMobile ? 'text-sm px-4 py-3 rounded-md' : 'text-sm sm:text-base px-4 py-3 sm:py-4'}`}>
            <Eye className="h-5 w-5" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="ability" className={`flex items-center gap-2 ${isMobile ? 'text-sm px-4 py-3 rounded-md' : 'text-sm sm:text-base px-4 py-3 sm:py-4'}`}>
            <Zap className="h-5 w-5" />
            <span>Ability</span>
          </TabsTrigger>
          <TabsTrigger value="history" className={`flex items-center gap-2 ${isMobile ? 'text-sm px-4 py-3 rounded-md' : 'text-sm sm:text-base px-4 py-3 sm:py-4'}`}>
            <History className="h-5 w-5" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="trivia" className={`flex items-center gap-2 ${isMobile ? 'text-sm px-4 py-3 rounded-md' : 'text-sm sm:text-base px-4 py-3 sm:py-4'}`}>
            <ScrollText className="h-5 w-5" />
            <span>Trivia</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full w-full">
            <div className="pr-4">
              <TabsContent value="overview" className="mt-0">
                <div className="bg-card rounded-lg p-6 border min-w-0">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary flex-shrink-0" />
                    General
                  </h2>
                  <div className="text-foreground/90 min-w-0 text-base">
                    {sections.overview.map((paragraph, idx) => (
                      <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                        <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                      </p>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ability" className="mt-0">
                <div className="bg-card rounded-lg p-4 border min-w-0">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                    Ability
                  </h2>
                  <div className="text-foreground/90 min-w-0">
                    {sections.ability.map((paragraph, idx) => (
                      <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                        <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                      </p>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <div className="bg-card rounded-lg p-4 border min-w-0">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <History className="h-5 w-5 text-primary flex-shrink-0" />
                    History
                  </h2>
                  <div className="text-foreground/90 min-w-0">
                    {sections.history.map((paragraph, idx) => (
                      <p key={idx} className="mb-4 break-words whitespace-normal overflow-wrap-anywhere">
                        <AutoLinkedText text={paragraph} currentEntryId={currentEntryId} />
                      </p>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trivia" className="mt-0">
                <div className="bg-card rounded-lg p-6 border min-w-0">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <ScrollText className="h-6 w-6 text-primary flex-shrink-0" />
                    Trivia
                  </h2>
                  <ul className="list-disc space-y-3 ml-5 text-foreground/90 min-w-0 text-base">
                    {sections.trivia.map((item, idx) => (
                      <li key={idx} className="break-words whitespace-normal overflow-wrap-anywhere">
                        <AutoLinkedText text={item} currentEntryId={currentEntryId} />
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
