import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const timeSlots: string[] = [];
for (let h = 9; h <= 23; h++) {
  timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
  if (h < 23) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
}

const ReservationSection = () => {
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", guests: "2", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldStyle =
    "w-full bg-transparent border-0 border-b border-white/15 text-white font-body text-[15px] py-3 px-0 focus:outline-none focus:border-white transition-colors placeholder:text-white/30";
  const labelStyle = "font-body text-[10px] uppercase tracking-[0.15em] text-amber mb-1 block";

  return (
    <section id="rezerva" data-cursor="rezerva" className="py-24 px-4" style={{ background: "#0d0d0d" }} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16"
      >
        {/* Left side */}
        <div>
          <h2 className="font-heading text-[clamp(3rem,6vw,68px)] italic text-white leading-[1.1]">
            Rezervă<br />o Masă
          </h2>
          <div className="w-[40px] h-[2px] rainbow-line mt-4 mb-6" />
          <div className="font-body text-[14px] text-white/50 space-y-1">
            <p>Suntem la dispoziția ta zilnic.</p>
            <p>Luni – Vineri: 08:00 – 00:00</p>
            <p>Sâmbătă – Duminică: 09:00 – 01:00</p>
          </div>
          <div className="font-body text-[14px] text-white/50 mt-6 space-y-1">
            <p>📞 +40 774 466 787</p>
            <p>📍 Bd. Decebal 14, București</p>
          </div>
        </div>

        {/* Right side */}
        <div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col justify-center h-full"
            >
              <h3 className="font-heading text-[36px] italic text-white">
                Mulțumim, {form.name}! ✓
              </h3>
              <p className="font-body text-[14px] text-white/60 mt-4">
                Te așteptăm pe {form.date} la {form.time}.<br />
                Orice modificare: +40 774 466 787
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Nume complet</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldStyle} placeholder="Numele tău" aria-label="Nume complet" />
                </div>
                <div>
                  <label className={labelStyle}>Telefon</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldStyle} placeholder="+40 ..." aria-label="Telefon" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Data</label>
                  <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={fieldStyle} aria-label="Data" />
                </div>
                <div>
                  <label className={labelStyle}>Ora</label>
                  <select required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={fieldStyle} aria-label="Ora">
                    <option value="">Selectează ora</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Număr persoane</label>
                  <input type="number" min={1} max={20} required value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className={fieldStyle} aria-label="Număr persoane" />
                </div>
              </div>
              <div>
                <label className={labelStyle}>Mențiuni (opțional)</label>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={fieldStyle + " resize-none"} placeholder="Alergii, cereri speciale..." aria-label="Mențiuni" />
              </div>
              <button
                type="submit"
                className="w-full font-body text-[12px] uppercase tracking-[0.12em] py-4 transition-colors"
                style={{ background: "white", color: "#080808" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e0e0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                Confirmă Rezervarea
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ReservationSection;
