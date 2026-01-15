import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const OldFriendPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dialogues = [
    "Maybe you knew this, maybe you didn't.",
    "I wasn't always the only person working on this series.",
    "In fact, it was being co-produced with an old friend of mine, for the longest time.",
    "The Lore actually began as a personal joke between the two of us, sprouting randomly one day while we were playing a game together.",
    "We jokingly gave our avatars lore, and turned them into simple characters.",
    "It was just a silly joke at first, but we quickly realized how fun it was to write about our silly avatar lore, and we began to get attached to the characters and world we'd made.",
    "Eventually, this would culminate into what would become 'The Lore'.",
    "Back then, the story and the characters were a LOT different than they were now, some didn't exist yet and some don't exist anymore.",
    "But to summarize, it followed two protagonists: Caesar and Liam.",
    "Two allies in a very chaotic world, combining their strengths to make a difference while making plenty of friends along the way.",
    "It was simple, but it was nice to work alongside my friend on something we both had passion for.",
    "But of course, not all good things can last forever, as upsetting as that reality is.",
    "My friend, the one responsible for Liam (and half of The Lore), did something which hurt me very personally.",
    "He did something that took a long time to recover from emotionally.",
    "Naturally, our friendship ended after I was ready to cut things off.",
    "But I didn't want to give up on The Lore, even if that meant I had a huge job ahead of me.",
    "But I didn't care.",
    "I took the lore for myself, and over a few months it was scrubbed clean of anything that I didn't make.",
    "It took some time, and lots of rewriting, but eventually I'd done it.",
    "Caesar was free of Liam.",
    "I'm glad I had the strength to do what needed to be done, even if I still get upset at the whole situation from time to time.",
    "But in the end, people will inevitably make poor choices",
    "I won't judge or criticize him though, not anymore.",
    "I have grown from that experience, we lead separate lives now.",
    "Though, that really got me thinking.",
    "Maybe a whole parallel The Lore exists, being worked on by him?",
    "The Lore, without anything you see here.",
    "His own works, separate from mine.",
    "I wonder if he cared enough about what we had made together, to the point he'd do what I've done?",
    "Truthfully, I don't care to know the answer.",
    "This is my series, and I wouldn't have it any other way.",
    "But a small part of me hopes that he knows how much I valued our friendship, or that I continue to value the series built on a foundation made by the both of us.",
    "A small part of me hopes that even maybe...",
    "He'll see this, too?",
    "But ultimately, what he does won't matter to me.",
    "Years have passed, The Lore is mine, and I'm eager to work on this series for as long as I can.",
    "There are many stories I'd love to tell, through Caesar, the other characters and this wonderful world.",
    "So, to the strangers who spent time reading through this little reflection, thank you for sparing a moment to listen.",
    "But to the man of the hour, if you ever see this; I truly do wish you the best.",
    "Even if you hurt me as much as you did, know that I'd never wish that on you.",
    "Part of me wishes you could've been here with me today, as passionate about The Lore as I was since the day it was made.",
    "But we've moved on in our own way, and that's okay.",
    "Thank you for your time, stranger.",
    "Please enjoy your stay.",
    "-Sincerely, EpicEbic."
  ];

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Return to homepage when reaching the end
      navigate("/");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
              {dialogues[currentIndex]}
            </p>
            <Button
              onClick={handleNext}
              variant="outline"
              className="mt-4"
            >
              {currentIndex < dialogues.length - 1 ? "Continue" : "Return Home"}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OldFriendPage;


