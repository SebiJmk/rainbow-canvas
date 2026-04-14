import { useEffect, useRef, useState } from "react";

const PIXEL = 4;
const CANVAS_W = 200;
const CANVAS_H = 80;

// Pixel art: wine bottle pouring into glass (coordinates as [x,y] in grid units)
const bottlePixels: [number, number][] = [
  // Bottle neck
  [70,5],[71,5],[70,6],[71,6],[70,7],[71,7],[70,8],[71,8],
  // Bottle body
  [68,9],[69,9],[70,9],[71,9],[72,9],[73,9],
  [68,10],[69,10],[70,10],[71,10],[72,10],[73,10],
  [68,11],[69,11],[70,11],[71,11],[72,11],[73,11],
  [68,12],[69,12],[70,12],[71,12],[72,12],[73,12],
  [68,13],[69,13],[70,13],[71,13],[72,13],[73,13],
  [68,14],[69,14],[70,14],[71,14],[72,14],[73,14],
  [68,15],[69,15],[70,15],[71,15],[72,15],[73,15],
  [68,16],[69,16],[70,16],[71,16],[72,16],[73,16],
  [68,17],[69,17],[70,17],[71,17],[72,17],[73,17],
  // Bottle bottom
  [67,18],[68,18],[69,18],[70,18],[71,18],[72,18],[73,18],[74,18],
];

// Pour stream (animated)
const pourPixels: [number, number][] = [
  [73,10],[74,11],[75,12],[76,13],[77,14],[78,15],[79,16],[80,17],
  [81,18],[82,19],[83,20],[84,21],[85,22],[86,23],
];

// Wine glass
const glassPixels: [number, number][] = [
  // Glass rim
  [82,24],[83,24],[84,24],[85,24],[86,24],[87,24],[88,24],[89,24],[90,24],
  // Glass bowl
  [83,25],[84,25],[85,25],[86,25],[87,25],[88,25],[89,25],
  [83,26],[84,26],[85,26],[86,26],[87,26],[88,26],[89,26],
  [84,27],[85,27],[86,27],[87,27],[88,27],
  [85,28],[86,28],[87,28],
  // Stem
  [86,29],[86,30],[86,31],
  // Base
  [83,32],[84,32],[85,32],[86,32],[87,32],[88,32],[89,32],
];

// Wine fill inside glass (animated)
const wineFillPixels: [number, number][] = [
  [84,26],[85,26],[86,26],[87,26],[88,26],
  [84,27],[85,27],[86,27],[87,27],
  [85,28],[86,28],
];

const PixelWinePour = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_W * PIXEL;
    canvas.height = CANVAS_H * PIXEL;

    let frame = 0;
    let animId: number;

    const bottleColor = "rgba(200,169,110,0.7)";
    const pourColor = "rgba(200,169,110,0.5)";
    const wineColor = "rgba(200,169,110,0.85)";
    const glassColor = "rgba(255,255,255,0.25)";

    const drawPixel = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw bottle (slight tilt animation)
      const tiltOffset = Math.sin(frame * 0.03) * 0.5;
      bottlePixels.forEach(([x, y]) => drawPixel(x, y + Math.round(tiltOffset), bottleColor));

      // Draw pour stream with step animation
      const pourCount = Math.min(pourPixels.length, Math.floor((frame % 120) / 6));
      if (frame % 120 < 90) {
        for (let i = 0; i < pourCount; i++) {
          // Flicker effect
          if ((frame + i * 3) % 4 !== 0) {
            drawPixel(pourPixels[i][0], pourPixels[i][1], pourColor);
          }
        }
      }

      // Draw glass
      glassPixels.forEach(([x, y]) => drawPixel(x, y, glassColor));

      // Fill wine with animated level
      const fillLevel = Math.min(wineFillPixels.length, Math.floor(((frame * 0.5) % 60)));
      for (let i = 0; i < fillLevel; i++) {
        drawPixel(wineFillPixels[i][0], wineFillPixels[i][1], wineColor);
      }

      // Decorative pixel dots extending left and right
      for (let i = 0; i < CANVAS_W; i++) {
        if (i < 60 || i > 96) {
          if (i % 6 === 0) {
            const opacity = 0.05 + Math.sin(frame * 0.02 + i * 0.1) * 0.03;
            drawPixel(i, 20, `rgba(200,169,110,${opacity})`);
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    if (visible) {
      animate();
    }

    return () => cancelAnimationFrame(animId);
  }, [visible]);

  return (
    <div ref={containerRef} className="overflow-hidden py-6 flex justify-center select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{
          imageRendering: "pixelated",
          width: `${CANVAS_W * PIXEL}px`,
          height: `${CANVAS_H * PIXEL}px`,
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

export default PixelWinePour;
