import { motion, AnimatePresence } from "framer-motion";

export interface ProductDetail {
  name: string;
  price: string;
  category?: string;
  description?: string;
  ingredients?: string;
  image: string;
  variant?: string;
}

interface Props {
  product: ProductDetail | null;
  onClose: () => void;
}

const ProductDrawer = ({ product, onClose }: Props) => (
  <AnimatePresence>
    {product && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 z-[999] w-full sm:w-[440px] overflow-y-auto"
          style={{ background: "#0c0c0c" }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Închide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src={product.image.replace("w=200&h=200", "w=800&h=600")}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-32"
              style={{ background: "linear-gradient(to top, #0c0c0c, transparent)" }}
            />
          </div>

          <div className="px-8 pb-12 -mt-8 relative z-10">
            {product.category && (
              <span className="font-body text-[10px] tracking-[0.15em] text-amber uppercase">
                {product.category}
              </span>
            )}
            <h2 className="font-heading text-[clamp(2rem,5vw,48px)] italic text-white mt-1 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {product.name}
            </h2>
            {product.variant && (
              <p className="font-body text-[13px] text-white/40 mt-1">{product.variant}</p>
            )}
            <div className="w-[30px] h-[2px] rainbow-line mt-4 mb-5" />

            {product.description && (
              <p className="font-body text-[14px] text-white/60 leading-relaxed">
                {product.description}
              </p>
            )}
            {product.ingredients && (
              <p className="font-body text-[12px] text-white/35 mt-4 leading-relaxed">
                <span className="text-white/50 uppercase tracking-wider text-[10px]">Ingrediente: </span>
                {product.ingredients}
              </p>
            )}

            <p className="font-heading text-[32px] italic text-amber mt-8">{product.price}</p>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default ProductDrawer;
