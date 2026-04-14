import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dotSize = useRef(6);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest("button, a, [role='button'], input, select, textarea, iframe");
      dotSize.current = isInteractive ? 14 : 6;

      if (dotRef.current) {
        const s = dotSize.current;
        dotRef.current.style.transform = `translate(${e.clientX - s / 2}px, ${e.clientY - s / 2}px)`;
        dotRef.current.style.width = `${s}px`;
        dotRef.current.style.height = `${s}px`;
        dotRef.current.style.opacity = isInteractive ? "0.5" : "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none transition-[width,height,opacity] duration-150"
      style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }}
    />
  );
};

export default CustomCursor;
