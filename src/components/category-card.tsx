import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  count: number;
  colorClass: string;
  delay?: number;
}

export function CategoryCard({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  count, 
  colorClass,
  delay = 0 
}: CategoryCardProps) {
  return (
    <Link 
      to={path}
      className="block animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card className={cn(
        "group relative overflow-hidden border-2 transition-all duration-500 card-hover-character"
      )}>
        {/* Background gradient overlay */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
          colorClass
        )} />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between mb-2">
            <div className={cn(
              "p-3 rounded-lg transition-all duration-500",
              "bg-primary/10 group-hover:bg-primary/20"
            )}>
              <Icon className={cn(
                "h-8 w-8 transition-colors duration-300",
                "text-primary group-hover:text-primary"
              )} />
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-primary/70 group-hover:text-primary transition-colors duration-300">
                {count}
              </div>
              <div className="text-xs text-muted-foreground">
                {count === 1 ? 'entry' : 'entries'}
              </div>
            </div>
          </div>
          
          <CardTitle className="text-2xl transition-colors duration-300 group-hover:text-primary">
            {title}
          </CardTitle>
          
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
