
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CarouselItem } from "@/components/ui/carousel";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ImageZoomDialog } from "@/components/ui/image-zoom-dialog";
import { getImageSrc } from "@/utils/image-source-utils";

interface CarouselImage {
  url: string;
  caption: string;
}

interface CharacterCarouselItemProps {
  item: CarouselImage;
  index: number;
  currentAppearance: string;
  hoveredIndex: number | null;
  isPermanentlyChanged: boolean;
  isGlitching: boolean;
  isSpecialEffectPage: () => boolean;
  onThirdImageClick: () => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

export function CharacterCarouselItem({
  item,
  index,
  currentAppearance,
  hoveredIndex,
  isPermanentlyChanged,
  isGlitching,
  isSpecialEffectPage,
  onThirdImageClick,
  onMouseEnter,
  onMouseLeave
}: CharacterCarouselItemProps) {
  const imageSrc = getImageSrc(item, index, isSpecialEffectPage, hoveredIndex, isPermanentlyChanged, isGlitching);
  
  // Determine if this is the special image based on the page and index
  const isRiceFarmerPage = window.location.pathname === "/entry/rice-farmer";
  const isBuildermanPage = window.location.pathname === "/entry/builderman";
  const isSpecialImage = isSpecialEffectPage() && (
    (isRiceFarmerPage && index === 4) || (isBuildermanPage && index === 2)
  );

  return (
    <CarouselItem key={`${currentAppearance}-${item.url}-${index}`}>
      <div className="p-1">
        <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-md bg-muted/20">
          <div className="relative w-full h-full">
            <OptimizedImage
              key={`${imageSrc}-${hoveredIndex}-${isPermanentlyChanged}`}
              src={imageSrc}
              alt={`Character image ${index + 1}`}
              priority={index === 0}
              className={`w-full h-full opacity-0 animate-image-fade-in ${
                isSpecialImage ? "cursor-pointer" : ""
              }`}
              style={{ animationDelay: `${0.2 + index * 0.5}s` }}
              onClick={isSpecialImage ? onThirdImageClick : undefined}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={onMouseLeave}
            />
            <ImageZoomDialog
              src={imageSrc}
              alt={`Character image ${index + 1} - Full size`}
            />
          </div>
        </AspectRatio>
        <div className="text-center mt-2 p-2 bg-muted/30 rounded-md animate-fade-in" style={{ animationDelay: `${0.7 + index * 0.5}s` }}>
          <p className="text-sm break-words">{item.caption}</p>
        </div>
      </div>
    </CarouselItem>
  );
}
