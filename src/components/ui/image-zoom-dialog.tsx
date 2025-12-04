
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogClose } from "@/components/ui/dialog";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Plus, X } from "lucide-react";
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
        <DialogOverlay 
          className="bg-black/90 cursor-pointer" 
          onClick={() => setIsOpen(false)}
        />
        <DialogContent 
          className="p-0 border-none shadow-none bg-transparent flex items-center justify-center w-screen h-screen max-w-none max-h-none [&>button]:hidden"
          onPointerDownOutside={(e) => {
            // Close when clicking outside the image
            setIsOpen(false);
          }}
        >
          <div 
            className="relative"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={src}
              alt={alt}
              fitToScreen
            />
            {/* Custom Close Button */}
            <DialogClose asChild>
              <button
                className="absolute top-4 right-4 h-12 w-12 rounded-full border-2 border-white/80 bg-black/60 hover:bg-black/80 hover:border-white transition-all duration-200 flex items-center justify-center z-50 shadow-lg"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
