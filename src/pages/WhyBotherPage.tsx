import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WhyBotherPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dialogues = [
    "Why is it that I bother with this project?",
    "What would ultimately be the point of it all?",
    "This project feels destined for failure at the end of it all, I don't have the skills to tell the story I wish to tell.",
    "I cannot animate, I cannot draw, I cannot model, I cannot script.",
    "I know I could just 'learn the skills', and that a few years would be all I need.",
    "But I'm not the type of person to easily commit, the tasks seem daunting and I can't bring myself to do it.",
    "Even if I did bother, who would care about this project in the end?",
    "The only people I can reliably gather feedback from is my friends.",
    "...but they don't seem to care for it too much.",
    "It feels like they stay involved out of pity, or simply because they feel obligated to as my friend.",
    "I don't blame them for trying to be nice, it's a nice thing to do.",
    "But it makes me feel like I have failed as a creator, that I have failed to create something meaningfully interesting.",
    "I want them to pay attention because they've come to value the story and the characters, just as much as I have.",
    "That they want to see what happens next in this crazy, crazy world.",
    "But I don't think I've captured that feeling with anybody yet, nobody truly wants to see what happens next.",
    "They interact with my series out of pity, not out of interest.",
    "I know it's done with good intentions, but it makes me feel really upset.",
    "It is disheartening.",
    "But I suppose that is my fault, as a writer.",
    "I have, so far, failed to capture a story that invoke feelings of interest within others.",
    "Perhaps that is not entirely the case, I'm sure part of it may be that the topics and plot simply isn't their cup of tea-- I can respect that.",
    "But when that happens to all of my friends...?",
    "I don't know, I feel like I've failed.",
    "I feel like I'm not going to create something meaningful.",
    "I feel like I am incapable of creating.",
    "But I can't worry about these kinds of feelings, they will only hold me back.",
    "I must look at the situation with blind eyes.",
    "I must keep pushing forward.",
    "This rant probably isn't befitting for a place like this, but I don't want to vent directly.",
    "I hid it away with this secret command, so it can still be found, but it remains out of the way.",
    "I'm sorry for wasting your time or bringing you down, please forgive me.",
    "Enjoy your stay."
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

