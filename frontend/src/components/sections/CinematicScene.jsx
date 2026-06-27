import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Full-bleed cinematic "room" scene — acts as an architectural divider in the
// scroll journey. Parallax + scale simulate a slow camera move; caption fades.
export const CinematicScene = ({ image, eyebrow, title }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "9%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [14, 0, 0, 14]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={ref}
      data-testid="cinematic-scene"
      className="relative h-[82vh] min-h-[520px] w-full overflow-hidden bg-black"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/75" />
      <div className="film-vignette pointer-events-none absolute inset-0" />

      {/* slow light sweep — golden-hour beam */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-0 h-[200%] w-1/3 animate-lightSweep bg-gradient-to-r from-transparent via-amber-100/25 to-transparent blur-2xl" />
      </div>

      <motion.div
        style={{ opacity, filter }}
        className="relative z-10 flex h-full items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-edn-bronze">
            {eyebrow}
          </p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </div>
      </motion.div>
    </section>
  );
};
