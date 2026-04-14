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
  description: string;
  ingredients: string;
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
    sections: [
      {
        label: "Specialități",
        items: [
          { name: "Irish Coffee", price: "9 lei", image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=200&h=200&fit=crop&q=80", description: "Espresso proaspăt, whisky irlandez, zahăr brun și smântână bătută ușor. Un clasic intemporal, cald și reconfortant.", ingredients: "Espresso, Irish Whiskey, zahăr brun, smântână bătută" },
          { name: "Bailey's Coffee", price: "9 lei", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop&q=80", description: "Cafea fierbinte îmbrăcată în crema dulce a lichiorului Bailey's Irish Cream. Desert lichid perfect.", ingredients: "Espresso dublu, Bailey's Irish Cream, smântână, cacao pudră" },
          { name: "Flat White", price: "9 lei", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=200&h=200&fit=crop&q=80", description: "Espresso dublu ristretto acoperit de microfoam mătăsos. Textură densă, gust intens.", ingredients: "Espresso dublu ristretto, lapte texturizat microfoam" },
          { name: "Ciocolată caldă", price: "7 lei", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop&q=80", description: "Ciocolată belgiană 70% topită lent cu lapte integral cremos. Comfort în formă lichidă.", ingredients: "Ciocolată belgiană 70%, lapte integral, frișcă, scorțișoară" },
        ],
      },
      {
        label: "Clasice",
        items: [
          { name: "Espresso", variant: "single / double", price: "5 / 7 lei", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop&q=80", description: "Extras la 9 bari din boabe de arabica 100%, cu cremă aurie densă.", ingredients: "Cafea arabica 100% single-origin" },
          { name: "Cortado", price: "6 lei", image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=200&h=200&fit=crop&q=80", description: "Espresso scurt tăiat cu lapte cald texturizat. Echilibru perfect între intensitate și dulceață.", ingredients: "Espresso, lapte texturizat (raport 1:1)" },
          { name: "Cappuccino", variant: "Single / Double", price: "7 / 10 lei", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&q=80", description: "Spumă densă de lapte peste espresso, finisată cu cacao sau latte art.", ingredients: "Espresso, lapte spumat, cacao opțional" },
          { name: "Caffe Latte", variant: "Single / Double", price: "8 / 10 lei", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200&h=200&fit=crop&q=80", description: "Lapte cremos texturizat peste espresso — moale, catifelos, reconfortant.", ingredients: "Espresso, lapte steamed, microfoam subțire" },
          { name: "Americano", variant: "Single / Double", price: "5 / 7 lei", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop&q=80", description: "Espresso alungit cu apă fierbinte, păstrând complexitatea aromelor.", ingredients: "Espresso, apă fierbinte" },
        ],
      },
      {
        label: "Reci & Ceaiuri",
        items: [
          { name: "Espresso Freddo", price: "7 lei", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop&q=80", description: "Espresso dublu răcit rapid și bătut cu gheață până devine cremos.", ingredients: "Espresso dublu, gheață, zahăr opțional" },
          { name: "Ice Coffee", price: "8 lei", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=200&h=200&fit=crop&q=80", description: "Cold brew infuzat 12 ore, servit peste gheață cu lapte rece.", ingredients: "Cafea cold brew 12h, gheață, lapte, sirop vanilie opțional" },
          { name: "Ceai", variant: "simplu / cu rom", price: "7 / 11 lei", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop&q=80", description: "Selecție de ceaiuri premium vrac: Earl Grey, verde jasmin, fructe de pădure sau mușețel.", ingredients: "Ceai vrac premium, miere, lămâie, rom (opțional)" },
        ],
      },
    ],
  },
  {
    id: "bere", label: "Bere", icon: "🍺",
    sections: [
      { label: "La Draught", items: [
        { name: "Peroni Nastro Azzurro", variant: "400ml", price: "14 lei", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80", description: "Lager italian premium cu aromă curată de malț și hamei Noble, finisaj sec și rafinat.", ingredients: "Malț de orz, hamei, porumb, apă de izvor italian" },
        { name: "Ursus Premium", variant: "400ml", price: "10 lei", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop&q=80", description: "Lager românesc cu corp mediu, note de cereale proaspete și amărăciune subtilă.", ingredients: "Malț de orz, hamei, apă de munte" },
        { name: "Azuga Nefiltrata", variant: "500ml", price: "15 lei", image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=200&h=200&fit=crop&q=80", description: "Bere artizanală nefiltrata din Azuga, tulbure, cu gust plin de drojdie naturală.", ingredients: "Malț, hamei, drojdie vie, apă de munte Azuga" },
        { name: "Azuga Helles", variant: "500ml", price: "15 lei", image: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=200&h=200&fit=crop&q=80", description: "Helles bavarez crafted în România, aurie, ușor dulceagă cu final curat.", ingredients: "Malț Pilsner, hamei Hallertau, apă, drojdie lager" },
        { name: "Ursus IPA", variant: "400ml", price: "15 lei", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=200&h=200&fit=crop&q=80", description: "India Pale Ale cu note citrice intense și amărăciune plăcută.", ingredients: "Malț pale ale, hamei Citra & Cascade, drojdie ale" },
      ]},
      { label: "La Sticlă", items: [
        { name: "Peroni Nastro Azzurro", variant: "500ml sticlă", price: "14 lei", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop&q=80", description: "Aceeași rețetă italiană din 1963, servită din sticla iconică albastră.", ingredients: "Malț de orz, hamei, porumb, apă de izvor" },
        { name: "Peroni Stile Capri", variant: "330ml", price: "12 lei", image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=200&h=200&fit=crop&q=80", description: "Lemon lager ușor și revigorant, inspirat de coastele italiene.", ingredients: "Malț, hamei, aromă naturală de lămâie" },
        { name: "Ursus Premium", variant: "500ml sticlă", price: "10 lei", image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=200&h=200&fit=crop&q=80", description: "Lager-ul românesc clasic, servit rece din sticlă.", ingredients: "Malț de orz, hamei, apă" },
        { name: "Asahi Super Dry", variant: "330ml", price: "15 lei", image: "https://images.unsplash.com/photo-1574073515137-2e4c4b51c4a7?w=200&h=200&fit=crop&q=80", description: "Bere japoneză legendară cu finisaj ultra-sec, karakuchi, curată și clară.", ingredients: "Malț, orez, hamei, drojdie Asahi #318" },
      ]},
      { label: "Craft & Specialități", items: [
        { name: "Ursus Black", variant: "330ml", price: "10 lei", image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=200&h=200&fit=crop&q=80", description: "Stout cu aromă de cafea prăjită și ciocolată neagră, corp plin.", ingredients: "Malț prăjit, malț caramel, hamei, drojdie" },
        { name: "Ursus IPA", variant: "330ml sticlă", price: "12 lei", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=200&h=200&fit=crop&q=80", description: "IPA românesc cu arome tropicale de mango și grapefruit.", ingredients: "Malț pale, hamei american, drojdie ale" },
        { name: "Azuga Nepasteurizată", variant: "500ml", price: "15 lei", image: "https://images.unsplash.com/photo-1504502350688-00f5d59bbdeb?w=200&h=200&fit=crop&q=80", description: "Bere vie, nepasteurizată, cu caracter autentic și enzime active.", ingredients: "Malț, hamei, drojdie vie nepasteurizată, apă" },
        { name: "Azuga Weissbier", variant: "500ml", price: "15 lei", image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=200&h=200&fit=crop&q=80", description: "Weizen bavarez cu arome de banană și cuișoară, tulbure natural.", ingredients: "Malț de grâu 60%, malț de orz, hamei, drojdie weizen" },
      ]},
      { label: "Fără Alcool", items: [
        { name: "Peroni 0.0%", variant: "330ml", price: "12 lei", image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=200&h=200&fit=crop&q=80", description: "Tot gustul italian, zero alcool. Perfectă pentru designated driver.", ingredients: "Malț de orz, hamei, apă — 0.0% alcool" },
        { name: "Ursus Cooler", variant: "330ml", price: "10 lei", image: "https://images.unsplash.com/photo-1603394151492-5e9b974b090b?w=200&h=200&fit=crop&q=80", description: "Bere fără alcool cu aromă de lămâie, refreshing și ușoară.", ingredients: "Malț, hamei, aromă naturală de lămâie — 0.0% alcool" },
      ]},
    ],
  },
  {
    id: "vinuri", label: "Vinuri", icon: "🍷",
    sections: [
      { label: "Alb & Prosecco", items: [
        { name: "Pahar Prosecco", price: "10 lei", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80", description: "Prosecco DOC la pahar, bule fine și persistente, note de măr verde și flori albe.", ingredients: "Glera 100% — Veneto, Italia" },
        { name: "Prosecco Terra Serena", variant: "Alb / Rosé", price: "70 / 80 lei", image: "https://images.unsplash.com/photo-1598306442928-4d90f32c6866?w=200&h=200&fit=crop&q=80", description: "Prosecco DOC cu perlaj delicat, perfect ca aperitiv sau pentru brunch.", ingredients: "Glera — Treviso, Italia" },
        { name: "Prosecco Millesimato DOCG", price: "130 lei", image: "https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=200&h=200&fit=crop&q=80", description: "Prosecco Superiore DOCG dintr-o singură recoltă, complexitate superioară.", ingredients: "Glera 100% — Valdobbiadene DOCG" },
        { name: "Navigo", variant: "Alb / Rosé / pahar", price: "70 / 70 / 18 lei", image: "https://images.unsplash.com/photo-1566995541428-f05db0b8faa5?w=200&h=200&fit=crop&q=80", description: "Vin românesc de la crama Navigo, proaspăt cu note fructate elegante.", ingredients: "Feteasca Albă, Sauvignon Blanc — Dobrogea" },
        { name: "Mysterium", variant: "Alb / Rosé", price: "85 lei", image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop&q=80", description: "Vin aromat cu eticheta misterioasă, blend complex și parfumat.", ingredients: "Tămâioasă Românească, Sauvignon Blanc — Jidvei" },
        { name: "Nocturne Chardonnay", price: "95 lei", image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=200&h=200&fit=crop&q=80", description: "Chardonnay maturat parțial în baric de stejar francez. Unt, vanilie, fructe galbene.", ingredients: "Chardonnay 100% — Dealu Mare" },
      ]},
      { label: "Rosé Premium", items: [
        { name: "Charme de Mer", price: "170 lei", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&q=80", description: "Rosé premium din Provence, note florale delicate, culoare somon palidă.", ingredients: "Grenache, Cinsault — Provence, Franța" },
        { name: "Côtes de Provence AOP", price: "210 lei", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop&q=80", description: "Rosé de excepție cu mineralitate fină și final lung, elegant.", ingredients: "Grenache, Cinsault, Mourvèdre — Provence, Franța" },
        { name: "Mandrarossa", price: "130 lei", image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=200&h=200&fit=crop&q=80", description: "Rosato sicilian vibrant, note de căpșuni și flori de hibiscus.", ingredients: "Nero d'Avola — Sicilia, Italia" },
        { name: "Esmeralda", variant: "Rosé / pahar", price: "80 / 18 lei", image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=200&h=200&fit=crop&q=80", description: "Rosé românesc elegant, proaspăt, perfect pentru serile de vară.", ingredients: "Merlot, Cabernet Sauvignon — Dealu Mare" },
      ]},
      { label: "Roșu", items: [
        { name: "Talo Primitivo di Manduria", price: "140 lei", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=200&h=200&fit=crop&q=80", description: "Roșu intens din Puglia, note de cireșe coapte, ciocolată și condimente.", ingredients: "Primitivo 100% — Manduria DOC, Puglia" },
        { name: "Frescobaldi Castello Rufina", price: "210 lei", image: "https://images.unsplash.com/photo-1510924199351-4e9d94df18a6?w=200&h=200&fit=crop&q=80", description: "Chianti Rufina DOCG de la celebra casă Frescobaldi, elegant și complex.", ingredients: "Sangiovese 100% — Toscana, Italia" },
        { name: "Ninfa Marche Rosso", price: "170 lei", image: "https://images.unsplash.com/photo-1546944517-4f38480ff03c?w=200&h=200&fit=crop&q=80", description: "Blend italian din Marche, corp mediu cu tanini mătăsoși și final lung.", ingredients: "Montepulciano, Sangiovese — Marche, Italia" },
        { name: "Montepulciano D'Abruzzo", price: "80 lei", image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=200&h=200&fit=crop&q=80", description: "Roșu accesibil cu fructe roșii coapte și tanini blânzi. Best value.", ingredients: "Montepulciano 100% — Abruzzo DOC" },
      ]},
    ],
  },
  {
    id: "cocktailuri", label: "Cocktailuri", icon: "🍹",
    sections: [
      { label: "Signature & Clasice", items: [
        { name: "Rainbow", price: "22 lei", image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=200&h=200&fit=crop&q=80", description: "Semnătura Rainbow — straturi colorate de siropuri artizanale și spirtoase premium.", ingredients: "Vodkă, sirop de mango, sirop de căpșuni, blue curaçao, lime, soda" },
        { name: "Mojito", price: "19 lei", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=200&h=200&fit=crop&q=80", description: "Clasicul cubanez: rom alb, mentă proaspătă, lime stors și soda. Revigorant.", ingredients: "Rom alb Havana Club, lime proaspăt, mentă, zahăr, soda" },
        { name: "Aperol Spritz", price: "22 lei", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=200&h=200&fit=crop&q=80", description: "Aperitivul italian iconic — amar dulce, bule de prosecco, felie de portocală.", ingredients: "Aperol, Prosecco DOC, soda, felie de portocală" },
        { name: "Hugo", price: "23 lei", image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=200&h=200&fit=crop&q=80", description: "Spritz cu flori de soc — ușor, parfumat, perfect pentru începutul serii.", ingredients: "Prosecco, sirop de flori de soc, soda, mentă, lime" },
        { name: "Negroni", price: "22 lei", image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=200&h=200&fit=crop&q=80", description: "Trio-ul legendar: gin, Campari, vermouth roșu. Bitter, bold, perfect echilibrat.", ingredients: "Gin Tanqueray, Campari, Vermouth Rosso, coajă de portocală" },
        { name: "Cosmopolitan", price: "25 lei", image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=200&h=200&fit=crop&q=80", description: "Vodkă citrus, Cointreau, suc de merișoare și lime. Elegant și memorabil.", ingredients: "Vodkă Citron, Cointreau, suc de merișoare, lime proaspăt" },
        { name: "Long Island", price: "25 lei", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=200&h=200&fit=crop&q=80", description: "Cinci spirtoase într-un singur pahar — surprinzător de echilibrat și periculos de ușor de băut.", ingredients: "Vodkă, gin, rom, tequila, triple sec, lemon, cola" },
        { name: "Margarita", price: "25 lei", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&q=80", description: "Tequila, Cointreau și lime — clasic mexican cu crustă de sare.", ingredients: "Tequila Reposado, Cointreau, lime proaspăt, sare" },
      ]},
      { label: "Cu Gin", items: [
        { name: "Gin Tonic", price: "20 lei", image: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=200&h=200&fit=crop&q=80", description: "Gin London Dry cu tonic premium și botanicals proaspete.", ingredients: "Gin Gordon's, tonic Fever-Tree, lemon, ienupăr" },
        { name: "Whitley Tonic", price: "27 lei", image: "https://images.unsplash.com/photo-1609345265499-2133bbeb0a0c?w=200&h=200&fit=crop&q=80", description: "Gin Whitley Neill cu tonic artizanal și garnish de grapefruit.", ingredients: "Whitley Neill Original, tonic premium, grapefruit" },
        { name: "Hendrick's Tonic", price: "30 lei", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=200&h=200&fit=crop&q=80", description: "Gin scoțian cu castravete și trandafir, servit cu tonic și felie de castravete.", ingredients: "Hendrick's Gin, tonic Fever-Tree, castravete proaspăt" },
        { name: "Monkey 47 Tonic", price: "33 lei", image: "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=200&h=200&fit=crop&q=80", description: "Cel mai complex gin din lume — 47 de botanicals din Pădurea Neagră.", ingredients: "Monkey 47 Schwarzwald, tonic premium, afine" },
      ]},
      { label: "Aromate & Sweet", items: [
        { name: "ORGASMmm", price: "23 lei", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop&q=80", description: "Cremos, dulce și irezistibil — lichior de cacao, Bailey's și Amaretto.", ingredients: "Bailey's, Amaretto, Kahlúa, smântână" },
        { name: "Honey Bunny", price: "22 lei", image: "https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=200&h=200&fit=crop&q=80", description: "Whisky cu miere naturală, lemon și o notă picantă de ghimbir.", ingredients: "Jack Daniel's Honey, lemon, ghimbir, miere de albine" },
        { name: "Vanilla Sky", price: "23 lei", image: "https://images.unsplash.com/photo-1541546006121-e8e0e6a97ef2?w=200&h=200&fit=crop&q=80", description: "Vodkă vanilată cu sirop de lavandă și suc de afine. Romantic.", ingredients: "Absolut Vanilia, sirop de lavandă, suc de afine, lemon" },
        { name: "Mai Tai", price: "23 lei", image: "https://images.unsplash.com/photo-1536599424071-0b2a1f97f726?w=200&h=200&fit=crop&q=80", description: "Cocktail tiki clasic — rom întunecat, Curaçao, orgeat și lime.", ingredients: "Rom dark, rom alb, orange curaçao, sirop orgeat, lime" },
        { name: "Blue Lagoon", price: "22 lei", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop&q=80", description: "Albastru intens din curaçao, vodkă și lemon — spectaculos vizual.", ingredients: "Vodkă, Blue Curaçao, lemon, sprite" },
        { name: "Amaretto Sour", price: "20 lei", image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=200&h=200&fit=crop&q=80", description: "Amaretto italian cu lemon proaspăt și albuș de ou pentru textură mătăsoasă.", ingredients: "Amaretto Disaronno, lemon, albuș de ou, sirop de zahăr" },
      ]},
      { label: "Placebo · 0% Alcool", items: [
        { name: "Blue Lagoon 0%", price: "15 lei", image: "https://images.unsplash.com/photo-1525385133512-2f3bdd585b39?w=200&h=200&fit=crop&q=80", description: "Varianta fără alcool — sirop de blue curaçao, lemon și sprite.", ingredients: "Sirop blue curaçao, lemon, sprite, gheață" },
        { name: "Virgin Mojito", price: "15 lei", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=200&h=200&fit=crop&q=80", description: "Toată prospețimea unui Mojito clasic, zero alcool.", ingredients: "Mentă proaspătă, lime, zahăr, soda, gheață" },
        { name: "Rainbow 0%", price: "15 lei", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed93d?w=200&h=200&fit=crop&q=80", description: "Versiunea soft a semnăturii casei — aceleași culori, același wow.", ingredients: "Sirop de mango, căpșuni, blue curaçao, lemon, soda" },
        { name: "Vanilla Sky 0%", price: "15 lei", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&q=80", description: "Lavandă și afine fără alcool, dulce și aromat.", ingredients: "Sirop de lavandă, suc de afine, lemon, soda" },
        { name: "Summer Tonic", price: "13 lei", image: "https://images.unsplash.com/photo-1558645836-e44122a743ee?w=200&h=200&fit=crop&q=80", description: "Tonic premium cu fructe de pădure și mentă. Revigorant, fără alcool.", ingredients: "Tonic Fever-Tree, fructe de pădure, mentă, gheață" },
      ]},
    ],
  },
  {
    id: "shots", label: "Shots", icon: "🥃",
    sections: [{
      label: "Surse de Nebunie",
      items: [
        { name: "Rainbow Shot", price: "9 lei", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200&h=200&fit=crop&q=80", description: "Straturile Rainbow în format concentrat — culoare și impact.", ingredients: "Grenadine, blue curaçao, vodkă" },
        { name: "Blowjob", price: "9 lei", image: "https://images.unsplash.com/photo-1582056615449-5f0e4b0e7d2e?w=200&h=200&fit=crop&q=80", description: "Shot cremos cu Bailey's și frișcă deasupra. Se bea fără mâini.", ingredients: "Bailey's, Kahlúa, frișcă" },
        { name: "B52", price: "9 lei", image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?w=200&h=200&fit=crop&q=80", description: "Trei straturi clasice: Kahlúa, Bailey's și Cointreau. Se poate aprinde.", ingredients: "Kahlúa, Bailey's, Cointreau" },
        { name: "Kamikaze", variant: "minim 4 buc.", price: "9 lei", image: "https://images.unsplash.com/photo-1528991435120-e73e05a58897?w=200&h=200&fit=crop&q=80", description: "Vodkă, triple sec și lime — rapid, curat, letal.", ingredients: "Vodkă, triple sec, lime proaspăt" },
        { name: "Brain Damage", price: "9 lei", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=200&h=200&fit=crop&q=80", description: "Shot cu efect vizual dramatic — Bailey's cade în peach schnapps.", ingredients: "Peach Schnapps, Bailey's, grenadine" },
        { name: "Tequila Cazable", price: "14 lei", image: "https://images.unsplash.com/photo-1585615728434-b7d46948e5de?w=200&h=200&fit=crop&q=80", description: "Tequila mexicană servită clasic cu sare și lime.", ingredients: "Tequila Cazable, sare, lime" },
        { name: "Absinth", price: "12 lei", image: "https://images.unsplash.com/photo-1578664182354-650e282891b0?w=200&h=200&fit=crop&q=80", description: "Zâna Verde — absinth ceh cu 70% alcool. Ritualul cu zahăr inclus.", ingredients: "Absinth, zahăr, apă rece" },
        { name: "Amaro del Capo", price: "11 lei", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=200&h=200&fit=crop&q=80", description: "Lichior italian de erbe din Calabria, servit la -20°C. Digestiv perfect.", ingredients: "Amaro del Capo — erbe calabreze, servit înghețat" },
      ],
    }],
  },
  {
    id: "racoritoare", label: "Răcoritoare", icon: "🧊",
    sections: [
      { label: "Fresh & Natural", items: [
        { name: "Cătină Pahar", variant: "300ml", price: "10 lei", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=200&h=200&fit=crop&q=80", description: "Fresh de cătină cu miere — superfood bogat în vitamina C.", ingredients: "Cătină proaspătă, miere de albine, apă" },
        { name: "Fresh Portocale", variant: "300ml", price: "10 lei", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop&q=80", description: "Portocale storse la momentul comenzii. Pur și simplu.", ingredients: "Portocale proaspete 100%" },
        { name: "Limonadă", variant: "Simplă / Mentă / Sirop", price: "7 / 8 / 10 lei", image: "https://images.unsplash.com/photo-1523371683773-affcaaf484a4?w=200&h=200&fit=crop&q=80", description: "Limonadă artizanală cu lămâi proaspete, variații cu mentă sau sirop de fructe.", ingredients: "Lămâi proaspete, zahăr, apă, mentă / sirop de fructe" },
      ]},
      { label: "Clasice", items: [
        { name: "Pepsi / Mirinda / 7UP", price: "9 lei", image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=200&h=200&fit=crop&q=80", description: "Băuturi răcoritoare clasice, servite la pahar cu gheață.", ingredients: "Pepsi / Mirinda / 7UP — 330ml" },
        { name: "Apă Plată / Minerală", price: "7 lei", image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=200&h=200&fit=crop&q=80", description: "Apă naturală sau minerală de izvor.", ingredients: "Apă naturală / minerală — 500ml" },
        { name: "Red Bull", price: "10 lei", image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop&q=80", description: "Energy drink original — pentru nopțile lungi la Rainbow.", ingredients: "Red Bull Original — 250ml" },
        { name: "Ice Tea", price: "9 lei", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=200&h=200&fit=crop&q=80", description: "Ceai rece cu lămâie sau piersici, servit cu gheață.", ingredients: "Ceai, lămâie / piersică, zahăr — 330ml" },
        { name: "Santal Pahar", price: "7 lei", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop&q=80", description: "Suc natural Santal — diverse sortimente la pahar.", ingredients: "Suc Santal — portocale / mere / ananas" },
        { name: "Fi-Ga", price: "15 lei", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=200&h=200&fit=crop&q=80", description: "Băutură artizanală cu ghimbir și fig, premium și revigorantă.", ingredients: "Extract de smochine, ghimbir, apă carbogazoasă" },
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
      <p className="font-body text-[12px] text-white/45 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
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
