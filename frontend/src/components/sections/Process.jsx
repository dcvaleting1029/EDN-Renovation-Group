import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, FileText, ClipboardCheck } from "lucide-react";
import { PROCESS, IMAGES } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const ICONS = { Phone, MapPin, FileText, ClipboardCheck };

export const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 65%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative overflow-hidden bg-edn-beige py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Left: heading + image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal as="p" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
            Our Process
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl">
            A Seamless Experience From Start To Finish
          </Reveal>
          <Reveal delay={0.18} className="mt-8 overflow-hidden rounded-[24px] shadow-[0_30px_80px_rgba(17,17,17,0.16)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img src={IMAGES.processBg} alt="Process" loading="lazy" className="h-full w-full animate-heroZoom object-cover" />
            </div>
          </Reveal>
        </div>

        {/* Right: numbered vertical timeline */}
        <div ref={ref} className="relative">
          <div className="absolute left-5 top-4 bottom-4 w-px bg-edn-divider" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-5 top-4 bottom-4 w-px origin-top bronze-line-gradient"
          />

          <div className="space-y-6">
            {PROCESS.map((p, i) => {
              const Icon = ICONS[p.icon];
              return (
                <motion.div
                  key={p.n}
                  data-testid={`process-step-${i}`}
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-5"
                >
                  <div className="relative z-10 shrink-0">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-edn-ink text-sm font-semibold text-white shadow-[0_8px_20px_rgba(17,17,17,0.25)]">
                      {p.n}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex-1 rounded-[24px] border border-edn-divider/70 bg-white p-6 shadow-[0_10px_40px_rgba(17,17,17,0.05)] transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(17,17,17,0.1)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={18} strokeWidth={1.6} className="text-edn-bronze" />
                      <h3 className="font-serif text-2xl text-edn-ink">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-edn-muted">{p.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
