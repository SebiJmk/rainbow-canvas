import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WinePourDivider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none pointer-events-none"
      style={{ height: "280px", background: "#080808" }}
    >
      {/* Ambient glow behind bottle */}
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px]"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgba(200,169,110,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Ambient glow behind glass */}
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px]"
        style={{
          background: "radial-gradient(circle at 70% 80%, rgba(120,20,30,0.08) 0%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 1200 280"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wineStream" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B1A2B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#6B1520" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4A0E18" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="bottleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="40%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          <linearGradient id="wineInGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B1A2B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5C1018" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <clipPath id="wineClip">
            <rect x="920" y="160" width="80" height="60" rx="4" />
          </clipPath>
        </defs>

        {/* Wine Bottle — top left area */}
        <g>
          {/* Bottle body */}
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Cap/foil */}
            <rect x="215" y="20" width="20" height="8" rx="2" fill="#c8a96e" opacity="0.6" />
            {/* Neck */}
            <rect x="218" y="28" width="14" height="40" rx="3" fill="url(#bottleGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            {/* Shoulder */}
            <path d="M218 68 Q218 78 205 85 L205 85 L245 85 Q232 78 232 68" fill="url(#bottleGrad)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            {/* Body */}
            <rect x="205" y="85" width="40" height="90" rx="3" fill="url(#bottleGrad)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            {/* Label */}
            <rect x="210" y="100" width="30" height="40" rx="2" fill="rgba(200,169,110,0.08)" stroke="rgba(200,169,110,0.15)" strokeWidth="0.5" />
            <line x1="215" y1="112" x2="235" y2="112" stroke="rgba(200,169,110,0.2)" strokeWidth="0.5" />
            <line x1="215" y1="118" x2="235" y2="118" stroke="rgba(200,169,110,0.15)" strokeWidth="0.5" />
            <line x1="218" y1="124" x2="232" y2="124" stroke="rgba(200,169,110,0.1)" strokeWidth="0.5" />
            {/* Bottom */}
            <rect x="205" y="175" width="40" height="6" rx="3" fill="#151515" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            {/* Reflection highlight */}
            <rect x="208" y="88" width="3" height="80" rx="1.5" fill="rgba(255,255,255,0.04)" />
          </motion.g>
        </g>

        {/* Wine stream — diagonal flowing from bottle spout area to glass */}
        <motion.path
          d="M232 50 Q400 60, 600 140 Q800 200, 940 175"
          stroke="url(#wineStream)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
        />
        {/* Thinner parallel stream for depth */}
        <motion.path
          d="M234 53 Q405 65, 605 143 Q805 203, 942 178"
          stroke="rgba(139,26,43,0.3)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
        />

        {/* Wine Glass — bottom right area */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Glass bowl */}
          <path
            d="M900 160 Q900 220, 960 230 Q1020 220, 1020 160 Z"
            fill="url(#glassGrad)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
          />
          {/* Wine fill inside glass */}
          <motion.path
            d="M905 185 Q905 220, 960 228 Q1015 220, 1015 185 Z"
            fill="url(#wineInGlass)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
          {/* Wine surface highlight */}
          <motion.ellipse
            cx="960" cy="185" rx="55" ry="5"
            fill="rgba(139,26,43,0.4)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2.8 }}
          />
          {/* Stem */}
          <line x1="960" y1="230" x2="960" y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          {/* Base */}
          <ellipse cx="960" cy="262" rx="30" ry="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          {/* Rim highlight */}
          <ellipse cx="960" cy="160" rx="60" ry="6" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
          {/* Glass reflection */}
          <path d="M908 165 Q908 200, 920 210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        </motion.g>

        {/* Decorative dots along bottom */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={60 + i * 58}
            cy={270}
            r={1}
            fill="rgba(200,169,110,0.08)"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default WinePourDivider;
