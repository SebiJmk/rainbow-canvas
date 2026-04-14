import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SectionHeading from "./SectionHeading";

const timeSlots: string[] = [];
for (let h = 9; h <= 23; h++) {
  timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
  if (h < 23) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
}

const ReservationSection = () => {
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", guests: "2", notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Rezervarea ta a fost primită! Te așteptăm! 🌈", {
      duration: 5000,
    });
    setForm({ name: "", phone: "", date: "", time: "", guests: "2", notes: "" });
  };

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary transition-all";

  return (
    <section id="rezerva" data-cursor="rezerva" className="py-20 px-4">
      <SectionHeading title="Rezervă o Masă" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[560px] mx-auto mt-12 glass-surface rounded-2xl p-8 border border-border"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nume complet"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            aria-label="Nume complet"
          />
          <input
            type="tel"
            placeholder="Număr de telefon"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
            aria-label="Număr de telefon"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
              aria-label="Data"
            />
            <select
              required
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className={inputClass}
              aria-label="Ora"
            >
              <option value="">Ora</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <input
            type="number"
            min={1}
            max={20}
            placeholder="Număr de persoane"
            required
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className={inputClass}
            aria-label="Număr de persoane"
          />
          <textarea
            placeholder="Mențiuni speciale (opțional)"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={inputClass}
            aria-label="Mențiuni speciale"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg rainbow-gradient text-background font-body font-semibold text-sm hover:scale-[1.02] transition-transform"
          >
            Confirmă Rezervarea
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ReservationSection;
