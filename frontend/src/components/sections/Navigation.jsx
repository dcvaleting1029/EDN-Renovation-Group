import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
};

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="main-navigation"
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        boxShadow: scrolled ? "0 8px 30px rgba(17,17,17,0.07)" : "0 0 0 rgba(0,0,0,0)",
        paddingTop: scrolled ? 12 : 22,
        paddingBottom: scrolled ? 12 : 22,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 20, mass: 0.7 }}
      className="fixed inset-x-0 top-0 z-[9990]"
    >
      <nav className="mx-auto flex max-w-[1480px] items-center justify-between px-6 lg:px-12">
        <button
          data-testid="logo-home"
          onClick={() => scrollTo("home")}
          className="flex flex-col items-start leading-none"
        >
          <motion.span
            animate={{ color: scrolled ? "#111111" : "#111111" }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl font-light tracking-[0.25em]"
          >
            EDN
          </motion.span>
          <span className="mt-0.5 text-[8px] tracking-[0.4em] text-edn-muted">
            RENOVATION GROUP
          </span>
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                data-testid={`nav-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-edn-ink/80 transition-colors hover:text-edn-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-edn-bronze transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            data-testid="nav-cta-quote"
            onClick={() => scrollTo("contact")}
            className="hidden rounded-full bg-edn-ink px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(17,17,17,0.25)] transition-all duration-300 hover:bg-black hover:scale-[1.04] sm:block"
          >
            Get Free Quote
          </button>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-edn-divider bg-white/70 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-6 mt-4 space-y-1 rounded-2xl glass p-4">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    data-testid={`nav-mobile-${l.id}`}
                    onClick={() => {
                      scrollTo(l.id);
                      setOpen(false);
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.18em] text-edn-ink hover:bg-edn-beige"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
