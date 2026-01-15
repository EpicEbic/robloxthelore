import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RobloxianWorld } from "@/data/robloxian-worlds";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useEffect } from "react";

interface WorldPopupProps {
  world: RobloxianWorld | null;
  open: boolean;
  onClose: () => void;
}

export function WorldPopup({ world, open, onClose }: WorldPopupProps) {
  const navigate = useNavigate();
  
  if (!world) return null;
  
  const handleViewEntry = () => {
    if (world.entryId) {
      navigate(`/entry/${world.entryId}`);
      onClose();
    }
  };

  // Inject style for lighter overlay
  useEffect(() => {
    if (!document.querySelector('#world-popup-overlay-style')) {
      const style = document.createElement('style');
      style.id = 'world-popup-overlay-style';
      style.textContent = `
        [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.4) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-card/95 backdrop-blur-sm border-2 max-w-2xl rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4 text-primary">
              {world.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* World thumbnail */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <OptimizedImage
                  src={world.thumbnail}
                  alt={world.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Description */}
            {world.description && (
              <p className="text-foreground/90 leading-relaxed text-base text-center">
                {world.description}
              </p>
            )}
            
            {/* View Entry Button */}
            {world.entryId && (
              <Button 
                onClick={handleViewEntry}
                className="w-full gap-2 rounded-xl"
              >
                <ExternalLink className="h-4 w-4" />
                View World Entry
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
  );
}

