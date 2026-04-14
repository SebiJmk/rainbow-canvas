import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const sectionColors: Record<string, string> = {
  hero: "rgba(255,255,255,0.6)",
  featured: "rgba(201,168,76,0.6)",
  menu: "rgba(201,168,76,0.6)",
  cocktails: "rgba(255,100,100,0.6)",
  beer: "rgba(240,192,64,0.6)",
  wine: "rgba(192,50,95,0.6)",
  shots: "rgba(255,51,51,0.6)",
  contact: "rgba(100,149,237,0.6)",
  rezerva: "rgba(201,168,76,0.6)",
};

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("rgba(255,255,255,0.6)");
  
  const dotX = useSpring(0, { stiffness: 800, damping: 40 });
  const dotY = useSpring(0, { stiffness: 800, damping: 40 });
  const circleX = useSpring(0, { stiffness: 200, damping: 25 });
  const circleY = useSpring(0, { stiffness: 200, damping: 25 });

  const onMove = useCallback((e: MouseEvent) => {
    dotX.set(e.clientX);
    dotY.set(e.clientY);
    circleX.set(e.clientX);
    circleY.set(e.clientY);
    setVisible(true);

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el) {
      const section = el.closest("[data-cursor]");
      const key = section?.getAttribute("data-cursor") || "hero";
      setColor(sectionColors[key] || "rgba(255,255,255,0.6)");
    }
  }, [dotX, dotY, circleX, circleY]);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", () => setVisible(false));
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [onMove]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: color,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9998] border"
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </>
  );
};

export default CustomCursor;
