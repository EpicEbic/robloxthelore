import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, GitCompare, BarChart3, Zap, ArrowLeft, Globe } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CategoryType, Subcategory } from "@/contexts/wiki-context";
interface WikiSidebarProps {
  className?: string;
}
export function WikiSidebar({
  className
}: WikiSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isEntryPage = location.pathname.startsWith('/entry/');
  
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(CATEGORIES.reduce((acc, category) => ({
    ...acc,
    [category.type]: true
  }), {}));
  const toggleCategory = (category: CategoryType) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  return <Sidebar className={cn("z-[99999] transition-all duration-300 ease-in-out", className)}>
      <SidebarHeader className="flex items-center justify-between px-6 py-6 relative border-b border-sidebar-border/50">
        <Link to="/" className="flex items-center space-x-3 group">
          <h2 className="font-bold text-4xl text-sidebar-foreground group-hover:text-primary transition-colors duration-200">The Lore</h2>
        </Link>
        {/* Sidebar trigger positioned to extend beyond sidebar bounds */}
        <div className="absolute top-0 right-0 translate-x-full h-12 flex items-center z-[99999]">
          <SidebarTrigger className="h-12 w-12 bg-background/90 hover:bg-background border border-border/50 border-l-0 border-t-0 rounded-br-lg shadow-lg text-foreground hover:text-primary transition-all duration-300 flex items-center justify-center" />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6 space-y-6 custom-scrollbar">
        {/* Back Button - Only show on entry pages */}
        {isEntryPage && (
          <div className="mb-6 flex justify-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="justify-center p-4 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group"
            >
              <ArrowLeft className="h-6 w-6 mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
              <span className="font-bold text-lg text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">Back</span>
            </Button>
          </div>
        )}
        
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
                  {category.subcategories.map(subcategory => <Link key={`${category.type}-${subcategory.value}`} to={`/category/${category.type}/${subcategory.value}`} className={cn("text-sm px-3 py-2.5 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 font-medium text-sidebar-foreground/80 hover:text-sidebar-accent-foreground", `wiki-category-${category.type}`)}>
                      {subcategory.label}
                    </Link>)}
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
            <Link to="/fusion">
              <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group">
                <Zap className="h-5 w-5 mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
                <span className="font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">Fusion</span>
              </Button>
            </Link>
            <Link to="/world">
              <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 group">
                <Globe className="h-5 w-5 mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
                <span className="font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">World</span>
              </Button>
            </Link>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>;
}