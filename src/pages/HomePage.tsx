import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchBar } from "@/components/search-bar";
import { WikiEntryCard } from "@/components/wiki-entry-card";
import { CategoryCard } from "@/components/category-card";
import { useWiki } from "@/contexts/wiki-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shuffle, Calendar, Users, Sword, MapPin, Flag } from "lucide-react";
import { whatsNewEntries } from "@/data/whats-new";
import { CATEGORIES } from "@/data/categories";
import { TimelineItem } from "@/components/timeline-item";

const HomePage = () => {
  // Sort entries by date (newest first) 
  const sortedWhatsNewEntries = useMemo(() => {
    return [...whatsNewEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const {
    entries
  } = useWiki();
  const navigate = useNavigate();

  // Filter out The Reckoner from all random entries
  const availableEntries = useMemo(() => {
    return entries.filter(entry => entry.id !== "the-reckoner");
  }, [entries]);

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
      // 50/50 chance between original and alternate secret page
      const useAlternate = Math.random() < 0.5;
      navigate(useAlternate ? '/secret-alternate' : '/secret');
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

  return <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-10 animate-fade-up">
        <h1 className="mb-4 tracking-wide font-extrabold text-foreground text-center text-5xl">The Lore - Encyclopedia</h1>
        <p className="text-lg font-medium text-foreground/90 max-w-2xl mx-auto">Welcome to The Lore's Encyclopedia! This website contains all information surrounding The Lore, it's plot, and story elements! Feel free to search for what you're after, or browse entries that have been recently updated!</p>
      </div>
      
      <div className="flex justify-center mb-10 animate-scale-in" style={{ animationDelay: '100ms' }}>
        <SearchBar />
      </div>

      {/* Category Navigation Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-foreground animate-slide-in">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.type}
              title={category.label}
              description={`Browse all ${category.label.toLowerCase()}`}
              icon={categoryIcons[category.type as keyof typeof categoryIcons]}
              path={`/category/${category.type}/all`}
              count={categoryCounts[category.type] || 0}
              colorClass={`bg-wiki-${category.type}`}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-foreground animate-slide-in">Browse Random Entry</h2>
        {randomEntries.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {randomEntries.map((entry, index) => <div key={entry.id} className="opacity-0 animate-card-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
                <WikiEntryCard entry={entry} imageDelay={index * 0.1 + 0.2} />
              </div>)}
          </div> : <Card className="p-6 text-center mb-6">
            <p className="text-foreground">No entries have been added yet.</p>
          </Card>}
        
        <div className="text-center">
          <Button size="lg" onClick={handleViewRandomEntry} className="shadow-lg">
            <Shuffle className="mr-2 h-5 w-5" />
            View Random Entry
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-foreground animate-slide-in">What's New</h2>
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
          <Button asChild>
            <Link to="/whats-new">View All Updates</Link>
          </Button>
        </div>
      </section>

    </div>;
};

export default HomePage;
