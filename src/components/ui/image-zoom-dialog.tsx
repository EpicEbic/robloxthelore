
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageZoomDialogProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageZoomDialog({ src, alt, className }: ImageZoomDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-2 left-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-all duration-200 z-10"
        aria-label="View full size"
      >
        <Plus size={16} />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="bg-black/90" />
        <DialogContent className="p-0 border-none shadow-none bg-transparent flex items-center justify-center w-screen h-screen max-w-none max-h-none">
          <OptimizedImage
            src={src}
            alt={alt}
            fitToScreen // NEW: fit image to screen responsively
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
