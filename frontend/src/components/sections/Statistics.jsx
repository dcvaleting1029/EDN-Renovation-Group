import { motion } from "framer-motion";
import { STATISTICS } from "@/data/site";
import { CountUp } from "@/components/CountUp";

export const Statistics = () => {
  return (
    <section className="relative bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1480px] grid-cols-2 gap-y-12 px-6 lg:grid-cols-4 lg:px-12">
        {STATISTICS.map((s, i) => (
          <div key={i} data-testid={`stat-${i}`} className="relative px-4 text-center">
            {i !== 0 && (
              <span className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-edn-divider lg:block" />
            )}
            <div className="font-serif text-5xl font-light text-edn-bronze sm:text-6xl">
              <CountUp to={s.value} suffix={s.suffix} duration={2000} />
            </div>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
              className="mx-auto mt-3 block h-px w-10 origin-center bg-edn-bronze/60"
            />
            <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-edn-muted">
              {s.label}
            </div>
            {s.sub && <div className="mt-1 text-[10px] text-edn-muted/70">{s.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};
