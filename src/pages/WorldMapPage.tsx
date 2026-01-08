import { InteractiveBloxiverseMap } from "@/components/world/interactive-bloxiverse-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Globe } from "lucide-react";
import { LocationThemeProvider, useLocationTheme } from "@/contexts/location-theme-context";
import { CharacterParticles } from "@/components/effects/character-particles";
import { AnimatePresence, motion } from "framer-motion";

const WorldMapPageContent = () => {
  const { currentTheme } = useLocationTheme();

  return (
    <div className="character-theme-container min-h-screen relative">
      {/* Themed particle background */}
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

      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              The Bloxiverse
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the interactive map of the Bloxiverse. Navigate through segments, discover worlds, and learn about the cosmic structure of reality.
            </p>
          </div>

          <div className="space-y-8">
            {/* Instructions */}
            <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  How to Navigate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Desktop:</strong> Click and drag to pan, scroll to zoom, click segments/worlds for details.
                  </p>
                  <p>
                    <strong className="text-foreground">Mobile:</strong> Drag to pan, pinch to zoom, tap segments/worlds for details.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Map Container */}
            <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
                  <InteractiveBloxiverseMap />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorldMapPage() {
  return (
    <LocationThemeProvider locationId="the-bloxiverse">
      <WorldMapPageContent />
    </LocationThemeProvider>
  );
}

