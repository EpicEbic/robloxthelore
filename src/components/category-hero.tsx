import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/use-parallax";
import { getDefaultSubcategory } from "@/data/categories";

interface CategoryHeroProps {
  categoryType: string;
  categoryLabel: string;
  subcategoryLabel: string;
}

export function CategoryHero({ categoryType, categoryLabel, subcategoryLabel }: CategoryHeroProps) {
  const parallaxOffset = useParallax(0.2);
  
  return (
    <div
      className={cn(
        "p-8 lg:p-12 rounded-xl mb-8 text-center text-primary-foreground relative overflow-hidden shadow-lg",
        `bg-wiki-${categoryType}`
      )}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      
      <div className="relative z-10" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div className="flex items-center justify-center text-sm lg:text-base mb-4 animate-fade-in">
          <Link to="/" className="opacity-90 hover:opacity-100 transition-all">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 opacity-70" />
          <Link to={`/category/${categoryType}/${getDefaultSubcategory(categoryType)}`} className="opacity-90 hover:opacity-100 transition-all">{categoryLabel}</Link>
          {subcategoryLabel !== categoryLabel && (
            <>
              <ChevronRight className="h-4 w-4 mx-2 opacity-70" />
              <span className="font-semibold">{subcategoryLabel}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight animate-fade-in anim-delay-100">{subcategoryLabel}</h1>
      </div>
    </div>
  );
}
