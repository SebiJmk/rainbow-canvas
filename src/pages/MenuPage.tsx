import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";


interface MenuItem {
  name: string;
  price: string;
  variant?: string;
}

interface MenuSubSection {
  label?: string;
  note?: string;
  items: MenuItem[];
}

interface MenuTab {
  id: string;
  label: string;
  icon: string;
  sections: MenuSubSection[];
}

const tabs: MenuTab[] = [
  {
    id: "cafea", label: "Cafea", icon: "☕",
    sections: [{
      items: [
        { name: "Espresso", variant: "single / double", price: "5 / 7 lei" },
        { name: "Cortado", price: "6 lei" },
        { name: "Cappuccino", variant: "Single / Double", price: "7 / 10 lei" },
        { name: "Caffe Latte", variant: "Single / Double", price: "8 / 10 lei" },
        { name: "Flat White", price: "9 lei" },
        { name: "Irish Coffee", price: "9 lei" },
        { name: "Bailey's Coffee", price: "9 lei" },
        { name: "Americano", variant: "Single / Double", price: "5 / 7 lei" },
        { name: "Ciocolată caldă", price: "7 lei" },
        { name: "Ceai", variant: "simplu / cu rom", price: "7 / 11 lei" },
        { name: "Espresso Freddo", price: "7 lei" },
        { name: "Ice Coffee", price: "8 lei" },
      ],
    }],
  },
  {
    id: "bere", label: "Bere", icon: "🍺",
    sections: [
      { label: "BERE LA DRAUGHT", items: [
        { name: "Peroni Nastro Azzurro", variant: "400ml", price: "14 lei" },
        { name: "Ursus Premium", variant: "400ml", price: "10 lei" },
        { name: "Azuga Nefiltrata", variant: "500ml", price: "15 lei" },
        { name: "Azuga Helles", variant: "500ml", price: "15 lei" },
        { name: "Ursus IPA", variant: "400ml", price: "15 lei" },
      ]},
      { label: "BERE LA STICLĂ", items: [
        { name: "Peroni Nastro Azzurro", variant: "500ml", price: "14 lei" },
        { name: "Peroni Stile Capri", variant: "330ml", price: "12 lei" },
        { name: "Ursus Premium", variant: "500ml", price: "10 lei" },
        { name: "Asahi Super Dry", variant: "330ml", price: "15 lei" },
      ]},
      { label: "SPECIALITĂȚI BERE", items: [
        { name: "Ursus Black", variant: "330ml", price: "10 lei" },
        { name: "Ursus IPA", variant: "330ml", price: "12 lei" },
      ]},
      { label: "BERE FĂRĂ ALCOOL", items: [
        { name: "Peroni Nastro Azzurro 0.0%", variant: "330ml", price: "12 lei" },
        { name: "Ursus Cooler", variant: "330ml (Lămâie/Cherry/Grapefruit)", price: "10 lei" },
      ]},
      { label: "BERE CRAFT", items: [
        { name: "Azuga Nepasteurizată", variant: "500ml", price: "15 lei" },
        { name: "Azuga Weissbier (Nefiltrata)", variant: "500ml", price: "15 lei" },
        { name: "Azuga Helles", variant: "500ml", price: "15 lei" },
      ]},
      { label: "OFERTE", note: "Întrebați barmanul despre ofertele cu frapiere", items: [
        { name: "Pachet Havana 1L + 4 Răcoritoare / 1 Santal", price: "250 lei" },
        { name: "Dispenser Ursus 2.4L (ofertă grup)", price: "65 lei" },
      ]},
    ],
  },
  {
    id: "vinuri", label: "Vinuri", icon: "🍷",
    sections: [
      { label: "ALB & ROZE", items: [
        { name: "Pahar Prosecco", price: "10 lei" },
        { name: "Prosecco Terra Serena", variant: "Alb / Rosé", price: "70 / 80 lei" },
        { name: "Prosecco Millesimato Valdobiadene DOCG", variant: "Alb", price: "130 lei" },
        { name: "Castel D'or Cava Brut", price: "90 lei" },
        { name: "Navigo", variant: "Alb / Rosé / pahar", price: "70 / 70 / 18 lei" },
        { name: "Mysterium", variant: "Alb / Rosé", price: "85 lei" },
        { name: "Ana / Maria", variant: "Alb", price: "110 lei" },
        { name: "Esmeralda", variant: "Alb / Rosé / pahar", price: "80 / 80 / 18 lei" },
        { name: "Tomassi Lugana", variant: "Alb", price: "110 lei" },
        { name: "Aerosoli", variant: "Rosé / Alb", price: "80 lei" },
        { name: "Bulgarini Lugana", variant: "Alb", price: "160 lei" },
        { name: "Charme de Mer", variant: "Rosé", price: "170 lei" },
        { name: "Côtes de Provence AOP", variant: "Rosé", price: "210 lei" },
        { name: "Nocturne", variant: "Chardonnay / Pinot Grigio", price: "95 lei" },
        { name: "Grillo Costadune DOC", variant: "Alb", price: "110 lei" },
        { name: "Caii de la Letea", variant: "Aligote / Rosé / Cabernet", price: "120 lei" },
        { name: "Mandrarossa", variant: "Rosé", price: "130 lei" },
        { name: "Villa Angela", variant: "Alb", price: "130 lei" },
        { name: "Marche IGT", variant: "Rosé", price: "115 lei" },
      ]},
      { label: "VIN ROȘU", items: [
        { name: "Talo Primitivo di Manduria", price: "140 lei" },
        { name: "Nocture Rară Neagră", price: "95 lei" },
        { name: "Frescobaldi Castello Rufina", price: "210 lei" },
        { name: "Ninfa Marche Rosso", price: "170 lei" },
        { name: "Montepulciano D'Abruzzo", price: "80 lei" },
      ]},
    ],
  },
  {
    id: "cocktailuri", label: "Cocktailuri", icon: "🍹",
    sections: [
      { label: "SURSE DE INSPIRAȚIE", items: [
        { name: "Rainbow", price: "22 lei" },
        { name: "Mojito", price: "19 lei" },
        { name: "Aperol Spritz", price: "22 lei" },
        { name: "Hugo", price: "23 lei" },
        { name: "ORGASMmm", price: "23 lei" },
        { name: "Honey Bunny", price: "22 lei" },
        { name: "White / Black Russian", price: "22 lei" },
        { name: "Long Island", price: "25 lei" },
        { name: "Godmother / Father", price: "22 lei" },
        { name: "Mai Tai", price: "23 lei" },
        { name: "Vanilla Sky", price: "23 lei" },
        { name: "Negroni", price: "22 lei" },
        { name: "Campari", variant: "Orange / Tonic", price: "22 / 21 lei" },
        { name: "Vodka", variant: "Tonic / Santal", price: "20 / 21 lei" },
        { name: "Cosmopolitan", price: "25 lei" },
        { name: "Margarita", price: "25 lei" },
        { name: "Amaretto Sour", price: "20 lei" },
        { name: "Blue Lagoon", price: "22 lei" },
        { name: "Cuba Libre", price: "20 lei" },
        { name: "Gin Tonic", price: "20 lei" },
        { name: "Whitley Tonic", price: "27 lei" },
        { name: "Hendrick's Tonic", price: "30 lei" },
        { name: "Monkey 47 Tonic", price: "33 lei" },
        { name: "Malibu", variant: "Coke / Santal", price: "22 / 23 lei" },
      ]},
      { label: "COCKTAILURI PLACEBO (0% ALCOOL)", items: [
        { name: "Blue Lagoon", price: "15 lei" },
        { name: "Virgin Mojito", price: "15 lei" },
        { name: "Rainbow", price: "15 lei" },
        { name: "Vanilla Sky", price: "15 lei" },
        { name: "Summer Tonic", price: "13 lei" },
        { name: "Green Apple", price: "13 lei" },
        { name: "Vin Natureo 0%", variant: "pahar", price: "14 lei" },
        { name: "Whitley Tonic 0%", price: "25 lei" },
      ]},
    ],
  },
  {
    id: "shots", label: "Shots", icon: "🥃",
    sections: [{
      label: "SURSE DE NEBUNIE",
      items: [
        { name: "Rainbow", price: "9 lei" },
        { name: "Blowjob", price: "9 lei" },
        { name: "B52 / Cozonac", price: "9 lei" },
        { name: "Kamikaze", variant: "minim 4 buc.", price: "9 lei" },
        { name: "Godfather / Mother", price: "9 lei" },
        { name: "Amaretto Sour", variant: "minim 4 buc.", price: "9 lei" },
        { name: "Brain Damage", price: "9 lei" },
        { name: "Tequila Cazable", price: "14 lei" },
        { name: "Moartea Căprioarei", price: "14 lei" },
        { name: "Absinth", price: "12 lei" },
        { name: "Amaro del Capo", price: "11 lei" },
      ],
    }],
  },
  {
    id: "racoritoare", label: "Răcoritoare", icon: "🧊",
    sections: [{
      items: [
        { name: "Cătină Pahar", variant: "300ml", price: "10 lei" },
        { name: "Pepsi / Mirinda / 7UP", price: "9 lei" },
        { name: "Apă Plată / Minerală", price: "7 lei" },
        { name: "Santal Pahar", price: "7 lei" },
        { name: "Red Bull", price: "10 lei" },
        { name: "Fi-Ga", price: "15 lei" },
        { name: "Fresh Portocale", variant: "300ml", price: "10 lei" },
        { name: "Limonadă", variant: "Simplă / Mentă / Sirop (Dozator)", price: "7 / 8 / 10 lei" },
        { name: "Ice Tea", price: "9 lei" },
      ],
    }],
  },
];

