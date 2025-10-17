
import { Separator } from "@/components/ui/separator";

interface CharacterHeaderProps {
  title: string;
  quote: {
    text: string;
    context?: string;
  };
}

export function CharacterHeader({ title, quote }: CharacterHeaderProps) {
  return (
    <>
      <div className="sticky top-0 z-10 relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-muted/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        
        <div className="relative p-6 lg:p-8 pb-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 break-words hyphens-auto bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent animate-rotate-in">
            {title}
          </h1>
          <div className="mt-6 p-4 lg:p-6 rounded-lg border-l-4 border-primary/50 bg-muted/30 backdrop-blur-sm italic animate-fade-in anim-delay-100">
            <p className="text-lg lg:text-xl text-foreground/90 break-words hyphens-auto leading-relaxed">
              "{quote.text}"
            </p>
            <p className="text-sm lg:text-base text-muted-foreground mt-3 break-words hyphens-auto">
              — {quote.context}
            </p>
          </div>
        </div>
      </div>
      
      <Separator className="my-0" />
    </>
  );
}
