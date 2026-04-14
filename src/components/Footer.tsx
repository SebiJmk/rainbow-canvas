import RainbowLogo from "./RainbowLogo";

const Footer = () => (
  <footer id="footer" style={{ background: "#050505" }} className="px-6 pt-16 pb-8">
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Col 1 */}
      <div>
        <RainbowLogo width={120} />
        <p className="font-body text-[13px] text-white/40 mt-4">
          Unde fiecare seară are gustul ei.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="https://www.instagram.com/rainbowcoffeero/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-opacity" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href="https://www.facebook.com/RainbowCoffeeAndMore/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-opacity" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
          </a>
        </div>
      </div>

      {/* Col 2 */}
      <div>
        <span className="font-body text-[10px] tracking-[0.15em] text-amber uppercase">Locație</span>
        <p className="font-body text-[14px] text-white mt-2">Bd. Decebal 14, București</p>
        <p className="font-body text-[14px] text-white/60">+40 774 466 787</p>
        <span className="font-body text-[10px] tracking-[0.15em] text-amber uppercase mt-6 block">Program</span>
        <p className="font-body text-[14px] text-white mt-2">Luni–Vineri 08:00–00:00</p>
        <p className="font-body text-[14px] text-white">Sâmbătă–Duminică 09:00–01:00</p>
      </div>

      {/* Col 3 */}
      <div>
        <span className="font-body text-[10px] tracking-[0.15em] text-amber uppercase">Hartă</span>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.4!2d26.1343419!3d44.4288177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff403412442f%3A0x1efa534c528c04c3!2sRainbow%20Coffee%26more!5e0!3m2!1sro!2sro!4v1"
          width="100%"
          height="200"
          className="mt-3 rounded"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          loading="lazy"
          allowFullScreen
          title="Rainbow Coffee location"
        />
      </div>
    </div>

    <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <p className="font-body text-[12px] text-white/30 text-center">
        © 2025 Rainbow Coffee &amp; More
      </p>
    </div>
  </footer>
);

export default Footer;
