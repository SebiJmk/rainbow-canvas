import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  {
    name: "Rainbow Cocktail",
    price: "22 lei",
    tagline: "Culorile cerului într-un singur pahar.",
    emoji: "🍹",
    description:
      "Semnătura noastră — un cocktail stratificat în culorile curcubeului, construit cu grijă din siropuri artizanale, fructe proaspete și un strop de magie. Fiecare înghițitură îți amintește că viața e mai frumoasă în culori.",
  },
  {
    name: "Côtes de Provence AOP Rosé",
    price: "210 lei",
    tagline: "Provence în fiecare picătură.",
    emoji: "🍷",
    description:
      "Un rosé de excepție din inima Provenței, cu note delicate de piersică, flori albe și mineralitate elegantă. Vinul perfect pentru serile lungi de vară pe terasa Rainbow.",
  },
  {
    name: "Irish Coffee",
    price: "9 lei",
    tagline: "Căldura Irlandei, rafinamentul cafelei.",
    emoji: "☕",
    description:
      "Espresso intens, whisky fin, zahăr brun caramelizat și smântână bătută ușor deasupra. Un clasic servit cu pasiune — simplu, dar de neuitat.",
  },
];

const FeaturedItems = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section data-cursor="hero" className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Preferatele Casei" />

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            onClick={() => setSelected(i)}
            className="group relative rounded-2xl p-6 bg-card border border-border hover:border-transparent cursor-none transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundImage: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderImage =
                "linear-gradient(135deg, hsl(0,100%,60%), hsl(50,100%,55%), hsl(140,70%,45%), hsl(210,100%,55%), hsl(280,80%,60%)) 1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderImage = "none";
            }}
          >
            <div className="text-5xl mb-4">{item.emoji}</div>
            <h3 className="font-heading text-xl text-foreground mb-2">{item.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 italic">{item.tagline}</p>
            <p className="gold-text font-semibold text-lg mb-4">{item.price}</p>
            <button className="text-sm text-foreground/70 hover:text-foreground border-b border-foreground/20 hover:border-foreground/60 transition-colors pb-0.5">
              Descoperă
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 backdrop-blur-md px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-card border border-border rounded-2xl p-8"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-6xl mb-4">{items[selected].emoji}</div>
              <h2 className="font-heading text-2xl text-foreground mb-1">{items[selected].name}</h2>
              <div className="h-[2px] w-16 rainbow-gradient rounded-full my-3" />
              <p className="text-muted-foreground leading-relaxed mb-4">{items[selected].description}</p>
              <p className="gold-text font-semibold text-xl">{items[selected].price}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedItems;
