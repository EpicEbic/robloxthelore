import { useMemo } from "react";
import { whatsNewEntries } from "@/data/whats-new";
import { TimelineItem } from "@/components/timeline-item";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsNewPage = () => {
  const sortedWhatsNewEntries = useMemo(() => {
    return [...whatsNewEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">What's New</h1>
        <p className="text-muted-foreground mt-2">A complete history of all updates.</p>
      </div>
      <div className="relative max-w-3xl mx-auto">
        {sortedWhatsNewEntries.map((item, index) => (
          <TimelineItem 
            key={item.id}
            item={item}
            isLast={index === sortedWhatsNewEntries.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatsNewPage;
