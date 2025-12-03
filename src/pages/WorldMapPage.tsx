import { InteractiveBloxiverseMap } from "@/components/world/interactive-bloxiverse-map";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
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

      <div className="relative z-10 min-h-screen w-full p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              The Bloxiverse
            </h1>
            <p className="text-lg text-muted-foreground">Interactive Map</p>
          </div>

          {/* Instructions */}
          <Card className="bg-card/95 backdrop-blur-sm border border-border/50 p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-foreground/90 text-sm md:text-base">
                  <strong>Click and drag</strong> to pan around the map.{" "}
                  <strong>Scroll to zoom</strong> in and out.{" "}
                  <strong>Click on segments</strong> to learn more about each area of the Bloxiverse.{" "}
                  <strong>Click on worlds</strong> to view detailed information about Robloxian Worlds.
                </p>
              </div>
            </div>
          </Card>

          {/* Map Container */}
          <Card className="bg-card/95 backdrop-blur-sm border border-border/50 overflow-hidden">
            <div className="w-full h-[70vh] md:h-[80vh]">
              <InteractiveBloxiverseMap />
            </div>
          </Card>
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

