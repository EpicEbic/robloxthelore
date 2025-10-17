
import { useEffect } from "react";

export function LocationContentStyles() {
  // Add TV static and flicker CSS animations for special effects
  useEffect(() => {
    if (!document.querySelector('#tv-static-styles')) {
      const style = document.createElement('style');
      style.id = 'tv-static-styles';
      style.textContent = `
        @keyframes tv-static {
          0% { 
            text-shadow: 
              0.4rem 0 0 rgba(255, 0, 0, 0.5),
              -0.4rem 0 0 rgba(0, 255, 255, 0.5),
              0.2rem 0.2rem 0 rgba(255, 255, 0, 0.3);
            transform: translateX(0);
          }
          10% { 
            text-shadow: 
              -0.4rem 0 0 rgba(255, 0, 0, 0.7),
              0.4rem 0 0 rgba(0, 255, 255, 0.7),
              -0.2rem -0.2rem 0 rgba(255, 255, 0, 0.5);
            transform: translateX(-2px);
          }
          50% { 
            text-shadow: 
              -0.2rem 0 0 rgba(255, 0, 0, 0.8),
              0.2rem 0 0 rgba(0, 255, 255, 0.8),
              -0.3rem -0.3rem 0 rgba(255, 255, 0, 0.2);
            transform: translateX(0);
          }
          100% { 
            text-shadow: 
              0.4rem 0 0 rgba(255, 0, 0, 0.5),
              -0.4rem 0 0 rgba(0, 255, 255, 0.5),
              0.2rem 0.2rem 0 rgba(255, 255, 0, 0.3);
            transform: translateX(0);
          }
        }

        @keyframes tv-flicker {
          0%, 100% { opacity: 1; }
          2% { opacity: 0.8; }
          10% { opacity: 0.9; }
          12% { opacity: 0.4; }
          20% { opacity: 0.3; }
          50% { opacity: 0.5; }
          98% { opacity: 0.7; }
        }

        .tv-static-text {
          animation: tv-static 3s infinite linear, tv-flicker 2s infinite linear;
          position: relative;
          display: inline-block;
        }

        .tv-static-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.03) 2px,
              rgba(0, 0, 0, 0.03) 4px
            );
          pointer-events: none;
          z-index: 1;
        }
        
        .force-text-wrap {
          word-break: break-word;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
          -webkit-hyphens: auto;
          -ms-hyphens: auto;
          white-space: normal;
          max-width: 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return null;
}
