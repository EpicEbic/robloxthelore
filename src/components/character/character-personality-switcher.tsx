import { PillSwitcher } from "@/components/ui/pill-switcher";
import { PersonalityOption } from "@/types/wiki-types";

interface CharacterPersonalitySwitcherProps {
  personalities: PersonalityOption[];
  currentPersonality: string;
  onPersonalityChange: (personalityId: string) => void;
}

export function CharacterPersonalitySwitcher({
  personalities,
  currentPersonality,
  onPersonalityChange
}: CharacterPersonalitySwitcherProps) {
  // Don't render if there's only one personality
  if (personalities.length <= 1) {
    return null;
  }

  const options = personalities.map(p => ({
    id: p.id,
    label: p.label
  }));

  return (
    <PillSwitcher
      options={options}
      value={currentPersonality}
      onChange={onPersonalityChange}
      size="sm"
    />
  );
}
