import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RainbowLogo from "./RainbowLogo";

const navLinks = [
  { label: "Acasă", href: "/#hero" },
  { label: "Preferatele Casei", href: "/#preferatele" },
  { label: "Meniu", href: "/meniu" },
  { label: "Rezervă", href: "/#rezerva" },
  { label: "Contact", href: "/#footer" },
];

const Navbar = ({ showBack = false }: { showBack?: boolean }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 h-16"
        style={{
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => navigate("/")}
              className="font-body text-[13px] text-white/60 hover:text-white tracking-wide"
            >
              ← Înapoi
            </button>
          )}
          <Link to="/">
            <RainbowLogo width={100} />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="font-body text-[13px] uppercase tracking-[0.12em] text-white/70 hover:text-white transition-opacity"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => handleNav("/#rezerva")}
            className="font-body text-[13px] uppercase tracking-[0.12em] text-white px-5 py-2 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Rezervă o Masă
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(8,8,8,0.97)" }}
        >
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="font-heading text-3xl italic text-white/80 hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("/#rezerva")}
            className="mt-4 font-body text-[13px] uppercase tracking-[0.12em] text-white px-8 py-3"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          >
            Rezervă o Masă
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
