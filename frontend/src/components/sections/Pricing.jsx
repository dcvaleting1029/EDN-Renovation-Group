import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, CircleDollarSign } from "lucide-react";
import { PRICING } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const ICONS = { Bookmark, CircleDollarSign };

export const Pricing = () => {
  const [active, setActive] = useState(0);
  const stage = PRICING.stages[active];
  const Icon = ICONS[stage.icon];

  return (
    <section id="pricing" className="relative overflow-hidden bg-edn-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <Reveal as="p" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
          {PRICING.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-4 max-w-[16ch] font-serif text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {PRICING.title}
        </Reveal>
        <Reveal as="p" delay={0.18} className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/60">
          {PRICING.subtitle}
        </Reveal>

        {/* Segmented tabs */}
        <Reveal delay={0.24} className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-white p-1.5" data-testid="pricing-tabs">
            {PRICING.stages.map((s, i) => (
              <button
                key={i}
                data-testid={`pricing-tab-${i}`}
                onClick={() => setActive(i)}
                className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-7"
              >
                {active === i && (
                  <motion.span
                    layoutId="pricing-pill"
                    className="absolute inset-0 rounded-full bg-edn-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${active === i ? "text-white" : "text-edn-ink"}`}>
                  {s.tab}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stage card */}
        <Reveal delay={0.3} className="mt-10">
          <div className="relative overflow-hidden rounded-[28px] bg-edn-warm p-8 sm:p-12" data-testid="pricing-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-6">
                  <Icon size={40} strokeWidth={1.6} className="text-edn-ink" />
                  <div className="text-right">
                    <div className="font-sans text-5xl font-bold leading-none tracking-tight text-edn-ink sm:text-6xl" data-testid="pricing-amount">
                      {stage.amount}
                    </div>
                    {stage.right && (
                      <div className="mt-3 text-sm font-medium text-edn-ink/70">{stage.right}</div>
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-edn-ink">{stage.heading}</h3>
                  <p className="mt-1.5 text-sm text-edn-muted">{stage.sub}</p>
                </div>

                <div className="my-8 h-px w-full bg-edn-ink/15" />

                <p className="text-center text-sm text-edn-muted">{stage.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
