import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const vibeImages = [
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=600&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80",
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80",
];

const VibeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 px-4"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40">
          Atmosfera Rainbow
        </p>
        <h2 className="font-heading text-[clamp(2.5rem,5vw,52px)] italic text-white mt-2">
          Vibe de Neegalat
        </h2>
        <div className="w-[40px] h-[2px] rainbow-line mx-auto mt-4" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
        {vibeImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="aspect-square overflow-hidden relative group"
          >
            <img
              src={src}
              alt="Rainbow Coffee atmosphere"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300 opacity-40 group-hover:opacity-20"
              style={{ background: "linear-gradient(to top, #080808 0%, transparent 50%)" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VibeSection;
