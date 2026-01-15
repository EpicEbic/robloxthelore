import { PillSwitcher } from "@/components/ui/pill-switcher";
import { CombatStyleOption } from "@/types/wiki-types";

interface CharacterCombatStyleSwitcherProps {
  combatStyles: CombatStyleOption[];
  currentStyle: string;
  onStyleChange: (styleId: string) => void;
  align?: 'left' | 'right';
}

export function CharacterCombatStyleSwitcher({
  combatStyles,
  currentStyle,
  onStyleChange,
}: CharacterCombatStyleSwitcherProps) {
  // Don't render if there's only one style or none
  if (combatStyles.length <= 1) {
    return null;
  }

  const options = combatStyles.map(style => ({
    id: style.id,
    label: style.label
  }));

  return (
    <PillSwitcher
      options={options}
      value={currentStyle}
      onChange={onStyleChange}
      size="sm"
    />
  );
}
