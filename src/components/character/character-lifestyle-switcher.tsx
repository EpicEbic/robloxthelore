import { PillSwitcher } from "@/components/ui/pill-switcher";
import { LifestyleOption } from "@/types/wiki-types";

interface CharacterLifestyleSwitcherProps {
  lifestyles: LifestyleOption[];
  currentLifestyle: string;
  onLifestyleChange: (lifestyleId: string) => void;
}

export function CharacterLifestyleSwitcher({
  lifestyles,
  currentLifestyle,
  onLifestyleChange
}: CharacterLifestyleSwitcherProps) {
  // Don't render if there's only one lifestyle or none
  if (lifestyles.length <= 1) {
    return null;
  }

  const options = lifestyles.map(lifestyle => ({
    id: lifestyle.id,
    label: lifestyle.label
  }));

  return (
    <PillSwitcher
      options={options}
      value={currentLifestyle}
      onChange={onLifestyleChange}
      size="sm"
    />
  );
}
