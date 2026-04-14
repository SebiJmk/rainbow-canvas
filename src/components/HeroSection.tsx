import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" data-cursor="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1800&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.95) 100%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-4"
      >
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-amber mb-6">
          Est. București · Bd. Decebal 14
        </p>
        <h1 className="font-heading text-[clamp(4rem,10vw,100px)] font-light italic text-white leading-none mb-3">
          Rainbow
        </h1>
        <p className="font-body text-[16px] font-light text-white/50 tracking-[0.1em]">
          coffee &amp; more
        </p>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/meniu")}
            className="font-body text-[13px] uppercase tracking-[0.1em] text-white px-8 py-3 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#080808"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
          >
            Descoperă Meniul
          </button>
          <button
            onClick={() => scrollTo("rezerva")}
            className="font-body text-[13px] uppercase tracking-[0.1em] text-white px-8 py-3 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#080808"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
          >
            Rezervă o Masă
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
        <motion.div
          className="w-[1px] bg-white/30"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
