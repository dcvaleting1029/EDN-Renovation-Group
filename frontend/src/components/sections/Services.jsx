import { motion } from "framer-motion";
import { ArrowRight, Maximize2, Hammer, ChefHat, Bath, Mountain, Flame } from "lucide-react";
import { SERVICES } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const ICONS = { Maximize2, Hammer, ChefHat, Bath, Mountain, Flame };

export const Services = () => {
  return (
    <section id="services" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto mb-16 max-w-[1480px] px-6 text-center lg:px-12">
        <Reveal as="p" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
          Our Services
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-4 font-serif text-4xl font-light text-edn-ink sm:text-5xl lg:text-6xl">
          Complete Renovation Solutions
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-6 h-px w-16 bg-edn-bronze" />
      </div>

      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <TiltCard key={s.title} className="h-full">
            <motion.article
              data-testid={`service-card-${i}`}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group flex h-full flex-col overflow-hidden border border-edn-divider/70 bg-white shadow-[0_10px_40px_rgba(17,17,17,0.05)] transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(17,17,17,0.12)]"
            >
              <div className="relative h-72 overflow-hidden lg:h-80">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                <span className="absolute -bottom-6 left-8 flex h-12 w-12 items-center justify-center rounded-full border border-edn-bronze/40 bg-white text-edn-bronze shadow-md">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
              </div>
              <div className="flex flex-1 items-end justify-between gap-4 px-8 pb-9 pt-11">
                <div>
                  <h3 className="font-serif text-3xl text-edn-ink">{s.title}</h3>
                  <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-edn-muted">{s.desc}</p>
                </div>
                <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-edn-bronze transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={22} />
                </span>
              </div>
            </motion.article>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
