import { PillSwitcher } from "@/components/ui/pill-switcher";
import { EquipmentTimelineOption } from "@/types/wiki-types";

interface EquipmentTimelineSwitcherProps {
  timelines: EquipmentTimelineOption[];
  currentTimeline: string;
  onTimelineChange: (timelineId: string) => void;
}

export function EquipmentTimelineSwitcher({
  timelines,
  currentTimeline,
  onTimelineChange
}: EquipmentTimelineSwitcherProps) {
  // Don't render if there's only one timeline
  if (timelines.length <= 1) {
    return null;
  }

  const options = timelines.map(t => ({
    id: t.id,
    label: t.label
  }));

  return (
    <PillSwitcher
      options={options}
      value={currentTimeline}
      onChange={onTimelineChange}
      size="sm"
    />
  );
}
