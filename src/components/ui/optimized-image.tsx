
import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEasterEgg } from '@/contexts/easter-egg-context';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  onLoadComplete?: () => void;
  /** If true, wrapper and <img> resize responsively to fit viewport (for dialogs, etc) */
  fitToScreen?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  fallbackSrc,
  priority = false,
  onLoadComplete,
  fitToScreen = false,
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const { isMinionMode, minionGifUrl, isCaesarSaladMode, caesarSaladImageUrl } = useEasterEgg();

  // Update currentSrc when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  // Use special images if Easter egg modes are active
  const displaySrc = isMinionMode 
    ? minionGifUrl 
    : isCaesarSaladMode 
    ? caesarSaladImageUrl 
    : currentSrc;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setError(false);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc && !isMinionMode && !isCaesarSaladMode) {
      setCurrentSrc(fallbackSrc);
    }
  }, [fallbackSrc, currentSrc, isMinionMode, isCaesarSaladMode]);

  return (
    <div
      className={cn(
        "relative",
        fitToScreen
          ? "flex justify-center items-center p-0 m-0 bg-transparent w-auto h-auto max-w-[98vw] max-h-[98vh]"
          : "overflow-hidden",
        className
      )}
      style={fitToScreen ? { background: "rgba(0,0,0,0.01)" } : undefined}
    >
      {isLoading && !error && (
        <div className={cn(
          "absolute inset-0 bg-muted/20 animate-pulse",
          fitToScreen && "max-w-[98vw] max-h-[98vh]"
        )} />
      )}
      <img
        src={displaySrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          fitToScreen
            ? "block m-0 p-0 rounded-md max-w-[98vw] max-h-[98vh] w-auto h-auto object-contain select-none"
            : "w-full h-full object-contain transition-opacity duration-300",
          isLoading && !fitToScreen ? "opacity-0" : "opacity-100"
        )}
        draggable={fitToScreen ? false : undefined}
        {...props}
      />
    </div>
  );
}
