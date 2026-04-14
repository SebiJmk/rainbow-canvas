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
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("rc-loaded", "1");
      onComplete();
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#080808" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <svg viewBox="0 0 200 60" width={180} fill="none">
              <defs>
                <linearGradient id="load-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="20%" stopColor="#ffd93d" />
                  <stop offset="40%" stopColor="#6bcb77" />
                  <stop offset="60%" stopColor="#4d96ff" />
                  <stop offset="80%" stopColor="#c77dff" />
                </linearGradient>
              </defs>
              <path d="M55 35 Q100 5 145 35" stroke="url(#load-rainbow)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <text x="100" y="50" textAnchor="middle" fill="white" fontFamily="'Cormorant Garamond', serif" fontSize="18" fontWeight="400">
                Rainbow
              </text>
            </svg>

            {phase >= 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-[1px] rainbow-line mt-3"
              />
            )}

            {phase >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.4 }}
                className="mt-3 font-body text-[13px] text-white tracking-[0.1em]"
              >
                coffee &amp; more
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
