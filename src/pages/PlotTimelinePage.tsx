import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type TimelineEpisode = {
  title: string;
  summary: string;
  episode: string;
  date?: string;
  narration?: string;
};

type TimelineSeason = {
  season: string;
  description?: string;
  episodes: TimelineEpisode[];
};

// Placeholder data structure that can be extended
const seasons: TimelineSeason[] = [
  {
    season: "Season 1",
    description: "Foundations and first conflicts.",
    episodes: [
      { episode: "Episode 1", title: "Arrival", summary: "Key figures enter the world.", narration: "A longer description of how the key figures arrived and what they encountered." },
      { episode: "Episode 2", title: "First Clash", summary: "Alliances form, tensions rise.", narration: "Expanded narration about the first clash between factions, the stakes, and fallout." },
    ],
  },
  {
    season: "Season 2",
    description: "Escalation and revelations.",
    episodes: [
      { episode: "Episode 1", title: "Shadows Move", summary: "Hidden motives surface.", narration: "Details on hidden motives, key reveals, and who is pulling the strings." },
      { episode: "Episode 2", title: "Breaking Point", summary: "A turning point for the factions.", narration: "A detailed account of the breaking point, consequences, and shifting alliances." },
    ],
  },
];

export default function PlotTimelinePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow / grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,215,0,0.04),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_25%)]" />

      <div className="container mx-auto px-4 py-10 space-y-8 relative z-10">
        <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">The Lore&apos;s Timeline</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          View a detailed breakdown of each season and episode for The Lore!
        </p>
        </div>

        <Card className="border-primary/20 shadow-2xl shadow-primary/10 bg-card/95 backdrop-blur">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-2xl font-semibold">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="space-y-4">
              {seasons.map((season, sIdx) => (
                <AccordionItem
                  key={season.season}
                  value={season.season}
                  className="border border-border/60 rounded-lg px-3 bg-card/70 shadow-sm"
                >
                  <AccordionTrigger className="py-3 text-left text-lg font-semibold">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm shadow">
                        {season.season}
                      </div>
                      {season.description && (
                        <span className="text-sm text-muted-foreground">{season.description}</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <Accordion type="multiple" className="space-y-2">
                      {season.episodes.map((ep, eIdx) => (
                        <AccordionItem
                          key={`${season.season}-${ep.episode}`}
                          value={`${season.season}-${ep.episode}`}
                          className="border border-border/40 rounded-md bg-card/60"
                        >
                          <AccordionTrigger className="py-2 px-3 text-left hover:bg-primary/5 rounded-md">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="px-2 py-0.5 rounded-full border text-xs">
                                {ep.episode}
                              </div>
                              <span className="font-semibold text-sm">{ep.title}</span>
                              {ep.date && <span className="text-xs text-muted-foreground">{ep.date}</span>}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-3 px-3 space-y-2">
                            <p className="text-sm text-foreground">{ep.summary}</p>
                            {ep.narration && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: 0.05 + eIdx * 0.02 + sIdx * 0.05 }}
                                className="rounded-md border border-border/40 bg-card/80 p-3 text-sm text-muted-foreground leading-relaxed shadow-inner"
                              >
                                {ep.narration}
                              </motion.div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

