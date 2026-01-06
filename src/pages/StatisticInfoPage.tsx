import { Info } from "lucide-react";
import { ArchetypeGrid } from "@/components/statistics/archetype-grid";
import { PhysicalStatsGrid } from "@/components/statistics/physical-stats-grid";
import { Separator } from "@/components/ui/separator";
import { QandAItem } from "@/components/q-and-a-item";
import { statisticsQAndAEntries } from "@/data/q-and-a/statistics-q-and-a";

export default function StatisticInfoPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Statistics Information
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Understanding character archetypes, grading systems, and what each statistic represents in character evaluations.
        </p>
      </div>

      <div className="space-y-8">
        {/* Character Archetypes Section */}
        <ArchetypeGrid />

        {/* Physical Statistics Section */}
        <PhysicalStatsGrid />
      </div>

      <Separator className="my-12 max-w-3xl mx-auto" />

      {/* Questions & Answers Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-foreground animate-slide-in text-center">Questions & Answers</h2>
        <div className="relative max-w-3xl mx-auto">
          {statisticsQAndAEntries.map((item, index) => (
            <QandAItem 
              key={item.id}
              item={item}
              isLast={index === statisticsQAndAEntries.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
