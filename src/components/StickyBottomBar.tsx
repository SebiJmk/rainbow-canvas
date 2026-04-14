const StickyBottomBar = () => (
  <div
    className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6"
    style={{
      height: 52,
      background: "rgba(5,5,5,0.92)",
      backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <span className="hidden md:block font-body text-[12px] text-white/35">
      📍 Bd. Decebal 14, București
    </span>
    <div className="flex gap-2 w-full md:w-auto justify-end">
      <a
        href="https://waze.com/ul?ll=44.4288177,26.1343419&navigate=yes"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-[12px] text-white px-4 py-1.5 rounded-full flex-1 md:flex-none text-center"
        style={{ background: "#1a1a2e", border: "1px solid rgba(100,150,255,0.3)" }}
      >
        ↗ Waze
      </a>
      <a
        href="https://maps.google.com/?q=44.4288177,26.1343419"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-[12px] text-white px-4 py-1.5 rounded-full flex-1 md:flex-none text-center"
        style={{ background: "#1a2e1a", border: "1px solid rgba(100,200,100,0.3)" }}
      >
        ↗ Maps
      </a>
    </div>
  </div>
);

export default StickyBottomBar;
