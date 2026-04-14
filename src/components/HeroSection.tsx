import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const rainbowColors = [
  "hsl(0,100%,60%)",
  "hsl(30,100%,55%)",
  "hsl(45,100%,50%)",
  "hsl(140,70%,45%)",
  "hsl(210,100%,55%)",
  "hsl(250,80%,65%)",
  "hsl(280,80%,60%)",
];

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.5,
        size: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

const HeroSection = () => {
  const letters = "Rainbow".split("");

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" data-cursor="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Particles />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-heading font-bold text-[clamp(3.5rem,8vw,6rem)] leading-none mb-2">
          {letters.map((letter, i) => (
            <span key={i} style={{ color: rainbowColors[i % rainbowColors.length] }}>
              {letter}
            </span>
          ))}
        </h1>
        <p className="font-heading italic text-foreground/70 text-lg md:text-xl tracking-wider">
          coffee & more
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollTo("#menu")}
            className="px-8 py-3 rounded-full rainbow-gradient text-background font-body font-semibold text-sm tracking-wide hover:scale-[1.04] transition-transform"
          >
            Vezi Meniul
          </button>
          <button
            onClick={() => scrollTo("#rezerva")}
            className="px-8 py-3 rounded-full border border-foreground/40 text-foreground font-body text-sm tracking-wide hover:scale-[1.04] hover:border-foreground transition-all"
          >
            Rezervă o Masă
          </button>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-6 h-6 text-foreground/40" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
