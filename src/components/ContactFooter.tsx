import { Instagram, Facebook, Phone, Mail, Clock } from "lucide-react";

const ContactFooter = () => (
  <footer id="contact" data-cursor="contact" className="py-20 pb-28 px-4 border-t border-border">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
      {/* Left */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg width="40" height="22" viewBox="0 0 120 60">
            <defs>
              <linearGradient id="footer-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(0,100%,60%)" />
                <stop offset="20%" stopColor="hsl(30,100%,55%)" />
                <stop offset="40%" stopColor="hsl(50,100%,55%)" />
                <stop offset="60%" stopColor="hsl(140,70%,45%)" />
                <stop offset="80%" stopColor="hsl(210,100%,55%)" />
                <stop offset="100%" stopColor="hsl(280,80%,60%)" />
              </linearGradient>
            </defs>
            <path d="M10 55 Q60 -10 110 55" stroke="url(#footer-rainbow)" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="font-heading text-lg text-foreground">Rainbow Coffee & More</span>
        </div>
        <p className="text-muted-foreground italic mb-6">Unde fiecare zi e mai colorată.</p>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+40 XXX XXX XXX</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>contact@rainbowcoffee.ro</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Luni–Vineri 08:00–00:00 | Sâmbătă–Duminică 09:00–01:00</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <a href="https://www.instagram.com/rainbowcoffeeandmore/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.facebook.com/RainbowCoffeeAndMore/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Right — Map */}
      <div className="rounded-xl overflow-hidden border border-border" style={{ borderImage: "linear-gradient(135deg, hsl(0,100%,60%,0.3), hsl(140,70%,45%,0.3), hsl(280,80%,60%,0.3)) 1" }}>
        <iframe
          title="Rainbow Coffee & More Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d26.1343419!3d44.4288177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI1JzQzLjgiTiAyNsKwMDgnMDMuNiJF!5e0!3m2!1sen!2sro!4v1"
          width="100%"
          height="300"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>

    {/* Bottom strip */}
    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border text-center">
      <p className="text-xs text-muted-foreground">
        © 2025 Rainbow Coffee & More. Toate drepturile rezervate.
      </p>
      <p className="text-[10px] text-muted-foreground/50 mt-1">
        Made with ❤️ by Bit & Form
      </p>
    </div>
  </footer>
);

export default ContactFooter;
