import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import ProductDrawer, { type ProductDetail } from "@/components/ProductDrawer";

interface MenuItem {
  name: string;
  price: string;
  variant?: string;
  image: string;
  description?: string;
  ingredients?: string;
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

const u = (id: string) => `https://images.unsplash.com/${id}?w=200&h=200&fit=crop&q=80`;

const tabs: MenuTab[] = [
  {
    id: "cafea", label: "Cafea", icon: "☕",
    sections: [
      {
        label: "Specialități",
        items: [
          { name: "Irish Coffee", price: "9 lei", image: u("photo-1509042239860-f550ce710b93"), description: "Espresso proaspăt, whisky irlandez, zahăr brun și smântână.", ingredients: "Espresso, Irish Whiskey, zahăr brun, smântână" },
          { name: "Bailey's Coffee", price: "9 lei", image: u("photo-1485808191679-5f86510681a2"), description: "Cafea fierbinte cu lichior Bailey's Irish Cream.", ingredients: "Espresso, Bailey's, smântână" },
          { name: "Flat White", price: "9 lei", image: u("photo-1572442388796-11668a67e53d"), description: "Espresso dublu cu microfoam mătăsos.", ingredients: "Espresso dublu, lapte texturizat" },
          { name: "Ciocolată caldă", price: "7 lei", image: u("photo-1517578239113-b03992dcdd25"), description: "Ciocolată belgiană topită cu lapte cremos.", ingredients: "Ciocolată belgiană, lapte, frișcă" },
        ],
      },
      {
        label: "Clasice",
        items: [
          { name: "Espresso", variant: "single / double", price: "5 / 7 lei", image: u("photo-1510707577719-ae7c14805e3a") },
          { name: "Cortado", price: "6 lei", image: u("photo-1495474472287-4d71bcdd2085") },
          { name: "Cappuccino", variant: "Single / Double", price: "7 / 10 lei", image: u("photo-1534778101976-62847782c213") },
          { name: "Caffe Latte", variant: "Single / Double", price: "8 / 10 lei", image: u("photo-1461023058943-07fcbe16d735") },
          { name: "Americano", variant: "Single / Double", price: "5 / 7 lei", image: u("photo-1497515114889-3f74b29a6e6c") },
        ],
      },
      {
        label: "Reci & Ceaiuri",
        items: [
          { name: "Espresso Freddo", price: "7 lei", image: u("photo-1517701550927-30cf4ba1dba5") },
          { name: "Ice Coffee", price: "8 lei", image: u("photo-1461023058943-07fcbe16d735") },
          { name: "Ceai", variant: "simplu / cu rom", price: "7 / 11 lei", image: u("photo-1544787219-7f47ccb76574") },
        ],
      },
    ],
  },
  {
    id: "bere", label: "Bere", icon: "🍺",
    sections: [
      { label: "La Draught", items: [
        { name: "Peroni Nastro Azzurro", variant: "400ml", price: "14 lei", image: u("photo-1608270586620-248524c67de9") },
        { name: "Ursus Premium", variant: "400ml", price: "10 lei", image: u("photo-1535958636474-b021ee887b13") },
        { name: "Azuga Nefiltrata", variant: "500ml", price: "15 lei", image: u("photo-1566633806327-68e152aaf26d") },
        { name: "Azuga Helles", variant: "500ml", price: "15 lei", image: u("photo-1618183479302-1e0aa382c36b") },
        { name: "Ursus IPA", variant: "400ml", price: "15 lei", image: u("photo-1600788886242-5c96aabe3757") },
      ]},
      { label: "La Sticlă", items: [
        { name: "Peroni Nastro Azzurro", variant: "500ml", price: "14 lei", image: u("photo-1558642452-9d2a7deb7f62") },
        { name: "Peroni Stile Capri", variant: "330ml", price: "12 lei", image: u("photo-1571613316887-6f8d5cbf7ef7") },
        { name: "Ursus Premium", variant: "500ml", price: "10 lei", image: u("photo-1612528443702-f6741f70a049") },
        { name: "Asahi Super Dry", variant: "330ml", price: "15 lei", image: u("photo-1574073515137-2e4c4b51c4a7") },
      ]},
      { label: "Craft & Specialități", items: [
        { name: "Ursus Black", variant: "330ml", price: "10 lei", image: u("photo-1532634922-8fe0b757fb13") },
        { name: "Ursus IPA", variant: "330ml", price: "12 lei", image: u("photo-1569529465841-dfecdab7503b") },
        { name: "Azuga Nepasteurizată", variant: "500ml", price: "15 lei", image: u("photo-1535958636474-b021ee887b13") },
        { name: "Azuga Weissbier", variant: "500ml", price: "15 lei", image: u("photo-1567696911980-2eed69a46042") },
      ]},
      { label: "Fără Alcool", items: [
        { name: "Peroni 0.0%", variant: "330ml", price: "12 lei", image: u("photo-1608270586620-248524c67de9") },
        { name: "Ursus Cooler", variant: "330ml", price: "10 lei", image: u("photo-1600788886242-5c96aabe3757") },
      ]},
    ],
  },
  {
    id: "vinuri", label: "Vinuri", icon: "🍷",
    sections: [
      { label: "Alb & Prosecco", items: [
        { name: "Pahar Prosecco", price: "10 lei", image: u("photo-1558618666-fcd25c85cd64") },
        { name: "Prosecco Terra Serena", variant: "Alb / Rosé", price: "70 / 80 lei", image: u("photo-1578911373434-0cb395d2cbfb") },
        { name: "Prosecco Millesimato DOCG", price: "130 lei", image: u("photo-1584916201218-f4242ceb4809") },
        { name: "Navigo", variant: "Alb / Rosé / pahar", price: "70 / 70 / 18 lei", image: u("photo-1553361371-9b22f78e8b1d") },
        { name: "Mysterium", variant: "Alb / Rosé", price: "85 lei", image: u("photo-1566995541428-f05db0b8faa5") },
        { name: "Nocturne Chardonnay", price: "95 lei", image: u("photo-1547595628-c61a29f496f0") },
      ]},
      { label: "Rosé Premium", items: [
        { name: "Charme de Mer", price: "170 lei", image: u("photo-1558618666-fcd25c85cd64"), description: "Rosé premium din Provence, note florale delicate.", ingredients: "Grenache, Cinsault — Provence, Franța" },
        { name: "Côtes de Provence AOP", price: "210 lei", image: u("photo-1510812431401-41d2bd2722f3"), description: "Rosé de excepție cu mineralitate fină.", ingredients: "Grenache, Cinsault, Mourvèdre — Provence, Franța" },
        { name: "Mandrarossa", price: "130 lei", image: u("photo-1568213816046-0ee1c42bd559") },
        { name: "Esmeralda", variant: "Rosé / pahar", price: "80 / 18 lei", image: u("photo-1474722883778-792e7990302f") },
      ]},
      { label: "Roșu", items: [
        { name: "Talo Primitivo di Manduria", price: "140 lei", image: u("photo-1506377247377-2a5b3b417ebb") },
        { name: "Frescobaldi Castello Rufina", price: "210 lei", image: u("photo-1586370434639-0fe43b2d32e6") },
        { name: "Ninfa Marche Rosso", price: "170 lei", image: u("photo-1561461056-77634126673a") },
        { name: "Montepulciano D'Abruzzo", price: "80 lei", image: u("photo-1510812431401-41d2bd2722f3") },
      ]},
    ],
  },
  {
    id: "cocktailuri", label: "Cocktailuri", icon: "🍹",
    sections: [
      { label: "Signature & Clasice", items: [
        { name: "Rainbow", price: "22 lei", image: u("photo-1514362545857-3bc16c4c7d1b"), description: "Semnătura Rainbow — straturi de culoare și gust.", ingredients: "Vodkă, sirop de mango, sirop de căpșuni, blue curaçao, lime, soda" },
        { name: "Mojito", price: "19 lei", image: u("photo-1551538827-9c037cb4f32a"), description: "Classic Cuban refreshment.", ingredients: "Rom alb, lime, mentă, zahăr, soda" },
        { name: "Aperol Spritz", price: "22 lei", image: u("photo-1560512823-829485b8bf24"), description: "Italian aperitivo iconic.", ingredients: "Aperol, Prosecco, soda, felie de portocală" },
        { name: "Hugo", price: "23 lei", image: u("photo-1536599018102-9f803c140fc1") },
        { name: "Negroni", price: "22 lei", image: u("photo-1551751299-1b51cab2694c"), description: "Bitter, bold, și perfect echilibrat.", ingredients: "Gin, Campari, Vermouth roșu" },
        { name: "Cosmopolitan", price: "25 lei", image: u("photo-1546171753-97d7676e4602") },
        { name: "Long Island", price: "25 lei", image: u("photo-1536935338788-846bb9981813") },
        { name: "Margarita", price: "25 lei", image: u("photo-1544145945-f90425340c7e") },
      ]},
      { label: "Cu Gin", items: [
        { name: "Gin Tonic", price: "20 lei", image: u("photo-1551538827-9c037cb4f32a") },
        { name: "Whitley Tonic", price: "27 lei", image: u("photo-1587223962930-cb7f31384c19") },
        { name: "Hendrick's Tonic", price: "30 lei", image: u("photo-1527661591475-527312dd65f5") },
        { name: "Monkey 47 Tonic", price: "33 lei", image: u("photo-1570598912132-0ba1dc952b7d") },
      ]},
      { label: "Aromate & Sweet", items: [
        { name: "ORGASMmm", price: "23 lei", image: u("photo-1582056615449-5f0e4b0e7d2e") },
        { name: "Honey Bunny", price: "22 lei", image: u("photo-1560963689-b5682b6440f8") },
        { name: "Vanilla Sky", price: "23 lei", image: u("photo-1541546006121-e8e0e6a97ef2") },
        { name: "Mai Tai", price: "23 lei", image: u("photo-1536599424071-0b2a1f97f726") },
        { name: "Blue Lagoon", price: "22 lei", image: u("photo-1556679343-c7306c1976bc") },
        { name: "Amaretto Sour", price: "20 lei", image: u("photo-1514362545857-3bc16c4c7d1b") },
      ]},
      { label: "Placebo · 0% Alcool", items: [
        { name: "Blue Lagoon", price: "15 lei", image: u("photo-1560963689-b5682b6440f8") },
        { name: "Virgin Mojito", price: "15 lei", image: u("photo-1544145945-f90425340c7e") },
        { name: "Rainbow", price: "15 lei", image: u("photo-1546171753-97d7676e4602") },
        { name: "Vanilla Sky", price: "15 lei", image: u("photo-1541546006121-e8e0e6a97ef2") },
        { name: "Summer Tonic", price: "13 lei", image: u("photo-1570598912132-0ba1dc952b7d") },
      ]},
    ],
  },
  {
    id: "shots", label: "Shots", icon: "🥃",
    sections: [{
      label: "Surse de Nebunie",
      items: [
        { name: "Rainbow", price: "9 lei", image: u("photo-1514362545857-3bc16c4c7d1b") },
        { name: "Blowjob", price: "9 lei", image: u("photo-1582056615449-5f0e4b0e7d2e") },
        { name: "B52 / Cozonac", price: "9 lei", image: u("photo-1560963689-b5682b6440f8") },
        { name: "Kamikaze", variant: "minim 4 buc.", price: "9 lei", image: u("photo-1556679343-c7306c1976bc") },
        { name: "Brain Damage", price: "9 lei", image: u("photo-1541546006121-e8e0e6a97ef2") },
        { name: "Tequila Cazable", price: "14 lei", image: u("photo-1546171753-97d7676e4602") },
        { name: "Absinth", price: "12 lei", image: u("photo-1527661591475-527312dd65f5") },
        { name: "Amaro del Capo", price: "11 lei", image: u("photo-1587223962930-cb7f31384c19") },
      ],
    }],
  },
  {
    id: "racoritoare", label: "Răcoritoare", icon: "🧊",
    sections: [
      { label: "Fresh & Natural", items: [
        { name: "Cătină Pahar", variant: "300ml", price: "10 lei", image: u("photo-1544787219-7f47ccb76574") },
        { name: "Fresh Portocale", variant: "300ml", price: "10 lei", image: u("photo-1621506289937-a8e4df240d0b") },
        { name: "Limonadă", variant: "Simplă / Mentă / Sirop", price: "7 / 8 / 10 lei", image: u("photo-1523371683773-affcaaf484a4") },
      ]},
      { label: "Clasice", items: [
        { name: "Pepsi / Mirinda / 7UP", price: "9 lei", image: u("photo-1581006852262-e4307cf6283a") },
        { name: "Apă Plată / Minerală", price: "7 lei", image: u("photo-1559839914-17aae19cec71") },
        { name: "Red Bull", price: "10 lei", image: u("photo-1527960471264-932f39eb5846") },
        { name: "Ice Tea", price: "9 lei", image: u("photo-1556679343-c7306c1976bc") },
        { name: "Santal Pahar", price: "7 lei", image: u("photo-1600271886742-f049cd451bba") },
        { name: "Fi-Ga", price: "15 lei", image: u("photo-1534353473418-4cfa6c56fd38") },
      ]},
    ],
  },
];

const MenuItemCard = ({ item, onClick }: { item: MenuItem; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 p-3 rounded-lg group hover:bg-white/[0.04] transition-all duration-200 cursor-none"
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
    <span className="font-body text-[11px] text-white/20 group-hover:text-white/40 transition-colors">→</span>
  </div>
);

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("cafea");
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const activeData = tabs.find((t) => t.id === activeTab)!;

  const openProduct = (item: MenuItem, category?: string) => {
    setSelectedProduct({
      name: item.name,
      price: item.price,
      variant: item.variant,
      image: item.image,
      description: item.description,
      ingredients: item.ingredients,
      category,
    });
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar showBack />
      <main data-cursor="menu" className="min-h-screen pt-16" style={{ background: "#080808" }}>
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
                    <MenuItemCard key={ii} item={item} onClick={() => openProduct(item, section.label)} />
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

      <ProductDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};

export default MenuPage;
