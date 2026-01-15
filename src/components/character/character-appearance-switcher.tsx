import { PillSwitcher } from "@/components/ui/pill-switcher";

interface AppearanceOption {
  id: string;
  label: string;
  description: string | string[];
}

interface CharacterAppearanceSwitcherProps {
  appearances: AppearanceOption[];
  currentAppearance: string;
  onAppearanceChange: (appearanceId: string) => void;
}

export function CharacterAppearanceSwitcher({
  appearances,
  currentAppearance,
  onAppearanceChange
}: CharacterAppearanceSwitcherProps) {
  // Don't render if there's only one appearance
  if (appearances.length <= 1) {
    return null;
  }

  const options = appearances.map(app => ({
    id: app.id,
    label: app.label
  }));

  return (
    <PillSwitcher
      options={options}
      value={currentAppearance}
      onChange={onAppearanceChange}
      size="sm"
    />
  );
}
