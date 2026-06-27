import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
};

export const BeforeAfter = () => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);

  const update = useCallback((clientX) => {
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  const onDown = (e) => {
    setDragging(true);
    update(e.clientX ?? e.touches[0].clientX);
  };
  const onMove = (e) => {
    if (!dragging) return;
    update(e.clientX ?? e.touches[0].clientX);
  };
  const stop = () => setDragging(false);

  return (
    <section className="relative overflow-hidden bg-edn-beige py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">Before & After</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl">
            Real Transformations. Real Results.
          </h2>
          <p className="mt-6 max-w-[360px] text-base leading-relaxed text-edn-muted">
            See the difference exceptional craftsmanship can make.
          </p>
          <button
            data-testid="beforeafter-cta"
            onClick={() => scrollTo("projects")}
            className="mt-8 rounded-full border border-edn-ink/20 bg-white px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-edn-ink transition-all duration-300 hover:scale-[1.04] hover:bg-edn-ink hover:text-white"
          >
            View More Projects
          </button>
        </Reveal>

        <Reveal delay={0.15} blur>
          <div
            ref={ref}
            data-testid="before-after-slider"
            className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[24px] shadow-[0_30px_80px_rgba(17,17,17,0.16)]"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={stop}
            onMouseLeave={stop}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={stop}
          >
            <img src={IMAGES.afterImg} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-edn-ink">After</span>

            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src={IMAGES.beforeImg}
                alt="Before"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ width: ref.current ? ref.current.getBoundingClientRect().width : "100%" }}
                draggable={false}
              />
              <span className="absolute left-4 top-4 rounded-full bg-edn-ink/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">Before</span>
            </div>

            <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90" />
              <div
                className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-white text-edn-ink shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-200"
                style={{ width: dragging ? 56 : 48, height: dragging ? 56 : 48 }}
              >
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
