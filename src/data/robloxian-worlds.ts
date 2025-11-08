export interface RobloxianWorld {
  id: string;
  name: string;
  thumbnail: string;
  segment: string;
  position: {
    angle: number; // in degrees, 0 = right, 90 = down, etc.
    distanceFromCenter: number; // 0-1, percentage within segment
  };
  description?: string;
  entryId?: string;
}

// World icon/thumbnail mapping
export const worldThumbnails: Record<string, string> = {
  "town-of-robloxia": "/lovable-uploads/world-icons/town-of-robloxia.png",
  "red-cliff": "/lovable-uploads/world-icons/red-cliff.png",
};

export const getWorldThumbnail = (worldId: string): string => {
  return worldThumbnails[worldId] || "/placeholder.svg";
};

export const ROBLOXIAN_WORLDS: RobloxianWorld[] = [
  // Worlds can be added here as needed
  // Example:
  // {
  //   id: "example-world",
  //   name: "Example World",
  //   thumbnail: "/lovable-uploads/world-icons/example-world.png",
  //   segment: "the-inner-circle",
  //   position: {
  //     angle: 30,
  //     distanceFromCenter: 0.6,
  //   },
  //   description: "An example Robloxian World.",
  // },
];

