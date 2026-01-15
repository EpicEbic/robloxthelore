import { useMemo, useState } from "react";
import { whatsNewEntries } from "@/data/whats-new";
import { qAndAEntries } from "@/data/q-and-a";
import { TimelineItem } from "@/components/timeline-item";
import { QandAItem } from "@/components/q-and-a-item";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeCategory } from "@/types/whats-new-types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<ChangeCategory, string> = {
  new: "New",
  changes: "Changes",
  fixes: "Fixes",
  removals: "Removals",
  others: "Others",
};

const categoryColors: Record<ChangeCategory, string> = {
  new: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 hover:bg-green-500/30",
  changes: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
  fixes: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
  removals: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 hover:bg-red-500/30",
  others: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30 hover:bg-purple-500/30",
};

const WhatsNewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ChangeCategory | null>(null);
  
  const sortedWhatsNewEntries = useMemo(() => {
    return [...whatsNewEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          What's New
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A complete history of all updates.
        </p>
      </div>

      <div className="space-y-8">
        {/* What's New Section */}
        <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">Update History</CardTitle>
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-xl transition-all"
              >
                All
              </Button>
              {(Object.keys(categoryLabels) as ChangeCategory[]).map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={cn(
                    "rounded-xl transition-all border-2",
                    selectedCategory === category 
                      ? categoryColors[category] + " font-semibold" 
                      : "hover:bg-muted/50"
                  )}
                >
                  {categoryLabels[category]}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-3xl mx-auto">
              {sortedWhatsNewEntries.map((item, index) => (
                <TimelineItem 
                  key={item.id}
                  item={item}
                  isLast={index === sortedWhatsNewEntries.length - 1}
                  selectedCategory={selectedCategory}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-12 max-w-3xl mx-auto" />
      
      {/* Questions & Answers Section */}
      <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">Questions & Answers</CardTitle>
          <p className="text-muted-foreground text-center mt-2">Frequently asked questions about The Lore.</p>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-3xl mx-auto">
            {qAndAEntries.map((item, index) => (
              <QandAItem 
                key={item.id}
                item={item}
                isLast={index === qAndAEntries.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsNewPage;
