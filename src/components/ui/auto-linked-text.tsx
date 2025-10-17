import { useNavigate } from "react-router-dom";
import { useWiki } from "@/contexts/wiki-context";
import { segmentTextWithLinks, TextSegment } from "@/utils/auto-link-utils";
import { cn } from "@/lib/utils";

interface AutoLinkedTextProps {
  text: string;
  currentEntryId?: string;
  className?: string;
  linkClassName?: string;
}

export function AutoLinkedText({ 
  text, 
  currentEntryId, 
  className,
  linkClassName 
}: AutoLinkedTextProps) {
  const { entries } = useWiki();
  const navigate = useNavigate();
  
  const handleLinkClick = (entryId: string) => {
    navigate(`/entry/${entryId}`);
  };

  // Split text into paragraphs on double newlines
  const paragraphs = text.split('\n\n').filter(para => para.trim());

  // If there's only one paragraph, render as a span for backward compatibility
  if (paragraphs.length === 1) {
    const segments = segmentTextWithLinks(text, entries, currentEntryId);
    
    return (
      <span className={className}>
        {segments.map((segment: TextSegment, index: number) => 
          segment.isLink ? (
            <button
              key={index}
              onClick={() => handleLinkClick(segment.entryId!)}
              className={cn(
                "text-primary hover:text-primary/80 underline underline-offset-2 cursor-pointer font-medium transition-colors",
                "hover:bg-primary/10 px-0.5 rounded-sm",
                linkClassName
              )}
            >
              {segment.text}
            </button>
          ) : (
            <span key={index}>{segment.text}</span>
          )
        )}
      </span>
    );
  }

  // Multiple paragraphs - render as separate paragraph elements
  return (
    <div className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const segments = segmentTextWithLinks(paragraph, entries, currentEntryId);
        
        return (
          <p key={paragraphIndex} className={paragraphIndex > 0 ? "mt-4" : ""}>
            {segments.map((segment: TextSegment, index: number) => 
              segment.isLink ? (
                <button
                  key={index}
                  onClick={() => handleLinkClick(segment.entryId!)}
                  className={cn(
                    "text-primary hover:text-primary/80 underline underline-offset-2 cursor-pointer font-medium transition-colors",
                    "hover:bg-primary/10 px-0.5 rounded-sm",
                    linkClassName
                  )}
                >
                  {segment.text}
                </button>
              ) : (
                <span key={index}>{segment.text}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}