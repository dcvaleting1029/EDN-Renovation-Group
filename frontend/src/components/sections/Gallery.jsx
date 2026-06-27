import { motion } from "framer-motion";
import { GALLERY } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
};

export const Gallery = () => {
  return (
    <section id="projects" className="relative bg-edn-beige py-24 lg:py-32">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
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
              onClick={() => scrollTo("contact")}
              className="rounded-full border border-edn-ink/20 bg-white px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-edn-ink transition-all duration-300 hover:scale-[1.04] hover:bg-edn-ink hover:text-white"
            >
              View All Projects
            </button>
          </Reveal>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.title}
              data-testid={`gallery-item-${i}`}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block break-inside-avoid overflow-hidden rounded-[24px] shadow-[0_10px_40px_rgba(17,17,17,0.06)]"
            >
              <img
                src={g.img}
                alt={g.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.08] ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-edn-ink/75 via-edn-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-0 left-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[10px] uppercase tracking-[0.24em] text-edn-bronze">Project</span>
                <div className="font-serif text-2xl text-white">{g.title}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
