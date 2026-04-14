import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const tabs = [
  { id: "cafea", label: "☕ Cafea" },
  { id: "bere", label: "🍺 Bere" },
  { id: "vinuri", label: "🍷 Vinuri" },
  { id: "cocktailuri", label: "🍹 Cocktailuri" },
  { id: "shots", label: "🥃 Shots" },
  { id: "racoritoare", label: "🧊 Răcoritoare" },
];

interface MenuItem { name: string; price: string; note?: string }
interface MenuSubSection { title?: string; items: MenuItem[] }

const menuData: Record<string, MenuSubSection[]> = {
  cafea: [{
    items: [
      { name: "Espresso single / double", price: "5 / 7 lei" },
      { name: "Cortado", price: "6 lei" },
      { name: "Cappuccino Single / Double", price: "7 / 10 lei" },
      { name: "Caffe Latte Single / Double", price: "8 / 10 lei" },
      { name: "Flat White", price: "9 lei" },
      { name: "Irish Coffee", price: "9 lei" },
      { name: "Bailey's Coffee", price: "9 lei" },
      { name: "Americano Single / Double", price: "5 / 7 lei" },
      { name: "Ciocolată caldă", price: "7 lei" },
      { name: "Ceai simplu / cu rom", price: "7 / 11 lei" },
      { name: "Espresso Freddo", price: "7 lei" },
      { name: "Ice Coffee", price: "8 lei" },
    ],
  }],
  bere: [
    {
      title: "BERE LA DRAUGHT",
      items: [
        { name: "Peroni Nastro Azzurro 400ml", price: "14 lei" },
        { name: "Ursus Premium 400ml", price: "10 lei" },
        { name: "Azuga Nefiltrata 500ml", price: "15 lei" },
        { name: "Azuga Helles 500ml", price: "15 lei" },
        { name: "Ursus IPA 400ml", price: "15 lei" },
      ],
    },
    {
      title: "BERE LA STICLĂ",
      items: [
        { name: "Peroni Nastro Azzurro 500ml", price: "14 lei" },
        { name: "Peroni Stile Capri 330ml", price: "12 lei" },
        { name: "Ursus Premium 500ml", price: "10 lei" },
        { name: "Asahi Super Dry 330ml", price: "15 lei" },
      ],
    },
    {
      title: "SPECIALITĂȚI BERE",
      items: [
        { name: "Ursus Black 330ml", price: "10 lei" },
        { name: "Ursus IPA 330ml", price: "12 lei" },
      ],
    },
    {
      title: "BERE FĂRĂ ALCOOL",
      items: [
        { name: "Peroni Nastro Azzurro 0.0% 330ml", price: "12 lei" },
        { name: "Ursus Cooler 330ml (Lămâie / Cherry / Grapefruit)", price: "10 lei" },
      ],
    },
    {
      title: "BERE CRAFT",
      items: [
        { name: "Azuga Nepasteurizată 500ml", price: "15 lei" },
        { name: "Azuga Weissbier (Nefiltrata) 500ml", price: "15 lei" },
        { name: "Azuga Helles 500ml", price: "15 lei" },
      ],
    },
    {
      title: "OFERTE",
      items: [
        { name: "Pachet Havana 1L + 4 Răcoritoare / 1 Santal", price: "250 lei", note: "Întrebați barmanul despre ofertele cu frapiere" },
        { name: "Ofertă Grup: Dispenser Ursus 2.4L", price: "65 lei" },
      ],
    },
  ],
  vinuri: [
    {
      title: "BĂUTURA ZEILOR (Vinuri Albe & Roze)",
      items: [
        { name: "Pahar Prosecco", price: "10 lei" },
        { name: "Prosecco Terra Serena Alb / Rosé", price: "70 / 80 lei" },
        { name: "Prosecco Millesimato Valdobiadene DOCG Alb", price: "130 lei" },
        { name: "Castel D'or Cava Brut", price: "90 lei" },
        { name: "Navigo Alb / Rosé / pahar", price: "70 / 70 / 18 lei" },
        { name: "Mysterium Alb / Rosé", price: "85 lei" },
        { name: "Ana / Maria Alb", price: "110 lei" },
        { name: "Esmeralda Alb / Rosé / pahar", price: "80 / 80 / 18 lei" },
        { name: "Tomassi Lugana Alb", price: "110 lei" },
        { name: "Aerosoli Rosé / Alb", price: "80 lei" },
        { name: "Bulgarini Lugana Alb", price: "160 lei" },
        { name: "Charme de Mer Rosé", price: "170 lei" },
        { name: "Côtes de Provence AOP Rosé", price: "210 lei" },
        { name: "Nocturne Chardonnay / Pinot Grigio", price: "95 lei" },
        { name: "Grillo Costadune DOC Alb", price: "110 lei" },
        { name: "Caii de la Letea Aligote / Rosé / Cabernet", price: "120 lei" },
        { name: "Mandrarossa Rosé", price: "130 lei" },
        { name: "Villa Angela Alb", price: "130 lei" },
        { name: "Marche IGT Rosé", price: "115 lei" },
      ],
    },
    {
      title: "VIN ROȘU",
      items: [
        { name: "Talo Primitivo di Manduria", price: "140 lei" },
        { name: "Nocture Rară Neagră", price: "95 lei" },
        { name: "Frescobaldi Castello Rufina", price: "210 lei" },
        { name: "Ninfa Marche Rosso", price: "170 lei" },
        { name: "Montepulciano D'Abruzzo", price: "80 lei" },
      ],
    },
  ],
  cocktailuri: [
    {
      title: "SURSE DE INSPIRAȚIE",
      items: [
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
        { name: "Campari Orange / Tonic", price: "22 / 21 lei" },
        { name: "Vodka Tonic / Santal", price: "20 / 21 lei" },
        { name: "Cosmopolitan", price: "25 lei" },
        { name: "Margarita", price: "25 lei" },
        { name: "Amaretto Sour", price: "20 lei" },
        { name: "Blue Lagoon", price: "22 lei" },
        { name: "Cuba Libre", price: "20 lei" },
        { name: "Gin Tonic", price: "20 lei" },
        { name: "Whitley Tonic", price: "27 lei" },
        { name: "Hendrick's Tonic", price: "30 lei" },
        { name: "Monkey 47 Tonic", price: "33 lei" },
        { name: "Malibu Coke / Santal", price: "22 / 23 lei" },
      ],
    },
    {
      title: "COCKTAILURI PLACEBO (fără alcool)",
      items: [
        { name: "Blue Lagoon", price: "15 lei" },
        { name: "Virgin Mojito", price: "15 lei" },
        { name: "Rainbow", price: "15 lei" },
        { name: "Vanilla Sky", price: "15 lei" },
        { name: "Summer Tonic", price: "13 lei" },
        { name: "Green Apple", price: "13 lei" },
        { name: "Vin Natureo 0% pahar", price: "14 lei" },
        { name: "Whitley Tonic 0%", price: "25 lei" },
      ],
    },
  ],
  shots: [{
    title: "SURSE DE NEBUNIE",
    items: [
      { name: "Rainbow", price: "9 lei" },
      { name: "Blowjob", price: "9 lei" },
      { name: "B52 / Cozonac", price: "9 lei" },
      { name: "Kamikaze (minim 4 buc.)", price: "9 lei" },
      { name: "Godfather / Mother", price: "9 lei" },
      { name: "Amaretto Sour (minim 4 buc.)", price: "9 lei" },
      { name: "Brain Damage", price: "9 lei" },
      { name: "Tequila Cazable", price: "14 lei" },
      { name: "Moartea Căprioarei", price: "14 lei" },
      { name: "Absinth", price: "12 lei" },
      { name: "Amaro del Capo", price: "11 lei" },
    ],
  }],
  racoritoare: [{
    items: [
      { name: "Cătină Pahar 300ml", price: "10 lei" },
      { name: "Pepsi / Mirinda / 7UP", price: "9 lei" },
      { name: "Apă Plată / Minerală", price: "7 lei" },
      { name: "Santal Pahar", price: "7 lei" },
      { name: "Red Bull", price: "10 lei" },
      { name: "Fi-Ga", price: "15 lei" },
      { name: "Fresh Portocale 300ml", price: "10 lei" },
      { name: "Limonadă Simplă / Mentă sau Sirop / Dozator", price: "7 / 8 / 10 lei" },
      { name: "Ice Tea", price: "9 lei" },
    ],
  }],
};

