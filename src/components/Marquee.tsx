import { motion } from "framer-motion";

const text = "PREMIUM COCKTAILS ✦ SPECIALTY COFFEE ✦ FINE WINES ✦ LATE NIGHTS ✦ ";
const repeated = text.repeat(4);

const Marquee = () => (
  <div className="overflow-hidden py-4 select-none pointer-events-none">
    <motion.div
      className="whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, ease: "linear", repeat: Infinity }}
    >
      <span
        className="font-heading italic inline-block"
        style={{
          fontSize: "clamp(80px, 10vw, 140px)",
          WebkitTextStroke: "1px rgba(200,169,110,0.15)",
          color: "transparent",
          lineHeight: 1,
        }}
      >
        {repeated}
      </span>
    </motion.div>
  </div>
);

export default Marquee;
