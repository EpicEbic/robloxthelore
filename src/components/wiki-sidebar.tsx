import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, GitCompare, BarChart3, ArrowLeft, Globe, Settings, Trophy, Menu, Home } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CategoryType } from "@/contexts/wiki-context";
import { useParticleSettings } from "@/contexts/particle-settings-context";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePart } from "@/contexts/part-context";

interface WikiTopNavProps {
  className?: string;
}

// Part Selector Component
function PartSelector() {
  const { currentPart, setCurrentPart } = usePart();
  const { isTournamentUnlocked } = useEasterEgg();

  return (
    <div className="flex items-center">
      <Button
        variant={currentPart === "Part 1" ? "default" : "outline"}
        size="sm"
        onClick={() => setCurrentPart("Part 1")}
        className={cn(
          "h-6 sm:h-6 md:h-7 px-1.5 sm:px-1.5 md:px-2 text-xs",
          isTournamentUnlocked ? "!rounded-l-xl !rounded-r-none border-r-0" : "!rounded-xl"
        )}
      >
        1
      </Button>
      {isTournamentUnlocked && (
        <Button
          variant={currentPart === "TEMP" ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPart("TEMP")}
          className="h-6 sm:h-6 md:h-7 px-1.5 sm:px-1.5 md:px-2 text-xs !rounded-r-xl !rounded-l-none"
        >
          T
        </Button>
      )}
    </div>
  );
}

