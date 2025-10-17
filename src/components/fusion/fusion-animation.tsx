import { useState, useEffect } from "react";
import { WikiEntry } from "@/types/wiki-types";
import { FusionEntry } from "@/types/fusion-types";
import { Card } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Zap, Sparkles } from "lucide-react";
interface FusionAnimationProps {
  entry1: WikiEntry;
  entry2: WikiEntry;
  fusion: FusionEntry;
  onComplete?: () => void;
}

export function FusionAnimation({ entry1, entry2, fusion, onComplete }: FusionAnimationProps) {
  const [phase, setPhase] = useState<'initial' | 'merging' | 'charging' | 'flash' | 'fusion' | 'complete'>('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('merging'), 800);
    const timer2 = setTimeout(() => setPhase('charging'), 2000);
    const timer3 = setTimeout(() => setPhase('flash'), 3500);
    const timer4 = setTimeout(() => setPhase('fusion'), 3800);
    const timer5 = setTimeout(() => setPhase('complete'), 5500);
    const timer6 = setTimeout(() => {
      onComplete?.();
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  const getFusionImage = () => {
    if (fusion.id === 'caesar-spawnboy-fusion') {
      return "/lovable-uploads/f177316f-29dc-4834-99b3-30d8ebcf9bcd.png";
    }
    return fusion.images?.[0] || null;
  };

  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="relative h-[500px] flex items-center justify-center p-8">
        {/* Background Energy Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base energy background */}
          <div className={`absolute inset-0 transition-all duration-1000 ${
            phase === 'initial' ? 'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10' :
            phase === 'merging' ? 'bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 animate-pulse' :
            phase === 'charging' ? 'bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 animate-pulse' :
            phase === 'flash' ? 'bg-white' :
            phase === 'fusion' ? 'bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40' :
            'bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20'
          }`} />
          
          {/* Flash effect overlay */}
          {phase === 'flash' && (
            <div className="absolute inset-0 bg-white animate-pulse opacity-90" />
          )}
          
          {/* Central energy effects */}
          {phase !== 'initial' && phase !== 'flash' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`transition-all duration-700 ${
                phase === 'merging' ? 'scale-100 opacity-60' :
                phase === 'charging' ? 'scale-150 opacity-80 animate-spin' :
                phase === 'fusion' ? 'scale-200 opacity-100' :
                'scale-110 opacity-50'
              }`}>
                <Zap className="h-32 w-32 text-primary drop-shadow-2xl" />
              </div>
              
              {/* Additional energy rings */}
              {(phase === 'charging' || phase === 'fusion') && (
                <>
                  <div className="absolute w-64 h-64 rounded-full border-4 border-primary/50 animate-ping" />
                  <div className="absolute w-96 h-96 rounded-full border-2 border-secondary/30 animate-pulse" />
                </>
              )}
            </div>
          )}
          
          {/* Dramatic particle effects during charging */}
          {phase === 'charging' && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    animationDuration: `${0.5 + Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Character Images */}
        <div className="relative z-10 flex items-center justify-center w-full">
          {phase === 'initial' || phase === 'merging' || phase === 'charging' ? (
            <div className="flex items-center gap-8">
              {/* Character 1 */}
              <div className={`transition-all duration-1000 ${
                phase === 'merging' ? 'transform translate-x-12 scale-80 opacity-80' : 
                phase === 'charging' ? 'transform translate-x-20 scale-60 opacity-50 blur-sm' : ''
              }`}>
                <div className={`w-48 h-48 rounded-lg overflow-hidden border-4 shadow-2xl ${
                  phase === 'charging' ? 'border-primary animate-pulse' : 'border-primary/50'
                }`}>
                  <OptimizedImage
                    src={entry1.imageUrl || "/placeholder.svg"}
                    alt={entry1.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-center mt-2 font-semibold transition-opacity duration-1000 ${
                  phase === 'charging' ? 'opacity-30' : ''
                }`}>{entry1.title}</p>
              </div>

              {/* Fusion Symbol */}
              <div className={`transition-all duration-1000 ${
                phase === 'merging' ? 'scale-150 rotate-180' : 
                phase === 'charging' ? 'scale-200 rotate-360' : ''
              }`}>
                <div className={`flex items-center justify-center w-16 h-16 rounded-full border-2 ${
                  phase === 'charging' ? 'bg-primary/50 border-primary animate-spin shadow-2xl shadow-primary/50' : 'bg-primary/20 border-primary'
                }`}>
                  <Zap className={`text-primary ${
                    phase === 'charging' ? 'h-12 w-12 animate-pulse' : 'h-8 w-8'
                  }`} />
                </div>
              </div>

              {/* Character 2 */}
              <div className={`transition-all duration-1000 ${
                phase === 'merging' ? 'transform -translate-x-12 scale-80 opacity-80' : 
                phase === 'charging' ? 'transform -translate-x-20 scale-60 opacity-50 blur-sm' : ''
              }`}>
                <div className={`w-48 h-48 rounded-lg overflow-hidden border-4 shadow-2xl ${
                  phase === 'charging' ? 'border-primary animate-pulse' : 'border-primary/50'
                }`}>
                  <OptimizedImage
                    src={entry2.imageUrl || "/placeholder.svg"}
                    alt={entry2.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-center mt-2 font-semibold transition-opacity duration-1000 ${
                  phase === 'charging' ? 'opacity-30' : ''
                }`}>{entry2.title}</p>
              </div>
            </div>
          ) : phase === 'flash' ? (
            <div className="flex items-center justify-center opacity-0">
              <div className="w-64 h-64 bg-white rounded-full animate-ping" />
            </div>
          ) : (
            /* Fusion Result */
            <div className={`transition-all duration-1000 ${
              phase === 'fusion' ? 'animate-scale-in' : phase === 'complete' ? 'scale-110' : ''
            }`}>
              <div className="text-center space-y-4">
                <div className="w-64 h-64 rounded-lg overflow-hidden border-4 border-primary shadow-2xl mx-auto">
                  {getFusionImage() ? (
                    <OptimizedImage
                      src={getFusionImage()!}
                      alt={fusion.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Sparkles className="h-24 w-24 text-primary" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-primary">{fusion.name}</h2>
                  <p className="text-lg text-muted-foreground">
                    {entry1.title} + {entry2.title}
                  </p>
                  {phase === 'complete' && (
                    <p className="text-sm text-muted-foreground animate-fade-in">
                      Fusion Complete!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </Card>
  );
}