import { WikiEntry } from "@/contexts/wiki-context";

// Centralized character icon mapping - used across multiple components
export const CHARACTER_ICONS: Record<string, string> = {
  "caesar-bloxwright": "/images/character-icons/caesar-bloxwright-icon.png",
  "nauli-parter": "/images/character-icons/nauli-parter-icon.png",
  "vortex-a-steele": "/images/character-icons/vortex-a-steele-icon.png",
  "rice-farmer": "/images/character-icons/rice-farmer-icon.png",
  "ren-bytera": "/images/character-icons/ren-bytera-icon.png",
  "bryck-manning": "/images/character-icons/bryck-manning-icon.png",
  "spawnboy": "/images/character-icons/spawnboy-icon.png",
  "builderman": "/images/character-icons/builderman-icon.png",
  "bloxxanne-whelder": "/images/character-icons/bloxxanne-whelder-icon.png",
  "charles-studson": "/images/character-icons/charles-studson-icon.png",
  "the-reckoner": "/images/character-icons/the-reckoner-icon.png",
  "the-breadwinner": "/images/character-icons/the-breadwinner-icon.png",
  "the-bounceman": "/images/character-icons/bounceman-icon.png",
  "rovan-macov": "/images/rovanicon.png",
  "peaches": "/images/character-icons/peaches-icon.png",
  "whyeet": "/images/character-icons/whyeet-icon.png",
};

export const getCharacterIcon = (characterId: string, fallback: string = "/placeholder.svg"): string => {
  return CHARACTER_ICONS[characterId] || fallback;
};

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
  let selectedAppearance = appearances.find(app => app.id === currentAppearance);
  
  // If the requested appearance doesn't exist, use the first available appearance
  if (!selectedAppearance && appearances.length > 0) {
    selectedAppearance = appearances[0];
  }
  
  // If the selected appearance has specific images, use those
  if (selectedAppearance?.images && selectedAppearance.images.length > 0) {
    return selectedAppearance.images;
  }
  
  // Otherwise, use fallback images (should be empty for multi-appearance characters)
  return fallbackImages;
};