const cursorMap: Record<string, string> = {
  cafea: "menu",
  bere: "beer",
  vinuri: "wine",
  cocktailuri: "cocktails",
  shots: "shots",
  racoritoare: "menu",
};

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState("cafea");

  return (
    <section id="menu" data-cursor={cursorMap[activeTab]} className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Meniul Nostru" />

      {/* Tab pills */}
      <div className="flex gap-2 mt-10 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-body transition-all shrink-0 ${
              activeTab === tab.id
                ? "rainbow-gradient text-background font-semibold"
                : "bg-secondary text-secondary-foreground hover:bg-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          {menuData[activeTab]?.map((section, si) => (
            <div key={si} className="mb-8">
              {section.title && (
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">
                  {section.title}
                </h3>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {section.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-transparent hover:-translate-y-1 transition-all duration-200 group"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderImage =
                        "linear-gradient(135deg, hsl(0,100%,60%,0.4), hsl(140,70%,45%,0.4), hsl(280,80%,60%,0.4)) 1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderImage = "none";
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-sm text-foreground truncate">{item.name}</p>
                      {item.note && (
                        <p className="text-xs text-muted-foreground italic mt-1">{item.note}</p>
                      )}
                    </div>
                    <p className="gold-text font-semibold text-sm ml-4 shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default MenuSection;
