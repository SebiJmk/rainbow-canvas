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
  image: string;
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

const img = (q: string) => `https://images.unsplash.com/${q}?w=200&h=200&fit=crop&q=80`;

const tabs: MenuTab[] = [
  {
    id: "cafea", label: "Cafea", icon: "☕",
    sections: [
      {
        label: "Specialități",
        items: [
          { name: "Irish Coffee", price: "9 lei", image: img("photo-1509042239860-f550ce710b93") },
          { name: "Bailey's Coffee", price: "9 lei", image: img("photo-1461023058943-07fcbe16d735") },
          { name: "Flat White", price: "9 lei", image: img("photo-1572442388796-11668a67e53d") },
          { name: "Ciocolată caldă", price: "7 lei", image: img("photo-1517578239113-b03992dcdd25") },
        ],
      },
      {
        label: "Clasice",
        items: [
          { name: "Espresso", variant: "single / double", price: "5 / 7 lei", image: img("photo-1510707577719-ae7c14805e3a") },
          { name: "Cortado", price: "6 lei", image: img("photo-1485808191679-5f86510681a2") },
          { name: "Cappuccino", variant: "Single / Double", price: "7 / 10 lei", image: img("photo-1572442388796-11668a67e53d") },
          { name: "Caffe Latte", variant: "Single / Double", price: "8 / 10 lei", image: img("photo-1461023058943-07fcbe16d735") },
          { name: "Americano", variant: "Single / Double", price: "5 / 7 lei", image: img("photo-1497515114889-3f74b29a6e6c") },
        ],
      },
      {
        label: "Reci & Ceaiuri",
        items: [
          { name: "Espresso Freddo", price: "7 lei", image: img("photo-1517701550927-30cf4ba1dba5") },
          { name: "Ice Coffee", price: "8 lei", image: img("photo-1461023058943-07fcbe16d735") },
          { name: "Ceai", variant: "simplu / cu rom", price: "7 / 11 lei", image: img("photo-1544787219-7f47ccb76574") },
        ],
      },
    ],
  },
  {
    id: "bere", label: "Bere", icon: "🍺",
    sections: [
      { label: "La Draught", items: [
        { name: "Peroni Nastro Azzurro", variant: "400ml", price: "14 lei", image: img("photo-1608270586620-248524c67de9") },
        { name: "Ursus Premium", variant: "400ml", price: "10 lei", image: img("photo-1535958636474-b021ee887b13") },
        { name: "Azuga Nefiltrata", variant: "500ml", price: "15 lei", image: img("photo-1558642452-9d2a7deb7f62") },
        { name: "Azuga Helles", variant: "500ml", price: "15 lei", image: img("photo-1558642452-9d2a7deb7f62") },
        { name: "Ursus IPA", variant: "400ml", price: "15 lei", image: img("photo-1535958636474-b021ee887b13") },
      ]},
      { label: "La Sticlă", items: [
        { name: "Peroni Nastro Azzurro", variant: "500ml", price: "14 lei", image: img("photo-1608270586620-248524c67de9") },
        { name: "Peroni Stile Capri", variant: "330ml", price: "12 lei", image: img("photo-1608270586620-248524c67de9") },
        { name: "Ursus Premium", variant: "500ml", price: "10 lei", image: img("photo-1535958636474-b021ee887b13") },
        { name: "Asahi Super Dry", variant: "330ml", price: "15 lei", image: img("photo-1535958636474-b021ee887b13") },
      ]},
      { label: "Craft & Specialități", items: [
        { name: "Ursus Black", variant: "330ml", price: "10 lei", image: img("photo-1535958636474-b021ee887b13") },
        { name: "Ursus IPA", variant: "330ml", price: "12 lei", image: img("photo-1535958636474-b021ee887b13") },
        { name: "Azuga Nepasteurizată", variant: "500ml", price: "15 lei", image: img("photo-1558642452-9d2a7deb7f62") },
        { name: "Azuga Weissbier", variant: "500ml", price: "15 lei", image: img("photo-1558642452-9d2a7deb7f62") },
      ]},
      { label: "Fără Alcool", items: [
        { name: "Peroni 0.0%", variant: "330ml", price: "12 lei", image: img("photo-1608270586620-248524c67de9") },
        { name: "Ursus Cooler", variant: "330ml", price: "10 lei", image: img("photo-1535958636474-b021ee887b13") },
      ]},
    ],
  },
  {
    id: "vinuri", label: "Vinuri", icon: "🍷",
    sections: [
      { label: "Alb & Prosecco", items: [
        { name: "Pahar Prosecco", price: "10 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Prosecco Terra Serena", variant: "Alb / Rosé", price: "70 / 80 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Prosecco Millesimato DOCG", price: "130 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Navigo", variant: "Alb / Rosé / pahar", price: "70 / 70 / 18 lei", image: img("photo-1510812431401-41d2bd2722f3") },
        { name: "Mysterium", variant: "Alb / Rosé", price: "85 lei", image: img("photo-1510812431401-41d2bd2722f3") },
        { name: "Nocturne Chardonnay", price: "95 lei", image: img("photo-1510812431401-41d2bd2722f3") },
      ]},
      { label: "Rosé Premium", items: [
        { name: "Charme de Mer", price: "170 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Côtes de Provence AOP", price: "210 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Mandrarossa", price: "130 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Esmeralda", variant: "Rosé / pahar", price: "80 / 18 lei", image: img("photo-1510812431401-41d2bd2722f3") },
      ]},
      { label: "Roșu", items: [
        { name: "Talo Primitivo di Manduria", price: "140 lei", image: img("photo-1510812431401-41d2bd2722f3") },
        { name: "Frescobaldi Castello Rufina", price: "210 lei", image: img("photo-1510812431401-41d2bd2722f3") },
        { name: "Ninfa Marche Rosso", price: "170 lei", image: img("photo-1510812431401-41d2bd2722f3") },
        { name: "Montepulciano D'Abruzzo", price: "80 lei", image: img("photo-1510812431401-41d2bd2722f3") },
      ]},
    ],
  },
  {
    id: "cocktailuri", label: "Cocktailuri", icon: "🍹",
    sections: [
      { label: "Signature & Clasice", items: [
        { name: "Rainbow", price: "22 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Mojito", price: "19 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Aperol Spritz", price: "22 lei", image: img("photo-1560512823-829485b8bf24") },
        { name: "Hugo", price: "23 lei", image: img("photo-1558618666-fcd25c85cd64") },
        { name: "Negroni", price: "22 lei", image: img("photo-1551751299-1b51cab2694c") },
        { name: "Cosmopolitan", price: "25 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Long Island", price: "25 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Margarita", price: "25 lei", image: img("photo-1551538827-9c037cb4f32a") },
      ]},
      { label: "Cu Gin", items: [
        { name: "Gin Tonic", price: "20 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Whitley Tonic", price: "27 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Hendrick's Tonic", price: "30 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Monkey 47 Tonic", price: "33 lei", image: img("photo-1551538827-9c037cb4f32a") },
      ]},
      { label: "Aromate & Sweet", items: [
        { name: "ORGASMmm", price: "23 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Honey Bunny", price: "22 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Vanilla Sky", price: "23 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Mai Tai", price: "23 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Blue Lagoon", price: "22 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Amaretto Sour", price: "20 lei", image: img("photo-1551538827-9c037cb4f32a") },
      ]},
      { label: "Placebo · 0% Alcool", items: [
        { name: "Blue Lagoon", price: "15 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Virgin Mojito", price: "15 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Rainbow", price: "15 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Vanilla Sky", price: "15 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Summer Tonic", price: "13 lei", image: img("photo-1551538827-9c037cb4f32a") },
      ]},
    ],
  },
  {
    id: "shots", label: "Shots", icon: "🥃",
    sections: [{
      label: "Surse de Nebunie",
      items: [
        { name: "Rainbow", price: "9 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Blowjob", price: "9 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "B52 / Cozonac", price: "9 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Kamikaze", variant: "minim 4 buc.", price: "9 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Brain Damage", price: "9 lei", image: img("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Tequila Cazable", price: "14 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Absinth", price: "12 lei", image: img("photo-1551538827-9c037cb4f32a") },
        { name: "Amaro del Capo", price: "11 lei", image: img("photo-1551538827-9c037cb4f32a") },
      ],
    }],
  },
  {
    id: "racoritoare", label: "Răcoritoare", icon: "🧊",
    sections: [
      { label: "Fresh & Natural", items: [
        { name: "Cătină Pahar", variant: "300ml", price: "10 lei", image: img("photo-1544787219-7f47ccb76574") },
        { name: "Fresh Portocale", variant: "300ml", price: "10 lei", image: img("photo-1621506289937-a8e4df240d0b") },
        { name: "Limonadă", variant: "Simplă / Mentă / Sirop", price: "7 / 8 / 10 lei", image: img("photo-1621506289937-a8e4df240d0b") },
      ]},
      { label: "Clasice", items: [
        { name: "Pepsi / Mirinda / 7UP", price: "9 lei", image: img("photo-1581006852262-e4307cf6283a") },
        { name: "Apă Plată / Minerală", price: "7 lei", image: img("photo-1581006852262-e4307cf6283a") },
        { name: "Red Bull", price: "10 lei", image: img("photo-1581006852262-e4307cf6283a") },
        { name: "Ice Tea", price: "9 lei", image: img("photo-1581006852262-e4307cf6283a") },
        { name: "Santal Pahar", price: "7 lei", image: img("photo-1581006852262-e4307cf6283a") },
        { name: "Fi-Ga", price: "15 lei", image: img("photo-1581006852262-e4307cf6283a") },
      ]},
    ],
  },
];

const MenuItemCard = ({ item }: { item: MenuItem }) => (
  <div
    className="flex items-center gap-4 p-3 rounded-lg group hover:bg-white/[0.03] transition-colors duration-200"
  >
    <div className="w-[80px] h-[80px] rounded-lg overflow-hidden shrink-0 bg-white/5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-body text-[15px] text-white font-medium truncate">{item.name}</h4>
      {item.variant && (
        <p className="font-body text-[12px] text-white/35 mt-0.5 truncate">{item.variant}</p>
      )}
      <p className="font-body text-[15px] text-amber font-semibold mt-1">{item.price}</p>
    </div>
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

        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex justify-center gap-1 px-4 min-w-max mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-body text-[12px] uppercase tracking-[0.1em] px-5 py-3 transition-all whitespace-nowrap rounded-full ${
                  activeTab === tab.id
                    ? "text-white bg-white/10"
                    : "text-white/40 hover:text-white/60"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-[900px] mx-auto px-4 py-8 pb-24"
          >
            {activeData.sections.map((section, si) => (
              <div key={si} className="mb-8">
                {section.label && (
                  <div className="flex items-center gap-3 mb-4 mt-4">
                    <div className="w-[3px] h-5 rainbow-line rounded-full" />
                    <h3 className="font-body text-[11px] tracking-[0.18em] uppercase text-amber">
                      {section.label}
                    </h3>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {section.items.map((item, ii) => (
                    <MenuItemCard key={ii} item={item} />
                  ))}
                </div>
                {section.note && (
                  <p className="font-body text-[12px] text-white/30 italic mt-3 pl-3">{section.note}</p>
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
