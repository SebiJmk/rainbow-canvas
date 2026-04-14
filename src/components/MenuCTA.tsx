import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const MenuCTA = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-12 px-4 relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[200px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(ellipse, #c8a96e, transparent 70%)" }} />
        </div>
        <h2 className="font-heading text-[clamp(2.5rem,5vw,48px)] italic text-white">
          Meniu Complet
        </h2>
        <p className="font-body text-[14px] text-white/50 mt-3">
          Cafea, cocktailuri, vinuri, bere și mai mult.
        </p>
        <button
          onClick={() => navigate("/meniu")}
          className="mt-8 font-body text-[12px] uppercase tracking-[0.12em] text-white px-10 py-4 transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.3)", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#080808"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
        >
          Vezi Meniul Complet →
        </button>
      </motion.div>
    </section>
  );
};

export default MenuCTA;
