import { useEffect } from 'react';
import { sampleWikiEntries } from '@/data/sample-wiki-entries';
import { fusionEntries } from '@/data/fusion-entries';

export const useFusionImagePreloader = () => {
  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      });
    };

    const getAllImageUrls = (): string[] => {
      const imageUrls: string[] = [];
      
      // Get all character images
      const characters = sampleWikiEntries.filter(entry => entry.category === "character");
      characters.forEach(character => {
        // Add main image
        if (character.imageUrl) {
          imageUrls.push(character.imageUrl);
        }
        
        // Add carousel images
        if (character.carouselImages) {
          character.carouselImages.forEach(img => {
            imageUrls.push(img.url);
          });
        }
      });
      
      // Get all fusion result images
      fusionEntries.forEach(fusion => {
        if (fusion.fusion.images) {
          fusion.fusion.images.forEach(imageUrl => {
            imageUrls.push(imageUrl);
          });
        }
      });
      
      // Remove duplicates
      return [...new Set(imageUrls)];
    };

    const preloadAllImages = async () => {
      const imageUrls = getAllImageUrls();
      console.log(`Preloading ${imageUrls.length} fusion page images...`);
      
      try {
        await Promise.allSettled(
          imageUrls.map(url => preloadImage(url))
        );
        console.log('Fusion page images preloaded successfully');
      } catch (error) {
        console.warn('Some fusion page images failed to preload:', error);
      }
    };

    preloadAllImages();
  }, []);
};