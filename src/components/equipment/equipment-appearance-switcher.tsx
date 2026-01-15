import { PillSwitcher } from "@/components/ui/pill-switcher";
import { EquipmentOverviewOption } from "@/types/wiki-types";

interface EquipmentAppearanceSwitcherProps {
  appearances: EquipmentOverviewOption[];
  currentAppearance: string;
  onAppearanceChange: (appearanceId: string) => void;
}

export function EquipmentAppearanceSwitcher({
  appearances,
  currentAppearance,
  onAppearanceChange
}: EquipmentAppearanceSwitcherProps) {
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
