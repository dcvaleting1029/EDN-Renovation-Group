import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export const Testimonials = () => {
  return (
    <section id="reviews" className="relative overflow-hidden bg-edn-warm py-24 lg:py-32">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
              Client Testimonials
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl">
              Trusted By Homeowners Across Edinburgh
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TiltCard key={i} max={6} className="h-full">
              <motion.figure
                data-testid={`testimonial-${i}`}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, rotate: 1, boxShadow: "0 30px 70px rgba(184,138,69,0.20)" }}
                className="rounded-[24px] border border-edn-divider/70 bg-white/70 p-7 backdrop-blur-md shadow-[0_10px_40px_rgba(17,17,17,0.05)] transition-shadow"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} className="fill-edn-bronze text-edn-bronze text-shimmer-star animate-shimmer" />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-edn-ink/85">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-edn-muted">
                  — {t.name}
                </figcaption>
              </motion.figure>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
