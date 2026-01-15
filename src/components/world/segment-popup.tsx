import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BloxiverseSegment } from "@/data/bloxiverse-segments";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useMemo, useEffect } from "react";
import { LocationContentStyles } from "@/components/location/location-content-styles";

interface SegmentPopupProps {
  segment: BloxiverseSegment | null;
  open: boolean;
  onClose: () => void;
}

export function SegmentPopup({ segment, open, onClose }: SegmentPopupProps) {
  const navigate = useNavigate();
  
  // Inject style for lighter overlay (always call hooks)
  useEffect(() => {
    if (!document.querySelector('#segment-popup-overlay-style')) {
      const style = document.createElement('style');
      style.id = 'segment-popup-overlay-style';
      style.textContent = `
        [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.4) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Button styling (no theme-based backgrounds)
  const buttonStyle = useMemo(() => {
    return {
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      color: '#000000',
    };
  }, []);

  const handleViewDetails = () => {
    if (!segment) return;
    navigate(`/entry/the-bloxiverse?segment=${segment.id}`);
    onClose();
  };

  if (!segment) return null;

  return (
    <>
      <LocationContentStyles />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent 
          className="bg-card/95 backdrop-blur-sm border-2 max-w-2xl rounded-2xl shadow-xl"
        >
          <DialogHeader>
            <DialogTitle 
              className="text-3xl font-bold mb-4 text-black"
            >
              {segment.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="leading-relaxed text-base text-black">
              {segment.briefDescription}
            </p>
          
          <Button 
            onClick={handleViewDetails}
            className="w-full gap-2 rounded-xl border-2"
            style={buttonStyle}
          >
            <ExternalLink className="h-4 w-4" />
            View Full Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

