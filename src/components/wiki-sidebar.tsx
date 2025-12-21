import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronDown, GitCompare, BarChart3, ArrowLeft, Globe, Settings, Trophy } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CategoryType, Subcategory } from "@/contexts/wiki-context";
import { useParticleSettings } from "@/contexts/particle-settings-context";
import { useEasterEgg } from "@/contexts/easter-egg-context";
interface WikiSidebarProps {
  className?: string;
}
export function WikiSidebar({
  className
}: WikiSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isEntryPage = location.pathname.startsWith('/entry/');
  const isWorldMap = location.pathname === '/world';
  const fromParam = useMemo(() => new URLSearchParams(location.search).get("from"), [location.search]);
  const fromBloxiverse = fromParam === 'bloxiverse';
  const { particlesEnabled, toggleParticles } = useParticleSettings();
  const { isTournamentUnlocked } = useEasterEgg();
  
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(CATEGORIES.reduce((acc, category) => ({
    ...acc,
    [category.type]: true
  }), {}));
  const [optionsOpen, setOptionsOpen] = useState(false);
  
  const toggleCategory = (category: CategoryType) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  return <Sidebar className={cn("z-[99999] transition-all duration-300 ease-in-out", className)}>
      <SidebarHeader className="flex flex-col items-center px-6 py-6 relative border-b border-sidebar-border/50">
        {/* Sidebar trigger positioned to extend beyond sidebar bounds */}
        <div className="absolute top-0 right-0 translate-x-full h-12 flex items-center z-[99999]">
          <SidebarTrigger className="h-12 w-12 bg-background/90 hover:bg-background border border-border/50 border-l-0 border-t-0 rounded-br-lg shadow-lg text-foreground hover:text-primary transition-all duration-300 flex items-center justify-center" />
        </div>
        {/* Title */}
        <Link to="/" className="flex items-center space-x-3 group mb-2">
          <h2 className="font-bold text-4xl text-sidebar-foreground group-hover:text-primary transition-colors duration-200">The Lore</h2>
        </Link>
        {/* Action Buttons - Back and Options */}
        <div className="flex items-center gap-2">
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
              className="h-8 w-8 p-0 rounded-full border border-sidebar-border/50 bg-sidebar-accent/20 hover:bg-sidebar-accent/50 transition-all duration-200 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:border-sidebar-accent-foreground/50"
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
                className="h-8 w-8 p-0 rounded-full border border-sidebar-border/50 bg-sidebar-accent/20 hover:bg-sidebar-accent/50 transition-all duration-200 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:border-sidebar-accent-foreground/50"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: '#000000', color: '#ffffff', borderColor: '#ffffff', borderWidth: '1px' }}>
              <DialogHeader>
                <DialogTitle className="!text-foreground">Options</DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5">
                  <Label htmlFor="particles-toggle" className="text-base !text-foreground">
                    Disable All Particles / VFX
                  </Label>
                  <p className="text-sm !text-muted-foreground">
                    This will disable ALL particles across ALL entries. Enable this if you have a low-end device, a poor internet connection, or if you're seeing weird glitches.
                  </p>
                </div>
                <Switch
                  id="particles-toggle"
                  checked={!particlesEnabled}
                  onCheckedChange={toggleParticles}
                  className="border-2 border-white data-[state=checked]:bg-muted/30 data-[state=unchecked]:bg-muted/30"
                  thumbClassName="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6 space-y-6 custom-scrollbar">
        {/* Plot Timeline shortcut */}
        <div className="space-y-2">
          <Link to="/plot-timeline">
            <Button variant="ghost" className="w-full justify-center py-3 rounded-lg font-semibold hover:bg-sidebar-accent/50 transition-all duration-200">
              Plot Timeline
            </Button>
          </Link>
        </div>

        {/* Main Categories Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2">Browse Categories</h3>
          {CATEGORIES.map(category => <Collapsible key={category.type} className="group" open={openCategories[category.type]} onOpenChange={() => toggleCategory(category.type)}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group-hover:bg-sidebar-accent/30">
                  <span className="font-semibold text-base text-sidebar-foreground">{category.label}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 text-sidebar-foreground/60", openCategories[category.type] ? "rotate-180" : "rotate-0")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                <div className="flex flex-col space-y-1 pl-2 mt-2">
                  {category.subcategories.map(subcategory => {
                    const target =
                      category.type === "location" && `${subcategory.value}` === "world-map"
                        ? "/world"
                        : `/category/${category.type}/${subcategory.value}`;
                    return (
                      <Link
                        key={`${category.type}-${subcategory.value}`}
                        to={target}
                        className={cn(
                          "text-sm px-3 py-2.5 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 font-medium text-sidebar-foreground/80 hover:text-sidebar-accent-foreground",
                          `wiki-category-${category.type}`
                        )}
                      >
                        {subcategory.label}
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>)}
        </div>
        
        {/* Separator with improved styling */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-sidebar-border/30"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-sidebar px-3 text-sidebar-foreground/50 font-medium">Tools</span>
          </div>
        </div>
        
        {/* Tools Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2">Quick Tools</h3>
          <div className="space-y-1">
            <Link to="/statistics">
              <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group">
                <BarChart3 className="h-5 w-5 mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
                <span className="font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">Statistics</span>
              </Button>
            </Link>
            <Link to="/comparison">
              <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group">
                <GitCompare className="h-5 w-5 mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
                <span className="font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">Comparison</span>
              </Button>
            </Link>
            {isTournamentUnlocked && (
              <Link to="/tournament">
                <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group">
                  <Trophy className="h-5 w-5 mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
                  <span className="font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">Tournament</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>;
}