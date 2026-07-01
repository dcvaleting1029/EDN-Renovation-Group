import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/site";
import { TrustBar } from "@/components/sections/TrustBar";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
};

const ease = [0.22, 1, 0.36, 1];
const reveal = (delay) => ({
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, delay, ease } },
});

export const Hero = ({ revealed }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 270]); // parallax 0.3
  const textY = useTransform(scrollY, [0, 900], [0, -60]);
  const brightness = useTransform(scrollY, [0, 700], [1, 0.82]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  // Mouse-driven camera movement
  const heroRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxS = useSpring(mx, { stiffness: 60, damping: 18 });
  const myS = useSpring(my, { stiffness: 60, damping: 18 });
  const onMouseMove = (e) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 28);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 20);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 3 + Math.random() * 6,
        dur: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
      })),
    []
  );

  const animState = revealed ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-edn-ink"
    >
      {/* Background w/ parallax + brightness + mouse camera */}
      <motion.div className="absolute -inset-[10%]" style={{ y: bgY, filter }}>
        <motion.div className="h-full w-full will-change-transform" style={{ x: mxS, y: myS }}>
          <div
            className="h-full w-full animate-heroZoom bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGES.hero})` }}
          />
        </motion.div>
      </motion.div>

      {/* Warm wash for light theme + readability (centered halo) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_44%,rgba(248,248,246,0.92),rgba(248,248,246,0.45)_55%,rgba(248,248,246,0.1)_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-edn-warm/75 via-transparent to-edn-warm/35" />

      {/* Cinematic vignette + golden bloom */}
      <div className="film-vignette pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 -top-10 h-[65%] w-[55%] rounded-full bg-white/20 blur-[130px]" />

      {/* Light sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-0 h-[200%] w-1/3 animate-lightSweep bg-gradient-to-r from-transparent via-white/40 to-transparent blur-2xl" />
      </div>

      {/* Dust particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-edn-bronze animate-floatDust"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.06,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col items-center justify-center px-6 pt-28 text-center lg:px-12 lg:pt-24"
      >
        <motion.span
          variants={reveal(0)}
          initial="hidden"
          animate={animState}
          className="text-[11px] font-semibold uppercase tracking-[0.5em] text-edn-bronze"
          data-testid="hero-eyebrow"
        >
          Luxury Renovation Specialists
        </motion.span>

        <motion.h1
          variants={reveal(0.25)}
          initial="hidden"
          animate={animState}
          className="mt-5 max-w-[15ch] font-serif text-[12vw] font-light leading-[0.98] tracking-tight text-edn-ink sm:text-6xl lg:text-[5rem]"
          data-testid="hero-heading"
        >
          Edinburgh Home Renovations — Done Properly.
        </motion.h1>

        <motion.p
          variants={reveal(0.45)}
          initial="hidden"
          animate={animState}
          className="mx-auto mt-8 max-w-[460px] text-base leading-loose text-edn-muted sm:text-lg"
        >
          Kitchens, structural alterations and full internal renovations.
          Designed, managed and delivered under one roof.
        </motion.p>

        <motion.div
          variants={reveal(0.65)}
          initial="hidden"
          animate={animState}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            data-testid="hero-cta-quote"
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-3 rounded-full bg-edn-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_12px_34px_rgba(17,17,17,0.28)] transition-all duration-300 hover:scale-[1.05] hover:bg-black animate-breathe"
          >
            Get Free Quote
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            data-testid="hero-cta-projects"
            onClick={() => scrollTo("projects")}
            className="rounded-full border border-edn-ink/25 bg-white/40 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-edn-ink backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:bg-white"
          >
            View Our Projects
          </button>
        </motion.div>

        <motion.div variants={reveal(0.9)} initial="hidden" animate={animState} className="mx-auto mt-16 w-full max-w-3xl">
          <TrustBar />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-edn-muted lg:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-edn-divider">
          <motion.div
            className="h-4 w-full bg-edn-bronze"
            animate={{ y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
