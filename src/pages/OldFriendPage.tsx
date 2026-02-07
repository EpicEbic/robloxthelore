import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const OldFriendPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group dialogues into paragraphs (4 pages)
  const paragraphs = [
    [
      "Maybe you knew this already, or maybe you didn't. The truth is, I wasn't always the only person working on The Lore, nor am I technically the absolute original creator-- let me explain.",
      "The Lore originally began as an inside joke, kept up between me and an old friend of mine. We jokingly gave our Roblox avatars a bit of simplistic lore, just for fun and to personify them because we could. It initially didn't mean much, but as time went on, things began to pile and the stories of our avatars grew to be quite large. We slowly realized that what we were making actually seemed pretty cool as a concept, and that would later pave the way to the creation of The Lore, a Roblox webcomic taking place in-universe. It was made and managed by just us two.",
      "It was nice, working alongside him. It was nice to have someone I could throw ideas at, and get some of their own ideas back. It was a fun process, filling a Trello page with new entries. It was satisfying to see new content, and to see what each other had added. I know it was silly, but admittedly, it was still a lot of fun overall. I still look back fondly at the flow we had between one another."
    ],
    [
      "Sadly, all good things come to an end eventually. I don't want to discuss my personal life in too much detail, but the premise is simple: My friend went on to do something that shattered my bond and trust with him, and I was betrayed. That alone was a bit of a spiral for me, but one of the issues that eventually came to mind was, naturally, The Lore. We both had an equal hand in its creation, and at first it didn't feel right to work on it without him.",
      "But after time passed and I began to heal from the incident, I came to notice that he wasn't really contributing that much to the project, at least compared to me. I started to realize that I simply valued it more than he did, that I wanted The Lore to be something more while he did not. This (paired with his betrayal) eventually culminated in the tough decision to take my own writing and separate it from his. The Lore was officially divided, as were my ties to him. Caesar and I were free.",
      "From then on until now, The Lore has only been worked on by me and me alone. All the writing, all the images. At times, working on The Lore has felt lonely, but stressing my skillset to expand my knowledge and improve my work has been healthy, too."
    ],
    [
      "I still look back, though. To my friendship with him, and The Lore we had created together. It's such a shame, that a friendship lasting over 10 years or more can be crushed in a mere day. I probably wouldn't believe it if I didn't have the displeasure of experiencing it firsthand. Part of me misses co-producing it, it was cool to relay ideas and bicker back and forth on what to do versus what not to do. But ultimately, it was he who cast away what we had, not me. Sometimes, you just need to cut off the toxic parts, lest they poison the rest of your body. Even if it hurts, you do what you've gotta.",
      "I hate to admit it, but I hope he sees The Lore someday, to see what it has become. I often wonder if he'd like the direction I've taken, or what he would've done differently. I may not like him as a person, but I'm not petty enough to ignore that he has genuine skills as a creator, I always did admire that. Maybe he'll even see this message, too? It really isn't anything more than curiosity though. Either way, I don't care about his opinion and I don't need his validation, I do this for me and the entertainment I hope this story will bring to those who read it."
    ],
    [
      "I suppose this is enough of a rant for now, so thank you for taking the time to learn a bit of history. A bit of... lore, you could say? Man, I'm so funny.",
      "Sillies aside, though. Thank you for being a part of The Lore, I hope to deliver an amazing experience. But to the man of the hour, if you're reading this, know that what you did hurt me, but I still wish the best for you. I'm glad you cared enough to find not only the website, but this hidden entry kept within.",
      "Regardless of who you are, enjoy your stay.",
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

export default OldFriendPage;


