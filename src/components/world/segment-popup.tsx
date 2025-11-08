import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BloxiverseSegment } from "@/data/bloxiverse-segments";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface SegmentPopupProps {
  segment: BloxiverseSegment | null;
  open: boolean;
  onClose: () => void;
}

export function SegmentPopup({ segment, open, onClose }: SegmentPopupProps) {
  const navigate = useNavigate();
  
  if (!segment) return null;
  
  const handleViewDetails = () => {
    navigate(`/entry/the-bloxiverse?segment=${segment.id}`);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-sm border-2 max-w-2xl">
        <DialogHeader>
          <DialogTitle 
            className="text-3xl font-bold mb-4"
            style={{ color: segment.color }}
          >
            {segment.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-foreground/90 leading-relaxed text-base">
            {segment.briefDescription}
          </p>
          
          <Button 
            onClick={handleViewDetails}
            className="w-full gap-2"
            style={{
              backgroundColor: segment.color,
              color: '#1a0a2e',
            }}
          >
            <ExternalLink className="h-4 w-4" />
            View Full Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

