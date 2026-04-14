import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const photos = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80",
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
];

const SocialSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="social" className="py-24 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="font-body text-[12px] uppercase tracking-[0.2em] text-white/40">
          Ne găsești pe Instagram
        </p>
        <h2 className="font-heading text-[clamp(2rem,5vw,42px)] italic text-white mt-2">
          @rainbowcoffeero
        </h2>
        <div className="w-[40px] h-[2px] rainbow-line mx-auto mt-4" />
      </motion.div>

      <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="aspect-square overflow-hidden relative group"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="https://www.instagram.com/rainbowcoffeero/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-[12px] uppercase tracking-[0.12em] text-white px-8 py-3 transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#080808"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
        >
          Urmărește @rainbowcoffeero
        </a>
      </div>
    </section>
  );
};

export default SocialSection;
