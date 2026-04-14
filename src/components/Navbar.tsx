import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "Rezervă", href: "#rezerva" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2">
            <svg width="32" height="18" viewBox="0 0 120 60">
              <defs>
                <linearGradient id="nav-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(0,100%,60%)" />
                  <stop offset="20%" stopColor="hsl(30,100%,55%)" />
                  <stop offset="40%" stopColor="hsl(50,100%,55%)" />
                  <stop offset="60%" stopColor="hsl(140,70%,45%)" />
                  <stop offset="80%" stopColor="hsl(210,100%,55%)" />
                  <stop offset="100%" stopColor="hsl(280,80%,60%)" />
                </linearGradient>
              </defs>
              <path d="M10 55 Q60 -10 110 55" stroke="url(#nav-rainbow)" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
            <span className="font-heading text-foreground text-sm tracking-wide hidden sm:inline">Rainbow</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`text-sm font-body tracking-wide transition-colors relative pb-1 ${
                  active === l.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] rainbow-gradient rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#rezerva")}
              className="hidden md:block text-sm px-5 py-2 rounded-full border border-foreground/30 text-foreground hover:rainbow-gradient hover:text-background transition-all duration-300"
              style={{
                backgroundImage: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundImage =
                  "linear-gradient(90deg, hsl(0,100%,60%), hsl(30,100%,55%), hsl(50,100%,55%), hsl(140,70%,45%), hsl(210,100%,55%), hsl(280,80%,60%))";
                (e.target as HTMLElement).style.color = "hsl(0,0%,4%)";
                (e.target as HTMLElement).style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundImage = "none";
                (e.target as HTMLElement).style.color = "";
                (e.target as HTMLElement).style.borderColor = "";
              }}
            >
              Rezervă o Masă
            </button>

            <button
              className="md:hidden text-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <motion.div animate={mobileOpen ? { rotate: 45, y: 6 } : {}} className="w-6 h-[2px] bg-foreground" />
                <motion.div animate={mobileOpen ? { opacity: 0 } : {}} className="w-6 h-[2px] bg-foreground" />
                <motion.div animate={mobileOpen ? { rotate: -45, y: -6 } : {}} className="w-6 h-[2px] bg-foreground" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-heading text-2xl text-foreground hover:rainbow-text transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#rezerva")}
              className="mt-4 px-8 py-3 rounded-full rainbow-gradient text-background font-body font-semibold"
            >
              Rezervă o Masă
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
