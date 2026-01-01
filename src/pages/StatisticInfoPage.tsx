import { Info } from "lucide-react";
import { ArchetypeGrid } from "@/components/statistics/archetype-grid";
import { PhysicalStatsGrid } from "@/components/statistics/physical-stats-grid";

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
    </div>
  );
}
