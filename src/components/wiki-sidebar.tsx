import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, GitCompare, BarChart3, ArrowLeft, Globe, Settings, Trophy, Menu, Home } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CategoryType, Subcategory } from "@/contexts/wiki-context";
import { useParticleSettings } from "@/contexts/particle-settings-context";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePart } from "@/contexts/part-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WikiTopNavProps {
  className?: string;
}

// Part Selector Component
function PartSelector() {
  const { currentPart, setCurrentPart, availableParts } = usePart();

  return (
    <Select value={currentPart} onValueChange={(value) => setCurrentPart(value as "Part 1" | "TEMP")}>
      <SelectTrigger className="w-[100px] h-8 text-xs border-border/50 bg-background/50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableParts.map((part) => (
          <SelectItem key={part} value={part}>
            {part}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function WikiTopNav({
  className
}: WikiTopNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isEntryPage = location.pathname.startsWith('/entry/');
  const isWorldMap = location.pathname === '/world';
  const fromParam = useMemo(() => new URLSearchParams(location.search).get("from"), [location.search]);
  const fromBloxiverse = fromParam === 'bloxiverse';
  const { particlesEnabled, toggleParticles } = useParticleSettings();
  const { isTournamentUnlocked } = useEasterEgg();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(CATEGORIES.reduce((acc, category) => ({
    ...acc,
    [category.type]: true
  }), {}));
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navBarVisible, setNavBarVisible] = useState(() => {
    const saved = localStorage.getItem('navBarVisible');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('navBarVisible', navBarVisible.toString());
  }, [navBarVisible]);

  const toggleCategory = (category: CategoryType) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  const handleCategoryClick = (categoryType: string, event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDropdown(openDropdown === categoryType ? null : categoryType);
  };

  const handleSubcategoryClick = (categoryType: string) => {
    setOpenDropdown(null);
  };


  // Desktop Navigation Menu Component
  const DesktopNav = () => (
    <div className="hidden md:block relative">
      {/* Tab Button - Extends below bar */}
      <Button
        variant="ghost"
        onClick={() => setNavBarVisible(!navBarVisible)}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full bg-background/95 backdrop-blur-md border border-t-0 border-border/50 rounded-b-xl px-4 py-1.5 hover:bg-accent/50 transition-all duration-200 hover:scale-105 hover:shadow-lg z-50"
      >
        {navBarVisible ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronUp className="h-4 w-4" />
        )}
      </Button>

      {/* Navigation Bar */}
      <div className={cn("flex items-center justify-between w-full px-6 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300", navBarVisible ? "py-3 opacity-100" : "py-0 h-0 opacity-0 overflow-hidden")}>
        {/* Left Section - Title and Main Navigation */}
        <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3">
          <Link to="/" className="group">
            <h1 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-200">The Lore</h1>
          </Link>
          <PartSelector />
        </div>

        <div className="flex items-center space-x-1">
          {/* Categories */}
          {CATEGORIES.map((category, index) => (
            <div key={category.type} className="flex items-center relative" data-dropdown>
              <Button
                variant="ghost"
                className="bg-transparent hover:bg-accent/50 px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50 text-sm font-medium h-auto"
                onClick={(e) => handleCategoryClick(category.type, e)}
              >
                {category.label}
                <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform duration-200", openDropdown === category.type && "rotate-180")} />
              </Button>

              {/* Dropdown Menu */}
              {openDropdown === category.type && (
                <div className="absolute left-0 top-full mt-2 w-[200px] p-2 rounded-xl bg-card border border-border/50 shadow-lg z-50">
                  <div className="flex flex-col gap-1">
                    {category.subcategories.map(subcategory => {
                      const target =
                        category.type === "location" && `${subcategory.value}` === "world-map"
                          ? "/world"
                          : `/category/${category.type}/${subcategory.value}`;
                      return (
                        <Link
                          key={`${category.type}-${subcategory.value}`}
                          to={target}
                          onClick={() => handleSubcategoryClick(category.type)}
                          className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {subcategory.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add divider line between categories (except after the last one) */}
              {index < CATEGORIES.length - 1 && (
                <div className="h-6 w-px bg-border/30 mx-2 rounded-full" />
              )}
            </div>
          ))}

          {/* Divider between Categories and Tools */}
          <div className="h-6 w-px bg-border/30 mx-4 rounded-full" />

          {/* Tools */}
          <div className="relative" data-dropdown>
            <Button
              variant="ghost"
              className="bg-transparent hover:bg-accent/50 px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50 text-sm font-medium h-auto"
              onClick={(e) => handleCategoryClick("tools", e)}
            >
              Tools
              <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform duration-200", openDropdown === "tools" && "rotate-180")} />
            </Button>

            {/* Dropdown Menu */}
            {openDropdown === "tools" && (
              <div className="absolute left-0 top-full mt-2 w-[240px] p-2 rounded-xl bg-card border border-border/50 shadow-lg z-50">
                <div className="flex flex-col gap-1">
                  <Link to="/statistics" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Statistics
                  </Link>
                  <Link to="/comparison" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Comparison
                  </Link>
                  {isTournamentUnlocked && (
                    <Link to="/tournament" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Tournament
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Divider between Tools and Plot Timeline */}
          <div className="h-6 w-px bg-border/30 mx-2 rounded-full" />

          {/* Plot Timeline */}
          <Button
            variant="ghost"
            onClick={() => navigate("/plot-timeline")}
            className="bg-transparent hover:bg-accent/50 px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50 text-sm font-medium h-auto"
          >
            Plot Timeline
          </Button>
        </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-3">
        {/* Back Button - Entry pages or world map */}
        {(isEntryPage || isWorldMap) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isWorldMap && fromBloxiverse) {
                navigate("/entry/the-bloxiverse");
              } else {
                navigate(-1);
              }
            }}
            className="h-10 w-10 p-0 rounded-xl border border-border/50 bg-background/50 hover:bg-card/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Options Menu */}
        <Dialog open={optionsOpen} onOpenChange={setOptionsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-xl border border-border/50 bg-background/50 hover:bg-card/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl border-border/50 bg-card/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Options</DialogTitle>
            </DialogHeader>
            <div className="flex items-start justify-between py-4 gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="particles-toggle" className="text-base font-semibold">
                  Disable All Particles / VFX
                </Label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This will disable ALL particles across ALL entries. Enable this if you have a low-end device, a poor internet connection, or if you're seeing weird glitches.
                </p>
              </div>
              <Switch
                id="particles-toggle"
                checked={!particlesEnabled}
                onCheckedChange={toggleParticles}
                className="border-2 border-border data-[state=checked]:bg-muted/30 data-[state=unchecked]:bg-muted/30"
                thumbClassName="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      </div>
    </div>
  );

  // Mobile Navigation Menu Component
  const MobileNav = () => (
    <div className="md:hidden flex items-center justify-between w-full px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border/50">
      {/* Left Section - Mobile Menu Button and Title */}
      <div className="flex items-center space-x-3">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full border border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-200"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-3 group" onClick={() => setMobileMenuOpen(false)}>
                    <Home className="h-5 w-5 text-primary" />
                    <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">The Lore</h2>
                  </Link>
                  <PartSelector />
                </div>
              </div>

              {/* Plot Timeline */}
              <div className="p-4 space-y-2 border-b border-border/30">
                <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider px-1">Quick Access</h3>
                <Link to="/plot-timeline" onClick={() => setMobileMenuOpen(false)}>
                  <div className="px-3 py-2 rounded-lg border border-transparent hover:border-border/50 hover:bg-card/50 transition-all duration-200">
                    <div className="font-medium text-sm text-foreground">Plot Timeline</div>
                    <div className="text-xs text-muted-foreground mt-0.5">View detailed episode breakdowns</div>
                  </div>
                </Link>
              </div>

              {/* Categories */}
              <div className="p-4 space-y-4 flex-1">
                <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider px-1">Browse Categories</h3>
                {CATEGORIES.map((category, categoryIndex) => (
                  <div key={category.type} className="space-y-2">
                    <Collapsible open={openCategories[category.type]} onOpenChange={() => toggleCategory(category.type)}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between px-1 py-2 h-auto rounded-lg hover:bg-accent/50 transition-all duration-200">
                          <h4 className="font-semibold text-sm text-foreground">{category.label}</h4>
                          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 text-foreground/60", openCategories[category.type] ? "rotate-180" : "rotate-0")} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                        <div className="pl-3 space-y-1 mt-1">
                          {category.subcategories.map(subcategory => {
                            const target =
                              category.type === "location" && `${subcategory.value}` === "world-map"
                                ? "/world"
                                : `/category/${category.type}/${subcategory.value}`;
                            return (
                              <Link
                                key={`${category.type}-${subcategory.value}`}
                                to={target}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg border border-transparent hover:border-border/50 hover:bg-card/50 transition-all duration-200"
                              >
                                <div className="font-medium text-sm text-foreground">{subcategory.label}</div>
                              </Link>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    {/* Divider between categories (except after the last one) */}
                    {categoryIndex < CATEGORIES.length - 1 && (
                      <div className="h-px bg-border/30 my-2 rounded-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Divider before Tools */}
              <div className="h-px bg-border/30 mx-4 rounded-full" />

              {/* Tools */}
              <div className="p-4 space-y-2 border-t border-border/30">
                <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider px-1">Tools</h3>
                <div className="space-y-1">
                  <Link to="/statistics" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center px-3 py-2 rounded-lg border border-transparent hover:border-border/50 hover:bg-card/50 transition-all duration-200">
                      <BarChart3 className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm text-foreground">Statistics</div>
                        <div className="text-xs text-muted-foreground">View detailed statistics</div>
                      </div>
                    </div>
                  </Link>
                  <Link to="/comparison" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center px-3 py-2 rounded-lg border border-transparent hover:border-border/50 hover:bg-card/50 transition-all duration-200">
                      <GitCompare className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm text-foreground">Comparison</div>
                        <div className="text-xs text-muted-foreground">Compare different entries</div>
                      </div>
                    </div>
                  </Link>
                  {isTournamentUnlocked && (
                    <Link to="/tournament" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center px-3 py-2 rounded-lg border border-transparent hover:border-border/50 hover:bg-card/50 transition-all duration-200">
                        <Trophy className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-foreground">Tournament</div>
                          <div className="text-xs text-muted-foreground">Participate in tournaments</div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-2">
          <Link to="/" className="group">
            <h1 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">The Lore</h1>
          </Link>
          <PartSelector />
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Back Button - Entry pages or world map */}
        {(isEntryPage || isWorldMap) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isWorldMap && fromBloxiverse) {
                navigate("/entry/the-bloxiverse");
              } else {
                navigate(-1);
              }
            }}
            className="h-10 w-10 p-0 rounded-xl border border-border/50 bg-background/50 hover:bg-card/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Options Menu */}
        <Dialog open={optionsOpen} onOpenChange={setOptionsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-xl border border-border/50 bg-background/50 hover:bg-card/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl border-border/50 bg-card/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Options</DialogTitle>
            </DialogHeader>
            <div className="flex items-start justify-between py-4 gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="particles-toggle" className="text-base font-semibold">
                  Disable All Particles / VFX
                </Label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This will disable ALL particles across ALL entries. Enable this if you have a low-end device, a poor internet connection, or if you're seeing weird glitches.
                </p>
              </div>
              <Switch
                id="particles-toggle"
                checked={!particlesEnabled}
                onCheckedChange={toggleParticles}
                className="border-2 border-border data-[state=checked]:bg-muted/30 data-[state=unchecked]:bg-muted/30"
                thumbClassName="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  return (
    <nav className={cn("sticky top-0 z-50 w-full", className)}>
      <DesktopNav />
      <MobileNav />
    </nav>
  );
}