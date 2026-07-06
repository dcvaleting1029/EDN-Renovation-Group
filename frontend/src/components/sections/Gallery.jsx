import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export const Gallery = () => {
  const [active, setActive] = useState(null); // index or null

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    (e) => {
      e?.stopPropagation();
      setActive((i) => (i === null ? null : (i + 1) % GALLERY.length));
    },
    []
  );
  const prev = useCallback(
    (e) => {
      e?.stopPropagation();
      setActive((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
    },
    []
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  return (
    <section id="projects" className="relative bg-edn-beige py-24 lg:py-32">
      <div className="mx-auto mb-14 max-w-[1480px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
              Our Recent Projects
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl">
              A Portfolio Of Distinction
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              data-testid="gallery-cta"
              onClick={() => setActive(0)}
              className="rounded-full border border-edn-ink/20 bg-white px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-edn-ink transition-all duration-300 hover:scale-[1.04] hover:bg-edn-ink hover:text-white"
            >
              View All Projects
            </button>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <motion.figure
            key={g.title}
            data-testid={`gallery-item-${i}`}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block aspect-[4/3] cursor-pointer overflow-hidden"
          >
            <img
              src={g.img}
              alt={g.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-edn-ink/75 via-edn-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <figcaption className="absolute bottom-0 left-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-[10px] uppercase tracking-[0.24em] text-edn-bronze">Project</span>
              <div className="font-serif text-2xl text-white">{g.title}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            data-testid="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
            className="fixed inset-0 z-[9995] flex items-center justify-center bg-edn-ink/95 backdrop-blur-sm"
          >
            <button
              data-testid="lightbox-close"
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:bg-white hover:text-edn-ink"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <button
              data-testid="lightbox-prev"
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:bg-white hover:text-edn-ink md:left-8"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              data-testid="lightbox-next"
              onClick={next}
              aria-label="Next"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:bg-white hover:text-edn-ink md:right-8"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                data-testid="lightbox-figure"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="mx-auto flex max-h-[86vh] w-[90vw] max-w-[1100px] flex-col"
              >
                <img
                  src={GALLERY[active].img}
                  alt={GALLERY[active].title}
                  className="max-h-[76vh] w-full object-contain"
                />
                <figcaption className="mt-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-edn-bronze">Project</span>
                    <div className="font-serif text-2xl text-white">{GALLERY[active].title}</div>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {String(active + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
