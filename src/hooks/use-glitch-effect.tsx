import { useState, useCallback } from 'react';

export const useGlitchEffect = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback((callback?: () => void) => {
    setIsGlitching(true);
    
    // Add glitch keyframes if they don't exist
    if (!document.querySelector('#glitch-keyframes')) {
      const style = document.createElement('style');
      style.id = 'glitch-keyframes';
      style.textContent = `
        @keyframes glitch-flicker {
          0%, 100% { background-color: transparent; }
          5% { background-color: rgba(255, 0, 0, 0.9); }
          10% { background-color: transparent; }
          15% { background-color: rgba(255, 0, 0, 0.8); }
          20% { background-color: transparent; }
          25% { background-color: rgba(255, 0, 0, 0.95); }
          30% { background-color: transparent; }
          35% { background-color: rgba(255, 0, 0, 0.85); }
          40% { background-color: transparent; }
          45% { background-color: rgba(255, 0, 0, 0.9); }
          50% { background-color: transparent; }
          55% { background-color: rgba(255, 0, 0, 0.8); }
          60% { background-color: transparent; }
          65% { background-color: rgba(255, 0, 0, 0.95); }
          70% { background-color: transparent; }
          75% { background-color: rgba(255, 0, 0, 0.85); }
          80% { background-color: transparent; }
          85% { background-color: rgba(255, 0, 0, 0.9); }
          90% { background-color: transparent; }
          95% { background-color: rgba(255, 0, 0, 0.8); }
        }
        
        @keyframes glitch-shake {
          0% { transform: translateX(0) translateY(0); }
          2% { transform: translateX(-25px) translateY(18px); }
          4% { transform: translateX(22px) translateY(-15px); }
          6% { transform: translateX(-18px) translateY(25px); }
          8% { transform: translateX(28px) translateY(-22px); }
          10% { transform: translateX(-30px) translateY(12px); }
          12% { transform: translateX(15px) translateY(-28px); }
          14% { transform: translateX(-20px) translateY(30px); }
          16% { transform: translateX(32px) translateY(-18px); }
          18% { transform: translateX(-26px) translateY(22px); }
          20% { transform: translateX(18px) translateY(-32px); }
          22% { transform: translateX(-35px) translateY(15px); }
          24% { transform: translateX(25px) translateY(-25px); }
          26% { transform: translateX(-22px) translateY(28px); }
          28% { transform: translateX(30px) translateY(-20px); }
          30% { transform: translateX(-28px) translateY(35px); }
          32% { transform: translateX(20px) translateY(-30px); }
          34% { transform: translateX(-32px) translateY(18px); }
          36% { transform: translateX(26px) translateY(-26px); }
          38% { transform: translateX(-24px) translateY(32px); }
          40% { transform: translateX(35px) translateY(-24px); }
          42% { transform: translateX(-30px) translateY(20px); }
          44% { transform: translateX(22px) translateY(-35px); }
          46% { transform: translateX(-26px) translateY(28px); }
          48% { transform: translateX(32px) translateY(-22px); }
          50% { transform: translateX(-28px) translateY(30px); }
          52% { transform: translateX(24px) translateY(-28px); }
          54% { transform: translateX(-35px) translateY(25px); }
          56% { transform: translateX(28px) translateY(-32px); }
          58% { transform: translateX(-22px) translateY(35px); }
          60% { transform: translateX(30px) translateY(-26px); }
          62% { transform: translateX(-32px) translateY(22px); }
          64% { transform: translateX(26px) translateY(-30px); }
          66% { transform: translateX(-24px) translateY(32px); }
          68% { transform: translateX(35px) translateY(-28px); }
          70% { transform: translateX(-30px) translateY(24px); }
          72% { transform: translateX(22px) translateY(-35px); }
          74% { transform: translateX(-28px) translateY(30px); }
          76% { transform: translateX(32px) translateY(-24px); }
          78% { transform: translateX(-26px) translateY(28px); }
          80% { transform: translateX(24px) translateY(-32px); }
          82% { transform: translateX(-35px) translateY(26px); }
          84% { transform: translateX(30px) translateY(-22px); }
          86% { transform: translateX(-28px) translateY(35px); }
          88% { transform: translateX(22px) translateY(-30px); }
          90% { transform: translateX(-32px) translateY(24px); }
          92% { transform: translateX(28px) translateY(-26px); }
          94% { transform: translateX(-24px) translateY(32px); }
          96% { transform: translateX(35px) translateY(-28px); }
          98% { transform: translateX(-30px) translateY(22px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes glitch-text-shake {
          0% { transform: translateX(0) translateY(0) scale(1); }
          2% { transform: translateX(-15px) translateY(12px) scale(1.15); }
          4% { transform: translateX(18px) translateY(-14px) scale(0.85); }
          6% { transform: translateX(-12px) translateY(20px) scale(1.20); }
          8% { transform: translateX(22px) translateY(-10px) scale(0.80); }
          10% { transform: translateX(-25px) translateY(15px) scale(1.25); }
          12% { transform: translateX(10px) translateY(-22px) scale(0.75); }
          14% { transform: translateX(-18px) translateY(25px) scale(1.18); }
          16% { transform: translateX(28px) translateY(-15px) scale(0.82); }
          18% { transform: translateX(-20px) translateY(18px) scale(1.22); }
          20% { transform: translateX(15px) translateY(-28px) scale(0.78); }
          22% { transform: translateX(-30px) translateY(12px) scale(1.30); }
          24% { transform: translateX(25px) translateY(-20px) scale(0.70); }
          26% { transform: translateX(-22px) translateY(30px) scale(1.25); }
          28% { transform: translateX(18px) translateY(-25px) scale(0.75); }
          30% { transform: translateX(-28px) translateY(22px) scale(1.28); }
          32% { transform: translateX(20px) translateY(-18px) scale(0.72); }
          34% { transform: translateX(-25px) translateY(28px) scale(1.35); }
          36% { transform: translateX(30px) translateY(-22px) scale(0.65); }
          38% { transform: translateX(-18px) translateY(25px) scale(1.18); }
          40% { transform: translateX(22px) translateY(-30px) scale(0.82); }
          42% { transform: translateX(-28px) translateY(18px) scale(1.28); }
          44% { transform: translateX(25px) translateY(-25px) scale(0.75); }
          46% { transform: translateX(-20px) translateY(32px) scale(1.20); }
          48% { transform: translateX(30px) translateY(-18px) scale(0.80); }
          50% { transform: translateX(-25px) translateY(20px) scale(1.25); }
          52% { transform: translateX(18px) translateY(-32px) scale(0.68); }
          54% { transform: translateX(-32px) translateY(25px) scale(1.32); }
          56% { transform: translateX(28px) translateY(-20px) scale(0.68); }
          58% { transform: translateX(-22px) translateY(30px) scale(1.22); }
          60% { transform: translateX(25px) translateY(-28px) scale(0.72); }
          62% { transform: translateX(-30px) translateY(22px) scale(1.30); }
          64% { transform: translateX(20px) translateY(-25px) scale(0.70); }
          66% { transform: translateX(-28px) translateY(32px) scale(1.28); }
          68% { transform: translateX(32px) translateY(-22px) scale(0.68); }
          70% { transform: translateX(-25px) translateY(28px) scale(1.25); }
          72% { transform: translateX(22px) translateY(-30px) scale(0.75); }
          74% { transform: translateX(-30px) translateY(25px) scale(1.30); }
          76% { transform: translateX(28px) translateY(-28px) scale(0.70); }
          78% { transform: translateX(-22px) translateY(32px) scale(1.22); }
          80% { transform: translateX(25px) translateY(-25px) scale(0.75); }
          82% { transform: translateX(-32px) translateY(20px) scale(1.32); }
          84% { transform: translateX(30px) translateY(-22px) scale(0.68); }
          86% { transform: translateX(-28px) translateY(30px) scale(1.28); }
          88% { transform: translateX(22px) translateY(-32px) scale(0.68); }
          90% { transform: translateX(-25px) translateY(28px) scale(1.25); }
          92% { transform: translateX(32px) translateY(-25px) scale(0.75); }
          94% { transform: translateX(-30px) translateY(22px) scale(1.30); }
          96% { transform: translateX(28px) translateY(-30px) scale(0.70); }
          98% { transform: translateX(-22px) translateY(32px) scale(1.22); }
          100% { transform: translateX(0) translateY(0) scale(1); }
        }
        
        .glitch-active {
          animation: glitch-flicker 5s linear;
        }
        
        .glitch-shake {
          animation: glitch-shake 5s linear;
        }
        
        .glitch-text-shake {
          animation: glitch-text-shake 5s linear;
        }
      `;
      document.head.appendChild(style);
    }

    // Function to apply glitch effects to elements
    const applyGlitchEffects = () => {
      // Get all major components (cards, buttons, images, text elements)
      const components = document.querySelectorAll('div[class*="card"], button, img, h1, h2, h3, h4, h5, h6, p, span, div, nav, aside, section, article');
      
      components.forEach((element, index) => {
        // Random delay for each component (0-300ms for faster onset)
        const delay = Math.random() * 300;
        
        setTimeout(() => {
          // Much higher chance for flickering - 95% of elements will flicker red
          if (Math.random() > 0.05) { // 95% chance to flicker
            element.classList.add('glitch-active');
          }
          
          if (element.tagName.match(/H[1-6]|P|SPAN/)) {
            // Text elements get text shake - 90% chance
            if (Math.random() > 0.1) {
              element.classList.add('glitch-text-shake');
            }
          } else if (element.tagName === 'IMG') {
            // Images get regular shake - 85% chance
            if (Math.random() > 0.15) {
              element.classList.add('glitch-shake');
            }
          } else {
            // Other elements get regular shake - 80% chance
            if (Math.random() > 0.2) {
              element.classList.add('glitch-shake');
            }
          }
        }, delay);
      });
    };

    // Apply effects immediately
    applyGlitchEffects();

    // Clean up effects and execute callback after duration
    setTimeout(() => {
      const allGlitchedElements = document.querySelectorAll('.glitch-active, .glitch-shake, .glitch-text-shake');
      allGlitchedElements.forEach(element => {
        element.classList.remove('glitch-active', 'glitch-shake', 'glitch-text-shake');
      });
      
      setIsGlitching(false);
      if (callback) callback();
    }, 5000); // 5 seconds duration
  }, []);

  return { isGlitching, triggerGlitch };
};
