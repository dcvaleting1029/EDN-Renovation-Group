import { motion } from "framer-motion";
import { IMAGES } from "@/data/site";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
};

export const Showcase = () => {
  return (
    <section id="showcase" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <motion.div
          initial={{ clipPath: "inset(14% 14% 14% 14% round 0px)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-[24px]"
        >
          <img src={IMAGES.showcase} alt="Showcase" loading="lazy" className="h-full w-full animate-heroZoom object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 max-w-2xl p-8 lg:p-14">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze"
            >
              About EDN
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl"
            >
              Where Architecture Meets Impeccable Craft
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/80"
            >
              For over 15 years EDN Renovation Group has restored and reimagined
              Edinburgh's Georgian and Victorian homes — uniting period character
              with the finest materials and an obsession for detail.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              data-testid="showcase-cta"
              onClick={() => scrollTo("contact")}
              className="mt-8 rounded-full bg-edn-bronze px-8 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.05] hover:bg-edn-bronzeDeep"
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
