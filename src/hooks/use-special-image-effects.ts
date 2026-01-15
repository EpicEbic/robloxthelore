import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlitchEffect } from './use-glitch-effect';

export const useSpecialImageEffects = () => {
  const navigate = useNavigate();
  const { triggerGlitch, isGlitching } = useGlitchEffect();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPermanentlyChanged, setIsPermanentlyChanged] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Helper function to check if we're on a page that should have special effects
  const isSpecialEffectPage = () => {
    const currentPath = window.location.pathname;
    return currentPath === "/entry/builderman";
  };
  
  // Reset the permanently changed state when the path changes or component unmounts
  useEffect(() => {
    if (!isSpecialEffectPage()) {
      setIsPermanentlyChanged(false);
      setHoveredIndex(null);
    }
  }, []);

  const handleThirdImageClick = () => {
    if (isSpecialEffectPage()) {
      setIsPermanentlyChanged(true);
      triggerGlitch(() => {
        navigate("/entry/the-reckoner");
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    // Only apply special hover effects on Builderman page
    if (isSpecialEffectPage()) {
      const isBuildermanPage = window.location.pathname === "/entry/builderman";
      
      // Builderman has 3 images, so we check for index 2 (third image)
      const isSpecialImage = isBuildermanPage && index === 2;
      
      if (isSpecialImage) {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        
        // Set a new timeout for 1 second
        hoverTimeoutRef.current = setTimeout(() => {
          setHoveredIndex(index);
        }, 1000);
      }
    }
  };

  const handleMouseLeave = () => {
    // Clear the timeout if mouse leaves before 1 second
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(null);
  };

  return {
    hoveredIndex,
    isPermanentlyChanged,
    isGlitching,
    isSpecialEffectPage,
    handleThirdImageClick,
    handleMouseEnter,
    handleMouseLeave
  };
};
