import { PillSwitcher } from "@/components/ui/pill-switcher";
import { HistoryOption } from "@/types/wiki-types";

interface CharacterHistorySwitcherProps {
  histories: HistoryOption[];
  currentHistory: string;
  onHistoryChange: (historyId: string) => void;
}

export function CharacterHistorySwitcher({
  histories,
  currentHistory,
  onHistoryChange
}: CharacterHistorySwitcherProps) {
  // Don't render if there's only one history
  if (histories.length <= 1) {
    return null;
  }

  const options = histories.map(h => ({
    id: h.id,
    label: h.label
  }));

  return (
    <PillSwitcher
      options={options}
      value={currentHistory}
      onChange={onHistoryChange}
      size="sm"
    />
  );
}
