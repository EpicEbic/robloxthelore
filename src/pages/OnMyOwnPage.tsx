import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const OnMyOwnPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group content into paragraphs (3 pages)
  const paragraphs = [
    [
      "For most of The Lore's existence, it has been an independent project, created by me alone. I don't dislike this fact; tackling such a large challenge by myself has been fun. It has served as a means to improve and expand on my skills as a creator, especially as a writer. But I believe such a situation is a double-edged blade, as it comes with complications in and of itself.",
      "One of these major complications comes in the form of perspective. Working on The Lore, I have essentially no way to see things differently or look at it from an outsider's perspective. I need to trust my own judgment, which can be hard. Even if I am confident in my work, it can be nerve-wracking to push changes or 'finalize' anything, because there'll always be that small chance that what I made simply isn't up to quality down the line. I've had cases where I'm confident in something one day, and then a few weeks or months later, I've suddenly found it to be outdated or lacking compared to the newer content that came later.",
      "It can be difficult to gather feedback sometimes, because most people aren't willing to commit to an in-depth analysis of The Lore as a whole. I don't blame them for it or anything; it is a lot to take in at once, and may be time consuming. I'm mindful that it may also not be of interest to others; I know that sometimes, things just won't be up to their interests. But even so, that doesn't solve my problem. Perspectives other than my own are rare to come by, and without them I feel a bit left in the dark."
    ],
    [
      "It isn't just perspectives that I value, though. Sometimes, I start to doubt myself or lose motivation as time goes on. I love The Lore, but it is a daunting task filled with uncertain decisions and complexity that often feels beyond me. I'm not saying I require or depend on praise or interaction, but I'd be lying if I said it did not play a large factor in my drive to work on this project as much as I do. Simply put: It's nice to have support from others; it gives me the security and peace of mind to keep going.",
      "I wish I could say that I had a large crowd or a big group of friends who are super interested in what I create, but I feel like I might be asking or expecting too much. Besides, I shouldn't expect others to automatically love or interact with my creations, just because they're made by me. I need to produce something captivating, something that draws their attention because it itself is fascinating. I hope that someday I can achieve exactly this."
    ],
    [
      "I won't depend on others; it simply won't get me anywhere. I'll do The Lore, and even if I am the only one who loves it in the end, at least that'd be more than zero! But I'll still strive to do the best I can, as at the time of writing, there is still much, MUCH to do!",
      "So thank you, reader—for sticking around, and hearing what I have to say in these silly little side notes. Take care!",
      "- EpicEbic"
    ]
  ];

  const handleNext = () => {
    if (currentIndex < paragraphs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="diary-page">
      <div className="diary-paper">
        <div className="diary-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ gridColumn: '2' }}
            >
              {paragraphs[currentIndex].map((paragraph, idx) => (
                <div key={idx} className="diary-paragraph">
                  {paragraph}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="diary-navigation">
        {currentIndex > 0 && (
          <button onClick={handleBack} className="diary-button">
            Back
          </button>
        )}
        <button onClick={handleHome} className="diary-button">
          Home
        </button>
        {currentIndex < paragraphs.length - 1 && (
          <button onClick={handleNext} className="diary-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default OnMyOwnPage;

