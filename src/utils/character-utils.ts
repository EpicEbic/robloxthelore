
import { WikiEntry } from "@/contexts/wiki-context";

export interface AppearanceOption {
  id: string;
  label: string;
  description: string | string[];
  images?: {
    url: string;
    caption: string;
  }[];
}

export const getCharacterData = (character: WikiEntry) => {
  const baseData = {
    id: character.id,
    name: character.title,
    species: character.species || "Robloxian",
    age: character.age || "Unknown",
    height: character.height || undefined,
    status: character.status || undefined,
    alignment: character.alignment || "Unknown",
    role: character.role,
    archetype: character.archetype,
    quote: character.quote || { text: "", context: "" },
    carousel: character.carouselImages || [],
    sections: character.sections || {
      appearance: "",
      personality: [],
      lifestyle: [],
      relationships: [],
      combat: [],
      abilities: [],
      trivia: []
    }
  };

  // Process appearances - handle both string and array formats
  let appearances: AppearanceOption[] = [];
  if (character.sections?.appearance) {
    if (typeof character.sections.appearance === 'string') {
      // Single appearance
      appearances = [{
        id: 'default',
        label: 'Default',
        description: character.sections.appearance
      }];
    } else if (Array.isArray(character.sections.appearance)) {
      // Multiple appearances
      appearances = character.sections.appearance;
    }
  }

  // Only use fallback carousel logic if no carousel images AND no appearances with images
  if (baseData.carousel.length === 0 && appearances.length === 0 && character.imageUrl) {
    baseData.carousel = [{
      url: character.imageUrl,
      caption: `${character.title} character portrait`
    }];
  }

  return {
    ...baseData,
    appearances
  };
};

export const getAlignmentColor = (align: string) => {
  if (align === 'Good' || align === 'Lawful') return 'bg-green-600';
  if (align === 'Neutral' || align === 'True Neutral') return 'bg-gray-600';
  return 'bg-red-600';
};

export const getImagesForAppearance = (appearances: AppearanceOption[], currentAppearance: string, fallbackImages: { url: string; caption: string }[]) => {
  console.log('Getting images for appearance:', currentAppearance);
  console.log('Available appearances:', appearances);
  
  let selectedAppearance = appearances.find(app => app.id === currentAppearance);
  
  // If the requested appearance doesn't exist, use the first available appearance
  if (!selectedAppearance && appearances.length > 0) {
    console.log('Requested appearance not found, using first available appearance');
    selectedAppearance = appearances[0];
  }
  
  console.log('Selected appearance:', selectedAppearance);
  
  // If the selected appearance has specific images, use those
  if (selectedAppearance?.images && selectedAppearance.images.length > 0) {
    console.log('Using appearance-specific images:', selectedAppearance.images);
    return selectedAppearance.images;
  }
  
  console.log('Using fallback images:', fallbackImages);
  // Otherwise, use fallback images (should be empty for multi-appearance characters)
  return fallbackImages;
};
