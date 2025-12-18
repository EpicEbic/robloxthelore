
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
    console.log("Special image clicked! Current path:", window.location.pathname);
    
    if (isSpecialEffectPage()) {
      console.log("Triggering glitch effect and navigation...");
      setIsPermanentlyChanged(true);
      triggerGlitch(() => {
        console.log("Navigating to The Reckoner...");
        navigate("/entry/the-reckoner");
      });
    } else {
      console.log("Not on special effect page, click ignored");
    }
  };

  const handleMouseEnter = (index: number) => {
    console.log("Mouse entered image:", index, "Current path:", window.location.pathname);
    
    // Only apply special hover effects on Builderman page
    if (isSpecialEffectPage()) {
      const isBuildermanPage = window.location.pathname === "/entry/builderman";
      
      // Builderman has 3 images, so we check for index 2 (third image)
      const isSpecialImage = isBuildermanPage && index === 2;
      
      if (isSpecialImage) {
        console.log("Starting hover timer for special image");
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        
        // Set a new timeout for 1 second
        hoverTimeoutRef.current = setTimeout(() => {
          console.log(`Setting hovered index to ${index} after 1 second delay`);
          setHoveredIndex(index);
        }, 1000);
      }
    }
  };

  const handleMouseLeave = () => {
    console.log("Mouse left image");
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
