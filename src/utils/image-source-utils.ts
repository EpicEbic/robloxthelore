
interface CarouselImage {
  url: string;
  caption: string;
}

export const getImageSrc = (
  item: CarouselImage, 
  index: number, 
  isSpecialEffectPage: () => boolean,
  hoveredIndex: number | null,
  isPermanentlyChanged: boolean,
  isGlitching: boolean
) => {
  // Only apply special image logic on Builderman page
  if (!isSpecialEffectPage()) {
    return item.url;
  }
  
  const isBuildermanPage = window.location.pathname === "/entry/builderman";
  
  console.log(`Getting image src for index ${index}: isBuildermanPage=${isBuildermanPage}, isGlitching=${isGlitching}`);
  
  // If we're on Builderman's page and glitching is active, show the Builderman glitch image for all images
  if (isBuildermanPage && isGlitching) {
    console.log("Using glitch image during effect for Builderman");
    return "/lovable-uploads/b946ec16-5a2f-4053-97a0-a944f2f2c9cb.png";
  }
  
  // Builderman logic on the third image (index 2) since Builderman still has 3 images
  const isThirdImage = index === 2;
  if (isThirdImage && isBuildermanPage) {
    // If permanently changed (during glitch transition), show the correct Builderman image
    if (isPermanentlyChanged) {
      console.log("Using correct Builderman image for glitch transition");
      return "/lovable-uploads/969b5b20-4df6-4349-b7d8-18858e224a17.png";
    }
    // If being hovered, show the alternate image
    if (hoveredIndex === 2) {
      console.log("Using alternate image for Builderman third image hover");
      return "/lovable-uploads/96638239-e76e-4002-8330-b294786d568c.png";
    }
  }
  
  console.log(`Using original image: ${item.url}`);
  return item.url;
};

export const getCharacterDisplayImage = (entry: { imageUrl?: string; carouselImages?: { url: string; caption: string; }[] }): string => {
  // Prioritize the first carousel image if available, otherwise fall back to imageUrl
  if (entry.carouselImages && entry.carouselImages.length > 0) {
    return entry.carouselImages[0].url;
  }
  return entry.imageUrl || '';
};