export function WikiTopNav({
  className
}: WikiTopNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileHook = useIsMobile();
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
  const [hasOverflow, setHasOverflow] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('navBarVisible', navBarVisible.toString());
  }, [navBarVisible]);

  // Detect overflow in desktop nav bar
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    let checkTimeout: NodeJS.Timeout;
    let isChecking = false;
    
    const checkOverflow = () => {
      if (isChecking) return; // Prevent overlapping checks
      isChecking = true;
      
      // Only check if we're above mobile breakpoint
      if (window.innerWidth < 768) {
        setHasOverflow(false);
        isChecking = false;
        return;
      }

      // If nav bar is collapsed by user, we can't measure it accurately
      if (!navBarVisible) {
        // Don't change overflow state if nav is collapsed
        isChecking = false;
        return;
      }

      // Wait for DOM to be ready
      if (!desktopNavRef.current || !leftSectionRef.current || !rightSectionRef.current) {
        // If refs aren't ready but we're above mobile breakpoint, assume no overflow
        if (window.innerWidth >= 768) {
          setHasOverflow(false);
        }
        isChecking = false;
        return;
      }

      const navBar = desktopNavRef.current;
      const leftSection = leftSectionRef.current;
      const rightSection = rightSectionRef.current;

      // Check if nav is currently hidden
      const computedStyle = window.getComputedStyle(navBar);
      const wasHidden = computedStyle.display === 'none';
      
      // Store original inline styles
      const originalDisplay = navBar.style.display;
      const originalVisibility = navBar.style.visibility;
      const originalPosition = navBar.style.position;
      const originalTop = navBar.style.top;
      const originalLeft = navBar.style.left;
      
      // Force visibility for measurement if hidden
      if (wasHidden) {
        navBar.style.display = 'flex';
        navBar.style.visibility = 'visible';
        navBar.style.position = 'static';
        navBar.style.top = '';
        navBar.style.left = '';
        navBar.style.width = '100%';
      }
      
      // Force a reflow to ensure measurements are accurate
      void navBar.offsetHeight;
      void leftSection.offsetHeight;
      void rightSection.offsetHeight;

      // Small delay to ensure layout is stable
      setTimeout(() => {
        // Check if content overflows by comparing actual widths
        const navBarWidth = navBar.clientWidth || navBar.offsetWidth;
        const leftWidth = leftSection.scrollWidth || leftSection.offsetWidth;
        const rightWidth = rightSection.scrollWidth || rightSection.offsetWidth;
        
        // Restore original styles if we modified them
        if (wasHidden) {
          navBar.style.display = originalDisplay || 'none';
          navBar.style.visibility = originalVisibility;
          navBar.style.position = originalPosition;
          navBar.style.top = originalTop;
          navBar.style.left = originalLeft;
          navBar.style.width = '';
        }
        
        // Account for padding (px-3 sm:px-4 md:px-6 = 12px/16px/24px on each side)
        const padding = window.innerWidth >= 768 ? 48 : window.innerWidth >= 640 ? 32 : 24;
        const availableWidth = navBarWidth - padding;
        
        // Calculate total needed width (content + some buffer for spacing)
        const totalContentWidth = leftWidth + rightWidth;
        
        // Only trigger overflow if content truly exceeds available space
        // Use a small tolerance (5px) to avoid false positives from rounding
        const overflowDetected = totalContentWidth > (availableWidth - 5);
        
        setHasOverflow(overflowDetected);
        isChecking = false;
      }, 50); // Small delay to ensure layout is stable
    };

    // Small delay to ensure DOM is updated and styles are applied
    const timeoutId = setTimeout(() => {
      // Try desktop first, then check
      setHasOverflow(false);
      setTimeout(checkOverflow, 200);
    }, 150);
    
    // Check on window resize - try desktop first, then check if it fits
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      clearTimeout(checkTimeout);
      
      // Immediately try to show desktop topbar
      setHasOverflow(false);
      
      // Then check if it actually fits after a delay (allow layout to settle)
      resizeTimeout = setTimeout(() => {
        checkTimeout = setTimeout(checkOverflow, 150);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver to watch for content changes
    let observerTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(observerTimeout);
      clearTimeout(checkTimeout);
      
      // Immediately try to show desktop topbar
      setHasOverflow(false);
      
      // Then check if it actually fits after a delay (allow layout to settle)
      observerTimeout = setTimeout(() => {
        checkTimeout = setTimeout(checkOverflow, 150);
      }, 100);
    });
    
    // Observe all relevant elements
    if (desktopNavRef.current) {
      resizeObserver.observe(desktopNavRef.current);
    }
    if (leftSectionRef.current) {
      resizeObserver.observe(leftSectionRef.current);
    }
    if (rightSectionRef.current) {
      resizeObserver.observe(rightSectionRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      clearTimeout(checkTimeout);
      clearTimeout(observerTimeout);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [navBarVisible]);

  // Use mobile view if hook says mobile OR if content overflows
  const isMobile = isMobileHook || hasOverflow;

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
    <div 
      className={cn("hidden md:block relative", (hasOverflow || isMobileHook) && "!hidden")} 
      style={{ 
        // Keep in DOM for measurement - use visibility instead of display
        display: (hasOverflow || isMobileHook) ? 'none' : undefined,
      }}
    >
      {/* Tab Button - Extends below bar */}
      <Button
        variant="ghost"
        onClick={() => setNavBarVisible(!navBarVisible)}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full bg-background/95 backdrop-blur-md border border-t-0 border-border/50 rounded-b-xl px-4 py-1.5 hover:bg-accent/50 transition-all duration-200 hover:scale-105 hover:shadow-lg z-30"
      >
        {navBarVisible ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronUp className="h-4 w-4" />
        )}
      </Button>

      {/* Navigation Bar */}
      <div ref={desktopNavRef} className={cn("flex items-center justify-between w-full px-3 sm:px-4 md:px-6 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300 relative z-50", navBarVisible ? "py-2 sm:py-2.5 md:py-3 opacity-100" : "py-0 h-0 opacity-0 overflow-hidden")}>
        {/* Left Section - Title and Main Navigation */}
        <div ref={leftSectionRef} className="flex items-center space-x-3 sm:space-x-4 md:space-x-8 flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3">
          <Link to="/" className="group">
            <h1 className="font-bold text-base sm:text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-200">The Lore</h1>
          </Link>
          <PartSelector />
        </div>

        <div className="flex items-center space-x-0.5 sm:space-x-1 relative">
          {/* Categories */}
          {CATEGORIES.map((category, index) => (
            <div key={category.type} className="flex items-center relative z-[100]" data-dropdown>
              <Button
                variant="ghost"
                className="bg-transparent hover:bg-accent/50 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50 text-xs sm:text-xs md:text-sm font-medium h-auto"
                onClick={(e) => handleCategoryClick(category.type, e)}
              >
                {category.label}
                <ChevronDown className={cn("ml-0.5 sm:ml-1 h-2.5 sm:h-3 w-2.5 sm:w-3 transition-transform duration-200", openDropdown === category.type && "rotate-180")} />
              </Button>

              {/* Dropdown Menu */}
              {openDropdown === category.type && (
                <div className="absolute left-0 top-full mt-2 w-[200px] p-2 rounded-xl bg-card border border-border/50 shadow-lg z-[100]">
                  <div className="flex flex-col gap-1">
                    {category.subcategories.map((subcategory, index) => {
                      const target = `/category/${category.type}/${subcategory.value}`;
                      return (
                        <div key={`${category.type}-${subcategory.value}`}>
                          <Link
                            to={target}
                            onClick={() => handleSubcategoryClick(category.type)}
                            className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {subcategory.label}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add divider line between categories (except after the last one) */}
              {index < CATEGORIES.length - 1 && (
                <div className="h-4 sm:h-5 md:h-6 w-px bg-border/30 mx-1 sm:mx-1.5 md:mx-2 rounded-full" />
              )}
            </div>
          ))}

          {/* Divider between Categories and Tools */}
          <div className="h-4 sm:h-5 md:h-6 w-px bg-border/30 mx-2 sm:mx-3 md:mx-4 rounded-full" />

          {/* Tools */}
          <div className="relative z-[100]" data-dropdown>
            <Button
              variant="ghost"
              className="bg-transparent hover:bg-accent/50 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50 text-xs sm:text-xs md:text-sm font-medium h-auto"
              onClick={(e) => handleCategoryClick("tools", e)}
            >
              Tools
              <ChevronDown className={cn("ml-0.5 sm:ml-1 h-2.5 sm:h-3 w-2.5 sm:w-3 transition-transform duration-200", openDropdown === "tools" && "rotate-180")} />
            </Button>

            {/* Dropdown Menu */}
            {openDropdown === "tools" && (
              <div className="absolute left-0 top-full mt-2 w-[240px] p-2 rounded-xl bg-card border border-border/50 shadow-lg z-[100]">
                <div className="flex flex-col gap-1">
                  <Link to="/statistics" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Statistics
                  </Link>
                  <Link to="/height-comparison" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Height Comparison
                  </Link>
                  <Link to="/world" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    World Map
                  </Link>
                  {isTournamentUnlocked && (
                    <Link to="/comparison" onClick={() => handleSubcategoryClick("tools")} className="block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Comparison
                    </Link>
                  )}
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
          <div className="h-4 sm:h-5 md:h-6 w-px bg-border/30 mx-1 sm:mx-1.5 md:mx-2 rounded-full" />

          {/* Plot Timeline */}
          <Button
            variant="ghost"
            onClick={() => navigate("/plot-timeline")}
            className="bg-transparent hover:bg-accent/50 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50 text-xs sm:text-xs md:text-sm font-medium h-auto"
          >
            Plot Timeline
          </Button>
        </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div ref={rightSectionRef} className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-shrink-0">
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
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 p-0 rounded-xl border border-border/50 bg-background/50 hover:bg-card/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
          </Button>
        )}

        {/* Options Menu */}
        <Dialog open={optionsOpen} onOpenChange={setOptionsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 p-0 rounded-xl border border-border/50 bg-background/50 hover:bg-card/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Settings className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
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
    <div className={cn(
      "flex items-center justify-between w-full px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border/50",
      !hasOverflow && !isMobileHook && "md:hidden"
    )}>
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
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col mobile-sidebar">
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
              <div className="p-4 border-b border-border/50">
                <Link to="/" className="flex items-center space-x-3 group" onClick={() => setMobileMenuOpen(false)}>
                  <Home className="h-5 w-5 text-primary" />
                  <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">The Lore</h2>
                </Link>
              </div>

              {/* Plot Timeline */}
              <div className="p-4 space-y-2 border-b border-border/30">
                <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider px-1">Quick Access</h3>
                <Link to="/plot-timeline" onClick={() => setMobileMenuOpen(false)}>
                  <div className="px-3 py-2 rounded-lg mobile-sidebar-link">
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
                        <Button variant="ghost" className="w-full justify-between px-1 py-2 h-auto rounded-lg mobile-sidebar-button">
                          <h4 className="font-semibold text-sm text-foreground">{category.label}</h4>
                          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 text-foreground/60", openCategories[category.type] ? "rotate-180" : "rotate-0")} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                        <div className="pl-3 space-y-1 mt-1">
                          {category.subcategories.map((subcategory, index) => {
                            const target = `/category/${category.type}/${subcategory.value}`;
                            return (
                              <div key={`${category.type}-${subcategory.value}`}>
                                <Link
                                  to={target}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block px-3 py-2 rounded-lg mobile-sidebar-link"
                                >
                                  <div className="font-medium text-sm text-foreground">{subcategory.label}</div>
                                </Link>
                              </div>
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
                    <div className="flex items-center px-3 py-2 rounded-lg mobile-sidebar-link">
                      <BarChart3 className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm text-foreground">Statistics</div>
                        <div className="text-xs text-muted-foreground">View detailed statistics</div>
                      </div>
                    </div>
                  </Link>
                  <Link to="/world" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center px-3 py-2 rounded-lg mobile-sidebar-link">
                      <Globe className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm text-foreground">World Map</div>
                        <div className="text-xs text-muted-foreground">Explore the Bloxiverse</div>
                      </div>
                    </div>
                  </Link>
                  {isTournamentUnlocked && (
                    <Link to="/comparison" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center px-3 py-2 rounded-lg mobile-sidebar-link">
                        <GitCompare className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-foreground">Comparison</div>
                          <div className="text-xs text-muted-foreground">Compare different entries</div>
                        </div>
                      </div>
                    </Link>
                  )}
                  {isTournamentUnlocked && (
                    <Link to="/tournament" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center px-3 py-2 rounded-lg mobile-sidebar-link">
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