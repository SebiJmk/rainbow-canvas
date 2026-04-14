import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import SectionHeading from "./SectionHeading";

const posts = [
  "☀️ Dimineți perfecte cu un espresso și lumina dimineții...",
  "🌈 Culorile serii la Rainbow — cocktailuri, muzică, prieteni.",
  "🍷 Vinuri noi pe lista noastră. Vino să le descoperi!",
  "☕ Flat white-ul nostru — simplu, perfect, pentru tine.",
  "🎶 Friday night vibes @ Rainbow Coffee & More",
  "🍹 Rainbow Cocktail — semnătura casei, în toată splendoarea.",
];

const SocialSection = () => (
  <section id="galerie" data-cursor="hero" className="py-20 px-4 max-w-7xl mx-auto">
    <SectionHeading title="Urmărește-ne" />

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
      {posts.map((caption, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl bg-card border border-border overflow-hidden"
        >
          <div className="aspect-square rainbow-gradient opacity-20" />
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-2">{caption}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Instagram className="w-3.5 h-3.5" />
              <span>@rainbowcoffeeandmore</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
      <a
        href="https://www.instagram.com/rainbowcoffeeandmore/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-foreground font-body text-sm font-semibold hover:scale-[1.04] transition-transform"
      >
        📷 Instagram
      </a>
      <a
        href="https://www.facebook.com/RainbowCoffeeAndMore/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-foreground font-body text-sm font-semibold hover:scale-[1.04] transition-transform"
      >
        📘 Facebook
      </a>
    </div>
  </section>
);

export default SocialSection;
