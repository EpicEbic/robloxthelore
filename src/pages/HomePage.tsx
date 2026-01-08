import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchBar } from "@/components/search-bar";
import { WikiEntryCard } from "@/components/wiki-entry-card";
import { CategoryCard } from "@/components/category-card";
import { useWiki } from "@/contexts/wiki-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shuffle, Calendar, Users, Sword, MapPin, Flag, BookOpen, List } from "lucide-react";
import { whatsNewEntries } from "@/data/whats-new";
import { qAndAEntries } from "@/data/q-and-a";
import { CATEGORIES, getDefaultSubcategory } from "@/data/categories";
import { TimelineItem } from "@/components/timeline-item";
import { QandAItem } from "@/components/q-and-a-item";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  // Sort entries by date (newest first) 
  const sortedWhatsNewEntries = useMemo(() => {
    return [...whatsNewEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const {
    entries
  } = useWiki();
  const navigate = useNavigate();
  const { isEntryUnlocked } = useEasterEgg();

  // Filter out locked entries from all random entries
  const availableEntries = useMemo(() => {
    return entries.filter(entry => isEntryUnlocked(entry.id));
  }, [entries, isEntryUnlocked]);

  // Generate 3 random entries (excluding The Reckoner)
  const randomEntries = useMemo(() => {
    if (availableEntries.length === 0) return [];
    const shuffled = [...availableEntries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [availableEntries]);
  const handleViewRandomEntry = () => {
    if (availableEntries.length === 0) return;
    
    // 1/100 chance for secret page
    if (Math.random() < 0.01) {
      // 33.33% chance for each of the three secret pages
      const secretChoice = Math.random();
      if (secretChoice < 0.333) {
        navigate('/secret');
      } else if (secretChoice < 0.666) {
        navigate('/secret-alternate');
      } else {
        navigate('/secret-l');
      }
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableEntries.length);
    const randomEntry = availableEntries[randomIndex];
    navigate(`/entry/${randomEntry.id}`);
  };
  // Category icons
  const categoryIcons = {
    character: Users,
    equipment: Sword,
    location: MapPin,
    faction: Flag
  };

  // Count entries per category
  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce((acc, category) => {
      acc[category.type] = entries.filter(e => e.category === category.type).length;
      return acc;
    }, {} as Record<string, number>);
  }, [entries]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          The Lore - Encyclopedia
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Welcome to The Lore's Encyclopedia! This website contains all information surrounding The Lore, it's plot, and story elements! Feel free to search for what you're after, or browse entries that have been recently updated!
        </p>
      </div>
      
      <div className="flex justify-center mb-12 animate-scale-in" style={{ animationDelay: '100ms' }}>
        <SearchBar />
      </div>

      <div className="space-y-8">
        {/* Category Navigation Section */}
        <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">Explore Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((category, index) => (
                <CategoryCard
                  key={category.type}
                  title={category.label}
                  description={`Browse all ${category.label.toLowerCase()}`}
                  icon={categoryIcons[category.type as keyof typeof categoryIcons]}
                  path={`/category/${category.type}/${getDefaultSubcategory(category.type)}`}
                  count={categoryCounts[category.type] || 0}
                  colorClass={`bg-wiki-${category.type}`}
                  delay={index * 100}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browse Random Entry Section */}
        <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">Browse Random Entry</CardTitle>
          </CardHeader>
          <CardContent>
            {randomEntries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {randomEntries.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className="opacity-0 animate-card-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <WikiEntryCard entry={entry} imageDelay={index * 0.1 + 0.2} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center mb-6 rounded-xl border">
                <p className="text-foreground">No entries have been added yet.</p>
              </Card>
            )}
            
            <div className="text-center">
              <Button size="lg" onClick={handleViewRandomEntry} className="shadow-lg rounded-xl">
                <Shuffle className="mr-2 h-5 w-5" />
                View Random Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What's New Section */}
        <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">What's New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-3xl mx-auto">
              {sortedWhatsNewEntries.slice(0, 3).map((item, index) => (
                <TimelineItem 
                  key={item.id}
                  item={item}
                  isLast={index === 2}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild className="rounded-xl">
                <Link to="/whats-new" className="flex items-center justify-center">
                  <List className="mr-2 h-5 w-5" />
                  View All Updates
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12 max-w-3xl mx-auto" />

      {/* Questions & Answers Section */}
      <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">Questions & Answers</CardTitle>
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

export default HomePage;
