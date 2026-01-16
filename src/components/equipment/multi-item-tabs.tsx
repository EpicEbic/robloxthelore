
import { MultiItem } from "@/types/wiki-types";
import { Zap, Eye, History, ScrollText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";

interface MultiItemTabsProps {
  item: MultiItem;
  coilColor: string;
  currentEntryId?: string;
}

export function MultiItemTabs({ item, coilColor, currentEntryId }: MultiItemTabsProps) {
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className={`mb-6 ${isMobile ? 'grid grid-cols-4 h-auto gap-1 p-1.5' : 'inline-flex h-auto gap-1 p-1.5'}`}>
        <TabsTrigger value="overview" className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3 py-2">
          <Eye className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">General</span>
        </TabsTrigger>
        <TabsTrigger value="ability" className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3 py-2">
          <Zap className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Ability</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3 py-2">
          <History className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">History</span>
        </TabsTrigger>
        <TabsTrigger value="trivia" className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3 py-2">
          <ScrollText className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Trivia</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="min-h-0">
        <ScrollArea className={`${isMobile ? 'h-[500px]' : 'h-[400px]'} w-full`}>
          <div className={`${isMobile ? 'pr-2' : 'pr-4'}`}>
            <TabsContent value="overview" className="mt-0">
              <div className={`bg-card rounded-lg border-t-4 border ${isMobile ? 'p-6' : 'p-4'}`} style={{ borderTopColor: coilColor }}>
                <h4 className={`font-semibold mb-4 flex items-center gap-2 ${isMobile ? 'text-2xl' : 'text-xl'}`}>
                  <Eye className="h-5 w-5 flex-shrink-0" style={{ color: coilColor }} />
                  General
                </h4>
                <div className={`text-foreground/90 min-w-0 ${isMobile ? 'text-base leading-relaxed space-y-5' : ''}`}>
                  {item.sections?.overview?.map((paragraph, idx) => (
                    <p key={idx} className={`break-words whitespace-normal overflow-wrap-anywhere ${isMobile ? 'mb-5' : 'mb-4'}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ability" className="mt-0">
              <div className={`bg-card rounded-lg border-t-4 border ${isMobile ? 'p-6' : 'p-4'}`} style={{ borderTopColor: coilColor }}>
                <h4 className={`font-semibold mb-4 flex items-center gap-2 ${isMobile ? 'text-2xl' : 'text-xl'}`}>
                  <Zap className="h-5 w-5 flex-shrink-0" style={{ color: coilColor }} />
                  Abilities
                </h4>
                <div className={`text-foreground/90 min-w-0 ${isMobile ? 'text-base leading-relaxed space-y-5' : ''}`}>
                  {item.sections?.ability?.map((paragraph, idx) => (
                    <p key={idx} className={`break-words whitespace-normal overflow-wrap-anywhere ${isMobile ? 'mb-5' : 'mb-4'}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className={`bg-card rounded-lg border-t-4 border ${isMobile ? 'p-6' : 'p-4'}`} style={{ borderTopColor: coilColor }}>
                <h4 className={`font-semibold mb-4 flex items-center gap-2 ${isMobile ? 'text-2xl' : 'text-xl'}`}>
                  <History className="h-5 w-5 flex-shrink-0" style={{ color: coilColor }} />
                  History
                </h4>
                <div className={`text-foreground/90 min-w-0 ${isMobile ? 'text-base leading-relaxed space-y-5' : ''}`}>
                  {item.sections?.history?.map((paragraph, idx) => (
                    <p key={idx} className={`break-words whitespace-normal overflow-wrap-anywhere ${isMobile ? 'mb-5' : 'mb-4'}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trivia" className="mt-0">
              <div className={`bg-card rounded-lg border-t-4 border ${isMobile ? 'p-6' : 'p-4'}`} style={{ borderTopColor: coilColor }}>
                <h4 className={`font-semibold mb-4 flex items-center gap-2 ${isMobile ? 'text-2xl' : 'text-xl'}`}>
                  <ScrollText className="h-5 w-5 flex-shrink-0" style={{ color: coilColor }} />
                  Trivia
                </h4>
                <ul className={`list-disc text-foreground/90 min-w-0 ${isMobile ? 'space-y-4 ml-6 text-base leading-relaxed' : 'space-y-3 ml-5'}`}>
                  {item.sections?.trivia?.map((triviaItem, idx) => (
                    <li key={idx} className="break-words whitespace-normal overflow-wrap-anywhere">
                      <AutoLinkedText text={triviaItem} currentEntryId={currentEntryId} />
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </div>
    </Tabs>
  );
}