const MenuItemRow = ({ item }: { item: MenuItem }) => (
  <div
    className="flex items-baseline py-3 group hover:bg-white/[0.02] transition-colors"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
  >
    <span className="font-body text-[15px] text-white shrink-0">{item.name}</span>
    {item.variant && (
      <span className="font-body text-[12px] text-white/40 ml-2 shrink-0">{item.variant}</span>
    )}
    <span className="flex-1 mx-3 mb-1 border-b border-dotted border-white/10" />
    <span className="font-body text-[15px] text-amber shrink-0">{item.price}</span>
  </div>
);

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("cafea");
  const activeData = tabs.find((t) => t.id === activeTab)!;

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar showBack />
      <main data-cursor="menu" className="min-h-screen pt-16" style={{ background: "#080808" }}>
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-4">
          <span className="font-body text-[10px] tracking-[0.15em] text-amber uppercase">
            Rainbow Coffee &amp; More
          </span>
          <h1 className="font-heading text-[clamp(3.5rem,8vw,80px)] italic text-white mt-2">
            Meniu
          </h1>
          <div className="w-[60px] h-[2px] rainbow-line mx-auto mt-4" />
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <div className="flex justify-center gap-2 px-4 min-w-max mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-body text-[12px] uppercase tracking-[0.12em] px-6 py-3 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white border-b-2 border-white"
                    : "text-white/40 border-b-2 border-transparent hover:text-white/60"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-[720px] mx-auto px-6 py-8 pb-24"
          >
            {activeData.sections.map((section, si) => (
              <div key={si}>
                {section.label && (
                  <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-amber mt-8 mb-3">
                    {section.label}
                  </h3>
                )}
                {section.items.map((item, ii) => (
                  <MenuItemRow key={ii} item={item} />
                ))}
                {section.note && (
                  <p className="font-body text-[12px] text-white/30 italic mt-2">{section.note}</p>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Footer />
      </main>
    </>
  );
};

export default MenuPage;
