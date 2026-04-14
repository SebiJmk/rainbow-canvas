import { motion } from "framer-motion";

const SectionHeading = ({ title }: { title: string }) => (
  <div className="text-center">
    <h2 className="font-heading text-3xl md:text-4xl text-foreground">{title}</h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "6rem" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-[2px] rainbow-gradient mx-auto mt-3 rounded-full"
    />
  </div>
);

export default SectionHeading;
