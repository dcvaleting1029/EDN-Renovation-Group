import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, PencilRuler, ClipboardCheck, Hammer, Sparkles } from "lucide-react";
import { PROCESS, IMAGES } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const ICONS = { MessageSquare, PencilRuler, ClipboardCheck, Hammer, Sparkles };

export const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "center 50%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative overflow-hidden bg-edn-beige py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-12">
        <div ref={ref}>
          <Reveal as="p" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
            Our Process
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl">
            A Seamless Experience From Start To Finish
          </Reveal>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 h-px bg-edn-divider" />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute left-0 right-0 top-5 h-px origin-left bronze-line-gradient animate-gradientShift"
            />
            <div className="relative grid grid-cols-5 gap-2">
              {PROCESS.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, scale: 0.4, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * i, type: "spring", stiffness: 200, damping: 16 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-edn-bronze bg-edn-beige text-[11px] font-semibold text-edn-bronze">
                      {p.n}
                    </div>
                    <Icon size={18} strokeWidth={1.5} className="mt-4 text-edn-ink" />
                    <h3 className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-edn-ink">{p.title}</h3>
                    <p className="mt-1 hidden text-[10px] leading-snug text-edn-muted sm:block">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal delay={0.1} className="overflow-hidden rounded-[24px] shadow-[0_30px_80px_rgba(17,17,17,0.16)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img src={IMAGES.processBg} alt="Process" loading="lazy" className="h-full w-full animate-heroZoom object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
