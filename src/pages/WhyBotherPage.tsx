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
    "I know it's done with good intentions, to make me feel more like my work matters.",
    "But I find it to be disheartening.",
    "In reality, I failed to capture a story that invoke emotion within others through my storytelling.",
    "I know that is not entirely the case, I'm sure part of it may be that the topics and plot simply isn't their cup of tea-- I can respect that.",
    "Not every topic will be loved by everyone, I've known this from the get-go and it is very important to consider.",
    "I feel like I'm not capable of create something meaningful.",
    "Perhaps I am not capable of creating at all?",
    "But I can't worry about these kinds of feelings, they will only hold me back.",
    "I must look at the situation with blind eyes, for my own conscience.",
    "I must keep pushing forward.",
    "Though I will say, I don't solely depend on the validation of others.",
    "If this project were entirely based on a 'hey, look at this, look at what I've made!' mindset then it would've been flawed from the start.",
    "I find lots of joy in creating, I have grown attached to my characters and the world I am making.",
    "I will keep on keeping on, simply because of how fun it truly is.",
    "I don't do this for others in the end, I do it for me.",
    "I think in truth, I just wish I could feel like others appreciate the project for what it is, rather than only because it is made by me.",
    "I appreciate that I have good friends in the first place though, I can't imagine how sad it would be not to have any friends at all, or friends that truly didn't care.",
    "Anyways, a rant like this probably isn't befitting for this series' wiki page, but I don't care to rant directly to others about it either.",
    "I've hid this entire speech behind an easter egg that almost nobody will see.",
    "I believe that was the right choice, I want it out of the way and inaccessible without deliberately seeking it.",
    "It is tucked away nicely, my own thoughts and feelings on the matter.",
    "I'm sorry if you went through this expecting some hidden lore or content, this truly just was my own personal reflection on this series.",
    "I love it dearly, and progress will continue so long as that remains possible.",
    "It truly has been so fun to work on, and I'm sure that won't be changing anytime soon.",
    "Enjoy your stay.",
    "- Sincerely, EpicEbic"
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

