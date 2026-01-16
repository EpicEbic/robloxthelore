import { EntryDropdown } from "@/components/ui/entry-dropdown";
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
    <EntryDropdown
      options={options}
      value={currentHistory}
      onChange={onHistoryChange}
      placeholder="Select Event"
    />
  );
}
