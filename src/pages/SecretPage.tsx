import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SecretPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const [audioPlaying, setAudioPlaying] = useState(false);

  const playAudio = async () => {
    if (audioRef.current && !audioPlaying) {
      try {
        await audioRef.current.play();
        setAudioPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  useEffect(() => {
    // Try to play audio immediately, but handle autoplay restrictions
    playAudio();
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background"
      onClick={playAudio}
    >
      <div className="animate-fade-in text-center">
        <img 
          src="/lovable-uploads/0ecb1ebe-8b67-49a6-8f09-0c694eeb6bba.png" 
          alt="Secret image" 
          className="max-w-md max-h-[80vh] object-contain mx-auto"
        />
        {!audioPlaying && (
          <p className="text-muted-foreground text-sm mt-4 mb-2">
            Click anywhere to start the experience...
          </p>
        )}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
          variant="destructive"
          className="mt-6 animate-pulse"
        >
          I can't take it anymore, get me out of here
        </Button>
        <audio
          ref={audioRef}
          src="/worst-rap-beat.mp3"
          loop
          preload="auto"
          className="hidden"
          onPlay={() => setAudioPlaying(true)}
          onError={(e) => console.error("Audio error:", e)}
        />
      </div>
    </div>
  );
};

export default SecretPage;