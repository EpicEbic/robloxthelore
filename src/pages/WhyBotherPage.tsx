import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WhyBotherPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dialogues = [
    "Why is it that I bother working on this project?",
    "What would ultimately be the point in the end?",
    "It sometimes feels as though this project is destined for failure.",
    "I don't have the skills necessary to tell the story I envision.",
    "I cannot animate, I cannot draw, I cannot model, I cannot script.",
    "I can write, but it feels lacklustre at times.",
    "I know what most people will say, though.",
    " \"Just learn the skills, silly!\" ",
    " \"It'd only take a few years!\" ",
    "I know, that is true.",
    "But I'm not a man of strong conviction, I find it hard to dedicate myself to these kinds of things.",
    "I respect such hard work, the things people create can be so beautiful.",
    "It is much more than writing on a screen, they bring visions to life.",
    "I both envy and admire that capability.",
    "But I can't help but doubt myself.",
    "Even if I did bother to learn any of the necessary skills, who would truly care about this project in the end?",
    "Am I conveying a story that'll captivate and draw people in?",
    "Will people care-- and perhaps even await eagerly-- to know what happens next?",
    "The only people I can truly gather feedback from are my friends.",
    "...but sometimes, it feels like they don't really like The Lore.",
    "I get the feeling they stay involved with my work out of pity, or obligation as my friend.",
    "I don't blame them for trying to be nice, taking their time to read and view what I've done is very kind of them.",
    "But it makes me feel as though I have failed as a creator.",
    "It makes me feel as though I have failed to create something captivating.",
    "I don't want them to bother with what I've made out of pity or obligation.",
    "I want them to come back for more, because they've come to value the story and characters as much as I have.",
    "I want them to excitedly wait and see what happens next in this vast world.",
    "But I don't think I've managed to capture that feeling with anybody, yet.",
    "I don't think anybody truly cares to see what happens next.",
    "It is done to satisfy me.",
    "...but please, know that I do not dislike them for it.",
    "I know they do it with good intentions, to make me feel like my work matters.",
    "But all it does is dishearten me.",
    "It seems as though I have failed to capture a story that invokes raw emotion within others.",
    "But, I mustn't beat myself up completely.",
    "I know that is not entirely the case.",
    "Part of it may be that the topics, plot, and themes aren't their cup of tea-- I can respect that.",
    "Not every subject will appeal or be loved by everyone, and that's okay.",
    "I've known this from the get-go, and it is very important to consider.",
    "I suppose that it just feels as though I am incapable of creating.",
    "Perhaps I am not capable of creating at all?",
    "I doubt it, I've already come this far.",
    "I can't worry about these petty feelings, either.",
    "They'll only hold me back in the grand scheme of things.",
    "I must look at the situation with blind eyes and deaf ears, for my own conscience.",
    "I must keep pushing forward.",
    "Though, I will say...",
    "I don't solely depend on the validation of others.",
    "This project would've been flawed from the start if it was based on a \"Hey, look at this, look at what I've made!\" mindset.",
    "I truly do find lots of joy in creating, I have grown attached to my characters and the world I'm making.",
    "I will keep on keeping on, just because of how fun it truly is.",
    "I don't do this for others, I do it for me.",
    "In truth, I just wish I could feel like others appreciate the project for what it is, rather than only because it is made by me.",
    "But I know that I'm probably just overthinking things.",
    "Honestly, I'm just grateful to have good friends in the first place, friends who'd put time aside for me at all.",
    "I can't imagine how sad it'd be to have friends that truly didn't care to spend even a few minutes.",
    "Anyways, a rant like this probably isn't befitting for this kind of website.",
    "This IS a wiki, after all.",
    "But I didn't want to directly rant to anybody either, which is why I shoved it here.",
    "I made sure to bury it fairly deep, this entire speech is hidden behind an easter egg that almost nobody will see.",
    "I believe that was the best choice, I want this to be out of the way and inaccessible unless deliberately sought out.",
    "Tucked away, my own thoughts and feelings.",
    "I'm sorry if you went through this expecting some hidden lore, or some other content.",
    "This really was just my own personal reflection on myself and The Lore.",
    "I love it dearly, progress will continue as long as that remains possible.",
    "It truly has been so fun to work on, and I doubt that'll change anytime soon.",
    "I'll let you get back to browsing, so please...",
    "Enjoy your stay.",
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

export default WhyBotherPage;

