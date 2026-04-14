import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProductDrawer, { type ProductDetail } from "@/components/ProductDrawer";

interface FeaturedItem {
  category: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string;
  price: string;
  image: string;
}

const items: FeaturedItem[] = [
  {
    category: "SIGNATURE",
    name: "Rainbow",
    tagline: "Semnătura noastră în fiecare pahar.",
    description: "Creat special pentru Rainbow, acest cocktail este o experiență vizuală și gustativă. Straturi distincte de siropuri artizanale, fructe proaspete și spirtoase premium se îmbină pentru un rezultat la fel de frumos pe cât este de delicios.",
    ingredients: "Vodkă, sirop de mango, sirop de căpșuni, blue curaçao, lime, soda",
    price: "22 lei",
    image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80",
  },
  {
    category: "VINURI",
    name: "Côtes de Provence AOP Rosé",
    tagline: "Provence în fiecare picătură.",
    description: "Un rosé de excepție din sud-estul Franței, cu o culoare roz-somon palidă și elegantă. Note de piersică albă, flori de câmp și o mineralitate fină îl fac alegerea perfectă pentru serile lungi de vară petrecute la Rainbow.",
    ingredients: "Grenache, Cinsault, Mourvèdre — Provence, Franța",
    price: "210 lei",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
  },
  {
    category: "CAFEA",
    name: "Irish Coffee",
    tagline: "Un clasic intemporal.",
    description: "Espresso proaspăt extras, whisky irlandez, zahăr brun dizolvat și smântână bătută ușor deasupra. Contrastul dintre amărăciunea cafelei și dulceața cremei — simplu, dar perfect.",
    ingredients: "Espresso, Irish Whiskey, zahăr brun, smântână",
    price: "9 lei",
    image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=800&q=80",
  },
];

const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const FeaturedSection = () => {
  const [selected, setSelected] = useState<ProductDetail | null>(null);
  const { ref, visible } = useScrollAnimation();

  return (
    <>
      <section id="preferatele" data-cursor="featured" className="pt-24 pb-8 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-[clamp(2.5rem,5vw,52px)] italic text-white">
            Preferatele Casei
          </h2>
          <div className="w-[60px] h-[2px] rainbow-line mx-auto mt-4" />
          <p className="font-body text-[14px] text-white/50 mt-4">
            Selecția noastră pentru serile perfecte.
          </p>
        </motion.div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected({
                name: item.name,
                price: item.price,
                category: item.category,
                description: item.description,
                ingredients: item.ingredients,
                image: item.image,
              })}
              className="group cursor-none overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                background: "#101010",
                boxShadow: "0 2px 24px rgba(0,0,0,0.6)",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #101010 0%, transparent 60%)" }}
                />
              </div>
              <div className="p-6 -mt-16 relative z-10">
                <span className="font-body text-[10px] tracking-[0.15em] text-amber uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading text-[28px] text-white mt-1">{item.name}</h3>
                <p className="font-body text-[13px] text-white/55 mt-1">{item.tagline}</p>
                <p className="font-body text-[15px] font-bold text-amber mt-3">{item.price}</p>
                <span className="inline-block font-body text-[13px] text-white mt-3 group-hover:translate-x-1 transition-transform">
                  Descoperă →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ProductDrawer product={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default FeaturedSection;
