import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const ringColor = useRef("rgba(255,255,255,0.5)");
  const ringSize = useRef(26);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const isButton = el.closest("button, a, [role='button']");
      const section = el.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (isButton) {
        ringColor.current = "rgba(255,255,255,1)";
        ringSize.current = 40;
      } else if (section === "featured" || section === "menu") {
        ringColor.current = "rgba(200,169,110,0.7)";
        ringSize.current = 26;
      } else if (section === "rezerva") {
        ringColor.current = "rgba(180,100,100,0.6)";
        ringSize.current = 26;
      } else {
        ringColor.current = "rgba(255,255,255,0.5)";
        ringSize.current = 26;
      }
    };

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        const s = ringSize.current;
        ringRef.current.style.transform = `translate(${ringPos.current.x - s / 2}px, ${ringPos.current.y - s / 2}px)`;
        ringRef.current.style.width = `${s}px`;
        ringRef.current.style.height = `${s}px`;
        ringRef.current.style.borderColor = ringColor.current;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-[width,height] duration-150"
        style={{
          width: 26, height: 26, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.5)", background: "transparent",
        }}
      />
    </>
  );
};

export default CustomCursor;
