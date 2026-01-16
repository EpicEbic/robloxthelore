import { EntryDropdown } from "@/components/ui/entry-dropdown";
import { DevelopmentOption } from "@/types/wiki-types";

interface CharacterDevelopmentSwitcherProps {
  developments: DevelopmentOption[];
  currentDevelopment: string;
  onDevelopmentChange: (developmentId: string) => void;
}

export function CharacterDevelopmentSwitcher({
  developments,
  currentDevelopment,
  onDevelopmentChange
}: CharacterDevelopmentSwitcherProps) {
  // Don't render if there's only one development option
  if (developments.length <= 1) {
    return null;
  }

  const options = developments.map(dev => ({
    id: dev.id,
    label: dev.label
  }));

  return (
    <EntryDropdown
      options={options}
      value={currentDevelopment}
      onChange={onDevelopmentChange}
      placeholder="Select Episode"
    />
  );
}

