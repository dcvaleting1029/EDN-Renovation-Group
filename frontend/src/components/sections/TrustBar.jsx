import { motion } from "framer-motion";
import { Award, ShieldCheck, Star, Home } from "lucide-react";
import { TRUST } from "@/data/site";
import { CountUp } from "@/components/CountUp";

const ICONS = { Award, ShieldCheck, Star, Home };

export const TrustBar = () => {
  return (
    <div
      data-testid="trust-bar"
      className="grid grid-cols-2 gap-y-6 rounded-3xl border border-edn-divider/70 bg-white/60 px-6 py-5 backdrop-blur-md sm:grid-cols-4 sm:divide-x sm:divide-edn-divider"
    >
      {TRUST.map((t, i) => {
        const Icon = ICONS[t.icon];
        return (
          <div key={i} className="flex items-center gap-3 px-2 sm:px-4">
            <motion.span
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 220, damping: 16 }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edn-bronze/40 text-edn-bronze"
            >
              <Icon size={16} strokeWidth={1.6} />
            </motion.span>
            <div className="leading-tight">
              <div className="font-serif text-xl text-edn-ink">
                {t.value ? <CountUp to={t.value} suffix={t.suffix} /> : t.text}
              </div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-edn-muted">
                {t.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
