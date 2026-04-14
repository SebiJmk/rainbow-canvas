import { MapPin, Navigation } from "lucide-react";

const StickyBottomBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-[100] bg-card/95 backdrop-blur-md border-t" style={{ borderImage: "linear-gradient(90deg, hsl(0,100%,60%), hsl(50,100%,55%), hsl(140,70%,45%), hsl(210,100%,55%), hsl(280,80%,60%)) 1" }}>
    <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <MapPin className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Bd. Unirii, București</span>
        <span className="sm:hidden">București</span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://waze.com/ul?ll=44.4288177,26.1343419&navigate=yes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-foreground text-xs font-semibold hover:scale-[1.04] transition-transform"
        >
          <Navigation className="w-3 h-3" />
          Waze
        </a>
        <a
          href="https://www.google.com/maps/place/Rainbow+Coffee%26more/@44.4292939,26.1326322"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-foreground text-xs font-semibold hover:scale-[1.04] transition-transform"
        >
          <MapPin className="w-3 h-3" />
          Maps
        </a>
      </div>
    </div>
  </div>
);

export default StickyBottomBar;
