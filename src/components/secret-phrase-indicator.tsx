import { motion, AnimatePresence } from "framer-motion";

interface SecretPhraseIndicatorProps {
  text: string;
  isError: boolean;
  isVisible: boolean;
}

export function SecretPhraseIndicator({ text, isError, isVisible }: SecretPhraseIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
            <p
              className={`text-sm font-mono transition-colors duration-150 ${
                isError ? "text-red-500" : "text-foreground"
              }`}
            >
              {text || "_"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

