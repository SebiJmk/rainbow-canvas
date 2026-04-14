import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem("rc-loaded");
    if (already) {
      setShow(false);
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setShowTagline(true), 800);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("rc-loaded", "1");
      onComplete();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Rainbow arc */}
            <svg width="120" height="60" viewBox="0 0 120 60" className="mb-4">
              <defs>
                <linearGradient id="loading-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(0,100%,60%)" />
                  <stop offset="20%" stopColor="hsl(30,100%,55%)" />
                  <stop offset="40%" stopColor="hsl(50,100%,55%)" />
                  <stop offset="60%" stopColor="hsl(140,70%,45%)" />
                  <stop offset="80%" stopColor="hsl(210,100%,55%)" />
                  <stop offset="100%" stopColor="hsl(280,80%,60%)" />
                </linearGradient>
              </defs>
              <path d="M10 55 Q60 -10 110 55" stroke="url(#loading-rainbow)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
            <h1 className="font-heading text-2xl md:text-3xl tracking-wide text-foreground">
              Rainbow
            </h1>
            <p className="text-sm text-muted-foreground tracking-widest uppercase mt-1">
              coffee & more
            </p>
          </motion.div>

          {/* Rainbow sweep line */}
          <div className="w-48 h-[2px] mt-6 overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 w-full rainbow-gradient"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            />
          </div>

          {/* Typing tagline */}
          {showTagline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 font-heading italic text-muted-foreground text-sm"
            >
              coffee & more...
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
