import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("rc-loaded")) {
      setShow(false);
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("rc-loaded", "1");
      onComplete();
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#080808" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0.6] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Rainbow arc */}
            <motion.svg viewBox="0 0 120 40" width={140} fill="none">
              <motion.path
                d="M15 32 Q60 2 105 32"
                stroke="url(#load-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="load-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="25%" stopColor="#ffd93d" />
                  <stop offset="50%" stopColor="#6bcb77" />
                  <stop offset="75%" stopColor="#4d96ff" />
                  <stop offset="100%" stopColor="#c77dff" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Brand name */}
            {phase >= 1 && (
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-heading text-[32px] italic text-white mt-2"
              >
                Rainbow
              </motion.h1>
            )}

            {/* Tagline */}
            {phase >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5 }}
                className="font-body text-[12px] tracking-[0.15em] text-white mt-1"
              >
                coffee &amp; more
              </motion.p>
            )}

            {/* Loading bar */}
            {phase >= 2 && (
              <motion.div className="mt-6 w-[160px] h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rainbow-line"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
