import { useParams, useNavigate } from "react-router-dom";
import { useWiki } from "@/contexts/wiki-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WikiEntryCard } from "@/components/wiki-entry-card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { AutoLinkedText } from "@/components/ui/auto-linked-text";
import { cn } from "@/lib/utils";
import { CharacterEntryCard } from "@/components/character-entry-card";
import { EquipmentEntryCard } from "@/components/equipment-entry-card";
import { LocationEntryCard } from "@/components/location-entry-card";
import { CharacterThemeProvider, useCharacterTheme } from "@/contexts/character-theme-context";
import { LocationThemeProvider, useLocationTheme } from "@/contexts/location-theme-context";
import { CharacterParticles } from "@/components/effects/character-particles";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EntryPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntryById, entries } = useWiki();
  const { currentTheme: characterTheme } = useCharacterTheme();
  const { currentTheme: locationTheme } = useLocationTheme();
  
  const entry = getEntryById(id || "");
  
  // Use location theme for locations, character theme for characters
  const currentTheme = entry?.category === 'location' ? locationTheme : characterTheme;

  // Memoize related entries calculation
  const relatedEntries = useMemo(() => {
    if (!entry) return [];
    
    return entry.relatedEntries
      ? entries.filter(e => entry.relatedEntries?.includes(e.id))
      : entries
          .filter(e => 
            e.id !== entry.id && 
            (e.category === entry.category || e.subcategory === entry.subcategory)
          )
          .slice(0, 3);
  }, [entry, entries]);

  if (!entry) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Entry not found</h1>
        <p className="mb-6">The wiki entry you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")} variant="default">
          Back to Home
        </Button>
      </div>
    );
  }

  console.log('EntryPageContent: currentTheme =', currentTheme);
  
  return (
    <div className="character-theme-container min-h-screen relative">
      {/* Keep particles mounted and only animate opacity to avoid canvas reinit timing issues */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <AnimatePresence initial={false}>
          {currentTheme && (
            <motion.div
              key={currentTheme.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <CharacterParticles theme={currentTheme} className="absolute inset-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div className="absolute inset-0 overflow-y-auto z-10" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="container mx-auto px-4 py-8 relative">

        {entry.category === "character" ? (
          <div className="w-full">
            <CharacterEntryCard character={entry} />
          </div>
        ) : entry.category === "equipment" ? (
          <div className="w-full">
            <EquipmentEntryCard equipment={entry} />
          </div>
        ) : entry.category === "location" ? (
          <div className="w-full">
            <LocationEntryCard location={entry} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                <h1 className="text-3xl font-bold">{entry.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn("wiki-category-" + entry.category)}>
                    {entry.category}
                  </Badge>
                  <Badge variant="outline">
                    {entry.subcategory}
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                {entry.description}
              </p>

              {entry.imageUrl && (
                <div className="mb-6 overflow-hidden rounded-lg border">
                  <OptimizedImage 
                    src={entry.imageUrl} 
                    alt={entry.title}
                    className="w-full h-auto object-cover"
                    priority={true}
                  />
                </div>
              )}

              <Card className="mb-8">
                <CardContent className="prose dark:prose-invert max-w-none pt-6">
                  {/* Split paragraphs on newlines and render them with auto-linking */}
                  {entry.content.split("\n").map((paragraph, idx) => (
                    <p key={idx}>
                      <AutoLinkedText text={paragraph} currentEntryId={entry.id} />
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Related Entries</h2>
              <div className="flex flex-col space-y-4">
                {relatedEntries.map((relatedEntry, index) => (
                  <WikiEntryCard 
                    key={relatedEntry.id} 
                    entry={relatedEntry} 
                    imageDelay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </motion.div>
    </div>
  );
};

const EntryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getEntryById } = useWiki();
  const entry = getEntryById(id || "");

  console.log('EntryPage: id =', id, 'entry =', entry);

  // Use appropriate theme provider based on entry category
  if (entry?.category === 'location') {
    return (
      <LocationThemeProvider locationId={entry?.id}>
        <CharacterThemeProvider>
          <EntryPageContent />
        </CharacterThemeProvider>
      </LocationThemeProvider>
    );
  }

  return (
    <CharacterThemeProvider characterId={entry?.id}>
      <LocationThemeProvider>
        <EntryPageContent />
      </LocationThemeProvider>
    </CharacterThemeProvider>
  );
};

export default EntryPage;
