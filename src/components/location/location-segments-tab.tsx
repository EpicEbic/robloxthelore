
import { Card, CardContent } from "@/components/ui/card";
import { LocationSegmentsSwitcher } from "./location-segments-switcher";

interface LocationSegmentsTabProps {
  segments: string[];
  currentSegment: string;
  onSegmentChange: (segment: string) => void;
}

export function LocationSegmentsTab({ 
  segments, 
  currentSegment, 
  onSegmentChange 
}: LocationSegmentsTabProps) {
  // Parse segments into structured data for display
  const segmentOptions = segments.map((segment, index) => {
    const titleMatch = segment.match(/^\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1] : `Segment ${index + 1}`;
    
    return {
      id: `segment-${index}`,
      title,
      description: segment
    };
  });

  const currentSegmentData = segmentOptions.find(seg => seg.id === currentSegment) || segmentOptions[0];

  // Check if current segment is The Null Zone for applying static effect
  const isNullZone = currentSegmentData?.title === "The Null Zone";

  // Custom paragraph splitting logic for specific segments
  const formatSegmentContent = (content: string, title: string) => {
    // Remove the title prefix
    const cleanContent = content.replace(/^\*\*(.+?)\*\* - /, '');
    
    // Define custom splits for specific segments
    const customSplits: { [key: string]: string[] } = {
      "Center": [
        "The center of the Bloxiverse is occupied mostly by the Heart, a celestial mass created by Roblox to fuel the Bloxiverse for an eternity, even in Roblox's own absence. Naturally, it is the smallest segment of the Bloxiverse, and is tightly packed as a result. Prominent and well-recognized Robloxian Worlds also exist within this space, such as the Town of Robloxia, and the Red Cliff.",
        "The center is widely considered to be the safest and most civilized quadrant of the Bloxiverse. It is bustling with a large community, and is heavily protected by a variety of different factions and orders, especially due to the presence of the Heart. For most Bloxians, the center is the safest (and most optimal) place to live."
      ],
      "The Inner Ring": [
        "The inner ring is a medium-sized segment of the Bloxiverse which surrounds the center. It is populated by a vast number of Bloxians, finding solace and safety due to the allied factions that live relatively close by. It may not be as protected or secure as the center, but it is a common next-best choice for many standard civilians.",
        "Despite the general security of the inner ring, it is not without hardships or strife. Evil-doers can occasionally make their way into the inner ring, though almost none reach (or breach) the center without serious power or numbers to back them up."
      ],
      "The Interim": [
        "The interim is a large plane of empty space, existing roughly at the middle point of the Bloxiverse. It is mostly desolate, serving more as a boundary which separates the inner ring from the outer ring. It is mostly desolate, proving to be too remote and unideal for the common Bloxian to live within.",
        "The interim marks a dangerous turning point, as those with less-pure intentions often linger within the interim, especially towards the outer ring. It serves as a natural filter, dividing civilized Bloxians with pure intentions from cruel and barbaric ones."
      ],
      "The Outer Ring": [
        "The outer ring lies just beyond the interim, marking the beginning of a 'danger zone' within the Bloxiverse. Far from the Heart or any civilized forces and allies, outcasts and shady figures start to become commonplace. The outer ring is no place for a civilian or those without a means to defend themselves, as they'll be quick to be mugged, captured, or worse...",
        "Traveling farther beyond the Outer Ring is ill-advised, as those who pass beyond it enter a dangerous territory known as the Banlands."
      ],
      "The Banlands": [
        "Far beyond the reaches of the outer ring lies the forsaken Banlands, a myth among Bloxians. It is believed to house some of the most despicable and horrific criminals, cast far, far away to be forgotten and left to rot for their heinous crimes. Death would have been too kind for them, after all.",
        "No factual documents of the Banlands have ever been created by a Bloxian, as those who have tried to reach and research it have never returned. To most, it exists as nothing more than a whisper, a campfire story to scare your friends."
      ],
      "The Void": [
        "As you travel farther out and pass the Banlands, you'll find yourself in the void. A desolate, black space containing no matter whatsoever. No life can thrive here, as a Robloxian's connection to the Heart grows thin when traveling this far away. This weak connection prevents a Robloxian's ability to establish a Robloxian World.",
        "No natural light or resources exist this far out into the Bloxiverse, making survival and travel almost impossible without careful planning and the necessary tools. The lack of necessary resources prevents any groups, regardless of their wealth and/or numbers, from establishing any base of operations.",
        "While it may seem as though the Void stretches infinitely outward, it does not. It is advised that, under no circumstances, do you proceed forward beyond the Void. Should you disregard this warning and try, may Roblox save your soul."
      ],
      "Void: The Null Zone": [
        "As you venture deeper into the Void, you'll start to notice mysterious symptoms as you continue towards the Null Zone, a point of no return.",
        "At first, these symptoms are negligible and may go unnoticed. The movement of objects and Bloxians may begin to shake or stutter. Feelings of lightheadedness appear, as one will begin to lose their sense of direction. Some Bloxians may report feeling loose, or weak. Despite these effects, they won't cause any physical harm beyond mild discomfort, at least not early on.",
        "Proceeding closer to the Null Zone, these symptoms intensify as reality begins to destabilize; this is due to a weak connection with the Heart. By this point, matter has begun to warp and unravel slightly as it continues to jitter, which can quickly become harmful to organic life. These effects only continue to worsen as an individual presses onward.",
        "Having reached the boundary of the Null Zone, the laws of reality and the orders of natural law begin to completely fail. Matter decays, ruptures, warps, and distorts as reality itself has begun to fold in on itself. Matter this far has no tethered connection to the Heart, whatsoever. Organic life will almost instantly perish without some anomalous means of protecting themselves, as no natural armor or technology can stave off such unfathomable effects, let alone a severance from the Heart.",
        "Just beyond this space lies the boundary separating the Void from the Null Zone. Do not cross the boundary. DO NOT CROSS THE BOUNDARY."
      ],
      "The Null Zone": [
        "NULL // NULL // NULL : ENTRY DOES NOT EXIST. ENTRY CANNOT EXIST. ABORT PROCESS."
      ]
    };

    // Use custom splits if available, otherwise fall back to default logic
    if (customSplits[title]) {
      return customSplits[title];
    }

    // Fallback: split by periods followed by space and capital letter
    const sentences = cleanContent.split(/\. (?=[A-Z])/);
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const paragraph = sentences.slice(i, i + 2).join('. ');
      if (paragraph.trim()) {
        paragraphs.push(paragraph + (paragraph.endsWith('.') ? '' : '.'));
      }
    }
    return paragraphs;
  };

  return (
    <Card>
      <CardContent className="prose dark:prose-invert max-w-none pt-6">
        {currentSegmentData && (
          <div className="leading-relaxed space-y-4">
            {/* Header with title and dropdown switcher */}
            <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
              <h2 className="text-3xl font-bold text-foreground force-text-wrap">
                {currentSegmentData.title}
              </h2>
              <div className="ml-4 flex-shrink-0">
                <LocationSegmentsSwitcher
                  segments={segments}
                  currentSegment={currentSegment}
                  onSegmentChange={onSegmentChange}
                />
              </div>
            </div>
            
            {/* Display the formatted content paragraphs - constant static effect for The Null Zone */}
            {formatSegmentContent(currentSegmentData.description, currentSegmentData.title).map((paragraph, index) => (
              <p key={index} className={`mb-4 leading-relaxed text-base force-text-wrap ${isNullZone ? 'tv-static-text text-red-300' : 'text-foreground'}`}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
