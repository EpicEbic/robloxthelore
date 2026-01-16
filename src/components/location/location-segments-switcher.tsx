import { EntryDropdown } from "@/components/ui/entry-dropdown";

interface LocationSegmentsSwitcherProps {
  segments: string[];
  currentSegment: string;
  onSegmentChange: (segmentId: string) => void;
}

export function LocationSegmentsSwitcher({
  segments,
  currentSegment,
  onSegmentChange
}: LocationSegmentsSwitcherProps) {
  // Parse segments into structured data for the dropdown
  const segmentOptions = segments.map((segment, index) => {
    // Extract title from the segment text (everything before the first " - ")
    const titleMatch = segment.match(/^\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1] : `Segment ${index + 1}`;
    
    return {
      id: `segment-${index}`,
      label: title
    };
  });

  // Don't render if there's only one segment or no segments
  if (segmentOptions.length <= 1) {
    return null;
  }

  return (
    <EntryDropdown
      options={segmentOptions}
      value={currentSegment}
      onChange={onSegmentChange}
      placeholder="Select Segment"
    />
  );
}
