import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WhyBotherPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dialogues = [
    "Why is it that I bother with this project? Ultimately, what is the point?",
    "It is destined for failure. I can write and make simple images, but I am limited by my own laziness and lack of knowledge.",
    "I do not have money. I do not have a means to fund this passion project.",
    "That is all this is: a passion project. Nothing more, and it never will be.",
    "Even if I had the means to make it something more, why would it matter?",
    "Who is going to care? At times, it feels like my friends do it out of pity, just to satisfy me.",
    "Sometimes I need to pester them to look at it. I don't want to be a pest.",
    "I don't want them to bother with The Lore just 'to be nice' or something. I want to see genuine interest and a desire to see what comes next.",
    "If I don't spark that feeling within them, is it because they do not find the topics interesting? Or have I failed as a writer?",
    "I feel like it will all be pointless in the end.",
    "I'll never complete this series if I keep that mindset though, so I'm choosing to ignore those feelings.",
    "Those feelings that I'll never accomplish what I want to accomplish.",
    "Those feelings that I'll never tell the story I wish to tell.",
    "Those feelings that make me feel like I'm terrible at everything I do.",
    "I'm sorry."
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

export default WhyBotherPage;

